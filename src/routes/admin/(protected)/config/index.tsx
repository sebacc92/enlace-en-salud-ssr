import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { getEnv } from "~/lib/platform";
import { getSiteConfig, updateSiteConfig } from "~/lib/content";
import { SITE_CONFIG_SCHEMA } from "~/lib/section-schemas";
import { applyFormToData } from "~/lib/section-save";
import { SectionForm } from "~/components/admin/section-form";

export const useConfig = routeLoader$(async (requestEvent) => {
  const config = await getSiteConfig(getEnv(requestEvent).DB);
  return config ?? {};
});

export const useSaveConfig = routeAction$(async (form, requestEvent) => {
  const env = getEnv(requestEvent);
  const current = (await getSiteConfig(env.DB)) ?? {};
  const merged = await applyFormToData(SITE_CONFIG_SCHEMA, current, form, env.MEDIA_BUCKET, "config");
  await updateSiteConfig(env.DB, merged);
  return { success: true };
});

export default component$(() => {
  const config = useConfig();
  const action = useSaveConfig();

  return (
    <div>
      <h1 class="text-2xl font-bold text-foreground mb-6">{SITE_CONFIG_SCHEMA.title}</h1>
      <SectionForm schema={SITE_CONFIG_SCHEMA} data={config.value} action={action} />
    </div>
  );
});
