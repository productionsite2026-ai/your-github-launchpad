import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ShieldCheck, FileCheck, Gauge, Award, Flame, Droplets, CalendarCheck, TrendingDown, ClipboardList, Wrench } from "lucide-react";
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

import heroEntretien from "@/assets/hero-entretien-maintenance.webp";
import recommendEntretien from "@/assets/recommend-entretien.jpg";
import imgBruleur from "@/assets/card-entretien-bruleur-entretien.webp";
import imgAttestation from "@/assets/card-attestation-entretien.webp";
import imgPac from "@/assets/card-pompe-chaleur-entretien.webp";
import imgGranules from "@/assets/card-chaudiere-granules-entretien.webp";
import imgRadiateur from "@/assets/card-radiateur-entretien.webp";
import imgRobinetterie from "@/assets/card-robinetterie-entretien.webp";
import imgContrat from "@/assets/card-contrat-maintenance.webp";
import imgControleGaz from "@/assets/card-controle-gaz.webp";
import imgDesembouage from "@/assets/card-desembouage.webp";

const SITE_URL = "https://artisan-saintlouis.fr";

export const Route = createFileRoute("/entretien-maintenance")({
  head: () => ({
    meta: [
      { title: "Entretien chaudière & contrat maintenance — Paris IDF | Artisan Saint Louis" },
      { name: "description", content: "Entretien annuel chaudière obligatoire, contrat maintenance, contrôle 22 points et attestation immédiate. Paris et Île-de-France, devis personnalisé." },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { property: "og:title", content: "Entretien chaudière & maintenance plomberie Paris IDF" },
      { property: "og:description", content: "Entretien annuel obligatoire, attestation fournie. Devis personnalisé sur demande." },
      { property: "og:url", content: `${SITE_URL}/entretien-maintenance` },
      { property: "og:image", content: `${SITE_URL}${heroEntretien}` },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1080" },
      { property: "og:image:alt", content: "Entretien annuel d'une chaudière par Artisan Saint Louis" },
      { name: "twitter:image", content: `${SITE_URL}${heroEntretien}` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/entretien-maintenance` },
      { rel: "preload", as: "image", href: heroEntretien, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Entretien & maintenance", item: `${SITE_URL}/entretien-maintenance` },
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
              name: "Entretien annuel chaudière gaz",
              description:
                "Contrôle 22 points conforme arrêté du 15/09/2009 : nettoyage corps de chauffe, mesure CO/CO₂, vérification sécurités. Attestation légale remise sur place.",
              serviceType: "Entretien chaudière gaz",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Devis personnalisé, attestation immédiate" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Entretien chaudière à granulés",
              description:
                "Aspiration cendres, nettoyage échangeur, contrôle vis sans fin et bougie d'allumage. Réglage combustion et conseils stockage pellets.",
              serviceType: "Entretien chaudière granulés",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Visite annuelle minimum, devis sur demande" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Entretien pompe à chaleur",
              description:
                "Contrôle pression fluide, nettoyage échangeur extérieur, vérification module hydraulique. Obligatoire dès 4 kW. Air/eau et air/air.",
              serviceType: "Entretien pompe à chaleur",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Attestation R32 incluse, optimisation COP" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Contrat de maintenance annuel",
              description:
                "Visite annuelle + dépannage prioritaire sous 24h + main d'œuvre incluse. Sans reconduction tacite forcée. Tarifs préférentiels sur les pièces.",
              serviceType: "Contrat maintenance",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Engagement annuel, résiliation à échéance" },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Entretien chaudière & maintenance — Paris IDF",
          url: `${SITE_URL}/entretien-maintenance`,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "[data-speakable]"],
          },
        }),
      },
    ],
  }),
  component: EntretienPage,
});

const services: ServiceCard[] = [
  {
    icon: Flame,
    badge: "Entretien gaz",
    badgeVariant: "serviceEmerald",
    title: "Entretien chaudière gaz",
    description: "Contrôle 22 points, nettoyage corps de chauffe, mesure CO/CO₂, vérification sécurités. Conforme à l'arrêté du 15/09/2009.",
    features: ["Toutes marques", "Attestation remise", "1 visite / an"],
    image: imgBruleur,
    imageAlt: "Technicien nettoyant le brûleur d'une chaudière gaz",
    stat: { value: "22 pts", label: "contrôlés" },
  },
  {
    icon: Award,
    badge: "Granulés / Bois",
    badgeVariant: "serviceAmber",
    title: "Entretien chaudière granulés",
    description: "Aspiration cendres, nettoyage échangeur, contrôle vis sans fin et bougie d'allumage. Spécifique bois et pellets.",
    features: ["Vidange complète", "Réglage combustion", "Conseils stockage"],
    image: imgGranules,
    imageAlt: "Chaudière à granulés en cours d'entretien annuel",
    stat: { value: "1×/an", label: "minimum" },
  },
  {
    icon: Gauge,
    badge: "Entretien PAC",
    badgeVariant: "serviceCyan",
    title: "Entretien pompe à chaleur",
    description: "Contrôle pression fluide, nettoyage échangeur extérieur, vérification module hydraulique. Obligatoire dès 4 kW.",
    features: ["Air/eau et air/air", "Attestation R32", "Optimisation COP"],
    image: imgPac,
    imageAlt: "Unité extérieure de pompe à chaleur en entretien",
    stat: { value: "+15%", label: "rendement" },
  },
];

const cases = [
  { title: "Entretien annuel obligatoire", description: "Attestation légale remise immédiatement, valable pour assurance et bailleur.", image: imgAttestation, imageAlt: "Attestation d'entretien chaudière signée par le technicien", badge: "Obligation légale" },
  { title: "Contrat maintenance annuel", description: "Visite annuelle + dépannage prioritaire + main d'œuvre incluse.", image: imgContrat, imageAlt: "Carnet de contrat de maintenance chaudière annuel" },
  { title: "Vente / achat immobilier", description: "Diagnostic chauffage et plomberie pour acte de vente.", image: imgRobinetterie, imageAlt: "Contrôle de robinetterie et installation sanitaire avant vente" },
  { title: "Optimisation rendement", description: "Réglage combustion, désembouage, équilibrage radiateurs.", image: imgRadiateur, imageAlt: "Réglage d'un robinet thermostatique sur radiateur" },
  { title: "Mise aux normes gaz", description: "Vérification souplesse, ventilation, étanchéité réseau gaz.", image: imgControleGaz, imageAlt: "Contrôle d'étanchéité d'un raccordement gaz au manomètre" },
  { title: "Désembouage circuit chauffage", description: "Élimination des boues qui réduisent le rendement de 30%.", image: imgDesembouage, imageAlt: "Pompe de désembouage connectée au circuit de chauffage" },
];

const faqs = [
  { q: "L'entretien annuel d'une chaudière est-il vraiment obligatoire ?", a: "Oui, l'arrêté du 15 septembre 2009 impose un entretien annuel pour toute chaudière de 4 à 400 kW (gaz, fioul, bois, multi-combustible). L'attestation doit être conservée 2 ans et présentée à votre assurance habitation en cas de sinistre." },
  { q: "Combien coûte un entretien chaudière gaz à Paris ou en Île-de-France ?", a: "Le tarif d'un entretien chaudière gaz murale se situe en général entre 90 € et 160 € TTC selon la marque (Saunier Duval, Frisquet, De Dietrich, Viessmann, Atlantic) et l'accessibilité. Notre devis détaille déplacement, main d'œuvre, contrôle 22 points et attestation, sans surprise." },
  { q: "Qu'inclut votre contrat de maintenance annuel ?", a: "La visite d'entretien annuelle, le déplacement et la main d'œuvre lors d'un dépannage, la priorité d'intervention sous 24h et des conditions préférentielles sur les pièces. Pas de reconduction tacite forcée, résiliation simple à échéance annuelle." },
  { q: "Puis-je résilier mon ancien contrat pour passer chez vous ?", a: "Oui, vous pouvez résilier à échéance annuelle avec un préavis (souvent 1 à 3 mois). Nous reprenons l'historique de votre installation pour assurer la continuité du suivi technique." },
  { q: "Entretenez-vous les pompes à chaleur dans le 92 (Boulogne, Levallois, Neuilly) ?", a: "Oui, nous réalisons l'entretien obligatoire des pompes à chaleur air/eau et air/air (dès 4 kW de fluide frigorigène) dans tout le 92, mais aussi dans le 78, 93, 94 et Paris intra-muros. Attestation R32 fournie." },
  { q: "Quand programmer l'entretien annuel de sa chaudière ?", a: "Idéalement entre mai et septembre, hors période de chauffe : nos plannings sont plus disponibles, l'intervention est plus rapide et votre installation repart en pleine forme pour l'hiver. Aucun risque d'être sans chauffage." },
];

function EntretienPage() {
  return (
    <PageLayout>
      <HeroWithForm
        badge={{ label: "Conforme arrêté du 15/09/2009", icon: <FileCheck className="h-3.5 w-3.5" /> }}
        h1={<>Entretien <span className="text-accent">& maintenance</span> chaudière</>}
        hook="Contrôle 22 points, attestation légale remise immédiatement. Devis gratuit et sans engagement communiqué avant intervention."
        trustBadges={[
          { label: "Attestation immédiate", variant: "serviceEmerald", icon: <ShieldCheck className="h-3 w-3" /> },
          { label: "Toutes marques", variant: "serviceBlue", icon: <Award className="h-3 w-3" /> },
        ]}
        defaultService="entretien"
        backgroundImage={heroEntretien}
        backgroundImageAlt="Entretien annuel d'une chaudière par Artisan Saint Louis"
      />

      <QuickAnswer
        question="Pourquoi entretenir sa chaudière chaque année ?"
        answer="L'entretien annuel est obligatoire (arrêté du 15/09/2009) et conditionne la prise en charge par votre assurance en cas de sinistre. Il prolonge la durée de vie de la chaudière de 5 à 10 ans, réduit la consommation jusqu'à 12% et prévient les risques d'intoxication au monoxyde de carbone."
      />

      <ServicesGrid
        eyebrow="Nos prestations entretien"
        title="Un entretien adapté à chaque équipement"
        services={services}
      />

      <Suspense fallback={null}>
        <LazyExpertiseSection
          eyebrow="Plomberie & chauffage"
          title="Un entretien global, eau et chaleur"
          subtitle="Au-delà de la chaudière, nous suivons l'ensemble de votre installation pour prévenir les pannes coûteuses."
        />
      </Suspense>

      <UseCasesSection
        title="Quand programmer un entretien ?"
        subtitle="Au-delà de l'obligation légale, plusieurs situations justifient une intervention préventive."
        cases={cases}
      />

      <Suspense fallback={null}>
        <LazyProcessSection
          title="Votre entretien, étape par étape"
          subtitle="Prise de RDV, contrôle 22 points, attestation : un parcours clair et sans surprise."
        />
        <LazyRecommendationsSection
          eyebrow="Notre engagement entretien"
          title="4 raisons de nous confier votre entretien annuel"
          subtitle="Un entretien rigoureux prolonge la vie de votre chaudière et préserve votre couverture assurance. Voici nos engagements."
          image={recommendEntretien}
          imageAlt="Technicien chauffagiste contrôlant la pression d'une chaudière gaz murale"
          recommendations={[
            { icon: ClipboardList, title: "Contrôle 22 points complet", description: "Brûleur, échangeur, pression, sécurités, mesure CO/CO₂ : conforme à l'arrêté du 15/09/2009." },
            { icon: CalendarCheck, title: "Attestation remise sur place", description: "Document légal valable assurance et bailleur, signé immédiatement après l'intervention. Aucun délai d'envoi." },
            { icon: TrendingDown, title: "+15% de rendement", description: "Réglage combustion, nettoyage et désembouage si besoin : jusqu'à 12% d'économies d'énergie sur la facture." },
            { icon: Wrench, title: "Contrat maintenance flexible", description: "Visite annuelle + dépannage prioritaire sous 24h + main d'œuvre incluse. Sans reconduction tacite forcée." },
          ]}
        />
        <LazyTestimonialsSection
          title="Avis clients sur nos entretiens"
          subtitle="Ce que disent les particuliers et copropriétés que nous suivons à l'année."
        />
        <LazyFAQSection
          title="FAQ entretien & maintenance"
          faqs={faqs}
          meshLinks={[
            { question: "Quelles aides pour remplacer ma chaudière en 2025 ?", href: "/installation-renovation", pageLabel: "Installation & rénovation" },
            { question: "Quel prix pour une chaudière à condensation à Paris ?", href: "/installation-renovation", pageLabel: "Installation & rénovation" },
            { question: "Quel est le délai d'intervention en urgence à Paris ?", href: "/depannage-urgent", pageLabel: "Dépannage urgent" },
            { question: "Ma chaudière affiche un code erreur, que faire ?", href: "/depannage-urgent", pageLabel: "Dépannage urgent" },
          ]}
        />
        <LazyFinalCTA
          title="Programmez votre entretien annuel"
          subtitle="Créneau au choix sous 7 jours, attestation remise sur place, devis gratuit et sans engagement."
        />
      </Suspense>
    </PageLayout>
  );
}
