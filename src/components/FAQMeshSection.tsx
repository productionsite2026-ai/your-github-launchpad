import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerItem } from "@/lib/animations";

interface FAQLink {
  question: string;
  href: string;
  pageLabel: string;
}

interface FAQMeshSectionProps {
  links: FAQLink[];
  embedded?: boolean;
}

const FAQMeshSection = ({ links, embedded = false }: FAQMeshSectionProps) => {
  const renderLink = (l: FAQLink, i: number) => (
    <motion.div key={l.href + l.question} {...staggerItem(i)}>
      <Link
        to={l.href as string}
        className="group flex h-full flex-col gap-2 p-4 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-md hover:-translate-y-0.5 transition-smooth"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent flex-shrink-0">
            <HelpCircle className="h-4 w-4" />
          </div>
          <p className="text-[10px] font-semibold text-accent uppercase tracking-wide truncate">
            {l.pageLabel}
          </p>
        </div>
        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-smooth leading-snug flex-1">
          {l.question}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent transition-smooth">
          <span>Voir la réponse</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );

  if (embedded) {
    const cols = Math.min(links.length, 4);
    const colsClass =
      cols === 4 ? "lg:grid-cols-4" : cols === 3 ? "lg:grid-cols-3" : cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";
    return (
      <div className="mt-10 pt-8 border-t border-border/60">
        <motion.div {...fadeUp} className="text-center mb-6">
          <Badge variant="serviceViolet" className="mb-3">Allez plus loin</Badge>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">
            Questions liées sur nos autres expertises
          </h3>
          <p className="text-muted-foreground text-sm">
            Explorez les réponses détaillées sur nos autres pages.
          </p>
        </motion.div>
        <div className={`grid gap-3 sm:grid-cols-2 ${colsClass}`}>
          {links.map(renderLink)}
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 bg-card border-t border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="serviceViolet" className="mb-3">Allez plus loin</Badge>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Questions liées sur nos autres expertises
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {links.map(renderLink)}
        </div>
      </div>
    </section>
  );
};

export default FAQMeshSection;
