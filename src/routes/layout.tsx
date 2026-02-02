import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$, routeAction$, zod$, z } from '@builder.io/qwik-city';
import { Navbar, type SocialNetwork } from '~/components/landing/navbar/navbar';
import { Footer } from '~/components/landing/footer/footer';
import { WhatsAppButton } from '~/components/ui/whatsapp-button';
import { ScrollToTop } from '~/components/ui/scroll-to-top';
import { storyblokApi } from '~/routes/plugin@storyblok';

export const useSendContactEmail = routeAction$(async (datos, { env, fail, request }) => {
    // 1. Obtener el token de Turnstile
    // Nota: Al usar render explícito, nos aseguramos que el campo se llame 'cf-turnstile-response'
    const token = (datos as any)['cf-turnstile-response'];

    if (!token) {
        return fail(400, { message: 'Por favor, completa la verificación de seguridad.' });
    }

    const secretKey = env.get('TURNSTILE_SECRET_KEY');
    if (!secretKey) {
        console.error('Falta TURNSTILE_SECRET_KEY en .env.local');
        return fail(500, { message: 'Error de configuración del servidor' });
    }

    // 2. Validar con Cloudflare usando FormData (¡CRÍTICO PARA QUE FUNCIONE!)
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    // Opcional: Pasar la IP del cliente para mayor seguridad
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip');
    if (ip) formData.append('remoteip', ip);

    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData, // <--- Aquí estaba el problema, usamos FormData en lugar de JSON
    });

    const verifyResult = await verifyResponse.json();
    if (!verifyResult.success) {
        console.error('Turnstile verification failed:', verifyResult);
        return fail(400, { message: 'Verificación de seguridad fallida. Intenta nuevamente.' });
    }

    // 3. Verificamos API Key de Resend
    const apiKey = env.get('RESEND_API_KEY');
    if (!apiKey) {
        console.error('Falta la API Key de Resend en .env.local');
        return fail(500, { message: 'Error de configuración del servidor' });
    }

    // 4. Enviar email con Resend
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev', // Recuerda cambiar esto en producción si tienes dominio verificado en Resend
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
    // Validamos que el token venga en el request, aunque sea string vacío
    'cf-turnstile-response': z.string().optional()
}));

export const useGlobalConfig = routeLoader$(async () => {
    try {
        if (!storyblokApi) return null;
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
    blok?: any;
}

export default component$<LayoutProps>(() => {
    const globalConfig = useGlobalConfig();
    const config = globalConfig.value;
    const primaryColor = config?.primary_color?.color || '#0ea5e9';

    const rawSocialNetworks = config?.social_networks || [];
    const socialNetworksNavbar: SocialNetwork[] = rawSocialNetworks.map((sn: any) => {
        let url = "";
        if (typeof sn.url === 'string') {
            url = sn.url;
        } else if (sn.url && typeof sn.url === 'object') {
            url = sn.url.url || "";
        }
        return {
            id: sn._uid,
            platform: sn.platform || "default",
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