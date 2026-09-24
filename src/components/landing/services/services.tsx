import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/card/card";
import { ICON_REGISTRY } from "~/components/icons/registry";
import { Reveal } from "~/components/ui/reveal";

// Re-define interfaces locally to avoid circular dependencies if exporting from index
// Re-define interfaces locally to avoid circular dependencies if exporting from index
export interface ServiceCard {
    id?: number;
    iconName: string;
    title: string;
    description: string;
    link?: string;
}

export interface ServicesData {
    id?: number;
    tagline: string;
    heading: string;
    subheading: string;
    service_cards: ServiceCard[];
}

interface ServicesProps {
    data?: ServicesData;
}

const getIcon = (iconName: string) => {
    return ICON_REGISTRY[iconName] || ICON_REGISTRY['default'];
};

export const Services = component$<ServicesProps>(({ data }) => {
    // Default/Fallback data structure if no data is passed (or handle gracefully)
    // For now, if no data, we might want to return nothing or a skeletal state. 
    // But since we are incrementally migrating, I should provide a fallback or ensure data is passed.
    // The previous implementation had hardcoded data. I will assume data is passed or use empty defaults.

    const tagline = data?.tagline || "Servicios";
    const heading = data?.heading || "Qué Hacemos";
    const subheading = data?.subheading || "Brindamos un abanico de servicios diseñados para cubrir todas las necesidades sanitarias.";

    const services = data?.service_cards ? [...data.service_cards] : [];
    if (!services.some(s => s.title.toLowerCase().includes('cardio'))) {
        services.push({
            iconName: 'HeartPulse',
            title: 'Áreas Cardioasistidas',
            description: 'Implementación integral de zonas seguras con desfibriladores (DEA) y capacitación en RCP.',
            link: '/area-cardioasistida'
        });
    }

    return (
        <section id="servicios" class="py-12 md:py-16 lg:py-20 bg-slate-50 dark:bg-slate-950">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <Reveal>
                        <h2 class="text-base font-semibold tracking-wide text-primary uppercase">{tagline}</h2>
                        <p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                            {heading}
                        </p>
                        <p class="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
                            {subheading}
                        </p>
                    </Reveal>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = getIcon(service.iconName);

                        const CardInner = (
                            <Card.Root
                                class={`hover:shadow-lg transition-shadow duration-300 text-center h-full flex flex-col ${service.link ? 'hover:border-primary/50 cursor-pointer hover:-translate-y-1 transition-all' : ''}`}
                            >
                                <Card.Header class="pb-4">
                                    <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-2">
                                        {IconComponent && <IconComponent class="w-7 h-7" />}
                                    </div>
                                    <Card.Title class="text-xl font-bold text-slate-900 dark:text-white">{service.title}</Card.Title>
                                </Card.Header>
                                <Card.Content class="flex-grow">
                                    <Card.Description class="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                                        {service.description}
                                    </Card.Description>
                                </Card.Content>
                            </Card.Root>
                        );

                        return (
                            <Reveal key={index} delay={index * 100} class="h-full">
                                {service.link ? (
                                    <a href={service.link} class="block h-full no-underline outline-none">
                                        {CardInner}
                                    </a>
                                ) : (
                                    CardInner
                                )}
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});
