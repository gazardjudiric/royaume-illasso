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
  territory: "Sakété se situe au sud-ouest du département du Plateau, à une soixantaine de kilomètres de Cotonou au Bénin. La commune couvre environ 700 km² et compte 81 villages et quartiers répartis dans six arrondissements.",
} as const;

// Coordonnées officielles du royaume, utilisées sur la page Contact et dans le pied de page.
export const contactInfo = {
  phones: [
    { label: "01 41 01 09 25", href: "tel:+2290141010925" },
    { label: "01 97 11 92 29", href: "tel:+2290197119229" },
  ],
  email: { label: "orisadbenin@gmail.com", href: "mailto:orisadbenin@gmail.com" },
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
// L'ordre du tableau fixe l'ordre d'affichage ; le fond et le style de chaque
// section dépendent de sa position (voir index.tsx), pas de son contenu.
export const homeSections = [
  {
    id: "roi", eyebrow: "Chapitre 01", titleLead: "Le Mot du", titleAccent: "Roi", image: king, imageAlt: "Portrait du Roi d’Illasso",
    paragraphs: ["En tant que gardiens de cet héritage, nous avons le devoir de le préserver, de le faire vivre et de le transmettre aux générations futures. Notre vision embrasse le bien-être de nos communautés."],
    points: ["Préserver et transmettre l’héritage royal", "Le bien-être des communautés, surtout en milieu rural", "La Fondation OBA ADE KPADAWALE, cadre d’engagement"],
  },
  {
    id: "histoire", eyebrow: "Chapitre 02", titleLead: "Histoire &", titleAccent: "Origines", image: palace, imageAlt: "Palais royal d’Illasso",
    paragraphs: [aboutChapterSummaries.history],
    points: ["Illassô, premier foyer des fondateurs", "Oba Otchoukpa et la dynastie royale", "Takété, Odo Yansa et la naissance de Sakété"],
  },
  {
    id: "culture", eyebrow: "Chapitre 03", titleLead: "Culture &", titleAccent: "Traditions", image: craft, imageAlt: "Atelier d’artisanat royal",
    paragraphs: [aboutChapterSummaries.culture],
    points: ["Danses Egungun, Guèlèdè, Akpala, Batta et Bolodjo", "Cultes endogènes, Oro et traditions", "Communautés et personnalités de Sakété"],
  },
  {
    id: "activites", eyebrow: "Chapitre 04", titleLead: "Engagements du", titleAccent: "Roi", image: festival, imageAlt: "Fête culturelle du royaume",
    paragraphs: [aboutChapterSummaries.actions],
    points: ["Président de l’AOYAD (ORISA D-B), de l’ASIPAP et du culte Oro", "Fondateur de la Fondation Oba Adépkadawalé", "Membre du Haut Conseil des Rois"],
  },
  {
    id: "territoire", eyebrow: "Chapitre 05", titleLead: "Le Territoire", titleAccent: "Royal", image: territory, imageAlt: "Terres et villages d’Illasso",
    paragraphs: [aboutChapterSummaries.territory],
    points: ["Six arrondissements et 81 villages/quartiers", "Aguidi, Iya-Nsa et Odo Yansa", "Terres agricoles, palmeraies et forêt classée"],
  },
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
// L’ordre des éléments de `media` est l’ordre d’affichage : les 5 premiers forment
// l’aperçu (2 à gauche, 3 à droite), puis la visionneuse suit le même ordre.
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
          { id: "danses-video-test", type: "video", src: "https://youtu.be/Zi_XLOBDo_Y", title: "Vidéo de démonstration temporaire — à remplacer", alt: "Vidéo de test, sans lien avec les archives du Royaume d’Illasso" },
          { id: "danses-4", type: "image", src: images.territory, title: "Rassemblement culturel — autre aperçu", alt: "Illustration supplémentaire de Rassemblement culturel" },
          { id: "danses-5", type: "image", src: images.king, title: "Rassemblement culturel — détail complémentaire", alt: "Autre illustration de Rassemblement culturel" },
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
          { id: "artisanat-4", type: "image", src: images.palace, title: "Savoir-faire artisanal — autre aperçu", alt: "Illustration supplémentaire de Savoir-faire artisanal" },
          { id: "artisanat-5", type: "image", src: images.king, title: "Savoir-faire artisanal — détail complémentaire", alt: "Autre illustration de Savoir-faire artisanal" },
        ],
      },
      {
        id: "fete-recoltes",
        title: "Fête des récoltes",
        description: "Chants, offrandes et partage marquent la fin des récoltes et rassemblent les familles autour du palais. Activité fictive, à remplacer par les archives officielles.",
        media: [
          { id: "fete-recoltes-1", type: "image", src: images.festival, title: "Ouverture de la fête", alt: "Illustration fictive : ouverture de la fête" },
          { id: "fete-recoltes-2", type: "image", src: images.territory, title: "Les champs du royaume", alt: "Illustration fictive : les champs du royaume" },
          { id: "fete-recoltes-3", type: "image", src: images.palace, title: "Partage au palais", alt: "Illustration fictive : partage au palais" },
          { id: "fete-recoltes-4", type: "image", src: images.craft, title: "Paniers et récoltes", alt: "Illustration fictive : paniers et récoltes" },
        ],
      },
      {
        id: "contes-oralite",
        title: "Contes et transmission orale",
        description: "Les aînés racontent aux plus jeunes les récits, proverbes et chants qui portent la mémoire du royaume. Activité fictive, à remplacer par les archives officielles.",
        media: [
          { id: "contes-oralite-1", type: "image", src: images.king, title: "La parole des aînés", alt: "Illustration fictive : la parole des aînés" },
          { id: "contes-oralite-2", type: "image", src: images.craft, title: "Récits et savoirs", alt: "Illustration fictive : récits et savoirs" },
          { id: "contes-oralite-3", type: "image", src: images.festival, title: "Chants partagés", alt: "Illustration fictive : chants partagés" },
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
          { id: "illasso-4", type: "image", src: images.festival, title: "Mémoire d’Illassô — autre aperçu", alt: "Illustration supplémentaire de Mémoire d’Illassô" },
          { id: "illasso-5", type: "image", src: images.craft, title: "Mémoire d’Illassô — détail complémentaire", alt: "Autre illustration de Mémoire d’Illassô" },
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
          { id: "dynastie-4", type: "image", src: images.territory, title: "Héritage de la dynastie — autre aperçu", alt: "Illustration supplémentaire de Héritage de la dynastie" },
          { id: "dynastie-5", type: "image", src: images.craft, title: "Héritage de la dynastie — détail complémentaire", alt: "Autre illustration de Héritage de la dynastie" },
        ],
      },
      {
        id: "intronisation",
        title: "Cérémonie d’intronisation",
        description: "Rites, dignitaires et populations réunis autour du trône pour célébrer la continuité de la lignée royale. Activité fictive, à remplacer par les archives officielles.",
        media: [
          { id: "intronisation-1", type: "image", src: images.king, title: "Le Roi sur son trône", alt: "Illustration fictive : le roi sur son trône" },
          { id: "intronisation-2", type: "image", src: images.palace, title: "La cour assemblée", alt: "Illustration fictive : la cour assemblée" },
          { id: "intronisation-3", type: "image", src: images.festival, title: "Célébration populaire", alt: "Illustration fictive : célébration populaire" },
          { id: "intronisation-4", type: "image", src: images.craft, title: "Insignes royaux", alt: "Illustration fictive : insignes royaux" },
          { id: "intronisation-5", type: "image", src: images.territory, title: "Les délégations des villages", alt: "Illustration fictive : les délégations des villages" },
        ],
      },
      {
        id: "lieux-memoire",
        title: "Lieux de mémoire du royaume",
        description: "Palais, places et sites anciens qui gardent la trace des grandes étapes de l’histoire d’Illasso. Activité fictive, à remplacer par les archives officielles.",
        media: [
          { id: "lieux-memoire-1", type: "image", src: images.palace, title: "Le palais ancien", alt: "Illustration fictive : le palais ancien" },
          { id: "lieux-memoire-2", type: "image", src: images.territory, title: "Sites historiques", alt: "Illustration fictive : sites historiques" },
          { id: "lieux-memoire-3", type: "image", src: images.king, title: "Gardiens de la mémoire", alt: "Illustration fictive : gardiens de la mémoire" },
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
          { id: "territoire-4", type: "image", src: images.festival, title: "Paysages de Sakété — autre aperçu", alt: "Illustration supplémentaire de Paysages de Sakété" },
          { id: "territoire-5", type: "image", src: images.king, title: "Paysages de Sakété — détail complémentaire", alt: "Autre illustration de Paysages de Sakété" },
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
          { id: "spiritualite-4", type: "image", src: images.territory, title: "Traditions spirituelles — autre aperçu", alt: "Illustration supplémentaire de Traditions spirituelles" },
          { id: "spiritualite-5", type: "image", src: images.king, title: "Traditions spirituelles — détail complémentaire", alt: "Autre illustration de Traditions spirituelles" },
        ],
      },
      {
        id: "marches-vie-locale",
        title: "Marchés et vie locale",
        description: "Les marchés de Sakété rythment la vie des villages : échanges, artisanat et produits de la terre. Activité fictive, à remplacer par les archives officielles.",
        media: [
          { id: "marches-vie-locale-1", type: "image", src: images.craft, title: "Étals d’artisanat", alt: "Illustration fictive : étals d’artisanat" },
          { id: "marches-vie-locale-2", type: "image", src: images.territory, title: "Routes des marchés", alt: "Illustration fictive : routes des marchés" },
          { id: "marches-vie-locale-3", type: "image", src: images.festival, title: "Animation du marché", alt: "Illustration fictive : animation du marché" },
          { id: "marches-vie-locale-4", type: "image", src: images.palace, title: "Place du marché royal", alt: "Illustration fictive : place du marché royal" },
        ],
      },
      {
        id: "paysages-agricoles",
        title: "Forêts et paysages agricoles",
        description: "Palmeraies, terres cultivées et forêt classée composent les paysages nourriciers du territoire. Activité fictive, à remplacer par les archives officielles.",
        media: [
          { id: "paysages-agricoles-1", type: "image", src: images.territory, title: "Palmeraies et cultures", alt: "Illustration fictive : palmeraies et cultures" },
          { id: "paysages-agricoles-2", type: "image", src: images.palace, title: "Villages et campagnes", alt: "Illustration fictive : villages et campagnes" },
          { id: "paysages-agricoles-3", type: "image", src: images.craft, title: "Produits de la terre", alt: "Illustration fictive : produits de la terre" },
        ],
      },
    ],
  },
];
