import { Link } from "@tanstack/react-router";
import { ArrowUp, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logoUrl from "../assets/logo-illasso.jpeg";
import { Button } from "./ui/button";
import { contributionDestination } from "../lib/contribution";
import { contactInfo } from "../lib/site-data";

const links = [
  { to: "/" as const, label: "Accueil" },
  { to: "/a-propos" as const, label: "À propos" },
  { to: "/galerie" as const, label: "Galerie" },
  { to: "/evenements" as const, label: "Événements" },
  { to: "/contact" as const, label: "Contact" },
];

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible((window.scrollY || document.documentElement.scrollTop) > 0.5);
    update();
    // Capture : détecte aussi le défilement d’un conteneur interne, pas seulement celui de la fenêtre.
    window.addEventListener("scroll", update, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", update, { capture: true });
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <Button
      type="button"
      size="icon"
      title="Retour en haut"
      aria-label="Retour en haut de la page"
      onClick={scrollToTop}
      tabIndex={visible ? 0 : -1}
      style={{ transition: "opacity .2s ease, translate .2s ease, background .25s ease, box-shadow .25s ease" }}
      className={`fixed bottom-5 right-5 z-40 shadow-lg sm:bottom-8 sm:right-8 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp size={19} />
    </Button>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-8">
         <nav className="glass edge mx-auto grid max-w-[1440px] grid-cols-[1fr_auto] items-center rounded-2xl px-4 py-3 lg:grid-cols-[1fr_auto_1fr] lg:px-6" aria-label="Navigation principale">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logoUrl} alt="Sceau du Royaume Mère de Sakété" className="size-11 rounded-full object-cover ring-1 ring-gold/50" width={44} height={44} />
            <span className="leading-tight">
              <span className="block font-serif text-sm text-gold">ILLASSO</span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-black">Royaume Mère</span>
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
      <footer className="site-footer tone-ember relative isolate border-t-4 border-gold px-6 py-12 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex items-start gap-4">
            <Link to="/" className="shrink-0" title="Retour à l’accueil"><img src={logoUrl} alt="Emblème royal — retour à l’accueil" loading="lazy" className="size-24 rounded-full object-cover" width={96} height={96} /></Link>
            <div><p className="font-serif text-xl">ILLASSO</p><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">Royaume Mère de la Commune de Sakété, patrimoine vivant et lieu de transmission.</p></div>
          </div>
          <div><p className="eyebrow">Explorer</p><div className="mt-4 grid gap-2 text-sm text-white/85"><Link to="/a-propos">À propos</Link><Link to="/galerie">Galerie</Link><Link to="/evenements">Événements</Link></div></div>
          <div><p className="eyebrow">Correspondance</p><p className="mt-4 text-sm leading-relaxed text-white/85">Palais royal d’Illasso<br />Commune de Sakété, Bénin</p><div className="mt-3 grid gap-1 text-sm text-white/85">{contactInfo.phones.map((phone) => <a key={phone.href} href={phone.href}>{phone.label}</a>)}<a href={contactInfo.email.href}>{contactInfo.email.label}</a></div><Link to="/contact" className="mt-4 inline-block text-sm text-gold">Nous écrire →</Link></div>
        </div>
        <div className="mx-auto mt-10 max-w-[1344px] border-t border-gold/15 pt-5 text-xs text-white/85">© 2026 Royaume Mère d’Illasso — Sakété</div>
      </footer>
      <BackToTop />
    </div>
  );
}

export function PageIntro({ eyebrow, title, image, imageAlt, children, titleClassName, eyebrowClassName, contentClassName }: { eyebrow: string; title: string; image: string; imageAlt: string; children: ReactNode; titleClassName?: string; eyebrowClassName?: string; contentClassName?: string }) {
  return <section className="page-banner on-dark">
    <img src={image} alt={imageAlt} className="page-banner-image" width={1600} height={900} />
    <div className="page-banner-shade" />
    <div className={`relative z-10 mx-auto flex h-full max-w-[1344px] flex-col justify-end px-6 pb-10 pt-32 lg:px-12 lg:pb-14 ${contentClassName ?? ""}`}>
      <p className={`eyebrow ${eyebrowClassName ?? ""}`}>{eyebrow}</p>
      <h1 className={`mt-4 max-w-4xl font-serif leading-tight ${titleClassName ?? "text-4xl sm:text-6xl"}`}>{title}</h1>
      <div className="mt-4 max-w-2xl text-justify text-sm leading-relaxed text-cream/80 sm:text-base">{children}</div>
      <nav aria-label="Fil d’Ariane" className="mt-6 flex items-center gap-2 text-xs text-cream/65">
        <Link to="/" className="transition-colors hover:text-gold">Accueil</Link><span aria-hidden="true">›</span><span aria-current="page" className="text-cream">{eyebrow}</span>
      </nav>
    </div>
  </section>;
}