'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'view' | 'drag' | 'link' | 'open'

const CURSOR_LABELS: Partial<Record<CursorState, string>> = {
  view: 'VIEW',
  drag: 'DRAG',
  open: 'OPEN',
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const [state, setCursorState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)
  const ringPosRef = useRef({ x: -100, y: -100 })
  const mousePosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Desktop only
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    // Smooth ring follow via rAF
    const animate = () => {
      ringPosRef.current.x += (mousePosRef.current.x - ringPosRef.current.x) * 0.1
      ringPosRef.current.y += (mousePosRef.current.y - ringPosRef.current.y) * 0.1
      setRingPos({ ...ringPosRef.current })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // State detection via data attributes and element type
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const closest = target.closest('[data-cursor]') as HTMLElement | null
      const cursorAttr = closest?.dataset.cursor

      if (cursorAttr) {
        setCursorState(cursorAttr as CursorState)
        return
      }

      const tag = target.tagName.toLowerCase()
      const parentTag = target.parentElement?.tagName.toLowerCase()

      if (tag === 'a' || parentTag === 'a') {
        setCursorState('link')
      } else if (tag === 'button' || parentTag === 'button') {
        setCursorState('hover')
      } else {
        setCursorState('default')
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onMouseOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onMouseOver)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const isExpanded = state !== 'default'
  const hasLabel = state in CURSOR_LABELS
  const label = CURSOR_LABELS[state]

  const ringSize = hasLabel ? 80 : isExpanded ? 56 : 36
  const dotSize = isExpanded ? 0 : 8

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ background: '#C8393A' }}
        animate={{
          x: pos.x - dotSize / 2,
          y: pos.y - dotSize / 2,
          width: dotSize,
          height: dotSize,
          opacity: visible && !isExpanded ? 1 : 0,
        }}
        transition={{ type: 'tween', duration: 0, ease: 'linear' }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full flex items-center justify-center"
        style={{
          border: hasLabel
            ? '1px solid rgba(200,57,58,0.6)'
            : isExpanded
              ? '1.5px solid rgba(200,57,58,0.5)'
              : '1.5px solid rgba(200,57,58,0.4)',
          background: hasLabel ? 'rgba(200,57,58,0.9)' : 'transparent',
        }}
        animate={{
          x: ringPos.x - ringSize / 2,
          y: ringPos.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          x: { type: 'tween', duration: 0, ease: 'linear' },
          y: { type: 'tween', duration: 0, ease: 'linear' },
          width: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.3 },
          border: { duration: 0.3 },
          background: { duration: 0.3 },
        }}
      >
        <AnimatePresence mode="wait">
          {hasLabel && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.55rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#FDFCF8',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}