import type { RequestHandler } from "@builder.io/qwik-city";
import { SITE_URL } from "~/lib/site";

// Páginas públicas e indexables. Quedan afuera admin y media.
const PATHS = ["/", "/area-cardioasistida/"];

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const onGet: RequestHandler = (ev) => {
  const urls = PATHS.map(
    (path) => `  <url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc></url>`,
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  ev.send(
    new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    }),
  );
};
