import { component$ } from "@builder.io/qwik";
import { LuCheckCircle2 } from "@qwikest/icons/lucide";
import { Card } from "~/components/ui/card/card";
import LaptopImg from "~/media/img/laptop-typing.jpg?jsx";
import { StoryblokImage } from "~/components/ui/storyblok-image";

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

export interface HealthManagementData {
    id?: number;
    tagline: string;
    heading: string;
    description: string;
    benefitsTitle: string;
    benefits: string;
    statNumber: string;
    statLabel: string;
    image: Image;
}

interface ModelProps {
    data?: HealthManagementData;
}

export const Model = component$<ModelProps>(({ data }) => {
    // Fallback static data
    const tagline = data?.tagline || "Nuestro Modelo";
    const heading = data?.heading || "Gerenciadora de Salud";
    const description = data?.description || "Actuamos como un <b>único punto de contacto</b>, simplificando la complejidad del sistema sanitario para su empresa.";
    const benefitsTitle = data?.benefitsTitle || "Beneficios Clave";

    // Parse benefits: split by newline and filter empty
    const benefitsString = data?.benefits || "Optimización de tiempos de respuesta\nReducción de costos operativos\nCalidad médica estandarizada\nTrazabilidad total de prestaciones";
    const benefits = benefitsString.split('\n').filter(line => line.trim() !== '');

    const statNumber = data?.statNumber || "100%";
    const statLabel = data?.statLabel || "Gestión Centralizada";

    const imageUrl = data?.image?.url || null;

    // Helper to render description with HTML support (simple <b> replacement)
    const renderDescription = (text: string) => {
        // Simple regex split for <b> tags. Note: This is a basic parser.
        const parts = text.split(/(<b>|<\/b>)/g);
        let isBold = false;
        return parts.map((part, index) => {
            if (part === '<b>') {
                isBold = true;
                return null;
            }
            if (part === '</b>') {
                isBold = false;
                return null;
            }
            if (!part) return null;

            if (isBold) {
                return <span key={index} class="font-semibold text-slate-900 dark:text-white">{part}</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <section id="modelo" class="py-12 md:py-16 lg:py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center max-w-3xl mx-auto mb-16">
                    <h2 class="text-base font-semibold tracking-wide text-primary uppercase">{tagline}</h2>
                    <p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        {heading}
                    </p>
                    <p class="mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-400 lg:mx-auto">
                        {renderDescription(description)}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <Card.Root class="p-8 lg:p-12 flex flex-col justify-center text-center lg:text-left">
                        <Card.Header class="p-0 mb-6">
                            <Card.Title class="text-2xl font-bold">{benefitsTitle}</Card.Title>
                        </Card.Header>
                        <Card.Content class="p-0">
                            <ul class="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} class="flex items-center lg:items-start flex-col lg:flex-row">
                                        <LuCheckCircle2 class="h-6 w-6 text-primary mb-2 lg:mb-0 lg:mr-3 flex-shrink-0" />
                                        <span class="text-lg text-muted-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card.Content>
                    </Card.Root>
                    <div class="relative rounded-3xl overflow-hidden min-h-[300px] bg-primary flex items-center justify-center p-8 text-center text-primary-foreground group">
                        {/* Background Image */}
                        {imageUrl ? (
                            <StoryblokImage
                                src={imageUrl}
                                alt={data?.image?.alternativeText || "Gestión digital"}
                                width={data?.image?.width}
                                height={data?.image?.height}
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                priority={false}
                            />
                        ) : (
                            <LaptopImg
                                alt="Gestión digital"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                            />
                        )}

                        {/* Visual representation concept */}
                        <div class="relative z-10">
                            <div class="text-5xl font-bold mb-2">{statNumber}</div>
                            <div class="text-xl">{statLabel}</div>
                        </div>
                        <div class="absolute inset-0 bg-gradient-brand opacity-80 mix-blend-multiply"></div>
                    </div>
                </div>
            </div>
        </section>
    );
});
