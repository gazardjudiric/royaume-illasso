import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import mapAsset from "../assets/carte-palais-illasso-web.png.asset.json";
import { Button } from "./ui/button";

const mapAlt = "Carte officielle du Palais Royal d’Illasso dans l’arrondissement de Yoko, commune de Sakété";

export function RoyalMapImage({ interactive = false }: { interactive?: boolean }) {
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

  const image = <img src={mapAsset.url} alt={mapAlt} className="block h-auto w-full object-contain" width={440} height={680} />;

  if (!interactive) return image;

  return <>
    <Button type="button" variant="media" className="group relative h-auto w-full p-0" onClick={() => setOpen(true)} aria-label="Agrandir la carte officielle du Palais Royal d’Illasso">
      {image}
      <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm transition" aria-hidden="true"><Maximize2 size={19} /></span>
    </Button>
    {open && createPortal(<div className="map-lightbox" role="dialog" aria-modal="true" aria-label="Carte officielle agrandie">
      <TransformWrapper initialScale={1} minScale={0.8} maxScale={6} centerOnInit wheel={{ step: 0.12 }} doubleClick={{ mode: "zoomIn", step: 0.8 }}>
        {({ zoomIn, zoomOut, resetTransform }) => <>
          <div className="map-lightbox-controls" aria-label="Commandes de la carte">
            <Button type="button" variant="outline" size="icon" onClick={() => zoomIn()} title="Zoom avant" aria-label="Zoom avant"><Plus size={19} /></Button>
            <Button type="button" variant="outline" size="icon" onClick={() => zoomOut()} title="Zoom arrière" aria-label="Zoom arrière"><Minus size={19} /></Button>
            <Button type="button" variant="outline" size="icon" onClick={() => resetTransform()} title="Réinitialiser le zoom" aria-label="Réinitialiser le zoom"><RotateCcw size={18} /></Button>
          </div>
          <Button type="button" variant="outline" size="icon" className="absolute right-4 top-4 z-20" onClick={() => setOpen(false)} title="Fermer la carte" aria-label="Fermer la carte"><X size={20} /></Button>
          <TransformComponent wrapperClass="map-zoom-wrapper" contentClass="map-zoom-content">
            <img src={mapAsset.url} alt={mapAlt} className="block h-auto max-h-[92vh] w-auto max-w-none object-contain" width={440} height={680} draggable={false} />
          </TransformComponent>
        </>}
      </TransformWrapper>
    </div>, document.body)}
  </>;
}