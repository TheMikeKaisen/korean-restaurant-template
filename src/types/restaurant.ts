export interface RestaurantHours {
  days: string
  time: string
}

export interface RestaurantDish {
  id: string
  name: string
  koreanName: string
  description: string
  price: number
  category: string
  tags: string[]
  spice: number
  imageKey: string
  featured?: boolean
  size?: 'large' | 'wide' | 'small'
}

export interface RestaurantTestimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  occasion: string
  initial: string
}

export interface RestaurantGalleryItem {
  id: string
  local: string
  fallback: string
  alt: string
  category: string
  aspect: string
}

export interface RestaurantConfig {
  slug: string

  identity: {
    name: string
    koreanName: string
    tagline: string
    description: string
    established: string
    rating: string
    reviewCount: string
    menuCount: string
    guestCount: string
  }

  location: {
    address: string
    city: string
    state: string
    pincode: string
    country: string
    neighborhood: string
    mapEmbedUrl: string
    googleMapsUrl: string
  }

  contact: {
    phone: string
    email: string
    instagram: string
    instagramUrl: string
  }

  hours: RestaurantHours[]

  hero: {
    line1: string
    line2: string
    line3: string
    accentWord: string
    subtext: string
    locationTag: string
  }

  images: {
    hero: string
    heroFallback: string
    restaurant: string
    restaurantFallback: string
    chef: string
    chefFallback: string
    interior: string
    interiorFallback: string
    reservationCta: string
    reservationCtaFallback: string
  }

  dishes: RestaurantDish[]
  menuItems: RestaurantDish[]
  testimonials: RestaurantTestimonial[]
  gallery: RestaurantGalleryItem[]
}