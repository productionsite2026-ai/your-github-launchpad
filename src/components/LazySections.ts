import { lazy } from "react";

/**
 * Sections below-the-fold lazy-loaded.
 * Permet de réduire le JS initial et améliorer LCP/TTI.
 * Chaque section est isolée dans son propre chunk via React.lazy().
 *
 * Usage : <Suspense fallback={null}><LazyTestimonialsSection /></Suspense>
 */

export const LazyExpertiseSection = lazy(() => import("@/components/ExpertiseSection"));
export const LazyProcessSection = lazy(() => import("@/components/ProcessSection"));
export const LazyRecommendationsSection = lazy(() => import("@/components/RecommendationsSection"));
export const LazyTestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
export const LazyFAQSection = lazy(() => import("@/components/FAQSection"));
export const LazyFinalCTA = lazy(() => import("@/components/FinalCTA"));
