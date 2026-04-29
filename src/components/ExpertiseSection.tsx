import { motion } from "framer-motion";
import { Droplets, Flame, CheckCircle2 } from "lucide-react";
import { fadeUp, staggerItem } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";

interface ExpertiseSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

const plomberiePoints = [
  "Recherche de fuite non destructive (caméra thermique, gaz traceur)",
  "Débouchage, hydrocurage et inspection caméra",
  "Pose et rénovation salle de bain, WC suspendu, robinetterie",
  "Mise aux normes réseau eau froide / eau chaude sanitaire",
  "Intervention copropriété avec rapport pour assurance",
];

const chauffagePoints = [
  "Installation chaudière condensation, PAC air/eau, granulés bois",
  "Entretien annuel obligatoire avec attestation immédiate",
  "Désembouage circuit, équilibrage radiateurs, plancher chauffant",
  "Dépannage toutes marques : Viessmann, Frisquet, Saunier Duval, De Dietrich",
  "Accompagnement aides MaPrimeRénov' et CEE",
];

const ExpertiseSection = ({
  eyebrow = "Nos deux expertises",
  title = "Plombier & chauffagiste, deux métiers maîtrisés",
  subtitle = "Une seule équipe, deux savoir-faire complémentaires pour traiter l'ensemble de votre installation eau et chauffage à Paris et en Île-de-France.",
}: ExpertiseSectionProps) => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="serviceBlue" className="mb-3">{eyebrow}</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
          {/* Bloc Plomberie */}
          <motion.article
            {...staggerItem(0)}
            className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 md:p-8 card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-service-cyan/15 text-service-cyan">
                <Droplets className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="serviceCyan" className="mb-1">Plomberie</Badge>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">
                  L'eau, sans fuite ni mauvaise surprise
                </h3>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5" data-speakable>
              De la fuite invisible à la rénovation complète d'une salle de bain haussmannienne, nous
              traitons toute la chaîne : arrivée, distribution, évacuation. Diagnostic clair, pose
              soignée.
            </p>
            <ul className="space-y-2.5 mt-auto">
              {plomberiePoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 text-service-cyan flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          {/* Bloc Chauffage */}
          <motion.article
            {...staggerItem(1)}
            className="relative rounded-2xl overflow-hidden border border-border bg-card p-6 md:p-8 card-shadow hover:card-shadow-hover transition-smooth hover:-translate-y-1 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-service-rose/15 text-service-rose">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="serviceRose" className="mb-1">Chauffage</Badge>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">
                  La chaleur, performante et durable
                </h3>
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5" data-speakable>
              Chaudière nouvelle génération, pompe à chaleur, plancher chauffant : nous dimensionnons
              précisément, installons proprement et entretenons annuellement. Économies réelles,
              confort homogène, conformité légale.
            </p>
            <ul className="space-y-2.5 mt-auto">
              {chauffagePoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 text-service-rose flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
