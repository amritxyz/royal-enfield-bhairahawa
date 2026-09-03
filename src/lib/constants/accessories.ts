import type { Accessory, AccessoryCategory } from '@/lib/types';

export const accessoryCategories: AccessoryCategory[] = [
  'Safety Gear',
  'Touring',
  'Performance',
  'Protection',
  'Comfort',
];

export const accessoryCategorySlugs: Record<string, AccessoryCategory> = {
  helmets: 'Safety Gear',
  jackets: 'Safety Gear',
  luggage: 'Touring',
  exhaust: 'Performance',
  'crash-guards': 'Protection',
  'seat-covers': 'Comfort',
};

export const accessories: Accessory[] = [
  {
    id: 'classic-open-face-helmet',
    name: 'Classic Open Face Helmet',
    category: 'Safety Gear',
    price: 12500,
    details: 'ISI-certified open face helmet with a vintage Royal Enfield silhouette.',
    description:
      'A hand-finished open face helmet with a leather-lined interior, quick-release visor, and dual-density EPS liner. Built for city rides and weekend touring.',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'adventure-full-face-helmet',
    name: 'Adventure Full Face Helmet',
    category: 'Safety Gear',
    price: 18900,
    details: 'Full-face adventure lid with wide visor and peak for Himalayan roads.',
    description:
      'Ventilated full-face shell with an anti-fog visor, removable peak, and moisture-wicking liner. Designed for long days on mixed terrain.',
    image:
      'https://images.unsplash.com/photo-1616578273461-3a97ce3b8a10?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'riding-jacket',
    name: 'Touring Riding Jacket',
    category: 'Safety Gear',
    price: 15900,
    details: 'Armoured riding jacket with waterproof membrane and thermal liner.',
    description:
      'CE-rated shoulder and elbow armour, a waterproof breathable membrane, and a packable thermal liner. Cut for an upright Royal Enfield riding posture.',
    image:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'riding-gloves',
    name: 'Leather Riding Gloves',
    category: 'Safety Gear',
    price: 3500,
    details: 'Short-cuff leather gloves with knuckle protection and touchscreen tips.',
    description:
      'Full-grain leather with padded knuckles, a secure wrist strap, and touchscreen-compatible index fingers. Broken in for all-day comfort.',
    image:
      'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'touring-boots',
    name: 'Touring Riding Boots',
    category: 'Safety Gear',
    price: 11200,
    details: 'Waterproof touring boots with ankle support and gear-shift pad.',
    description:
      'Oil-resistant sole, reinforced toe and heel, and a waterproof membrane. Ready for monsoon roads and long highway stretches.',
    image:
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'aluminum-panniers',
    name: 'Aluminum Pannier Set',
    category: 'Touring',
    price: 24500,
    details: 'Lockable 36L aluminum panniers with model-specific mounting kit.',
    description:
      'Weather-sealed expedition cases with a keyed lock, inner dry bags, and a powder-coated finish. Fits Himalayan and touring platforms.',
    image:
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'tank-bag',
    name: 'Magnetic Tank Bag',
    category: 'Touring',
    price: 6800,
    details: 'Expandable magnetic tank bag with a waterproof phone window.',
    description:
      'Strong magnets, a clear map/phone pocket, and expansion to 18L. The base stays on the tank so you can lift the bag off at fuel stops.',
    image:
      'https://images.unsplash.com/photo-1525164298333-6b98d55ac1e4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'tail-bag',
    name: 'Waterproof Tail Bag',
    category: 'Touring',
    price: 5200,
    details: 'Roll-top tail bag with quick-release straps for pillion or solo setups.',
    description:
      'IPX5-rated fabric, roll-top closure, and reflective piping. Straps around the pillion seat or luggage rack without scratching paint.',
    image:
      'https://images.unsplash.com/photo-1524499982475-0c2c60eb2425?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'performance-exhaust',
    name: 'Performance Exhaust',
    category: 'Performance',
    price: 32000,
    details: 'Stainless slip-on exhaust for a deeper note and cleaner lines.',
    description:
      'TIG-welded stainless steel with a removable baffle and heat shield. Tuned for the J-platform 350s and 450 Sherpa engines.',
    image:
      'https://images.unsplash.com/photo-1558981852-426c6c22a4d0?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'led-fog-lamps',
    name: 'LED Auxiliary Fog Lamps',
    category: 'Performance',
    price: 7200,
    details: 'Pair of CNC-mounted LED fog lamps with a dedicated switch.',
    description:
      'Spot/flood combo beam, aluminum housings, and a handlebar switch. Wired for the Himalayan and Guerrilla auxiliary circuit.',
    image:
      'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'engine-guard',
    name: 'Engine Guard',
    category: 'Protection',
    price: 8900,
    details: 'Powder-coated steel engine guard with sliders.',
    description:
      'Protects the cases and radiator on a tip-over. Includes nylon sliders and model-specific brackets that use existing mounting points.',
    image:
      'https://images.unsplash.com/photo-1449426468159-d8fb156aa9dd?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'crash-guard-set',
    name: 'Crash Guard Set',
    category: 'Protection',
    price: 12500,
    details: 'Front and rear crash guards with highway peg mounts.',
    description:
      'A matched pair of crash bars that wrap the engine and mid-frame. Highway peg bosses are included for long-distance comfort.',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'touring-seat-cover',
    name: 'Touring Seat Cover',
    category: 'Comfort',
    price: 4500,
    details: 'Gel-padded seat cover with a grippy, weather-resistant finish.',
    description:
      'Adds a gel layer over the OEM seat without a full re-upholstery. Non-slip texture keeps you planted on monsoon roads.',
    image:
      'https://images.unsplash.com/photo-1558980664-1db506751c6d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'handlebar-grips',
    name: 'Classic Handlebar Grips',
    category: 'Comfort',
    price: 1800,
    details: 'Diamond-pattern rubber grips with bar-end finishers.',
    description:
      'Soft-compound rubber with an OEM-style diamond pattern. Includes polished bar-end caps and throttle-side bushing.',
    image:
      'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=1400&q=80',
  },
];

export function getAccessory(id: string) {
  return accessories.find((item) => item.id === id);
}

export const CART_STORAGE_KEY = 're-bhairahawa-cart';
export const CART_MAX_QUANTITY = 10;