import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { content } from "@/data/content";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * FloatingCTA — Bulle d'appel flottante (bottom-right)
 *
 * Un seul bouton :
 *  - Mobile : ouvre tel: (appel direct)
 *  - Desktop : ouvre WhatsApp (chat)
 *
 * Se masque quand le footer entre dans le viewport.
 */
const FloatingCTA = () => {
  const isMobile = useIsMobile();
  const [hidden, setHidden] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(16);

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

  const callHref = isMobile
    ? `tel:${content.company.contact.mobileRaw}`
    : content.company.contact.whatsappUrl;
  const callAriaLabel = isMobile
    ? `Appeler ${content.company.name} au ${content.company.contact.phoneMobile}`
    : `Écrire sur WhatsApp à ${content.company.name}`;
  const Icon = isMobile ? Phone : MessageCircle;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.a
          href={callHref}
          {...(!isMobile && { target: "_blank", rel: "noopener noreferrer" })}
          aria-label={callAriaLabel}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ bottom: `${bottomOffset}px` }}
          className="fixed right-4 z-40 md:right-6 print:hidden flex h-14 w-14 items-center justify-center rounded-full bg-flame-gradient text-secondary-foreground shadow-floating ring-1 ring-primary/10 transition-spring hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background animate-pulse-ring"
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
