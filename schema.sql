-- Elite Force | D1 schema for website enquiries
-- Run: npx.cmd wrangler d1 execute elite-force-db --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  organisation TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  preferred_contact TEXT,
  best_time TEXT,
  message TEXT,
  ip_country TEXT,
  created_at TEXT NOT NULL,
  handled INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (created_at);
