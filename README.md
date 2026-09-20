# Elite Force | Website

Private security and debt recovery site for Elite Force, live at https://eliteforce.site. Built by Sidedoor Digital.
Intellectual property of Sidedoor Digital.

## Structure
- `index.html` Single-page brochure site. Cover (brand poster with foil sweep), motto band, then spreads: introduction, protection, collection, standard, process, coverage, questions, enquiry
- `privacy.html` Privacy notice (served at /privacy)
- `digital-suite.html` Private Client Suite proposal. Unlinked, noindex. Share the direct link only.
- `404.html` Not found page
- `assets/brochure.css` Homepage styles. `assets/site.css` styles the other pages
- `assets/site.js` Loaded in the head. Adds the `js` class, then runs reveals, header, menu, swipe decks, FAQ and the enquiry form
- `assets/hero.webp` (2560w), `hero-1600.webp`, `hero-mobile.webp` and the `panel-*.webp` plates are all cut from one 4x super-resolved master of the brand poster, so crops stay sharp on retina screens
- `favicon.ico`, `assets/favicon-32.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png` are the lion crest
- `assets/og-image.jpg` 1200 x 630 social card with the full crest
- `functions/api/enquiry.js` Pages Function: saves enquiries to D1 and emails the director through Resend
- `schema.sql` D1 table for enquiries
- `_headers` Security headers and cache rules for Cloudflare Pages
- `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`

## Done
- Domain set to https://eliteforce.site everywhere (canonical, Open Graph, schema, sitemap, robots, llms.txt)
- Favicon, app icons and social image match the crest
- Contact email `enquiries@eliteforce.site` on the page, footer, schema, privacy notice and llms.txt
- Director email notification written into the enquiry function
- Fonts self-hosted on every page and the content security policy fixed to allow them

## Still to do (needs access or client input)
1. Cloudflare Pages: add `eliteforce.site` as a custom domain on the project.
2. D1: create the database and bind it as `DB` on the Pages project:
   `npx.cmd wrangler d1 create elite-force-db`
   `npx.cmd wrangler d1 execute elite-force-db --remote --file=schema.sql`
3. Email in: Cloudflare Email Routing on eliteforce.site, forward `enquiries@eliteforce.site` to the director's inbox.
4. Email out: create a free Resend account, verify eliteforce.site (DNS records go in Cloudflare), then add `RESEND_API_KEY` (secret) and `NOTIFY_TO` (director's email) under Settings > Variables and Secrets. Redeploy.
5. Client to supply: registered company name, number, registered office and ICO number for the footer and privacy notice.
6. Client to confirm: SIA licensing wording and the one working day response promise.
7. Submit the sitemap in Google Search Console and create a Google Business Profile.

## Contact number
The WhatsApp and call number appears in the header, cover, enquiry section, footer, phone contact bar, FAQ and structured data. To change it, find and replace `447348131285` (links and schema) and `+44 7348 131285` (visible text) in `index.html` and `llms.txt`.
