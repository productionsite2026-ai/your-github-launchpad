import { content } from "@/data/content";

const ORIGIN = typeof window !== "undefined" ? window.location.origin : "https://artisan-saintlouis.fr";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Plumber", "HVACBusiness"],
  "@id": `${ORIGIN}/#organization`,
  name: content.company.name,
  description: content.company.description,
  url: ORIGIN,
  telephone: content.company.contact.mobileRaw,
  email: content.company.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: content.company.contact.address,
    postalCode: content.company.contact.postalCode,
    addressLocality: content.company.contact.city,
    addressRegion: content.company.contact.region,
    addressCountry: content.company.contact.country,
  },
  areaServed: [
    { "@type": "City", name: "Paris" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    ...content.company.contact.areaServed.map((c) => ({ "@type": "AdministrativeArea", name: c })),
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "20:00",
    },
  ],
  sameAs: [],
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export const serviceSchema = (name: string, description: string, serviceType: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  provider: { "@id": `${ORIGIN}/#organization` },
  areaServed: [
    { "@type": "City", name: "Paris" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
  ],
  offers: { "@type": "Offer", description: "Devis gratuit et personnalisé" },
});

export const speakableSchema = (url: string, name: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  url,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-description", "[data-speakable]"],
  },
});

export { ORIGIN };
