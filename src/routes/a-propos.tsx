import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/site-chrome";
import { RoyalMapImage } from "../components/royal-map-lightbox";
import { aboutChapterSummaries, images } from "../lib/site-data";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [{ title: "À propos — Royaume d’Illasso" }, { name: "description", content: "Découvrez Illassô, berceau historique de Sakété, son histoire, sa culture, ses souverains et son territoire." }, { property: "og:title", content: "À propos du Royaume d’Illasso" }, { property: "og:description", content: "Illassô, origine historique de Sakété : une histoire, des traditions et un territoire vivants." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/a-propos" }] }),
  component: About,
});

function About() {
  return <>
    <PageIntro eyebrow="À propos" title="Pour comprendre Sakété, revenons à Illassô." image={images.territory} imageAlt="Paysage du territoire du Royaume d’Illasso">
      Le Royaume Mère d’Illasso est le premier foyer de l’histoire des fondateurs de Sakété. Son héritage se lit dans les récits de migration, les traditions, les souverains et les paysages de la commune.
    </PageIntro>

    <section id="histoire" className="section-shell tone-cream section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <p className="eyebrow">Histoire & origines</p>
        <h2 className="section-title">Illassô, le premier foyer de Sakété</h2>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-ink/70">{aboutChapterSummaries.history}</p>
        <p className="mt-5 max-w-4xl leading-relaxed text-ink/65">
          Le récit publié par le Gouvernement du Bénin présente les fondateurs comme les descendants d’Oba Otchoukpa, venus d’Oyo, en pays yoruba, au terme de migrations marquées par des persécutions. Avant la fondation de Sakété, ils auraient établi leur premier foyer à Illassô. Cette étape place Illasso au commencement de l’histoire de la dynastie et de la cité.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01 · Le premier foyer", "Oyo → Illassô", "Les descendants d’Oba Otchoukpa s’établissent d’abord à Illassô, terre de mémoire et de culte."],
            ["02 · Le départ", "Takété, se mettre à l’écart", "Sous le règne d’Otchoukpa, les tensions et incursions poussent le roi et sa famille à chercher un lieu plus sûr. Après une escale à Dèguè, ils s’arrêtent près de l’actuelle place du Monument aux morts."],
            ["03 · La naissance de Sakété", "Odo Yansa", "Les hommes du roi découvrent le marigot Odo Yansa. Le Fâ associe la termitière apparue sur les affaires du groupe à Otchougbé, divinité vénérée à Illassô, qui demande à être honorée sur ce nouveau site. Takété évolue alors, par déformation phonétique, en Sakété."]
          ].map(([eyebrow, title, text]) => <article key={title} className="glass edge rounded-2xl p-6">
            <p className="eyebrow">{eyebrow}</p><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-4 text-sm leading-relaxed text-ink/65">{text}</p>
          </article>)}
        </div>

        <div className="mt-10 rounded-3xl border border-gold/20 bg-white/70 p-7 md:p-9">
          <p className="eyebrow">Mémoire et résistance</p>
          <h3 className="mt-3 font-serif text-2xl md:text-3xl">La révolte de 1905 et les déplacements du palais</h3>
          <p className="mt-5 leading-relaxed text-ink/65">
            Le 25 février 1905, l’interruption forcée de festivités funéraires en l’honneur d’un notable du quartier Imoro déclenche des affrontements entre habitants et soldats coloniaux. Des personnes sont blessées et tuées. Le sanctuaire d’Oshugbé est détruit, puis les attaques contre les bâtiments administratifs s’intensifient. Le roi Agbola se réfugie à Ibatefin, de l’autre côté de la frontière, au Nigeria.
          </p>
          <p className="mt-4 leading-relaxed text-ink/65">
            Le récit rappelle également l’exil du roi Adélu (Adélakun), opposé aux recrutements militaires forcés, vers Port-Étienne — aujourd’hui Nouadhibou, en Mauritanie. Après ces événements, le site de Gbékun, consacré au palais royal, est abandonné au profit d’Odéla. L’emplacement de l’ancien palais est ensuite occupé par l’école « Ilè iwé oba », devenue l’École urbaine Centre.
          </p>
        </div>
      </div>
    </section>

    <section id="culture" className="section-shell tone-ink section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <p className="eyebrow">Culture & traditions</p>
        <h2 className="section-title">Une identité portée par les rites et les danses</h2>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-ink/75">{aboutChapterSummaries.culture}</p>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {[
            ["Danses et réjouissances", "Egungun, Guèlèdè, Akpala et Batta rythment les réjouissances. Le Bolodjo, danse originaire de Sakété, a notamment été valorisé dans les albums de la chanteuse Zeynab."],
            ["Cultes et spiritualité", "Les cultes endogènes étaient pratiqués avant la colonisation et restent présents aux côtés du christianisme et de l’islam. Le culte d’Oro, décrit comme une entité purificatrice de la cité, s’accompagne d’interdits et de traditions propres."],
            ["Une mosaïque de communautés", "L’article du Gouvernement, publié en 2020, décrit une population principalement Nago et Yoruba (72,3 %), puis Fon et Goun (25,9 %), ainsi que des communautés Mina, Ibo et Adja."],
            ["Des personnalités qui rayonnent", "Parmi les personnalités citées figurent Rafiatou Karimou, première femme ministre du Bénin, Salimane Karimou, Souradjou Kamala, le professeur François Abiola, ainsi que les juristes Bastien et Ibrahim Salami."]
          ].map(([title, text]) => <article key={title} className="glass edge rounded-2xl p-6">
            <h3 className="font-serif text-xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink/65">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section id="roi" className="section-shell tone-ivory section-reveal">
      <div className="mx-auto grid max-w-[1344px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <img src={images.king} alt="Portrait éditorial du Roi d’Illasso" loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover" width={1024} height={1280}/>
        <div className="self-center">
          <p className="eyebrow">Le Roi</p><h2 className="section-title">La couronne, gardienne d’une mémoire</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/70">{aboutChapterSummaries.king}</p>
          <p className="mt-5 leading-relaxed text-ink/65">
            Oba Otchoukpa est présenté comme le fondateur de la dynastie royale de Sakété. Le récit évoque aussi le roi Agbola, associé aux événements de 1905, puis Adélu, déporté pour son opposition aux recrutements militaires forcés. Le titre « Oba » désigne le roi dans la tradition yoruba.
          </p>
          <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-2xl italic leading-relaxed text-gold">
            « Adé Kpadawalé » signifie en Nago : « la couronne est enfin de retour au bercail ».
          </blockquote>
          <p className="mt-5 text-sm leading-relaxed text-ink/55">
            Repère historique à dater : l’article gouvernemental de 2020 indique qu’Oba Adé Kpadawalé a été installé en mai 2016, après une longue crise au trône, et précise que la région n’avait plus connu de roi depuis 1894. Cette mention restitue le contexte de l’article et ne remplace pas l’actualisation officielle de la titulature du palais.
          </p>
        </div>
      </div>
    </section>

    <section id="activites" className="section-shell tone-ember section-reveal">
      <div className="mx-auto max-w-[1344px]">
        <p className="eyebrow">Activités & actions</p><h2 className="section-title">Protéger, rassembler, transmettre</h2>
        <p className="mt-6 max-w-4xl text-lg leading-relaxed text-ink/75">{aboutChapterSummaries.actions}</p>
        <p className="mt-5 max-w-4xl leading-relaxed text-ink/65">
          L’article met surtout en lumière des moments historiques et des pratiques culturelles, plutôt qu’un agenda contemporain de la cour. Il rappelle les déplacements entrepris pour mettre la famille royale à l’abri, la résistance face aux interventions coloniales et les rassemblements — notamment les festivités funéraires d’Imoro — qui occupent une place forte dans la mémoire collective.
        </p>
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
        <figure className="mx-auto w-full max-w-[500px] overflow-hidden border border-gold/35 bg-cream shadow-2xl"><RoyalMapImage interactive /><figcaption className="border-t border-gold/20 bg-card px-5 py-4 text-sm text-ink/60">Touchez ou cliquez sur la carte pour l’agrandir et lire les noms des villages.</figcaption></figure>
        <div className="glass edge rounded-3xl p-7 md:p-9">
          <p className="eyebrow">Territoire</p><h2 className="mt-5 font-serif text-3xl">Sakété, entre rivières et palmeraies</h2>
          <p className="mt-5 leading-relaxed text-ink/70">{aboutChapterSummaries.territory}</p>
          <p className="mt-4 leading-relaxed text-ink/65">
            La commune est limitée au nord par Adja-Ouèrè, au sud par Avrankou et Missérété, à l’est par le Nigeria et Ifangni, et à l’ouest par Adjohoun et Bonou. En 2020, l’article estimait sa population à plus de 115 000 habitants et indiquait six arrondissements — Aguidi, Ita-Djèbou, Sakété I, Sakété II, Takon et Yoko — regroupant 81 villages et quartiers de ville.
          </p>
          <h3 className="mt-8 font-serif text-xl">Un paysage façonné par l’eau et les saisons</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            Le climat est subéquatorial, avec des influences soudano-guinéennes : une grande saison des pluies de mars à juillet, une petite de septembre à novembre, et deux saisons sèches. La rivière Aguidi, qui prend sa source à Adja-Ouèrè, traverse Sakété sur près de 30 km. La rivière Iya-Nsa arrose les deux arrondissements du centre. Odo Yansa, les cours d’eau d’Oké Awo et de Takon, ainsi que les marais d’Igba et d’Akpéchi complètent ce réseau.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            Les sols varient selon les zones : sablo-argileux et légèrement ferralitiques au sud, rouges et profonds au nord, argilo-sablonneux et hydromorphes au centre. Les anciennes forêts ont largement cédé la place aux palmeraies, mais une forêt classée d’environ 60 hectares demeure. L’article présente Sakété comme la première productrice de noix de palme du Bénin.
          </p>
          <dl className="mt-8 divide-y divide-gold/15">
            {[["Superficie", "700 km²"], ["Arrondissements", "6"], ["Villages et quartiers", "81"], ["Distance de Cotonou", "Environ 60 km"], ["Forêt classée", "Environ 60 ha"]].map(([key, value]) => <div key={key} className="flex justify-between gap-4 py-3"><dt className="text-sm text-ink/50">{key}</dt><dd className="text-right text-sm font-semibold">{value}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>

    <section className="section-shell tone-cream">
      <div className="mx-auto max-w-[1344px] border-t border-gold/25 pt-7 text-sm text-ink/55">
        <p>Source historique et géographique : <a className="text-gold underline underline-offset-4" href="https://www.gouv.bj/article/1042/destination-benin---sakete-rives-yansa-terre-promise-/" target="_blank" rel="noreferrer">« Destination Bénin : Sakété, sur les rives d’Odo Yansa, la terre promise des Oba » — Gouvernement du Bénin, 6 décembre 2020.</a></p>
        <p className="mt-2">Les données démographiques et la présentation du souverain reflètent le contexte de cet article publié en 2020.</p>
      </div>
    </section>
  </>;
}
