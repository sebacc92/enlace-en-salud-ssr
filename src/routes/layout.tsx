import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$, globalAction$, zod$, z } from '@builder.io/qwik-city';
import { Navbar, type SocialNetwork } from '~/components/landing/navbar/navbar';
import { Footer } from '~/components/landing/footer/footer';
import { WhatsAppButton } from '~/components/ui/whatsapp-button';
import { ScrollToTop } from '~/components/ui/scroll-to-top';
import { storyblokApi } from '~/routes/plugin@storyblok';

export const useSendContactEmail = globalAction$(async (datos, { env, fail }) => {
    // 1. Validar Token de Turnstile
    const token = (datos as any)['cf-turnstile-response'];
    if (!token) {
        return fail(400, { message: 'Por favor, completa la verificación de seguridad.' });
    }

    const secretKey = env.get('TURNSTILE_SECRET_KEY');
    if (!secretKey) {
        console.error('Falta TURNSTILE_SECRET_KEY en .env.local');
        return fail(500, { message: 'Error de configuración del servidor' });
    }

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secret: secretKey,
            response: token,
        }),
    });

    const verifyResult = await verifyResponse.json();
    if (!verifyResult.success) {
        console.error('Turnstile verification failed:', verifyResult);
        return fail(400, { message: 'Verificación de seguridad fallida. Intenta nuevamente.' });
    }

    // 2. Verificamos que la API Key de Resend exista
    const apiKey = env.get('RESEND_API_KEY');
    if (!apiKey) {
        console.error('Falta la API Key de Resend en .env.local');
        return fail(500, { message: 'Error de configuración del servidor' });
    }

    // 2. Enviamos el email usando fetch nativo (Edge compatible)
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                // IMPORTANTE: En modo prueba, SOLO puedes usar 'onboarding@resend.dev'
                from: 'onboarding@resend.dev',

                // IMPORTANTE: En modo prueba, SOLO puedes enviar emails a TU PROPIO correo (con el que te registraste)
                to: 'comercial@enlacesalud.com.ar',

                subject: `Nuevo contacto de: ${datos.nombre}`,
                html: `
            <h1>Nuevo mensaje desde Cleverisma</h1>
            <p><strong>Nombre:</strong> ${datos.nombre}</p>
            <p><strong>Email del cliente:</strong> ${datos.email}</p>
            <p><strong>Mensaje:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
            ${datos.mensaje}
            </blockquote>
        `,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error Resend API:', errorData);
            return fail(500, { message: 'No se pudo enviar el correo.' });
        }

        return { success: true };

    } catch (error) {
        console.error('Error interno:', error);
        return fail(500, { message: 'Ocurrió un error inesperado.' });
    }
}, zod$({
    nombre: z.string().min(2, 'Tu nombre es muy corto'),
    email: z.string().email('Ingresa un email válido'),
    mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
}));

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

export default component$<LayoutProps>(() => {
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
                logoHeightMobile={config?.logo_height_mobile || 40}
                logoHeightDesktop={config?.logo_height_desktop || 64}
            />
            <main>
                <Slot />
            </main>
            <Footer
                logo={config?.logo}
                footerContent={config?.footer_content}
                socialNetworks={rawSocialNetworks}
            />
            <WhatsAppButton
                phone={config?.whatsapp_number}
                message={config?.whatsapp_message}
            />
            <ScrollToTop />
        </div>
    );
});