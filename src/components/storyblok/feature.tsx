import { component$ } from '@builder.io/qwik';
import { storyblokEditable } from "@storyblok/js";
import type { SbBlokData } from "@storyblok/js";

interface FeatureProps {
    blok: SbBlokData & {
        name?: string; // Tipado específico de tus campos en Storyblok
    };
}

export default component$<FeatureProps>((props) => {
    // {...storyblokEditable(props.blok)} añade los atributos data-blok-c y data-blok-uid
    // que el editor visual usa para saber dónde estás haciendo clic.
    return (
        <div {...storyblokEditable(props.blok)} class="w-full p-12 bg-[#f7f6fd] rounded text-center my-4">
            <h3 class="text-2xl text-[#1d243d] font-bold">
                {props.blok.name || "Feature sin nombre"}
            </h3>
        </div>
    );
});