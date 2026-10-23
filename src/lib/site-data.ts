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
  actions: "Le Roi préside l’AOYAD (ORISA D-B), l’ASIPAP et le culte Oro de Sakété. Fondateur de la Fondation Oba Adépkadawalé, il a notamment fait un don aux orphelins de Sakété. Il est également membre du Haut Conseil des Rois.",
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

export type GalleryMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  alt: string;
  poster?: string;
};

export type GalleryActivity = {
  id: string;
  title: string;
  description: string;
  media: GalleryMedia[];
};

export type GalleryCategory = {
  id: string;
  title: string;
  description: string;
  activities: GalleryActivity[];
};

// Les visuels actuels sont des illustrations temporaires. Ajoutez des vidéos
// en ajoutant un élément { type: "video", src: "URL YouTube, Vimeo ou fichier vidéo" }.
export const galleryCategories: GalleryCategory[] = [
  {
    id: "culture-traditions",
    title: "Culture & traditions",
    description: "Danses, rites et savoir-faire qui font vivre l’identité culturelle de Sakété.",
    activities: [
      {
        id: "danses-expressions",
        title: "Danses et expressions culturelles",
        description: "Egungun, Guèlèdè, Akpala, Batta et Bolodjo accompagnent les réjouissances et participent à la transmission des traditions locales.",
        media: [
          { id: "danses-1", type: "image", src: images.festival, title: "Danses et rassemblements", alt: "Illustration d’un rassemblement culturel à Sakété" },
          { id: "danses-2", type: "image", src: images.craft, title: "Culture et transmission", alt: "Illustration de la transmission des traditions du royaume" },
          { id: "danses-3", type: "image", src: images.palace, title: "Patrimoine culturel", alt: "Illustration du patrimoine culturel d’Illassô" },
        ],
      },
      {
        id: "artisanat-savoir-faire",
        title: "Artisanat et savoir-faire",
        description: "Les textiles, la sculpture et l’artisanat local témoignent de gestes et de connaissances transmis entre générations.",
        media: [
          { id: "artisanat-1", type: "image", src: images.craft, title: "Les gestes de l’artisanat", alt: "Illustration de l’artisanat et des savoir-faire locaux" },
          { id: "artisanat-2", type: "image", src: images.territory, title: "Un patrimoine vivant", alt: "Illustration du territoire et du patrimoine de Sakété" },
          { id: "artisanat-3", type: "image", src: images.festival, title: "Gestes et matières", alt: "Illustration des savoir-faire et de la vie culturelle" },
        ],
      },
    ],
  },
  {
    id: "histoire-royale",
    title: "Histoire & mémoire royale",
    description: "Les récits fondateurs et la mémoire de la dynastie du Royaume Mère d’Illasso.",
    activities: [
      {
        id: "illasso-berceau",
        title: "Illassô, berceau du royaume",
        description: "La mémoire des fondateurs de Sakété remonte à Illassô, premier foyer de la dynastie d’Oba Otchoukpa et origine historique du Royaume Mère.",
        media: [
          { id: "illasso-1", type: "image", src: images.palace, title: "Mémoire du palais", alt: "Illustration du patrimoine royal d’Illassô" },
          { id: "illasso-2", type: "image", src: images.territory, title: "Terre de fondation", alt: "Illustration du territoire lié à l’histoire d’Illassô" },
          { id: "illasso-3", type: "image", src: images.king, title: "Mémoire des fondateurs", alt: "Illustration de la mémoire royale d’Illassô" },
        ],
      },
      {
        id: "memoire-dynastie",
        title: "Mémoire de la dynastie royale",
        description: "Les récits du royaume évoquent Oba Otchoukpa, fondateur de la dynastie, ainsi que les règnes d’Agbola et d’Adélu, associés à la mémoire et à la résistance.",
        media: [
          { id: "dynastie-1", type: "image", src: images.king, title: "La mémoire royale", alt: "Illustration de la mémoire de la dynastie royale d’Illasso" },
          { id: "dynastie-2", type: "image", src: images.palace, title: "Le palais et la mémoire", alt: "Illustration du patrimoine royal du royaume" },
          { id: "dynastie-3", type: "image", src: images.festival, title: "Traditions du royaume", alt: "Illustration des traditions du royaume d’Illassô" },
        ],
      },
    ],
  },
  {
    id: "territoire-patrimoine",
    title: "Territoire & patrimoine",
    description: "Des repères sur Sakété et les paysages qui composent le territoire de la commune.",
    activities: [
      {
        id: "reperes-sakete",
        title: "Repères sur la commune de Sakété",
        description: "La commune couvre environ 700 km² et compte six arrondissements ainsi que 81 villages et quartiers de ville. Elle se situe dans le département du Plateau, à une soixantaine de kilomètres de Cotonou.",
        media: [
          { id: "territoire-1", type: "image", src: images.territory, title: "Le territoire de Sakété", alt: "Illustration des paysages du territoire de Sakété" },
          { id: "territoire-2", type: "image", src: images.palace, title: "Patrimoine du royaume", alt: "Illustration du patrimoine royal dans le territoire de Sakété" },
          { id: "territoire-3", type: "image", src: images.craft, title: "Vie locale et patrimoine", alt: "Illustration du patrimoine culturel de Sakété" },
        ],
      },
      {
        id: "rites-spiritualite",
        title: "Rites et spiritualité",
        description: "Les cultes endogènes demeurent présents aux côtés du christianisme et de l’islam. Le culte d’Oro conserve une place particulière dans la mémoire spirituelle de Sakété.",
        media: [
          { id: "spiritualite-1", type: "image", src: images.palace, title: "Traditions spirituelles", alt: "Illustration des traditions spirituelles de Sakété" },
          { id: "spiritualite-2", type: "image", src: images.festival, title: "Traditions vivantes", alt: "Illustration des traditions vivantes du royaume" },
          { id: "spiritualite-3", type: "image", src: images.craft, title: "Mémoire spirituelle", alt: "Illustration de la mémoire spirituelle et culturelle de Sakété" },
        ],
      },
    ],
  },
];
