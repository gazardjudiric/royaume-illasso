import festival from "../assets/illasso-festival.jpg";
import craft from "../assets/illasso-craft.jpg";
import territory from "../assets/illasso-territory.jpg";
import king from "../assets/illasso-king-portrait.jpg";
import palace from "../assets/illasso-palace-hero.jpg";

export const images = { festival, craft, territory, king, palace };

export const aboutChapterSummaries = {
  history: "Les fondateurs de Sakété se seraient d’abord établis à Illassô. Le Royaume Mère d’Illasso constitue ainsi l’origine historique de la dynastie d’Oba Otchoukpa, avant le départ de Takété et la découverte d’Odo Yansa.",
  culture: "L’identité Nago-Yoruba se transmet par les danses Egungun, Guèlèdè, Akpala, Batta et Bolodjo, les cultes endogènes et l’artisanat. Elle se partage avec les communautés Fon, Goun et d’autres groupes.",
  king: "La lignée royale traverse fondation, exils et résistance. Après une longue période sans roi depuis 1894, Oba Adé Kpadawalé est installé en mai 2016, et son nom célèbre le retour de la couronne au bercail.",
  actions: "Rites, danses et rassemblements font vivre la mémoire collective. Les récits des rois Otchoukpa, Agbola et Adélu illustrent des choix de protection, de résistance et de défense de la cité.",
  territory: "Sakété se situe au sud-ouest du département du Plateau, à une soixantaine de kilomètres de Cotonou. La commune couvre environ 700 km² et compte 81 villages et quartiers répartis dans six arrondissements.",
} as const;

export const events = [
  { title: "Fête du Trône", date: "14 août 2026", place: "Palais royal d’Illasso", type: "Cérémonie officielle", status: "À venir", image: festival, description: "Célébration annuelle réunissant la cour, les dignitaires et les familles du royaume." },
  { title: "Rencontre des artisans", date: "26 septembre 2026", place: "Place du marché royal", type: "Culture", status: "À venir", image: craft, description: "Une journée consacrée aux savoir-faire, aux textiles, à la sculpture et à leur transmission." },
  { title: "Journée du territoire", date: "18 octobre 2026", place: "Illasso et villages voisins", type: "Visite", status: "À venir", image: territory, description: "Visite des communautés, échanges avec les sages et découverte des terres du royaume." },
  { title: "Audience de la jeunesse", date: "12 juillet 2026", place: "Cour du palais", type: "Action sociale", status: "Passé", image: palace, description: "Dialogue autour de l’éducation, de la culture et de la préservation du patrimoine." },
];

// Sections verticales de la page d'accueil.
// Textes et images sont librement remplaçables : changez `image` par un autre
// import d'illustration et `paragraphs` par le contenu officiel du palais.
export const homeSections = [
  {
    id: "histoire", eyebrow: "Chapitre 01", title: "Histoire & origines", image: palace, imageAlt: "Palais royal d’Illasso",
    paragraphs: [aboutChapterSummaries.history],
    points: ["Illassô, premier foyer des fondateurs", "Oba Otchoukpa et la dynastie royale", "Takété, Odo Yansa et la naissance de Sakété"],
  },
  {
    id: "culture", eyebrow: "Chapitre 02", title: "Culture & traditions", image: craft, imageAlt: "Atelier d’artisanat royal",
    paragraphs: [aboutChapterSummaries.culture],
    points: ["Danses Egungun, Guèlèdè, Akpala, Batta et Bolodjo", "Cultes endogènes, Oro et traditions", "Communautés et personnalités de Sakété"],
  },
  {
    id: "roi", eyebrow: "Chapitre 03", title: "Le Roi", image: king, imageAlt: "Portrait du Roi d’Illasso",
    paragraphs: [aboutChapterSummaries.king],
    points: ["Oba Otchoukpa, fondateur de la dynastie", "Agbola et Adélu dans la mémoire royale", "Oba Adé Kpadawalé : repère historique daté de 2016"],
  },
  {
    id: "activites", eyebrow: "Chapitre 04", title: "Activités & actions", image: festival, imageAlt: "Fête culturelle du royaume",
    paragraphs: [aboutChapterSummaries.actions],
    points: ["Protection de la famille et de la cité", "Mémoire de la révolte de 1905", "Rassemblements, rites et transmission"],
  },
  {
    id: "territoire", eyebrow: "Chapitre 05", title: "Territoire", image: territory, imageAlt: "Terres et villages d’Illasso",
    paragraphs: [aboutChapterSummaries.territory],
    points: ["Six arrondissements et 81 villages/quartiers", "Aguidi, Iya-Nsa et Odo Yansa", "Terres agricoles, palmeraies et forêt classée"],
  },
];

export const gallery = [
  { image: palace, title: "La cour royale", category: "Roi", meta: "Palais royal · cérémonie symbolique" },
  { image: king, title: "Portrait de souverain", category: "Roi", meta: "Illasso · portrait éditorial" },
  { image: festival, title: "Tambours du royaume", category: "Cérémonies", meta: "Sakété · fête culturelle" },
  { image: craft, title: "La main et la mémoire", category: "Culture", meta: "Atelier royal · artisanat" },
  { image: territory, title: "Terres d’Illasso", category: "Territoire", meta: "Commune de Sakété · vue aérienne" },
];

// Albums événementiels de la galerie. Les descriptions racontent le contexte
// de prise de vue et peuvent être remplacées avec les archives officielles.
export const galleryEvents = [
  {
    id: "fete-du-trone",
    title: "Fête du Trône",
    date: "14 août 2026",
    place: "Palais royal d’Illasso",
    description: "Ces images ont été réalisées pendant les préparatifs et les temps forts de la Fête du Trône. Elles suivent l’arrivée des dignitaires, les tambours de cour et le rassemblement des familles autour du palais.",
    photos: [gallery[2], gallery[0], gallery[1], gallery[4]],
  },
  {
    id: "rencontre-des-artisans",
    title: "Rencontre des artisans",
    date: "26 septembre 2026",
    place: "Place du marché royal",
    description: "Cette série documente une journée de transmission consacrée aux gestes, aux matières et aux motifs d’Illasso. Les photographies ont été prises au fil des démonstrations et des échanges avec les artisans.",
    photos: [gallery[3], gallery[1], gallery[2]],
  },
  {
    id: "journee-du-territoire",
    title: "Journée du territoire",
    date: "18 octobre 2026",
    place: "Illasso et villages voisins",
    description: "Prises lors d’une visite des terres du royaume, ces images retracent le parcours entre le palais, les espaces de rassemblement et les villages voisins, en présence des sages et des communautés.",
    photos: [gallery[4], gallery[0], gallery[3]],
  },
];