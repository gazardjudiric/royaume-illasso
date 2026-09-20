import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { PageIntro } from "../components/site-chrome";
import { gallery, galleryEvents, images } from "../lib/site-data";

export const Route = createFileRoute("/galerie")({
  head: () => ({ meta: [{ title: "Galerie — Royaume d’Illasso" }, { name: "description", content: "Images, cérémonies, culture et territoire du Royaume Mère d’Illasso." }, { property: "og:title", content: "Galerie du Royaume d’Illasso" }, { property: "og:description", content: "Un regard photographique sur le patrimoine vivant d’Illasso." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/galerie" }] }), component: Gallery,
});

function Gallery() {
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return <>
    <PageIntro eyebrow="Galerie" title="Les événements en images." image={images.craft} imageAlt="Scène d’artisanat et de patrimoine du Royaume d’Illasso">Chaque album rassemble les photographies d’un moment de la vie du royaume. Un court récit en précise le lieu, la date et les circonstances.</PageIntro>
    <nav className="tone-gold border-b border-gold/20 px-6 py-5 lg:px-12" aria-label="Albums de la galerie">
      <div className="mx-auto flex max-w-[1344px] gap-2 overflow-x-auto pb-1">
        {galleryEvents.map((event) => <a key={event.id} href={`#${event.id}`} className="filter-button shrink-0">{event.title}</a>)}
      </div>
    </nav>
    <div className="bg-background">
      <div>
        {galleryEvents.map((event, eventIndex) => (
          <section key={event.id} id={event.id} className={`section-shell section-reveal scroll-mt-28 ${["tone-cream", "tone-ink", "tone-gold"][eventIndex] ?? "tone-ivory"}`}>
            <div className="mx-auto max-w-[1344px]"><header className="mb-10 max-w-3xl">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs font-semibold uppercase text-gold sm:flex">
                <span className="min-w-0 truncate">{event.date}</span><span className="size-1 shrink-0 rounded-full bg-gold/50"/><span className="min-w-0 text-right sm:text-left">{event.place}</span>
              </div>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">{event.title}</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/65 sm:text-lg">{event.description}</p>
            </header>
            <div className={eventIndex === 0 ? "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" : "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-6"}>
              {event.photos.map((photo, photoIndex) => {
                if (!photo) return null;
                const firstAlbumClass = photoIndex === 0 ? "col-span-2 row-span-2 aspect-square" : photoIndex === 3 ? "col-span-2 aspect-[2/1]" : "aspect-square";
                const laterAlbumClass = photoIndex === 0 ? "col-span-2 aspect-[4/3] lg:col-span-3" : photoIndex === 1 ? "col-span-1 aspect-[3/4] lg:col-span-1" : "col-span-1 aspect-[3/4] lg:col-span-2";
                return <Button key={`${event.id}-${photo.title}`} type="button" variant="ghost" onClick={() => setSelected(photo)} aria-label={`Agrandir : ${photo.title}`} className={`gallery-mosaic group relative h-auto overflow-hidden p-0 ${eventIndex === 0 ? firstAlbumClass : laterAlbumClass}`}>
                  <img src={photo.image} alt={photo.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <span className="absolute inset-x-0 bottom-0 bg-ink/70 p-4 text-left text-cream opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"><span className="block font-serif text-base">{photo.title}</span><span className="mt-1 block text-xs text-cream/70">{photo.meta}</span></span>
                </Button>;
              })}
            </div></div>
          </section>
        ))}
      </div>
    </div>
    {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}><Button type="button" variant="outline" size="icon" className="absolute right-5 top-5 rounded-full" aria-label="Fermer" onClick={() => setSelected(null)}><X size={20}/></Button><div className="max-w-5xl" onClick={(event) => event.stopPropagation()}><img src={selected.image} alt={selected.title} className="max-h-[75vh] w-full object-contain"/><h2 className="mt-5 font-serif text-2xl text-cream">{selected.title}</h2><p className="mt-2 text-sm text-cream/65">{selected.meta}</p></div></div>}
  </>;
}