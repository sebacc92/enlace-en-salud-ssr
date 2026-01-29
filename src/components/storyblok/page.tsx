import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import StoryblokComponent from "./component";

interface PageProps {
    blok: SbBlokData & {
        body?: SbBlokData[];
    };
}

export default component$<PageProps>((props) => {
    return (
        <main {...storyblokEditable(props.blok)} class="min-h-screen">
            {(props.blok.body || []).map((nestedBlock) => (
                <StoryblokComponent key={nestedBlock._uid} blok={nestedBlock} />
            ))}
        </main>
    );
});