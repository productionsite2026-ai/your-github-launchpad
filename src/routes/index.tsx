import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/data/content";
import { Suspense } from "react";
import { Wrench, Flame, ShieldCheck, Clock, Award, Sparkles, Droplets, AlertTriangle, ThermometerSun, Hammer, Phone, Euro, Users, BadgeCheck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import HeroWithForm from "@/components/HeroWithForm";
import QuickAnswer from "@/components/QuickAnswer";
import ServicesGrid, { type ServiceCard } from "@/components/ServicesGrid";
import UseCasesSection from "@/components/UseCasesSection";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import {
  LazyExpertiseSection,
  LazyProcessSection,
  LazyRecommendationsSection,
  LazyTestimonialsSection,
  LazyFAQSection,
  LazyFinalCTA,
} from "@/components/LazySections";

const SectionFallback = ({ minHeight = 320 }: { minHeight?: number }) => (
  <div aria-hidden="true" style={{ minHeight }} />
);

import heroAccueil from "@/assets/hero-accueil-paris.webp";
import ogImage from "@/assets/og-image.webp";
import recommendAccueil from "@/assets/recommend-accueil.jpg";
import imgInstall from "@/assets/home-card-installation.webp";
import imgDepannage from "@/assets/card-fuite-evier.webp";
import imgEntretien from "@/assets/home-card-entretien.webp";
import imgChaudierePanne from "@/assets/home-urgent-chaudiere.webp";
import imgFuite from "@/assets/home-urgent-fuite.webp";
import imgDebouchage from "@/assets/card-debouchage.webp";
import imgWc from "@/assets/card-wc-suspendu.webp";
import imgPac from "@/assets/card-pompe-chaleur-facade.webp";
import imgPlancher from "@/assets/card-plancher-chauffant.webp";
import imgRadiateur from "@/assets/card-radiateur-thermostat.webp";

const SITE_URL = "https://artisan-saintlouis.fr";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plombier & Chauffagiste à Paris 7j/7 — Artisan Saint Louis" },
      { name: "description", content: "Artisan plombier et chauffagiste à Paris et Île-de-France. Dépannage 7j/7, installation, entretien chaudière. Devis Gratuit." },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { property: "og:title", content: "Artisan Saint Louis — Plombier chauffagiste Paris IDF" },
      { property: "og:description", content: "Dépannage 7j/7, installation et entretien à Paris et Île-de-France. Devis gratuit." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}${ogImage}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Artisan Saint Louis — plombier chauffagiste à Paris" },
      { name: "twitter:image", content: `${SITE_URL}${ogImage}` },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: heroAccueil, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Artisan Saint Louis",
          url: SITE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
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
              name: "Installation & rénovation plomberie chauffage Paris",
              description:
                "Pose et rénovation chaudière condensation, pompe à chaleur, plancher chauffant, salle de bain par artisan RGE à Paris et IDF. Devis détaillé sous 48h.",
              serviceType: "Installation plomberie chauffage",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Devis gratuit, accompagnement aides MaPrimeRénov" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Dépannage plomberie chauffage 7j/7 Paris",
              description:
                "Intervention urgence fuite, débouchage, panne chaudière en moins de 60 minutes dans Paris intra-muros, 24h/24 et 7j/7.",
              serviceType: "Dépannage plomberie chauffage",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Conditions annoncées avant déplacement" },
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Entretien chaudière annuel obligatoire Paris",
              description:
                "Entretien annuel chaudière gaz, granulés, fioul ou pompe à chaleur conformément à l'arrêté du 15/09/2009. Attestation légale remise immédiatement.",
              serviceType: "Entretien chaudière",
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: [
                { "@type": "City", name: "Paris" },
                { "@type": "AdministrativeArea", name: "Île-de-France" },
              ],
              offers: { "@type": "Offer", description: "Contrat maintenance disponible" },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Plombier & Chauffagiste à Paris 7j/7 — Artisan Saint Louis",
          url: `${SITE_URL}/`,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: ["h1", "[data-speakable]"],
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

const homeServices: ServiceCard[] = [
  {
    icon: Hammer,
    badge: "Installation",
    badgeVariant: "serviceBlue",
    title: "Installation & Rénovation",
    description: "Salle de bain, chaudière, pompe à chaleur, plancher chauffant. Pose neuve ou rénovation complète.",
    features: ["Devis détaillé gratuit", "Matériel garanti", "Artisans qualifiés RGE"],
    image: imgInstall,
    imageAlt: "Plombier d'Artisan Saint Louis posant une chaudière gaz à condensation murale dans une cuisine d'appartement parisien, raccordement cuivre en cours",
    stat: { value: "+450", label: "chantiers / an" },
  },
  {
    icon: AlertTriangle,
    badge: "Dépannage 7j/7",
    badgeVariant: "serviceOrange",
    title: "Dépannage urgent",
    description: "Fuite, débouchage, panne chaudière, plus d'eau chaude. Intervention rapide à Paris et IDF.",
    features: ["Intervention sous 1h", "7j/7 — 24h/24", "Diagnostic transparent"],
    image: imgDepannage,
    imageAlt: "Intervention de dépannage plomberie sur une fuite sous évier de cuisine à Paris, remplacement du flexible et du siphon",
    stat: { value: "<60min", label: "Paris intra-muros" },
  },
  {
    icon: ShieldCheck,
    badge: "Entretien",
    badgeVariant: "serviceEmerald",
    title: "Entretien & Maintenance",
    description: "Entretien annuel chaudière obligatoire, contrat maintenance, attestation fournie immédiatement.",
    features: ["Attestation légale remise", "Devis clair sans surprise", "Contrôle 22 points"],
    image: imgEntretien,
    imageAlt: "Technicien chauffagiste réalisant l'entretien annuel obligatoire d'une chaudière gaz murale, capot ouvert et analyseur de combustion en main",
    stat: { value: "22 pts", label: "de contrôle" },
  },
];

const useCases = [
  { title: "Fuite d'eau visible", description: "Sous évier, WC, ballon ou chauffe-eau : nous coupons et réparons.", urgent: true, image: imgFuite, imageAlt: "Fuite d'eau urgente sous un évier la nuit, plombier inspectant le siphon et le flexible mouillé à la lampe torche", badge: "Urgence" },
  { title: "Canalisation bouchée", description: "Évier, douche, WC : débouchage mécanique ou hydrocurage.", urgent: true, image: imgDebouchage, imageAlt: "Débouchage de canalisation extérieure à Paris par camion hydrocureur haute pression" },
  { title: "WC bouché ou cassé", description: "Remplacement WC suspendu, broyeur, chasse d'eau défectueuse.", image: imgWc, imageAlt: "Pose d'un WC suspendu sur bâti-support dans une salle de bain rénovée à Paris" },
  { title: "Chaudière en panne", description: "Mise en sécurité, code erreur, plus d'eau chaude : diagnostic immédiat.", urgent: true, image: imgChaudierePanne, imageAlt: "Chaudière gaz murale affichant un code erreur rouge, dépanneur testant la carte électronique au multimètre", badge: "Urgence" },
  { title: "Pose pompe à chaleur", description: "Étude thermique, dimensionnement et installation PAC air/eau.", image: imgPac, imageAlt: "Unité extérieure de pompe à chaleur air/eau installée en façade d'un pavillon en Île-de-France" },
  { title: "Radiateurs froids", description: "Purge, équilibrage hydraulique, remplacement de robinets thermostatiques.", image: imgRadiateur, imageAlt: "Radiateur en fonte avec robinet thermostatique neuf en cours de réglage par un chauffagiste" },
];

const faqs = [
  { q: "Sous combien de temps intervenez-vous en urgence à Paris ?", a: "Pour Paris intra-muros (1er, 7e, 8e, 15e, 16e, 17e arrondissements et au-delà), notre délai moyen est inférieur à 60 minutes en journée et environ 90 minutes la nuit. En proche banlieue (Boulogne-Billancourt, Levallois-Perret, Neuilly-sur-Seine, Saint-Cloud), comptez 60 à 120 minutes selon la zone et le trafic." },
  { q: "Êtes-vous disponibles le week-end et les jours fériés ?", a: "Oui, notre service de dépannage urgence fuite, gaz et chauffage est joignable 7j/7 et 24h/24, week-ends et jours fériés inclus, sans surprise." },
  { q: "Le devis est-il vraiment gratuit ?", a: "Oui, le devis est entièrement gratuit et sans engagement, pour toute installation, rénovation, entretien comme pour un dépannage. Les conditions d'intervention vous sont systématiquement communiquées et validées avec vous avant tout déplacement." },
  { q: "Travaillez-vous en banlieue parisienne ?", a: "Oui, nous intervenons dans les Hauts-de-Seine (92 — Boulogne, Levallois, Issy-les-Moulineaux, Neuilly), Seine-Saint-Denis (93), Val-de-Marne (94 — Vincennes, Charenton), Yvelines (78 — Versailles, Saint-Germain-en-Laye), Essonne (91), Val-d'Oise (95) et Seine-et-Marne (77)." },
  { q: "L'entretien annuel de chaudière est-il obligatoire ?", a: "Oui, depuis 2009, l'entretien annuel des chaudières gaz, fioul et bois entre 4 et 400 kW est obligatoire en France. Nous remettons l'attestation légale immédiatement après l'intervention, valable pour votre assurance habitation et votre bailleur." },
  { q: "Combien coûte un entretien chaudière gaz à Paris ?", a: "Le tarif d'un entretien annuel de chaudière gaz murale à Paris se situe en général entre 90 € et 160 € TTC selon la marque (Saunier Duval, Frisquet, De Dietrich, Viessmann, Atlantic) et l'accessibilité. Le détail vous est communiqué sur simple appel, déplacement et attestation inclus." },
  { q: "Quelles aides pour remplacer une vieille chaudière en 2025 ?", a: "MaPrimeRénov', Coup de Pouce Chauffage, TVA à 5,5 %, éco-PTZ et Certificats d'Économies d'Énergie (CEE) se cumulent. Pour une pompe à chaleur ou une chaudière à granulés, ces aides couvrent souvent 40 à 80 % de l'investissement selon vos revenus. Nous montons les dossiers." },
];

function HomePage() {
  return (
    <PageLayout>
      <HeroWithForm
        badge={{ label: "Plombier & chauffagiste — Paris IDF", icon: <Sparkles className="h-3.5 w-3.5" /> }}
        h1={
          <>
            Artisan plombier <span className="text-accent">& chauffagiste</span><br />
            à Paris & Île-de-France
          </>
        }
        hook="Dépannage 7j/7, installation et entretien. Devis gratuit et sans engagement."
        trustBadges={[
          { label: "7j/7 — 24h/24", variant: "serviceOrange", icon: <Clock className="h-3 w-3" /> },
          { label: "Devis gratuit & sans engagement", variant: "serviceEmerald", icon: <ShieldCheck className="h-3 w-3" /> },
          { label: "Artisan local", variant: "serviceBlue", icon: <Award className="h-3 w-3" /> },
        ]}
        backgroundImage={heroAccueil}
        backgroundImageAlt="Plombier chauffagiste Artisan Saint Louis intervenant à Paris"
      />

      <QuickAnswer
        question="Comment obtenir un plombier chauffagiste rapidement à Paris ?"
        answer={`Appelez le ${content.company.contact.phone} ou remplissez notre formulaire en 60 secondes. Nous vous rappelons sous 15 minutes avec un créneau ferme et un devis personnalisé. Intervention en moins d\'une heure dans Paris intra-muros pour les urgences.`}
      />

      <ServicesGrid
        eyebrow="Nos prestations"
        title="3 métiers, une exigence : du travail bien fait"
        subtitle="Plomberie et chauffage, du dépannage minute à la rénovation complète, pour particuliers et copropriétés."
        services={homeServices}
      />

      <SectionErrorBoundary name="Expertise">
        <Suspense fallback={<SectionFallback />}>
          <LazyExpertiseSection />
        </Suspense>
      </SectionErrorBoundary>

      <UseCasesSection
        title="Dans quels cas nous appeler ?"
        subtitle="Identifiez votre situation pour obtenir la bonne intervention au bon moment."
        cases={useCases}
      />

      <SectionErrorBoundary name="Process">
        <Suspense fallback={<SectionFallback />}>
          <LazyProcessSection />
        </Suspense>
      </SectionErrorBoundary>

      <SectionErrorBoundary name="Recommendations">
        <Suspense fallback={<SectionFallback />}>
          <LazyRecommendationsSection
            eyebrow="Pourquoi nous choisir"
            title="4 bonnes raisons de confier votre projet à Artisan Saint Louis"
            subtitle="Un artisan local de proximité, transparent sur ses prix et reconnu par ses clients parisiens."
            image={recommendAccueil}
            imageAlt="Artisan plombier chauffagiste Saint Louis devant un immeuble haussmannien parisien"
            recommendations={[
              { icon: Phone, title: "Réponse en moins de 15 minutes", description: "Standard joignable 7j/7. Un artisan qualifié vous rappelle, qualifie le besoin et propose un créneau ferme." },
              { icon: Euro, title: "Devis gratuit & sans engagement", description: "Conditions d'intervention annoncées avant tout déplacement. Aucune surprise sur la facture finale." },
              { icon: BadgeCheck, title: "Artisan local & qualifié", description: "Garantie décennale, qualification RGE, assurance professionnelle. Un référent unique de l'appel à la garantie." },
              { icon: Users, title: "+1200 clients satisfaits / an", description: "Particuliers, copropriétés, syndics : note moyenne 4,9/5 sur Google. Avis vérifiés à Paris et IDF." },
            ]}
          />
        </Suspense>
      </SectionErrorBoundary>

      <SectionErrorBoundary name="Testimonials">
        <Suspense fallback={<SectionFallback />}>
          <LazyTestimonialsSection />
        </Suspense>
      </SectionErrorBoundary>

      <SectionErrorBoundary name="FAQ">
        <Suspense fallback={<SectionFallback />}>
          <LazyFAQSection
            title="Vos questions, nos réponses"
            subtitle="Tout ce qu'il faut savoir avant de nous confier votre intervention."
            faqs={faqs}
            meshLinks={[
              { question: "Quel est le délai d'intervention en urgence à Paris ?", href: "/depannage-urgent", pageLabel: "Dépannage urgent" },
              { question: "Quelles aides financières pour remplacer ma chaudière en 2025 ?", href: "/installation-renovation", pageLabel: "Installation & rénovation" },
              { question: "L'entretien annuel d'une chaudière est-il vraiment obligatoire ?", href: "/entretien-maintenance", pageLabel: "Entretien & maintenance" },
              { question: "Combien coûte un entretien chaudière gaz à Paris ?", href: "/entretien-maintenance", pageLabel: "Entretien & maintenance" },
            ]}
          />
        </Suspense>
      </SectionErrorBoundary>

      <SectionErrorBoundary name="FinalCTA">
        <Suspense fallback={<SectionFallback minHeight={200} />}>
          <LazyFinalCTA />
        </Suspense>
      </SectionErrorBoundary>
    </PageLayout>
  );
}
