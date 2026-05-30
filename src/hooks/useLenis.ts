'use client'

import { useEffect, useRef } from 'react'

type LenisInstance = {
  raf: (time: number) => void
  destroy: () => void
  on: (event: string, callback: (e: { progress: number }) => void) => void
  off: (event: string, callback: (e: { progress: number }) => void) => void
}

export function useLenis(onScroll?: (progress: number) => void) {
  const lenisRef = useRef<LenisInstance | null>(null)

  useEffect(() => {
    let lenis: LenisInstance | null = null
    let animationFrameId: number

    const initLenis = async () => {
      try {
        const LenisModule = await import('lenis')
        const Lenis = LenisModule.default

        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        }) as unknown as LenisInstance

        lenisRef.current = lenis

        if (onScroll) {
          const scrollHandler = (e: { progress: number }) => {
            onScroll(e.progress)
          }
          lenis.on('scroll', scrollHandler)
        }

        const raf = (time: number) => {
          lenis!.raf(time)
          animationFrameId = requestAnimationFrame(raf)
        }

        animationFrameId = requestAnimationFrame(raf)
      } catch (error) {
        console.warn('Lenis failed to initialize:', error)
      }
    }

    initLenis()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (lenis) {
        lenis.destroy()
      }
    }
  }, [onScroll])

  return lenisRef
}
