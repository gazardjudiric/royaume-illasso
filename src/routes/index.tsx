import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
            <div className="mt-5 flex items-center gap-5"><img src={logoAsset.url} alt="" className="hidden size-24 rounded-full object-cover ring-1 ring-gold/60 sm:block" width={96} height={96} /><h1 className="font-serif text-6xl leading-none sm:text-8xl">ILLASSO</h1></div>
            <p className="mt-5 font-serif text-2xl italic text-gold sm:text-3xl">Un trône, une mémoire, une terre à vivre.</p>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">Au cœur de Sakété, le Royaume Mère d’Illasso veille sur une mémoire vivante faite de transmission, de culture et de communauté.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link to="/a-propos" className="button-primary">Découvrir le royaume <ArrowRight size={16} /></Link><a href="#mot-du-roi" className="button-secondary">Le mot du Roi</a></div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold/25 to-ember/15 blur-2xl" />
              <img src={images.king} alt="Portrait du Roi d’Illasso" className="relative aspect-[4/5] w-full rounded-3xl border border-gold/30 object-cover shadow-2xl" width={1024} height={1280} />
            </div>
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
      <div className="mx-auto max-w-[1344px]"><p className="eyebrow">Découvrir Illasso</p><h2 className="section-title">Les chapitres d’un patrimoine vivant</h2><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{[
        ["Histoire", "Les origines et les grandes étapes du royaume."], ["Culture", "Rites, langues, artisanat et cérémonies."], ["Le Roi", "Une fonction au service de la transmission."], ["Activités", "Audiences, visites et actions sociales."], ["Territoire", "Des lieux, villages et terres de mémoire."],
      ].map(([title = "Illasso", text = ""], index) => <Link key={title} to="/a-propos" hash={["histoire", "culture", "roi", "activites", "territoire"][index] ?? "histoire"} className="glass edge group rounded-2xl p-6"><span className="font-serif text-gold">0{index + 1}</span><h3 className="mt-8 font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/55">{text}</p><span className="mt-6 inline-block text-sm text-gold opacity-70 transition group-hover:translate-x-1">En savoir plus →</span></Link>)}</div></div>
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
          <Link to="/a-propos" hash="territoire" className="button-primary mt-8">Découvrir le territoire <ArrowRight size={16} /></Link>
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
        <Link to="/galerie" className="button-secondary mt-8 sm:hidden">Voir toute la galerie</Link>
      </div>
    </section>
    <section className="section-shell tone-cream section-reveal">
      <div className="mx-auto max-w-[1344px]"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Agenda royal</p><h2 className="section-title">Prochains événements</h2></div><Link to="/evenements" className="hidden text-sm text-gold sm:block">Voir tous les événements →</Link></div><div className="mt-10 grid gap-6 md:grid-cols-3">{events.slice(0,3).map((event) => <article key={event.title} className="glass edge overflow-hidden rounded-2xl"><img src={event.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" width={1280} height={800} /><div className="p-6"><p className="text-xs uppercase tracking-[0.18em] text-gold">{event.date}</p><h3 className="mt-3 font-serif text-xl">{event.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/55">{event.description}</p></div></article>)}</div><Link to="/evenements" className="button-primary mt-8 sm:hidden">Tous les événements</Link></div>
    </section>
  </>;
}
