import { component$ } from "@builder.io/qwik";
import HandsHeartImg from "~/media/img/hands-heart.jpg?jsx";
import { ICON_REGISTRY } from "~/components/icons/registry";

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

export interface PhilosophyPillar {
    id?: number;
    iconName: string;
    title: string;
    description: string;
}

export interface PhilosophyData {
    id?: number;
    heading: string;
    subheading: string;
    missionTitle: string;
    missionText: string;
    visionTitle: string;
    visionText: string;
    featuredTitle: string;
    featuredText: string;
    featuredImage: Image;
    pillars: PhilosophyPillar[];
}

interface PhilosophyProps {
    data?: PhilosophyData;
}

export const Philosophy = component$<PhilosophyProps>(({ data }) => {
    const heading = data?.heading || "Filosofía Corporativa";
    const subheading = data?.subheading || "Nuestros pilares fundamentales que guían cada acción.";

    const missionTitle = data?.missionTitle || "Misión";
    const missionText = data?.missionText || "Brindar soluciones integrales mediante una gestión eficiente, humana y profesional, adaptándonos a las necesidades específicas de cada cliente.";

    const visionTitle = data?.visionTitle || "Visión";
    const visionText = data?.visionText || "Ser el referente en gerenciamiento sanitario, reconocidos por nuestra capacidad de respuesta, eficiencia y confiabilidad en el mercado.";

    const featuredTitle = data?.featuredTitle || "Compromiso Humano";
    const featuredText = data?.featuredText || "La empatía es el motor de nuestra excelencia operativa.";

    const imageUrl = data?.featuredImage?.url || null;

    const pillars = data?.pillars || [];

    const getIcon = (iconName: string) => {
        return ICON_REGISTRY[iconName] || ICON_REGISTRY['default'];
    };

    return (
        <section class="py-12 md:py-16 lg:py-20 bg-slate-50 dark:bg-slate-950">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        {heading}
                    </h2>
                    <p class="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
                        {subheading}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 mb-16 items-center">
                    <div class="space-y-8">
                        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border-l-4 border-cyan-500 text-center lg:text-left">
                            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">{missionTitle}</h3>
                            <p class="text-lg text-slate-600 dark:text-slate-300">
                                {missionText}
                            </p>
                        </div>
                        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border-l-4 border-blue-600 text-center lg:text-left">
                            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">{visionTitle}</h3>
                            <p class="text-lg text-slate-600 dark:text-slate-300">
                                {visionText}
                            </p>
                        </div>
                    </div>
                    {/* Visual commitment block */}
                    <div class="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={data?.featuredImage?.alternativeText || "Compromiso y cuidado humano"}
                                width={data?.featuredImage?.width}
                                height={data?.featuredImage?.height}
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <HandsHeartImg
                                alt="Compromiso y cuidado humano"
                                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                        <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-8 text-white">
                            <h3 class="text-2xl font-bold mb-2">{featuredTitle}</h3>
                            <p class="text-white/90">{featuredText}</p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar, index) => {
                        const IconComponent = getIcon(pillar.iconName);
                        return (
                            <div key={index} class="text-center p-6">
                                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-4 shadow-sm">
                                    <IconComponent class="w-7 h-7" />
                                </div>
                                <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">{pillar.title}</h4>
                                <p class="text-sm text-slate-600 dark:text-slate-400">
                                    {pillar.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});
