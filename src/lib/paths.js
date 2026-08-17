/**
 * BASE-AWARE URL HELPER
 * =====================
 * GitHub Pages usually serves a project site from a sub-path
 * (https://user.github.io/repo-name/), which is what `base` in
 * astro.config.mjs describes. A hardcoded href like "/services/" would then
 * point at the wrong place and the deploy looks broken.
 *
 * So: never write a leading-slash internal path by hand. Always go through
 * `url()`, which prefixes Astro's configured base for you.
 *
 *   url()                  -> "/"            or "/repo-name/"
 *   url('services/')       -> "/services/"   or "/repo-name/services/"
 *   url('services/#carplay') -> "/services/#carplay" or "/repo-name/services/#carplay"
 *   url('og.png')          -> "/og.png"      or "/repo-name/og.png"
 *
 * Images imported from `src/assets` are handled by Astro itself and already
 * respect `base` — you only need `url()` for links and for files you put in
 * `public/`.
 */

/** Astro injects the configured base here; it is "/" when base is unset. */
const RAW_BASE = import.meta.env.BASE_URL || '/';

/** Base without a trailing slash: "" at the domain root, else "/repo-name". */
const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

/**
 * Build an internal URL that respects the configured `base`.
 * @param {string} [path] Path relative to the site root, with or without a
 *   leading slash. May include a hash and/or query string.
 * @returns {string}
 */
export function url(path = '') {
  const clean = String(path).replace(/^\/+/, '');
  return `${BASE}/${clean}`;
}

/**
 * Absolute URL, for canonical links, Open Graph tags and JSON-LD.
 * @param {string} path
 * @param {URL | undefined} astroSite The value of `Astro.site`.
 */
export function absolute(path, astroSite) {
  const rel = url(path);
  if (!astroSite) return rel;
  return new URL(rel, astroSite).href;
}

/** The primary navigation, shared by the header and the footer. */
export const nav = [
  { label: 'Home', href: url() },
  { label: 'Services', href: url('services/') },
  { label: 'Gallery', href: url('gallery/') },
  { label: 'Contact', href: url('contact/') },
];
