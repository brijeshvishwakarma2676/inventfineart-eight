// Project case studies. `hero` and gallery `image` values are names from src/assets/images.
export const projects = [
  {
    slug: 'still-water-courtyard',
    title: 'The Still Water Courtyard',
    discipline: 'Sculpture and GRC architecture',
    categories: ['sculptures', 'customised'],
    client: 'Boutique hotel',
    location: 'Assagao, Goa',
    year: 2024,
    scale: 'Courtyard of 420 m²',
    hero: 'hero',
    summary:
      'A pierced GRC monolith and a bronze sphere anchor a reflecting courtyard at the heart of a twelve-room hotel.',
    overview:
      'The architects asked for one object that would make the courtyard feel considered from every room that looks onto it. We proposed two: a tall monolith whose circular void lines up with the main entrance, and a bronze sphere placed where morning light lands first. Around them, a colonnade of GRC arches ties the courtyard back to the building.',
    concept:
      'Guests arrive through a dark corridor. The void in the monolith is the first thing they see: a small circle of daylight that grows into the whole courtyard as they walk toward it.',
    materials: [
      { name: 'Glass-reinforced concrete', note: 'Monolith and colonnade, honed limestone tone' },
      { name: 'Cold-cast bronze on FRP', note: 'Sphere, hand-patinated on site' },
      { name: 'Kota stone', note: 'Plinth, sourced from Rajasthan' },
    ],
    specs: [
      ['Monolith', '4.2 m tall, 1.4 m wide, 1.1 m void'],
      ['Sphere', 'Ø 1.2 m on a 400 mm plinth'],
      ['Colonnade', '11 arches, 3.2 m spans'],
      ['Fabrication', '14 weeks'],
      ['Installation', '9 days on site'],
    ],
    gallery: [
      { image: 'sc-monolith', alt: 'The pierced monolith against the courtyard wall', caption: 'The monolith, honed to match the limestone walls.', shape: 'tall' },
      { image: 'gr-colonnade', alt: 'GRC arches casting light onto the courtyard floor', caption: 'Eleven arches frame the courtyard on two sides.', shape: 'wide' },
      { image: 'sc-orbit', alt: 'The bronze sphere on its stone plinth', caption: 'The sphere, patinated by hand after installation.', shape: 'tall' },
      { image: 'st-sketch', alt: 'Early drawing of the monolith and void', caption: 'The first sketch: the void lined up with the entrance.', shape: 'wide' },
    ],
    featured: true,
  },
  {
    slug: 'monsoon-screen-house',
    title: 'Monsoon Screen House',
    discipline: 'GRC facade',
    categories: ['customised'],
    client: 'Private residence',
    location: 'Jayanagar, Bengaluru',
    year: 2023,
    scale: 'Facade of 186 m²',
    hero: 'gr-jali',
    summary:
      'A three-storey jali screen that keeps a west-facing home cool and fills it with moving patterns of light.',
    overview:
      'The house faces west onto a busy road. The owners wanted privacy and shade without closing the house in. We wrapped the front in a continuous GRC jali, set 600 mm off the glazing so air moves freely between the two.',
    concept:
      'The pattern changes density as it rises: open at ground level where the garden is, tighter at the bedrooms. From the street it reads as one carved surface.',
    materials: [
      { name: 'Glass-reinforced concrete', note: '30 mm panels in a pale sandstone tone' },
      { name: 'Galvanised steel', note: 'Concealed sub-frame' },
    ],
    specs: [
      ['Panels', '64, up to 1.2 × 2.4 m'],
      ['Open area', '38 to 52%'],
      ['Measured heat gain', '31% lower than before'],
      ['Fabrication', '10 weeks'],
    ],
    gallery: [
      { image: 'gr-fins', alt: 'Shadow pattern cast by the screen', caption: 'Side elevation, where the screen turns into fins.', shape: 'wide' },
      { image: 'st-texture', alt: 'Close view of the GRC surface', caption: 'The surface, sanded and sealed by hand.', shape: 'square' },
      { image: 'st-moulds', alt: 'Moulds for the jali panels in the workshop', caption: 'Panel moulds in the workshop.', shape: 'wide' },
    ],
    featured: true,
  },
  {
    slug: 'riverline-lobby',
    title: 'Riverline Lobby',
    discipline: 'Relief mural',
    categories: ['murals'],
    client: 'Corporate headquarters',
    location: 'Gachibowli, Hyderabad',
    year: 2023,
    scale: 'Wall of 64 m²',
    hero: 'mu-ripple',
    summary: 'A full-height relief of spreading ripples behind the reception of a technology campus.',
    overview:
      'The client asked for a lobby wall that felt calm in a building full of screens. We drew a single point of impact off-centre and let the rings run to the edges of the double-height wall, cast in 48 interlocking panels.',
    concept:
      'Light from the clerestory rakes across the relief through the day, so the rings sharpen in the morning and soften by evening.',
    materials: [
      { name: 'Glass-reinforced concrete', note: 'Relief panels, lime-wash white' },
      { name: 'Mineral sealer', note: 'Matte, dust-resistant' },
    ],
    specs: [
      ['Panels', '48, 1.2 × 1.2 m'],
      ['Relief depth', '12 mm'],
      ['Fabrication', '8 weeks'],
      ['Installation', '5 nights, lobby kept open'],
    ],
    gallery: [
      { image: 'st-sketch', alt: 'Setting out drawing for the ripple centre', caption: 'Setting out the centre point.', shape: 'wide' },
      { image: 'mu-arches', alt: 'Relief study in the workshop', caption: 'An earlier relief study we tested on site.', shape: 'tall' },
    ],
    featured: true,
  },
  {
    slug: 'halo-civic-plaza',
    title: 'Halo, Civic Plaza',
    discipline: 'FRP installation',
    categories: ['customised', 'sculptures'],
    client: 'Municipal commission',
    location: 'Baner, Pune',
    year: 2022,
    scale: '5 m tall',
    hero: 'fr-loop',
    summary: 'A tilted five-metre ring that gives a new public plaza its meeting point.',
    overview:
      'The plaza needed a landmark people could describe in one word. Halo is a tilted ring large enough to walk through, laminated in FRP over a steel core and installed in a single day.',
    concept:
      'The tilt points toward the old market street, so the ring frames it for people walking in from the new metro station.',
    materials: [
      { name: 'Fibre-reinforced plastic', note: 'Two halves, seamlessly joined' },
      { name: 'Structural steel', note: 'Internal core and footing' },
    ],
    specs: [
      ['Height', '5 m'],
      ['Weight', '540 kg'],
      ['Wind load', 'Designed to 44 m/s'],
      ['Installation', '1 day'],
    ],
    gallery: [
      { image: 'sc-ribbon', alt: 'Scale model in the workshop', caption: 'A study model in white FRP.', shape: 'wide' },
      { image: 'st-workshop', alt: 'Workshop with forms in progress', caption: 'Shaping the pattern before moulding.', shape: 'tall' },
    ],
    featured: true,
  },
  {
    slug: 'garden-of-vessels',
    title: 'Garden of Vessels',
    discipline: 'Planters',
    categories: ['planters'],
    client: 'Hill resort',
    location: 'Madikeri, Coorg',
    year: 2024,
    scale: '38 planters',
    hero: 'pl-trio',
    summary: 'Thirty-eight through-coloured planters that step down a terraced garden in three tones.',
    overview:
      'The landscape architect planned the garden in terraces. We grouped tapered planters in threes on each level, their tones darkening as the garden descends toward the valley.',
    concept: 'Every group is a small hill. Together they repeat the shape of the land around the resort.',
    materials: [
      { name: 'Through-coloured GRC', note: 'Pale, sand and umber' },
      { name: 'Drainage inserts', note: 'Concealed, serviceable' },
    ],
    specs: [
      ['Planters', '38 in 13 groups'],
      ['Heights', '600 to 1200 mm'],
      ['Fabrication', '7 weeks'],
    ],
    gallery: [
      { image: 'pl-fluted', alt: 'Fluted planter at the resort entrance', caption: 'A single fluted vessel marks the entrance.', shape: 'tall' },
      { image: 'pl-bowl', alt: 'Low basin of grasses on the lower terrace', caption: 'Low basins of grass on the lowest terrace.', shape: 'wide' },
    ],
    featured: false,
  },
  {
    slug: 'a-sun-for-the-library',
    title: 'A Sun for the Library',
    discipline: 'Painted relief mural',
    categories: ['murals'],
    client: 'School',
    location: 'Mysuru, Karnataka',
    year: 2022,
    scale: 'Wall of 28 m²',
    hero: 'mu-sun',
    summary: 'A rising sun in relief and earth pigments over the reading room of a primary school.',
    overview:
      'The school asked for a wall the children would remember. We worked with them on drawings for a term, then turned the most-loved idea into a raised sun and doorway with painted arcs around it.',
    concept: 'The doorway in the mural lines up with the real door to the reading room, so walking in feels like walking into the picture.',
    materials: [
      { name: 'GRC relief', note: 'Sun and doorway forms' },
      { name: 'Mineral pigments', note: 'Hand-painted on a lime base' },
    ],
    specs: [
      ['Wall', '7 × 4 m'],
      ['Workshops with students', '6'],
      ['Painting on site', '11 days'],
    ],
    gallery: [
      { image: 'st-sketch', alt: 'Drawing of the mural composition', caption: 'Final composition drawing.', shape: 'wide' },
      { image: 'st-texture', alt: 'Lime base texture', caption: 'The lime base before painting.', shape: 'square' },
    ],
    featured: false,
  },
]

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
