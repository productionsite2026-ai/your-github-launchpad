import { motion } from "framer-motion";
import { Phone, FileText, AlertTriangle, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { content } from "@/data/content";
import { fadeUp } from "@/lib/animations";

interface FinalCTAProps {
  title?: string;
  subtitle?: string;
}

const FinalCTA = ({
  title = "Un projet, une panne, un doute ?",
  subtitle = "Contactez votre artisan local : devis gratuit et sans engagement, conseil honnête, intervention rapide.",
}: FinalCTAProps) => {
  return (
    <section className="py-16 md:py-20 bg-hero-gradient animate-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-water-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/25 blur-3xl rounded-full animate-blob" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-secondary/20 blur-3xl rounded-full animate-blob-slow" />

      <motion.div {...fadeUp} className="container mx-auto px-4 relative text-center max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-base md:text-lg text-primary-foreground/85 mb-8 leading-relaxed">{subtitle}</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <Button size="xl" variant="accent" asChild className="gap-2 shadow-floating">
            <a
              href={`tel:${content.company.contact.mobileRaw}`}
              aria-label={`Appeler ${content.company.name} au ${content.company.contact.phoneMobile}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" /> {content.company.contact.phoneMobile}
            </a>
          </Button>
          <Button size="xl" asChild className="gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white shadow-floating">
            <a
              href={content.company.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Écrire sur WhatsApp à ${content.company.name} au ${content.company.contact.phoneMobile}`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
            </a>
          </Button>
          <Button size="xl" variant="accent-outline" asChild className="gap-2 bg-card/10 backdrop-blur-sm text-primary-foreground border-primary-foreground/40 hover:bg-card hover:text-foreground">
            <Link to="/" hash="devis">
              <FileText className="h-5 w-5" aria-hidden="true" /> Devis en 60 secondes
            </Link>
          </Button>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-semibold">
          <AlertTriangle className="h-4 w-4" />
          Urgence fuite, gaz ou chauffage : nous décrochons 7j/7 24h/24
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
