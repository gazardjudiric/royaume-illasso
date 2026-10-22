import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import logoAsset from "../assets/logo-illasso.jpeg.asset.json";
import { RoyalMapImage } from "../components/royal-map-lightbox";
import { events, gallery, homeSections, images } from "../lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Royaume Mère d’Illasso — Sakété" },
    { name: "description", content: "Découvrez l’histoire, la culture, le territoire et la vie du Royaume Mère d’Illasso à Sakété." },
    { property: "og:title", content: "Royaume Mère d’Illasso — Sakété" },
    { property: "og:description", content: "Patrimoine vivant, culture et événements du Royaume Mère d’Illasso." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: Index,
});

const heroSlides = [
  { image: images.king, alt: "Portrait du Roi d’Illasso", label: "Le Roi" },
  { image: images.festival, alt: "Célébration culturelle du Royaume d’Illasso", label: "Cérémonies royales" },
  { image: images.craft, alt: "Artisanat et savoir-faire d’Illasso", label: "Culture & traditions" },
  { image: images.territory, alt: "Terres et villages du Royaume d’Illasso", label: "Territoire royal" },
] as const;

const chapterCards = [
  {
    title: "Histoire",
    text: "Les origines et les grandes étapes du royaume.",
    section: "histoire",
    image: images.palace,
    imageAlt: "Palais royal d’Illasso",
  },
  {
    title: "Culture",
    text: "Rites, langues, artisanat et cérémonies.",
    section: "culture",
    image: images.craft,
    imageAlt: "Savoir-faire artisanal d’Illasso",
  },
  {
    title: "Le Roi",
    text: "Une fonction au service de la transmission.",
    section: "roi",
    image: images.king,
    imageAlt: "Portrait du Roi d’Illasso",
  },
  {
    title: "Activités",
    text: "Audiences, visites et actions sociales.",
    section: "activites",
    image: images.festival,
    imageAlt: "Cérémonie culturelle du royaume",
  },
  {
    title: "Territoire",
    text: "Des lieux, villages et terres de mémoire.",
    section: "territoire",
    image: images.territory,
    imageAlt: "Terres et villages d’Illasso",
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
            ].filter(Boolean).join(" ")}
            aria-hidden={index !== activeSlide}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 pt-16">
          <div className="min-w-0">
            <p className="truncate text-xs uppercase tracking-[0.16em] text-cream/75">{heroSlides[activeSlide].label}</p>
            <p className="mt-1 text-xs text-cream/60">{activeSlide + 1} / {heroSlides.length}</p>
          </div>
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
  return <>
    <section className="hero-section">
      <img src={images.palace} alt="Cour royale lors d’une cérémonie à Illasso" className="hero-image" width={1920} height={1080} />
      <div className="hero-shade" />
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1440px] items-end px-6 pb-16 pt-32 lg:px-12 lg:pb-20">
        <div className="grid w-full animate-fade-in gap-10 lg:grid-cols-[1fr_420px] lg:items-end lg:gap-16">
          <div className="max-w-4xl text-cream">
            <p className="eyebrow">Commune de Sakété — Royaume Mère</p>
            <h1 aria-label="ILLASSO" className="hero-wordmark mt-5 font-serif text-6xl leading-none sm:text-8xl"><span aria-hidden="true">ILLASS</span><img src={logoAsset.url} alt="" aria-hidden="true" className="hero-seal" width={96} height={96} /></h1>
            <p className="mt-5 font-serif text-2xl italic text-gold sm:text-3xl">Un trône, une mémoire, une terre à vivre.</p>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">Au cœur de Sakété, le Royaume Mère d’Illasso veille sur une mémoire vivante faite de transmission, de culture et de communauté.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild><Link to="/a-propos">Découvrir le royaume <ArrowRight size={16} /></Link></Button><Button asChild variant="secondary"><a href="#mot-du-roi">Le mot du Roi</a></Button></div>
          </div>
          <div className="mx-auto w-full max-w-[260px] lg:max-w-none">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
    <section id="mot-du-roi" className="section-shell tone-cream section-reveal">
      <div className="glass edge mx-auto grid max-w-[1344px] gap-8 rounded-3xl p-7 md:grid-cols-[240px_1fr] md:p-10">
        <img src={images.king} alt="Portrait éditorial du Roi d’Illasso" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" width={1024} height={1280} />
        <div className="self-center"><p className="eyebrow">Le mot du Roi</p><blockquote className="mt-5 font-serif text-2xl leading-relaxed sm:text-3xl">« Que la sagesse de nos aïeux guide chaque pas sur cette terre bénie. Nous n’héritons pas d’Illasso — nous le recevons, et nous le transmettons. »</blockquote><p className="mt-6 text-sm text-ink/55">Sa Majesté, Roi d’Illasso — Gardien de la parole et du territoire</p></div>
      </div>
    </section>
    <section className="section-shell tone-gold section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <div className="max-w-4xl">
          <p className="eyebrow">Découvrir Illasso</p>
          <h2 className="section-title">
            Les chapitres d’un <span className="text-gold">patrimoine vivant</span>
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink/65">
            Cinq regards pour parcourir l’histoire, les traditions, la royauté et les terres d’Illasso.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {chapterCards.map((chapter, index) => (
            <article key={chapter.title} className="chapter-card glass edge group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="chapter-card-media relative aspect-[4/3] overflow-hidden">
                <img
                  src={chapter.image}
                  alt={chapter.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="chapter-card-image h-full w-full object-cover"
                  width={1280}
                  height={960}
                />
                <div className="chapter-card-shade absolute inset-0" />
                <span className="chapter-card-number" aria-label={`Chapitre ${index + 1}`}>
                  0{index + 1}
                </span>
              </div>
              <div className="flex min-h-[205px] flex-1 flex-col p-5">
                <h3 className="font-serif text-xl">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{chapter.text}</p>
                <Button
                  asChild
                  variant="link"
                  className="chapter-card-cta mt-auto h-auto justify-start gap-2 px-0 pb-0 pt-6 text-gold"
                >
                  <Link to="/a-propos" hash={chapter.section}>
                    Explorer le chapitre <ArrowRight size={15} />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    {homeSections.map((section, index) => (
      <section key={section.id} id={section.id} className={`section-shell section-reveal ${["tone-ivory", "tone-ember", "tone-cream", "tone-ink", "tone-gold"][index] ?? "tone-ivory"}`}>
        <div className={`mx-auto grid max-w-[1344px] items-center gap-10 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}>
          <figure className="parallax-media edge overflow-hidden rounded-3xl border border-gold/30">
            <img src={section.image} alt={section.imageAlt} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]" width={1280} height={960} />
          </figure>
          <div>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 className="section-title">{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-relaxed text-ink/70">{paragraph}</p>)}
            <ul className="mt-7 space-y-3">{section.points.map((point) => <li key={point} className="flex items-start gap-3 text-sm text-ink/65"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />{point}</li>)}</ul>
            <Link to="/a-propos" hash={section.id} className="mt-8 inline-flex items-center gap-2 text-sm text-gold">En savoir plus <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    ))}
    <section className="section-shell tone-ivory section-reveal">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[minmax(300px,500px)_1fr] lg:gap-20">
        <figure className="mx-auto w-full max-w-[500px] overflow-hidden border border-gold/30 bg-cream shadow-2xl">
          <RoyalMapImage />
        </figure>
        <div className="max-w-xl">
          <p className="eyebrow">Géographie & patrimoine</p>
          <h2 className="section-title">Le Territoire Royal</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">Le Palais Royal d’Illasso se situe dans l’arrondissement de Yoko, au cœur de la commune de Sakété, dans le département du Plateau au Bénin.</p>
          <p className="mt-5 leading-relaxed text-ink/60">La carte officielle retrace les villages, les voies et les repères qui relient Illasso à son territoire historique.</p>
          <Button asChild className="mt-8"><Link to="/a-propos" hash="territoire">Découvrir le territoire <ArrowRight size={16} /></Link></Button>
        </div>
      </div>
    </section>
    <section className="section-shell tone-photo section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow">Galerie royale</p><h2 className="section-title">Un aperçu de la galerie</h2></div>
          <Link to="/galerie" className="hidden text-sm text-gold sm:block">Voir toute la galerie →</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.slice(0, 4).map((item) => (
            <Link key={item.title} to="/galerie" className="glass edge group overflow-hidden rounded-2xl">
              <figure className="overflow-hidden">
                <img src={item.image} alt={`${item.title} — ${item.meta}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.05]" width={1280} height={960} />
              </figure>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-gold">{item.category}</p>
                <h3 className="mt-2 font-serif text-lg">{item.title}</h3>
                <p className="mt-1 text-sm text-ink/55">{item.meta}</p>
              </div>
            </Link>
          ))}
        </div>
        <Button asChild variant="secondary" className="mt-8 sm:hidden"><Link to="/galerie">Voir toute la galerie</Link></Button>
      </div>
    </section>
    <section className="section-shell tone-cream section-reveal">
      <div className="mx-auto max-w-[1344px]"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Agenda royal</p><h2 className="section-title">Prochains événements</h2></div><Link to="/evenements" className="hidden text-sm text-gold sm:block">Voir tous les événements →</Link></div><div className="mt-10 grid gap-6 md:grid-cols-3">{events.slice(0,3).map((event) => <article key={event.title} className="glass edge overflow-hidden rounded-2xl"><img src={event.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" width={1280} height={800} /><div className="p-6"><p className="text-xs uppercase tracking-[0.18em] text-gold">{event.date}</p><h3 className="mt-3 font-serif text-xl">{event.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/55">{event.description}</p></div></article>)}</div><Button asChild className="mt-8 sm:hidden"><Link to="/evenements">Tous les événements</Link></Button></div>
    </section>
  </>;
}
