// ============================================================
// CONTENU CENTRAL — Artisan Saint Louis (Plomberie & Chauffage)
// Paris centre + toute l'Île-de-France (banlieue comprise).
// Modifier ici les coordonnées réelles avant publication.
// ============================================================

export const content = {
  company: {
    name: "Artisan Saint Louis",
    shortName: "Saint Louis",
    tagline: "Plombier & Chauffagiste à Paris",
    description:
      "Artisan plombier et chauffagiste à Paris centre et toute l'Île-de-France. Installation & rénovation, dépannage 7j/7, entretien chaudière. Devis gratuit.",
    contact: {
      // Affichage humain : groupes de 2 chiffres, format français
      phone: "06 31 29 69 76",
      phoneMobile: "06 31 29 69 76",
      // Format E.164 strict (sans espaces) pour tel: — compatible iOS & Android
      phoneRaw: "+33631296976",
      mobileRaw: "+33631296976",
      // WhatsApp : format international SANS le "+" (recommandation wa.me)
      whatsappRaw: "33631296976",
      whatsappUrl: "https://wa.me/33631296976?text=Bonjour%2C%20je%20souhaite%20un%20devis%20plomberie%20%2F%20chauffage.",
      email: "contact@artisan-saintlouis.fr",
      address: "1 rue des Ratraits",
      postalCode: "94380",
      city: "Bonneuil-sur-Marne",
      region: "Île-de-France",
      country: "FR",
      hours: "Lun-Sam 7h-20h · Urgences 7j/7 24h/24",
      areaServed: [
        "Paris (tous arrondissements)",
        "Hauts-de-Seine (92)",
        "Seine-Saint-Denis (93)",
        "Val-de-Marne (94)",
        "Yvelines (78)",
        "Essonne (91)",
        "Val-d'Oise (95)",
        "Seine-et-Marne (77)",
      ],
    },
    social: {
      // Remplacer par les URLs réelles
    },
    legal: {
      siren: "533 381 265",
      siret: "533 381 265 00032",
      tvaIntra: "FR88533381265",
      naf: "4322A",
      activity: "Travaux d'installation d'eau et de gaz en tous locaux",
      formeJuridique: "Entrepreneur individuel",
      dateCreation: "2020-09-09",
      assurance: "Décennale assurée",
    },
    formspreeEndpoint: "https://formspree.io/f/xkoklorn",
  },
  badges: [
    { label: "Devis gratuit", icon: "FileText" },
    { label: "Intervention 7j/7", icon: "Clock" },
    { label: "Artisan parisien certifié", icon: "Award" },
    { label: "Garantie décennale", icon: "Shield" },
  ],
  routes: {
    home: "/",
    installation: "/installation-renovation",
    depannage: "/depannage-urgent",
    entretien: "/entretien-maintenance",
  },
} as const;

export const navLinks = [
  { label: "Accueil", href: content.routes.home },
  { label: "Installation & Rénovation Plomberie & Chauffage", href: content.routes.installation },
  { label: "Dépannage rapide", href: content.routes.depannage },
  { label: "Entretien des équipements", href: content.routes.entretien },
] as const;

// ============================================================
// CATALOGUE DES PRESTATIONS
// 3 services principaux × 2 domaines (plomberie / chauffage)
// Utilisé par le formulaire de devis et les pages.
// ============================================================

export type ServiceKey = "installation" | "depannage" | "entretien";
export type DomainKey = "plomberie" | "chauffage";

export const servicesCatalog: Record<
  ServiceKey,
  {
    label: string;
    short: string;
    description: string;
    domains: Record<DomainKey, { label: string; items: string[] }>;
  }
> = {
  installation: {
    label: "Installation & Rénovation Plomberie & Chauffage",
    short: "Installation",
    description: "Pose neuve, remplacement et rénovation complète, plomberie et chauffage.",
    domains: {
      plomberie: {
        label: "Plomberie",
        items: [
          "Rénovation salle de bain",
          "Pose sanitaires (WC, douche, baignoire)",
          "Robinetterie & mitigeurs",
          "Réseau cuivre / multicouche",
          "Adoucisseur d'eau",
          "Raccordement cuisine / lave-linge",
          "Autre / je ne sais pas",
        ],
      },
      chauffage: {
        label: "Chauffage",
        items: [
          "Chaudière gaz à condensation",
          "Pompe à chaleur air/eau",
          "Chaudière à granulés (pellets)",
          "Radiateurs & plancher chauffant",
          "Chauffe-eau / ballon ECS",
          "Système hybride PAC + gaz",
          "Autre / je ne sais pas",
        ],
      },
    },
  },
  depannage: {
    label: "Dépannage rapide",
    short: "Dépannage",
    description: "Intervention rapide 7j/7 24h/24 pour fuite, panne et urgence.",
    domains: {
      plomberie: {
        label: "Plomberie",
        items: [
          "Fuite d'eau / dégât des eaux",
          "Canalisation bouchée / débouchage",
          "WC bouché ou cassé",
          "Recherche de fuite non destructive",
          "Plus d'eau / pression faible",
          "Chasse d'eau défectueuse",
          "Autre urgence",
        ],
      },
      chauffage: {
        label: "Chauffage",
        items: [
          "Chaudière en panne / mise en sécurité",
          "Plus d'eau chaude",
          "Code erreur affiché",
          "Radiateur froid / fuite radiateur",
          "Bruit anormal chaudière",
          "Pompe à chaleur en défaut",
          "Autre urgence",
        ],
      },
    },
  },
  entretien: {
    label: "Entretien des équipements",
    short: "Entretien",
    description: "Maintenance préventive, contrats annuels et mise aux normes.",
    domains: {
      plomberie: {
        label: "Plomberie",
        items: [
          "Détartrage & maintenance",
          "Vérification réseau & étanchéité",
          "Mise aux normes sanitaires",
          "Entretien adoucisseur",
          "Diagnostic avant achat / vente",
          "Autre",
        ],
      },
      chauffage: {
        label: "Chauffage",
        items: [
          "Entretien annuel chaudière (obligatoire)",
          "Contrat de maintenance annuel",
          "Ramonage conduit",
          "Réglage & optimisation combustion",
          "Diagnostic sécurité (CO, gaz)",
          "Entretien pompe à chaleur",
          "Autre",
        ],
      },
    },
  },
};
