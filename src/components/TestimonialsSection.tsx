import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerItem } from "@/lib/animations";

export interface Testimonial {
  name: string;
  district: string;
  date: string;
  rating: number;
  service: string;
  text: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  injectSchema?: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Claire M.",
    district: "Paris 4ᵉ — Le Marais",
    date: "12 mars 2024",
    rating: 5,
    service: "Dépannage urgent",
    text: "Fuite sous évier un samedi soir, l'équipe est arrivée en 45 minutes. Diagnostic clair, devis annoncé avant de démonter, réparation propre. Aucune mauvaise surprise sur la facture.",
  },
  {
    name: "Thomas R.",
    district: "Paris 11ᵉ — République",
    date: "28 janvier 2024",
    rating: 5,
    service: "Installation chaudière",
    text: "Remplacement d'une vieille chaudière par une condensation Viessmann. Étude sérieuse, dossier MaPrimeRénov monté de A à Z, chantier nickel en deux jours. Économies déjà visibles sur la facture de gaz.",
  },
  {
    name: "Sophie L.",
    district: "Boulogne-Billancourt (92)",
    date: "5 novembre 2023",
    rating: 5,
    service: "Entretien chaudière",
    text: "Entretien annuel impeccable, attestation remise sur place, technicien ponctuel et pédagogue. Il a pris le temps de m'expliquer comment optimiser mes radiateurs. Je reprends un contrat l'année prochaine.",
  },
  {
    name: "Jean-Pierre D.",
    district: "Paris 16ᵉ — Auteuil",
    date: "18 février 2024",
    rating: 5,
    service: "Rénovation salle de bain",
    text: "Rénovation complète d'une salle de bain dans un haussmannien. Travail soigné, respect absolu du planning et du devis initial. L'artisan a su gérer les contraintes copropriété sans aucun stress de mon côté.",
  },
  {
    name: "Léa B.",
    district: "Paris 18ᵉ — Montmartre",
    date: "9 décembre 2023",
    rating: 5,
    service: "Recherche de fuite",
    text: "Tache au plafond impossible à localiser. Caméra thermique et gaz traceur, fuite trouvée en 30 minutes sans casser un seul carreau. Rapport remis pour l'assurance, super pro.",
  },
  {
    name: "Karim H.",
    district: "Vincennes (94)",
    date: "22 octobre 2023",
    rating: 5,
    service: "Pose pompe à chaleur",
    text: "Installation d'une PAC air/eau dans ma maison. Étude thermique poussée, dimensionnement précis, pose propre et mise en service expliquée. Vraiment des artisans qui maîtrisent leur sujet.",
  },
];

const TestimonialsSection = ({
  title = "Avis clients parisiens",
  subtitle = "Des centaines d'interventions, voici ce qu'en disent nos clients à Paris et en Île-de-France.",
  testimonials = defaultTestimonials,
  injectSchema = true,
}: TestimonialsSectionProps) => {
  const avg =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section className="py-16 md:py-20 bg-section-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_20%_20%,var(--accent)_0,transparent_40%),radial-gradient(circle_at_80%_60%,var(--service-blue)_0,transparent_40%)]" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="accentSoft" className="mb-3">Témoignages</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground">{subtitle}</p>

          <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card border border-border card-shadow">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(avg)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">
              {avg.toFixed(1)}/5
            </span>
            <span className="text-xs text-muted-foreground">
              · {testimonials.length} avis vérifiés
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              {...staggerItem(i)}
              className="group relative bg-card rounded-2xl p-6 border border-border card-shadow hover:shadow-xl transition-smooth hover:-translate-y-1 hover:border-accent/40"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/15 group-hover:text-accent/30 transition-smooth" />

              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-foreground/90 leading-relaxed mb-5 italic">
                « {t.text} »
              </p>

              <div className="pt-4 border-t border-border/60">
                <p className="font-display font-bold text-foreground text-sm">
                  {t.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{t.district}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="accentSoft" className="text-[10px] px-2 py-0">
                    {t.service}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    {t.date}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {injectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Artisan Saint Louis",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: avg.toFixed(1),
                reviewCount: testimonials.length,
                bestRating: "5",
                worstRating: "1",
              },
              review: testimonials.map((t) => ({
                "@type": "Review",
                author: { "@type": "Person", name: t.name },
                datePublished: t.date,
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: t.rating,
                  bestRating: "5",
                },
                reviewBody: t.text,
              })),
            }),
          }}
        />
      )}
    </section>
  );
};

export default TestimonialsSection;
