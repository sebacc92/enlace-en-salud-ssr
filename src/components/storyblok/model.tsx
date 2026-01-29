import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from '@storyblok/js';
import { Model } from '../landing/model/model';

interface ModelWrapperProps {
    blok: SbBlokData;
}

export default component$<ModelWrapperProps>((props) => {
    const blok = props.blok as any;
    const modelData = {
        tagline: blok.tagline,
        heading: blok.heading,
        description: blok.description,
        benefitsTitle: blok.benefits_title,
        benefits: blok.benefits, // Expecting a textarea string from Storyblok
        statNumber: blok.stat_number,
        statLabel: blok.stat_label,
        image: blok.image ? {
            url: blok.image.filename,
            alternativeText: blok.image.alt,
        } : undefined,
    };

    return (
        <div {...storyblokEditable(props.blok)}>
            <Model data={modelData as any} />
        </div>
    );
});
