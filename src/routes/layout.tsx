import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Navbar, type SocialNetwork } from '~/components/landing/navbar/navbar';
import { Footer } from '~/components/landing/footer/footer';
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

    // Mapeo de las redes sociales desde el bloque de Storyblok (si vinieran por props)
    // Pero ahora probablemente queramos usar lo del globalConfig si no hay props específicas
    // O mantener la lógica actual si layout recibe props de una ruta específica
    const socialNetworks: SocialNetwork[] = blok?.social_networks?.map((sn: any) => ({
        id: sn._uid,
        platform: sn.platform,
        url: sn.url,
        iconName: sn.icon_name || 'default',
    })) || [];

    const config = globalConfig.value;
    const primaryColor = config?.primary_color?.color || '#0ea5e9'; // Fallback to sky-500

    return (
        <div style={{ '--primary-color': primaryColor }}>
            <Navbar
                logo={config?.logo}
                menuItems={config?.main_menu}
                socialNetworks={socialNetworks}
            />
            <main>
                <Slot />
            </main>
            <Footer
                logo={config?.logo}
                footerContent={config?.footer_content}
                socialNetworks={socialNetworks}
                email={blok?.email} // Keep existing if needed, or use from config if available
            />
        </div>
    );
});