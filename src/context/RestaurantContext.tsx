'use client'

import { createContext, useContext } from 'react'
import type { RestaurantConfig } from '@/types/restaurant'
import { defaultConfig } from '@/config'

const RestaurantContext = createContext<RestaurantConfig>(defaultConfig)

export function RestaurantProvider({
  config,
  children,
}: {
  config: RestaurantConfig
  children: React.ReactNode
}) {
  return (
    <RestaurantContext.Provider value={config}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant(): RestaurantConfig {
  return useContext(RestaurantContext)
}