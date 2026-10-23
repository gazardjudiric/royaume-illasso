import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import mapAsset from "../assets/carte-palais-illasso-web.png.asset.json";
import { Button } from "./ui/button";

const mapAlt = "Carte officielle du Palais Royal d’Illasso dans l’arrondissement de Yoko, commune de Sakété";
const mapCaption = "Carte officielle du Palais Royal d’Illasso — arrondissement de Yoko, commune de Sakété";

function buildMapPdf(jpeg: Uint8Array, width: number, height: number) {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [0];
  let byteLength = 0;

  const append = (chunk: Uint8Array) => {
    chunks.push(chunk);
    byteLength += chunk.byteLength;
  };
  const appendText = (text: string) => append(encoder.encode(text));
  const writeObject = (id: number, parts: Array<string | Uint8Array>) => {
    offsets[id] = byteLength;
    appendText(`${id} 0 obj\n`);
    for (const part of parts) {
      if (typeof part === "string") appendText(part);
      else append(part);
    }
    appendText("\nendobj\n");
  };

  const pageContent = encoder.encode(`q\n${width} 0 0 ${height} 0 0 cm\n/Im0 Do\nQ`);
  appendText("%PDF-1.4\n");
  writeObject(1, ["<< /Type /Catalog /Pages 2 0 R >>"]);
  writeObject(2, ["<< /Type /Pages /Kids [3 0 R] /Count 1 >>"]);
  writeObject(3, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>`]);
  writeObject(4, [`<< /Length ${pageContent.byteLength} >>\nstream\n`, pageContent, "\nendstream"]);
  writeObject(5, [
    `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.byteLength} >>\nstream\n`,
    jpeg,
    "\nendstream",
  ]);

  const xrefOffset = byteLength;
  appendText(`xref\n0 6\n0000000000 65535 f \n`);
  for (let id = 1; id <= 5; id += 1) {
    appendText(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  }
  appendText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks as unknown as BlobPart[], { type: "application/pdf" });
}

export function RoyalMapImage({ interactive = false }: { interactive?: boolean }) {
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

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

  const downloadMap = async () => {
    setIsDownloading(true);
    setDownloadError("");
    try {
      const response = await fetch(mapAsset.url);
      if (!response.ok) throw new Error("La carte n’a pas pu être chargée.");
      const imageBitmap = await createImageBitmap(await response.blob());
      const canvas = document.createElement("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("La conversion de la carte a échoué.");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(imageBitmap, 0, 0);
      imageBitmap.close();

      const jpegBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("La conversion de la carte a échoué.")), "image/jpeg", 0.96);
      });
      const pdf = buildMapPdf(new Uint8Array(await jpegBlob.arrayBuffer()), canvas.width, canvas.height);
      const url = URL.createObjectURL(pdf);
      const link = document.createElement("a");
      link.href = url;
      link.download = "carte-officielle-palais-royal-illasso.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setDownloadError("Le téléchargement n’a pas abouti. Veuillez réessayer.");
    } finally {
      setIsDownloading(false);
    }
  };

  const image = <img src={mapAsset.url} alt={mapAlt} className="block h-auto w-full object-contain" width={440} height={680} />;
  const preview = interactive ? (
    <Button type="button" variant="media" className="group relative h-auto w-full p-0" onClick={() => setOpen(true)} aria-label="Agrandir la carte officielle du Palais Royal d’Illasso">
      {image}
      <span className="royal-control royal-control-primary absolute bottom-4 right-4 grid size-11 place-items-center" aria-hidden="true"><Maximize2 size={19} /></span>
    </Button>
  ) : image;

  return <>
    {preview}
    <figcaption className="border-t border-gold/20 bg-card px-5 py-4 text-center text-sm leading-relaxed text-ink/70">{mapCaption}</figcaption>
    <div className="flex flex-col items-center gap-2 border-t border-gold/15 bg-card px-5 py-4">
      <Button type="button" onClick={downloadMap} disabled={isDownloading} className="gap-2">
        <Download size={16} aria-hidden="true" />
        {isDownloading ? "Préparation du téléchargement…" : "Télécharger la carte (PDF)"}
      </Button>
      {downloadError && <p className="text-sm text-destructive" role="status">{downloadError}</p>}
    </div>
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
