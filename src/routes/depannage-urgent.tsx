import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/data/content";
import { Suspense } from "react";
import { AlertTriangle, Phone, Clock, Droplets, Flame, Wrench, Zap, Euro, ShieldCheck, MapPin } from "lucide-react";
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

import heroDepannage from "@/assets/hero-depannage-urgent.webp";
import recommendDepannage from "@/assets/recommend-depannage.jpg";
import imgFuite from "@/assets/card-recherche-fuite.webp";
import imgFuiteInvisible from "@/assets/card-recherche-fuite-depannage.webp";
import imgDebouchage from "@/assets/card-debouchage-depannage.webp";
import imgEvier from "@/assets/card-fuite-evier-depannage.webp";
import imgWc from "@/assets/card-wc-suspendu-depannage.webp";
import imgChaudiere from "@/assets/card-entretien-bruleur-depannage.webp";
import imgChaudierePlusEau from "@/assets/card-entretien-bruleur.webp";
import imgRadiateur from "@/assets/card-radiateur-depannage.webp";
import imgFuiteRadiateur from "@/assets/card-fuite-radiateur.webp";
import imgHydro from "@/assets/card-hydrocurage-exterieur.webp";

const SITE_URL = "https://artisan-saintlouis.fr";

export const Route = createFileRoute("/depannage-urgent")({
  head: () => ({
    meta: [
      { title: "Dépannage plomberie & chauffage 7j/7 — Paris IDF | Artisan Saint Louis" },
      { name: "description", content: "Dépannage urgent à Paris : fuite, débouchage, panne chaudière. Intervention en moins d'1h, 7j/7 24h/24, devis transparent annoncé avant intervention." },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { property: "og:title", content: "Dépannage urgent plomberie chauffage — Paris IDF" },
      { property: "og:description", content: "Fuite, débouchage, panne chaudière. Intervention en moins d'1h à Paris, 7j/7 24h/24." },
      { property: "og:url", content: `${SITE_URL}/depannage-urgent` },
      { property: "og:image", content: `${SITE_URL}${heroDepannage}` },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: "Plombier en intervention d'urgence à Paris" },
      { name: "twitter:image", content: `${SITE_URL}${heroDepannage}` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/depannage-urgent` },
      { rel: "preload", as: "image", href: heroDepannage, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Dépannage urgent", item: `${SITE_URL}/depannage-urgent` },
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
              name: "Recherche de fuite non destructive",
              description:
                "Localisation précise de fuite d'eau par caméra thermique, gaz traceur et électroacoustique, sans casser murs ni sols. Rapport pour assurance.",
              serviceType: "Recherche de fuite",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Devis gratuit, conditions communiquées avant intervention" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Débouchage canalisation",
              description:
                "Débouchage évier, douche, WC, regards extérieurs : furet, ventouse, hydrocurage haute pression. Inspection caméra si besoin.",
              serviceType: "Débouchage",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Intervention sous 60 minutes Paris intra-muros" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Dépannage chaudière et pompe à chaleur",
              description:
                "Mise en sécurité, code erreur, plus d'eau chaude, fuite chaudière. Toutes marques : Saunier Duval, De Dietrich, Frisquet, Viessmann, Atlantic.",
              serviceType: "Dépannage chauffage",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "7j/7 24h/24, pièces en véhicule" },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Dépannage plomberie & chauffage 7j/7 — Paris IDF",
          url: `${SITE_URL}/depannage-urgent`,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "[data-speakable]"],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Que faire en cas de fuite d'eau avant l'arrivée du plombier ?",
          description: "Étapes à suivre en cas de fuite d'eau pour minimiser les dégâts en attendant l'intervention d'un plombier.",
          step: [
            {
              "@type": "HowToStep",
              name: "Couper l'arrivée d'eau générale",
              text: "Localisez la vanne d'arrêt principale (souvent près du compteur d'eau ou sous l'évier le plus proche de la fuite) et fermez-la pour stopper l'arrivée d'eau."
            },
            {
              "@type": "HowToStep",
              name: "Couper l'électricité si nécessaire",
              text: "Si la fuite d'eau est proche d'installations électriques (prises, appareils), coupez l'alimentation électrique de la zone concernée au tableau électrique pour éviter tout risque de court-circuit ou d'électrocution."
            },
            {
              "@type": "HowToStep",
              name: "Contacter un plombier d'urgence",
              text: `Appelez un professionnel comme Artisan Saint Louis au ${content.company.contact.phone} pour une intervention rapide. Préparez-vous à décrire la situation et les actions déjà entreprises.`
            }
          ]
        }),
      },
    ],
  }),
  component: DepannagePage,
});

const services: ServiceCard[] = [
  {
    icon: Droplets,
    badge: "Recherche de fuite",
    badgeVariant: "serviceCyan",
    title: "Recherche de fuite non destructive",
    description: "Caméra thermique, gaz traceur, électroacoustique. Localisation précise sans casser vos murs ni vos sols.",
    features: ["Sans dégâts collatéraux", "Rapport pour assurance", "Réparation immédiate possible"],
    image: imgFuite,
    imageAlt: "Recherche de fuite à la caméra thermique sur un mur",
    stat: { value: "98%", label: "fuites localisées" },
  },
  {
    icon: Wrench,
    badge: "Débouchage",
    badgeVariant: "serviceOrange",
    title: "Débouchage canalisation",
    description: "Furet, ventouse, pompe haute pression ou hydrocurage selon le bouchon. Pas de produit corrosif inutile.",
    features: ["Évier, douche, WC, regards", "Caméra inspection si besoin", "Conseils anti-récidive"],
    image: imgDebouchage,
    imageAlt: "Débouchage de canalisation extérieure par hydrocureur",
    stat: { value: "<45min", label: "temps moyen" },
  },
  {
    icon: Flame,
    badge: "Panne chaudière",
    badgeVariant: "serviceRose",
    title: "Dépannage chaudière & PAC",
    description: "Mise en sécurité, code erreur, plus d'eau chaude, fuite chaudière. Toutes marques : Saunier Duval, De Dietrich, Frisquet, Viessmann, Atlantic.",
    features: ["Toutes marques", "Pièces en véhicule", "Remise en route immédiate"],
    image: imgChaudiere,
    imageAlt: "Diagnostic d'une chaudière gaz murale en panne",
    stat: { value: "7j/7", label: "24h/24" },
  },
];

const cases = [
  { title: "Fuite sous évier ou lavabo", description: "Joint usé, siphon fissuré, flexible percé : remplacement immédiat.", urgent: true, image: imgEvier, imageAlt: "Fuite d'eau sous un évier de cuisine en cours de réparation", badge: "Urgent" },
  { title: "WC bouché ou débordant", description: "Débouchage ou remplacement complet WC suspendu / broyeur.", image: imgWc, imageAlt: "Plombier intervenant sur un WC en panne dans une salle de bain", badge: "Débouchage", badgeVariant: "serviceOrange" as const },
  { title: "Plus d'eau chaude", description: "Diagnostic ballon ou chaudière, remise en service le jour même.", urgent: true, image: imgChaudierePlusEau, imageAlt: "Chaudière gaz contrôlée pour panne d'eau chaude sanitaire", badge: "Urgent" },
  { title: "Radiateur fuyant", description: "Robinet, purgeur, corps : isolation et remplacement.", image: imgFuiteRadiateur, imageAlt: "Plombier réparant la fuite d'un robinet de radiateur", badge: "Chauffage", badgeVariant: "serviceAmber" as const },
  { title: "Canalisation extérieure bouchée", description: "Hydrocurage haute pression et inspection caméra.", image: imgHydro, imageAlt: "Camion hydrocureur nettoyant une canalisation extérieure parisienne", badge: "Hydrocurage", badgeVariant: "serviceCyan" as const },
  { title: "Fuite invisible (compteur qui tourne)", description: "Recherche de fuite non destructive avec rapport assurance.", image: imgFuiteInvisible, imageAlt: "Inspection thermique d'un mur de douche pour fuite invisible", badge: "Recherche fuite", badgeVariant: "serviceBlue" as const },
];

const faqs = [
  { q: "Quel est le délai d'intervention en urgence à Paris ?", a: "Moins de 60 minutes en moyenne dans Paris intra-muros en journée (1er, 4e, 7e, 8e, 15e, 16e, 17e arrondissements et au-delà). En proche couronne (Boulogne-Billancourt, Levallois, Neuilly, Saint-Cloud, Vincennes), comptez 60 à 120 minutes selon le trafic. Nous vous communiquons l'heure d'arrivée précise dès la prise d'appel." },
  { q: "Comment se déroule un dépannage en urgence la nuit ou le week-end ?", a: "Pour les interventions de nuit, week-end ou jour férié, les conditions sont toujours annoncées et validées par téléphone avant le déplacement. Devis gratuit et sans engagement, aucune surprise sur la facture finale." },
  { q: "Que faire en cas de fuite d'eau ? Faut-il couper l'eau avant votre arrivée ?", a: "Oui, coupez l'arrivée d'eau générale (vanne au compteur ou sous l'évier le plus proche) et coupez l'électricité de la zone si l'eau touche une prise ou un appareil. Nous vous guidons pas à pas par téléphone si besoin." },
  { q: "Intervenez-vous en copropriété pour une fuite chez le voisin ?", a: "Oui, nous établissons un constat amiable, localisons précisément l'origine et fournissons un rapport détaillé pour votre assurance et celle de la copropriété. Recherche de fuite non destructive par caméra thermique." },
  { q: "Comment réparer une fuite sous évier dans le 15e arrondissement de Paris ?", a: "La cause la plus fréquente est un joint de bonde usé, un siphon fissuré ou un flexible percé. Coupez l'eau sous l'évier (vannes d'arrêt) et appelez-nous : un plombier intervient sous 60 minutes dans le 15e avec les pièces nécessaires." },
  { q: "Ma chaudière affiche un code erreur, que faire ?", a: "Notez le code (par exemple E01, F75) et la marque (Saunier Duval, Frisquet, De Dietrich, Viessmann, Atlantic). Appelez-nous : nous identifions l'origine du défaut au téléphone et arrivons sous 60 minutes avec les pièces toutes marques." },
];

function DepannagePage() {
  return (
    <PageLayout>
      <HeroWithForm
        badge={{ label: "Urgence 7j/7 — 24h/24", icon: <AlertTriangle className="h-3.5 w-3.5" /> }}
        h1={<>Dépannage <span className="text-accent">urgent</span> plomberie & chauffage</>}
        hook="Fuite, débouchage, panne chaudière : intervention en moins d'1h dans Paris. Devis gratuit et sans engagement, communiqué avant toute intervention."
        trustBadges={[
          { label: "Sous 60 min", variant: "serviceOrange", icon: <Clock className="h-3 w-3" /> },
          { label: "Devis gratuit & sans engagement", variant: "serviceEmerald", icon: <Phone className="h-3 w-3" /> },
        ]}
        breadcrumb={[{ label: "Dépannage urgent" }]}
        defaultService="depannage"
        backgroundImage={heroDepannage}
        backgroundImageAlt="Plombier en intervention urgence à Paris"
      />

      <QuickAnswer
        question="Comment obtenir un dépannage plombier en urgence à Paris ?"
      answer={`Appelez le ${content.company.contact.phone} — nous décrochons 7j/7 24h/24. Diagnostic au téléphone, créneau ferme dans l\'heure et devis annoncé avant intervention. En attendant, coupez l\'eau au compteur et l\'électricité si l\'eau menace une prise.`}     />

      <ServicesGrid
        eyebrow="Urgences traitées"
        title="Les pannes que nous résolvons en quelques heures"
        services={services}
      />

      <Suspense fallback={null}>
        <LazyExpertiseSection
          eyebrow="Plomberie & chauffage"
          title="Deux expertises pour traiter toutes vos urgences"
          subtitle="Que la panne vienne de l'eau ou de la chaleur, une seule équipe diagnostique et répare immédiatement."
        />
      </Suspense>

      <UseCasesSection
        title="Cas typiques de dépannage"
        subtitle="Identifiez votre situation pour un diagnostic immédiat au téléphone."
        cases={cases}
      />

      <Suspense fallback={null}>
        <LazyProcessSection
          title="Une urgence ? Voici comment ça se passe"
          subtitle="De votre appel à la réparation : quatre étapes claires, sans surprise."
        />
        <LazyRecommendationsSection
          eyebrow="Notre engagement urgence"
          title="4 garanties pour votre dépannage"
          subtitle="Pour une urgence plomberie ou chauffage, vous attendez de la rapidité, de la transparence et un travail bien fait. Voici nos engagements."
          image={recommendDepannage}
          imageAlt="Plombier en intervention d'urgence sous un évier parisien la nuit"
          recommendations={[
            { icon: Zap, title: "Intervention sous 60 minutes", description: "Délai moyen dans Paris intra-muros, 7j/7 24h/24. Heure d'arrivée précise communiquée dès l'appel." },
            { icon: Euro, title: "Tarifs annoncés avant déplacement", description: "Conditions d'intervention validées par téléphone. Devis gratuit signé sur place avant tout démarrage." },
            { icon: ShieldCheck, title: "Pièces en véhicule", description: "Joints, flexibles, mitigeurs, pièces chaudière toutes marques : remise en service immédiate dans 90% des cas." },
            { icon: MapPin, title: "Couverture Paris & IDF", description: "Paris intra-muros, 92, 93, 94, 78, 91, 95, 77 : un artisan jamais loin de chez vous." },
          ]}
        />
        <LazyTestimonialsSection
          title="Ils nous ont appelés en urgence"
          subtitle="Interventions de dépannage notées par nos clients à Paris et en Île-de-France."
        />
        <LazyFAQSection
          title="FAQ dépannage urgence"
          faqs={faqs}
          meshLinks={[
            { question: "Quelles aides pour remplacer ma chaudière en 2025 ?", href: "/installation-renovation", pageLabel: "Installation & rénovation" },
            { question: "L'entretien annuel d'une chaudière est-il obligatoire ?", href: "/entretien-maintenance", pageLabel: "Entretien & maintenance" },
            { question: "Combien coûte un entretien chaudière gaz à Paris ?", href: "/entretien-maintenance", pageLabel: "Entretien & maintenance" },
            { question: "Comment obtenir un plombier rapidement à Paris ?", href: "/", pageLabel: "Accueil" },
          ]}
        />
        <LazyFinalCTA
          title="Une urgence là, maintenant ?"
          subtitle="Appelez directement, nous décrochons et arrivons sous une heure dans Paris."
        />
      </Suspense>
    </PageLayout>
  );
}
