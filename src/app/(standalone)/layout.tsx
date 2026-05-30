import { RestaurantProvider } from '@/context/RestaurantContext'
import { gangnamKitchenConfig } from '@/config/restaurants/gangnam-kitchen'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
 
// When deploying as a standalone restaurant site (gangnam-kitchen.com),
// swap gangnamKitchenConfig here for the target restaurant's config.
 
export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <RestaurantProvider config={gangnamKitchenConfig}>
      <SmoothScrollProvider>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </RestaurantProvider>
  )
}

