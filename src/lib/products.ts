export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: 'produce' | 'dairy-alt' | 'bakery' | 'juice-bar' | 'pantry' | 'sweet-treats' | 'deli';
  description: string;
  image: string;
  hero?: boolean;
  // This matches what your [id].astro is looking for:
  macros: {
    fat: string;
    carbs: string;
    protein: string;
  };
  details: {
    origin: string;
    climate: string;
    harvest: string;
  };
}

export const products: Product[] = [
  {
    id: 'hass-avocados',
    name: 'ORGANIC / HASS AVOCADOS / 3PK',
    price: 7.50,
    unit: '3pk',
    category: 'produce',
    description: 'Hand-selected for perfect ripeness. Creamy, rich texture with a buttery finish. Sourced from high-altitude volcanic groves.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d85f6a?auto=format&fit=crop&w=800&q=80',
    hero: true,
    macros: { fat: '15g', carbs: '9g', protein: '2g' },
    details: { origin: 'Michoacán, MX', climate: 'Highland Tropical', harvest: 'Hand-picked' }
  },
  {
    id: 'oat-milk',
    name: 'BARISTA / OAT MILK / 32OZ',
    price: 6.00,
    unit: '32oz',
    category: 'dairy-alt',
    description: 'A smooth, creamy blend designed for coffee. Naturally sweetened by the grain, with a silky texture that holds micro-foam perfectly.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '1.5g', carbs: '7g', protein: '1g' },
    details: { origin: 'Södermanland, SE', climate: 'Temperate', harvest: 'Machine Milled' }
  },
  {
    id: 'vine-tomatoes',
    name: 'HEIRLOOM / MIXED TOMATOES / 1LB',
    price: 5.00,
    unit: '1lb',
    category: 'produce',
    description: 'A seasonal assortment of vine-ripened varieties. Harvested daily for maximum flavor density and natural sweetness.',
    image: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '0.2g', carbs: '3.9g', protein: '0.9g' },
    details: { origin: 'Baja, MX', climate: 'Arid Coastal', harvest: 'Vine-cut' }
  },
  {
    id: 'sourdough-boule',
    name: 'ARTISAN / SOURDOUGH BREAD / LOAF',
    price: 8.50,
    unit: 'Loaf',
    category: 'bakery',
    description: 'Traditionally fermented for 24 hours using heritage flour. A deep, caramelized crust with a light, airy center.',
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '1.2g', carbs: '52g', protein: '9g' },
    details: { origin: 'Local Bakery', climate: 'Controlled Ferment', harvest: 'Stone-baked' }
  },
  {
    id: 'organic-blueberries',
    name: 'ORGANIC / FRESH BLUEBERRIES / 6OZ',
    price: 4.00,
    unit: '6oz',
    category: 'produce',
    description: 'Plump, hand-picked berries from coastal farms. High in antioxidants with a balanced tart-to-sweet profile.',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '0.3g', carbs: '14g', protein: '0.7g' },
    details: { origin: 'Oregon, US', climate: 'Maritime', harvest: 'Small-batch' }
  },
  {
    id: 'green-juice',
    name: 'COLD-PRESSED / GREEN JUICE / 12OZ',
    price: 9.00,
    unit: '12oz',
    category: 'juice-bar',
    description: 'A crisp blend of kale, cucumber, and apple with a hint of ginger. Raw, unpasteurized, and extracted daily.',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '0g', carbs: '6g', protein: '1g' },
    details: { origin: 'On-site Press', climate: 'Raw/Chilled', harvest: 'Zero-oxidation' }
  },
  {
    id: 'manuka-honey',
    name: 'RAW / MANUKA HONEY / 8.8OZ',
    price: 28.00,
    unit: '8.8oz',
    category: 'pantry',
    description: 'Sustainably harvested from New Zealand forests. A thick, golden texture with a complex, earthy sweetness.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '0g', carbs: '82g', protein: '0.3g' },
    details: { origin: 'East Cape, NZ', climate: 'Sub-tropical', harvest: 'Monofloral' }
  },
  {
    id: 'dark-chocolate',
    name: 'SEA SALT / DARK CHOCOLATE / 3OZ',
    price: 7.00,
    unit: '3oz',
    category: 'sweet-treats',
    description: '72% cacao sourced from single-estate farms. Topped with hand-harvested salt crystals for a savory-sweet balance.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '42g', carbs: '46g', protein: '8g' },
    details: { origin: 'Tumaco, CO', climate: 'Tropical', harvest: 'Direct Trade' }
  },
  {
    id: 'olive-oil',
    name: 'EXTRA VIRGIN / OLIVE OIL / 17OZ',
    price: 22.00,
    unit: '17oz',
    category: 'pantry',
    description: 'First cold-press oil from early-season olives. Vibrant green color with a fresh, peppery finish.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '100g', carbs: '0g', protein: '0g' },
    details: { origin: 'Kalamata, GR', climate: 'Mediterranean', harvest: 'First Cold Press' }
  },
  {
    id: 'sharp-cheddar',
    name: 'AGED / SHARP CHEDDAR / 8OZ',
    price: 11.00,
    unit: '8oz',
    category: 'deli',
    description: 'Grass-fed white cheddar aged for 12 months. A firm, crumbly texture with a bold and savory bite.',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
    macros: { fat: '33g', carbs: '1.3g', protein: '25g' },
    details: { origin: 'Vermont, US', climate: 'Pasture Raised', harvest: 'Aged 12 Months' }
  },
];
