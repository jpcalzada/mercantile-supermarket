export interface NutritionMacros {
  fat: string;
  carbs: string;
  protein: string;
}

export type CategorySlug =
  | 'produce'
  | 'dairy-alt'
  | 'bakery'
  | 'juice-bar'
  | 'cafe'
  | 'sushi'
  | 'pantry'
  | 'sweet-treats'
  | 'deli';

export interface Product {
  id: string;
  label: string;
  name: string;
  size: string;
  price: number;
  category: CategorySlug;
  description: string;
  image: string;
  origin: {
    region: string;
    altitude: string;
    harvest: string;
  };
  macros: NutritionMacros;
  pairingIds: string[];
  logistics: {
    freshness: string;
    packaging: string;
    carbon: string;
  };
}

import inventory from '../data/inventory.json';

// Map sheet display names → internal slugs used by page filters
const categoryMap: Record<string, CategorySlug> = {
  'the garden': 'produce',
  'produce': 'produce',
  'the bakery': 'bakery',
  'bakery': 'bakery',
  'sushi': 'sushi',
  'the deli': 'deli',
  'deli': 'deli',
  'tonic bar': 'juice-bar',
  'juice-bar': 'juice-bar',
  'cafe': 'cafe',
  'the pantry': 'pantry',
  'pantry': 'pantry',
  'dairy alt': 'dairy-alt',
  'dairy-alt': 'dairy-alt',
  'sweet treats': 'sweet-treats',
  'sweet-treats': 'sweet-treats',
};

function normalizeCategory(raw: string): CategorySlug {
  return categoryMap[raw.toLowerCase().trim()] ?? 'produce';
}

function normalizeImage(raw: string): string {
  if (!raw) return '';
  if (!raw.startsWith('/') && !raw.startsWith('http')) return '/' + raw;
  return raw;
}

export const products: Product[] = (inventory as any[]).map((p) => ({
  ...p,
  category: normalizeCategory(p.category),
  image: normalizeImage(p.image),
}));

export function getPairings(product: Product): Product[] {
  const explicit = product.pairingIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => !!p);

  if (explicit.length >= 6) return explicit.slice(0, 6);

  const sameCat = products.filter(
    (p) => p.category === product.category && p.id !== product.id && !product.pairingIds.includes(p.id)
  );

  return [...explicit, ...sameCat].slice(0, 6);
}
