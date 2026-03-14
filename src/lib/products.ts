export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: 'produce' | 'dairy-alt' | 'bakery' | 'juice-bar' | 'pantry' | 'sweet-treats' | 'deli';
  description: string;
  image: string;
  hero?: boolean;
}

export const products: Product[] = [
  {
    id: 'hass-avocados',
    name: 'Hass Avocados',
    price: 7.50,
    unit: '3pk',
    category: 'produce',
    description: 'Perfectly ripe, creamy Hass avocados. Ready for toast, bowls, or eating with a spoon.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d85f6a?w=600&h=600&fit=crop&q=80',
    hero: true,
  },
  {
    id: 'oat-milk',
    name: 'Oat Milk',
    price: 6.00,
    unit: 'Barista Blend',
    category: 'dairy-alt',
    description: 'Creamy, frothy, and perfect for your morning latte. Plant-based goodness.',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'vine-tomatoes',
    name: 'Vine-Ripened Tomatoes',
    price: 5.00,
    unit: 'per lb',
    category: 'produce',
    description: 'Sun-kissed and bursting with flavor. Still on the vine for peak freshness.',
    image: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'sourdough-boule',
    name: 'Sourdough Boule',
    price: 8.50,
    unit: 'each',
    category: 'bakery',
    description: 'Slow-fermented with a crackling crust and tender, tangy crumb. Baked fresh daily.',
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'organic-blueberries',
    name: 'Organic Blueberries',
    price: 4.00,
    unit: '6oz',
    category: 'produce',
    description: 'Plump, sweet, and organically grown. Perfect for smoothies, baking, or snacking.',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'green-juice',
    name: 'Cold-Pressed Green Juice',
    price: 9.00,
    unit: '12oz bottle',
    category: 'juice-bar',
    description: 'Kale, cucumber, apple, ginger, lemon. Cold-pressed to preserve every nutrient.',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'manuka-honey',
    name: 'Manuka Honey',
    price: 28.00,
    unit: 'MGO 100+',
    category: 'pantry',
    description: 'Raw, unpasteurized New Zealand Manuka. Rich, caramel-like with natural wellness benefits.',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'dark-chocolate',
    name: 'Sea Salt Dark Chocolate',
    price: 7.00,
    unit: 'bar',
    category: 'sweet-treats',
    description: '72% single-origin cacao with a whisper of Maldon sea salt. Snap, melt, bliss.',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'olive-oil',
    name: 'Greek Extra Virgin Olive Oil',
    price: 22.00,
    unit: '500ml',
    category: 'pantry',
    description: 'Cold-pressed Koroneiki olives from Kalamata. Peppery, grassy, and liquid gold.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop&q=80',
  },
  {
    id: 'sharp-cheddar',
    name: 'Aged Sharp Cheddar',
    price: 11.00,
    unit: 'wedge',
    category: 'deli',
    description: 'Aged 18 months for a crumbly texture and bold, nutty bite. A cheese board essential.',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&h=600&fit=crop&q=80',
  },
];

export const collections = {
  'daily-fresh': {
    name: 'Daily Fresh',
    tagline: 'The good stuff, picked today.',
    categories: ['produce', 'bakery', 'deli'] as const,
  },
  'the-pantry': {
    name: 'The Pantry',
    tagline: 'Staples worth stocking up on.',
    categories: ['pantry', 'dairy-alt', 'sweet-treats'] as const,
  },
  'morning-rituals': {
    name: 'Morning Rituals',
    tagline: 'Start your day the right way.',
    categories: ['juice-bar'] as const,
  },
} as const;
