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
        <section id="inicio" class="relative w-full min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col lg:flex-row overflow-hidden bg-slate-50 dark:bg-slate-950 pt-[56px] lg:pt-0">
            {/* Left Column: Content */}
            <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 order-2 lg:order-1 relative z-10">
                <div class="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                    <Reveal>
                        <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-6">
                            {renderHeading(data.heading)}
                        </h1>
                    </Reveal>

                    <Reveal delay={200}>
                        <p class="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                            {data.subheading}
                        </p>
                    </Reveal>

                    <Reveal delay={400}>
                        <a
                            href={data.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-block"
                        >
                            <Button
                                look="primary"
                                size="lg"
                                class="flex items-center gap-3 cursor-pointer border-0 bg-gradient-to-r from-[--primary] to-[#006080] text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:to-[#005070] hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide uppercase px-8"
                            >
                                <span>{data.link.label}</span>
                                <LuCalendarDays class="w-5 h-5 stroke-white" />
                            </Button>
                        </a>
                    </Reveal>
                </div>
            </div>

            {/* Right Column: Image */}
            <div class="w-full lg:w-1/2 h-[50vh] min-h-[400px] lg:h-auto relative order-1 lg:order-2">
                <StoryblokImage
                    src={imageUrl}
                    alt={data.image.alternativeText || 'Hero Image'}
                    class="absolute inset-0 w-full h-full object-cover object-[center_20%] lg:object-center"
                    priority={true}
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent lg:bg-gradient-to-r lg:from-slate-50 lg:dark:from-slate-950 lg:to-transparent opacity-60 lg:opacity-30"></div>
            </div>
        </section>
    );
});
