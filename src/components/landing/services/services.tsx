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

    const services = data?.service_cards || [];

    return (
        <section id="servicios" class="py-20 bg-slate-50 dark:bg-slate-950">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <Reveal>
                        <h2 class="text-base font-semibold tracking-wide text-cyan-700 dark:text-cyan-400 uppercase">{tagline}</h2>
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
                        return (
                            <Reveal key={index} delay={index * 100} class="h-full">
                                <Card.Root
                                    class="hover:shadow-md transition-shadow duration-300 text-center h-full"
                                >
                                    <Card.Header>
                                        <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                                            {IconComponent && <IconComponent class="w-6 h-6" />}
                                        </div>
                                        <Card.Title class="text-xl">{service.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Content>
                                        <Card.Description class="text-base leading-relaxed">
                                            {service.description}
                                        </Card.Description>
                                    </Card.Content>
                                </Card.Root>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});
