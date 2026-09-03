// src/lib/types/index.ts
export interface Motorcycle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: '350cc' | '400cc+';
  subcategory: string;
  image?: string;
  price?: string;
  specs?: {
    engine: string;
    power: string;
    weight: string;
    topSpeed: string;
  };
  href: string;
  isNew?: boolean;
}

export interface Ride {
  id: string;
  name: string;
  description: string;
  image?: string;
  duration?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image?: string;
}

export type AccessoryCategory =
  | 'Safety Gear'
  | 'Touring'
  | 'Performance'
  | 'Protection'
  | 'Comfort';

export interface Accessory {
  id: string;
  name: string;
  category: AccessoryCategory;
  price: number;
  details: string;
  description: string;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  category: AccessoryCategory;
  price: number;
  image: string;
  quantity: number;
}
