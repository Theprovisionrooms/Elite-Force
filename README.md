# Elite Force | Website

Private security and debt recovery site for Elite Force. Built by Sidedoor Digital.
Intellectual property of Sidedoor Digital.

## Structure
- `index.html` Main single-page brochure site. The hero is the brand poster image (`assets/hero.webp`); the panel images are crops of it
- `privacy.html` Privacy notice (served at /privacy)
- `digital-suite.html` Private Client Suite proposal. Unlinked, noindex. Share the direct link only.
- `404.html` Not found page
- `assets/` Styles (`brochure.css` for the homepage, `site.css` for the other pages), scripts, images, self-hosted fonts (Cinzel, Hanken Grotesk), icons
- `functions/api/enquiry.js` Pages Function that stores form enquiries in D1
- `schema.sql` D1 table for enquiries
- `_headers` Security headers and cache rules for Cloudflare Pages
- `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`

## Before launch
1. Find and replace `YOURDOMAIN.co.uk` across the repo once the domain is bought.
2. Create the D1 database and bind it as `DB` on the Pages project:
   `npx.cmd wrangler d1 create elite-force-db`
   `npx.cmd wrangler d1 execute elite-force-db --remote --file=schema.sql`
3. Add registered company name, number, registered office and ICO number to the footer and privacy notice.
4. Phone and WhatsApp (+44 7348 131285) are live on the page. Still to add: an email address and a director notification in `functions/api/enquiry.js`.
5. Confirm licensing claims (SIA) and response-time promises with the client.
6. Submit sitemap in Google Search Console and create a Google Business Profile.

## Contact number
The WhatsApp and call number appears in the header, under the hero, in the enquiry section, the footer, the mobile sticky bar and the structured data. To change it, find and replace `447348131285` (links and schema) and `+44 7348 131285` (visible text) in `index.html` and `llms.txt`.
