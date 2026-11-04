import { component$, isDev } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { QwikPartytown } from "./partytown";

/**
 * ID de medición de GA4 (G-XXXXXXXXXX). Vite lo incrusta al compilar, así que
 * tiene que estar definido en el entorno del build. Sin ID no se carga nada.
 */
const GA_ID = import.meta.env.PUBLIC_GA_ID as string | undefined;
const isValidId = !!GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID);

export const GoogleAnalytics = component$(() => {
  const loc = useLocation();

  if (isDev || !isValidId || loc.url.pathname.startsWith("/admin")) return null;

  return (
    <>
      <QwikPartytown forward={["gtag", "dataLayer.push"]} />
      <script
        async
        type="text/partytown"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function() {
            dataLayer.push(arguments);
          };
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      />
    </>
  );
});
