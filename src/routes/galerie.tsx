import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { PageIntro } from "../components/site-chrome";
import { gallery, galleryEvents, images } from "../lib/site-data";

export const Route = createFileRoute("/galerie")({
  head: () => ({ meta: [{ title: "Galerie — Royaume d’Illasso" }, { name: "description", content: "Images, cérémonies, culture et territoire du Royaume Mère d’Illasso." }, { property: "og:title", content: "Galerie du Royaume d’Illasso" }, { property: "og:description", content: "Un regard photographique sur le patrimoine vivant d’Illasso." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/galerie" }] }), component: Gallery,
});

type Photo = (typeof gallery)[number];
const categories = ["Toutes", ...Array.from(new Set(gallery.map((p) => p.category)))];

function Gallery() {
  const [category, setCategory] = useState("Toutes");
  const [open, setOpen] = useState<{ list: Photo[]; index: number } | null>(null);
  const touchX = useRef<number | null>(null);
  const albums = galleryEvents
    .map((event) => ({ ...event, photos: event.photos.filter((p): p is Photo => !!p && (category === "Toutes" || p.category === category)) }))
    .filter((event) => event.photos.length > 0);

  const step = (delta: number) => setOpen((o) => o && { ...o, index: (o.index + delta + o.list.length) % o.list.length });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const current = open ? open.list[open.index] : null;

  return <>
    <PageIntro eyebrow="Galerie" title="Les événements en images." image={images.craft} imageAlt="Scène d’artisanat et de patrimoine du Royaume d’Illasso">Chaque album rassemble les photographies d’un moment de la vie du royaume. Un court récit en précise le lieu, la date et les circonstances.</PageIntro>
    <nav className="tone-gold border-b border-gold/20 px-6 py-5 lg:px-12" aria-label="Filtrer par catégorie">
      <div className="mx-auto flex max-w-[1344px] gap-2 overflow-x-auto pb-1">
        {categories.map((c) => <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={c === category} className={c === category ? "filter-button filter-active shrink-0" : "filter-button shrink-0"}>{c}</button>)}
      </div>
    </nav>
    {albums.map((event, eventIndex) => (
      <section key={event.id} id={event.id} className={`section-shell section-reveal scroll-mt-28 ${["tone-cream", "tone-ink", "tone-ivory"][eventIndex] ?? "tone-ivory"}`}>
        <div className="mx-auto max-w-[1344px]">
          <header className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase text-gold">{event.date} · {event.place}</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">{event.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65 sm:text-lg">{event.description}</p>
          </header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {event.photos.map((photo, photoIndex) => (
              <figure key={`${event.id}-${photo.title}`} className={photoIndex === 0 && event.photos.length > 2 ? "sm:col-span-2" : ""}>
                <Button type="button" variant="ghost" onClick={() => setOpen({ list: event.photos, index: photoIndex })} aria-label={`Agrandir : ${photo.title}`} className="gallery-mosaic group h-auto w-full overflow-hidden p-0">
                  <img src={photo.image} alt={photo.title} loading="lazy" className={`w-full object-cover transition duration-700 group-hover:scale-[1.04] ${photoIndex === 0 && event.photos.length > 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`} />
                </Button>
                <figcaption className="mt-3"><span className="block font-serif text-lg">{photo.title}</span><span className="mt-1 block text-sm text-ink/55">{photo.meta}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    ))}
    {current && open && (
      <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.title} onClick={() => setOpen(null)}
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? null; }}
        onTouchEnd={(e) => { const start = touchX.current; const end = e.changedTouches[0]?.clientX; if (start != null && end != null && Math.abs(end - start) > 50) step(end < start ? 1 : -1); touchX.current = null; }}>
        <Button type="button" variant="outline" size="icon" className="absolute right-5 top-5 rounded-full" aria-label="Fermer" onClick={() => setOpen(null)}><X size={20} /></Button>
        {open.list.length > 1 && <>
          <Button type="button" variant="outline" size="icon" className="absolute left-3 top-1/2 rounded-full sm:left-6" aria-label="Photo précédente" onClick={(e) => { e.stopPropagation(); step(-1); }}><ChevronLeft size={20} /></Button>
          <Button type="button" variant="outline" size="icon" className="absolute right-3 top-1/2 rounded-full sm:right-6" aria-label="Photo suivante" onClick={(e) => { e.stopPropagation(); step(1); }}><ChevronRight size={20} /></Button>
        </>}
        <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
          <img src={current.image} alt={current.title} className="max-h-[72vh] w-full object-contain" />
          <figcaption className="mt-5 text-cream"><span className="block font-serif text-2xl">{current.title}</span><span className="mt-2 block text-sm text-cream/70">{current.meta}</span><span className="mt-2 block text-xs text-cream/50">{open.index + 1} / {open.list.length}</span></figcaption>
        </figure>
      </div>
    )}
  </>;
}
