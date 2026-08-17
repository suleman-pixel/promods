// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/* ===========================================================================
 * GITHUB PAGES: set these two values, then never touch a hardcoded path again.
 * ===========================================================================
 *
 * `site` — the origin GitHub Pages serves you from. It is always
 *          https://<your-github-username>.github.io
 *          (lowercase). It is NOT the repository URL.
 *
 * `base` — the sub-path your site lives at. Which case are you?
 *
 *   (a) Repository is named exactly  <your-username>.github.io
 *       e.g. github.com/suleman-pixel/suleman-pixel.github.io
 *       -> the site is served from the domain root.
 *       -> BASE IS NOT NEEDED. Set `base` to undefined (or delete the line).
 *
 *   (b) Any other repository name  (this is the common case)
 *       e.g. github.com/suleman-pixel/promods
 *            served at https://suleman-pixel.github.io/promods/
 *       -> set `base` to '/' + the repository name, with a leading slash and
 *          no trailing slash:  base: '/promods'
 *       -> Rename the repo later? Change this one line.
 *
 *   (c) Custom domain (e.g. https://promods.co.uk) — set `site` to the domain
 *       and set `base` to undefined, because a custom domain serves from root.
 *
 * This project is currently configured for case (b) with the repository name
 * "promods". Both values are placeholders — change them if either is wrong.
 * ------------------------------------------------------------------------- */

/** TODO: confirm your GitHub username in this URL. */
const SITE = 'https://suleman-pixel.github.io';

/** TODO: '/repo-name' for case (b); change to `undefined` for cases (a) and (c). */
const BASE = '/promods';

export default defineConfig({
  site: SITE,
  base: BASE,

  // Static HTML in ./dist — no server, no adapter. Upload it anywhere.
  output: 'static',

  // Emit /services/index.html, so links can end in a slash and GitHub Pages
  // serves them without a redirect.
  build: { format: 'directory' },
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },
});
