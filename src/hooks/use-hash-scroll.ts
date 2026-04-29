import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * useHashScroll
 *
 * Garantit que les ancres (#devis, #main-content, etc.) scrollent vers
 * la bonne section, même quand :
 *  - la cible est rendue après hydratation (sections lazy-loaded),
 *  - on arrive depuis une autre page via un lien `/#hash`,
 *  - le HMR a re-monté l'arbre.
 *
 * Mécanisme : on observe le hash courant et on tente de scroller jusqu'à
 * 20 fois (200 ms entre chaque essai) pour laisser le temps aux Suspense
 * de résoudre. Si la cible n'apparaît jamais, on abandonne silencieusement
 * (au lieu de finir par défaut au footer).
 */
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = (hash || window.location.hash || "").replace(/^#/, "");
    if (!raw) return;

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(raw);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(tryScroll, 200);
      }
    };

    // Premier essai après un tick pour laisser le DOM se peindre.
    window.setTimeout(tryScroll, 50);

    return () => {
      cancelled = true;
    };
  }, [hash]);
}
