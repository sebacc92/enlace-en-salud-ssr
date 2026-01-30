import { component$ } from "@builder.io/qwik";
import { LuMail, LuGlobe } from "@qwikest/icons/lucide";

interface ContactProps {
    mapUrl?: string;
    email?: string;
}

export const Contact = component$<ContactProps>(({ mapUrl, email }) => {
    const contactEmail = email || "comercial@enlacesalud.com.ar";

    const getEmbedUrl = (url?: string) => {
        const defaultQuery = "Miramar, Argentina";
        let query = defaultQuery;

        if (url && url.trim() !== "") {
            if (url.includes("output=embed")) {
                return url;
            }
            query = url;
        }

        const encodedQuery = encodeURIComponent(query);
        return `https://maps.google.com/maps?q=${encodedQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    };

    const finalMapUrl = getEmbedUrl(mapUrl);

    return (
        <section id="contacto" class="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Contacto
                    </h2>
                    <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Estamos aquí para ayudarte. Contáctanos y responderemos tus consultas a la brevedad.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Map Section - Left */}
                    <div class="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 relative">
                        <iframe
                            src={finalMapUrl}
                            class="absolute inset-0 w-full h-full border-0"
                            loading="lazy"
                            allowFullscreen={true}
                            title="Ubicación"
                        ></iframe>
                    </div>

                    {/* Form Section - Right */}
                    <div class="bg-gray-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-6">Envíanos un mensaje</h3>
                        <form class="space-y-6" preventdefault:submit>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        placeholder="Tu nombre"
                                        class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="tu@email.com"
                                        class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mensaje</label>
                                <textarea
                                    rows={4}
                                    placeholder="¿En qué podemos ayudarte?"
                                    class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                ></textarea>
                            </div>

                            {/* Captcha Placeholder */}
                            <div class="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-3 flex items-center gap-3 w-fit">
                                <div class="w-6 h-6 border-2 border-slate-300 rounded sm:w-5 sm:h-5 bg-white"></div>
                                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Protegido por ReCaptcha</span>
                            </div>

                            <button
                                type="submit"
                                class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5"
                            >
                                Enviar Mensaje
                            </button>
                        </form>

                        {/* Quick Contact Info */}
                        <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href={`mailto:${contactEmail}`}
                                class="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <div class="p-2 bg-primary/10 rounded-full text-primary">
                                    <LuMail class="w-5 h-5" />
                                </div>
                                <span class="truncate font-medium">{contactEmail}</span>
                            </a>
                            <a
                                href="https://ENLACESALUD.com.ar"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <div class="p-2 bg-primary/10 rounded-full text-primary">
                                    <LuGlobe class="w-5 h-5" />
                                </div>
                                <span class="font-medium">ENLACESALUD.com.ar</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
});
