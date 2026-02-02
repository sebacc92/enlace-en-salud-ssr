import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { LuMail, LuGlobe } from "@qwikest/icons/lucide";
import { useSendContactEmail } from "~/routes/layout";
import { Button } from "~/components/ui/button/button";

// Definimos la interfaz para window.turnstile para TypeScript
declare global {
    interface Window {
        turnstile: any;
    }
}

export interface ContactProps {
    title?: string;
    description?: string;
    buttonLabel?: string;
    successMessage?: string;
    email?: string;
    locationUrl?: string;
}

export const Contact = component$<ContactProps>(({
    title = "Contacto",
    description = "Estamos aquí para ayudarte. Contáctanos y responderemos tus consultas a la brevedad.",
    buttonLabel = "Enviar Mensaje",
    successMessage = "¡Mensaje enviado con éxito!",
    email,
}) => {
    const contactEmail = email || "comercial@enlacesalud.com.ar";
    const action = useSendContactEmail();
    const containerRef = useSignal<HTMLElement>();
    // Usamos un signal para guardar el token explícitamente
    const turnstileToken = useSignal('');

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
        track(() => containerRef.value);

        if (typeof window === 'undefined' || !containerRef.value) return;

        // Función para renderizar el widget
        const renderWidget = () => {
            if (window.turnstile) {
                window.turnstile.render(containerRef.value, {
                    sitekey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY,
                    theme: 'light',
                    callback: function (token: string) {
                        console.log('Turnstile success:', token);
                        turnstileToken.value = token;
                    },
                    'expired-callback': function () {
                        turnstileToken.value = ''; // Limpiar si expira
                    },
                });
            }
        };

        // Inyectar el script si no existe
        if (!document.getElementById('turnstile-script')) {
            const script = document.createElement('script');
            script.id = 'turnstile-script';
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
            script.defer = true;
            script.onload = renderWidget;
            document.head.appendChild(script);
        } else {
            // Si ya existe (ej. navegación SPA), solo renderizamos
            renderWidget();
        }
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
                    <div class="bg-gray-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                        {action.value?.success ? (
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
                            </div>
                        ) : (
                            <Form class="space-y-6" action={action}>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nombre</label>
                                        <input
                                            name="nombre"
                                            type="text"
                                            placeholder="Tu nombre"
                                            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        />
                                        {action.value?.fieldErrors?.nombre && <p class="text-red-500 text-sm mt-1">{action.value.fieldErrors.nombre}</p>}
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                        />
                                        {action.value?.fieldErrors?.email && <p class="text-red-500 text-sm mt-1">{action.value.fieldErrors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mensaje</label>
                                    <textarea
                                        name="mensaje"
                                        rows={4}
                                        placeholder="¿En qué podemos ayudarte?"
                                        class="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                    ></textarea>
                                    {action.value?.fieldErrors?.mensaje && <p class="text-red-500 text-sm mt-1">{action.value.fieldErrors.mensaje}</p>}
                                </div>

                                {/* Global Error Message */}
                                {action.value?.failed && <p class="text-red-600 font-bold bg-red-100 p-2 rounded">{action.value.message}</p>}

                                {/* IMPORTANTE: 
                                    1. El div ref={containerRef} es donde Cloudflare montará el widget.
                                    2. El input hidden lleva el token al servidor.
                                */}
                                <div class="min-h-[65px]">
                                    <div ref={containerRef}></div>
                                </div>
                                <input type="hidden" name="cf-turnstile-response" value={turnstileToken.value} />

                                <Button
                                    type="submit"
                                    size="lg"
                                    // Deshabilitamos si está cargando O si no tenemos token de Turnstile aún
                                    disabled={action.isRunning || !turnstileToken.value}
                                    class="w-full border-0 bg-gradient-to-r from-[--primary] to-[#006080] text-white font-bold tracking-wide uppercase py-4 rounded-xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {action.isRunning ? 'Enviando...' : buttonLabel}
                                </Button>
                            </Form>
                        )}

                        <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href={`mailto:${contactEmail}`} class="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                <div class="p-2 bg-primary/10 rounded-full text-primary"><LuMail class="w-5 h-5" /></div>
                                <span class="truncate font-medium">{contactEmail}</span>
                            </a>
                            <a href="https://ENLACESALUD.com.ar" target="_blank" rel="noopener noreferrer" class="flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                <div class="p-2 bg-primary/10 rounded-full text-primary"><LuGlobe class="w-5 h-5" /></div>
                                <span class="font-medium">ENLACESALUD.com.ar</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});