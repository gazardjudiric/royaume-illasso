import type { CalendarEvent } from "./event-calendar";
import festival from "../assets/illasso-festival.jpg";
import craft from "../assets/illasso-craft.jpg";
import territory from "../assets/illasso-territory.jpg";
import king from "../assets/illasso-king-portrait.jpg";
import palace from "../assets/illasso-palace-hero.jpg";

export const images = { festival, craft, territory, king, palace };

export const events: CalendarEvent[] = [
  { title: "Fête du Trône", dateISO: "2026-08-14", place: "Palais royal d’Illasso", category: "Cérémonie", description: "Célébration annuelle réunissant la cour, les dignitaires et les familles du royaume." },
  { title: "Rencontre des artisans", dateISO: "2026-09-26", place: "Place du marché royal", category: "Culture", description: "Une journée consacrée aux savoir-faire, aux textiles, à la sculpture et à leur transmission." },
  { title: "Journée du territoire", dateISO: "2026-10-18", place: "Illasso et villages voisins", category: "Communauté", description: "Visite des communautés et échanges avec les sages autour des terres du royaume." },
  { title: "Audience de la jeunesse", dateISO: "2026-07-12", place: "Cour du palais", category: "Communauté", description: "Dialogue autour de l’éducation, de la culture et de la préservation du patrimoine." },
];

// Sections verticales de la page d'accueil.
// Textes et images sont librement remplaçables : changez `image` par un autre
// import d'illustration et `paragraphs` par le contenu officiel du palais.
export const homeSections = [
  {
    id: "histoire",
    eyebrow: "Chapitre 01",
    title: "Histoire & origines",
    image: palace,
    imageAlt: "Palais royal d’Illasso",
    paragraphs: [
      "Le Royaume Mère d’Illasso puise ses racines dans les premières familles fondatrices installées sur les terres de l’actuelle commune de Sakété.",
      "De génération en génération, la parole des anciens a fixé les alliances, les limites du territoire et les règles de la succession au trône.",
    ],
    points: ["Fondation par les familles d’origine", "Transmission orale de la mémoire", "Continuité du trône jusqu’à aujourd’hui"],
  },
  {
    id: "culture",
    eyebrow: "Chapitre 02",
    title: "Culture & traditions",
    image: craft,
    imageAlt: "Atelier d’artisanat royal",
    paragraphs: [
      "Rites, chants, tambours, textiles et sculptures composent une culture vivante, pratiquée au quotidien et non conservée sous vitrine.",
      "Chaque cérémonie réunit les lignées et rappelle le rôle de chacun dans l’équilibre du royaume.",
    ],
    points: ["Tambours et chants de cour", "Artisanat textile et sculpture", "Rites de passage et cérémonies"],
  },
  {
    id: "roi",
    eyebrow: "Chapitre 03",
    title: "Le Roi",
    image: king,
    imageAlt: "Portrait du Roi d’Illasso",
    paragraphs: [
      "Le souverain est le gardien de la parole donnée : il arbitre, protège et représente le royaume auprès des autorités et des communautés voisines.",
      "Sa fonction est d’abord un service — celui de transmettre intact ce qu’il a reçu.",
    ],
    points: ["Gardien de la parole et des coutumes", "Arbitrage et conciliation", "Représentation du royaume"],
  },
  {
    id: "activites",
    eyebrow: "Chapitre 04",
    title: "Activités & actions",
    image: festival,
    imageAlt: "Fête culturelle du royaume",
    paragraphs: [
      "Audiences, visites de villages, actions en faveur de la jeunesse et de l’éducation : la vie du royaume se déploie tout au long de l’année.",
      "Les grandes fêtes rassemblent la cour, les dignitaires et les familles autour d’un même héritage.",
    ],
    points: ["Audiences et conseils", "Actions sociales et éducatives", "Fêtes et cérémonies annuelles"],
  },
  {
    id: "territoire",
    eyebrow: "Chapitre 05",
    title: "Territoire",
    image: territory,
    imageAlt: "Terres et villages d’Illasso",
    paragraphs: [
      "Les terres d’Illasso s’étendent autour du palais : places de rassemblement, quartiers, champs et villages voisins.",
      "Chaque lieu porte un nom, une histoire et une fonction dans l’organisation du royaume.",
    ],
    points: ["Palais royal et sa cour", "Places de rassemblement", "Terres agricoles et villages"],
  },
];

export const gallery = [
  { image: palace, title: "La cour royale", category: "Roi", meta: "Illustration du palais · lieu et date de prise de vue non renseignés" },
  { image: king, title: "Portrait de souverain", category: "Roi", meta: "Portrait illustratif · lieu et date non renseignés" },
  { image: festival, title: "Tambours du royaume", category: "Cérémonies", meta: "Scène de cérémonie illustrative · lieu et date non renseignés" },
  { image: craft, title: "La main et la mémoire", category: "Culture", meta: "Scène d’artisanat illustrative · lieu et date non renseignés" },
  { image: territory, title: "Terres d’Illasso", category: "Territoire", meta: "Paysage illustratif · lieu et date non renseignés" },
];

// Albums événementiels de la galerie. Les descriptions racontent le contexte
// de prise de vue et peuvent être remplacées avec les archives officielles.
export const galleryEvents = [
  {
    id: "fete-du-trone",
    title: "Fête du Trône",
    date: "14 août 2026",
    place: "Palais royal d’Illasso",
    description: "Sélection illustrative autour de ce rendez-vous du royaume. Les photographies officielles et leurs circonstances de prise de vue restent à renseigner.",
    photos: [gallery[2], gallery[0], gallery[1], gallery[4]],
  },
  {
    id: "rencontre-des-artisans",
    title: "Rencontre des artisans",
    date: "26 septembre 2026",
    place: "Place du marché royal",
    description: "Sélection illustrative autour de ce rendez-vous du royaume. Les photographies officielles et leurs circonstances de prise de vue restent à renseigner.",
    photos: [gallery[3], gallery[1], gallery[2]],
  },
  {
    id: "journee-du-territoire",
    title: "Journée du territoire",
    date: "18 octobre 2026",
    place: "Illasso et villages voisins",
    description: "Sélection illustrative autour de ce rendez-vous du royaume. Les photographies officielles et leurs circonstances de prise de vue restent à renseigner.",
    photos: [gallery[4], gallery[0], gallery[3]],
  },
];