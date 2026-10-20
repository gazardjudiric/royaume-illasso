import { MapPin } from "lucide-react";
import type { CalendarEvent } from "../lib/event-calendar";

export function EventCard({ event, past = false }: { event: CalendarEvent; past?: boolean }) {
  const date = new Date(`${event.dateISO}T12:00:00`);
  return <article className={`event-card edge rounded-lg border border-gold/25 p-6 ${past ? "event-past" : "bg-card"}`}>
    {event.image && <img src={event.image} alt={event.imageAlt ?? `${event.title}, ${event.place}`} loading="lazy" className="mb-6 aspect-[16/10] w-full rounded-lg object-cover" />}
    <div className="flex items-start gap-5">
      <time dateTime={event.dateISO} className="min-w-16 shrink-0 border-r border-gold/30 pr-5 text-center"><span className="block font-serif text-4xl">{date.getDate()}</span><span className="mt-2 block text-xs uppercase">{date.toLocaleDateString("fr-FR", { month: "short" })}</span><span className="mt-1 block text-xs">{date.getFullYear()}</span></time>
      <div className="min-w-0"><div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full border border-gold/35 px-3 py-1">{event.category}</span>{past && <span className="px-2 py-1">Terminé</span>}</div><h3 className="mt-4 font-serif text-xl">{event.title}</h3><p className="mt-3 flex items-start gap-2 text-xs"><MapPin size={14} className="shrink-0" />{event.place}</p><p className="mt-4 text-sm leading-relaxed">{event.description}</p></div>
    </div>
  </article>;
}