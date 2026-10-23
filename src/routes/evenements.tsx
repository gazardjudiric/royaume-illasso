import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { PageIntro } from "../components/site-chrome";
import { events, images } from "../lib/site-data";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements — Royaume d’Illasso" },
      { name: "description", content: "Calendrier des cérémonies, fêtes, visites et rencontres du Royaume d’Illasso." },
      { property: "og:title", content: "Événements du Royaume d’Illasso" },
      { property: "og:description", content: "Consultez l’agenda culturel et cérémoniel du royaume." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/evenements" }],
  }),
  component: Events,
});

const monthAbbreviations: Record<string, string> = {
  janvier: "JANV.",
  février: "FÉVR.",
  mars: "MARS",
  avril: "AVR.",
  mai: "MAI",
  juin: "JUIN",
  juillet: "JUIL.",
  août: "AOÛT",
  septembre: "SEPT.",
  octobre: "OCT.",
  novembre: "NOV.",
  décembre: "DÉC.",
};

function eventDateParts(date: string) {
  const match = date.match(/^(\\d{1,2})\\s+(.+?)\\s+(\\d{4})$/);
  if (!match) return { day: date, month: "", year: "" };
  const [, day, month, year] = match;
  return { day, month: monthAbbreviations[month.toLocaleLowerCase("fr-FR")] ?? month.toLocaleUpperCase("fr-FR"), year };
}

function Events() {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", "À venir", "Passé"];
  const visible = filter === "Tous" ? events : events.filter((event) => event.status === filter);

  return (
    <>
      <PageIntro
        eyebrow="Événements"
        title="Les rendez-vous du royaume."
        image={images.festival}
        imageAlt="Rassemblement lors d’une fête traditionnelle à Illasso"
      >
        Cérémonies officielles, fêtes culturelles, visites et rencontres. Les dates affichées sont proposées à titre éditorial et doivent être validées.
      </PageIntro>

      <section className="section-shell tone-cream section-reveal">
        <div className="mx-auto max-w-[1344px]">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <Button
                key={item}
                type="button"
                variant={item === filter ? "default" : "secondary"}
                aria-pressed={item === filter}
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {visible.map((event) => (
              <article
                key={event.title}
                className={`edge grid overflow-hidden rounded-2xl sm:grid-cols-[140px_1fr] ${event.status === "À venir" ? "bg-card text-card-foreground" : "tone-ink"}`}
              >
                <div className="relative flex min-h-36 flex-col items-center justify-center bg-gold/10 px-5 py-5 text-center sm:min-h-full sm:px-4 sm:py-6">
                  {(() => {
                    const date = eventDateParts(event.date);
                    return (
                      <>
                        <span className="font-serif text-5xl leading-none text-gold">{date.day}</span>
                        {date.month && <span className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-ink/70">{date.month}</span>}
                        {date.year && <span className="mt-1 text-sm text-ink/60">{date.year}</span>}
                      </>
                    );
                  })()}
                  <span aria-hidden="true" className="absolute bottom-5 right-0 top-5 w-px bg-gold/30 sm:bottom-7 sm:top-7" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-end">
                    <span className="rounded-full border border-gold/30 px-3 py-1 text-[10px] uppercase text-gold">
                      {event.status}
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl">{event.title}</h2>
                  <div className="mt-3 flex items-start gap-2 text-xs text-ink/55">
                    <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-gold" />
                    <div>
                      <p>{event.place}</p>
                      <p className="mt-1 text-ink/45">{event.type}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink/60">{event.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
