import { motion, AnimatePresence } from "framer-motion";
import { Phone, FileText, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { content } from "@/data/content";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * FloatingCTA — Bulle téléphone flottante (bottom-right)
 *
 * Affiche par défaut une simple pastille ronde avec une icône téléphone.
 * Au clic, elle s'ouvre et révèle deux actions :
 *  1. "Appeler" : ouvre tel: sur mobile, WhatsApp sur desktop.
 *  2. "Devis gratuit" : scroll vers la section #devis.
 *
 * Comportement :
 *  - Se masque quand le footer entre dans le viewport.
 *  - Fermeture au clic extérieur ou touche Échap.
 */
const FloatingCTA = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(16);
  const containerRef = useRef<HTMLDivElement>(null);

  // Position dynamique pour éviter le footer
  useEffect(() => {
    if (typeof window === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;

    const baseOffset = window.matchMedia("(min-width: 768px)").matches ? 24 : 16;

    const compute = () => {
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      setHidden(rect.top < vh * 0.65);
      setBottomOffset(baseOffset + visible);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(compute);
      ro.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      ro?.disconnect();
    };
  }, []);

  // Fermeture au clic extérieur + Échap
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const scrollToDevis = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (pathname !== "/") {
      // Cible absente sur cette page : on ramène l'utilisateur au formulaire
      // de la home, useHashScroll fera défiler une fois la page rendue.
      navigate({ to: "/", hash: "devis" });
      return;
    }
    const el = document.getElementById("devis");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const callHref = isMobile
    ? `tel:${content.company.contact.mobileRaw}`
    : content.company.contact.whatsappUrl;
  const callLabel = isMobile ? "Appeler" : "WhatsApp";
  const callAriaLabel = isMobile
    ? `Appeler ${content.company.name} au ${content.company.contact.phoneMobile}`
    : `Écrire sur WhatsApp à ${content.company.name}`;
  const CallIcon = isMobile ? Phone : MessageCircle;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ bottom: `${bottomOffset}px` }}
          className="fixed right-4 z-40 md:right-6 print:hidden"
          role="region"
          aria-label="Actions rapides de contact"
        >
          <div className="flex flex-col items-end gap-2">
            {/* Actions révélées */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-end gap-2"
                >
                  {/* Action 1 : Appel / WhatsApp */}
                  <a
                    href={callHref}
                    {...(!isMobile && { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={callAriaLabel}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-bold text-sm shadow-floating transition-spring hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                      isMobile
                        ? "bg-flame-gradient text-secondary-foreground focus-visible:ring-secondary"
                        : "bg-[#25D366] text-white focus-visible:ring-[#25D366]"
                    }`}
                  >
                    <CallIcon className="h-4 w-4" aria-hidden="true" />
                    <span>{callLabel}</span>
                  </a>

                  {/* Action 2 : Devis gratuit */}
                  <a
                    href="#devis"
                    onClick={scrollToDevis}
                    aria-label="Demander un devis gratuit"
                    className="flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-4 py-2.5 font-bold text-sm shadow-floating transition-spring hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                  >
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    <span>Devis gratuit</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bulle principale : icône téléphone */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="menu"
              aria-label={open ? "Fermer les actions de contact" : "Ouvrir les actions de contact"}
              className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-flame-gradient text-secondary-foreground shadow-floating ring-1 ring-primary/10 transition-spring hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                open ? "" : "animate-pulse-ring"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="phone"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
