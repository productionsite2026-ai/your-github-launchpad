import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

import { content } from "@/data/content";

const SITE_URL = "https://artisan-saintlouis.fr";
const SITE_NAME = content.company.name;
const SITE_DESCRIPTION = content.company.description;
const OG_IMAGE = `${SITE_URL}/img/og-image-1600.webp`;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Plumber", "HVACBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: content.company.name,
  description: content.company.description,
  url: SITE_URL,
  telephone: content.company.contact.phoneRaw,
  email: content.company.contact.email,
  image: OG_IMAGE,
  logo: OG_IMAGE,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: content.company.contact.address,
    postalCode: content.company.contact.postalCode,
    addressLocality: content.company.contact.city,
    addressRegion: content.company.contact.region,
    addressCountry: content.company.contact.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.7706,
    longitude: 2.4828,
  },
  vatID: content.company.legal.tvaIntra,
  taxID: content.company.legal.siret,
  foundingDate: content.company.legal.dateCreation,
  naics: content.company.legal.naf,
  areaServed: [
    { "@type": "City", name: "Paris" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    { "@type": "AdministrativeArea", name: "Hauts-de-Seine" },
    { "@type": "AdministrativeArea", name: "Seine-Saint-Denis" },
    { "@type": "AdministrativeArea", name: "Val-de-Marne" },
    { "@type": "AdministrativeArea", name: "Yvelines" },
    { "@type": "AdministrativeArea", name: "Essonne" },
    { "@type": "AdministrativeArea", name: "Val-d'Oise" },
    { "@type": "AdministrativeArea", name: "Seine-et-Marne" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "00:00",
      closes: "23:59",
      description: "Service d'urgence 24h/24",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: content.company.contact.mobileRaw,
      contactType: "emergency",
      areaServed: "FR",
      availableLanguage: ["French"],
    },
    {
      "@type": "ContactPoint",
      telephone: content.company.contact.phoneRaw,
      contactType: "customer service",
      areaServed: "FR",
      availableLanguage: ["French"],
    },
    {
      "@type": "ContactPoint",
      telephone: content.company.contact.phoneRaw,
      contactType: "sales",
      areaServed: "FR",
      availableLanguage: ["French"],
      contactOption: "TollFree",
    },
  ],
  sameAs: [content.company.contact.whatsappUrl],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations plomberie & chauffage",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Installation & rénovation plomberie chauffage" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dépannage urgent 7j/7" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entretien chaudière annuel" } },
    ],
  },
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "author", content: "Artisan Saint Louis" },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1" },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#06b6d4" },
      { name: "color-scheme", content: "light" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Artisan Saint Louis" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: `${SITE_NAME} — Plombier chauffagiste à Paris & Île-de-France 7j/7` },
      { property: "og:title", content: `${SITE_NAME} — Plombier chauffagiste Paris IDF` },
      { name: "twitter:title", content: `${SITE_NAME} — Plombier chauffagiste Paris IDF` },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:description", content: SITE_DESCRIPTION },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/img/android-chrome-192x192.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
