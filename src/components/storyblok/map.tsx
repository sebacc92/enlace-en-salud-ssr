import { component$ } from '@builder.io/qwik';
import { storyblokEditable, type SbBlokData } from "@storyblok/js";

export interface MapBlok extends SbBlokData {
    location_url?: string;
}

interface MapProps {
    blok: MapBlok;
}

export default component$<MapProps>(({ blok }) => {
    const defaultUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.123456789!2d-57.8!3d-38.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3AMiramar!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar";
    const mapUrl = blok.location_url && blok.location_url.trim() !== ""
        ? blok.location_url
        : defaultUrl;

    return (
        <div {...storyblokEditable(blok)} class="w-full">
            <iframe
                src={mapUrl}
                class="w-full min-h-[400px] rounded-2xl shadow-lg border-0"
                loading="lazy"
                allowFullscreen={true}
                title="Mapa de ubicación"
            ></iframe>
        </div>
    );
});
