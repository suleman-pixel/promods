/**
 * sitemap.xml, generated at build time from the page list below.
 * Hand-rolled rather than pulled in as an integration, so the site keeps its
 * dependency list short and the output lands at exactly /sitemap.xml.
 *
 * Added a page? Add it here too.
 */
import { absolute } from '../lib/paths.js';

const pages = [
  { path: '', changefreq: 'monthly', priority: '1.0' },
  { path: 'services/', changefreq: 'monthly', priority: '0.9' },
  { path: 'gallery/', changefreq: 'monthly', priority: '0.7' },
  { path: 'contact/', changefreq: 'yearly', priority: '0.8' },
];

export function GET({ site }) {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${absolute(page.path, site)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
