import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/animations";
import FAQMeshSection from "@/components/FAQMeshSection";

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQMeshLink {
  question: string;
  href: string;
  pageLabel: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  injectSchema?: boolean;
  meshLinks?: FAQMeshLink[];
}

const FAQSection = ({ title = "Questions fréquentes", subtitle, faqs, injectSchema = true, meshLinks }: FAQSectionProps) => {
  useEffect(() => {
    if (!injectSchema || typeof document === "undefined") return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-faq-schema", "");
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [faqs, injectSchema]);

  return (
    <section className="py-16 md:py-20 bg-section-gradient">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="accentSoft" className="mb-3">FAQ</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </motion.div>

        <motion.div {...fadeUp} className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl border border-border px-5 card-shadow data-[state=open]:border-accent/40 data-[state=open]:shadow-md transition-smooth"
              >
                <AccordionTrigger className="text-left font-display font-bold text-foreground hover:text-accent text-base py-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-sm" data-speakable>
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {meshLinks && meshLinks.length > 0 && (
            <FAQMeshSection links={meshLinks} embedded />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
