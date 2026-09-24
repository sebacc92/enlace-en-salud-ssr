import { component$, Slot } from "@builder.io/qwik";
import { Link, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { clearAdminSessionCookie, requireAdminSession } from "~/lib/admin-auth";

export const useAdminGuard = routeLoader$(async (requestEvent) => {
  await requireAdminSession(requestEvent);
});

export const useLogout = routeAction$(async (_data, requestEvent) => {
  clearAdminSessionCookie(requestEvent);
  throw requestEvent.redirect(302, "/admin/login");
});

export default component$(() => {
  useAdminGuard();
  const logoutAction = useLogout();

  return (
    <div class="min-h-screen bg-slate-100 dark:bg-slate-950">
      <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/admin" class="font-bold text-foreground">
            Enlace en Salud · Admin
          </Link>
          <div class="flex items-center gap-4">
            <Link href="/" target="_blank" class="text-sm text-muted-foreground hover:text-primary">
              Ver sitio
            </Link>
            <button
              onClick$={() => logoutAction.submit()}
              class="text-sm text-muted-foreground hover:text-primary"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      <main class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Slot />
      </main>
    </div>
  );
});
