import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";
import { Hero } from "~/components/landing/hero/hero"; // <--- Importamos tu componente ORIGINAL

interface HeroBlok extends SbBlokData {
    heading: string;
    subheading: string;
    image: {
        filename: string; // Storyblok usa 'filename' para la URL de la imagen
        alt?: string;
    };
    link_url?: {
        url: string;
    };
    link_text?: string;
}

interface Props {
    blok: HeroBlok;
}

export default component$<Props>((props) => {
    // Adaptamos los datos: De formato Storyblok -> A formato "HeroProps" que espera tu componente
    const adaptedData = {
        heading: props.blok.heading || '',
        subheading: props.blok.subheading || '',
        image: {
            // Storyblok devuelve la URL completa, así que tu Hero debe estar preparado para eso
            // (Tu código actual revisa `startsWith('http')`, así que funcionará perfecto)
            url: props.blok.image?.filename || '',
            width: 800, // Valores por defecto o podrías agregar campos en Storyblok para width/height
            height: 600,
            alternativeText: props.blok.image?.alt || 'Imagen Hero',
        },
        link: {
            href: props.blok.link_url?.url || '#',
            label: props.blok.link_text || 'Ver más',
        }
    };

    return (
        // Envolvemos tu Hero en un div que tiene la directiva storyblokEditable
        // Esto habilita el "Click para editar" en el editor visual
        <div {...storyblokEditable(props.blok)}>
            <Hero data={adaptedData} />
        </div>
    );
});