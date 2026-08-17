/**
 * GALLERY CONTENT
 * ---------------
 * Every image on the Gallery page (and the 4-image teaser on the home page)
 * is listed here. To swap a placeholder for a real photo:
 *
 *   1. Save your photo over `src/assets/gallery/<file>.jpg`, keeping the same
 *      file name. (.jpg, .jpeg, .png, .webp and .avif all work — if you change
 *      the extension, nothing else needs updating.)
 *   2. Edit the `caption` and `alt` text below to describe the real photo.
 *   3. That's it. Astro optimises, resizes and lazy-loads it automatically.
 *
 * `caption` is the visible label. `alt` is for screen readers and should
 * describe what is in the picture, not repeat the caption verbatim.
 *
 * Add or remove entries freely — the grid reflows on its own.
 */
export const gallery = [
  {
    file: '01-dash-cam-hardwired',
    caption: 'Dash cam — hardwired install',
    alt: 'Front dash cam mounted behind a rear-view mirror with the cable tucked into the headlining',
  },
  {
    file: '02-dash-cam-front-rear',
    caption: 'Dash cam — front and rear',
    alt: 'Rear dash cam fitted to a tailgate window with the wiring hidden in the trim',
  },
  {
    file: '03-carplay-retrofit',
    caption: 'Apple CarPlay — factory head unit retrofit',
    alt: 'Factory infotainment screen showing the Apple CarPlay home screen',
  },
  {
    file: '04-carplay-activation',
    caption: 'CarPlay activation — coding complete',
    alt: 'Laptop connected to a vehicle diagnostic port during CarPlay activation',
  },
  {
    file: '05-tracker-install',
    caption: 'Tracker — concealed install',
    alt: 'Vehicle tracker unit concealed behind interior trim panelling',
  },
  {
    file: '06-tracker-wiring',
    caption: 'Tracker — soldered and loomed wiring',
    alt: 'Close-up of tracker wiring wrapped in loom tape alongside the factory harness',
  },
  {
    file: '07-fusebox-tap',
    caption: 'Fuse box — add-a-circuit tap',
    alt: 'Add-a-circuit fuse tap fitted into a vehicle fuse box with no cut wires',
  },
  {
    file: '08-cable-routing',
    caption: 'Cable routing — A-pillar tuck',
    alt: 'Camera cable routed neatly behind an A-pillar trim panel',
  },
  {
    file: '09-road-angel-fitment',
    caption: 'Road Angel — approved fitment',
    alt: 'Road Angel device fitted to a windscreen in a tidy factory-look position',
  },
  {
    file: '10-finished-cabin',
    caption: 'Finished cabin — nothing on show',
    alt: 'Vehicle cabin after installation with no visible cables or brackets',
  },
];

/** The first four images double as the home-page teaser. */
export const teaser = gallery.slice(0, 4);
