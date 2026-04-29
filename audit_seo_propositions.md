# Audit SEO, GEO, IA et Vocal — Artisan Saint Louis

Suite à l'analyse approfondie du code source et de la structure de votre site web (Vite + React + TanStack Router), voici le rapport d'audit détaillé ainsi que mes propositions d'évolution pour optimiser votre visibilité sur les moteurs de recherche classiques, la recherche vocale et les intelligences artificielles génératives.

## 1. État des lieux et Audit

### 1.1. SEO Technique et Structurel

Le site présente déjà une excellente base technique moderne :

- **Balises Meta et Open Graph** : Les balises `title`, `description`, `canonical`, `og:title`, `og:image` et `twitter:card` sont bien renseignées sur les pages principales (`/`, `/depannage-urgent`, `/installation-renovation`, `/entretien-maintenance`).

- **Sitemap XML** : Un sitemap dynamique est généré via `src/routes/sitemap[.]xml.tsx` en se basant sur `src/lib/site-routes.ts`. Il inclut correctement les URLs, les priorités, les fréquences de mise à jour et même les images associées.

- **Robots.txt** : Présent et correctement configuré pour autoriser l'indexation et pointer vers le sitemap.

- **Performance** : Utilisation d'images responsives (AVIF/WebP) avec `loading="lazy"` et `decoding="async"`, ce qui est excellent pour les Core Web Vitals.

- **Données structurées (JSON-LD)** : Très bon point, le site intègre déjà des schémas riches : `LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`, `Review` et `AggregateRating`.

### 1.2. Optimisation GEO (Positionnement Local)

- **Actuel** : Le schéma `LocalBusiness` et les schémas `Service` déclarent bien la zone d'intervention (`areaServed`) pour Paris et les départements d'Île-de-France (92, 93, 94, 78, 91, 95, 77).

- **Manque** : Il n'y a pas de pages dédiées par ville ou par arrondissement de Paris. Actuellement, le ciblage local repose uniquement sur le texte global et les balises `areaServed`. Pour capter les recherches du type "plombier paris 15" ou "chauffagiste boulogne billancourt", une stratégie de contenu plus granulaire est nécessaire.

### 1.3. Optimisation pour la Recherche Vocale et IA (AIO/SGE)

- **Actuel** : Le site utilise le schéma `SpeakableSpecification` ciblant les balises `h1` et les éléments avec l'attribut `data-speakable`. C'est une excellente pratique pour les assistants vocaux (Google Assistant, Alexa).

- **Actuel** : La présence du composant `QuickAnswer` (Questions/Réponses directes) et des sections FAQ structurées en `FAQPage` JSON-LD est parfaite pour viser la "Position Zéro" (Featured Snippets) et nourrir les IA génératives (ChatGPT, Perplexity, Google SGE).

- **Manque** : Le schéma `HowTo` (Comment faire) n'est pas présent. Il serait très utile pour des requêtes du type "Comment couper l'eau en cas de fuite", très fréquentes en urgence.

### 1.4. Points d'amélioration identifiés

- **Incohérence des numéros de téléphone** : Le composant `QuickAnswer` affiche en dur le numéro "06 12 34 56 78" dans les textes, alors que le vrai numéro dans `content.ts` est "06 31 29 69 76".

- **Fil d'Ariane (Breadcrumb) visuel** : Bien que le schéma JSON-LD `BreadcrumbList` soit présent, le fil d'Ariane n'est pas affiché visuellement sur les pages secondaires, ce qui est recommandé pour l'UX et le SEO.

- **Fichiers statiques manquants** : Il manque un fichier `manifest.webmanifest` (ou `manifest.json`) et les icônes `apple-touch-icon` pour une compatibilité PWA et un affichage optimal sur mobile.

---

## 2. Propositions d'Évolutions (À Valider)

Afin de compléter et d'optimiser le site tel quel, sans créer de nouvelles pages (sauf accord de votre part pour la stratégie locale), voici les actions que je vous propose de réaliser :

### Évolution 1 : Corrections et Ajustements Rapides (Recommandé)

- **Correction des numéros de téléphone** : Remplacer les numéros factices ("06 12 34 56 78") dans les textes des composants `QuickAnswer` par la variable dynamique `content.company.contact.phone` issue de `content.ts`.

- **Ajout du Web Manifest et Apple Touch Icon** : Créer un fichier `site.webmanifest` et ajouter les balises `<link rel="manifest">` et `<link rel="apple-touch-icon">` dans le `<head>` (`__root.tsx`) pour améliorer le référencement mobile.

- **Affichage du Fil d'Ariane visuel** : Activer l'affichage du composant Breadcrumb sur les pages `depannage-urgent`, `installation-renovation` et `entretien-maintenance` en passant la prop `breadcrumb` au composant `HeroWithForm`.

### Évolution 2 : Renforcement SEO Vocal et IA (Recommandé)

- **Ajout du schéma ****`HowTo`**** (Tutoriel)** : Créer un schéma JSON-LD `HowTo` sur la page Dépannage pour la requête "Que faire en cas de fuite d'eau avant l'arrivée du plombier ?". Cela augmente considérablement les chances d'apparaître en réponse vocale d'urgence.

- **Enrichissement des attributs ****`data-speakable`** : S'assurer que les réponses courtes des `QuickAnswer` possèdent bien cet attribut pour être lues par les assistants vocaux.

- 

- *Note : Comme vous avez demandé de ne pas créer de pages sans accord, j'attends votre validation explicite si vous souhaitez mettre en place cette stratégie très puissante pour le SEO local.*

---

**Comment souhaitez-vous procéder ?**

1. Validez-vous l'**Évolution 1** (Corrections rapides) et l'**Évolution 2** (Renforcement IA/Vocal) pour que je les implémente immédiatement dans le code ?

1. Souhaitez-vous que je mette en place l'**Évolution 3** (Création du système de pages locales par arrondissement/ville) ?

