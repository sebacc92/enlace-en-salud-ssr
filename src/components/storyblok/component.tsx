import { component$ } from '@builder.io/qwik';
import type { SbBlokData } from "@storyblok/js";

// 1. Importamos los "Wrappers" (Adaptadores) de Storyblok
// Estos archivos los crearemos en la misma carpeta src/components/storyblok/
import Page from "./page";
import HeroWrapper from "./hero";

import AboutWrapper from "./about";
import ServicesWrapper from "./services";
import ModelWrapper from "./model";
import PhilosophyWrapper from "./philosophy";
import TargetWrapper from "./target";
import MapWrapper from "./map";
import ContactWrapper from "./contact-section";


interface Props {
  blok: SbBlokData;
}

// 2. Mapeo: "Nombre Técnico en Storyblok" -> "Componente Qwik"
const Components: any = {
  'page': Page,
  'hero': HeroWrapper,
  'about': AboutWrapper,
  'services': ServicesWrapper,
  'health-management': ModelWrapper,
  'philosophy': PhilosophyWrapper,
  'target-audience': TargetWrapper,
  'map': MapWrapper,
  'contact_section': ContactWrapper,
};

export default component$<Props>((props) => {
  // Selecciona el componente basado en el nombre que viene de la API
  const componentName = props.blok.component as string;
  const Component = Components[componentName];

  // Fallback por si creas un bloque en Storyblok pero olvidas crearlo aquí
  if (!Component) {
    return (
      <div class="p-4 bg-yellow-100 text-yellow-800 rounded border border-yellow-300">
        <p>⚠️ El componente <strong>{props.blok.component}</strong> ha sido creado en Storyblok pero no en Qwik.</p>
      </div>
    );
  }

  return (
    <Component blok={props.blok} />
  );
});