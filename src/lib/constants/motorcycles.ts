// src/lib/constants/motorcycles.ts
import { Motorcycle, Ride, HeroSlide, NavItem } from '@/lib/types';

export const heroSlides: HeroSlide[] = [
  {
    id: 'pure-motorcycling',
    title: 'PURE MOTORCYCLING',
    subtitle: 'Built for every adventure.',
    cta: 'Explore',
    href: '/models',
  },
  {
    id: 'himalayan-450',
    title: 'HIMALAYAN 450',
    subtitle: 'Adventure begins where roads end.',
    cta: 'Discover',
    href: '/models/himalayan-450',
  },
  {
    id: 'guerrilla-450',
    title: 'GUERRILLA 450',
    subtitle: 'Modern Roadster.',
    cta: 'Learn More',
    href: '/models/guerrilla-450',
  },
  {
    id: 'meteor-350',
    title: 'METEOR 350',
    subtitle: 'Custom Inspired Motorcycle.',
    cta: 'View Details',
    href: '/models/meteor-350',
  },
];

export const motorcycles: Motorcycle[] = [
  {
    id: 'hunter-350',
    name: 'Hunter 350',
    tagline: 'Urban Roadster',
    description:
      'A stylish, lightweight urban roadster designed for agile city riding. The Hunter 350 is the most affordable Royal Enfield motorcycle in Nepal.',
    category: '350cc',
    subcategory: 'Urban Roadster',
    href: '/models/hunter-350',
  },
  {
    id: 'classic-350',
    name: 'Classic 350',
    tagline: 'Retro Motorcycle',
    description:
      'The legendary Classic 350 combines timeless handcrafted styling with modern engineering and dual-channel ABS.',
    category: '350cc',
    subcategory: 'Retro Motorcycle',
    href: '/models/classic-350',
  },
  {
    id: 'goan-classic-350',
    name: 'Goan Classic 350',
    tagline: 'Bobber Cruiser',
    description:
      'A custom-inspired bobber version of the Classic 350, built for relaxed cruising and unique road presence.',
    category: '350cc',
    subcategory: 'Bobber Cruiser',
    href: '/models/goan-classic-350',
  },
  {
    id: 'meteor-350',
    name: 'Meteor 350',
    tagline: 'Highway Cruiser',
    description:
      'Built for long-distance comfort with relaxed ergonomics, forward-set footpegs, and smooth highway performance.',
    category: '350cc',
    subcategory: 'Highway Cruiser',
    href: '/models/meteor-350',
  },
  {
    id: 'scram-440',
    name: 'Scram 440',
    tagline: 'Scrambler',
    description:
      'A versatile scrambler capable of tackling city roads, highways, and light off-road adventures.',
    category: '400cc+',
    subcategory: 'Scrambler',
    href: '/models/scram-440',
  },
  {
    id: 'himalayan-450',
    name: 'New Himalayan 450',
    tagline: 'Adventure Tourer',
    description:
      'Powered by the Sherpa 450 engine, built to conquer mountains, rough terrain, and long-distance expeditions.',
    category: '400cc+',
    subcategory: 'Adventure Tourer',
    href: '/models/himalayan-450',
    isNew: true,
  },
  {
    id: 'guerrilla-450',
    name: 'Guerrilla 450',
    tagline: 'Premium Roadster',
    description:
      'A modern premium roadster delivering strong performance, agile handling, and dynamic styling.',
    category: '400cc+',
    subcategory: 'Premium Roadster',
    href: '/models/guerrilla-450',
  },
];

export function getMotorcycle(id: string) {
  return motorcycles.find((motorcycle) => motorcycle.id === id);
}

export const rides: Ride[] = [
  {
    id: 'himalayan-odyssey',
    name: 'Himalayan Odyssey',
    description: "Ride across the world's highest mountain roads.",
    duration: '12 Days',
    difficulty: 'Extreme',
    href: '/rides/himalayan-odyssey',
  },
  {
    id: 'moto-himalaya',
    name: 'Moto Himalaya',
    description: 'Experience Nepal & Himalayas like never before.',
    duration: '8 Days',
    difficulty: 'Challenging',
    href: '/rides/moto-himalaya',
  },
  {
    id: 'leh-ladakh',
    name: 'Leh Ladakh',
    description: 'The ultimate Royal Enfield adventure.',
    duration: '10 Days',
    difficulty: 'Extreme',
    href: '/rides/leh-ladakh',
  },
  {
    id: 'weekend-escape',
    name: 'Weekend Escape',
    description: 'Explore hidden roads with fellow riders.',
    duration: '2 Days',
    difficulty: 'Easy',
    href: '/rides/weekend-escape',
  },
];

export const navItems: NavItem[] = [
  { label: 'Motorcycles', href: '/models' },
  {
    label: 'Rides',
    href: '/rides',
    children: [
      { label: 'All Rides', href: '/rides' },
      { label: 'Himalayan Odyssey', href: '/rides/himalayan-odyssey' },
      { label: 'Moto Himalaya', href: '/rides/moto-himalaya' },
      { label: 'Leh Ladakh', href: '/rides/leh-ladakh' },
      { label: 'Community Rides', href: '/rides/community' },
    ],
  },
  { label: 'Accessories', href: '/accessories' },
];
