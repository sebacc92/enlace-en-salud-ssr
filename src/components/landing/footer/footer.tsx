import { component$ } from "@builder.io/qwik";
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
    logo?: { filename: string; alt?: string };
    footerContent?: string;
}

export const Footer = component$<FooterProps>(({ socialNetworks = [], logo, footerContent }) => {
    const getIcon = (iconName: string) => {
        return ICON_REGISTRY[iconName] || ICON_REGISTRY['default'];
    };

    const getSocialUrl = (item: SocialNetworkItem) => {
        if (typeof item.url === 'string') return item.url;
        if (item.url && typeof item.url === 'object') return item.url.url;
        return '#';
    };

    return (
        <footer class="bg-black text-white py-12 border-t border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div class="flex flex-col items-center justify-center text-center space-y-8">

                    {/* Brand Section */}
                    <div class="flex flex-col items-center">
                        {logo?.filename ? (
                            <img
                                src={logo.filename}
                                alt={logo.alt || "Logo Enlace en Salud"}
                                class="h-20 w-auto object-contain brightness-0 invert"
                                width={300}
                                height={100}
                            />
                        ) : (
                            <LogoFooter alt="Logo Enlace en Salud" />
                        )}
                        <p class="text-slate-400 text-md lg:text-lg leading-relaxed max-w-sm mt-6">
                            {footerContent || "Soluciones integrales y gestión sanitaria de excelencia."}
                        </p>
                    </div>

                    {/* Social Section */}
                    <div>
                        <div class="flex justify-center space-x-4">
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

                    {/* Copyright */}
                    <div class="text-xs text-slate-400 pt-8 border-t border-slate-900 w-full max-w-2xl">
                        &copy; {new Date().getFullYear()} Enlace en Salud. Todos los derechos reservados.
                    </div>

                </div>
            </div>
        </footer>
    );
});
