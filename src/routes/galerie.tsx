import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useState } from "react";
import { PageIntro } from "../components/site-chrome";
import { gallery } from "../lib/site-data";

export const Route = createFileRoute("/galerie")({
  head: () => ({ meta: [{ title: "Galerie — Royaume d’Illasso" }, { name: "description", content: "Images, cérémonies, culture et territoire du Royaume Mère d’Illasso." }, { property: "og:title", content: "Galerie du Royaume d’Illasso" }, { property: "og:description", content: "Un regard photographique sur le patrimoine vivant d’Illasso." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/galerie" }] }), component: Gallery,
});

function Gallery() {
  const categories = ["Tous", "Roi", "Culture", "Territoire", "Cérémonies"];
  const [category, setCategory] = useState("Tous");
  const [selected, setSelected] = useState<(typeof gallery)[number] | null>(null);
  const visible = category === "Tous" ? gallery : gallery.filter((item) => item.category === category);
  return <><PageIntro eyebrow="Galerie" title="Images d’une souveraineté vivante.">Des regards documentaires sur les lieux, les gestes et les rassemblements d’Illasso. Les images présentées sont des illustrations éditoriales à remplacer par les archives officielles.</PageIntro>
    <section className="section-shell pt-0"><div className="mx-auto max-w-[1344px]"><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={item === category ? "filter-button filter-active" : "filter-button"}>{item}</button>)}</div><div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">{visible.map((item, index) => <button type="button" key={item.title} className="gallery-item mb-5 w-full text-left" onClick={() => setSelected(item)}><img src={item.image} alt={item.title} loading="lazy" className={index % 3 === 1 ? "aspect-square w-full object-cover" : "aspect-[4/5] w-full object-cover"} /><span className="block p-5"><span className="block font-serif text-xl">{item.title}</span><span className="mt-1 block text-xs text-cream/50">{item.meta}</span></span></button>)}</div></div></section>
    {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}><button type="button" className="icon-button absolute right-5 top-5" aria-label="Fermer" onClick={() => setSelected(null)}><X size={20}/></button><div className="max-w-5xl" onClick={(event) => event.stopPropagation()}><img src={selected.image} alt={selected.title} className="max-h-[75vh] w-full object-contain"/><h2 className="mt-5 font-serif text-2xl">{selected.title}</h2><p className="mt-2 text-sm text-cream/55">{selected.meta}</p></div></div>}
  </>;
}