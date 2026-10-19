import { eventDay, eventMonth, type RoyalEvent } from "../lib/site-data";

export function EventCard({ event, past = false }: { event: RoyalEvent; past?: boolean }) {
  return (
    <article className={`edge overflow-hidden rounded-2xl ${past ? "tone-ivory opacity-70" : "glass"}`}>
      {event.image && <img src={event.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
      <div className="flex gap-5 p-6">
        <div className="shrink-0 border-r border-gold/30 pr-5 text-center">
          <p className="font-serif text-4xl leading-none text-gold">{eventDay(event.date)}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-ink/55">{eventMonth(event.date)}</p>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-gold/35 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-gold">{event.category}</span>
            {past && <span className="rounded-full bg-ink/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-ink/60">Terminé</span>}
          </div>
          <h3 className="mt-3 font-serif text-xl">{event.title}</h3>
          <p className="mt-1 text-xs text-ink/50">{event.place}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/60">{event.description}</p>
        </div>
      </div>
    </article>
  );
}
