import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Reveal } from "~/components/ui/reveal";
import { ICON_REGISTRY } from "~/components/icons/registry";
import { LuCheckCircle2 } from "@qwikest/icons/lucide";

const WHATSAPP_URL =
  "https://wa.me/5491150532300?text=Hola%2C%20quiero%20información%20sobre%20Áreas%20Cardioasistidas";

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = component$(() => (
  <section
    id="hero-cardioasistida"
    class="relative w-full min-h-[calc(100vh-4rem)] lg:min-h-screen flex items-center justify-center overflow-hidden pt-[56px] lg:pt-0"
  >
    {/* Background Image & Solid Overlay */}
    <div class="absolute inset-0 w-full h-full z-0">
      <img
        src="/img/hero-cardioasistida.webp"
        alt="Área Cardioasistida – Desfibrilador DEA en entorno corporativo"
        class="w-full h-full object-cover object-center"
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
      />
      <div class="absolute inset-0 bg-slate-900/50 dark:bg-slate-950/70 pointer-events-none"></div>
    </div>

    {/* Content - Ensured high z-index and flex column centering */}
    <div class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
      <Reveal>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-lg">
          Enlace en Salud:{" "}
          <span class="bg-clip-text text-transparent bg-[image:var(--gradient-brand)]">
            cuidamos lo más importante, la vida
          </span>
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <p class="text-xl lg:text-2xl text-slate-100 font-medium mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
          ¿Tu empresa está preparada para responder ante una emergencia
          cardíaca?
        </p>
      </Reveal>

      <Reveal delay={400}>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" class="inline-block mt-4">
          <Button
            look="primary"
            size="lg"
            class="flex items-center gap-3 cursor-pointer border-0 bg-gradient-to-r from-[--primary] to-[#006080] text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:to-[#005070] hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide uppercase px-8 whitespace-nowrap"
          >
            <span>CONSULTAR</span>
            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </Button>
        </a>
      </Reveal>
    </div>
  </section>
));

// ─── Servicio Integral ───────────────────────────────────────────────────────
const services = [
  {
    title: "Instalación sin costo del equipo DEA",
    description:
      "Colocamos el desfibrilador externo automático en tu organización sin costo de instalación, con señalización y gabinete incluidos.",
    iconName: "SuitcaseMedical",
  },
  {
    title: "Capacitación práctica en RCP y uso del DEA",
    description:
      "Entrenamos a tu equipo con clases presenciales de RCP y manejo del desfibrilador, certificadas por profesionales de la salud.",
    iconName: "Users",
  },
  {
    title: "Acompañamiento y asistencia ante emergencias",
    description:
      "Te brindamos soporte continuo, mantenimiento del equipo y asesoría ante cualquier evento cardíaco en tu organización.",
    iconName: "HeartPulse",
  },
];

const ServicioIntegralSection = component$(() => (
  <section id="servicio-integral" class="py-16 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div class="text-center mb-16">
          <p class="text-sm font-bold uppercase tracking-widest text-primary mb-4">
            Nuestro servicio
          </p>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Un sistema completo para tu organización
          </h2>
        </div>
      </Reveal>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {services.map((s, i) => {
          const Icon = ICON_REGISTRY[s.iconName] || ICON_REGISTRY['default'];
          return (
            <Reveal key={i} delay={i * 200}>
              <div class="group h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[--primary] to-[#006080] text-white flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icon class="w-8 h-8" />
                </div>
                <h3 class="text-xl md:text-2xl font-bold text-foreground mb-4 leading-snug">
                  {s.title}
                </h3>
                <p class="text-base text-muted-foreground leading-relaxed flex-grow">
                  {s.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
));

// ─── Sección Técnica (El Equipo) ─────────────────────────────────────────────
const specs = [
  "Activación con un solo botón",
  "Instrucciones visuales y auditivas",
  "Configuración adultos / niños",
  "Evaluación automática del ritmo cardíaco",
  "Protección IP56 contra polvo y agua",
];

const EquipoSection = component$(() => (
  <section id="el-equipo" class="py-16 bg-white dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <div class="text-center mb-16">
          <p class="text-sm font-bold uppercase tracking-widest text-primary mb-4">
            El equipo
          </p>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Tecnología que guía cada paso: El DEA
          </h2>
        </div>
      </Reveal>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <Reveal direction="left">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl aspect-square max-w-lg mx-auto lg:mx-0 group">
            <img
              src="/img/dea-device.webp"
              alt="Desfibrilador Externo Automático (DEA) sobre superficie de oficina, equipo médico para áreas cardioasistidas"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
          </div>
        </Reveal>

        {/* Specs */}
        <Reveal direction="right">
          <div class="space-y-6">
            {specs.map((spec, i) => (
              <div
                key={i}
                class="flex items-center gap-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 hover:bg-white dark:hover:bg-slate-950 transition-all duration-300"
              >
                <div class="flex-shrink-0 bg-primary/10 p-2 rounded-full text-primary">
                  <LuCheckCircle2 class="w-8 h-8" />
                </div>
                <span class="text-lg font-semibold text-foreground">
                  {spec}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
));

// ─── Estadísticas ────────────────────────────────────────────────────────────
const stats = [
  {
    value: ">50%",
    label: "de supervivencia",
    detail: "Si se actúa en los primeros 3 a 5 minutos",
  },
  {
    value: "75%",
    label: "de sobrevida",
    detail: "Combinando RCP + DEA de forma inmediata",
  },
  {
    value: "<10%",
    label: "de probabilidad",
    detail: "Sin intervención durante un paro cardíaco",
  },
];

const EstadisticasSection = component$(() => (
  <section
    id="estadisticas"
    class="py-16 relative overflow-hidden bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <Reveal>
        <div class="text-center mb-16">
          <p class="text-sm font-bold uppercase tracking-widest text-primary mb-4">
            Impacto
          </p>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
            Actuar rápido salva vidas
          </h2>
        </div>
      </Reveal>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <Reveal key={i} delay={i * 200}>
            <div class="group h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center">
              <p class="text-6xl md:text-7xl font-black text-primary mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                {stat.value}
              </p>
              <p class="text-2xl font-bold text-foreground mb-4">
                {stat.label}
              </p>
              <p class="text-base text-muted-foreground leading-relaxed">
                {stat.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={600}>
        <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-16 font-medium">
          Información basada en datos del Ministerio de Salud de la Nación.
        </p>
      </Reveal>
    </div>
  </section>
));

// ─── CTA Final ───────────────────────────────────────────────────────────────
const CtaSection = component$(() => (
  <section id="cta-contacto" class="py-16 bg-white dark:bg-slate-950">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Reveal>
        <h2 class="text-3xl md:text-5xl font-extrabold text-foreground mb-8">
          Protegé a tu equipo hoy
        </h2>
        <p class="text-xl text-muted-foreground mb-12 leading-relaxed">
          Contactanos para recibir asesoramiento personalizado sobre cómo convertir tu
          organización en un Área Cardioasistida.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" class="inline-block">
          <Button
            look="primary"
            size="lg"
            class="flex items-center gap-3 cursor-pointer border-0 bg-gradient-to-r from-[--primary] to-[#006080] text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 hover:to-[#005070] hover:-translate-y-1 transition-all duration-300 font-bold tracking-wide uppercase px-8 whitespace-nowrap"
          >
            <span>SOLICITAR INFO</span>
            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </Button>
        </a>
      </Reveal>
    </div>
  </section>
));

// ─── Page Component ──────────────────────────────────────────────────────────
export default component$(() => (
  <>
    <HeroSection />
    <ServicioIntegralSection />
    <EquipoSection />
    <EstadisticasSection />
    <CtaSection />
  </>
));

// ─── SEO Head ────────────────────────────────────────────────────────────────
export const head: DocumentHead = {
  title: "Áreas Cardioasistidas – DEA y RCP | Enlace en Salud",
  meta: [
    {
      name: "description",
      content:
        "Instalación de desfibriladores DEA, capacitación en RCP y asistencia ante emergencias cardíacas para empresas en Argentina. Enlace en Salud, tu socio en gestión sanitaria.",
    },
    {
      name: "keywords",
      content:
        "DEA, desfibrilador, RCP, área cardioasistida, emergencia cardíaca, salud laboral, Argentina",
    },
    {
      property: "og:title",
      content: "Áreas Cardioasistidas – DEA y RCP | Enlace en Salud",
    },
    {
      property: "og:description",
      content:
        "Protegé a tu equipo con un sistema completo de Áreas Cardioasistidas: DEA + capacitación + acompañamiento.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
};
