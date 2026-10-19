import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "../components/event-card";
import { PageIntro } from "../components/site-chrome";
import { images, pastEvents, upcomingEvents } from "../lib/site-data";

export const Route = createFileRoute("/evenements")({
  head: () => ({ meta: [{ title: "Événements — Royaume d’Illasso" }, { name: "description", content: "Calendrier des cérémonies, fêtes, visites et rencontres du Royaume d’Illasso." }, { property: "og:title", content: "Événements du Royaume d’Illasso" }, { property: "og:description", content: "Consultez l’agenda culturel et cérémoniel du royaume." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/evenements" }] }), component: Events,
});

function Events() {
  const upcoming = upcomingEvents();
  const past = pastEvents();
  return <>
    <PageIntro eyebrow="Événements" title="Les rendez-vous du royaume." image={images.festival} imageAlt="Rassemblement lors d’une fête traditionnelle à Illasso">Cérémonies officielles, fêtes culturelles, visites et rencontres. Les dates affichées sont proposées à titre éditorial et doivent être validées.</PageIntro>
    <section id="a-venir" className="section-shell tone-cream section-reveal scroll-mt-24"><div className="mx-auto max-w-[1344px]">
      <p className="eyebrow">Agenda</p><h2 className="section-title">À venir</h2>
      {upcoming.length ? <div className="mt-8 grid gap-6 md:grid-cols-2">{upcoming.map((e) => <EventCard key={e.title} event={e} />)}</div>
        : <p className="mt-8 font-serif text-xl text-ink/70">Les prochaines dates seront annoncées bientôt.</p>}
    </div></section>
    <section id="passes" className="section-shell tone-ivory section-reveal scroll-mt-24"><div className="mx-auto max-w-[1344px]">
      <p className="eyebrow">Archives</p><h2 className="section-title">Passés</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">{past.map((e) => <EventCard key={e.title} event={e} past />)}</div>
    </div></section>
  </>;
}
