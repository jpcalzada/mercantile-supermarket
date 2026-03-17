#!/usr/bin/env node

/**
 * sync-inventory.mjs
 *
 * Fetches product inventory from a Google Sheets CSV export URL,
 * converts it to the Product[] JSON format, and saves it to
 * src/data/inventory.json.
 *
 * If the fetch fails or returns no data, the existing inventory.json
 * is preserved ("last known good" strategy).
 *
 * Environment variable:
 *   INVENTORY_SHEET_URL — public Google Sheets CSV export URL
 *     e.g. https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv
 *
 * Expected CSV columns (header row required):
 *   id, label, name, size, price, category, description, image,
 *   origin_region, origin_altitude, origin_harvest,
 *   fat, carbs, protein,
 *   pairingIds (comma-separated ids, e.g. "sea-salt,olive-oil"),
 *   freshness, packaging, carbon
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..', '..');
const OUTPUT_PATH = resolve(__dirname, '..', 'data', 'inventory.json');

// Load .env if it exists (no external dependencies)
const envPath = resolve(PROJECT_ROOT, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const SHEET_URL = process.env.INVENTORY_SHEET_URL;

// ── CSV Parser (no dependencies) ─────────────────────────────────

function csvToObjects(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  let fields = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      fields.push(current);
      current = '';
      if (ch === '\r' && text[i + 1] === '\n') i++;
      if (fields.some((f) => f.trim() !== '')) rows.push(fields);
      fields = [];
    } else {
      current += ch;
    }
  }
  fields.push(current);
  if (fields.some((f) => f.trim() !== '')) rows.push(fields);

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (row[i] ?? '').trim();
    });
    return obj;
  });
}

// ── Row → Product mapper ─────────────────────────────────────────

function rowToProduct(row) {
  const price = parseFloat(row.price);
  if (!row.id || !row.name || isNaN(price)) return null;

  return {
    id: row.id,
    label: row.label || '',
    name: row.name,
    size: row.size || '',
    price,
    category: row.category || 'produce',
    description: row.description || '',
    image: row.image || '',
    origin: {
      region: row.origin_region || '',
      altitude: row.origin_altitude || '',
      harvest: row.origin_harvest || '',
    },
    macros: {
      fat: row.fat || '—',
      carbs: row.carbs || '—',
      protein: row.protein || '—',
    },
    pairingIds: row.pairingIds
      ? row.pairingIds.split(',').map((s) => s.trim()).filter(Boolean)
      : [],
    logistics: {
      freshness: row.freshness || '',
      packaging: row.packaging || '',
      carbon: row.carbon || '',
    },
  };
}

// ── Main ─────────────────────────────────────────────────────────

async function main() {
  if (!SHEET_URL) {
    console.log('[sync-inventory] No INVENTORY_SHEET_URL set — using existing inventory.json');
    if (!existsSync(OUTPUT_PATH)) {
      console.error('[sync-inventory] ERROR: No inventory.json found and no sheet URL configured.');
      process.exit(1);
    }
    return;
  }

  console.log('[sync-inventory] Fetching inventory from Google Sheets...');

  let csvText;
  try {
    const res = await fetch(SHEET_URL, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    csvText = await res.text();
  } catch (err) {
    console.warn(`[sync-inventory] Fetch failed: ${err.message}`);
    if (existsSync(OUTPUT_PATH)) {
      console.log('[sync-inventory] Keeping last known inventory.json');
      return;
    }
    console.error('[sync-inventory] ERROR: No fallback inventory.json available.');
    process.exit(1);
  }

  const rows = csvToObjects(csvText);
  if (rows.length === 0) {
    console.warn('[sync-inventory] Sheet returned 0 rows — keeping last known inventory.json');
    return;
  }

  const products = rows.map(rowToProduct).filter(Boolean);

  if (products.length === 0) {
    console.warn('[sync-inventory] No valid products parsed — keeping last known inventory.json');
    return;
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(products, null, 2));
  console.log(`[sync-inventory] Synced ${products.length} products to inventory.json`);
}

main();
