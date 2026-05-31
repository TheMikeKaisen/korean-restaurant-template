import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { HorizontalScrollDishes } from '@/components/sections/HorizontalScrollDishes'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ReservationCTA } from '@/components/sections/ReservationCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HorizontalScrollDishes />
      <ExperienceSection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationCTA />
    </>
  )
}
