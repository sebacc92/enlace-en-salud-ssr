import { component$ } from "@builder.io/qwik";
import DoctorArmsImg from "~/media/img/doctor-arms.jpg?jsx";
import { StoryblokImage } from "~/components/ui/storyblok-image";
import { Reveal } from "~/components/ui/reveal";

export interface ImageFormat {
    url: string;
    width: number;
    height: number;
}

export interface Image {
    id?: number;
    url: string;
    width?: number;
    height?: number;
    formats?: {
        thumbnail: ImageFormat;
        small: ImageFormat;
        medium: ImageFormat;
        large: ImageFormat;
    };
    alternativeText?: string | null;
}

export interface AboutData {
    id?: number;
    tagline: string;
    heading: string;
    description: string;
    image: Image;
}

interface AboutProps {
    data?: AboutData;
}

export const About = component$<AboutProps>(({ data }) => {
    // Fallback static content
    const tagline = data?.tagline || "Nosotros";
    const heading = data?.heading || "Quiénes Somos";
    const description = data?.description || `Somos una empresa de soluciones integrales que opera bajo un innovador modelo de **gerenciamiento sanitario**. Nuestro objetivo principal es centralizar, coordinar y optimizar servicios, integrando la gestión comercial, los recursos humanos y la infraestructura tecnológica necesaria.

Entendemos la salud como un ecosistema complejo que requiere precisión y eficiencia. Por ello, actuamos como un nexo estratégico entre las necesidades de nuestros clientes y las soluciones médicas más adecuadas.`;

    const imageUrl = data?.image?.url || null;

    // Helper to render markdown-like description (bolding and newlines)
    const renderDescription = (text: string) => {
        return text.split('\n').map((paragraph, pIndex) => {
            if (!paragraph.trim()) return null;

            // Handle **bold**
            const parts = paragraph.split('**');
            const renderedParts = parts.map((part, index) => {
                if (index % 2 === 1) {
                    return <span key={`${pIndex}-${index}`} class="font-semibold text-cyan-700 dark:text-cyan-400">{part}</span>;
                }
                return <span key={`${pIndex}-${index}`}>{part}</span>;
            });

            return <p key={pIndex} class="mt-4 first:mt-0">{renderedParts}</p>;
        });
    };

    return (
        <section id="nosotros" class="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div class="text-center lg:text-left">
                        <Reveal>
                            <h2 class="text-base font-semibold tracking-wide text-cyan-700 dark:text-cyan-400 uppercase">{tagline}</h2>
                            <p class="mt-2 mb-6 text-3xl leading-8 font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                {heading}
                            </p>
                            <div class="prose prose-lg text-slate-600 dark:text-slate-300 mx-auto lg:mx-0">
                                {renderDescription(description)}
                            </div>
                        </Reveal>
                    </div>
                    <div class="mt-10 lg:mt-0 relative">
                        <Reveal direction="right" delay={300}>
                            <div class="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl relative group">
                                {imageUrl ? (
                                    <StoryblokImage
                                        src={imageUrl}
                                        alt={data?.image?.alternativeText || "Equipo médico profesional"}
                                        width={data?.image?.width || 800}
                                        height={data?.image?.height || 600}
                                        class="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        priority={false}
                                    />
                                ) : (
                                    <DoctorArmsImg
                                        alt="Equipo médico profesional"
                                        class="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                            </div>
                            {/* Decorative elements */}
                            <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-dots-pattern opacity-50"></div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
});
