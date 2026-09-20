# Elite Force | Website

Private security and debt recovery site for Elite Force, live at https://eliteforce.site. Built by Sidedoor Digital.
Intellectual property of Sidedoor Digital.

## Structure
- `index.html` Single-page brochure site. Cover (scene plate with the crest laid over it and a foil sweep), credential rail, motto band, then spreads: introduction, protection, collection, standard, process, coverage, questions, discretion notice, enquiry
- `privacy.html` Privacy notice (served at /privacy)
- `digital-suite.html` Private Client Suite proposal. Unlinked, noindex. Share the direct link only.
- `404.html` Not found page
- `assets/brochure.css` Homepage styles. `assets/site.css` styles the other pages
- `assets/site.js` Loaded in the head. Adds the `js` class, then runs reveals, header, menu, swipe decks, FAQ and the enquiry form. The form builds a WhatsApp message and opens WhatsApp; nothing is sent to or stored by the site
- `assets/hero.webp` (2560w), `hero-1600.webp`, `hero-1024.webp`, `hero-mobile.webp` and the `panel-*.webp` plates are all cut from one clean scene photograph, upscaled and lightly graded, so crops stay sharp on retina screens
- `assets/crest-hero.webp` (1100w) and `crest-hero-620.webp` are the crest keyed off its background with transparency. The cover lays it over the panelled door as its own element, so it stays sharp and the `.foil` sweep is masked to the crest outline rather than to a circle
- `assets/wordmark.webp` and `wordmark.png` are the name set in Cinzel with a foil gradient rather than a cutout of the logo artwork, so it stays crisp at any size
- Three typefaces, all self-hosted in `assets/fonts`. Cinzel is the brand voice and matches the lettering in the crest (wordmark, motto, folio lines, large section names, pillar names, phone number). Cormorant Garamond does the writing (headings, statements, questions). Archivo does body copy, navigation, buttons and forms
- `favicon.ico`, `assets/favicon-32.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` are the lion crest
- `assets/og-image.jpg` 1200 x 630 social card with the full crest
- `_headers` Security headers and cache rules for Cloudflare Pages
- `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`

## Done
- Domain set to https://eliteforce.site everywhere (canonical, Open Graph, schema, sitemap, robots, llms.txt)
- Favicon, app icons and social image match the crest
- All contact runs through WhatsApp and calls on +44 7348 131285. No email address, no database, no backend
- Fonts self-hosted on every page and the content security policy fixed to allow them
- Imagery recut from a clean scene plate, so no text or crest is baked into a photograph
- Palette moved off flat neutral grey: warm ink black, a deep green-black band echoing the crest plaque, deeper gold, and fine grain across the page so it reads like print

## Still to do (needs access or client input)
1. Cloudflare Pages: add `eliteforce.site` as a custom domain on the project.
2. Client to supply: registered company name, number, registered office and ICO number for the footer and privacy notice.
3. Client to confirm: SIA licensing wording and the one working day response promise.
4. Submit the sitemap in Google Search Console and create a Google Business Profile, using the WhatsApp number as the contact.

## Contact number
The WhatsApp and call number appears in the header, cover, enquiry section, footer, phone contact bar, FAQ, privacy notice and structured data, and the form sends to it from `assets/site.js`. To change it, find and replace `447348131285` (links, schema and site.js) and `+44 7348 131285` (visible text) in `index.html`, `privacy.html`, `assets/site.js` and `llms.txt`.
