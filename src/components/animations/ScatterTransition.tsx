'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useMemo } from 'react'

// Generates a deterministic scatter direction per index
// so it doesn't re-randomise on re-render
function getScatterOffset(index: number): { x: number; y: number; rotate: number } {
  const directions = [
    { x: -80, y: -60, rotate: -8 },
    { x: 80, y: -40, rotate: 6 },
    { x: -60, y: 80, rotate: -5 },
    { x: 100, y: 60, rotate: 10 },
    { x: -100, y: 20, rotate: -12 },
    { x: 60, y: -80, rotate: 8 },
    { x: -40, y: 100, rotate: -6 },
    { x: 120, y: -20, rotate: 12 },
    { x: -80, y: -100, rotate: -9 },
    { x: 40, y: 100, rotate: 7 },
  ]
  return directions[index % directions.length]
}

interface ScatterItemProps {
  children: React.ReactNode
  index: number
  className?: string
}

export function ScatterItem({ children, index, className = '' }: ScatterItemProps) {
  const scatter = useMemo(() => getScatterOffset(index), [index])

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: scatter.x,
      y: scatter.y,
      rotate: scatter.rotate,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay: index * 0.05,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      x: -scatter.x * 0.5,
      y: -scatter.y * 0.5,
      rotate: -scatter.rotate * 0.5,
      scale: 0.9,
      transition: {
        delay: index * 0.03,
        duration: 0.4,
        ease: [0.4, 0, 1, 1],
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── ScatterGrid ─────────────────────────────────────────────────────────────
// Wraps a list of items with AnimatePresence + scatter on key change

import React from 'react'

interface ScatterGridProps {
  children: React.ReactNode
  className?: string
  scatterKey: string
  staggerMs?: number
  scatterRange?: number
}

export function ScatterGrid({
  children,
  className = '',
  scatterKey,
  staggerMs,
  scatterRange,
}: ScatterGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scatterKey}
        className={className}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {React.Children.map(children, (child, i) => (
          <ScatterItem key={i} index={i}>
            {child}
          </ScatterItem>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
