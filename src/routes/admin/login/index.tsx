import { component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, z, zod$, Form } from "@builder.io/qwik-city";
import {
  createSessionToken,
  hasValidAdminSession,
  setAdminSessionCookie,
  timingSafeEqual,
} from "~/lib/admin-auth";

export const useRedirectIfLoggedIn = routeLoader$(async (requestEvent) => {
  if (await hasValidAdminSession(requestEvent)) {
    throw requestEvent.redirect(302, "/admin");
  }
});

export const useLogin = routeAction$(
  async (data, requestEvent) => {
    const { env, fail } = requestEvent;
    const username = env.get("ADMIN_USERNAME");
    const password = env.get("ADMIN_PASSWORD");
    const secret = env.get("ADMIN_SESSION_SECRET");

    if (!username || !password || !secret) {
      return fail(500, { message: "El panel de administración no está configurado." });
    }

    if (!timingSafeEqual(data.username, username) || !timingSafeEqual(data.password, password)) {
      return fail(401, { message: "Usuario o clave incorrectos." });
    }

    setAdminSessionCookie(requestEvent, await createSessionToken(secret));
    throw requestEvent.redirect(302, "/admin");
  },
  zod$({
    username: z.string().min(1, "Ingresá tu usuario"),
    password: z.string().min(1, "Ingresá tu clave"),
  }),
);

export default component$(() => {
  useRedirectIfLoggedIn();
  const action = useLogin();

  return (
    <div class="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <Form action={action} class="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 space-y-4">
        <h1 class="text-xl font-bold text-center text-foreground mb-2">Panel de administración</h1>

        {action.value?.message && (
          <p class="text-red-500 text-sm text-center">{action.value.message}</p>
        )}

        <div>
          <label class="block text-sm font-medium mb-1" for="username">
            Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2"
          />
          {action.value?.fieldErrors?.username && (
            <p class="text-red-500 text-sm mt-1">{action.value.fieldErrors.username}</p>
          )}
        </div>

        <div>
          <label class="block text-sm font-medium mb-1" for="password">
            Clave
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2"
          />
          {action.value?.fieldErrors?.password && (
            <p class="text-red-500 text-sm mt-1">{action.value.fieldErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-primary text-white py-2 font-semibold hover:opacity-90 transition-opacity"
        >
          Entrar
        </button>
      </Form>
    </div>
  );
});
