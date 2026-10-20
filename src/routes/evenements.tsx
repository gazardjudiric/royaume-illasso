import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/site-chrome";
import { EventCard } from "../components/event-card";
import { useCalendarDay } from "../hooks/use-calendar-day";
import { partitionEvents } from "../lib/event-calendar";
import { events, images } from "../lib/site-data";

export const Route = createFileRoute("/evenements")({
  head: () => ({ meta: [{ title: "Événements — Royaume d’Illasso" }, { name: "description", content: "Agenda des cérémonies, rencontres culturelles et événements communautaires d’Illasso, à venir et passés." }, { property: "og:title", content: "Événements du Royaume d’Illasso" }, { property: "og:description", content: "Les prochains rendez-vous du royaume et les événements terminés." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Events,
});
function Events() {
  const day = useCalendarDay();
  const calendar = day ? partitionEvents(events, day) : null;
  return <><PageIntro eyebrow="Événements" title="Les rendez-vous du royaume." image={images.festival} imageAlt="Illustration d’un rassemblement traditionnel avec tambours et participants dans une cour royale">Cérémonies, culture et vie des communautés. Les dates de cet agenda éditorial restent à valider par le palais.</PageIntro>
    <section className="section-shell tone-cream"><div className="mx-auto max-w-[1344px]"><h2 className="section-title">À venir</h2>{!calendar ? <p className="mt-8" role="status">Consultation de l’agenda…</p> : calendar.upcoming.length ? <div className="mt-8 grid gap-6 md:grid-cols-2">{calendar.upcoming.map(event => <EventCard key={event.title} event={event} />)}</div> : <div className="mt-8 border-y border-gold/25 py-10"><p className="font-serif text-xl">Les prochaines dates seront annoncées bientôt.</p><a href="#passes" className="mt-5 inline-flex min-h-11 items-center underline underline-offset-4">Voir les événements passés</a></div>}</div></section>
    <section id="passes" className="section-shell tone-ivory scroll-mt-28"><div className="mx-auto max-w-[1344px]"><h2 className="section-title">Passés</h2><div className="mt-8 grid gap-6 md:grid-cols-2">{calendar?.past.map(event => <EventCard key={event.title} event={event} past />)}</div></div></section>
  </>;
}
