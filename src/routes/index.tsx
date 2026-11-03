import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import logoUrl from "../assets/logo-illasso.jpeg";
// Flou intégré au fichier : il reste solidaire de l'image au défilement, y compris sur mobile.
import heroBackground from "../assets/illasso-palace-hero-blur.jpg";
import throneWatermark from "../assets/royal-throne-watermark.webp";
import crownWatermark from "../assets/royal-crown-watermark.webp";
import palaceWatermark from "../assets/royal-palace-watermark.webp";
import { RoyalMapImage } from "../components/royal-map-lightbox";
import { events, galleryCategories, homeSections, images } from "../lib/site-data";
import { eventDateParts } from "../lib/event-date";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Royaume Mère d’Illasso — Sakété" },
      {
        name: "description",
        content:
          "Découvrez l’histoire, la culture, le territoire et la vie du Royaume Mère d’Illasso à Sakété.",
      },
      { property: "og:title", content: "Royaume Mère d’Illasso — Sakété" },
      {
        property: "og:description",
        content: "Patrimoine vivant, culture et événements du Royaume Mère d’Illasso.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const heroSlides = [
  { image: images.king, alt: "Portrait du Roi d’Illasso", label: "Le Roi" },
  {
    image: images.festival,
    alt: "Célébration culturelle du Royaume d’Illasso",
    label: "Cérémonies royales",
  },
  {
    image: images.craft,
    alt: "Artisanat et savoir-faire d’Illasso",
    label: "Culture & traditions",
  },
  {
    image: images.territory,
    alt: "Terres et villages du Royaume d’Illasso",
    label: "Territoire royal",
  },
] as const;

const chapterCards = [
  {
    title: "Le Mot du Roi",
    text: "Gardiens de cet héritage, nous avons le devoir de le préserver, de le faire vivre et de le transmettre.",
    section: "roi",
  },
  {
    title: "Histoire & origines",
    text: "Descendants d’Oba Otchoukpa, les fondateurs de Sakété s’établissent d’abord à Illassô, origine du Royaume Mère.",
    section: "histoire",
  },
  {
    title: "Culture & traditions",
    text: "Cultes endogènes, culte d’Oro et danses Egungun, Guèlèdè, Akpala, Batta et Bolodjo rythment la vie de Sakété.",
    section: "culture",
  },
  {
    title: "Engagements du Roi",
    text: "Associations, organisations et institutions traditionnelles auxquelles le Roi est associé, avec leurs fonctions.",
    section: "activites",
  },
  {
    title: "Territoire",
    text: "Sakété couvre environ 700 km², à une soixantaine de kilomètres de Cotonou, avec 81 villages et quartiers.",
    section: "territoire",
  },
] as const;

// Aperçu de la galerie : les 4 premières activités, dans l'ordre de la page Galerie.
const galleryPreviews = galleryCategories
  .flatMap((category) =>
    category.activities.flatMap((activity) => {
      const cover = activity.media[0];
      return cover ? [{ activity, category, cover }] : [];
    }),
  )
  .slice(0, 4);

const lightEyebrow =
  "eyebrow !text-white/85 font-bold [text-shadow:0_1px_2px_rgb(0_0_0/0.6),0_2px_8px_rgb(0_0_0/0.4)]";

// Fond et couleurs de chaque emplacement de chapitre, quel que soit son contenu.
const chapterStyles = [
  {
    tone: "tone-ivory",
    eyebrow: "eyebrow",
    title: "section-title !text-black",
    accent: "text-gold",
    text: "text-ink/70",
    point: "text-ink/65",
  },
  {
    tone: "tone-ember",
    eyebrow: lightEyebrow,
    title: "section-title !text-white",
    accent: "text-gold",
    text: "text-white/85",
    point: "text-white/85",
  },
  {
    tone: "tone-cream",
    eyebrow: "eyebrow",
    title: "section-title !text-black",
    accent: "text-gold",
    text: "text-ink/70",
    point: "text-ink/65",
  },
  {
    tone: "tone-ink",
    eyebrow: lightEyebrow,
    title: "section-title !text-white",
    accent: "text-gold",
    text: "text-white/85",
    point: "text-white/85",
  },
  {
    tone: "tone-gold",
    eyebrow: "eyebrow",
    title: "section-title !text-black",
    accent: "text-gold",
    text: "text-ink/70",
    point: "text-ink/65",
  },
] as const;

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [activeSlide, isPaused]);

  const goToSlide = (index: number) => {
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/25 to-ember/15 blur-2xl" />
      <div
        className="hero-carousel-frame relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gold/30 shadow-2xl"
        role="group"
        aria-roledescription="carrousel"
        aria-label="Images du Royaume d’Illasso"
      >
        {heroSlides.map((slide, index) => (
          <img
            key={slide.label}
            src={slide.image}
            alt={slide.alt}
            className={[
              "hero-carousel-image absolute inset-0 h-full w-full object-cover",
              index === activeSlide ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={index !== activeSlide}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-end gap-3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 pt-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-label="Choisir une image">
              {heroSlides.map((slide, index) => (
                <Button
                  key={slide.label}
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="hero-carousel-dot"
                  aria-label={`Afficher l’image ${index + 1} : ${slide.label}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <div className="hero-carousel-controls">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="hero-carousel-control"
                aria-label="Image précédente"
                onClick={() => goToSlide(activeSlide - 1)}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="hero-carousel-control"
                aria-label="Image suivante"
                onClick={() => goToSlide(activeSlide + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  // Keep the second welcome image tied to the section's actual scroll progress.
  useEffect(() => {
    const section = document.getElementById("mot-du-roi");
    const secondFrame = section?.querySelector<HTMLElement>(
      ".king-message-image-wrap:nth-child(2)",
    );

    if (!section || !secondFrame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const updateScrollPosition = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect();
        const travel = window.innerHeight + bounds.height;
        const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / travel));
        // Drift only on desktop: on tablet and mobile the text sits right below the images.
        const maxOffset = window.innerWidth >= 1024 ? Math.min(120, window.innerWidth * 0.12) : 0;
        const offset = progress * maxOffset;
        secondFrame.style.setProperty("--king-scroll-offset", `${offset.toFixed(1)}px`);
      });
    };

    updateScrollPosition();
    window.addEventListener("scroll", updateScrollPosition, { passive: true });
    window.addEventListener("resize", updateScrollPosition);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollPosition);
      window.removeEventListener("resize", updateScrollPosition);
      secondFrame.style.removeProperty("--king-scroll-offset");
    };
  }, []);

  return (
    <>
      <section className="hero-section">
        <img
          src={heroBackground}
          alt="Cour royale lors d’une cérémonie à Illasso"
          className="hero-image"
          width={1920}
          height={1080}
        />
        <div className="hero-shade" />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1440px] items-end px-6 pb-16 pt-32 lg:px-12 lg:pb-20">
          <div className="grid w-full animate-fade-in gap-10 lg:grid-cols-[1fr_420px] lg:items-end lg:gap-16">
            <div className="max-w-4xl text-cream">
              <p className="eyebrow">Commune de Sakété — Royaume Mère</p>
              <h1
                aria-label="ILLASSO"
                className="hero-wordmark mt-5 font-serif text-6xl leading-none sm:text-8xl"
              >
                <span aria-hidden="true">ILLASS</span>
                {/* « contents » : le lien ne crée pas de boîte et ne décale pas l’alignement du sceau. */}
                <Link to="/" aria-hidden="true" tabIndex={-1} className="contents">
                  <img
                    src={logoUrl}
                    alt=""
                    aria-hidden="true"
                    className="hero-seal"
                    width={96}
                    height={96}
                  />
                </Link>
              </h1>
              <p className="mt-5 font-serif text-2xl italic text-gold sm:text-3xl">
                Un trône, une mémoire, une terre à vivre.
              </p>
              <p className="mt-7 max-w-2xl text-justify text-base leading-relaxed text-white/85 sm:text-lg">
                Au cœur de Sakété, le Royaume Mère d’Illasso veille sur une mémoire vivante faite de
                transmission, de culture et de communauté.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/a-propos">
                    Découvrir le royaume <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <a href="#mot-du-roi">Mot d’accueil</a>
                </Button>
              </div>
            </div>
            <div className="order-first mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:order-none lg:max-w-none">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>
      <section
        id="mot-du-roi"
        className="king-message-section section-shell section-reveal overflow-hidden bg-white text-ink"
      >
        <div
          className="king-message-motif-layer pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={throneWatermark}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="king-message-watermark king-message-watermark-throne"
          />
          <img
            src={crownWatermark}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="king-message-watermark king-message-watermark-crown"
          />
          <img
            src={palaceWatermark}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="king-message-watermark king-message-watermark-palace"
          />
        </div>
        <div className="king-message-layout relative z-10 mx-auto grid max-w-[1344px] items-center gap-9 lg:grid-cols-2 lg:items-start lg:gap-20">
          <div className="min-w-0">
            <div className="king-message-heading mb-10 lg:mb-16">
              <p className="eyebrow !text-gold">Mot d’accueil</p>
              <h2 className="mt-2 max-w-full break-words font-serif text-[1.75rem] leading-tight !text-black sm:text-4xl">
                Bienvenue sur le Site Officiel du <em className="text-gold">Royaume ILLASO</em>
              </h2>
            </div>
            <div
              className="king-message-image-pair mx-auto mb-10 grid w-full max-w-xl grid-cols-2 items-center gap-3 lg:mb-0 lg:max-w-none"
              role="group"
              aria-label="Portrait du Roi et palais royal"
            >
              <figure className="king-message-image-wrap relative top-0 overflow-hidden rounded-2xl">
                <img
                  src={images.king}
                  alt="Portrait éditorial du Roi d’Illasso"
                  loading="lazy"
                  decoding="async"
                  className="king-message-photo aspect-[4/5] w-full object-cover"
                  width={1024}
                  height={1280}
                />
              </figure>
              <figure className="king-message-image-wrap relative top-10 overflow-hidden rounded-2xl">
                <img
                  src={images.palace}
                  alt="Palais royal du Royaume ILLASO"
                  loading="lazy"
                  decoding="async"
                  className="king-message-photo aspect-[4/5] w-full object-cover"
                  width={1024}
                  height={1280}
                />
              </figure>
            </div>
          </div>
          <div className="king-message-copy max-w-[900px] self-center lg:self-start">
            <div className="mt-0 space-y-4 text-justify text-base leading-relaxed text-ink/75">
              <p>
                C’est avec un grand plaisir que nous vous souhaitons la bienvenue sur le site
                officiel du Royaume ILLASO.
              </p>
              <p>
                Cet espace est une porte ouverte consacré à la découverte de notre histoire royale,
                notre culture, notre mémoire, notre identité, nos palais, nos traditions, nos
                savoirs et nos valeurs. Un patrimoine riche.
              </p>
              <p>
                Le Royaume ILLASO est profondément attaché à la préservation et à la transmission de
                cet héritage, tout en restant résolument tourné vers l’avenir. Nous sommes
                convaincus que la connaissance de notre histoire et la valorisation de notre
                patrimoine peuvent contribuer à renforcer la cohésion des communautés, à transmettre
                des repères aux jeunes générations et à promouvoir le rayonnement culturel de notre
                territoire.
              </p>
              <p>
                À travers ce site, nous souhaitons également faire connaître les initiatives et les
                actions qui contribuent au développement de nos communautés, au bien-être des
                populations, à l’autonomisation des femmes et à la valorisation des potentialités
                locales.
              </p>
              <p>
                La Fondation OBA ADE KPADAWALE, qui s’inscrit dans cette dynamique, constitue
                notamment un cadre d’engagement et d’action au service des communautés et de la
                valorisation du patrimoine culturel.
              </p>
              <p>
                Nous vous invitons à parcourir les différentes rubriques afin de découvrir
                l’histoire du Royaume ILLASO, ses figures emblématiques, les lieux de mémoire, son
                patrimoine culturel ainsi que ses initiatives en faveur du développement et du
                bien-être des communautés.
              </p>
              <p>
                Bienvenue au Royaume ILLASO, un royaume de mémoire, de culture, de valeurs et
                d’avenir.
              </p>
              <p className="font-medium text-ink">
                Connaître notre histoire, préserver notre héritage et construire ensemble l’avenir.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-shell tone-gold section-reveal">
        <div className="mx-auto max-w-[1344px]">
          <div className="max-w-4xl">
            <p className="eyebrow !text-white/85 font-bold [text-shadow:0_1px_2px_rgb(0_0_0/0.6),0_2px_8px_rgb(0_0_0/0.4)]">
              Découvrir Illasso
            </p>
            <h2 className="section-title !text-white">
              Les Chapitres d’un <em className="text-gold">Patrimoine Vivant</em>
            </h2>
            <p className="mt-5 max-w-2xl text-justify leading-relaxed text-ink/65">
              Cinq regards pour parcourir l’histoire, les traditions, la royauté et les terres
              d’Illasso.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {chapterCards.map((chapter, index) => (
              <Link
                key={chapter.title}
                to="/a-propos"
                hash={chapter.section}
                className="chapter-card glass edge group flex h-full flex-col rounded-2xl p-6"
              >
                <span className="font-serif text-gold">0{index + 1}</span>
                <h3 className="mt-8 font-serif text-xl">{chapter.title}</h3>
                <p className="mt-3 text-justify text-sm leading-relaxed text-ink/60">{chapter.text}</p>
                <span className="mt-auto inline-block pt-6 text-sm text-gold opacity-70 transition group-hover:translate-x-1">
                  Explorer le chapitre →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {homeSections.map((section, index) => {
        const style = chapterStyles[index] ?? chapterStyles[0];
        return (
          <section
            key={section.id}
            id={section.id}
            className={`section-shell section-reveal ${style.tone}`}
          >
            {/* Mobile et tablette : titre, image puis texte. Ordinateur : image d’un côté, titre et texte centrés de l’autre. */}
            <div
              className={`mx-auto grid max-w-[1344px] items-center gap-8 lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-16 lg:gap-y-0 ${index % 2 === 1 ? "lg:[&>figure]:col-start-2 lg:[&>div]:col-start-1" : "lg:[&>figure]:col-start-1 lg:[&>div]:col-start-2"}`}
            >
              <div className="lg:row-start-2">
                <p className={style.eyebrow}>{section.eyebrow}</p>
                <h2 className={style.title}>
                  {section.titleLead} <em className={style.accent}>{section.titleAccent}</em>
                </h2>
              </div>
              {section.id === "territoire" ? (
                <figure className="mx-auto w-full max-w-[500px] overflow-hidden border border-gold/30 bg-cream shadow-2xl lg:row-span-4 lg:row-start-1">
                  <RoyalMapImage />
                </figure>
              ) : (
                <figure className="parallax-media edge overflow-hidden rounded-3xl border border-gold/30 lg:row-span-4 lg:row-start-1">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]"
                    width={1280}
                    height={960}
                  />
                </figure>
              )}
              <div className="lg:row-start-3 lg:mt-5">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    className={`text-justify text-base leading-relaxed ${paragraphIndex > 0 ? "mt-5" : ""} ${style.text}`}
                  >
                    {paragraph}
                  </p>
                ))}
                {section.id === "territoire" ? (
                  <p className="mt-5 text-justify leading-relaxed text-ink/60">
                    La carte officielle retrace les villages, les voies et les repères qui relient
                    Illasso à son territoire historique.
                  </p>
                ) : (
                  <ul className="mt-7 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className={`flex items-start gap-3 text-sm ${style.point}`}>
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                <Button asChild className="mt-8">
                  <Link to="/a-propos" hash={section.id}>
                    En savoir plus <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        );
      })}
      <section
        id="video-presentation"
        className="section-shell tone-ember section-reveal overflow-hidden"
      >
        <div className="mx-auto max-w-[1344px]">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <p className="eyebrow">L’âme d’Illasso en images</p>
            <h2 className="section-title !text-white">
              Découvrez le Royaume <em>D'ILLASO en Vidéo</em>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/85">
              Plongez au cœur de notre histoire, de notre patrimoine royal et de nos traditions.
              Découvrez la mémoire vivante du Royaume d'ILLASO et les valeurs transmises de
              génération en génération.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl border border-gold/35 bg-ink shadow-2xl sm:rounded-3xl">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/Zi_XLOBDo_Y"
                title="Vidéo de présentation du Royaume ILLASO"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section-shell tone-cream section-reveal">
        <div className="mx-auto max-w-[1344px]">
          <div>
            <p className="eyebrow !text-black font-bold">Agenda royal</p>
            <h2 className="section-title !text-white">
              <span className="[text-shadow:0_1px_2px_rgb(0_0_0/0.6),0_2px_8px_rgb(0_0_0/0.4)]">
                Calendrier des
              </span>{" "}
              <em className="text-gold">Evénements</em>
            </h2>
          </div>
          <ul className="edge mt-10 overflow-hidden rounded-2xl border border-gold/25 bg-card text-card-foreground">
            {events.slice(0, 4).map((event) => {
              const date = eventDateParts(event.date);
              return (
                <li
                  key={event.title}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-5 gap-y-2 border-b border-gold/20 px-5 py-4 last:border-b-0 even:bg-gold/10 md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1.4fr)] md:gap-x-8 md:px-8 md:py-5"
                >
                  <div className="text-center">
                    <span className="block font-serif text-4xl leading-none text-gold md:text-5xl">
                      {date.day}
                    </span>
                    <span className="mt-1 block text-xs font-medium uppercase tracking-[0.12em] text-ink/70">
                      {date.month} {date.year}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="flex flex-wrap items-center gap-2 font-serif text-lg md:text-xl">
                      {event.title}
                      {event.status === "Passé" && (
                        <span className="rounded-full border border-gold/30 px-2 py-0.5 font-sans text-[10px] uppercase text-gold">
                          {event.status}
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-xs text-ink/55">{event.place}</p>
                  </div>
                  <p className="col-span-2 text-justify text-sm leading-relaxed text-ink/60 md:col-span-1">
                    {event.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link to="/evenements">
                Plus d’événements <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="section-shell tone-photo section-reveal">
        <div className="mx-auto max-w-[1344px]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow !text-white">Galerie royale</p>
              <h2 className="section-title">
                Un Aperçu de <em>la Galerie</em>
              </h2>
            </div>
            <Button asChild variant="secondary" className="hidden sm:inline-flex">
              <Link to="/galerie">
                Voir toute la galerie <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryPreviews.map(({ activity, category, cover }) => {
              const coverSrc =
                cover.type === "image" ? cover.src : (cover.poster ?? images.festival);
              return (
                <Link
                  key={activity.id}
                  to="/galerie"
                  hash={activity.id}
                  className="edge group flex flex-col overflow-hidden rounded-2xl border border-gold/25 bg-[#f6eee4] text-stone-900 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <figure className="overflow-hidden">
                    <img
                      src={coverSrc}
                      alt={cover.type === "image" ? cover.alt : `Aperçu vidéo : ${cover.title}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                      width={1280}
                      height={960}
                    />
                  </figure>
                  <div className="bg-[#f6eee4] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-gold">
                      {category.title}
                    </p>
                    <h3 className="mt-2 font-serif text-lg">{activity.title}</h3>
                    <p className="mt-1 line-clamp-2 text-justify text-sm text-stone-600">
                      {activity.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <Button asChild variant="secondary" className="mt-8 sm:hidden">
            <Link to="/galerie">
              Voir toute la galerie <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
