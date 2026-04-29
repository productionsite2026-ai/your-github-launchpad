import { motion } from "framer-motion";
import { LucideIcon, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import ResponsiveImage from "@/components/ResponsiveImage";

export interface ServiceCard {
  icon: LucideIcon;
  badge: string;
  badgeVariant: "serviceBlue" | "serviceCyan" | "serviceOrange" | "serviceEmerald" | "serviceRose" | "serviceViolet" | "serviceAmber";
  title: string;
  description: string;
  features: string[];
  image?: string;
  imageAlt?: string;
  stat?: { value: string; label: string };
}

interface ServicesGridProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  services: ServiceCard[];
  ctaLabel?: string;
}

const ServicesGrid = ({ eyebrow, title, subtitle, services, ctaLabel = "Demander un devis" }: ServicesGridProps) => {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          {eyebrow && <Badge variant="accentSoft" className="mb-3">{eyebrow}</Badge>}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => {
            const Icon = s.icon;
            const glowColor = `var(--service-${s.badgeVariant.replace("service", "").toLowerCase()})`;
            return (
              <motion.article
                key={s.title}
                {...staggerItem(i)}
                whileHover={{ y: -8 }}
                className="group relative bg-section-gradient rounded-2xl overflow-hidden border border-border card-shadow transition-spring flex flex-col"
                style={{ ["--glow" as string]: glowColor }}
              >
                {/* Glow coloré au survol (selon le service) */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none -z-10"
                  style={{ boxShadow: `0 22px 60px -18px ${glowColor}` }}
                  aria-hidden="true"
                />
                {s.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <ResponsiveImage
                      src={s.image}
                      alt={s.imageAlt || s.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="w-full h-full object-cover transition-spring group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-foreground/5 pointer-events-none" />
                    {/* Liseré coloré */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1 opacity-80"
                      style={{ background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)` }}
                      aria-hidden="true"
                    />
                    <Badge
                      variant={s.badgeVariant}
                      className="absolute top-3 left-3 z-10 px-2.5 py-1 gap-1.5 shadow-lg font-bold text-xs"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {s.badge}
                    </Badge>
                    {s.stat && (
                      <div className="absolute bottom-3 right-3 z-10 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border shadow-lg transition-smooth group-hover:-translate-y-1">
                        <div className="font-display font-bold text-base leading-none" style={{ color: glowColor }}>{s.stat.value}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5 font-semibold">{s.stat.label}</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {!s.image && (
                    <Badge variant={s.badgeVariant} className="self-start mb-4 px-2.5 py-1">
                      <Icon className="h-3.5 w-3.5" />
                      {s.badge}
                    </Badge>
                  )}
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1" data-speakable>
                    {s.description}
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="accent-outline" size="sm" asChild className="w-full mt-auto">
                    <Link to="/" hash="devis">{ctaLabel}</Link>
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
