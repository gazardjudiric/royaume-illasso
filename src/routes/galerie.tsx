import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { PageIntro } from "../components/site-chrome";
import { gallery, galleryEvents, images } from "../lib/site-data";

export const Route = createFileRoute("/galerie")({
  head: () => ({ meta: [{ title: "Galerie — Royaume d’Illasso" }, { name: "description", content: "Images, cérémonies, culture et territoire du Royaume Mère d’Illasso." }, { property: "og:title", content: "Galerie du Royaume d’Illasso" }, { property: "og:description", content: "Un regard photographique sur le patrimoine vivant d’Illasso." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/galerie" }] }), component: Gallery,
});

function Gallery() {
  const [category, setCategory] = useState("Toutes");
  const [selected, setSelected] = useState<string | null>(null);
  const touchStart = useRef<number | null>(null);
  const visiblePhotos = gallery.filter(photo => category === "Toutes" || photo.category === category);
  const selectedIndex = visiblePhotos.findIndex(photo => photo.title === selected);
  const photo = visiblePhotos[selectedIndex];
  const move = (direction: number) => {
    const next = visiblePhotos[(selectedIndex + direction + visiblePhotos.length) % visiblePhotos.length];
    if (next) setSelected(next.title);
  };
  useEffect(() => {
    if (!selected) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const next = visiblePhotos[(selectedIndex + (event.key === "ArrowRight" ? 1 : -1) + visiblePhotos.length) % visiblePhotos.length];
      if (next) setSelected(next.title);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [selected, selectedIndex, category]);
  // A photograph is displayed in only one album; replace these illustrative slots with official archives.
  const albums = galleryEvents.map((event, index) => ({ ...event, photos: index === 0 ? [gallery[2], gallery[0], gallery[1]] : index === 1 ? [gallery[3]] : [gallery[4]] }));
  return <>
    <PageIntro eyebrow="Galerie" title="Les événements en images." image={images.craft} imageAlt="Illustration d’un atelier où un artisan travaille textiles et sculptures">Cérémonies, gestes et paysages du royaume. Les images présentées sont illustratives, en attendant les archives officielles.</PageIntro>
    <nav className="tone-gold border-b border-gold/20 px-6 py-5 lg:px-12" aria-label="Catégories photographiques"><div className="mx-auto flex max-w-[1344px] flex-wrap gap-2">{["Toutes", ...new Set(gallery.map(photo => photo.category))].map(item => <Button key={item} variant="ghost" className={`filter-button h-auto ${item === category ? "filter-active" : ""}`} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</Button>)}</div></nav>
    {albums.map((event, index) => {
      const photos = event.photos.filter(p => p && (category === "Toutes" || p.category === category));
      if (!photos.length) return null;
      return <section key={event.id} className={`section-shell ${["tone-cream", "tone-ink", "tone-gold"][index]}`}><div className="mx-auto max-w-[1344px]"><header className="mb-10 max-w-3xl"><p className="text-xs">{event.date} · {event.place} · agenda éditorial</p><h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">{event.title}</h2><p className="mt-5 text-base leading-relaxed text-ink/65 sm:text-lg">{event.description}</p></header><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{photos.map((p, i) => p ? <figure key={p.title} className={photos.length > 1 && i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}><Button variant="ghost" className="gallery-mosaic group block h-auto w-full overflow-hidden p-0" aria-label={`Agrandir : ${p.title}`} onClick={() => setSelected(p.title)}><img src={p.image} alt={`${p.title} : ${p.meta}`} loading="lazy" className={`${photos.length > 1 && i === 0 ? "aspect-[2/1]" : "aspect-[4/3]"} w-full object-cover transition duration-700 group-hover:scale-[1.04]`} /></Button><figcaption className="mt-4"><h3 className="font-serif text-lg">{p.title}</h3><p className="mt-2 text-sm leading-relaxed">{p.meta}</p></figcaption></figure> : null)}</div></div></section>;
    })}
    <Dialog open={Boolean(photo)} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="gallery-dialog tone-ink" onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => { const end = event.changedTouches[0]?.clientX; if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 50) move(end < touchStart.current ? 1 : -1); touchStart.current = null; }}>
      <DialogTitle className="font-serif text-2xl">{photo?.title}</DialogTitle><DialogDescription className="text-sm text-ink">{photo?.meta}</DialogDescription>
      {photo && <img src={photo.image} alt={`${photo.title} : ${photo.meta}`} className="max-h-[65dvh] w-full object-contain" />}
      <div className="flex items-center justify-between gap-5"><Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Photo précédente"><ArrowLeft /></Button><p className="text-sm">{selectedIndex + 1} / {visiblePhotos.length}</p><Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Photo suivante"><ArrowRight /></Button></div>
    </DialogContent></Dialog>
  </>;
}
