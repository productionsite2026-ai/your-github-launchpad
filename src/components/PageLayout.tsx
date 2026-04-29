import { ReactNode, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import { useHashScroll } from "@/hooks/use-hash-scroll";

// Below-the-fold : lazy-loaded pour réduire le JS initial.
const Footer = lazy(() => import("@/components/Footer"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  useHashScroll();

  return (
    <main id="main-content" className="relative">
      <Navbar />
      <motion.div
        key={pathname}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      <SectionErrorBoundary name="Footer">
        <Suspense fallback={<div aria-hidden="true" className="min-h-[280px]" />}>
          <Footer />
        </Suspense>
      </SectionErrorBoundary>
      <SectionErrorBoundary name="FloatingCTA" fallback={null}>
        <Suspense fallback={null}>
          <FloatingCTA />
        </Suspense>
      </SectionErrorBoundary>
    </main>
  );
};

export default PageLayout;
