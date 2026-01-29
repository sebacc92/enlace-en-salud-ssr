import { component$ } from "@builder.io/qwik";
import { LuMail, LuGlobe } from "@qwikest/icons/lucide";
import LogoFooter from "~/media/img/logo-footer.webp?jsx";
import { ICON_REGISTRY } from "~/components/icons/registry";

// Define locally
export interface SocialNetwork {
    id?: number;
    platform: string;
    url: string;
    iconName: string;
}

interface FooterProps {
    socialNetworks?: SocialNetwork[];
    email?: string;
    logo?: { filename: string; alt?: string };
    footerContent?: string; // Assuming simple text or rich text html string
}

export const Footer = component$<FooterProps>(({ socialNetworks = [], email, logo, footerContent }) => {
    const getIcon = (iconName: string) => {
        return ICON_REGISTRY[iconName] || ICON_REGISTRY['default'];
    };

    const contactEmail = email || "comercial@enlacesalud.com.ar";

    return (
        <footer id="contacto" class="bg-black text-white py-12 border-t border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

                    {/* Brand */}
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

                        <p class="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 mt-4">
                            {footerContent || "Soluciones integrales y gestión sanitaria de excelencia."}
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div class="md:col-span-1">
                        <h2 class="text-lg font-semibold text-white mb-6">Contacto</h2>
                        <form class="space-y-4" preventdefault:submit>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    class="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    class="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm"
                                />
                            </div>

                            {/* Captcha Placeholder */}
                            <div class="bg-gray-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 flex items-center gap-3">
                                <div class="w-6 h-6 border-2 border-slate-300 rounded sm:w-5 sm:h-5 bg-white"></div>
                                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Protegido por ReCaptcha</span>
                            </div>

                            <button
                                type="submit"
                                class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                            >
                                Enviar
                            </button>
                        </form>

                        {/* Contact Info (Reduced) */}
                        <div class="mt-6 space-y-2">
                            <a
                                href={`mailto:${contactEmail}`}
                                class="flex items-center justify-center md:justify-start text-xs text-gray-400 hover:text-primary transition-colors gap-2"
                            >
                                <LuMail class="w-4 h-4" />
                                {contactEmail}
                            </a>
                            <a
                                href="https://ENLACESALUD.com.ar"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center justify-center md:justify-start text-xs text-gray-400 hover:text-primary transition-colors gap-2"
                            >
                                <LuGlobe class="w-4 h-4" />
                                ENLACESALUD.com.ar
                            </a>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h2 class="text-lg font-semibold text-white mb-6">Síguenos</h2>
                        <div class="flex justify-center md:justify-start space-x-4 mb-6">
                            {socialNetworks.map((social) => {
                                const IconComponent = getIcon(social.iconName);
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="bg-slate-800 hover:bg-primary p-3 rounded-full transition-colors"
                                        aria-label={social.platform}
                                    >
                                        <IconComponent class="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                        <div class="text-xs text-slate-400">
                            &copy; {new Date().getFullYear()} Enlace en Salud. <br />Todos los derechos reservados.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});
