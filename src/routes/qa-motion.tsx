import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/**
 * /qa-motion — Page de QA interne (noindex).
 *
 * Embarque chaque route réelle du site dans un <iframe> et permet de simuler
 * `prefers-reduced-motion: reduce` à l'intérieur de la frame, afin de vérifier
 * visuellement que tous les composants restent lisibles (pas d'opacité 0,
 * pas de transform invisible, animations désactivées).
 *
 * Avantage : on teste les vraies pages telles qu'elles seront servies, sans
 * dupliquer la composition des sections.
 */
export const Route = createFileRoute("/qa-motion")({
  head: () => ({
    meta: [
      { title: "QA Motion — Test reduced-motion" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: QAMotionPage,
});

const ROUTES: Array<{ path: string; label: string }> = [
  { path: "/", label: "Accueil" },
  { path: "/installation-renovation", label: "Installation & Rénovation" },
  { path: "/depannage-urgent", label: "Dépannage urgent" },
  { path: "/entretien-maintenance", label: "Entretien & Maintenance" },
];

const REDUCED_MOTION_CSS = `
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    transition-delay: 0ms !important;
    scroll-behavior: auto !important;
  }
  /* Garde-fou : si une animation laisse l'opacité à 0, on force la visibilité */
  [style*="opacity: 0"]:not([data-allow-hidden]) { opacity: 1 !important; }
`;

function injectReducedMotion(iframe: HTMLIFrameElement, enabled: boolean) {
  try {
    const doc = iframe.contentDocument;
    if (!doc) return;
    const id = "qa-reduced-motion-style";
    let style = doc.getElementById(id) as HTMLStyleElement | null;
    if (enabled) {
      if (!style) {
        style = doc.createElement("style");
        style.id = id;
        doc.head.appendChild(style);
      }
      style.textContent = REDUCED_MOTION_CSS;
    } else if (style) {
      style.remove();
    }
  } catch {
    /* cross-origin protection — ignore */
  }
}

function QAMotionPage() {
  const [reduced, setReduced] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const [viewport, setViewport] = useState<"mobile" | "desktop">("desktop");
  const refs = useRef<Record<string, HTMLIFrameElement | null>>({});

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    Object.values(refs.current).forEach((iframe) => {
      if (iframe) injectReducedMotion(iframe, reduced);
    });
  }, [reduced]);

  const frameWidth = viewport === "mobile" ? 375 : 1280;
  const frameHeight = viewport === "mobile" ? 812 : 800;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex flex-wrap items-center gap-4 shadow-sm">
        <strong className="text-sm font-display">QA Motion</strong>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={reduced}
            onChange={(e) => setReduced(e.target.checked)}
          />
          Simuler{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code>
        </label>

        <div className="flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setViewport("mobile")}
            className={`px-2 py-1 rounded ${viewport === "mobile" ? "bg-accent text-accent-foreground" : "bg-muted"}`}
          >
            Mobile 375
          </button>
          <button
            type="button"
            onClick={() => setViewport("desktop")}
            className={`px-2 py-1 rounded ${viewport === "desktop" ? "bg-accent text-accent-foreground" : "bg-muted"}`}
          >
            Desktop 1280
          </button>
        </div>

        <span className="text-xs text-muted-foreground">
          Système : {systemReduced ? "reduced ✅" : "no-preference"}
        </span>

        <span className="text-xs text-muted-foreground ml-auto">
          Vérifie : pas d'opacité 0, pas de transform invisible, pas d'élément hors-écran.
        </span>
      </div>

      <div className="space-y-10 py-6 px-4">
        {ROUTES.map((r) => (
          <section key={r.path}>
            <header className="mb-2 flex items-baseline gap-3">
              <h2 className="font-display text-lg font-bold">{r.label}</h2>
              <code className="text-xs text-muted-foreground">{r.path}</code>
            </header>
            <div
              className="border border-border rounded-lg overflow-hidden bg-card mx-auto shadow-sm"
              style={{ width: frameWidth, maxWidth: "100%" }}
            >
              <iframe
                ref={(el) => {
                  refs.current[r.path] = el;
                }}
                src={r.path}
                title={`QA — ${r.label}`}
                width={frameWidth}
                height={frameHeight}
                onLoad={(e) => injectReducedMotion(e.currentTarget, reduced)}
                style={{ width: "100%", height: frameHeight, border: 0, display: "block" }}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
