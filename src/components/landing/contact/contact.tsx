import { component$, useSignal, $ } from "@builder.io/qwik";
import { LuMail, LuGlobe } from "@qwikest/icons/lucide";

export interface ContactProps {
    title?: string;
    description?: string;
    buttonLabel?: string;
    successMessage?: string;
    email?: string;
    locationUrl?: string; // Optional if needed for linking, but map logic removed
}

export const Contact = component$<ContactProps>(({
    title = "Contacto",
    description = "Estamos aquí para ayudarte. Contáctanos y responderemos tus consultas a la brevedad.",
    buttonLabel = "Enviar Mensaje",
    successMessage = "¡Mensaje enviado con éxito!",
    email,
    // locationUrl
}) => {
    const contactEmail = email || "comercial@enlacesalud.com.ar";
    const formStatus = useSignal<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = $(() => {
        formStatus.value = 'submitting';
        // Simulate API call
        setTimeout(() => {
            formStatus.value = 'success';
        }, 1000);
    });

    return (
        <section id="contacto" class="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        {title}
                    </h2>
                    <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div class="max-w-3xl mx-auto">
                    {/* Form Section - Centered since Map is gone */}
                    <div class="bg-gray-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                        {formStatus.value === 'success' ? (
                            <div class="text-center py-12">
                                <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">¡Mensaje Enviado!</h3>
                                <p class="text-slate-600 dark:text-slate-400">
                                    {successMessage || "Gracias por contactarnos. Te responderemos a la brevedad."}
                                </p>
                                <button
                                    onClick$={() => formStatus.value = 'idle'}
                                    class="mt-6 text-primary hover:text-primary/80 font-medium"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form class="space-y-6" preventdefault:submit onSubmit$={handleSubmit}>
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
                                    disabled={formStatus.value === 'submitting'}
                                    class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formStatus.value === 'submitting' ? 'Enviando...' : buttonLabel}
                                </button>
                            </form>
                        )}

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
