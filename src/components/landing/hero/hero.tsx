import { component$ } from "@builder.io/qwik";
import { LuCalendarDays } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { StoryblokImage } from "~/components/ui/storyblok-image";
import { Reveal } from "~/components/ui/reveal";

interface HeroProps {
    data: {
        heading: string;
        subheading: string;
        image: {
            url: string;
            width: number;
            height: number;
            alternativeText: string | null;
        };
        link: {
            href: string;
            label: string;
        };
    }
}

const renderHeading = (text: string) => {
    if (!text) return null;
    const parts = text.split('*');

    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return (
                <span key={index} class="bg-clip-text text-transparent bg-[image:var(--gradient-brand)]">
                    {part}
                </span>
            );
        }
        // Si es par, es texto normal
        return <span key={index}>{part}</span>;
    });
};

export const Hero = component$<HeroProps>(({ data }) => {
    const imageUrl = data.image.url;

    return (
        <section id="inicio" class="relative pt-20 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent dark:from-primary/20"></div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
                    <div class="max-w-3xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
                        <Reveal>
                            <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 mt-6 lg:mt-0">
                                {renderHeading(data.heading)}
                            </h1>
                        </Reveal>

                        <Reveal delay={200}>
                            <p class="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                                {data.subheading}
                            </p>
                        </Reveal>

                        <Reveal delay={400}>
                            <a
                                href={data.link.href}
                                target="_blank"
                                // For this iteration, I'll just use the href. 
                                rel="noopener noreferrer"
                            >
                                <Button
                                    look="primary"
                                    size="lg"
                                    class="flex items-center gap-3 cursor-pointer border-0 bg-gradient-to-r from-[--primary] to-[#006080] text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:to-[#005070] hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide uppercase w-auto px-6 sm:px-8"
                                >
                                    <span>{data.link.label}</span>
                                    <LuCalendarDays class="w-5 h-5 stroke-white" />
                                </Button>

                            </a>
                        </Reveal>
                    </div>
                    <div class="relative w-full">
                        <Reveal direction="right" delay={600}>
                            <div class="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <StoryblokImage
                                    src={imageUrl}
                                    alt={data.image.alternativeText || 'Hero Image'}
                                    width={data.image.width}
                                    height={data.image.height}
                                    class="w-full h-auto object-cover aspect-[3/4]"
                                    priority={true}
                                />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </Reveal>
                        {/* Decorative floating card */}
                        <Reveal delay={800} direction="left">
                            <div class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 max-w-xs animate-bounce-slow">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-bold text-slate-900 dark:text-white">Confianza Total</p>
                                        <p class="text-xs text-slate-500 dark:text-slate-400">Profesionales certificados</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Abstract Shapes */}
            <div class="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </section>
    );
});
