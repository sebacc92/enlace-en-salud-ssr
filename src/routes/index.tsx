import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import { Sections } from "~/components/sections/registry";
import { getSections } from "~/lib/content";
import { getEnv } from "~/lib/platform";
import { useGlobalConfig } from "~/routes/layout";

export const useSections = routeLoader$(async (requestEvent) => {
    return getSections(getEnv(requestEvent).DB);
});

export default component$(() => {
    const sections = useSections();
    const globalConfig = useGlobalConfig();

    return (
        <Sections sections={sections.value} contactEmail={globalConfig.value?.email} />
    );
});

export const head: DocumentHead = {
    title: "Enlace en Salud | Soluciones Integrales y Gestión Sanitaria",
    meta: [
        {
            name: "description",
            content: "Enlace en Salud ofrece soluciones integrales y gestión sanitaria para empresas y organizaciones. Expertos en salud ocupacional y bienestar laboral.",
        },
    ],
};
