import { component$ } from "@builder.io/qwik";
import { Link, routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import { getEnv } from "~/lib/platform";
import { getSections, updateSectionPositions } from "~/lib/content";
import { SECTION_SCHEMAS } from "~/lib/section-schemas";

export const useSections = routeLoader$(async (requestEvent) => {
  return getSections(getEnv(requestEvent).DB);
});

export const useReorder = routeAction$(
  async (data, requestEvent) => {
    const db = getEnv(requestEvent).DB;
    const sections = await getSections(db);
    const keys = sections.map((s) => s.key);
    const index = keys.indexOf(data.key);
    const swapWith = data.direction === "up" ? index - 1 : index + 1;

    if (index === -1 || swapWith < 0 || swapWith >= keys.length) {
      return { success: false };
    }

    [keys[index], keys[swapWith]] = [keys[swapWith], keys[index]];
    await updateSectionPositions(db, keys);
    return { success: true };
  },
  zod$({
    key: z.string(),
    direction: z.enum(["up", "down"]),
  }),
);

export default component$(() => {
  const sections = useSections();
  const reorder = useReorder();

  return (
    <div>
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-foreground">Secciones de la home</h1>
        <Link href="/admin/config" class="text-primary font-semibold text-sm">
          Configuración global →
        </Link>
      </div>

      <div class="space-y-2">
        {sections.value.map((section, i) => (
          <div
            key={section.key}
            class="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl shadow-sm px-4 py-3"
          >
            <div class="flex items-center gap-3">
              <div class="flex flex-col">
                <button
                  disabled={i === 0}
                  onClick$={() => reorder.submit({ key: section.key, direction: "up" })}
                  class="text-xs disabled:opacity-30"
                  aria-label="Subir"
                >
                  ▲
                </button>
                <button
                  disabled={i === sections.value.length - 1}
                  onClick$={() => reorder.submit({ key: section.key, direction: "down" })}
                  class="text-xs disabled:opacity-30"
                  aria-label="Bajar"
                >
                  ▼
                </button>
              </div>
              <span class="font-medium text-foreground">
                {SECTION_SCHEMAS[section.key]?.title ?? section.key}
              </span>
            </div>
            <Link href={`/admin/sections/${section.key}`} class="text-primary text-sm font-semibold">
              Editar →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
});
