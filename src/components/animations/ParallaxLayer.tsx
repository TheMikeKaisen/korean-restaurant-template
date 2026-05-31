'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

interface ParallaxLayerProps {
  children: React.ReactNode
  /** Speed multiplier. Negative = moves up faster than scroll (floating away).
   *  Positive = moves down slower (receding). Range: -1 to 1. Default: -0.2 */
  speed?: number
  /** Apply spring smoothing to the parallax motion */
  spring?: boolean
  className?: string
  style?: React.CSSProperties
  /** Offset for when parallax triggers — default 'start end' to 'end start' */
  offset?: any
}

export function ParallaxLayer({
  children,
  speed = -0.2,
  spring: useSpringSmoothing = false,
  className = '',
  style,
  offset = ['start end', 'end start'],
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  const yRaw = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])

  const ySpring = useSpring(yRaw, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  })

  const y: any = useSpringSmoothing ? ySpring : yRaw

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Multi-depth parallax container ──────────────────────────────────────────
// Wraps children and provides a shared scroll context for layered depth

interface ParallaxSceneProps {
  children: React.ReactNode
  className?: string
}

export function ParallaxScene({ children, className = '' }: ParallaxSceneProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

// ─── Parallax image helper ────────────────────────────────────────────────────
// Adds overflow-hidden container + inner scale to prevent gaps at edges

interface ParallaxImageContainerProps {
  children: React.ReactNode
  speed?: number
  className?: string
  style?: React.CSSProperties
}

export function ParallaxImageContainer({
  children,
  speed = -0.15,
  className = '',
  style,
}: ParallaxImageContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Scale the image slightly larger to hide parallax gaps
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 120}px`, `${-speed * 120}px`])

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={style}
    >
      <motion.div
        style={{ y, scale: 1.12, transformOrigin: 'center center' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}