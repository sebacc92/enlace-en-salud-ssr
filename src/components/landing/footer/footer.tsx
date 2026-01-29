import { component$ } from "@builder.io/qwik";
import { LuMail, LuGlobe } from "@qwikest/icons/lucide";
import LogoFooter from "~/media/img/logo-footer.webp?jsx";
import { ICON_REGISTRY } from "~/components/icons/registry";

// New interface matching Storyblok dynamic structure
export interface SocialNetworkItem {
    _uid?: string;
    icon_name: string;
    url: { url: string } | string;
}

interface FooterProps {
    socialNetworks?: SocialNetworkItem[];
    email?: string;
    logo?: { filename: string; alt?: string };
    footerContent?: string;
    mapUrl?: string;
}

export const Footer = component$<FooterProps>(({ socialNetworks = [], email, logo, footerContent, mapUrl }) => {
    const getIcon = (iconName: string) => {
        return ICON_REGISTRY[iconName] || ICON_REGISTRY['default'];
    };

    const getSocialUrl = (item: SocialNetworkItem) => {
        if (typeof item.url === 'string') return item.url;
        if (item.url && typeof item.url === 'object') return item.url.url;
        return '#';
    };

    const contactEmail = email || "comercial@enlacesalud.com.ar";

    const getEmbedUrl = (url?: string) => {
        const defaultQuery = "Miramar, Argentina";
        let query = defaultQuery;

        if (url && url.trim() !== "") {
            // If it already looks like a valid embed url, just return it
            if (url.includes("output=embed")) {
                return url;
            }
            // Otherwise use the url as the query for the embed
            query = url;
        }

        const encodedQuery = encodeURIComponent(query);
        return `https://maps.google.com/maps?q=${encodedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    };

    const finalMapUrl = getEmbedUrl(mapUrl);

    console.log('socialNetworks', socialNetworks);
    return (
        <footer id="contacto" class="bg-black text-white py-12 border-t border-slate-800">
            <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Brand Section (Cols 1-4) */}
                    <div class="lg:col-span-4 flex flex-col space-y-8">
                        <div>
                            {logo?.filename ? (
                                <img
                                    src={logo.filename}
                                    alt={logo.alt || "Logo Enlace en Salud"}
                                    class="h-10 w-auto mx-auto md:mx-0 object-contain brightness-0 invert"
                                    width={150}
                                    height={50}
                                />
                            ) : (
                                <LogoFooter alt="Logo Enlace en Salud" />
                            )}
                            <p class="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 mt-4 text-center md:text-left">
                                {footerContent || "Soluciones integrales y gestión sanitaria de excelencia."}
                            </p>
                        </div>

                        <div>
                            <h3 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider text-center md:text-left">Síguenos</h3>
                            <div class="flex justify-center md:justify-start space-x-4">
                                {socialNetworks.map((social) => {
                                    const IconComponent = getIcon(social.icon_name);
                                    const url = getSocialUrl(social);
                                    return (
                                        <a
                                            key={social._uid}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="bg-slate-800 hover:bg-primary p-3 rounded-full transition-colors"
                                            aria-label={social.icon_name}
                                        >
                                            <IconComponent class="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div class="text-xs text-slate-500 text-center md:text-left mt-auto">
                            &copy; {new Date().getFullYear()} Enlace en Salud.<br />Todos los derechos reservados.
                        </div>
                    </div>

                    {/* Contact Block (Cols 5-12) */}
                    <div class="lg:col-span-8">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Map Section - Left (Top on Mobile) */}
                            <div class="w-full h-full min-h-[300px] rounded-xl shadow-sm overflow-hidden bg-slate-900 border border-slate-800 relative">
                                <iframe
                                    src={finalMapUrl}
                                    class="absolute inset-0 w-full h-full border-0"
                                    loading="lazy"
                                    allowFullscreen={true}
                                    title="Ubicación"
                                ></iframe>
                            </div>

                            {/* Form Section - Right */}
                            <div class="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                                <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Contáctanos</h2>
                                <form class="space-y-4" preventdefault:submit>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                        />
                                    </div>

                                    {/* Captcha Placeholder */}
                                    <div class="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 flex items-center gap-3">
                                        <div class="w-6 h-6 border-2 border-slate-300 rounded sm:w-5 sm:h-5 bg-white"></div>
                                        <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Protegido por ReCaptcha</span>
                                    </div>

                                    <button
                                        type="submit"
                                        class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-lg shadow-primary/20"
                                    >
                                        Enviar Mensaje
                                    </button>
                                </form>

                                {/* Quick Contact Info */}
                                <div class="mt-6 flex flex-col space-y-2 pt-6 border-t border-slate-200 dark:border-slate-800">
                                    <a
                                        href={`mailto:${contactEmail}`}
                                        class="flex items-center text-sm text-slate-600 dark:text-gray-400 hover:text-primary transition-colors gap-3"
                                    >
                                        <LuMail class="w-4 h-4 flex-shrink-0" />
                                        <span class="truncate">{contactEmail}</span>
                                    </a>
                                    <a
                                        href="https://ENLACESALUD.com.ar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center text-sm text-slate-600 dark:text-gray-400 hover:text-primary transition-colors gap-3"
                                    >
                                        <LuGlobe class="w-4 h-4 flex-shrink-0" />
                                        <span>ENLACESALUD.com.ar</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
});
