// Elite Force enquiry handler | Cloudflare Pages Function
// Intellectual property of Sidedoor Digital.
// Requires a D1 binding named DB (see schema.sql).

const MAX = { name: 120, organisation: 160, email: 200, phone: 40, service: 20, preferred_contact: 20, best_time: 20, message: 3000 };

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    const type = request.headers.get('Content-Type') || '';
    data = type.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: 'Invalid request' }, 400);
  }

  // Bots: honeypot filled, or form submitted faster than a person could type.
  const age = Date.now() - Number(data.ts || 0);
  if (data.website || !data.ts || age < 2500) return json({ ok: true });

  const row = {};
  for (const k of Object.keys(MAX)) row[k] = clean(data[k], MAX[k]);

  if (!row.name) return json({ ok: false, error: 'Name is required' }, 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return json({ ok: false, error: 'Valid email is required' }, 422);
  if (data.consent !== 'yes') return json({ ok: false, error: 'Consent is required' }, 422);

  try {
    await env.DB.prepare(
      `INSERT INTO enquiries (name, organisation, email, phone, service, preferred_contact, best_time, message, ip_country, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    ).bind(
      row.name, row.organisation, row.email, row.phone, row.service,
      row.preferred_contact, row.best_time, row.message,
      (request.cf && request.cf.country) || ''
    ).run();
  } catch (err) {
    return json({ ok: false, error: 'Could not save enquiry' }, 500);
  }

  // TODO once contact details are confirmed: send a notification email to the director here.
  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false, error: 'Method not allowed' }, 405);
}
