#!/usr/bin/env node
/**
 * Validation automatique des textes alternatifs (alt) sur toutes les routes.
 * - Bannit les termes tarifaires
 * - Vérifie unicité du contenu (pas de doublons)
 * - Vérifie longueur minimale et présence de contenu pertinent
 * Lancé en pré-build via le script "build" / "build:dev".
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const EXTS = new Set([".tsx", ".ts"]);

// Termes interdits dans les alt (tarifs, prix, conditions commerciales)
const BANNED = [
  /\b\d+\s?(€|eur|euros?)\b/i,
  /\bprix\b/i,
  /\btarifs?\b/i,
  /\bforfaits?\b/i,
  /\bmajorations?\b/i,
  /\bremises?\b/i,
  /\bpromos?\b/i,
  /\bsoldes?\b/i,
  /\bgratuit\b/i,
  /\bpas\s+cher\b/i,
  /\bbon\s+marché\b/i,
  /\bdevis\b/i,
  /\bcoût(s|e)?\b/i,
  /\bfacturé/i,
  /\bhonoraires?\b/i,
  /\bttc\b/i,
  /\bht\b/i,
];

// Mots-creux : si l'alt n'est composé que de ces mots, contenu non pertinent
const FILLER_ONLY = /^(image|photo|illustration|picture|placeholder|untitled|img|alt)[\s.\-]*\d*$/i;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

// Capture les valeurs de alt="...", imageAlt: "...", backgroundImageAlt="..."
// Supporte les apostrophes échappées \' \" \` à l'intérieur de la chaîne.
const RE = /(?:\balt|\bimageAlt|\bbackgroundImageAlt)\s*[:=]\s*\{?\s*(["'`])((?:\\.|(?!\1).)*)\1/g;

const errors = [];
const allAlts = new Map(); // alt -> [files]

for (const file of walk(ROOT)) {
  const src = readFileSync(file, "utf8");
  let m;
  while ((m = RE.exec(src)) !== null) {
    const value = m[2].replace(/\\(["'`])/g, "$1").trim();
    if (!value) continue; // alt="" volontaire (image décorative) — autorisé

    // 1) Termes bannis
    for (const re of BANNED) {
      if (re.test(value)) {
        errors.push(`[BANNED] ${file}: alt contient un terme interdit (${re}) → "${value}"`);
      }
    }
    // 2) Pertinence
    if (value.length < 8) {
      errors.push(`[TOO_SHORT] ${file}: alt trop court (<8 car.) → "${value}"`);
    }
    if (FILLER_ONLY.test(value)) {
      errors.push(`[FILLER] ${file}: alt non pertinent (mot-creux) → "${value}"`);
    }
    // 3) Unicité (collecte)
    const key = value.toLowerCase();
    if (!allAlts.has(key)) allAlts.set(key, []);
    allAlts.get(key).push(file);
  }
}

// 4) Doublons inter-fichiers (même alt réutilisé sur plusieurs pages)
for (const [alt, files] of allAlts) {
  const unique = [...new Set(files)];
  if (unique.length > 1) {
    errors.push(`[DUPLICATE] alt réutilisé sur plusieurs pages → "${alt}" (${unique.join(", ")})`);
  }
}

if (errors.length) {
  console.error("\n❌ Validation des alt échouée :\n");
  for (const e of errors) console.error("  - " + e);
  console.error(`\n${errors.length} problème(s) détecté(s).\n`);
  process.exit(1);
}

console.log(`✅ Validation alt OK — ${allAlts.size} textes alternatifs uniques et conformes.`);
