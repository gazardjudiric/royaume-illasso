import videoImmersionPoster from "../assets/video-immersion-illasso.jpg";

// Une photo n'existe qu'une fois dans src/assets/photos, même si plusieurs pages l'utilisent.
const photoFiles = import.meta.glob<string>("../assets/photos/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

function photo(name: string) {
  const url = photoFiles[`../assets/photos/royaume-illasso-${name}.jpg`];
  if (!url) throw new Error(`Photo introuvable : ${name}`);
  return url;
}

export const images = {
  bannerAbout: photo("cour-palais-royal-img22"),
  bannerGallery: photo("cour-palais-royal-img18"),
  bannerContact: photo("cour-palais-royal-img18"),
  bannerEvents: photo("cour-palais-royal-img44"),
  carouselKing: photo("photo-roi-img11"),
  carouselStatue: photo("cour-palais-royal-img4-m"),
  carouselHall: photo("cour-palais-royal-img27"),
  carouselDignitaries: photo("cour-palais-royal-img48"),
  kingOnThrone: photo("photo-roi-img41-m"),
  kingStanding: photo("photo-roi-img6"),
  historyThrone: photo("cour-palais-royal-histoire1"),
  historyStatues: photo("cour-palais-royal-histoire2"),
  historyEmblem: photo("cour-palais-royal-histoire3"),
  culture: photo("cour-palais-royal-img45"),
  engagements: photo("ceremonie-officielle-roi-illasso-ile-ife-img2"),
  videoPoster: videoImmersionPoster,
};

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
  { title: "Fête du Vodoun", date: "10 janvier 2027", place: "Bénin, célébrations principales à Ouidah", type: "Fête culturelle et spirituelle", status: "À venir", description: "Le Bénin célèbre le vodoun et les religions endogènes par des cérémonies, des danses et des rassemblements, notamment à Ouidah." },
  { title: "Fête du Trône", date: "14 août 2027", place: "Palais royal d’Illasso", type: "Cérémonie officielle", status: "À venir", description: "Célébration annuelle réunissant la cour, les dignitaires et les familles du royaume." },
  { title: "Journée du territoire", date: "18 octobre 2027", place: "Illasso et villages voisins", type: "Visite", status: "À venir", description: "Visite des communautés, échanges avec les sages et découverte des terres du royaume." },
  { title: "Audience de la jeunesse", date: "12 juillet 2026", place: "Cour du palais", type: "Action sociale", status: "Passé", description: "Dialogue autour de l’éducation, de la culture et de la préservation du patrimoine." },
];

// Sections verticales de la page d'accueil.
// Textes et images sont librement remplaçables : changez `image` par une autre
// photo et `paragraphs` par le contenu officiel du palais.
// L'ordre du tableau fixe l'ordre d'affichage ; le fond et le style de chaque
// section dépendent de sa position (voir index.tsx), pas de son contenu.
// La section « territoire » affiche la carte du royaume : elle n'a pas de photo.
export const homeSections = [
  {
    id: "roi", eyebrow: "Chapitre 01", titleLead: "Le Mot du", titleAccent: "Roi", image: photo("photo-roi-chapitre1"), imageAlt: "Le Roi d’Illasso en tenue d’apparat violette, assis sur son trône doré", imageClassName: "object-top",
    paragraphs: ["En tant que gardiens de cet héritage, nous avons le devoir de le préserver, de le faire vivre et de le transmettre aux générations futures. Notre vision embrasse le bien-être de nos communautés."],
    points: ["Préserver et transmettre l’héritage royal", "Le bien-être des communautés, surtout en milieu rural", "La Fondation OBA ADE KPADAWALE, cadre d’engagement"],
  },
  {
    id: "histoire", eyebrow: "Chapitre 02", titleLead: "Histoire &", titleAccent: "Origines", image: photo("cour-palais-royal-img47-m"), imageAlt: "Statues de dignitaires alignées devant le palais royal d’Illasso",
    paragraphs: [aboutChapterSummaries.history],
    points: ["Illassô, premier foyer des fondateurs", "Oba Otchoukpa et la dynastie royale", "Takété, Odo Yansa et la naissance de Sakété"],
  },
  {
    id: "culture", eyebrow: "Chapitre 03", titleLead: "Culture &", titleAccent: "Traditions", image: photo("cour-palais-royal-img40-m"), imageAlt: "Fresque murale colorée de la cour du palais royal",
    paragraphs: [aboutChapterSummaries.culture],
    points: ["Danses Egungun, Guèlèdè, Akpala, Batta et Bolodjo", "Cultes endogènes, Oro et traditions", "Communautés et personnalités de Sakété"],
  },
  {
    id: "activites", eyebrow: "Chapitre 04", titleLead: "Engagements du", titleAccent: "Roi", image: photo("photo-roi-img9"), imageAlt: "Banderole célébrant un dixième anniversaire de couronnement",
    paragraphs: [aboutChapterSummaries.actions],
    points: ["Président de l’AOYAD (ORISA D-B), de l’ASIPAP et du culte Oro", "Fondateur de la Fondation Oba Adépkadawalé", "Membre du Haut Conseil des Rois"],
  },
  {
    id: "territoire", eyebrow: "Chapitre 05", titleLead: "Le Territoire", titleAccent: "Royal",
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

type ActivityVideo = Pick<GalleryMedia, "src" | "title" | "alt" | "poster">;

// Construit une activité à partir du nom de ses photos. L’ordre de `media` est l’ordre
// d’affichage : les 5 premiers forment l’aperçu (2 à gauche, 3 à droite), puis la
// visionneuse suit le même ordre. Une vidéo se place en donnant un objet dans la liste.
function activity(id: string, title: string, description: string, media: Array<string | ActivityVideo>): GalleryActivity {
  return {
    id,
    title,
    description,
    media: media.map((item, index) => {
      const position = index + 1;
      return typeof item === "string"
        ? { id: `${id}-${position}`, type: "image", src: photo(item), title: `Photo ${position}`, alt: `${title}, photo ${position}` }
        : { id: `${id}-${position}`, type: "video", ...item };
    }),
  };
}

const numbered = (prefix: string, numbers: Array<number | string>) => numbers.map((number) => `${prefix}${number}`);

export const galleryCategories: GalleryCategory[] = [
  {
    id: "royaume-roi",
    title: "Le Royaume & le Roi",
    description: "Le palais, ses lieux de mémoire et les temps forts de Sa Majesté Adehoumi Kiffouli.",
    activities: [
      activity(
        "royaume-illasso",
        "Le Royaume d’ILLASSO en image et vidéo",
        "Premier foyer de Sakété, Illassô est le berceau historique de la communauté, gardien de ses origines, de sa culture et de ses traditions.",
        [
          ...numbered("cour-palais-royal-histoire", [1, 2, 3]),
          { src: "https://youtu.be/jSu_f-unzZg", poster: videoImmersionPoster, title: "Immersion dans l’histoire du Royaume d’Illasso", alt: "Vidéo : immersion dans l’histoire du Royaume d’Illasso" },
          ...numbered("cour-palais-royal-img", ["4-m", 9, 22, 23, 27, 36, "40-m", 45, 46, "47-m", 48, 58, 61]),
        ],
      ),
      activity(
        "roi-illasso",
        "Le Roi d’ILLASSO",
        "Gardien de l’histoire, de la culture et des traditions d’Illasso, Sa Majesté Adehoumi Kiffouli veille à la préservation et à la transmission de la mémoire du Royaume.",
        numbered("photo-roi-img", [3, 6, 9, 11, 15, 26, 29, 33, 35, "41-m"]),
      ),
      activity(
        "don-orphelins-sakete",
        "Don du Roi d’Illasso aux orphelins de Sakété",
        "À travers sa Fondation Oba Adépkadawalé, le Roi d’Illasso a apporté son soutien aux orphelins de Sakété. Un geste de cœur qui témoigne de l’attention du Royaume envers les plus vulnérables.",
        numbered("roi-don-orphelins-Sakete-img", [1, 2, 3, 5, 6, 7]),
      ),
      activity(
        "intronisation-aoyad",
        "Intronisation du Roi d’Illassô à la présidence de l’AOYAD (Apapo Oba Yoruba in Africa and Diaspora)",
        "Sa Majesté Adehoumi Kiffouli, Roi d’Illassô, intronisé président de l’AOYAD – Apapo Oba Yoruba in Africa and Diaspora. Une nouvelle mission au service de l’unité et de la culture yoruba, en Afrique et dans la diaspora.",
        numbered("president-AOYAD-intronisation-img", [1, 2, 3, 4, 5, 6, 7, 8, 9]),
      ),
    ],
  },
  {
    id: "visites-ceremonies",
    title: "Visites & cérémonies officielles",
    description: "Rencontres royales, cérémonies et visites officielles auxquelles le Royaume a pris part.",
    activities: [
      activity(
        "visite-ooni-ile-ife",
        "Visite du Roi d’Illassô auprès de l’Ooni d’Ilé-Ifè au Nigéria",
        "Visite de Sa Majesté Adehoumi Kiffouli, Roi d’Illassô, auprès du Roi d’Ilé-Ifè au Nigéria, en présence des Rois d’Illikimou et d’Ologo.",
        numbered("visite-roi-illasso-ile-ife-nigeria-img", [1, 5, 7, 8, 9, 12, 13, 14, 16, 18, 26]),
      ),
      activity(
        "ceremonie-ile-ife",
        "Cérémonie officielle entre le Roi d’Illassô et le Roi d’Ilé-Ifè",
        "Cérémonie officielle entre Sa Majesté Adehoumi Kiffouli, Roi d’Illassô, et le Roi d’Ilé-Ifè. Un moment solennel qui célèbre des liens historiques et une fraternité partagée.",
        numbered("ceremonie-officielle-roi-illasso-ile-ife-img", [1, 2, 3, 4, 5, 6, 7, 8]),
      ),
      activity(
        "priere-wadagni-talata",
        "Cérémonie de prière à Sakété pour le Président Romuald Wadagni et la Vice-Présidente Mariam Chabi Talata",
        "Cérémonie de prière à Sakété pour Son Excellence Romuald Wadagni, Président de la République, et la Vice-Présidente Mariam Chabi Talata. Un moment de recueillement pour la paix et la prospérité du Bénin.",
        numbered("ceremonie-priere-president-wadagni-talata-img", [1, 2, 3, 4, 5, 6, 7]),
      ),
      activity(
        "visite-patrice-talon",
        "Visite de l’ancien Président Patrice Talon à la Maison des Jeunes de Sakété dans le cadre de sa campagne",
        "Visite de campagne de l’ancien Président Patrice Talon à la Maison des Jeunes de Sakété. Un moment d’échange avec les populations, les autorités locales et la jeunesse de la commune et de présenter sa vision pour le développement du Bénin.",
        ["visite-president-talon-img1-m"],
      ),
    ],
  },
];
