import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from '@storyblok/js';
import { About } from '../landing/about/about';

interface AboutWrapperProps {
    blok: SbBlokData;
}

export default component$<AboutWrapperProps>((props) => {
    // Map Storyblok data to About component props
    const blok = props.blok as any;
    const aboutData = {
        tagline: blok.tagline,
        heading: blok.heading,
        description: blok.description,
        image: blok.image ? {
            url: blok.image.filename,
            alternativeText: blok.image.alt,
            width: 800, // Default or infer if possible, but Storyblok simple image object often just has filename
            height: 600, // Storyblok filename often contains dimensions like /.../800x600/..., parsing could be an option but simplicity first.
        } : undefined,
    };

    return (
        <div {...storyblokEditable(props.blok)}>
            <About data={aboutData as any} />
        </div>
    );
});
