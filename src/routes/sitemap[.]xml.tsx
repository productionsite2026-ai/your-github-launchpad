import { createFileRoute } from "@tanstack/react-router";
import { siteRoutes, SITE_URL } from "@/lib/site-routes";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().split("T")[0];
        const urls = siteRoutes
          .map((r) => {
            const imageBlock = r.image
              ? `
    <image:image>
      <image:loc>${SITE_URL}${r.image}</image:loc>
      <image:title>${(r.imageTitle ?? "Artisan Saint Louis").replace(/&/g, "&amp;")}</image:title>
    </image:image>`
              : "";
            return `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>${imageBlock}
  </url>`;
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
