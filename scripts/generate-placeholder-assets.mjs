/**
 * Generates the PLACEHOLDER brand + gallery images for this site.
 *
 * Run with:  npm run assets
 *
 * You normally only need this once. It produces:
 *   src/assets/logo.png              stand-in logo  (REPLACE with the real one)
 *   src/assets/gallery/*.jpg         10 dark placeholder tiles (REPLACE with photos)
 *   public/favicon.svg               favicon (vector)
 *   public/favicon-32.png            favicon (raster fallback)
 *   public/apple-touch-icon.png      iOS home-screen icon
 *   public/og.png                     Open Graph / social share image
 *
 * If you drop in a real logo, run `npm run favicons` to regenerate the icons
 * and social image from it (see the README).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

import { gallery } from '../src/lib/gallery.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(root, 'src/assets');
const GALLERY = path.join(ASSETS, 'gallery');
const PUBLIC = path.join(root, 'public');

const INK = '#0B0B0D';
const SURFACE = '#141417';
const CREAM = '#F5F5F7';
const MUTED = '#9A9AA3';
const AMBER = '#F59E0B';
const MAGENTA = '#D9268C';
const ALERT = '#E11D2A';

/** Condensed-ish stack using the fonts present on most build machines. */
const SANS = 'DejaVu Sans, FreeSans, Helvetica, Arial, sans-serif';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ------------------------------------------------------------------ logo -- */
/**
 * Placeholder wordmark: "PRO" in off-white + "MODS" reversed out of the brand
 * red block, with the amber -> magenta accent rule underneath.
 */
function logoSvg({ w = 1200, h = 400 } = {}) {
  const blockX = 545;
  const blockW = 620;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1200 400">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${AMBER}"/>
      <stop offset="1" stop-color="${MAGENTA}"/>
    </linearGradient>
  </defs>
  <!-- The 0.78 x-scale fakes a condensed face; the build machine only has
       DejaVu/FreeSans, and this is a stand-in for the real logo anyway.
       Text is positioned pre-scale, hence the /0.78 on each x. -->
  <g font-family="${SANS}" font-weight="bold" transform="matrix(0.78 0 0 1 0 0)">
    <text x="${40 / 0.78}" y="245" font-size="200" fill="${CREAM}" letter-spacing="4">PRO</text>
  </g>
  <rect x="${blockX}" y="72" width="${blockW}" height="196" rx="10" fill="${ALERT}"/>
  <g font-family="${SANS}" font-weight="bold" transform="matrix(0.78 0 0 1 0 0)">
    <text x="${(blockX + blockW / 2) / 0.78}" y="245" font-size="185" fill="#FFFFFF"
          letter-spacing="4" text-anchor="middle">MODS</text>
  </g>
  <rect x="42" y="300" width="1120" height="10" rx="5" fill="url(#accent)"/>
  <text x="44" y="365" font-family="${SANS}" font-size="46" fill="${MUTED}"
        letter-spacing="10">VEHICLE TECH</text>
</svg>`;
}

/** Square mark used for the favicon / touch icon. */
function markSvg(size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="accent" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="${AMBER}"/>
      <stop offset="1" stop-color="${MAGENTA}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="${INK}"/>
  <rect x="40" y="40" width="432" height="432" rx="72" fill="none" stroke="url(#accent)" stroke-width="16"/>
  <g font-family="${SANS}" font-weight="bold" text-anchor="middle">
    <text x="256" y="238" font-size="150" fill="${CREAM}" letter-spacing="2">PRO</text>
    <text x="256" y="392" font-size="150" fill="${ALERT}" letter-spacing="2">MODS</text>
  </g>
</svg>`;
}

/* --------------------------------------------------------------- gallery -- */
/**
 * A dark tile with the caption baked in, so an un-swapped placeholder is
 * obvious at a glance.
 */
function tileSvg(index, caption, { w = 1200, h = 900 } = {}) {
  const hue = (index * 31) % 360;
  // The caption is rendered as real HTML text over the tile by the gallery
  // component, so it is deliberately NOT baked into the image — otherwise
  // every tile would show its label twice.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 1200 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${SURFACE}"/>
      <stop offset="1" stop-color="${INK}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${AMBER}"/>
      <stop offset="1" stop-color="${MAGENTA}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)"/>
  <circle cx="1010" cy="180" r="260" fill="hsl(${hue} 60% 50%)" opacity="0.07"/>
  <g stroke="${CREAM}" stroke-opacity="0.05" stroke-width="2">
    ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 90}" x2="1200" y2="${i * 90}"/>`).join('\n    ')}
  </g>
  <rect x="80" y="80" width="120" height="8" rx="4" fill="url(#accent)"/>
  <g font-family="${SANS}" font-weight="bold">
    <text x="80" y="200" font-size="44" fill="${MUTED}" letter-spacing="8">PLACEHOLDER ${String(index).padStart(2, '0')}</text>
  </g>
  <g stroke="${MUTED}" stroke-opacity="0.35" stroke-width="0.7" fill="none"
     stroke-linecap="round" stroke-linejoin="round" transform="translate(830 570) scale(9)">
    <path d="M1 6.5A2.5 2.5 0 0 1 3.5 4h3l1-1.5h5L13.5 4h3A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16h-13A2.5 2.5 0 0 1 1 13.5z"/>
    <circle cx="10" cy="10" r="3.2"/>
  </g>
  <text x="80" y="440" font-family="${SANS}" font-size="40" fill="${MUTED}" letter-spacing="4">SWAP FOR A REAL PHOTO</text>
  <text x="80" y="500" font-family="${SANS}" font-size="30" fill="${MUTED}" fill-opacity="0.7" letter-spacing="2">${esc(caption)}</text>
</svg>`;
}

/* ----------------------------------------------------------------- share -- */
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${AMBER}"/>
      <stop offset="1" stop-color="${MAGENTA}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.35" r="0.55">
      <stop offset="0" stop-color="${MAGENTA}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${INK}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${INK}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="${SANS}" font-weight="bold" text-anchor="middle">
    <text x="600" y="300" font-size="130" fill="${CREAM}" letter-spacing="6" transform="matrix(0.82 0 0 1 108 0)">PRO MODS</text>
    <text x="600" y="380" font-family="${SANS}" font-weight="normal" font-size="40" fill="${MUTED}" letter-spacing="10">VEHICLE TECH · UK</text>
  </g>
  <rect x="400" y="430" width="400" height="8" rx="4" fill="url(#accent)"/>
  <text x="600" y="520" font-family="${SANS}" font-size="34" fill="${MUTED}" letter-spacing="4" text-anchor="middle">DASH CAMS · CARPLAY · TRACKERS</text>
</svg>`;
}

/* ------------------------------------------------------------------ main -- */
const force = process.argv.includes('--force');
const only = process.argv.includes('--icons-only');

await mkdir(GALLERY, { recursive: true });
await mkdir(PUBLIC, { recursive: true });

const logoPath = path.join(ASSETS, 'logo.png');

if (!only) {
  // Never clobber a real logo the user has dropped in.
  if (force || !existsSync(logoPath)) {
    await sharp(Buffer.from(logoSvg())).png({ compressionLevel: 9 }).toFile(logoPath);
    console.log('wrote src/assets/logo.png (placeholder)');
  } else {
    console.log('kept existing src/assets/logo.png');
  }

  let i = 0;
  for (const item of gallery) {
    i += 1;
    const out = path.join(GALLERY, `${item.file}.jpg`);
    const existing = ['jpg', 'jpeg', 'png', 'webp', 'avif'].some((ext) =>
      existsSync(path.join(GALLERY, `${item.file}.${ext}`))
    );
    if (!force && existing) {
      console.log(`kept existing gallery image for ${item.file}`);
      continue;
    }
    await sharp(Buffer.from(tileSvg(i, item.caption)))
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);
    console.log(`wrote src/assets/gallery/${item.file}.jpg`);
  }
}

// Icons + social image are always regenerated so they can track a new logo.
await writeFile(path.join(PUBLIC, 'favicon.svg'), markSvg());
await sharp(Buffer.from(markSvg(512))).resize(32, 32).png().toFile(path.join(PUBLIC, 'favicon-32.png'));
await sharp(Buffer.from(markSvg(512))).resize(180, 180).png().toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
await sharp(Buffer.from(ogSvg())).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, 'og.png'));
console.log('wrote public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png, public/og.png');
