import { component$ } from "@builder.io/qwik";
import { Hero } from "~/components/landing/hero/hero";
import { About } from "~/components/landing/about/about";
import { Services } from "~/components/landing/services/services";
import { Model } from "~/components/landing/model/model";
import { Philosophy } from "~/components/landing/philosophy/philosophy";
import { Target } from "~/components/landing/target/target";
import { Contact } from "~/components/landing/contact/contact";
import type { Section } from "~/lib/content";

const MapEmbed = component$<{ locationUrl?: string; mapsLink?: string }>(({ locationUrl, mapsLink }) => {
  const defaultUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.123456789!2d-57.8!3d-38.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3AMiramar!5e0!3m2!1ses!2sar!4v1600000000000!5m2!1ses!2sar";

  const getEmbedUrl = (url?: string) => {
    if (!url || !url.trim()) return defaultUrl;
    const cleanUrl = url.trim();
    if (cleanUrl.startsWith("https://www.google.com/maps/embed")) {
      return cleanUrl;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(cleanUrl)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div class="w-full">
      <iframe
        src={getEmbedUrl(locationUrl)}
        class="w-full min-h-[400px] rounded-2xl shadow-lg border-0"
        loading="lazy"
        allowFullscreen={true}
        title="Mapa de ubicación"
      ></iframe>
      {mapsLink && (
        <div class="mt-4 flex justify-center">
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow-md transition-opacity hover:opacity-90"
          >
            Ver ubicación en Google Maps ↗
          </a>
        </div>
      )}
    </div>
  );
});

interface SectionsProps {
  sections: Section[];
  contactEmail?: string;
}

export const Sections = component$<SectionsProps>(({ sections, contactEmail }) => {
  return (
    <>
      {sections.map((section) => {
        switch (section.key) {
          case "hero":
            return <Hero key={section.key} data={section.data} />;
          case "about":
            return <About key={section.key} data={section.data} />;
          case "services":
            return <Services key={section.key} data={section.data} />;
          case "health-management":
            return <Model key={section.key} data={section.data} />;
          case "philosophy":
            return <Philosophy key={section.key} data={section.data} />;
          case "target-audience":
            return <Target key={section.key} data={section.data} />;
          case "contact_section":
            return (
              <Contact
                key={section.key}
                title={section.data.title ?? undefined}
                description={section.data.description}
                buttonLabel={section.data.buttonLabel}
                successMessage={section.data.successMessage}
                email={contactEmail}
              />
            );
          case "map":
            return (
              <MapEmbed
                key={section.key}
                locationUrl={section.data.location_url}
                mapsLink={section.data.maps_link}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
});
