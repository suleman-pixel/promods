/**
 * SITE CONFIGURATION — every placeholder lives here.
 * ==================================================
 * Search this file for "TODO" and replace each value. Nothing was invented:
 * anything Pro Mods has not supplied is left as an obvious placeholder so it
 * cannot accidentally go live looking real.
 *
 * The README has the same list as a tick-box checklist.
 */

export const site = {
  name: 'Pro Mods',
  legalName: 'Pro Mods',
  /** One-line positioning statement, used in the hero and meta description. */
  tagline: 'Dash cams, Apple CarPlay and trackers — installed properly.',
  description:
    'UK vehicle tech specialists. Dash cam supply and installation, Apple CarPlay activation and retrofits, and insurance-approved tracker fitting. Road Angel approved installer.',

  /* ---------------------------------------------------------------- contact */
  /** TODO: PHONE NUMBER — replace with the real number, e.g. '01234 567890' */
  phone: '[TODO: PHONE NUMBER]',
  /** TODO: PHONE NUMBER (dialable) — digits only with country code, e.g. '+441234567890' */
  phoneHref: '',
  /** TODO: EMAIL ADDRESS — replace with the real address, e.g. 'hello@promods.co.uk' */
  email: '[TODO: EMAIL ADDRESS]',
  /** TODO: SERVICE AREA — e.g. 'Manchester and 30 miles around' */
  serviceArea: '[TODO: SERVICE AREA]',
  /** TODO: ADDRESS — workshop address, or delete the block if mobile-only */
  address: {
    street: '[TODO: STREET ADDRESS]',
    locality: '[TODO: TOWN/CITY]',
    region: '[TODO: COUNTY]',
    postcode: '[TODO: POSTCODE]',
    country: 'GB',
  },
  /** TODO: OPENING HOURS — e.g. 'Mon–Fri 9am–6pm, Sat 9am–1pm' */
  openingHours: '[TODO: OPENING HOURS]',

  /* ---------------------------------------------------------------- social */
  instagram: 'https://www.instagram.com/promodsuk/',
  instagramHandle: '@promodsuk',

  /* ------------------------------------------------------------------ form */
  /**
   * TODO: FORMSPREE FORM ID
   * ------------------------------------------------------------------------
   * 1. Create a free form at https://formspree.io/ (New Form → email → Create).
   * 2. Formspree shows an endpoint like https://formspree.io/f/abcdwxyz
   * 3. Paste ONLY the last part (the 8-character ID, e.g. 'abcdwxyz') below,
   *    replacing 'your-form-id'.
   *
   * Until you do, the form validates as normal but shows a "not configured
   * yet" notice instead of sending, so you can never lose a real enquiry.
   */
  formspreeId: 'your-form-id',
};

/** Convenience: the full Formspree endpoint. */
export const formspreeEndpoint = `https://formspree.io/f/${site.formspreeId}`;

/** True while the Formspree ID is still the placeholder. */
export const formspreeConfigured = site.formspreeId !== 'your-form-id';

/** `tel:` href, falling back to nothing usable while the number is a TODO. */
export const telHref = site.phoneHref ? `tel:${site.phoneHref}` : '';

/** `mailto:` href with a helpful pre-filled subject. */
export const mailtoHref = site.email.startsWith('[TODO')
  ? ''
  : `mailto:${site.email}?subject=${encodeURIComponent('Quote request — Pro Mods')}`;

/* -------------------------------------------------------------- services -- */
/**
 * Single source of truth for the three services. Used by the home-page cards,
 * the Services page sections and the contact form's select options.
 */
export const services = [
  {
    id: 'dash-cams',
    name: 'Dash cam installation',
    short: 'Dash cams',
    summary:
      'Front, front-and-rear, and hardwired setups with parking mode — supplied and fitted so the camera looks like it left the factory that way.',
    blurb:
      'A dash cam is only as good as its install. We supply and fit front-only, front-and-rear and hardwired systems, hiding every run of cable behind trim and headlining so nothing dangles across your windscreen. Hardwiring frees up your 12V socket and, on supported cameras, enables parking mode so the camera keeps watching while the car is parked — with voltage cut-off set to protect your battery.',
    includes: [
      'Camera positioned for a clear, legal view and a tidy factory look',
      'Hardwire kit to the fuse box using an add-a-circuit tap — no cut or spliced factory wiring',
      'Battery-safe voltage cut-off configured for parking mode',
      'Rear camera cable routed through trim, headlining and tailgate looms',
      'Time, date, plate stamp and loop settings configured before handover',
      'A walkthrough of how to pull footage off the card',
    ],
    useCase:
      'Typical use case: a daily driver whose owner wants evidence for a not-at-fault claim, plus parking protection in a supermarket car park.',
  },
  {
    id: 'carplay',
    name: 'Apple CarPlay activation & retrofits',
    short: 'Apple CarPlay',
    summary:
      'Enable CarPlay and Android Auto on factory head units, or retrofit an interface where the hardware allows — keeping your original screen and controls.',
    blurb:
      'Plenty of cars rolled off the line with CarPlay-capable hardware and the feature switched off. Where that is the case we activate it by coding the vehicle, so you keep the factory screen, steering wheel controls and menus. Where activation is not possible we can retrofit an interface that adds wired or wireless CarPlay and Android Auto to the existing display, rather than replacing your dashboard with an aftermarket unit.',
    includes: [
      'Free compatibility check on your exact model and head unit before booking',
      'Activation by vehicle coding where the factory hardware supports it',
      'Retrofit interface fitted behind the dash where activation is not possible',
      'Wired or wireless CarPlay and Android Auto, depending on the option chosen',
      'Steering wheel controls, microphone and reversing camera kept working',
      'Reversible: original coding and parts retained so the car can be put back to standard',
    ],
    useCase:
      'Typical use case: a three-year-old car with a factory screen that has Bluetooth but no CarPlay, whose owner wants maps and messages on the built-in display.',
  },
  {
    id: 'trackers',
    name: 'Vehicle tracker installation',
    short: 'Vehicle trackers',
    summary:
      'Theft-recovery and insurance-approved trackers, concealed and wired to survive a determined thief with a trim tool.',
    blurb:
      'A tracker is your best chance of getting a stolen vehicle back, and on many performance and high-value cars an approved tracker is a condition of cover. We install theft-recovery and insurance-approved units, concealing them away from the obvious places and wiring them into the harness so they are not easily found or pulled. Where your insurer requires an installation certificate, you get the paperwork you need.',
    includes: [
      'Insurance-approved and theft-recovery units installed to the required standard',
      'Concealed mounting away from predictable locations',
      'Soldered and loomed connections that follow the factory harness',
      'Backup battery and tamper alerts configured where the unit supports them',
      'Subscription and app set-up walked through with you',
      'Installation certificate for your insurer where the unit requires one',
    ],
    useCase:
      'Typical use case: an insurer asking for a Thatcham-category approved tracker before they will cover a keyless-entry car kept on a driveway.',
  },
];

/* --------------------------------------------------------------------- FAQ */
export const faqs = [
  {
    q: 'Will an installation void my vehicle warranty?',
    a: 'No. We work to a no-cut, reversible standard: power is taken from the fuse box with add-a-circuit taps rather than cut or spliced factory wiring, and original parts and coding are retained so the vehicle can be returned to standard. Under UK consumer law a manufacturer cannot void your whole warranty over an accessory — only a fault actually caused by the aftermarket part could be excluded. If your vehicle is on a lease or PCP, check the return conditions with the finance company first and we will fit accordingly.',
  },
  {
    q: 'Do you come to me, or do I come to you?',
    a: 'Both. Most dash cam, CarPlay and tracker work is done as mobile fitting at your home or workplace, as long as there is somewhere safe and reasonably sheltered to park. Some jobs are better done in the workshop. Tell us your postcode and the job when you enquire and we will confirm which suits. Service area: [TODO: SERVICE AREA].',
  },
  {
    q: 'How long does a typical install take?',
    a: 'A hardwired front dash cam is usually a straightforward appointment; adding a rear camera, a CarPlay retrofit or a concealed tracker takes longer because more trim comes off and every cable is routed out of sight. We would rather quote you an honest time for your specific car than a headline figure, so you will get a realistic window when you book — and we do not rush the tidy-up.',
  },
  {
    q: 'Do you supply the hardware, or can I bring my own?',
    a: 'Either. We supply cameras, CarPlay interfaces and trackers and will recommend the right specification for how you actually use the car — including Road Angel products, as an approved installer. If you have already bought a unit, we are happy to fit customer-supplied hardware; just send us the model before booking so we can check it is suitable and that we have the right fitting kit.',
  },
  {
    q: 'What cars do you cover?',
    a: 'Most modern cars, vans and light commercials. CarPlay activation in particular depends on the exact head unit fitted to your vehicle, so send us the make, model, year and trim (or the registration) and we will check compatibility before you commit to anything.',
  },
];

/* ---------------------------------------------------- "Why Pro Mods" strip */
export const differentiators = [
  {
    title: 'Road Angel approved',
    body: 'An approved installer for Road Angel products, fitted to the standard the manufacturer expects.',
  },
  {
    title: 'Tidy hidden wiring',
    body: 'Cables routed behind trim, headlining and pillars. When we hand the car back, there is nothing on show.',
  },
  {
    title: 'No cut wires',
    body: 'Fuse box taps and factory connectors instead of splices, so every install is reversible.',
  },
  {
    title: 'Mobile fitting',
    body: 'We come to your home or workplace across [TODO: SERVICE AREA], or you can bring the car to us.',
  },
];
