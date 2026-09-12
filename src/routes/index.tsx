import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoAsset from "../assets/logo-illasso.jpeg.asset.json";
import { events, images } from "../lib/site-data";

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

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <>
    <section className="hero-section">
      <img src={images.palace} alt="Cour royale lors d’une cérémonie à Illasso" className="hero-image" width={1920} height={1080} />
      <div className="hero-shade" />
      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1440px] items-end px-6 pb-16 pt-32 lg:px-12 lg:pb-20">
        <div className="max-w-4xl animate-fade-in">
          <p className="eyebrow">Commune de Sakété — Royaume Mère</p>
          <div className="mt-5 flex items-center gap-5"><img src={logoAsset.url} alt="" className="hidden size-24 rounded-full object-cover ring-1 ring-gold/60 sm:block" width={96} height={96} /><h1 className="font-serif text-6xl leading-none sm:text-8xl">ILLASSO</h1></div>
          <p className="mt-5 font-serif text-2xl italic text-gold sm:text-3xl">Un trône, une mémoire, une terre à vivre.</p>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">Au cœur de Sakété, le Royaume Mère d’Illasso veille sur une mémoire vivante faite de transmission, de culture et de communauté.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/a-propos" className="button-primary">Découvrir le royaume <ArrowRight size={16} /></Link><a href="#mot-du-roi" className="button-secondary">Le mot du Roi</a></div>
        </div>
      </div>
    </section>
    <section id="mot-du-roi" className="section-shell">
      <div className="glass edge mx-auto grid max-w-[1344px] gap-8 rounded-3xl p-7 md:grid-cols-[240px_1fr] md:p-10">
        <img src={images.king} alt="Portrait éditorial du Roi d’Illasso" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" width={1024} height={1280} />
        <div className="self-center"><p className="eyebrow">Le mot du Roi</p><blockquote className="mt-5 font-serif text-2xl leading-relaxed sm:text-3xl">« Que la sagesse de nos aïeux guide chaque pas sur cette terre bénie. Nous n’héritons pas d’Illasso — nous le recevons, et nous le transmettons. »</blockquote><p className="mt-6 text-sm text-cream/55">Sa Majesté, Roi d’Illasso — Gardien de la parole et du territoire</p></div>
      </div>
    </section>
    <section className="section-shell">
      <div className="mx-auto max-w-[1344px]"><p className="eyebrow">Découvrir Illasso</p><h2 className="section-title">Les chapitres d’un patrimoine vivant</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{[
        ["Histoire", "Les origines et les grandes étapes du royaume."], ["Culture", "Rites, langues, artisanat et cérémonies."], ["Le Roi", "Une fonction au service de la transmission."], ["Activités", "Audiences, visites et actions sociales."], ["Territoire", "Des lieux, villages et terres de mémoire."],
      ].map(([title = "Illasso", text = ""], index) => <Link key={title} to="/a-propos" hash={title === "Le Roi" ? "roi" : title.toLowerCase()} className="glass edge group rounded-2xl p-6"><span className="font-serif text-gold">0{index + 1}</span><h3 className="mt-8 font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-cream/55">{text}</p><span className="mt-6 inline-block text-sm text-gold opacity-70 transition group-hover:translate-x-1">En savoir plus →</span></Link>)}</div></div>
    </section>
    <section className="section-shell">
      <div className="mx-auto max-w-[1344px]"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Agenda royal</p><h2 className="section-title">Prochains événements</h2></div><Link to="/evenements" className="hidden text-sm text-gold sm:block">Voir tous les événements →</Link></div><div className="mt-10 grid gap-6 md:grid-cols-3">{events.slice(0,3).map((event) => <article key={event.title} className="glass edge overflow-hidden rounded-2xl"><img src={event.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" width={1280} height={800} /><div className="p-6"><p className="text-xs uppercase tracking-[0.18em] text-gold">{event.date}</p><h3 className="mt-3 font-serif text-xl">{event.title}</h3><p className="mt-3 text-sm leading-relaxed text-cream/55">{event.description}</p></div></article>)}</div><Link to="/evenements" className="button-primary mt-8 sm:hidden">Tous les événements</Link></div>
    </section>
  </>;
}
