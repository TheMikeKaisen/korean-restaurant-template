import { gangnamKitchenConfig } from './restaurants/gangnam-kitchen'
import type { RestaurantConfig } from '@/types/restaurant'
 
// ─── Registry ─────────────────────────────────────────────────────────────────
// To add a new restaurant:
// 1. Create src/config/restaurants/your-restaurant.ts
// 2. Import it here and add to the map
// 3. Add images to public/images/your-restaurant/
// ──────────────────────────────────────────────────────────────────────────────
 
export const restaurantConfigs: Record<string, RestaurantConfig> = {
  'gangnam-kitchen': gangnamKitchenConfig,
  // 'seoul-house': seoulHouseConfig,
  // 'kimchi-corner': kimchiCornerConfig,
}
 
export const defaultConfig = gangnamKitchenConfig
 
export function getConfig(slug: string): RestaurantConfig | null {
  return restaurantConfigs[slug] ?? null
}
 