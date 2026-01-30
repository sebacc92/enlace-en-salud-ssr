import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { LuMenu, LuX } from "@qwikest/icons/lucide";
import Logo from "~/media/img/logo-web-es.svg?jsx";
import { ICON_REGISTRY } from "~/components/icons/registry";

// Define locally to avoid circular deps with index
export interface SocialNetwork {
    id?: number;
    platform: string;
    url: string;
    iconName: string;
}

export interface NavItem {
    _uid: string;
    label: string;
    link: {
        id: string;
        url: string;
        linktype: "story" | "url";
        fieldtype: "multilink";
        cached_url: string;
        anchor?: string;
    };
}

interface NavbarProps {
    socialNetworks?: SocialNetwork[];
    logo?: { filename: string; alt?: string };
    menuItems?: NavItem[];
    logoHeightMobile?: number;
    logoHeightDesktop?: number;
}

export const Navbar = component$<NavbarProps>(({ socialNetworks = [], logo, menuItems = [], logoHeightMobile = 40, logoHeightDesktop = 64 }) => {
    const isOpen = useSignal(false);

    const getIcon = (iconName: string) => {
        return ICON_REGISTRY[iconName] || ICON_REGISTRY['default'];
    };

    const getLinkUrl = (item: NavItem) => {
        if (item.link.linktype === 'story') {
            let url = item.link.cached_url;
            if (!url.startsWith('/')) {
                url = '/' + url;
            }
            if (item.link.anchor) {
                url += `#${item.link.anchor}`;
            }
            return url;
        } else {
            return item.link.url;
        }
    };

    return (
        <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 dark:bg-slate-950/90 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div class="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            aria-label="Enlace en Salud - Ir a inicio"
                            style={{
                                '--logo-h-mobile': `${logoHeightMobile}px`,
                                '--logo-h-desktop': `${logoHeightDesktop}px`
                            }}
                        >
                            {logo?.filename ? (
                                <img
                                    src={logo.filename}
                                    alt={logo.alt || "Enlace en Salud"}
                                    class="w-auto h-[var(--logo-h-mobile)] md:h-[var(--logo-h-desktop)] transition-all duration-300 object-contain"
                                    width={150}
                                    height={logoHeightDesktop}
                                />
                            ) : (
                                <Logo class="w-auto h-[var(--logo-h-mobile)] md:h-[var(--logo-h-desktop)] transition-all duration-300" />
                            )}
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div class="hidden md:flex items-center space-x-8">
                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <Link
                                    key={item._uid}
                                    href={getLinkUrl(item)}
                                    class="text-muted-foreground hover:text-primary transition-colors text-md font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))
                        ) : (
                            // Fallback static menu if no dynamic items
                            ["Inicio", "Nosotros", "Servicios", "Modelo", "Contacto"].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    class="text-muted-foreground hover:text-primary transition-colors text-md font-medium"
                                >
                                    {item}
                                </Link>
                            ))
                        )}

                        {/* Social Media Links */}
                        <div class="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                            {socialNetworks.map((social) => {
                                const IconComponent = getIcon(social.iconName);
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label={social.platform}
                                    >
                                        <IconComponent class="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div class="md:hidden flex items-center">
                        <button
                            onClick$={() => (isOpen.value = !isOpen.value)}
                            class="text-muted-foreground hover:text-primary focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen.value ? <LuX class="w-6 h-6" /> : <LuMenu class="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen.value && (
                <div class="md:hidden bg-white border-b border-slate-100 dark:bg-slate-950 dark:border-slate-800 animate-accordion-down overflow-hidden">
                    <div class="px-4 pt-2 pb-6 space-y-2">
                        {menuItems.length > 0 ? (
                            menuItems.map((item) => (
                                <Link
                                    key={item._uid}
                                    href={getLinkUrl(item)}
                                    class="block px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                    onClick$={() => (isOpen.value = false)}
                                >
                                    {item.label}
                                </Link>
                            ))
                        ) : (
                            // Fallback static menu
                            ["Inicio", "Servicios", "Modelo", "Nosotros", "Contacto"].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    class="block px-3 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                    onClick$={() => (isOpen.value = false)}
                                >
                                    {item}
                                </Link>
                            ))
                        )}

                        {/* Social Media Links - Mobile */}
                        <div class="flex items-center justify-center space-x-6 pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
                            {socialNetworks.map((social) => {
                                const IconComponent = getIcon(social.iconName);
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label={social.platform}
                                    >
                                        <IconComponent class="w-6 h-6" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
});
