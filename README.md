# Elite Force | Website

Private security and debt recovery site for Elite Force. Built by Sidedoor Digital.
Intellectual property of Sidedoor Digital.

## Structure
- `index.html` Main single-page site
- `privacy.html` Privacy notice (served at /privacy)
- `digital-suite.html` Private Client Suite proposal. Unlinked, noindex. Share the direct link only.
- `404.html` Not found page
- `assets/` Styles, scripts, images, icons
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
4. Add phone, email and director notification in `functions/api/enquiry.js` once contact details are confirmed.
5. Confirm licensing claims (SIA) and response-time promises with the client.
6. Submit sitemap in Google Search Console and create a Google Business Profile.
