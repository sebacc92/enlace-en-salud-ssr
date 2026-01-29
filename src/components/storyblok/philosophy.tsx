import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from '@storyblok/js';
import { Philosophy } from '../landing/philosophy/philosophy';

interface PhilosophyWrapperProps {
    blok: SbBlokData;
}

export default component$<PhilosophyWrapperProps>((props) => {
    const blok = props.blok as any;
    const philosophyData = {
        heading: blok.heading,
        subheading: blok.subheading,
        missionTitle: blok.mission_title,
        missionText: blok.mission_text,
        visionTitle: blok.vision_title,
        visionText: blok.vision_text,
        featuredTitle: blok.featured_title,
        featuredText: blok.featured_text,
        featuredImage: blok.featured_image ? {
            url: blok.featured_image.filename,
            alternativeText: blok.featured_image.alt,
        } : undefined,
        pillars: blok.pillars?.map((pillar: any) => ({
            id: pillar._uid,
            iconName: pillar.icon_name || 'default',
            title: pillar.title,
            description: pillar.description,
        })) || [],
    };

    return (
        <div {...storyblokEditable(props.blok)}>
            <Philosophy data={philosophyData as any} />
        </div>
    );
});
