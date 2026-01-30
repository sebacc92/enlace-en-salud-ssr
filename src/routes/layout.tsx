import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Navbar, type SocialNetwork } from '~/components/landing/navbar/navbar';
import { Footer } from '~/components/landing/footer/footer';
import { Contact } from '~/components/landing/contact/contact';
import { storyblokApi } from '~/routes/plugin@storyblok';

export const useGlobalConfig = routeLoader$(async () => {
    try {
        if (!storyblokApi) {
            console.error('Storyblok API is not initialized');
            return null;
        }
        const version = process.env.PUBLIC_STORYBLOK_VERSION === 'published' ? 'published' : 'draft';
        const { data } = await storyblokApi.get('cdn/stories/config', {
            version: version as 'published' | 'draft',
            resolve_links: 'url',
        });
        return data.story.content;
    } catch (error) {
        console.error('Error fetching global config:', error);
        return null;
    }
});

interface LayoutProps {
    blok?: any; // Datos provenientes de Storyblok
}

export default component$<LayoutProps>(({ blok }) => {
    const globalConfig = useGlobalConfig();
    const config = globalConfig.value;
    const primaryColor = config?.primary_color?.color || '#0ea5e9'; // Fallback to sky-500

    // Raw social networks from Storyblok for Footer (which will handle the raw shape)
    const rawSocialNetworks = config?.social_networks || [];
    // Mapped social networks for Navbar (which expects the old SocialNetwork interface)
    // We try to extract a usable URL and icon name
    const socialNetworksNavbar: SocialNetwork[] = rawSocialNetworks.map((sn: any) => {
        let url = "";
        if (typeof sn.url === 'string') {
            url = sn.url;
        } else if (sn.url && typeof sn.url === 'object') {
            url = sn.url.url || "";
        }

        return {
            id: sn._uid,
            platform: sn.platform || "default", // Use icon name as platform/label
            url: url,
            iconName: sn.icon_name || "default",
        };
    });

    return (
        <div style={{ '--primary-color': primaryColor }}>
            <Navbar
                logo={config?.logo}
                menuItems={config?.main_menu}
                socialNetworks={socialNetworksNavbar}
            />
            <main>
                <Slot />
            </main>
            <Contact
                mapUrl={config?.location_url}
                email={blok?.email}
            />
            <Footer
                logo={config?.logo}
                footerContent={config?.footer_content}
                socialNetworks={rawSocialNetworks}
            />
        </div>
    );
});