import { component$ } from "@builder.io/qwik";
import { ICON_REGISTRY } from "~/components/icons/registry";

export interface TargetCard {
    id?: number;
    iconName: string;
    label: string;
}

export interface TargetData {
    id?: number;
    heading: string;
    cards: TargetCard[];
}

interface TargetProps {
    data?: TargetData;
}

export const Target = component$<TargetProps>(({ data }) => {
    // Default fallback if no data
    const heading = data?.heading || "Público Objetivo";
    const targets = data?.cards || [];

    const getIcon = (iconName: string) => {
        return ICON_REGISTRY[iconName] || ICON_REGISTRY['default'];
    };

    return (
        <section class="py-20 bg-white dark:bg-slate-900">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-12">
                    {heading}
                </h2>

                <div class="grid grid-cols-2 lg:grid-cols-5 gap-8">
                    {targets.map((item, index) => {
                        const IconComponent = getIcon(item.iconName);
                        // Storyblok sends 'label' or 'name'. Using label as primary.
                        return (
                            <div
                                key={index}
                                class="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                            >
                                <IconComponent class="w-12 h-12 mx-auto text-slate-400 group-hover:text-cyan-600 transition-colors mb-4" />
                                <span class="text-lg font-medium text-slate-700 group-hover:text-cyan-700 dark:text-slate-300 dark:group-hover:text-cyan-400">
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
});
