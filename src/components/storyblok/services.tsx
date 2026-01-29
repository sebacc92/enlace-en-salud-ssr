import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from '@storyblok/js';
import { Services } from '../landing/services/services';

interface ServicesWrapperProps {
    blok: SbBlokData;
}

export default component$<ServicesWrapperProps>((props) => {
    const blok = props.blok as any;
    const servicesData = {
        tagline: blok.tagline,
        heading: blok.heading,
        subheading: blok.subheading,
        service_cards: blok.service_cards?.map((card: any) => ({
            id: card._uid,
            iconName: card.iconName || 'default', // Storyblok field names are typically snake_case
            title: card.title,
            description: card.description,
        })) || [],
    };

    return (
        <div {...storyblokEditable(props.blok)}>
            <Services data={servicesData as any} />
        </div>
    );
});
