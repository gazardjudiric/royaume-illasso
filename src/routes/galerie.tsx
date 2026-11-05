import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { PageIntro } from "../components/site-chrome";
import { galleryCategories, images, type GalleryActivity, type GalleryMedia } from "../lib/site-data";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Royaume d’Illasso" },
      { name: "description", content: "Explorez les catégories, activités, images et vidéos du Royaume Mère d’Illasso." },
      { property: "og:title", content: "Galerie du Royaume d’Illasso" },
      { property: "og:description", content: "Un regard sur la culture, la mémoire royale et le territoire d’Illasso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: Gallery,
});

type GalleryViewerState = { activity: GalleryActivity; mediaIndex: number };

// Mots de liaison laissés en minuscules, selon l’usage français des titres.
const titleLinkWords = new Set(["et", "ou", "de", "du", "des", "la", "le", "les", "à", "au", "aux", "en", "sur", "pour", "par"]);

function toTitleCase(title: string) {
  return title
    .split(" ")
    .map((word, index) => {
      if (index > 0 && titleLinkWords.has(word.toLowerCase())) return word;
      // « d’intronisation » → « d’Intronisation » : la majuscule suit l’élision.
      const [, prefix, rest] = word.match(/^([dlDL][’'])(.+)$/) ?? [];
      if (prefix && rest) return prefix + rest.charAt(0).toUpperCase() + rest.slice(1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function videoEmbedUrl(src: string) {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : src;
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      const id = url.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
      if (url.pathname.startsWith("/embed/")) return src;
    }
    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : src;
    }
  } catch {
    return src;
  }
  return src;
}

function mediaCounts(media: GalleryMedia[]) {
  const imagesCount = media.filter((item) => item.type === "image").length;
  const videosCount = media.filter((item) => item.type === "video").length;
  return [
    imagesCount > 0 ? `${imagesCount} photo${imagesCount > 1 ? "s" : ""}` : "",
    videosCount > 0 ? `${videosCount} vidéo${videosCount > 1 ? "s" : ""}` : "",
  ].filter(Boolean).join(" · ");
}

// Mosaïque sur 2 colonnes × 6 rangées, remplie colonne par colonne :
// colonne gauche puis colonne droite (1 → 1+0, 2 → 1+1, 3 → 1+2, 4 → 1+3, 5 → 2+3).
function previewTileLayout(count: number, index: number) {
  if (count === 1) return "col-span-2 row-span-6";
  const leftCount = count === 5 ? 2 : 1;
  const tilesInColumn = index < leftCount ? leftCount : count - leftCount;
  return { 1: "row-span-6", 2: "row-span-3", 3: "row-span-2" }[tilesInColumn];
}

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("toutes");
  const [viewer, setViewer] = useState<GalleryViewerState | null>(null);

  const visibleCategories = activeCategory === "toutes"
    ? galleryCategories
    : galleryCategories.filter((category) => category.id === activeCategory);

  const activeMedia = viewer?.activity.media[viewer.mediaIndex];

  useEffect(() => {
    if (!viewer) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewer(null);
      if (event.key === "ArrowLeft") {
        setViewer((current) => current ? {
          ...current,
          mediaIndex: (current.mediaIndex - 1 + current.activity.media.length) % current.activity.media.length,
        } : null);
      }
      if (event.key === "ArrowRight") {
        setViewer((current) => current ? {
          ...current,
          mediaIndex: (current.mediaIndex + 1) % current.activity.media.length,
        } : null);
      }
    };

    document.addEventListener("keydown", handleKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeys);
    };
  }, [viewer]);

  const changeMedia = (direction: -1 | 1) => {
    setViewer((current) => {
      if (!current) return null;
      const total = current.activity.media.length;
      return { ...current, mediaIndex: (current.mediaIndex + direction + total) % total };
    });
  };

  const openActivity = (activity: GalleryActivity, mediaIndex = 0) => setViewer({ activity, mediaIndex });

  return <>
    <PageIntro eyebrow="Galerie royale" eyebrowClassName="!text-white" title="La mémoire du royaume en images" titleClassName="text-4xl sm:text-6xl text-gold" image={images.bannerGallery} imageAlt="Emblème du Royaume d’Illasso dans une salle du palais">
      Parcourez les traditions, les récits et les paysages d’Illasso.
    </PageIntro>

    <nav className="tone-gold border-b border-gold/20 px-5 py-5 sm:px-8 lg:px-12" aria-label="Catégories de la galerie">
      {/* Mobile et tablette : une seule ligne qui défile horizontalement, jusqu’aux bords de l’écran. */}
      <div className="-mx-5 -my-2 flex snap-x gap-3 overflow-x-auto scroll-px-5 px-5 py-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-auto lg:my-0 lg:max-w-[1344px] lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 lg:py-0 [&::-webkit-scrollbar]:hidden [&>*]:snap-start">
        <Button type="button" variant={activeCategory === "toutes" ? "default" : "secondary"} aria-pressed={activeCategory === "toutes"} onClick={() => setActiveCategory("toutes")} className="shrink-0">
          Toutes les catégories
        </Button>
        {galleryCategories.map((category) => (
          <Button key={category.id} type="button" variant={activeCategory === category.id ? "default" : "secondary"} aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} className="shrink-0">
            {category.title}
          </Button>
        ))}
      </div>
    </nav>

    <div className="bg-background">
      {visibleCategories.map((category, categoryIndex) => (
        <section key={category.id} id={category.id} className={`section-shell section-reveal scroll-mt-28 ${["tone-ivory", "tone-gold"][categoryIndex % 2]}`}>
          <div className="mx-auto max-w-[1344px]">
            <header className="mb-8 max-w-3xl">
              <h2 className="section-title mt-0 text-gold">{toTitleCase(category.title)}</h2>
              <p className="mt-4 text-justify max-w-2xl leading-relaxed text-ink/65">{category.description}</p>
            </header>
            <div className="grid gap-6 sm:grid-cols-2">
              {category.activities.map((activity) => {
                // L’aperçu reprend les 5 premiers médias, dans l’ordre du tableau `media`.
                const previewMedia = activity.media.slice(0, 5);
                const hiddenCount = activity.media.length - previewMedia.length;
                if (previewMedia.length === 0) return null;
                return (
                  <article key={activity.id} id={activity.id} className="edge group scroll-mt-28 flex flex-col overflow-hidden rounded-3xl border border-gold/25 bg-[#fffdf9] text-stone-900 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-6 pb-4">
                      <h3 className="font-serif text-2xl leading-tight text-gold">{activity.title}</h3>
                      <p className="mt-3 text-justify text-sm leading-relaxed text-stone-700">{activity.description}</p>
                    </div>
                    {/* Tablette : la mosaïque s’étire pour combler l’écart laissé par une description plus courte que la carte voisine.
                        Images en position absolue : une photo verticale ne doit pas agrandir la mosaïque. */}
                    <div className="mt-auto grid aspect-[4/5] sm:max-lg:flex-1 lg:aspect-[5/4] w-full grid-flow-col grid-cols-2 grid-rows-6 gap-1 px-1">
                      {previewMedia.map((media, index) => {
                        const previewSrc = media.type === "image" ? media.src : media.poster ?? images.videoPoster;
                        const isOverflowTile = hiddenCount > 0 && index === previewMedia.length - 1;
                        return (
                          <button key={media.id} type="button" onClick={() => openActivity(activity, index)} aria-label={isOverflowTile ? `Voir les ${hiddenCount} autres médias de ${activity.title}` : `Ouvrir : ${media.title}`} className={`relative min-h-0 overflow-hidden ${previewTileLayout(previewMedia.length, index)}`}>
                            <img src={previewSrc} alt={media.type === "image" ? media.alt : `Aperçu vidéo : ${media.title}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.04]" />
                            {media.type === "video" && !isOverflowTile && <span className="absolute inset-0 grid place-items-center text-white"><span className="grid size-11 place-items-center rounded-full bg-black/65 ring-1 ring-white/60"><Play size={19} fill="currentColor" /></span></span>}
                            {isOverflowTile && (
                              <span className="absolute inset-0 grid place-items-center bg-black/55 font-serif text-3xl text-white">+{hiddenCount}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-center p-6 pt-4">
                      <Button type="button" variant="secondary" onClick={() => openActivity(activity)} className="gap-3">
                        <span className="flex items-center gap-2">Voir plus <span className="text-xs opacity-70">({mediaCounts(activity.media)})</span></span>
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </div>

    {viewer && activeMedia && (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 text-white backdrop-blur-sm sm:p-7" role="dialog" aria-modal="true" aria-label={`${viewer.activity.title}, média ${viewer.mediaIndex + 1} sur ${viewer.activity.media.length}`} onClick={() => setViewer(null)}>
        <Button type="button" variant="outline" size="icon" title="Fermer" aria-label="Fermer la visionneuse" onClick={() => setViewer(null)} className="absolute right-4 top-4 z-20 border-white/70 text-white sm:right-7 sm:top-7">
          <X size={20} />
        </Button>
        <div className="relative flex w-full max-w-6xl items-center justify-center gap-2 sm:gap-5" onClick={(event) => event.stopPropagation()}>
          <Button type="button" variant="outline" size="icon" title="Média précédent" aria-label="Média précédent" onClick={() => changeMedia(-1)} className="absolute left-0 top-1/2 z-20 -translate-y-1/2 border-white/70 bg-black/50 text-white sm:static sm:translate-y-0">
            <ChevronLeft size={22} />
          </Button>
          <div className="flex min-h-[45vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-xl sm:min-h-[62vh]">
            {activeMedia.type === "image" ? (
              <img src={activeMedia.src} alt={activeMedia.alt} className="max-h-[68vh] w-full object-contain" />
            ) : /\.(mp4|webm|ogg)(\?.*)?$/i.test(activeMedia.src) ? (
              <video key={activeMedia.id} src={activeMedia.src} poster={activeMedia.poster} controls playsInline className="max-h-[68vh] w-full rounded-xl bg-black" />
            ) : (
              <iframe key={activeMedia.id} src={videoEmbedUrl(activeMedia.src)} title={activeMedia.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="aspect-video w-full max-h-[68vh] rounded-xl bg-black" />
            )}
          </div>
          <Button type="button" variant="outline" size="icon" title="Média suivant" aria-label="Média suivant" onClick={() => changeMedia(1)} className="absolute right-0 top-1/2 z-20 -translate-y-1/2 border-white/70 bg-black/50 text-white sm:static sm:translate-y-0">
            <ChevronRight size={22} />
          </Button>
        </div>
        <div className="mt-4 max-w-4xl px-12 text-center" onClick={(event) => event.stopPropagation()}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{viewer.activity.title} · {viewer.mediaIndex + 1}/{viewer.activity.media.length}</p>
          <h2 className="mt-2 font-serif text-xl sm:text-2xl">{activeMedia.title}</h2>
          <p className="mt-1 text-sm text-white/65">{activeMedia.type === "video" ? "Vidéo" : "Image"} de la galerie</p>
        </div>
      </div>
    )}
  </>;
}
