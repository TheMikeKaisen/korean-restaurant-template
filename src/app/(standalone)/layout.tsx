import { gangnamKitchenConfig } from '@/config/restaurants/gangnam-kitchen'
import { RestaurantProvider } from '@/context/RestaurantContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { CustomCursor } from '@/components/ui/CustomCursor'

export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  const { identity } = gangnamKitchenConfig
  return (
    <RestaurantProvider config={gangnamKitchenConfig}>
      <LoadingScreen
        restaurantName={identity.name}
        koreanName={identity.koreanName}
      />
      <CustomCursor />
      <SmoothScrollProvider>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </RestaurantProvider>
  )
}
