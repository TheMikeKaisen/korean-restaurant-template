import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── Class Name Merger ────────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Image Source Resolver ────────────────────────────────────────────────────
/**
 * Resolves image source: checks if local file path is provided,
 * otherwise falls back to the Unsplash/Pexels URL.
 *
 * Place images in /public/images/ folder.
 * If a local file exists (jpg, png, jpeg, webp), it will be used.
 * Otherwise, the fallback URL is used.
 */
export function resolveImage(localPath?: string, fallbackUrl?: string): string {
  if (localPath) {
    return localPath
  }
  return fallbackUrl || ''
}

// ─── Format Currency ──────────────────────────────────────────────────────────
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Stagger Delay ────────────────────────────────────────────────────────────
export function staggerDelay(index: number, base: number = 0.1): number {
  return index * base
}

// ─── Ease Curves ─────────────────────────────────────────────────────────────
export const easings = {
  expo: [0.16, 1, 0.3, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  inOut: [0.87, 0, 0.13, 1] as const,
}

// ─── Framer Motion Variants ───────────────────────────────────────────────────
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easings.expo },
  },
}

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: easings.smooth },
  },
}

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easings.expo },
  },
}

export const slideInLeftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: easings.expo },
  },
}

export const slideInRightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: easings.expo },
  },
}

export const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const staggerItemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easings.expo },
  },
}

// ─── Image Data ───────────────────────────────────────────────────────────────
export const DISH_IMAGES: Record<string, { local: string; fallback: string }> = {
  'korean-fried-chicken': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=800&q=80',
  },
  'bibimbap': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&q=80',
  },
  'tteokbokki': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=800&q=80',
  },
  'korean-bbq': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
  },
  'ramen': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
  },
  'kimchi-rice': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80',
  },
  'korean-corn-dog': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41a?w=800&q=80',
  },
  'bingsu': {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
  },
}

export const HERO_IMAGES = {
  main: {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=85',
  },
  secondary: {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85',
  },
}

export const ABOUT_IMAGES = {
  restaurant: {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85',
  },
  chef: {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85',
  },
  interior: {
    local: '',
    fallback: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=85',
  },
}

export const GALLERY_IMAGES = [
  {
    id: 'g1',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    alt: 'Korean BBQ experience',
    category: 'food',
    aspect: 'portrait',
  },
  {
    id: 'g2',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80',
    alt: 'Ramen close-up',
    category: 'food',
    aspect: 'landscape',
  },
  {
    id: 'g3',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80',
    alt: 'Restaurant ambience',
    category: 'ambience',
    aspect: 'portrait',
  },
  {
    id: 'g4',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    alt: 'Bibimbap artful plating',
    category: 'food',
    aspect: 'square',
  },
  {
    id: 'g5',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
    alt: 'Korean café vibe',
    category: 'ambience',
    aspect: 'landscape',
  },
  {
    id: 'g6',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    alt: 'Premium food styling',
    category: 'food',
    aspect: 'portrait',
  },
  {
    id: 'g7',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    alt: 'Gangnam Kitchen interior',
    category: 'ambience',
    aspect: 'landscape',
  },
  {
    id: 'g8',
    local: '',
    fallback: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    alt: 'Korean dessert bingsu',
    category: 'food',
    aspect: 'square',
  },
]
