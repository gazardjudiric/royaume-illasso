import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import logoAsset from "../assets/logo-illasso.jpeg.asset.json";
import { Button } from "./ui/button";
import { contributionDestination } from "../lib/contribution";

const links = [
  { to: "/" as const, label: "Accueil" },
  { to: "/a-propos" as const, label: "À propos" },
  { to: "/galerie" as const, label: "Galerie" },
  { to: "/evenements" as const, label: "Événements" },
  { to: "/contact" as const, label: "Contact" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-8">
         <nav className="glass edge mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center rounded-2xl px-4 py-3 lg:grid-cols-[1fr_auto_1fr] lg:px-6" aria-label="Navigation principale">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logoAsset.url} alt="Sceau du Royaume Mère de Sakété" className="size-11 rounded-full object-cover ring-1 ring-gold/50" width={44} height={44} />
            <span className="leading-tight">
              <span className="block font-serif text-sm text-ink">Royaume Mère</span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-gold">Sakété · Illasso</span>
            </span>
          </Link>
           <div className="hidden items-center justify-center gap-7 lg:flex">
             {links.map((link) => (
              <Link key={link.to} to={link.to} activeOptions={{ exact: link.to === "/" }} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>{link.label}</Link>
            ))}
          </div>
           <div className="flex justify-end"><Button asChild className="hidden lg:inline-flex"><Link {...contributionDestination}>Faites un don</Link></Button>
           <Button type="button" size="icon" variant="secondary" className="lg:hidden" title={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={19} /> : <Menu size={19} />}
           </Button></div>
        </nav>
        {open && (
           <div id="mobile-navigation" className="glass mx-auto mt-2 max-w-[1440px] rounded-2xl p-3 lg:hidden">
            {links.map((link) => <Link key={link.to} to={link.to} className="block rounded-lg px-4 py-3 text-sm text-ink/75" activeProps={{ className: "block rounded-lg bg-gold/10 px-4 py-3 text-sm text-gold" }} onClick={() => setOpen(false)}>{link.label}</Link>)}
             <Button asChild className="mt-3 w-full"><Link {...contributionDestination} onClick={() => setOpen(false)}>Faites un don</Link></Button>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="tone-ink border-t border-gold/20 px-6 py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex items-start gap-4">
            <img src={logoAsset.url} alt="Emblème royal" loading="lazy" className="size-16 rounded-full object-cover" width={64} height={64} />
            <div><p className="font-serif text-xl">Illasso</p><p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/55">Royaume Mère de la Commune de Sakété, patrimoine vivant et lieu de transmission.</p></div>
          </div>
          <div><p className="eyebrow">Explorer</p><div className="mt-4 grid gap-2 text-sm text-ink/60"><Link to="/a-propos">À propos</Link><Link to="/galerie">Galerie</Link><Link to="/evenements">Événements</Link></div></div>
          <div><p className="eyebrow">Correspondance</p><p className="mt-4 text-sm leading-relaxed text-ink/60">Palais royal d’Illasso<br />Commune de Sakété, Bénin</p><Link to="/contact" className="mt-4 inline-block text-sm text-gold">Nous écrire →</Link></div>
        </div>
        <div className="mx-auto mt-10 max-w-[1344px] border-t border-gold/15 pt-5 text-xs text-ink/40">© 2026 Royaume Mère d’Illasso — Sakété</div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, image, imageAlt, children }: { eyebrow: string; title: string; image: string; imageAlt: string; children: ReactNode }) {
  return <section className="page-banner on-dark">
    <img src={image} alt={imageAlt} className="page-banner-image" width={1600} height={900} />
    <div className="page-banner-shade" />
    <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[1344px] flex-col justify-end px-6 pb-10 pt-32 lg:px-12 lg:pb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">{title}</h1>
      <div className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/80 sm:text-base">{children}</div>
      <nav aria-label="Fil d’Ariane" className="mt-6 flex items-center gap-2 text-xs text-cream/65">
        <Link to="/" className="transition-colors hover:text-gold">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page" className="text-cream">{eyebrow}</span>
      </nav>
    </div>
  </section>;
}