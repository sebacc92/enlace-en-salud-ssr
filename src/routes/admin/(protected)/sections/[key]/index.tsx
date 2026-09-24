import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { getEnv } from "~/lib/platform";
import { getSection, updateSection } from "~/lib/content";
import { SECTION_SCHEMAS } from "~/lib/section-schemas";
import { applyFormToData } from "~/lib/section-save";
import { SectionForm } from "~/components/admin/section-form";

export const useSection = routeLoader$(async (requestEvent) => {
  const schema = SECTION_SCHEMAS[requestEvent.params.key];
  if (!schema) throw requestEvent.error(404, "Sección desconocida");

  const section = await getSection(getEnv(requestEvent).DB, requestEvent.params.key);
  if (!section) throw requestEvent.error(404, "Sección no encontrada");

  return section;
});

export const useSaveSection = routeAction$(async (form, requestEvent) => {
  const key = requestEvent.params.key;
  const schema = SECTION_SCHEMAS[key];
  if (!schema) return requestEvent.fail(404, { message: "Sección desconocida" });

  const env = getEnv(requestEvent);
  const current = await getSection(env.DB, key);
  if (!current) return requestEvent.fail(404, { message: "Sección no encontrada" });

  const merged = await applyFormToData(schema, current.data, form, env.MEDIA_BUCKET, key);
  await updateSection(env.DB, key, merged);

  return { success: true };
});

export default component$(() => {
  const section = useSection();
  const action = useSaveSection();
  const schema = SECTION_SCHEMAS[section.value.key];

  return (
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-6">{schema.title}</h1>
      <SectionForm schema={schema} data={section.value.data} action={action} />
    </div>
  );
});
