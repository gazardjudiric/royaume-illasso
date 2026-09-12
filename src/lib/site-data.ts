import festival from "../assets/illasso-festival.jpg";
import craft from "../assets/illasso-craft.jpg";
import territory from "../assets/illasso-territory.jpg";
import king from "../assets/illasso-king-portrait.jpg";
import palace from "../assets/illasso-palace-hero.jpg";

export const images = { festival, craft, territory, king, palace };

export const events = [
  { title: "Fête du Trône", date: "14 août 2026", place: "Palais royal d’Illasso", type: "Cérémonie officielle", status: "À venir", image: festival, description: "Célébration annuelle réunissant la cour, les dignitaires et les familles du royaume." },
  { title: "Rencontre des artisans", date: "26 septembre 2026", place: "Place du marché royal", type: "Culture", status: "À venir", image: craft, description: "Une journée consacrée aux savoir-faire, aux textiles, à la sculpture et à leur transmission." },
  { title: "Journée du territoire", date: "18 octobre 2026", place: "Illasso et villages voisins", type: "Visite", status: "À venir", image: territory, description: "Visite des communautés, échanges avec les sages et découverte des terres du royaume." },
  { title: "Audience de la jeunesse", date: "12 juillet 2026", place: "Cour du palais", type: "Action sociale", status: "Passé", image: palace, description: "Dialogue autour de l’éducation, de la culture et de la préservation du patrimoine." },
];

export const gallery = [
  { image: palace, title: "La cour royale", category: "Roi", meta: "Palais royal · cérémonie symbolique" },
  { image: king, title: "Portrait de souverain", category: "Roi", meta: "Illasso · portrait éditorial" },
  { image: festival, title: "Tambours du royaume", category: "Cérémonies", meta: "Sakété · fête culturelle" },
  { image: craft, title: "La main et la mémoire", category: "Culture", meta: "Atelier royal · artisanat" },
  { image: territory, title: "Terres d’Illasso", category: "Territoire", meta: "Commune de Sakété · vue aérienne" },
];