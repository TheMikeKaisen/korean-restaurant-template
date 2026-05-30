'use client'

import { useEffect } from 'react'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    let lenis: {
      raf: (time: number) => void
      destroy: () => void
    } | null = null
    let animationFrameId: number

    const initLenis = async () => {
      try {
        const LenisModule = await import('lenis')
        const Lenis = LenisModule.default

        lenis = new Lenis({
          duration: 1.3,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.8,
        }) as { raf: (time: number) => void; destroy: () => void }

        const raf = (time: number) => {
          lenis!.raf(time)
          animationFrameId = requestAnimationFrame(raf)
        }

        animationFrameId = requestAnimationFrame(raf)
      } catch (error) {
        console.warn('Lenis smooth scroll not available:', error)
      }
    }

    initLenis()

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (lenis) lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
