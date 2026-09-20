// Elite Force enquiry handler | Cloudflare Pages Function
// Intellectual property of Sidedoor Digital.
// Requires a D1 binding named DB (see schema.sql).
// Director notification by email uses Resend (resend.com). Set these on the Pages project
// under Settings > Variables and Secrets:
//   RESEND_API_KEY  (secret)  API key from Resend, with eliteforce.site verified as a sending domain
//   NOTIFY_TO       director inbox, comma separated for more than one
//   NOTIFY_FROM     optional, defaults to "Elite Force Website <website@eliteforce.site>"
// If RESEND_API_KEY or NOTIFY_TO is missing the enquiry is still saved, just not emailed.

const MAX = { name: 120, organisation: 160, email: 200, phone: 40, service: 20, preferred_contact: 20, best_time: 20, message: 3000 };

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

function cleanMessage(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

async function notifyDirector(env, row, country) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_TO) return;
  const to = String(env.NOTIFY_TO).split(',').map((s) => s.trim()).filter(Boolean);
  const from = env.NOTIFY_FROM || 'Elite Force Website <website@eliteforce.site>';
  const lines = [
    ['Name', row.name],
    ['Organisation', row.organisation],
    ['Email', row.email],
    ['Phone', row.phone],
    ['Needs help with', row.service],
    ['Preferred contact', row.preferred_contact],
    ['Best time', row.best_time],
    ['Country', country]
  ].filter((l) => l[1]);

  const text = lines.map((l) => l[0] + ': ' + l[1]).join('\n') + '\n\nOutline:\n' + (row.message || 'None given');
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">' +
    '<p style="font-size:18px;margin:0 0 16px"><strong>New private enquiry</strong></p>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    lines.map((l) => '<tr><td style="color:#666;vertical-align:top">' + esc(l[0]) + '</td><td>' + esc(l[1]) + '</td></tr>').join('') +
    '</table>' +
    '<p style="margin:18px 0 6px;color:#666">Outline</p>' +
    '<p style="white-space:pre-wrap;margin:0">' + esc(row.message || 'None given') + '</p>' +
    '<p style="margin:24px 0 0;color:#999;font-size:12px">Sent from the enquiry form on eliteforce.site. Reply to this email to answer the client directly.</p>' +
    '</div>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      reply_to: row.email,
      subject: 'New enquiry: ' + (row.service || 'General') + ' | ' + row.name,
      text,
      html
    })
  });
  if (!res.ok) throw new Error('Resend ' + res.status);
}

export async function onRequestPost({ request, env, waitUntil }) {
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
  for (const k of Object.keys(MAX)) row[k] = k === 'message' ? cleanMessage(data[k], MAX[k]) : clean(data[k], MAX[k]);

  if (!row.name) return json({ ok: false, error: 'Name is required' }, 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return json({ ok: false, error: 'Valid email is required' }, 422);
  if (data.consent !== 'yes') return json({ ok: false, error: 'Consent is required' }, 422);

  const country = (request.cf && request.cf.country) || '';
  let saved = false;

  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO enquiries (name, organisation, email, phone, service, preferred_contact, best_time, message, ip_country, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
      ).bind(
        row.name, row.organisation, row.email, row.phone, row.service,
        row.preferred_contact, row.best_time, row.message, country
      ).run();
      saved = true;
    } catch (err) {
      saved = false;
    }
  }

  // Email the director. If the database is not bound or failed, the email is the only record,
  // so wait for it and report failure honestly. Otherwise send it in the background.
  const send = notifyDirector(env, row, country);
  if (saved) {
    waitUntil(send.catch(() => {}));
    return json({ ok: true });
  }
  try {
    if (!env.RESEND_API_KEY || !env.NOTIFY_TO) throw new Error('No store');
    await send;
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'Could not save enquiry' }, 500);
  }
}

export function onRequest() {
  return json({ ok: false, error: 'Method not allowed' }, 405);
}
