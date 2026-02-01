import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link } from '@builder.io/qwik-city';

// NOTA PARA EL DESARROLLADOR:
// Esta página 404 personalizada puede no visualizarse correctamente en el entorno de desarrollo (npm start)
// debido a cómo Vite maneja las rutas no encontradas.
// Para probarla y ver el diseño final, por favor utiliza: npm run preview
// o despliega la aplicación.

export default component$(() => {
    return (
        <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
            {/* Icono/Ilustración */}
            <div class="text-9xl opacity-20 mb-6 animate-bounce select-none">
                🧭
            </div>

            {/* Título */}
            <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                ¡Ups! Ruta equivocada
            </h1>

            {/* Mensaje */}
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
                Parece que la página que buscas no existe o se ha movido de lugar.
                Revisa la URL o regresa al inicio.
            </p>

            {/* Botones de Acción */}
            <div class="flex flex-col sm:flex-row items-center gap-4">
                <Link
                    href="/"
                    class="px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5"
                >
                    Volver al Inicio
                </Link>

                <Link
                    href="/#contacto"
                    class="px-8 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all bg-transparent"
                >
                    Contactar Soporte
                </Link>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Página no encontrada - Enlace Salud",
    meta: [
        {
            name: "description",
            content: "La página que buscas no existe.",
        },
    ],
};
