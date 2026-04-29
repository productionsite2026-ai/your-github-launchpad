import { motion } from "framer-motion";
import { Phone, ClipboardCheck, Wrench, ShieldCheck, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerItem } from "@/lib/animations";

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    icon: Phone,
    title: "Vous nous contactez",
    description:
      "Appel ou formulaire en 60 secondes. Un artisan qualifié vous répond, qualifie le besoin et propose un créneau ferme.",
    duration: "Sous 15 min",
  },
  {
    icon: ClipboardCheck,
    title: "Diagnostic & devis",
    description:
      "Visite technique ou diagnostic téléphonique selon le cas. Devis détaillé et transparent communiqué avant tout démarrage des travaux.",
    duration: "Gratuit",
  },
  {
    icon: Wrench,
    title: "Intervention propre",
    description:
      "Artisan unique, matériel de qualité, chantier protégé et nettoyé. Respect absolu du planning et du devis signé.",
    duration: "Planning ferme",
  },
  {
    icon: ShieldCheck,
    title: "Garantie & suivi",
    description:
      "Attestation, facture détaillée, garantie et SAV réactif. Un référent unique reste joignable après chantier.",
    duration: "Garantie",
  },
];

const ProcessSection = ({
  eyebrow = "Notre méthode",
  title = "Comment ça marche ?",
  subtitle = "Quatre étapes simples, transparentes et tenues, du premier appel à la garantie.",
  steps = defaultSteps,
}: ProcessSectionProps) => {
  return (
    <section className="py-16 md:py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(circle_at_50%_0,var(--accent)_0,transparent_50%)]" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="accentSoft" className="mb-3">{eyebrow}</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Connector line on lg+ */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                {...staggerItem(i)}
                className="relative group"
              >
                <div className="relative bg-background rounded-2xl p-6 pt-8 border border-border card-shadow hover:shadow-xl transition-smooth hover:-translate-y-1 hover:border-accent/40 h-full flex flex-col items-center text-center">
                  {/* Step number bubble */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/70 text-white font-display font-bold text-sm flex items-center justify-center shadow-lg ring-4 ring-card">
                    {i + 1}
                  </div>

                  <div className="mt-2 mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-smooth">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {step.duration && (
                    <Badge variant="accentSoft" className="text-[10px] mt-auto">
                      {step.duration}
                    </Badge>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
