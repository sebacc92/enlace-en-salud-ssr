export type FieldDef =
  | { name: string; label: string; type: "text" }
  | { name: string; label: string; type: "textarea" }
  | { name: string; label: string; type: "image" }
  | { name: string; label: string; type: "array"; itemLabel: string; fields: FieldDef[] };

export interface SectionSchema {
  title: string;
  fields: FieldDef[];
}

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  hero: {
    title: "Hero",
    fields: [
      { name: "heading", label: "Título", type: "text" },
      { name: "subheading", label: "Subtítulo", type: "textarea" },
      { name: "image.url", label: "Imagen", type: "image" },
      { name: "image.alternativeText", label: "Texto alternativo de la imagen", type: "text" },
      { name: "link.href", label: "Link del botón", type: "text" },
      { name: "link.label", label: "Texto del botón", type: "text" },
    ],
  },
  about: {
    title: "Quiénes somos",
    fields: [
      { name: "tagline", label: "Etiqueta", type: "text" },
      { name: "heading", label: "Título", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "image.url", label: "Imagen", type: "image" },
      { name: "image.alternativeText", label: "Texto alternativo de la imagen", type: "text" },
    ],
  },
  services: {
    title: "Servicios",
    fields: [
      { name: "tagline", label: "Etiqueta", type: "text" },
      { name: "heading", label: "Título", type: "text" },
      { name: "subheading", label: "Subtítulo", type: "textarea" },
      {
        name: "service_cards",
        label: "Servicios",
        type: "array",
        itemLabel: "Servicio",
        fields: [
          { name: "title", label: "Título", type: "text" },
          { name: "iconName", label: "Ícono", type: "text" },
          { name: "description", label: "Descripción", type: "textarea" },
        ],
      },
    ],
  },
  "health-management": {
    title: "Gerenciadora de Salud",
    fields: [
      { name: "tagline", label: "Etiqueta", type: "text" },
      { name: "heading", label: "Título", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "benefitsTitle", label: "Título de beneficios", type: "text" },
      { name: "benefits", label: "Beneficios (uno por línea)", type: "textarea" },
      { name: "statNumber", label: "Número destacado", type: "text" },
      { name: "statLabel", label: "Etiqueta del número", type: "text" },
      { name: "image.url", label: "Imagen", type: "image" },
      { name: "image.alternativeText", label: "Texto alternativo de la imagen", type: "text" },
    ],
  },
  philosophy: {
    title: "Filosofía Corporativa",
    fields: [
      { name: "heading", label: "Título", type: "text" },
      { name: "subheading", label: "Subtítulo", type: "textarea" },
      { name: "missionTitle", label: "Título de misión", type: "text" },
      { name: "missionText", label: "Texto de misión", type: "textarea" },
      { name: "visionTitle", label: "Título de visión", type: "text" },
      { name: "visionText", label: "Texto de visión", type: "textarea" },
      { name: "featuredTitle", label: "Título destacado", type: "text" },
      { name: "featuredText", label: "Texto destacado", type: "textarea" },
      { name: "featuredImage.url", label: "Imagen destacada", type: "image" },
      { name: "featuredImage.alternativeText", label: "Texto alternativo de la imagen", type: "text" },
      {
        name: "pillars",
        label: "Pilares",
        type: "array",
        itemLabel: "Pilar",
        fields: [
          { name: "title", label: "Título", type: "text" },
          { name: "iconName", label: "Ícono", type: "text" },
          { name: "description", label: "Descripción", type: "textarea" },
        ],
      },
    ],
  },
  "target-audience": {
    title: "Público Objetivo",
    fields: [
      { name: "heading", label: "Título", type: "text" },
      {
        name: "cards",
        label: "Audiencias",
        type: "array",
        itemLabel: "Audiencia",
        fields: [
          { name: "label", label: "Etiqueta", type: "text" },
          { name: "iconName", label: "Ícono", type: "text" },
        ],
      },
    ],
  },
  contact_section: {
    title: "Contacto",
    fields: [
      { name: "title", label: "Título", type: "text" },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "buttonLabel", label: "Texto del botón", type: "text" },
      { name: "successMessage", label: "Mensaje de éxito", type: "text" },
    ],
  },
  map: {
    title: "Mapa",
    fields: [
      { name: "location_url", label: "Dirección para el mapa", type: "text" },
      { name: "maps_link", label: "Link de Google Maps", type: "text" },
    ],
  },
};

export const SITE_CONFIG_SCHEMA: SectionSchema = {
  title: "Configuración global",
  fields: [
    { name: "logo.filename", label: "Logo", type: "image" },
    { name: "logo.alt", label: "Texto alternativo del logo", type: "text" },
    { name: "email", label: "Email de contacto", type: "text" },
    { name: "location_url", label: "Link de ubicación (Google Maps)", type: "text" },
    { name: "primary_color", label: "Color primario (hex, opcional)", type: "text" },
    {
      name: "main_menu",
      label: "Menú principal",
      type: "array",
      itemLabel: "Ítem de menú",
      fields: [
        { name: "label", label: "Texto", type: "text" },
        { name: "link.url", label: "Link", type: "text" },
      ],
    },
    {
      name: "social_networks",
      label: "Redes sociales",
      type: "array",
      itemLabel: "Red social",
      fields: [
        { name: "icon_name", label: "Ícono (Facebook, Instagram, Linkedin...)", type: "text" },
        { name: "url", label: "Link", type: "text" },
      ],
    },
  ],
};
