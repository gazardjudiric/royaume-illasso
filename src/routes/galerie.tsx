import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Film, Image as ImageIcon, Play, X } from "lucide-react";
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

  const openActivity = (activity: GalleryActivity) => setViewer({ activity, mediaIndex: 0 });

  return <>
    <PageIntro eyebrow="Galerie royale" title="La mémoire du royaume en images" image={images.festival} imageAlt="Illustration culturelle du Royaume d’Illasso">
      Parcourez les traditions, les récits et les paysages d’Illasso. Chaque activité présente quelques aperçus visuels ; sélectionnez « Voir plus » pour parcourir son album complet. Les visuels actuels sont illustratifs et pourront être remplacés par les archives officielles du royaume.
    </PageIntro>

    <nav className="tone-gold border-b border-gold/20 px-5 py-5 sm:px-8 lg:px-12" aria-label="Catégories de la galerie">
      <div className="mx-auto flex max-w-[1344px] flex-wrap justify-center gap-3">
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
        <section key={category.id} id={category.id} className={`section-shell section-reveal scroll-mt-28 ${["tone-cream", "tone-ivory", "tone-gold"][categoryIndex % 3]}`}>
          <div className="mx-auto max-w-[1344px]">
            <header className="mb-8 max-w-3xl">
              <p className="eyebrow">Catégorie {String(categoryIndex + 1).padStart(2, "0")}</p>
              <h2 className="section-title mt-3">{category.title}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink/65">{category.description}</p>
            </header>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {category.activities.map((activity) => {
                const videoPreview = activity.media.find((item) => item.type === "video");
                const imagePreviews = activity.media.filter((item) => item.type === "image").slice(0, videoPreview ? 4 : 5);
                const previewMedia = videoPreview
                  ? [...imagePreviews, videoPreview]
                  : activity.media.slice(0, 5);
                const videoCount = activity.media.filter((item) => item.type === "video").length;
                if (previewMedia.length === 0) return null;
                return (
                  <article key={activity.id} className="edge group overflow-hidden rounded-3xl border border-gold/25 bg-[#f6eee4] text-stone-900 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <button type="button" onClick={() => openActivity(activity)} aria-label={`Voir l’album de ${activity.title} : ${mediaCounts(activity.media)}`} className="relative block aspect-[16/10] w-full overflow-hidden text-left">
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-2 gap-1.5 p-1.5">
                        {previewMedia.map((media, index) => {
                          const previewSrc = media.type === "image" ? media.src : media.poster ?? images.festival;
                          const tileLayout = previewMedia.length < 4
                            ? index === 0 ? "col-span-6 row-span-2" : "col-span-3 row-span-1"
                            : index < 3 ? "col-span-2 row-span-1" : "col-span-3 row-span-1";
                          return (
                            <div key={media.id} className={`relative min-h-0 overflow-hidden rounded-xl ${tileLayout}`}>
                              <img src={previewSrc} alt={media.type === "image" ? media.alt : `Aperçu vidéo : ${media.title}`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                              <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                              {media.type === "video" && <span className="absolute inset-0 grid place-items-center text-white"><Play size={20} fill="currentColor" /></span>}
                              {index === previewMedia.length - 1 && activity.media.length > previewMedia.length && (
                                <span className="absolute inset-0 grid place-items-center bg-black/55 font-serif text-2xl text-white">+{activity.media.length - previewMedia.length}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                        <ImageIcon size={15} aria-hidden="true" /> {mediaCounts(activity.media)}
                      </span>
                      {videoCount > 0 && <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/55 text-white"><Film size={15} aria-hidden="true" /></span>}
                    </button>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl leading-tight">{activity.title}</h3>
                      <p className="mt-3 min-h-20 text-sm leading-relaxed text-stone-700">{activity.description}</p>
                      <Button type="button" variant="secondary" onClick={() => openActivity(activity)} className="mt-5 w-full justify-between">
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
