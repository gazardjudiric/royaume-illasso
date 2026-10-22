import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { PageIntro } from "../components/site-chrome";
import { images } from "../lib/site-data";
import { Button } from "../components/ui/button";
import { contributionMessage, contributionSubject } from "../lib/contribution";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Royaume d’Illasso" }, { name: "description", content: "Écrivez au secrétariat du Royaume Mère d’Illasso à Sakété." }, { property: "og:title", content: "Contacter le Royaume d’Illasso" }, { property: "og:description", content: "Coordonnées et formulaire de correspondance du palais royal." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/contact" }] }), component: Contact,
});
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(255),subject:z.string().trim().min(2).max(120),message:z.string().trim().min(10).max(1500)});
const contactItems: Array<[LucideIcon, string, string]> = [[MapPin,"Adresse","Palais royal d’Illasso, Commune de Sakété"],[Phone,"Téléphone","À confirmer"],[Mail,"Courriel","À confirmer"]];
function Contact() {
  const [notice, setNotice] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  function prepareContribution() {
    setSubject(contributionSubject);
    setMessage(contributionMessage);
    setNotice("");
    nameRef.current?.focus();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    setNotice(result.success ? "Votre demande est préparée, mais n’a pas été envoyée. L’envoi sera disponible après confirmation du contact officiel du palais." : "Veuillez vérifier tous les champs du formulaire.");
  }
  return <>
    <PageIntro eyebrow="Contact" title="Écrire au palais royal." image={images.palace} imageAlt="Vue du palais royal d’Illasso">Pour une demande officielle, une visite, une invitation ou une collaboration culturelle.</PageIntro>
    <section id="don" className="section-shell tone-ivory scroll-mt-28">
      <div className="mx-auto max-w-[1100px]">
        <p className="eyebrow">Faites un don</p>
        <h2 className="section-title">Contribuer au Royaume d’Illasso</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-ink/70">Pour contribuer, demandez au palais les coordonnées officielles et les modalités de contribution. Aucun numéro Mobile Money, compte bancaire ou lien de paiement officiel n’est actuellement communiqué sur ce site.</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/70">Vous pouvez préparer votre demande ci-dessous. L’envoi en ligne n’est pas encore disponible : votre demande ne sera pas transmise tant que le contact officiel du palais n’aura pas été confirmé. Aucun paiement n’est demandé ici.</p>
        <Button type="button" className="mt-6" onClick={prepareContribution}>Préparer ma demande</Button>
      </div>
    </section>
    <section className="section-shell tone-gold section-reveal">
      <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="tone-ink edge rounded-3xl p-8"><p className="eyebrow">Coordonnées</p><div className="mt-8 space-y-7 text-sm">{contactItems.map(([Icon,label,value])=><div key={label} className="flex gap-4"><span className="text-gold"><Icon size={20}/></span><div><p className="text-ink/45">{label}</p><p className="mt-1">{value}</p></div></div>)}</div><div className="mt-10 h-52 rounded-2xl border border-gold/20 bg-cream/10 p-5"><p className="font-serif text-xl">Sakété, Bénin</p><p className="mt-2 text-sm text-ink/50">La localisation précise du palais sera ajoutée après confirmation.</p></div></aside>
        <form className="tone-cream edge rounded-3xl p-8" onSubmit={submit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2"><label className="field-label">Nom<input ref={nameRef} name="name" className="field" maxLength={100} required/></label><label className="field-label">Email<input name="email" type="email" className="field" maxLength={255} required/></label></div>
          <label className="field-label mt-5">Sujet<input name="subject" className="field" value={subject} onChange={(event)=>setSubject(event.target.value)} maxLength={120} required/></label>
          <label className="field-label mt-5">Message<textarea name="message" className="field min-h-40 resize-y" value={message} onChange={(event)=>setMessage(event.target.value)} maxLength={1500} required/></label>
          <Button type="submit" className="mt-6">Préparer le message</Button>
          <p className="mt-3 text-sm text-ink/70">Envoi indisponible en attendant les coordonnées officielles du palais.</p>
          {notice&&<p className="mt-4 text-sm text-ink" role="status">{notice}</p>}
        </form>
      </div>
    </section>
  </>;
}