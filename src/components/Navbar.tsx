import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Menu, X, Phone, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { content, navLinks } from "@/data/content";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const callHref = isMobile
    ? `tel:${content.company.contact.mobileRaw}`
    : content.company.contact.whatsappUrl;
  const callAriaLabel = isMobile
    ? `Appeler Artisan Saint Louis au ${content.company.contact.phoneMobile}`
    : `Écrire sur WhatsApp à Artisan Saint Louis au ${content.company.contact.phoneMobile}`;
  const callExternal = !isMobile;
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 110, damping: 22, restDelta: 0.001 });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-card/80 backdrop-blur-sm"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Aller au contenu principal
      </a>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 max-w-7xl">
        <Link to="/" className="flex items-center gap-2 font-display font-extrabold text-lg text-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient shadow-elegant">
            <Droplets className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="leading-tight">
            Artisan <span className="text-accent">Saint Louis</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              activeOptions={{ exact: true }}
              className="text-sm font-medium transition-smooth relative text-muted-foreground hover:text-primary data-[status=active]:text-accent"
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent" />
                  )}
                </>
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button size="sm" variant="accent-outline" asChild className="gap-2">
            <a
              href={`tel:${content.company.contact.mobileRaw}`}
              aria-label={`Appeler Artisan Saint Louis au ${content.company.contact.phoneMobile}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {content.company.contact.phoneMobile}
            </a>
          </Button>
          <Button size="sm" variant="accent" asChild>
            <Link to="/" hash="devis">Devis gratuit</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Barre de progression de scroll (cachée si reduced-motion) */}
      {!reduced && (
        <motion.div
          style={{ scaleX: progressX, transformOrigin: "0% 50%" }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary-glow to-secondary"
          aria-hidden="true"
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  activeOptions={{ exact: true }}
                  className="block py-2.5 text-sm font-medium transition-smooth text-muted-foreground hover:text-primary data-[status=active]:text-accent data-[status=active]:font-semibold"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                <Button size="sm" variant="accent-outline" asChild className="w-full gap-2">
                  <a
                    href={`tel:${content.company.contact.mobileRaw}`}
                    aria-label={`Appeler Artisan Saint Louis au ${content.company.contact.phoneMobile}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" /> {content.company.contact.phoneMobile}
                  </a>
                </Button>
                <Button size="sm" asChild className="w-full gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white">
                  <a
                    href={content.company.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Écrire sur WhatsApp à Artisan Saint Louis au ${content.company.contact.phoneMobile}`}
                  >
                    WhatsApp
                  </a>
                </Button>
                <Button size="sm" variant="accent" asChild className="w-full">
                  <Link to="/" hash="devis">Devis gratuit</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
