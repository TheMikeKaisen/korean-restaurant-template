'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  type?: 'words' | 'chars'
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
  threshold?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  /** If true, triggers immediately on mount instead of on scroll */
  immediate?: boolean
}

const CHAR_VARIANTS: Variants = {
  hidden: {
    y: '110%',
    opacity: 0,
    rotateX: -40,
  },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const WORD_VARIANTS: Variants = {
  hidden: {
    y: '105%',
    opacity: 0,
  },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: i,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function SplitText({
  text,
  className = '',
  style,
  type = 'words',
  delay = 0,
  duration,
  stagger = 0.04,
  once = true,
  threshold = 0.3,
  as: Tag = 'span',
  immediate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: '0px 0px -60px 0px',
    amount: threshold,
  })

  const shouldAnimate = immediate ? true : isInView

  if (type === 'chars') {
    const words = text.split(' ')
    let charIndex = 0

    return (
      <Tag
        ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
        className={className}
        style={{ ...style, perspective: '800px' }}
        aria-label={text}
      >
        {words.map((word, wi) => (
          <span
            key={wi}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: '0.25em' }}
          >
            {word.split('').map((char) => {
              const ci = charIndex++
              const charDelay = delay + ci * stagger
              return (
                <span
                  key={ci}
                  className="inline-block overflow-hidden"
                  style={{ verticalAlign: 'bottom' }}
                >
                  <motion.span
                    className="inline-block"
                    variants={CHAR_VARIANTS}
                    initial="hidden"
                    animate={shouldAnimate ? 'visible' : 'hidden'}
                    custom={charDelay}
                  >
                    {char}
                  </motion.span>
                </span>
              )
            })}
          </span>
        ))}
      </Tag>
    )
  }

  // Word split
  const words = text.split(' ')

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      style={style}
      aria-label={text}
    >
      {words.map((word, wi) => {
        const wordDelay = delay + wi * stagger
        return (
          <span
            key={wi}
            className="inline-block overflow-hidden"
            style={{
              marginRight: wi < words.length - 1 ? '0.28em' : 0,
              verticalAlign: 'bottom',
            }}
          >
            <motion.span
              className="inline-block"
              variants={WORD_VARIANTS}
              initial="hidden"
              animate={shouldAnimate ? 'visible' : 'hidden'}
              custom={wordDelay}
            >
              {word}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

// ─── Multi-line split — each line animates independently ─────────────────────
interface SplitLinesProps {
  lines: string[]
  className?: string
  lineClassName?: string | ((i: number) => string)
  lineStyle?: React.CSSProperties | ((i: number) => React.CSSProperties)
  delay?: number
  stagger?: number
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  immediate?: boolean
}

export function SplitLines({
  lines,
  className = '',
  lineClassName,
  lineStyle,
  delay = 0,
  stagger = 0.12,
  once = true,
  as: Tag = 'div',
  immediate = false,
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: '0px 0px -60px 0px',
    amount: 0.2,
  })

  const shouldAnimate = immediate ? true : isInView

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
    >
      {lines.map((line, i) => {
        const cls =
          typeof lineClassName === 'function' ? lineClassName(i) : lineClassName ?? ''
        const sty =
          typeof lineStyle === 'function' ? lineStyle(i) : lineStyle ?? {}

        return (
          <div key={i} className="overflow-hidden block">
            <motion.div
              initial={{ y: '105%', opacity: 0 }}
              animate={
                shouldAnimate
                  ? { y: '0%', opacity: 1 }
                  : { y: '105%', opacity: 0 }
              }
              transition={{
                delay: delay + i * stagger,
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cls}
              style={sty}
            >
              {line}
            </motion.div>
          </div>
        )
      })}
    </Tag>
  )
}