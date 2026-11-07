import {
  component$,
  isDev,
  isServer,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { QwikPartytown } from "./partytown";

/**
 * ID del contenedor de Google Tag Manager (GTM-XXXXXXX). Vite lo incrusta al
 * compilar, así que tiene que estar definido en el entorno del build. Sin un
 * ID válido no se carga nada.
 */
const GTM_ID = import.meta.env.PUBLIC_GTM_ID as string | undefined;
const isEnabled = !isDev && !!GTM_ID && /^GTM-[A-Z0-9]+$/.test(GTM_ID);

/**
 * Evento que se envía al dataLayer en cada navegación interna (SPA). En GTM
 * hay que crear un activador "Evento personalizado" con este nombre.
 */
export const SPA_PAGE_VIEW_EVENT = "spa_page_view";

const isTrackedPath = (pathname: string) => !pathname.startsWith("/admin");

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const GoogleTagManager = component$(() => {
  const loc = useLocation();
  // Qwik City reasigna loc.url durante la navegación aunque el pathname no
  // cambie todavía; comparamos contra el último enviado para no duplicar.
  const lastPathname = useSignal(loc.url.pathname);

  // GTM corre en el worker de Partytown y no ve los pushState del hilo
  // principal, así que avisamos de cada cambio de ruta. La carga inicial ya la
  // registra GTM con su evento gtm.js; esto solo corre en el cliente cuando
  // cambia el pathname (los saltos a /#seccion no cuentan como página nueva).
  useTask$(({ track }) => {
    const pathname = track(() => loc.url.pathname);
    if (isServer || pathname === lastPathname.value) return;
    lastPathname.value = pathname;
    if (!isEnabled || !isTrackedPath(pathname)) return;

    window.dataLayer?.push({
      event: SPA_PAGE_VIEW_EVENT,
      page_location: loc.url.href,
      page_path: pathname + loc.url.search,
    });
  });

  if (!isEnabled || !isTrackedPath(loc.url.pathname)) return null;

  return (
    <>
      <QwikPartytown forward={["dataLayer.push"]} />
      <script
        type="text/partytown"
        dangerouslySetInnerHTML={`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      />
    </>
  );
});
