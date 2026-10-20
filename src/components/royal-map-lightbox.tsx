import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import pdfAsset from "../assets/carte-palais-illasso.pdf.asset.json";
import { Download, Minus, Plus, RotateCcw, X } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import mapAsset from "../assets/carte-palais-illasso-web.png.asset.json";
import { Button } from "./ui/button";

const mapAlt = "Carte officielle du Palais Royal d’Illasso dans l’arrondissement de Yoko, commune de Sakété";

export function RoyalMapImage({ interactive = false, download = false }: { interactive?: boolean; download?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const image = <img src={mapAsset.url} alt={mapAlt} className="block h-auto w-full object-contain" width={440} height={680} loading="lazy" />;

  if (!interactive) return image;

  return <>
    <Button type="button" variant="ghost" className="group relative h-auto w-full p-0" onClick={() => setOpen(true)} aria-label="Agrandir la carte officielle du Palais Royal d’Illasso">
      {image}
    </Button>
    {download && <div className="mt-4"><p className="text-sm leading-relaxed">Carte officielle du Palais Royal d’Illasso — arrondissement de Yoko, commune de Sakété</p><Button asChild variant="outline" className="mt-3 h-auto min-h-11 whitespace-normal"><a href={pdfAsset.url} download="carte-palais-illasso.pdf" target="_blank" rel="noopener noreferrer"><Download />Télécharger la carte (PDF)</a></Button></div>}
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="map-dialog"><DialogTitle className="sr-only">Carte officielle agrandie</DialogTitle><DialogDescription className="sr-only">Carte du Palais Royal d’Illasso, avec zoom et déplacement.</DialogDescription>
      <TransformWrapper initialScale={1} minScale={0.8} maxScale={6} centerOnInit wheel={{ step: 0.12 }} doubleClick={{ mode: "zoomIn", step: 0.8 }}>
        {({ zoomIn, zoomOut, resetTransform }) => <>
          <div className="map-lightbox-controls" aria-label="Commandes de la carte">
            <Button type="button" variant="outline" size="icon" onClick={() => zoomIn()} aria-label="Zoom avant"><Plus size={19} /></Button>
            <Button type="button" variant="outline" size="icon" onClick={() => zoomOut()} aria-label="Zoom arrière"><Minus size={19} /></Button>
            <Button type="button" variant="outline" size="icon" onClick={() => resetTransform()} aria-label="Réinitialiser le zoom"><RotateCcw size={18} /></Button>
          </div>
          <Button type="button" variant="outline" size="icon" className="absolute right-4 top-4 z-20" onClick={() => setOpen(false)} aria-label="Fermer la carte"><X size={20} /></Button>
          <TransformComponent wrapperClass="map-zoom-wrapper" contentClass="map-zoom-content">
            <img src={mapAsset.url} alt={mapAlt} className="block h-auto max-h-[92vh] w-auto max-w-none object-contain" width={440} height={680} draggable={false} />
          </TransformComponent>
        </>}
      </TransformWrapper>
    </DialogContent></Dialog>
  </>;
}