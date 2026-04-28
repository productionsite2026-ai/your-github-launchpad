import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Hammer, Award, Leaf, ThermometerSun, Bath, Flame, Ruler, FileSignature, Wallet, Trophy } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HeroWithForm from "@/components/HeroWithForm";
import QuickAnswer from "@/components/QuickAnswer";
import ServicesGrid, { type ServiceCard } from "@/components/ServicesGrid";
import UseCasesSection from "@/components/UseCasesSection";
import {
  LazyExpertiseSection,
  LazyProcessSection,
  LazyRecommendationsSection,
  LazyTestimonialsSection,
  LazyFAQSection,
  LazyFinalCTA,
} from "@/components/LazySections";

import heroInstall from "@/assets/hero-installation-renovation.webp";
import recommendInstallation from "@/assets/recommend-installation.jpg";
import imgChaudiereCondensation from "@/assets/card-chaudiere-condensation-install.webp";
import imgPac from "@/assets/card-pompe-chaleur-install.webp";
import imgGranules from "@/assets/card-chaudiere-granules.webp";
import imgPlancher from "@/assets/card-plancher-chauffant-install.webp";
import imgWc from "@/assets/card-wc-suspendu-install.webp";
import imgRobinetterie from "@/assets/card-pose-robinetterie.webp";
import imgRadiateur from "@/assets/card-radiateur-install.webp";
import imgCuveFioul from "@/assets/card-depose-cuve-fioul.webp";
import imgHaussmann from "@/assets/card-salle-bain-haussmannien.webp";
import imgCuisine from "@/assets/card-raccordement-cuisine.webp";
import imgChaudiereOrigine from "@/assets/card-chaudiere-condensation.webp";

const SITE_URL = "https://artisan-saintlouis.fr";

export const Route = createFileRoute("/installation-renovation")({
  head: () => ({
    meta: [
      { title: "Installation & rénovation plomberie chauffage — Paris IDF | Artisan Saint Louis" },
      { name: "description", content: "Pose chaudière condensation, pompe à chaleur, plancher chauffant, salle de bain. Artisans qualifiés RGE à Paris et Île-de-France. Devis gratuit détaillé." },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { property: "og:title", content: "Installation & rénovation plomberie chauffage Paris IDF" },
      { property: "og:description", content: "Chaudière, PAC, plancher chauffant, salle de bain. Artisans RGE, devis détaillé gratuit." },
      { property: "og:url", content: `${SITE_URL}/installation-renovation` },
      { property: "og:image", content: `${SITE_URL}${heroInstall}` },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: "Chantier d'installation chauffage par Artisan Saint Louis à Paris" },
      { name: "twitter:image", content: `${SITE_URL}${heroInstall}` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/installation-renovation` },
      { rel: "preload", as: "image", href: heroInstall, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Installation & rénovation", item: `${SITE_URL}/installation-renovation` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Installation chaudière gaz à condensation",
              description:
                "Remplacement chaudière classique vers condensation : jusqu'à 30% d'économie. Études dimensionnement, pose certifiée, MaPrimeRénov éligible. Marques Viessmann, Frisquet, Saunier Duval, Atlantic.",
              serviceType: "Installation chaudière condensation",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Devis détaillé sous 48h, aides financières incluses" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Installation pompe à chaleur air/eau",
              description:
                "Étude thermique offerte, dimensionnement précis, pose unité extérieure et module hydraulique. Compatible plancher chauffant et radiateurs basse température. COP 4+.",
              serviceType: "Installation pompe à chaleur",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Aides MaPrimeRénov, CEE et éco-PTZ" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Installation chaudière à granulés",
              description:
                "Solution biomasse haut rendement (92%), neutre en carbone. Silo intégré ou déporté, automatisation complète. Aides MaPrimeRénov.",
              serviceType: "Installation chaudière granulés",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Énergie renouvelable, silo sur mesure" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Plancher chauffant hydraulique",
              description:
                "Réseau basse température sur dalle ou rénovation. Confort homogène, esthétique invisible, compatible PAC. Régulation par zone.",
              serviceType: "Plancher chauffant",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Étude par pièce, compatible carrelage et parquet" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Rénovation salle de bain",
              description:
                "Plomberie, sanitaires, douche italienne, baignoire, meuble vasque. Coordination des corps d'état possible. Plans 3D offerts.",
              serviceType: "Rénovation salle de bain",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Délai garanti 5 à 15 jours selon surface" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Pose robinetterie & sanitaires",
              description:
                "Mitigeurs thermostatiques, mitigeurs cuisine, robinetterie design. Installation et raccordement aux normes.",
              serviceType: "Pose robinetterie",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Garantie pose, conseil produit gratuit" },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Installation & rénovation plomberie chauffage — Paris IDF",
          url: `${SITE_URL}/installation-renovation`,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "[data-speakable]"],
          },
        }),
      },
    ],
  }),
  component: InstallationPage,
});

const services: ServiceCard[] = [
  {
    icon: Flame,
    badge: "Chaudière condensation",
    badgeVariant: "serviceBlue",
    title: "Chaudière gaz à condensation",
    description: "Remplacement chaudière classique vers condensation : jusqu'à 30% d'économie. Études dimensionnement et pose certifiée.",
    features: ["Marques premium uniquement", "Garantie pièces 5 ans", "MaPrimeRénov éligible"],
    image: imgChaudiereCondensation,
    imageAlt: "Chaudière à condensation murale fraîchement installée",
    stat: { value: "-30%", label: "consommation" },
  },
  {
    icon: ThermometerSun,
    badge: "Pompe à chaleur",
    badgeVariant: "serviceCyan",
    title: "Pompe à chaleur air/eau",
    description: "Étude thermique complète, dimensionnement précis, pose unité extérieure et module hydraulique. Compatible plancher chauffant et radiateurs basse température.",
    features: ["Étude thermique offerte", "Aides financières incluses", "Mise en service complète"],
    image: imgPac,
    imageAlt: "Installation d'une pompe à chaleur air/eau en façade",
    stat: { value: "COP 4+", label: "rendement" },
  },
  {
    icon: Leaf,
    badge: "Granulés écologiques",
    badgeVariant: "serviceAmber",
    title: "Chaudière à granulés",
    description: "Solution biomasse haut rendement, neutre en carbone. Silo intégré ou déporté, automatisation complète.",
    features: ["Énergie renouvelable", "Aides MaPrimeRénov", "Silo sur mesure"],
    image: imgGranules,
    imageAlt: "Chaudière à granulés de bois avec silo intégré",
    stat: { value: "92%", label: "rendement" },
  },
  {
    icon: ThermometerSun,
    badge: "Plancher chauffant",
    badgeVariant: "serviceRose",
    title: "Plancher chauffant hydraulique",
    description: "Réseau basse température sur dalle ou rénovation. Confort homogène, esthétique invisible, compatible PAC.",
    features: ["Étude par pièce", "Régulation par zone", "Compatible carrelage / parquet"],
    image: imgPlancher,
    imageAlt: "Pose d'un plancher chauffant hydraulique avant chape",
    stat: { value: "-25%", label: "vs radiateurs" },
  },
  {
    icon: Bath,
    badge: "Salle de bain",
    badgeVariant: "serviceViolet",
    title: "Rénovation salle de bain",
    description: "Plomberie, sanitaires, douche italienne, baignoire, meuble vasque. Coordination des corps d'état possible.",
    features: ["Plans 3D offerts", "Délai garanti", "Sanitaires premium"],
    image: imgWc,
    imageAlt: "Salle de bain rénovée avec WC suspendu et douche italienne",
    stat: { value: "5-15j", label: "selon surface" },
  },
  {
    icon: Hammer,
    badge: "Robinetterie",
    badgeVariant: "serviceEmerald",
    title: "Pose robinetterie & sanitaires",
    description: "Mitigeurs thermostatiques, mitigeurs cuisine, robinetterie design. Installation et raccordement aux normes.",
    features: ["Marques pro", "Garantie pose", "Conseil produit gratuit"],
    image: imgRobinetterie,
    imageAlt: "Pose d'un mitigeur de cuisine professionnel",
    stat: { value: "1-2h", label: "par point" },
  },
];

const cases = [
  { title: "Chaudière de plus de 15 ans", description: "Remplacement par condensation : amortissement en 5 à 7 ans grâce aux économies d'énergie.", image: imgChaudiereOrigine, imageAlt: "Ancienne chaudière gaz à remplacer par un modèle à condensation" },
  { title: "Passage du fioul à la PAC", description: "Étude personnalisée, dépose cuve fioul et installation pompe à chaleur clé en main.", image: imgCuveFioul, imageAlt: "Dépose d'une ancienne cuve à fioul dans un sous-sol parisien", badge: "Aides MaPrimeRénov" },
  { title: "Construction neuve", description: "Conception complète plomberie + chauffage selon RT2012 / RE2020.", image: imgPlancher, imageAlt: "Plancher chauffant en construction neuve" },
  { title: "Rénovation appartement haussmannien", description: "Adaptation aux contraintes de copropriété, passage de gaines discrètes.", image: imgHaussmann, imageAlt: "Salle de bain haussmannienne rénovée avec marbre et douche italienne" },
  { title: "Optimisation chauffage existant", description: "Robinets thermostatiques connectés, désembouage, équilibrage.", image: imgRadiateur, imageAlt: "Radiateur équipé d'un robinet thermostatique connecté" },
  { title: "Cuisine ou buanderie", description: "Création arrivée d'eau, évacuation lave-linge / lave-vaisselle.", image: imgCuisine, imageAlt: "Raccordement plomberie d'un lave-linge sous évier de cuisine" },
];

const faqs = [
  { q: "Quelles aides financières pour remplacer ma chaudière en 2025 ?", a: "MaPrimeRénov', Coup de Pouce Chauffage, TVA à 5,5 %, éco-PTZ et Certificats d'Économies d'Énergie (CEE) peuvent se cumuler. Pour une pompe à chaleur ou une chaudière à granulés, les aides couvrent souvent 40 à 80 % de l'investissement selon vos revenus. Nous montons les dossiers et vous accompagnons jusqu'au versement." },
  { q: "Combien de temps dure une rénovation de salle de bain à Paris ?", a: "De 5 à 15 jours ouvrés selon la surface et le niveau de finition. Plomberie + sanitaires seuls : 3 à 5 jours. Avec carrelage, électricité et menuiserie : 8 à 15 jours. Pour un appartement haussmannien, prévoir un délai supplémentaire si passage de gaines en faux-plafond. Délai contractuel sur devis." },
  { q: "Faut-il être à la maison pendant les travaux d'installation ?", a: "Pas nécessairement. Nous travaillons régulièrement avec les clés confiées, gardiens d'immeuble ou syndics dans les copropriétés parisiennes. Un point d'avancement quotidien vous est envoyé par message avec photos du chantier." },
  { q: "Quelle garantie sur les installations de chaudière et pompe à chaleur ?", a: "Garantie décennale sur la pose, garantie constructeur 2 à 5 ans sur le matériel selon les marques. Nous privilégions les fabricants premium (Viessmann, Atlantic, Saunier Duval, Frisquet, Daikin) pour une fiabilité long terme et un SAV pièces fluide." },
  { q: "Installez-vous des pompes à chaleur dans un appartement parisien ?", a: "Oui, sous conditions techniques (autorisation de copropriété pour l'unité extérieure en façade ou en cour, dimensionnement adapté à la surface). Nous réalisons l'étude thermique et constituons le dossier de demande auprès du syndic." },
  { q: "Quel prix pour une chaudière à condensation installée à Paris ?", a: "Compter entre 3 500 € et 6 500 € TTC pose comprise pour une chaudière gaz à condensation murale de marque premium en remplacement (Frisquet, Viessmann, Saunier Duval). Avant aides MaPrimeRénov, CEE et TVA 5,5 %, qui peuvent réduire la facture de 30 à 60 %." },
];

function InstallationPage() {
  return (
    <PageLayout>
      <HeroWithForm
        badge={{ label: "Artisans qualifiés RGE", icon: <Award className="h-3.5 w-3.5" /> }}
        h1={<>Installation <span className="text-accent">& rénovation</span> sur mesure</>}
        hook="Chaudière, PAC, salle de bain, plancher chauffant. Devis gratuit et sans engagement, étude technique offerte et accompagnement aides MaPrimeRénov."
        trustBadges={[
          { label: "Devis gratuit & sans engagement", variant: "serviceEmerald", icon: <Award className="h-3 w-3" /> },
          { label: "Aides financières", variant: "serviceBlue", icon: <Leaf className="h-3 w-3" /> },
        ]}
        defaultService="installation"
        backgroundImage={heroInstall}
        backgroundImageAlt="Chantier d'installation chauffage par Artisan Saint Louis à Paris"
      />

      <QuickAnswer
        question="Comment se passe une installation chez Artisan Saint Louis ?"
        answer="Visite technique offerte, devis détaillé sous 48h avec dimensionnement précis et estimation des aides. Planning fixé d'un commun accord, chantier suivi par un référent unique, mise en service et formation à l'usage. Garantie décennale et constructeur."
      />

      <ServicesGrid
        eyebrow="Nos installations"
        title="Plomberie & chauffage, du studio à la maison"
        subtitle="Chaque projet est dimensionné précisément : pas de surdimensionnement inutile, pas de sous-dimensionnement inconfortable."
        services={services}
      />

      <Suspense fallback={null}>
        <LazyExpertiseSection
          eyebrow="Plomberie & chauffage"
          title="Deux expertises pour vos projets neufs et rénovations"
          subtitle="De la salle de bain haussmannienne à la pompe à chaleur dernière génération, un seul interlocuteur pour tout le chantier."
        />
      </Suspense>

      <UseCasesSection
        title="Projets typiques"
        subtitle="Quelques situations dans lesquelles nous intervenons régulièrement à Paris et en Île-de-France."
        cases={cases}
      />

      <Suspense fallback={null}>
        <LazyProcessSection
          title="De l'étude au chantier livré"
          subtitle="Une méthode rodée pour des installations propres, dans le budget et le délai annoncés."
        />
        <LazyRecommendationsSection
          eyebrow="Notre engagement installation"
          title="4 raisons de nous confier votre projet de rénovation"
          subtitle="Une installation réussie, c'est une étude précise, un chantier propre, des aides optimisées et une garantie longue durée."
          image={recommendInstallation}
          imageAlt="Deux artisans installant une chaudière à condensation dans un appartement parisien en rénovation"
          recommendations={[
            { icon: Ruler, title: "Étude technique offerte", description: "Visite, dimensionnement précis et plans 3D pour les salles de bain. Aucun surdimensionnement, aucun mauvais choix." },
            { icon: FileSignature, title: "Devis détaillé sous 48h", description: "Postes, marques, références et planning : tout est tracé. Pas d'avenant surprise une fois le chantier lancé." },
            { icon: Wallet, title: "Aides MaPrimeRénov optimisées", description: "Montage de dossier inclus : MaPrimeRénov, CEE, éco-PTZ, TVA 5,5 %. Jusqu'à 80 % de l'investissement couvert." },
            { icon: Trophy, title: "Garantie décennale & marques premium", description: "Viessmann, Atlantic, Frisquet, Daikin, Saunier Duval. Garantie pose 10 ans + garantie constructeur 2 à 5 ans." },
          ]}
        />
        <LazyTestimonialsSection
          title="Chantiers d'installation notés par nos clients"
          subtitle="Salles de bain, chaudières, pompes à chaleur : témoignages de propriétaires parisiens et IDF."
        />
        <LazyFAQSection
          title="FAQ installation & rénovation"
          faqs={faqs}
          meshLinks={[
            { question: "L'entretien annuel d'une chaudière est-il obligatoire ?", href: "/entretien-maintenance", pageLabel: "Entretien & maintenance" },
            { question: "Quel est le délai d'intervention en urgence à Paris ?", href: "/depannage-urgent", pageLabel: "Dépannage urgent" },
            { question: "Ma chaudière affiche un code erreur, que faire ?", href: "/depannage-urgent", pageLabel: "Dépannage urgent" },
            { question: "Combien coûte un entretien chaudière gaz à Paris ?", href: "/entretien-maintenance", pageLabel: "Entretien & maintenance" },
          ]}
        />
        <LazyFinalCTA
          title="Un projet d'installation ou de rénovation ?"
          subtitle="Devis gratuit et sans engagement, étude technique offerte sous 48h, accompagnement sur les aides financières."
        />
      </Suspense>
    </PageLayout>
  );
}
