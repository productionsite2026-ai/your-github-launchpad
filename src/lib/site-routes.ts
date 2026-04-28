// Registre central des routes indexables — source unique pour le sitemap
// et tout futur générateur (RSS, plan du site HTML, etc.).
// Ajouter ici toute nouvelle page indexable pour qu'elle soit auto-incluse.

export interface SiteRoute {
  path: string;
  priority: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Image principale (chemin absolu /img/..., ou URL absolue). Optionnel. */
  image?: string;
  /** Titre lisible utilisé pour l'image dans le sitemap. */
  imageTitle?: string;
}

export const SITE_URL = "https://artisan-saintlouis.fr";

export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    image: "/img/hero-accueil-paris-1024.webp",
    imageTitle: "Plombier chauffagiste Artisan Saint Louis à Paris",
  },
  {
    path: "/installation-renovation",
    priority: "0.9",
    changefreq: "monthly",
    image: "/img/hero-installation-renovation-1024.webp",
    imageTitle: "Installation et rénovation plomberie chauffage Paris IDF",
  },
  {
    path: "/depannage-urgent",
    priority: "0.9",
    changefreq: "monthly",
    image: "/img/hero-depannage-urgent-1024.webp",
    imageTitle: "Dépannage urgent plomberie chauffage Paris IDF",
  },
  {
    path: "/entretien-maintenance",
    priority: "0.9",
    changefreq: "monthly",
    image: "/img/hero-entretien-maintenance-1024.webp",
    imageTitle: "Entretien chaudière et contrat maintenance Paris IDF",
  },
];
