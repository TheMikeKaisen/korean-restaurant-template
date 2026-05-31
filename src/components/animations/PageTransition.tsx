'use client'

import { motion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

// Two-layer transition:
// 1. Korean-red curtain sweeps in from bottom → covering old page
// 2. Ivory curtain sweeps out upward → revealing new page
// Feel: cinematic, intentional, premium

const CURTAIN_VARIANTS = {
  initial: { scaleY: 0, originY: '100%' },
  animate: { scaleY: 0, originY: '100%' },
  exit: {
    scaleY: [0, 1, 1, 0],
    originY: ['100%', '100%', '0%', '0%'],
    transition: {
      duration: 0.9,
      times: [0, 0.4, 0.6, 1],
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const CONTENT_VARIANTS = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Korean red curtain layer */}
      <motion.div
        className="fixed inset-0 z-[9990] pointer-events-none"
        style={{ background: '#C8393A', transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{
          scaleY: [0, 1, 1, 0],
          transition: {
            duration: 0.85,
            times: [0, 0.42, 0.58, 1],
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      />

      {/* Ivory reveal layer — slightly delayed */}
      <motion.div
        className="fixed inset-0 z-[9989] pointer-events-none"
        style={{ background: '#FDFCF8', transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{
          scaleY: [0, 1, 1, 0],
          transition: {
            duration: 0.85,
            delay: 0.06,
            times: [0, 0.42, 0.58, 1],
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      />

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: {
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      >
        {children}
      </motion.div>
    </>
  )
}