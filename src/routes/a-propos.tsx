import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/site-chrome";
import { RoyalMapImage } from "../components/royal-map-lightbox";
import { aboutChapterSummaries, images } from "../lib/site-data";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [{ title: "À propos — Royaume d’Illasso" }, { name: "description", content: "Illassô, origine de Sakété : histoire, mémoire royale, traditions et territoire du Royaume Mère d’Illasso." }, { property: "og:title", content: "À propos du Royaume d’Illasso" }, { property: "og:description", content: "Plongez dans l’histoire d’Illassô, berceau des fondateurs de Sakété, et découvrez son patrimoine vivant." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/a-propos" }] }),
  component: About,
});

function About() {
  return <>
    <PageIntro eyebrow="À propos" title="Illasso le Royaume Mère de Sakété" titleClassName="text-[40px]" image={images.territory} imageAlt="Paysage du territoire du Royaume d’Illasso">
      Des migrations fondatrices aux traditions qui demeurent, cette terre porte la mémoire d’un peuple, d’une dynastie et d’un territoire.
    </PageIntro>

    <section id="histoire" className="section-shell tone-cream section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="eyebrow">Histoire & origines</p>
            <h2 className="section-title">Illassô, le premier foyer de Sakété</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{aboutChapterSummaries.history}</p>
            <p className="mt-5 leading-relaxed text-ink/65">
              La mémoire des anciens fait remonter les origines des fondateurs de Sakété à Oyo, en pays yoruba. Descendants du vénéré Oba Otchoukpa, ils traversent des migrations éprouvantes et des persécutions. Leur premier établissement sur les terres de l’actuelle commune est Illassô : c’est là que prend racine l’histoire du Royaume Mère, de la dynastie des Oba et de Sakété.
            </p>
          </div>
          <figure className="group relative overflow-hidden rounded-3xl border border-gold/25 shadow-2xl">
            <img src={images.palace} alt="Architecture et mémoire du palais royal d’Illasso" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]" width={1280} height={960}/>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-6 pb-5 pt-16 font-serif text-lg text-cream">Illassô, terre de fondation et de mémoire</figcaption>
          </figure>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01 · Le premier foyer", "Oyo → Illassô", "Les descendants d’Oba Otchoukpa s’établissent d’abord à Illassô, terre de mémoire et de culte."],
            ["02 · Le départ", "Takété, se mettre à l’écart", "Sous le règne d’Otchoukpa, les tensions du palais et les incursions guerrières du Danxomè se répètent. Pour trouver la paix, le roi part avec sa famille. Après une escale à Dèguè, ils s’arrêtent près de l’actuelle place du Monument aux morts."],
            ["03 · La naissance de Sakété", "Odo Yansa", "Des hommes du roi découvrent le marigot Odo Yansa. Au retour, une termitière recouvre les affaires du groupe. Le Fâ y reconnaît le signe d’Otchougbé, divinité vénérée à Illassô, qui demande à être honorée sur ce nouveau site. Takété, « se mettre à l’écart », devient peu à peu Sakété."]
          ].map(([eyebrow, title, text]) => <article key={title} className="glass edge rounded-2xl p-6">
            <p className="eyebrow">{eyebrow}</p><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-4 text-sm leading-relaxed text-ink/65">{text}</p>
          </article>)}
        </div>

        <div className="mt-10 grid overflow-hidden rounded-3xl border border-gold/20 bg-white/75 lg:grid-cols-[0.9fr_1.1fr]">
          <figure className="group relative min-h-[260px] overflow-hidden lg:min-h-[360px]">
            <img src={images.territory} alt="Paysage du territoire d’Illassô, marqué par l’histoire du royaume" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" width={1280} height={960}/>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-6 pb-5 pt-16 font-serif text-lg text-cream">Mémoire et résistance</figcaption>
          </figure>
          <div className="p-7 md:p-9">
            <p className="eyebrow">Mémoire et résistance</p>
            <h3 className="mt-3 font-serif text-2xl md:text-3xl">La révolte de 1905 et les déplacements du palais</h3>
            <p className="mt-5 leading-relaxed text-ink/65">
              À Imoro, quartier situé à environ 300 mètres de la résidence de l’administrateur colonial, des festivités funéraires sont organisées en l’honneur d’un riche notable. Le vacarme conduit l’administrateur à en ordonner l’interruption par la force. Le 25 février 1905, les heurts entre habitants et soldats du cercle font des blessés et des morts. Le sanctuaire d’Oshugbé est détruit, puis les attaques contre les bâtiments administratifs s’intensifient. La bataille qui s’ensuit se termine dans le sang. Le roi Agbola prend alors la route d’Ibatefin, son village natal, au Nigeria.
            </p>
            <p className="mt-4 leading-relaxed text-ink/65">
              Après ces affrontements, les souverains qui lui succèdent restent insoumis. Adélu (Adélakun), opposé aux recrutements militaires forcés, est déporté à Port-Étienne, aujourd’hui Nouadhibou, en Mauritanie. Gbékun, terre dédiée au palais royal, est ensuite abandonné au profit d’Odéla. L’ancien emplacement du palais est cédé à l’administration coloniale, qui y bâtit l’école « Ilè iwé oba », aujourd’hui l’École urbaine Centre.
            </p>
          </div>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-3xl bg-ink text-cream lg:grid-cols-[1.15fr_0.85fr]">
          <div className="px-7 py-8 md:px-9 md:py-10">
            <p className="eyebrow">Des femmes et des hommes de rayonnement</p>
            <h3 className="mt-3 font-serif text-2xl md:text-3xl">Sakété, terre de talents</h3>
            <p className="mt-4 max-w-5xl text-sm leading-relaxed text-cream/75">
              La mémoire de Sakété est aussi portée par celles et ceux qui ont marqué la vie publique, intellectuelle et juridique du Bénin : Rafiatou Karimou, première femme ministre du pays, son frère Salimane Karimou, Souradjou Kamala, ancien directeur de cabinet du général Mathieu Kérékou, le professeur et ancien ministre François Abiola, ainsi que les juristes Bastien et Ibrahim Salami.
            </p>
          </div>
          <figure className="group relative min-h-[240px] overflow-hidden lg:min-h-[300px]">
            <img src={images.festival} alt="Rassemblement culturel à Sakété illustrant la vie et le rayonnement de la commune" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" width={1280} height={800}/>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-6 pb-5 pt-16 font-serif text-lg text-cream">Des femmes et des hommes qui font rayonner Sakété</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id="culture" className="section-shell tone-ember section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <figure className="group overflow-hidden rounded-3xl border border-gold/20 shadow-2xl">
            <img src={images.craft} alt="Artisanat et savoir-faire du royaume" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]" width={1280} height={960}/>
          </figure>
          <div>
            <p className="eyebrow">Culture & traditions</p><h2 className="section-title">Une identité portée par les rites et les danses</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              La population est issue de migrations venues du Bénin et du Nigeria voisin. En 2020, les communautés Nago et Yoruba y étaient majoritaires (environ 72,3 %), devant les Fon et les Goun (25,9 %). Les Mina, Ibo et Adja composent également la diversité locale.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              Avant la colonisation, les cultes endogènes structuraient la vie spirituelle. Ils demeurent présents aux côtés du christianisme et de l’islam. Le culte d’Oro, entité purificatrice de la cité, conserve une place particulière avec ses interdits et ses traditions. Les danses Egungun, Guèlèdè, Akpala, Batta et Bolodjo accompagnent les réjouissances. Originaire de Sakété, le Bolodjo a été mis en valeur par la chanteuse Zeynab.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              {[
                ["Danses", "Egungun, Guèlèdè, Akpala, Batta et Bolodjo."],
                ["Spiritualité", "Cultes endogènes, Oro et traditions vivantes."],
                ["Savoir-faire", "Textiles, sculptures et artisanat local."],
                ["Transmission", "Des gestes et des récits transmis entre générations."]
              ].map(([title, text]) => <article key={title} className="glass edge rounded-2xl p-5"><h3 className="font-serif text-lg">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink/65">{text}</p></article>)}
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="glass edge rounded-2xl p-6"><h3 className="font-serif text-xl">Des communautés plurielles</h3><p className="mt-3 text-sm leading-relaxed text-ink/65">Nago, Yoruba, Fon, Goun, Mina, Ibo et Adja composent la mosaïque des communautés de Sakété, enrichie par les migrations à l’intérieur du Bénin et depuis le Nigeria voisin.</p></article>
          <article className="glass edge rounded-2xl p-6"><h3 className="font-serif text-xl">Des personnalités qui rayonnent</h3><p className="mt-3 text-sm leading-relaxed text-ink/65">Rafiatou Karimou, Salimane Karimou, Souradjou Kamala, François Abiola et les juristes Bastien et Ibrahim Salami illustrent le rayonnement de la commune.</p></article>
        </div>
      </div>
    </section>

    <section id="roi" className="section-shell tone-ivory section-reveal">
      <div className="mx-auto grid max-w-[1344px] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <figure className="group overflow-hidden rounded-3xl border border-gold/25 shadow-2xl">
          <img src={images.king} alt="Portrait éditorial du Roi d’Illasso" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.035]" width={1024} height={1280}/>
        </figure>
        <div className="self-center">
          <p className="eyebrow">Le Roi</p><h2 className="section-title">La couronne, gardienne d’une mémoire</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">{aboutChapterSummaries.king}</p>
          <p className="mt-5 leading-relaxed text-ink/65">Oba Otchoukpa est le fondateur de la dynastie royale. Dans la mémoire de Sakété, les règnes d’Agbola et d’Adélu demeurent liés aux combats pour la dignité et la liberté du peuple. Le titre « Oba » désigne le roi dans la tradition yoruba.</p>
          <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-gold">« Adé Kpadawalé » : la couronne est enfin de retour au bercail.</blockquote>
          <p className="mt-5 text-sm leading-relaxed text-ink/55">Après une longue période sans roi depuis 1894, Oba Adé Kpadawalé est installé en mai 2016. Son nom célèbre le retour de la couronne au sein de la communauté.</p>
        </div>
      </div>
    </section>

    <section id="activites" className="section-shell tone-ember section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="eyebrow">Activités & actions</p><h2 className="section-title">Protéger, rassembler, transmettre</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">{aboutChapterSummaries.actions}</p>
            <p className="mt-5 leading-relaxed text-ink/65">Les audiences, les rites, les festivités et les rencontres font vivre le lien entre le palais et la cité. La mémoire des choix d’Otchoukpa, d’Agbola et d’Adélu rappelle aussi que servir le royaume, c’est protéger ses habitants, défendre leur dignité et transmettre leur héritage.</p>
          </div>
          <figure className="group overflow-hidden rounded-3xl border border-gold/20 shadow-2xl">
            <img src={images.festival} alt="Rassemblement et célébration culturelle à Sakété" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.04]" width={1280} height={800}/>
          </figure>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {[
            ["Protéger", "Face aux tensions et aux incursions, Oba Otchoukpa choisit de quitter Illassô avec les siens pour rechercher un lieu plus sûr."],
            ["Résister", "En 1905, sous le règne d’Agbola, le conflit avec l’administration coloniale devient une révolte meurtrière. Le roi se réfugie ensuite à Ibatefin."],
            ["Transmettre", "Danses, cultes, cérémonies et récits des souverains gardent vivante la mémoire de la cité et nourrissent le lien entre les communautés."]
          ].map(([title, text], i) => <article key={title} className="glass edge rounded-2xl p-7">
            <p className="text-gold">0{i + 1}</p><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-4 text-sm leading-relaxed text-ink/65">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="territoire" className="section-shell tone-gold section-reveal scroll-mt-24">
      <div className="mx-auto grid max-w-[1344px] items-start gap-10 lg:grid-cols-[minmax(300px,500px)_1fr] lg:gap-16">
        <div className="w-full">
          <figure className="mx-auto w-full max-w-[500px] overflow-hidden rounded-3xl border border-gold/35 bg-cream shadow-2xl">
            <RoyalMapImage interactive />
          </figure>
        </div>
        <div className="glass edge rounded-3xl p-7 md:p-9">
          <p className="eyebrow">Territoire</p><h2 className="mt-5 font-serif text-3xl">Repères sur la commune</h2>
          <p className="mt-5 leading-relaxed text-ink/70">
            Sakété se situe au sud-ouest du département du Plateau, à une soixantaine de kilomètres de Cotonou. La commune couvre environ 700 km². Elle est bordée au nord par Adja-Ouèrè, au sud par Avrankou et Missérété, à l’est par le Nigeria et Ifangni, et à l’ouest par Adjohoun et Bonou. En 2020, sa population était estimée à plus de 115 000 habitants. La commune compte 81 villages et quartiers de ville répartis dans six (06) arrondissements (Aguidi, Ita-Djèbou, Sakété I, Sakété II, Takon et Yoko).
          </p>
          <dl className="mt-8 divide-y divide-gold/15">
            {[["Superficie", "700 km²"], ["Arrondissements", "6 (Aguidi, Ita-Djèbou, Sakété I, Sakété II, Takon et Yoko)"], ["Villages et quartiers", "81"], ["Distance de Cotonou", "Environ 60 km"], ["Forêt classée", "Environ 60 ha"], ["Population", "Estimée à plus de 115 000 habitants (selon le RGPH-4 de 2013)"]].map(([key, value]) => <div key={key} className="flex justify-between gap-4 py-3"><dt className="text-sm text-ink/50">{key}</dt><dd className="max-w-[70%] text-right text-sm font-semibold">{value}</dd></div>)}
          </dl>
          <div className="mt-9 border-t border-gold/20 pt-7">
            <h3 className="font-serif text-2xl">Royaume d’ILLASSO façonné par l’eau et les saisons</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Le climat subéquatorial subit des influences soudano-guinéennes. Deux saisons pluvieuses alternent avec deux saisons sèches : la grande saison des pluies s’étend généralement de mars à juillet, la petite de septembre à novembre. L’eau façonne les paysages : l’Aguidi prend sa source à Adja-Ouèrè et traverse la commune sur près de 30 km ; l’Iya-Nsa arrose les deux arrondissements du centre. Les marigots Mamagué à Ikpédjilé, Tolossi à Iloro-Sodji et Aguidi à Aguidi-centre, les cours d’eau d’Oké Awo et de Takon ainsi que les marais d’Igba et d’Akpéchi forment un réseau remarquable.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Au sud, les terres sont sablo-argileuses et légèrement ferralitiques ; au nord, elles sont rouges, profondes et ferralitiques ; au centre, argilo-sablonneuses et hydromorphes. L’ancienne zone forestière est aujourd’hui largement couverte de palmeraies. Une forêt classée d’environ 60 hectares y est préservée. Sakété est réputée comme la première productrice de noix de palme au Bénin.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  </>;
}
