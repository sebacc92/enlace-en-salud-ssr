import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';

interface SiteImageProps {
    src: string;
    alt: string;
    class?: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

export const SiteImage = component$<SiteImageProps>((props) => {
    const { src, alt, class: className, width, height, priority = false } = props;

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            class={className}
            priority={priority}
            layout="constrained"
        />
    );
});
