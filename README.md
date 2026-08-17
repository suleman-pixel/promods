# Pro Mods — marketing site

Static marketing site for **Pro Mods** ([@promodsuk](https://www.instagram.com/promodsuk/)),
a UK installer of dash cams, Apple CarPlay and vehicle trackers.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
It compiles to plain HTML/CSS/JS in `dist/` — no server, no database, no CMS.
Deploy that folder anywhere: GitHub Pages (configured, see below), Netlify or
Cloudflare Pages.

---

## 1. Fill these in

Nothing here is invented. Every detail Pro Mods hasn't supplied is an obvious
`[TODO: …]` placeholder that will be visible on the live site until you replace
it. **Almost all of them live in one file: [`src/lib/site.js`](src/lib/site.js).**

| # | What | Where | Currently |
|---|------|-------|-----------|
| 1 | **Phone number** (display) | `src/lib/site.js` → `phone` | `[TODO: PHONE NUMBER]` |
| 2 | **Phone number** (dialable, e.g. `+441234567890`) | `src/lib/site.js` → `phoneHref` | empty — while empty, the number shows as plain text instead of a tap-to-call link |
| 3 | **Email address** | `src/lib/site.js` → `email` | `[TODO: EMAIL ADDRESS]` |
| 4 | **Service area** (e.g. "Manchester and 30 miles around") | `src/lib/site.js` → `serviceArea` | `[TODO: SERVICE AREA]` |
| 5 | **Street address / town / county / postcode** | `src/lib/site.js` → `address` | `[TODO: …]` each — if Pro Mods is mobile-only with no public address, see the note below |
| 6 | **Opening hours** | `src/lib/site.js` → `openingHours` | `[TODO: OPENING HOURS]` |
| 7 | **Formspree form ID** (so the contact form actually sends) | `src/lib/site.js` → `formspreeId` | `'your-form-id'` — see [section 5](#5-connect-the-contact-form-formspree) |
| 8 | **Price range** for the search-engine listing (e.g. `££`) | `src/pages/index.astro` → `priceRange` in the JSON-LD block | `[TODO: PRICE RANGE, e.g. ££]` |
| 9 | **GitHub username / repo name** for the live URL | `astro.config.mjs` → `SITE` and `BASE` | set for `suleman-pixel/promods` — change if either is different |
| 10 | **The real logo** | `src/assets/logo.png` | a generated stand-in — see [section 3](#3-swap-in-the-real-logo) |
| 11 | **Gallery photos** (10 of them) | `src/assets/gallery/` | dark placeholder tiles — see [section 4](#4-swap-the-gallery-images) |

Find any leftovers at any time with:

```bash
grep -rn "TODO" src/ astro.config.mjs
```

**No address?** If Pro Mods is mobile-only and has no address to publish,
delete the `address` block from the JSON-LD in `src/pages/index.astro` and
remove the `address` object from `src/lib/site.js`. Search engines treat a
service-area business without a street address as perfectly normal; a fake
address is much worse than none.

---

## 2. Run it locally

You need [Node.js](https://nodejs.org) 20 or newer (24 is what the deploy uses).

```bash
npm install     # once
npm run dev     # start the dev server
```

Then open the URL it prints — **http://localhost:4321/promods/** (note the
`/promods/` part: it matches the `base` setting used for GitHub Pages).

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with live reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve `dist/` exactly as it will be deployed |
| `npm run assets` | Generate any missing placeholder images/icons |
| `npm run favicons` | Regenerate favicons + social image from the current logo |

Always check `npm run build && npm run preview` before pushing — that is the
same output GitHub Pages will serve.

---

## 3. Swap in the real logo

⚠️ **`logo.png` was not in the project when this site was built**, so
`src/assets/logo.png` is a generated stand-in (the words PRO + MODS in the brand
colours). Replace it:

1. Save the real logo over `src/assets/logo.png`. A transparent PNG about
   1200px wide works best — it is used in the header, the hero and the footer,
   and Astro resizes it automatically.
2. Regenerate the favicon, the iOS icon and the social-share image from the
   brand colours:
   ```bash
   npm run favicons
   ```
   That rewrites `public/favicon.svg`, `public/favicon-32.png`,
   `public/apple-touch-icon.png` and `public/og.png`. If you would rather use
   the actual logo artwork for the icons, just overwrite those four files by
   hand — nothing else needs changing.
3. If the new logo has a very different shape, adjust its height in
   `src/components/Header.astro` (`class="h-9 … sm:h-10"`) and
   `src/pages/index.astro` (`class="… h-20 sm:h-28"`).

---

## 4. Swap the gallery images

The gallery is 10 placeholder tiles. Swapping one for a real photo is a
drag-and-drop job:

1. **Save your photo over the file of the same name** in
   `src/assets/gallery/`, e.g. replace `01-dash-cam-hardwired.jpg` with your
   own `01-dash-cam-hardwired.jpg`.
   - Any of `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif` works. If you change
     the extension, delete the old file — the folder is read automatically and
     files are matched to captions by name, ignoring the extension.
   - Landscape photos look best. They are cropped to 4:3 in the grid and shown
     whole in the lightbox, so anything from roughly 1200px wide up is fine.
     Don't bother compressing them; Astro generates optimised WebP versions at
     several sizes during the build.
2. **Update the caption and alt text** for that file in
   [`src/lib/gallery.js`](src/lib/gallery.js):
   ```js
   {
     file: '01-dash-cam-hardwired',            // must match the file name
     caption: 'Dash cam — hardwired install',  // the visible label
     alt: 'Front dash cam mounted behind …',   // what a screen reader says
   },
   ```
3. Adding or removing photos: add or delete entries in that same list (and put
   the matching file in `src/assets/gallery/`). The grid reflows on its own.
   The **first four entries** are also the teaser row on the home page.

If a listed file is missing, the build prints a warning naming it and skips
that tile rather than failing.

---

## 5. Connect the contact form (Formspree)

The form has no backend. It posts to [Formspree](https://formspree.io), whose
free tier covers a steady trickle of enquiries.

1. Sign up at <https://formspree.io>.
2. **New Form** → choose the email address enquiries should arrive at →
   **Create Form**.
3. Formspree shows an endpoint like `https://formspree.io/f/abcdwxyz`.
4. Copy **only the last part** (`abcdwxyz`) into
   [`src/lib/site.js`](src/lib/site.js):
   ```js
   formspreeId: 'abcdwxyz',   // was 'your-form-id'
   ```
5. Rebuild / push. Send yourself a test enquiry from the live site.

Until you do that, the form still validates everything, but instead of
pretending to send it shows *"The form is not connected to Formspree yet"* — so
you can never silently lose a real enquiry. There is also a `mailto:` link
under the form as a fallback (it appears once you fill in the email address).

The form includes a hidden `_gotcha` honeypot field, which Formspree uses to
drop bot submissions.

---

## 6. Deploy to GitHub Pages

Written for someone who has never deployed a site. Do these in order.

1. **Create the repository on GitHub.** Go to <https://github.com/new>. Name it
   `promods` (that name matters — see step 3). Leave it empty: no README, no
   `.gitignore`.

2. **Push this project to it.** In a terminal, in this folder:
   ```bash
   git init                     # skip if this is already a git repo
   git add .
   git commit -m "Pro Mods marketing site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/promods.git
   git push -u origin main
   ```

3. **Check the two URL settings.** Open `astro.config.mjs`. At the top:
   ```js
   const SITE = 'https://suleman-pixel.github.io';   // https://<your-username>.github.io
   const BASE = '/promods';                          // '/' + your repository name
   ```
   - Change `SITE` if your GitHub username is different.
   - If you named the repo something other than `promods`, change `BASE` to
     match — `/` plus the repo name, no trailing slash.
   - **Special case:** if you named the repository exactly
     `<your-username>.github.io`, the site is served from the domain root, so
     set `const BASE = undefined;` instead.
   - Using a custom domain later (e.g. `promods.co.uk`)? Set `SITE` to that
     domain and `BASE` to `undefined`.
   Commit and push any change.

4. **Turn Pages on.** On GitHub, open the repo → **Settings** → **Pages**
   (left sidebar) → under **Build and deployment**, set **Source** to
   **GitHub Actions**. There is nothing to save; the choice applies instantly.
   You do *not* need to pick a branch or a folder.

5. **Watch the build.** Click the **Actions** tab. You should see a run called
   *"Deploy to GitHub Pages"*, kicked off by your push. It has two jobs,
   `build` then `deploy`, and takes a couple of minutes. Green ticks mean it
   worked; the `deploy` job shows the live URL when it finishes. If you turned
   Pages on *after* pushing, no run exists yet — push any commit, or open the
   workflow and use **Run workflow** to start one by hand.

6. **Open the site:** `https://<your-username>.github.io/promods/`
   (the first deploy can take a minute or two to become reachable).

Every later push to `main` redeploys automatically.

### If the page loads but looks unstyled (or images are missing)

It is almost always the **`base` setting** in `astro.config.mjs` not matching
the repository name. The browser then asks for `/style.css` when the file is
actually at `/promods/style.css`, so you get raw unstyled text.

Check that `BASE` is `'/' + <exact repo name>` — case-sensitive, leading slash,
no trailing slash — or `undefined` if the repo is named
`<username>.github.io` or you are on a custom domain. Fix it, commit, push, and
the next deploy will be correct.

Two related notes:

- **Never hardcode internal links.** Write `url('services/')` (from
  `src/lib/paths.js`), never `href="/services/"`. Images imported from
  `src/assets` already respect `base`; anything in `public/` needs `url()`.
  This is what keeps the site working at both `/` and `/promods/`.
- `public/.nojekyll` is committed on purpose. Without it, GitHub strips the
  `_astro/` folder — which holds all the CSS, JS and images.

### robots.txt and sitemap.xml on a project site

They are generated at `/<base>/robots.txt` and `/<base>/sitemap.xml`. Crawlers
only read `robots.txt` from the domain root, which on a
`username.github.io/repo` URL you don't control — so submit the sitemap URL
directly in [Google Search Console](https://search.google.com/search-console)
instead. On a custom domain both files land at the root and work normally.

---

## 7. Deploy to Netlify instead

The build is a plain static folder, so Netlify needs no configuration file.

1. First, **remove the sub-path**: in `astro.config.mjs` set
   `const BASE = undefined;` and set `SITE` to the Netlify URL you end up with
   (e.g. `https://promods.netlify.app`) or your custom domain. Netlify serves
   from the root, so leaving `base` set would break every link.
2. Push the project to GitHub (steps 1–2 above).
3. In Netlify: **Add new site** → **Import an existing project** → pick the
   repository.
4. Confirm the build settings — Netlify detects Astro, but they should read:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Deploy site.** Later pushes redeploy automatically.

Cloudflare Pages is the same: build command `npm run build`, output directory
`dist`, and `base` left unset.

---

## 8. How the project is put together

```
astro.config.mjs           site + base (the GitHub Pages settings)
.github/workflows/deploy.yml  builds and publishes to GitHub Pages
public/                    copied verbatim: favicons, og.png, .nojekyll
scripts/                   one-off generator for placeholder images + icons
src/
  assets/logo.png          the logo (replace this)
  assets/gallery/          gallery images (replace these)
  components/              Header, Footer, ContactForm, GalleryGrid, Faq, …
  layouts/BaseLayout.astro meta tags, Open Graph, header + footer, scroll reveal
  lib/site.js              ALL business details and placeholders
  lib/gallery.js           gallery file names, captions and alt text
  lib/paths.js             url() — the base-aware link helper
  pages/                   one file per page; also robots.txt and sitemap.xml
  styles/global.css        design tokens (colours, fonts) and component classes
```

**Editing copy.** Services (descriptions, "what's included", typical use case)
and the FAQ are data in `src/lib/site.js`, and feed the Services page, the home
page cards, the contact form's dropdown and the FAQ accordion at once. Page
intros live in the page files under `src/pages/`.

**Design tokens.** Colours and fonts are defined once in `src/styles/global.css`
under `@theme`, which is what makes utilities like `bg-surface` and
`text-cream` work:

| Token | Value | Used for |
|---|---|---|
| `ink` | `#0B0B0D` | page background |
| `surface` | `#141417` | cards |
| `cream` | `#F5F5F7` | primary text |
| `muted` | `#9A9AA3` | secondary text (7:1 on ink) |
| `amber` → `magenta` | `#F59E0B` → `#D9268C` | accent gradient: rules, glows, hovers |
| `alert` | `#E11D2A` | primary buttons (white text, 4.8:1) |

Headings are Barlow Condensed, body copy is Inter. Both are self-hosted via
`@fontsource`, so there is no request to Google Fonts.

### Accessibility and performance notes

Worth knowing before you change things:

- Amber is the only accent that passes AA as text on the dark background
  (9.2:1). Magenta (4.3:1) and red (4.1:1) are used as fills, rules and glows
  only, never as small text — which is why validation errors are amber with a
  red field border rather than red text.
- The fade-up-on-scroll effect is switched off entirely under
  `prefers-reduced-motion: reduce`, and the "hidden" starting state only
  applies when JavaScript is running, so nothing can get stuck invisible.
- Nav, FAQ accordion and gallery lightbox are all keyboard operable: the FAQ is
  built on native `<details>`, and the lightbox on native `<dialog>` (Escape to
  close, arrow keys to page through, focus returns to the tile you opened).
- Gallery images are lazy-loaded and served as multiple WebP sizes; the
  full-size version is only fetched when the lightbox opens.
- Adding a page? Add it to `src/pages/sitemap.xml.js` too.
