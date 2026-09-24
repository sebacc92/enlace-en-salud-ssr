import type { RequestHandler } from "@builder.io/qwik-city";
import { getEnv } from "~/lib/platform";

// Serves files uploaded through the admin panel (stored in the MEDIA_BUCKET R2
// bucket). Streamed through the Worker instead of a public R2/bucket domain so
// no extra domain setup is needed before the site has its own custom domain.
export const onGet: RequestHandler = async (requestEvent) => {
  const { params, send, error } = requestEvent;
  const key = params.path;
  const object = await getEnv(requestEvent).MEDIA_BUCKET.get(key);

  if (!object) {
    throw error(404, "Not found");
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=3600");

  send(new Response(object.body, { headers }));
};

export const onHead: RequestHandler = async (requestEvent) => {
  const { params, send, error } = requestEvent;
  const key = params.path;
  const object = await getEnv(requestEvent).MEDIA_BUCKET.head(key);

  if (!object) {
    throw error(404, "Not found");
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=3600");

  send(new Response(null, { headers }));
};
