// Executed work, grouped by kind (as site-v4's Gallery: murals, water features and rockery, pergolas and gazebos,
// plus façades, landmarks and interiors from its design photos). Every image is the client's own photograph.
// No client names, places, years or sizes are given: none are confirmed for publishing yet. Add `client`,
// `location` and `year` to a project once the client allows it, and the cards and page show them.
// `heroFocus` (optional): a Tailwind object-position class, so wide crops of the hero keep the subject in frame.
// Gallery `shape`: tall (portrait), wide (landscape) or square, matched to each photograph.
export const projects = [
  {
    slug: 'landmarks-and-public-statues',
    title: 'Landmarks and public statues',
    discipline: 'Sculpture',
    categories: ['sculptures'],
    hero: 'ifa-eagle-landmark',
    summary: 'Statues and landmark sculptures for roundabouts, campuses and public gardens, drawn first and then built to stand outdoors.',
    overview:
      'A landmark starts as a drawing. The eagle, sword and anchor below began as an ink drawing, then were made at full size and fixed on a rock base beside the road. The same studio makes portrait and equestrian statues, and group sculptures for public gardens.',
    gallery: [
      { image: 'ifa-eagle-drawing', alt: 'Ink drawing of an eagle, a sword and an anchor on a rock base', caption: 'The concept drawing for the eagle and sword landmark above.', shape: 'square' },
      { image: 'ifa-equestrian', alt: 'Equestrian statue on a high plinth against the sky', caption: 'Equestrian statue on its plinth.', shape: 'wide' },
      { image: 'ifa-gandhi', alt: 'Bronze-finished statue of Gandhi walking with a staff', caption: 'Gandhi statue, before installation.', shape: 'tall' },
    ],
    featured: true,
  },
  {
    slug: 'water-features-and-rockery',
    title: 'Water features and rockery',
    discipline: 'Water features',
    categories: ['sculptures', 'customised'],
    hero: 'ifa-rock-waterfall',
    summary: 'Rock waterfalls, rockery, water walls and fountain sculptures for gardens, entrances and clubhouses.',
    overview:
      'Rockery is shaped by hand on site, so each waterfall follows the ground it sits on. Alongside it we make water walls and fountain sculptures, from the first drawing to the finished, running feature.',
    gallery: [
      { image: 'ifa-water-wall', alt: 'Long dark water wall with jets in a garden', caption: 'Water wall.', shape: 'wide' },
      { image: 'ifa-sphere-fountain', alt: 'Perforated sphere fountain in a shallow pool', caption: 'Sphere fountain.', shape: 'wide' },
      { image: 'ifa-rockery', alt: 'Hand-shaped rockery around young palms', caption: 'Rockery, newly finished.', shape: 'wide' },
      { image: 'ifa-rockery-build', alt: 'Workers shaping a rock wall around a pool', caption: 'A rock wall taking shape on site.', shape: 'wide' },
      { image: 'ifa-rock-wall-fountain', alt: 'Stone fountain wall in a lawn', caption: 'Stone fountain wall in a garden.', shape: 'wide' },
    ],
    featured: true,
  },
  {
    slug: 'murals-and-relief-art',
    title: 'Murals and relief art',
    discipline: 'Murals and wall features',
    categories: ['murals'],
    hero: 'ifa-metal-leaf-wall',
    summary: 'Carved relief walls, metal wall art and lit wall pieces, each made for one wall in a home, lobby or office.',
    overview:
      'Every wall is different, so every mural starts from the wall itself: its size, its light and the people who pass it. We make them in relief, in metal and in mixed media, and fix them on site.',
    gallery: [
      { image: 'ifa-relief-wall', alt: 'Long wall carved in low relief with figures, birds and leaves', caption: 'Carved relief wall.', shape: 'wide' },
      { image: 'ifa-dancers-relief', alt: 'Two white dancer figures on a dark lobby wall', caption: 'Dancers relief, lobby wall.', shape: 'wide' },
      { image: 'ifa-climbing-wall', alt: 'Figures climbing a lit wall on ropes', caption: 'Wall of climbing figures.', shape: 'wide' },
      { image: 'ifa-eagle-wall', alt: 'Metal eagle with spread wings on a patterned wall', caption: 'Metal eagle wall art.', shape: 'wide' },
      { image: 'ifa-relief-panels', alt: 'Tall fabric-like relief panels with gold folds along a wall', caption: 'Relief wall panels.', shape: 'wide' },
      { image: 'ifa-blue-leaf-wall', alt: 'Metal leaves hung in front of a blue wall above a sofa', caption: 'Metal leaves on a blue wall.', shape: 'wide' },
    ],
    featured: true,
  },
  {
    slug: 'grc-facades',
    title: 'GRC façades',
    discipline: 'Customised GRC',
    categories: ['customised'],
    hero: 'ifa-grc-facade-front',
    summary: 'Faceted 3D façade panels, cladding and heritage-style fronts, made in GRC and fixed on site.',
    overview:
      'GRC lets a building front carry depth and pattern without the weight of stone. We make the panels to the architect’s drawings in our factory, then install them on site with our own team.',
    gallery: [
      { image: 'ifa-grc-facade', alt: 'Faceted white GRC panels behind a palm in a planter', caption: '3D façade wall.', shape: 'tall' },
      { image: 'ifa-grc-facade-corner', alt: 'Corner of a building wrapped in faceted GRC panels', caption: 'The same façade, at the corner.', shape: 'wide' },
      { image: 'ifa-heritage-facade', alt: 'Ornate heritage-style façade under scaffolding', caption: 'Heritage-style façade, during installation.', shape: 'wide' },
      { image: 'ifa-facade-install', alt: 'Workers fixing white cladding panels to a building', caption: 'Cladding panels being fixed.', shape: 'tall' },
    ],
    featured: true,
  },
  {
    slug: 'interior-installations',
    title: 'Interior installations',
    discipline: 'Customised FRP',
    categories: ['customised'],
    hero: 'ifa-curved-interior',
    summary: 'Lit lobby pieces, curved room linings, sculptural tables and wall pieces for interiors.',
    overview:
      'Inside a building, a piece has to work with the ceiling, the light and the furniture around it. These are made to the room: a meeting space lined in curved slats, a lobby of lit forms, a table that grows from a single leaf.',
    gallery: [
      { image: 'ifa-lobby-installation', alt: 'Three lit cones joined by curved bands in a lobby', caption: 'Illuminated lobby installation.', shape: 'wide' },
      { image: 'ifa-curved-interior-sphere', alt: 'Curved slatted walls and a white sphere in a meeting room', caption: 'Curved interior, with its sphere.', shape: 'wide' },
      { image: 'ifa-wave-sculpture', alt: 'Gold crumpled band running along a dark wall', caption: 'Wave wall sculpture.', shape: 'wide' },
      { image: 'ifa-leaf-table-lounge', alt: 'Low table with a silver leaf base in a white lounge', caption: 'Sculptural table, in its lounge.', shape: 'wide' },
    ],
    featured: false,
  },
  {
    slug: 'pergolas-and-gazebos',
    title: 'Pergolas and gazebos',
    discipline: 'Outdoor structures',
    categories: ['customised'],
    hero: 'ifa-garden-pergola',
    summary: 'Garden pergolas, lattice screens, gazebos and columns that give an outdoor space a room of its own.',
    overview:
      'A pergola or gazebo turns part of a garden into a place to sit. We make them with columns, beams and lattice screens to suit the house beside them, and fix them on site.',
    gallery: [
      { image: 'ifa-lattice-pergola', alt: 'White lattice pergola along the front of a house', caption: 'Lattice pergola.', shape: 'wide' },
      { image: 'ifa-gazebo', alt: 'Ornate dark gazebo in a garden', caption: 'Garden gazebo.', shape: 'wide' },
      { image: 'ifa-lattice-gazebo', alt: 'Gazebo with lattice screens on a terrace, being finished', caption: 'Gazebo with lattice screens.', shape: 'tall' },
      { image: 'ifa-columns', alt: 'Fluted white columns carrying a timber pergola', caption: 'Classical columns.', shape: 'wide' },
    ],
    featured: false,
  },
  // The two below are our founder's landmark commissions, from the "Kiran Stone" photographs, shown from block or
  // wire frame to the finished piece. The Hawker page also shows the press cuttings, which name Lokmat Media and
  // Nagpur (published coverage; see src/data/press.js).
  {
    slug: 'sculpture-of-hawker',
    title: 'Sculpture of Hawker',
    discipline: 'Sculpture',
    categories: ['sculptures'],
    hero: 'ks-hawker-sky',
    heroFocus: 'object-[50%_0%]',
    summary: 'A newspaper hawker on a real bicycle, the day’s paper held high, built coil by coil from wound metal wire.',
    overview:
      'A tribute to the hawkers who bring the paper to every door, in rain, summer or winter. Our founder first drew the figure in space as an open frame of rods, then wrapped it, coil by coil, in metal wire until it became a body. It rides a real bicycle, so the sculpture belongs to the street it stands on.',
    gallery: [
      { image: 'ks-hawker-armature', alt: 'Open frame of metal rods in the shape of a seated figure, in a workshop yard', caption: 'The figure, first drawn as an open frame of rods.', shape: 'tall' },
      { image: 'ks-hawker-welding', alt: 'An artisan welding wire onto the frame of a large figure', caption: 'Wrapping the frame in wire, one coil at a time.', shape: 'tall' },
      { image: 'ks-hawker-coils', alt: 'Close view of the figure covered in wound wire, with sparks from a grinder', caption: 'Nearly finished: every surface is wound wire.', shape: 'tall' },
      { image: 'ks-hawker-front', alt: 'The finished hawker figure on a bicycle, holding a newspaper above his head', caption: 'Finished, on its bicycle.', shape: 'tall' },
      { image: 'ks-hawker-rear', alt: 'The hawker sculpture seen from behind, newspaper raised against a blue sky', caption: 'From behind, the paper raised high.', shape: 'tall' },
      { image: 'ks-hawker-unveiling', alt: 'The sculpture under a canopy of drapes at its unveiling, with guests gathered in front', caption: 'Unveiled at Samvidhan Square, Nagpur, in January 2015.', shape: 'square' },
    ],
    press: true, // shows the "In the press" cuttings (src/data/press.js)
    featured: false,
  },
  {
    slug: 'statue-of-freedom-of-press',
    title: 'Statue of Freedom of Press',
    discipline: 'Sculpture in stone',
    categories: ['sculptures'],
    hero: 'ks-press-sunset',
    summary: 'Two figures reading the morning paper together, carved from single blocks of stone and lit from below at night.',
    overview:
      'The statue began as a raw block, dressed by hand in the stone yard. Our founder roughed out the two figures, then carved them down to the folds of the newspaper they share. The finished pair sits on a stepped plinth with lights set into it, so the stone glows after dark.',
    gallery: [
      { image: 'ks-stone-block', alt: 'A carver with a hammer on top of a large raw stone block', caption: 'A raw block, dressed by hand.', shape: 'tall' },
      { image: 'ks-press-rough', alt: 'Two seated figures roughed out of stone, still showing tool marks', caption: 'The two figures, roughed out.', shape: 'tall' },
      { image: 'ks-press-carving', alt: 'A carver working on the statue in a cloud of stone dust', caption: 'Carving the newspaper, in a cloud of dust.', shape: 'tall' },
      { image: 'ks-press-yard', alt: 'The finished statue of two figures reading a newspaper, in the stone yard', caption: 'Finished, before it left the yard.', shape: 'tall' },
      { image: 'ks-press-night', alt: 'The statue at night on its stepped plinth, lit from lights set into the base', caption: 'In place, lit from below.', shape: 'tall' },
      { image: 'ks-press-night-close', alt: 'The two stone figures at night, lamp light falling on their faces', caption: 'After dark, the stone takes the light.', shape: 'wide' },
    ],
    featured: false,
  },
]

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
