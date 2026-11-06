// Executed work, grouped by kind (as site-v4's Gallery: murals, water features and rockery, pergolas and gazebos,
// plus façades, landmarks and interiors from its design photos). Every image is the client's own photograph.
// No client names, places, years or sizes are given: none are confirmed for publishing yet. Add `client`,
// `location` and `year` to a project once the client allows it, and the cards and page show them.
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
      { image: 'ifa-freedom-of-press', alt: 'Statue of two figures reading a newspaper in a garden', caption: 'Statue of Freedom of Press.', shape: 'wide' },
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
]

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
