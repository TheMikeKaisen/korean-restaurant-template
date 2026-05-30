import { notFound } from 'next/navigation'
import { getConfig } from '@/config'
import { RestaurantProvider } from '@/context/RestaurantContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

interface SlugLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function SlugLayout({ children, params }: SlugLayoutProps) {
  const { slug } = await params
  const config = getConfig(slug)

  if (!config) notFound()

  return (
    <RestaurantProvider config={config}>
      <SmoothScrollProvider>
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </RestaurantProvider>
  )
}








