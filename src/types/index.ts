// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
  korean?: string
}

// ─── Dish ─────────────────────────────────────────────────────────────────────
export interface Dish {
  id: string
  name: string
  koreanName: string
  description: string
  price: string
  category: string
  imageSrc: string
  imageAlt: string
  tags?: string[]
  featured?: boolean
}

// ─── Menu Category ────────────────────────────────────────────────────────────
export interface MenuCategory {
  id: string
  name: string
  koreanName: string
  description: string
  icon?: string
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  date: string
  avatar?: string
}

// ─── Gallery Item ─────────────────────────────────────────────────────────────
export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  width: number
  height: number
}

// ─── Experience Feature ───────────────────────────────────────────────────────
export interface ExperienceFeature {
  id: string
  title: string
  description: string
  icon: string
  detail: string
}

// ─── Reservation Form ─────────────────────────────────────────────────────────
export interface ReservationForm {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  occasion?: string
  specialRequests?: string
}

// ─── Image Source ─────────────────────────────────────────────────────────────
export interface ImageSource {
  local?: string
  fallback: string
  alt: string
}
