// The four services, from the owner's own list (inventfineart site-v4 app/data/lines.js).
export const categories = [
  {
    slug: 'sculptures',
    name: 'Sculptures',
    tagline: 'Art That Gives Your Space a Distinctive Identity',
    image: 'ifa-stone-ganesha',
    alt: 'A stylised Ganesha carved in pale stone, on a marble plinth in a lobby',
    blurb:
      'Decorative sculptures and custom statement pieces in steel, stone, bronze and FRP, for residences, gardens, hotels, commercial spaces and architectural projects.',
  },
  {
    slug: 'planters',
    name: 'Planters & Pots',
    tagline: 'Where Nature Meets Design',
    image: 'ifa-face-planter',
    alt: 'A round stone-finish planter carved with a smiling face',
    blurb:
      'Planters in FRP and GRC, including our own designs: removable planters on wheels, partition creeper planters and big trays for flower beds. For homes, balconies, gardens, hotels and commercial properties.',
  },
  {
    slug: 'murals',
    name: 'Murals & Wall Features',
    tagline: 'Art for Your Walls',
    image: 'ifa-relief-wall',
    alt: 'A full-length carved relief wall of birds and figures in a sandstone tone',
    blurb:
      'A mural is artwork raised in relief on a wall; a wall feature is a set of decorative panels that gives a wall its character. We make both to your design, in steel, FRP and mixed media.',
  },
  {
    slug: 'customised',
    name: 'Customised FRP & GRC',
    fullName: 'Customised Designer Products in FRP & GRC',
    tagline: 'Creative Solutions. Customized to Your Requirements.',
    image: 'ifa-grc-facade',
    alt: 'A white GRC facade wall of three-dimensional diamond panels',
    blurb:
      'Reception and console tables, utility products, garden benches, fins, grills, jaali and screens, chhajjas, columns, pillars and arches in FRP and GRC, made as per your design and requirement.',
  },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
