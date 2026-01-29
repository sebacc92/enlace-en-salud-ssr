import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from '@storyblok/js';
import { Target } from '../landing/target/target';

interface TargetWrapperProps {
    blok: SbBlokData;
}

export default component$<TargetWrapperProps>((props) => {
    const blok = props.blok as any;
    const targetData = {
        heading: blok.heading,
        cards: blok.cards?.map((card: any) => ({
            id: card._uid,
            iconName: card.icon_name || 'default',
            label: card.label,
        })) || [],
    };

    return (
        <div {...storyblokEditable(props.blok)}>
            <Target data={targetData as any} />
        </div>
    );
});
