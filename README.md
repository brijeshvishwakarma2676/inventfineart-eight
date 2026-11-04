# Forma Atelier website

A studio website for sculpture, planters, murals and FRP/GRC architectural elements.
React 19 + Vite 6, Tailwind CSS v4, React Router 7, Motion for React, Lucide icons.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

Requires Node 18 or newer.

## Making it yours

All content lives in `src/data/`. No component needs editing to change words or images.

| File | What it holds |
| --- | --- |
| `site.js` | Studio name, email, phone, WhatsApp number, address, hours, map link, social links, navigation |
| `categories.js` | The five collections and their descriptions |
| `products.js` | Catalogue pieces: code, summary, description, specifications, images |
| `projects.js` | Case studies: facts, overview, concept, materials, specifications, gallery |

The studio name, address, phone number and email are placeholders. Replace them before launch.

### Replacing the imagery

The site ships with generated placeholder "plates" in `src/assets/images/` (SVG renders in a consistent gallery-lit style).
Every image is referenced **by file name only**, so to use real photography:

1. Export the photo at roughly 2400 px on its long edge, as `.webp` or `.jpg`.
2. Give it the same name as the plate it replaces, e.g. `hero.webp`.
3. Drop it into `src/assets/images/`.

A photograph always takes priority over the plate of the same name (avif > webp > jpg > png > svg).
You can delete the matching `.svg` afterwards. To add new images, drop them in and reference the name in `src/data/`.

Images that matter most, and their crop:

| Name | Used for | Notes |
| --- | --- | --- |
| `hero` | Home page arch | Landscape. Keep the subject in the middle third: it is first seen through a narrow arch, then full screen |
| `st-workshop` | Studio introduction, Studio page | Portrait crop, shown in an arch |
| `mu-arches` | Custom commission sections | Portrait crop, shown in an arch |
| Category images | `categories.js` | Shown at 4:5 |

### Receiving enquiries

The contact form validates input and, by default, opens the visitor's email app with the enquiry written out.
To receive enquiries directly, create a form endpoint (Formspree, Basin, Getform or your own API) and set
`formEndpoint` in `src/data/site.js`. The form then POSTs JSON with every field plus a plain-text `summary`.

## Design system

Tokens are defined once in `src/index.css` under `@theme` and used as Tailwind utilities.

- **Colour:** limestone `#F1ECE3` ground, plaster `#E6DED1`, sandstone `#C9BBA3`, ash `#645B4F` for secondary text,
  graphite `#262320` for type, basalt `#2B2825` for dark sections, cast bronze `#82532D` accent, brass `#B4925C` for hairlines on dark.
  All text pairings meet WCAG AA.
- **Type:** Marcellus (display, based on Roman inscriptional capitals) and Albert Sans (interface and body), self-hosted via Fontsource.
  Scale utilities: `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-statement`, `t-lead`, `t-label`.
- **The arch:** the `arch` utility gives any portrait box a true semicircular head. It is reserved for images that imply a space
  (the hero, the studio, commission invitations). Everything else is square-cornered.
- **Layout:** a 12-column grid inside the `shell` utility (max 1520 px), with asymmetric spans and vertical offsets
  so each section has its own composition.

## Motion

One easing curve (`--ease-sculpt`, `cubic-bezier(0.22, 1, 0.36, 1)`) is shared by CSS and Motion (`src/lib/motion.js`).

- **Hero:** the arch fills upward on load, the headline rises word by word, then scrolling walks the visitor through the arch
  until the photograph is full screen (`components/home/Hero.jsx`).
- **Page transitions:** pages settle in from below and lift away on exit (`components/PageTransition.jsx`).
- **Scroll:** images are unveiled upward with optional parallax (`ImageReveal`), headings rise word by word (`RevealText`).
- **Hover:** fill-from-base buttons, underline links, image swaps on product cards, a "View project" disc that follows the cursor on project cards.

Visitors who ask their system for reduced motion get a static arch, no parallax and no transforms (`MotionConfig reducedMotion="user"` plus a CSS fallback).

## Structure

```
src/
  components/     Navbar, Footer, Button, SectionHeading, ProjectCard, ProductCard, ImageReveal,
                  RevealText, Img, PageTransition, CustomCTA
    home/         Hero, StudioIntro, CreationsIndex, FeaturedProjects, Materials, Process
  pages/          Home, About, Collections, ProductDetails, Projects, ProjectDetails, Contact, NotFound
  layouts/        MainLayout
  data/           site, images, categories, products, projects
  hooks/          usePageMeta (title and description per route), useMediaQuery
  lib/            motion (shared easing and variants)
```

Routes: `/`, `/about`, `/collections` (`?category=sculptures|planters|murals|frp|grc`), `/collections/:slug`,
`/projects`, `/projects/:slug`, `/contact` (accepts `?piece=` and `?type=` to prefill an enquiry).

Pages other than Home are lazy-loaded.

## Deploying

It's a single-page app, so the host must serve `index.html` for every path. Both common setups are included:
`public/_redirects` for Netlify and `vercel.json` for Vercel. On other hosts, add an equivalent rewrite rule.
