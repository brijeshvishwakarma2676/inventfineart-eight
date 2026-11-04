// Company details used across the site.
// Source: inventfineart site-v4 app/data/site.js (taken from the client's old site).
// Values marked PROVISIONAL there are still to be confirmed by the client before launch.
export const site = {
  name: 'Invent Fine Art',
  tagline: 'Reinventing spaces through Innovations in Art',
  founded: 2009, // Confirmed by the owner (2026-11-03); the old Home page said 2008
  descriptor:
    'Sculptures, designer planters, murals, GRC products, GRC grilles and FRP products, made to your design in our own factory.',
  email: 'inventfineart.mum@gmail.com', // PROVISIONAL: confirm enquiry inbox
  phone: '+91 93232 10327',
  phoneHref: '+919323210327',
  phones: [
    { label: '+91 93232 10327', href: '+919323210327' },
    { label: '+91 96196 60089', href: '+919619660089' },
    { label: '+91 89767 77123', href: '+918976777123' },
  ],
  whatsapp: '919323210327', // PROVISIONAL: confirm which number has WhatsApp
  // Office (the business address)
  address: ['No. 14, Jay Bharat Zip Sangh', 'Vadar Pada, Kandivali East', 'Mumbai 400101, Maharashtra, India'],
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=19.1982543,72.8644545',
  factory: {
    // PROVISIONAL: the old site says Thane; Nalasopara is now in Palghar district
    address: ['Opp. Jag Mata Mandir, Wagholi Road', 'Nalasopara West', 'Thane 401203, Maharashtra, India'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=19.4196725,72.7856904',
  },
  hours: '', // Not known yet: add opening hours once the client confirms them
  visits: 'Visits by appointment',
  // Set this to a form endpoint (Formspree, Basin, your own API) to receive enquiries directly.
  // Left empty, the contact form opens the visitor's email app with the enquiry written out.
  formEndpoint: '',
  // No social profiles on record yet. Add { label, href } entries and the footer shows them.
  socials: [],
}

export const whatsappLink = (text = `Hello, I would like to discuss a project with ${site.name}.`) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const navigation = [
  { to: '/about', label: 'Studio' },
  { to: '/collections', label: 'Collections' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]
