#!/usr/bin/env node
/**
 * QA Visual — script automatique
 *
 * Ouvre toutes les routes du site sur mobile (375x812) et desktop (1366x768),
 * vérifie qu'il n'y a pas de chevauchement entre la navbar sticky, les CTA
 * flottants et le footer, et génère une capture d'écran par section dans le
 * dossier `qa-screenshots/`.
 *
 * Usage :
 *   BASE_URL=http://localhost:3000 node scripts/qa-visual.mjs
 *   BASE_URL=https://site-revive-project-65.lovable.app node scripts/qa-visual.mjs
 *
 * Dépendance : `bun add -d playwright` puis `bunx playwright install chromium`.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR || "qa-screenshots";

const ROUTES = [
  { name: "accueil", path: "/" },
  { name: "installation-renovation", path: "/installation-renovation" },
  { name: "depannage-urgent", path: "/depannage-urgent" },
  { name: "entretien-maintenance", path: "/entretien-maintenance" },
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812, deviceScaleFactor: 2, isMobile: true },
  { name: "desktop", width: 1366, height: 768, deviceScaleFactor: 1, isMobile: false },
];

function rectsOverlap(a, b) {
  if (!a || !b) return false;
  return !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
}

async function checkOverlaps(page) {
  return page.evaluate(() => {
    const get = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, w: r.width, h: r.height };
    };
    const navbar = get("nav");
    const footer = get("footer");
    // FloatingCTA : div fixed bottom-right
    const ctaCandidates = Array.from(document.querySelectorAll("div.fixed"))
      .filter((el) => {
        const cs = getComputedStyle(el);
        return cs.position === "fixed" && cs.zIndex && parseInt(cs.zIndex) >= 30;
      })
      .map((el) => el.getBoundingClientRect());
    const cta = ctaCandidates[0]
      ? { left: ctaCandidates[0].left, top: ctaCandidates[0].top, right: ctaCandidates[0].right, bottom: ctaCandidates[0].bottom }
      : null;
    return { navbar, footer, cta };
  });
}

async function captureSections(page, dir, prefix) {
  const sectionCount = await page.evaluate(() => document.querySelectorAll("section").length);
  for (let i = 0; i < sectionCount; i++) {
    const handle = await page.evaluateHandle((idx) => document.querySelectorAll("section")[idx], i);
    const el = handle.asElement();
    if (!el) continue;
    try {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await el.screenshot({ path: join(dir, `${prefix}-section-${String(i + 1).padStart(2, "0")}.png`) });
    } catch {
      /* skip non-visible section */
    }
  }
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const report = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await ctx.newPage();

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      console.log(`→ [${vp.name}] ${url}`);
      await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      await page.waitForTimeout(400);

      const dir = join(OUT_DIR, vp.name, route.name);
      await mkdir(dir, { recursive: true });

      // Capture full page
      await page.screenshot({ path: join(dir, "full.png"), fullPage: true });

      // Capture par section
      await captureSections(page, dir, "top");

      // Scroll au footer pour vérifier les overlaps
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await page.screenshot({ path: join(dir, "footer.png") });

      const overlaps = await checkOverlaps(page);
      const issues = [];
      if (overlaps.navbar && overlaps.cta && rectsOverlap(overlaps.navbar, overlaps.cta)) {
        issues.push("navbar↔cta");
      }
      if (overlaps.footer && overlaps.cta && rectsOverlap(overlaps.footer, overlaps.cta)) {
        issues.push("footer↔cta");
      }
      report.push({ viewport: vp.name, route: route.name, issues, ...overlaps });
    }

    await ctx.close();
  }

  await browser.close();

  console.log("\n=== Rapport overlaps ===");
  let failed = 0;
  for (const r of report) {
    const status = r.issues.length === 0 ? "✅" : "❌";
    if (r.issues.length) failed++;
    console.log(`${status} [${r.viewport}] ${r.route} ${r.issues.length ? "→ " + r.issues.join(", ") : ""}`);
  }
  console.log(`\n${report.length - failed}/${report.length} pages OK • screenshots → ${OUT_DIR}/`);
  process.exit(failed === 0 ? 0 : 1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
