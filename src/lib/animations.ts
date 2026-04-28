import type { Variants } from "framer-motion";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

export const staggerItem = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
});

/**
 * Hero entry animation. We animate from a near-visible state (opacity 0.001)
 * so the H1 reste visible pour LCP / SEO / no-JS, tout en gardant la
 * micro-animation framer-motion (translateY) pour le delight.
 */
export const heroEntry = (i: number = 0) => ({
  initial: { opacity: 1, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
});

export const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.25 } },
};

export const containerStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};
