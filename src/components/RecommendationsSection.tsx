import { motion } from "framer-motion";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerItem } from "@/lib/animations";

export interface Recommendation {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface RecommendationsSectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  recommendations: Recommendation[];
}

const RecommendationsSection = ({
  eyebrow = "Nos recommandations",
  title,
  subtitle,
  image,
  imageAlt,
  recommendations,
}: RecommendationsSectionProps) => {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image à gauche */}
          <motion.div
            {...fadeUp}
            className="relative order-1"
          >
            <div className="relative rounded-2xl overflow-hidden card-shadow ring-1 ring-border">
              <img
                src={image}
                alt={imageAlt}
                width={1280}
                height={960}
                loading="lazy"
                decoding="async"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Décor */}
            <div className="hidden md:block absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-accent/10 -z-10" />
            <div className="hidden md:block absolute -top-4 -right-4 w-20 h-20 rounded-full bg-accent/15 -z-10" />
          </motion.div>

          {/* Contenu à droite */}
          <div className="order-2">
            <motion.div {...fadeUp} className="mb-8">
              <Badge variant="accentSoft" className="mb-3">
                {eyebrow}
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                {title}
              </h2>
              {subtitle && (
                <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
              )}
            </motion.div>

            <ul className="space-y-5">
              {recommendations.map((rec, i) => {
                const Icon = rec.icon ?? CheckCircle2;
                return (
                  <motion.li
                    key={i}
                    {...staggerItem(i)}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-smooth">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-1">
                        {rec.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
