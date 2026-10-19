import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoAsset from "../assets/logo-illasso.jpeg.asset.json";
import { RoyalMapImage } from "../components/royal-map-lightbox";
import { EventCard } from "../components/event-card";
import { gallery, homeSections, images, upcomingEvents } from "../lib/site-data";

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

const fullSections = homeSections.slice(0, 3);
const sectionCta: Record<string, string> = { histoire: "Lire l’histoire du royaume", culture: "Explorer la culture", roi: "Connaître le Roi" };
const featureCards = homeSections.slice(3);
// Photos déjà utilisées ailleurs sur l’accueil, exclues de l’aperçu galerie.
const usedOnHome = new Set<string>([images.palace, images.king, ...homeSections.map((s) => s.image).filter((i): i is string => !!i)]);

function Index() {
  const upcoming = upcomingEvents().slice(0, 3);
  const preview = gallery.filter((item) => !usedOnHome.has(item.image)).slice(0, 4);
  return <>
    <section className="hero-section">
      <img src={images.palace} alt="Cour royale lors d’une cérémonie à Illasso" className="hero-image" width={1920} height={1080} />
      <div className="hero-shade" />
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1440px] items-end px-6 pb-16 pt-32 lg:px-12 lg:pb-20">
        <div className="max-w-4xl animate-fade-in text-cream">
          <p className="eyebrow">Commune de Sakété — Royaume Mère</p>
          <div className="mt-5 flex items-center gap-5"><img src={logoAsset.url} alt="" className="hidden size-24 rounded-full object-cover ring-1 ring-gold/60 sm:block" width={96} height={96} /><h1 className="font-serif text-6xl leading-none sm:text-8xl">ILLASSO</h1></div>
          <p className="mt-5 font-serif text-2xl italic text-gold sm:text-3xl">Un trône, une mémoire, une terre à vivre.</p>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">Au cœur de Sakété, le Royaume Mère d’Illasso veille sur une mémoire vivante faite de transmission, de culture et de communauté.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/a-propos" className="button-primary">Découvrir le royaume <ArrowRight size={16} /></Link><a href="#mot-du-roi" className="button-secondary">Lire le mot du Roi</a></div>
        </div>
      </div>
    </section>
    <section id="mot-du-roi" className="section-shell tone-cream section-reveal scroll-mt-20">
      <div className="glass edge mx-auto grid max-w-[1344px] gap-8 rounded-3xl p-7 md:grid-cols-[240px_1fr] md:p-10">
        <img src={images.king} alt="Portrait du Roi d’Illasso" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" width={1024} height={1280} />
        <div className="self-center"><p className="eyebrow">Le mot du Roi</p><blockquote className="mt-5 font-serif text-2xl leading-relaxed sm:text-3xl">« Que la sagesse de nos aïeux guide chaque pas sur cette terre bénie. Nous n’héritons pas d’Illasso — nous le recevons, et nous le transmettons. »</blockquote><p className="mt-6 text-sm text-ink/55">Sa Majesté, Roi d’Illasso — Gardien de la parole et du territoire</p></div>
      </div>
    </section>
    {fullSections.map((section, index) => (
      <section key={section.id} id={section.id} className={`section-shell section-reveal ${["tone-ivory", "tone-ember", "tone-gold"][index] ?? "tone-ivory"}`}>
        <div className={`mx-auto grid max-w-[1344px] items-center gap-10 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}>
          {/* Emplacement photo : renseignez `image` dans homeSections pour remplacer la texture. */}
          <figure className="parallax-media edge overflow-hidden rounded-3xl border border-gold/30">
            {section.image
              ? <img src={section.image} alt={section.imageAlt} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]" width={1280} height={960} />
              : <div className="royal-texture grid aspect-[4/3] w-full place-items-center" role="img" aria-label={section.imageAlt}><img src={logoAsset.url} alt="" className="size-28 rounded-full opacity-80 ring-1 ring-gold/50" width={112} height={112} /></div>}
          </figure>
          <div>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 className="section-title">{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-base leading-relaxed text-ink/70">{paragraph}</p>)}
            <ul className="mt-7 space-y-3">{section.points.map((point) => <li key={point} className="flex items-start gap-3 text-sm text-ink/65"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />{point}</li>)}</ul>
            <Link to="/a-propos" hash={section.id} className="button-primary mt-8">{sectionCta[section.id]} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    ))}
    <section className="section-shell tone-ink section-reveal">
      <div className="mx-auto grid max-w-[1344px] gap-6 md:grid-cols-2">
        {featureCards.map((card) => (
          <Link key={card.id} to="/a-propos" hash={card.id} className="edge group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl border border-gold/30 p-8 text-cream">
            {card.image ? <img src={card.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.04]" /> : <span className="royal-texture absolute inset-0" />}
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10" />
            <span className="relative"><span className="eyebrow">{card.eyebrow}</span><span className="mt-3 block font-serif text-3xl">{card.title}</span><span className="mt-3 block max-w-md text-sm leading-relaxed text-cream/75">{card.paragraphs[0]}</span><span className="mt-5 inline-flex items-center gap-2 text-sm text-gold">{card.id === "territoire" ? "Parcourir le territoire" : "Voir les activités"} <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span></span>
          </Link>
        ))}
      </div>
    </section>
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
          <Link to="/a-propos" hash="territoire" className="button-primary mt-8">Voir la carte du territoire <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
    <section className="section-shell tone-gold section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <p className="eyebrow">Galerie royale</p><h2 className="section-title">Un aperçu de la galerie</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {preview.map((item) => (
            <Link key={item.title} to="/galerie" className="glass edge group overflow-hidden rounded-2xl">
              <figure className="overflow-hidden"><img src={item.image} alt={item.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.05]" width={1280} height={800} /></figure>
              <div className="p-5"><h3 className="font-serif text-lg">{item.title}</h3><p className="mt-1 text-sm text-ink/55">{item.meta}</p></div>
            </Link>
          ))}
        </div>
        <Link to="/galerie" className="button-primary mt-8">Voir toute la galerie <ArrowRight size={16} /></Link>
      </div>
    </section>
    <section className="section-shell tone-cream section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <p className="eyebrow">Agenda royal</p><h2 className="section-title">Prochains événements</h2>
        {upcoming.length
          ? <><div className="mt-10 grid gap-6 md:grid-cols-3">{upcoming.map((event) => <EventCard key={event.title} event={event} />)}</div><Link to="/evenements" className="button-primary mt-8">Voir tout l’agenda <ArrowRight size={16} /></Link></>
          : <div className="glass edge mt-10 rounded-3xl p-10 text-center"><p className="font-serif text-2xl">Les prochaines dates seront annoncées bientôt.</p><Link to="/evenements" hash="passes" className="mt-6 inline-flex items-center gap-2 text-sm text-gold">Voir les événements passés <ArrowRight size={15} /></Link></div>}
      </div>
    </section>
  </>;
}
