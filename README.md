# Elite Force | Website

Private security and debt recovery site for Elite Force, live at https://eliteforce.site. Built by Sidedoor Digital.
Intellectual property of Sidedoor Digital.

## Structure
- `index.html` Single-page brochure site. Cover (brand poster with foil sweep), motto band, then spreads: introduction, protection, collection, standard, process, coverage, questions, enquiry
- `privacy.html` Privacy notice (served at /privacy)
- `digital-suite.html` Private Client Suite proposal. Unlinked, noindex. Share the direct link only.
- `404.html` Not found page
- `assets/brochure.css` Homepage styles. `assets/site.css` styles the other pages
- `assets/site.js` Loaded in the head. Adds the `js` class, then runs reveals, header, menu, swipe decks, FAQ and the enquiry form. The form builds a WhatsApp message and opens WhatsApp; nothing is sent to or stored by the site
- `assets/hero.webp` (2560w), `hero-1600.webp`, `hero-mobile.webp` and the `panel-*.webp` plates are all cut from one 4x super-resolved master of the brand poster, so crops stay sharp on retina screens
- `favicon.ico`, `assets/favicon-32.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` are the lion crest
- `assets/og-image.jpg` 1200 x 630 social card with the full crest
- `_headers` Security headers and cache rules for Cloudflare Pages
- `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`

## Done
- Domain set to https://eliteforce.site everywhere (canonical, Open Graph, schema, sitemap, robots, llms.txt)
- Favicon, app icons and social image match the crest
- All contact runs through WhatsApp and calls on +44 7348 131285. No email address, no database, no backend
- Fonts self-hosted on every page and the content security policy fixed to allow them

## Still to do (needs access or client input)
1. Cloudflare Pages: add `eliteforce.site` as a custom domain on the project.
2. Client to supply: registered company name, number, registered office and ICO number for the footer and privacy notice.
3. Client to confirm: SIA licensing wording and the one working day response promise.
4. Submit the sitemap in Google Search Console and create a Google Business Profile, using the WhatsApp number as the contact.

## Contact number
The WhatsApp and call number appears in the header, cover, enquiry section, footer, phone contact bar, FAQ, privacy notice and structured data, and the form sends to it from `assets/site.js`. To change it, find and replace `447348131285` (links, schema and site.js) and `+44 7348 131285` (visible text) in `index.html`, `privacy.html`, `assets/site.js` and `llms.txt`.
