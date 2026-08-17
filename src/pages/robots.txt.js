/**
 * robots.txt, generated at build time so the Sitemap line always matches the
 * `site` (and `base`) values in astro.config.mjs.
 */
import { absolute } from '../lib/paths.js';

export function GET({ site }) {
  const body = `User-agent: *
Allow: /

Sitemap: ${absolute('sitemap.xml', site)}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
