#!/usr/bin/env node
/**
 * Génère pour chaque image source dans src/assets/*.webp :
 *  - Variantes responsive (320w, 640w, 1024w, 1600w) en AVIF + WebP
 *  - Une thumbnail LQIP (24px blur) en data URL pour placeholder
 *  - Un manifest JSON consommé par <ResponsiveImage />
 *
 * Sortie : public/img/<name>-<width>.{avif,webp}
 *          src/assets/image-manifest.json
 *
 * Idempotent : ne régénère pas si fichier existe et plus récent que la source.
 */
import { readdir, mkdir, stat, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "src/assets";
const OUT_DIR = "public/img";
const MANIFEST = "src/assets/image-manifest.json";
const WIDTHS = [320, 640, 1024, 1600];
const QUALITY = { avif: 55, webp: 72 };

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter((f) => f.endsWith(".webp"));
const manifest = {};
let generated = 0;
let skipped = 0;

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file);
  const baseName = path.basename(file, ".webp");
  const srcStat = await stat(srcPath);
  const meta = await sharp(srcPath).metadata();
  const intrinsicW = meta.width ?? 1280;
  const intrinsicH = meta.height ?? 800;

  const entry = {
    width: intrinsicW,
    height: intrinsicH,
    aspectRatio: +(intrinsicW / intrinsicH).toFixed(4),
    sources: { avif: [], webp: [] },
    placeholder: "",
  };

  // Variantes
  for (const w of WIDTHS) {
    if (w > intrinsicW) continue; // pas d'upscale
    for (const fmt of ["avif", "webp"]) {
      const outName = `${baseName}-${w}.${fmt}`;
      const outPath = path.join(OUT_DIR, outName);
      let needs = true;
      if (existsSync(outPath)) {
        const outStat = await stat(outPath);
        if (outStat.mtimeMs > srcStat.mtimeMs) needs = false;
      }
      if (needs) {
        const pipeline = sharp(srcPath).resize({ width: w, withoutEnlargement: true });
        if (fmt === "avif") await pipeline.avif({ quality: QUALITY.avif, effort: 4 }).toFile(outPath);
        else await pipeline.webp({ quality: QUALITY.webp, effort: 5 }).toFile(outPath);
        generated++;
      } else {
        skipped++;
      }
      entry.sources[fmt].push({ w, url: `/img/${outName}` });
    }
  }

  // Toujours inclure la source originale comme fallback large (si > max width)
  if (intrinsicW > Math.max(...WIDTHS)) {
    entry.sources.webp.push({ w: intrinsicW, url: `/img/${baseName}-orig.webp` });
    const origOut = path.join(OUT_DIR, `${baseName}-orig.webp`);
    if (!existsSync(origOut)) {
      await sharp(srcPath).webp({ quality: QUALITY.webp }).toFile(origOut);
      generated++;
    }
  }

  // LQIP : 24px blur en data URL (pour background placeholder, évite CLS)
  const lqipBuf = await sharp(srcPath).resize(24).webp({ quality: 30 }).toBuffer();
  entry.placeholder = `data:image/webp;base64,${lqipBuf.toString("base64")}`;

  manifest[file] = entry;
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`✓ Responsive images: ${generated} generated, ${skipped} cached`);
console.log(`✓ Manifest written: ${MANIFEST} (${Object.keys(manifest).length} entries)`);
