/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Cloudflare when building for production.
 *
 * The build output (`dist/_worker.js`) is deployed as a plain Cloudflare
 * Worker (via `wrangler deploy`), not through the Pages product — see
 * `wrangler.jsonc` (`main` + `assets`). The adapter name is kept as
 * "cloudflare-pages" because that's what Qwik City's official adapter is
 * called; the deploy target is Workers + Workers Static Assets.
 *
 * Learn more about the Cloudflare Pages integration here:
 * - https://qwik.dev/docs/deployments/cloudflare-pages/
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

// No `declare global { type QwikCityPlatform = ... }` here: entry.vercel-edge.tsx
// already declares it (as `PlatformVercel`), and TypeScript checks both entry
// files together. Routes that need Cloudflare bindings (D1, R2) go through
// `getEnv()` in `src/lib/platform.ts` instead of relying on this ambient type.

// The generated `dist/_worker.js` does `import { fetch } from "./entry.cloudflare-pages"`,
// so this must be a named export (unlike the Vercel Edge entry's default export).
export const fetch = createQwikCity({ render, qwikCityPlan });
