'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRestaurant } from '@/context/RestaurantContext'

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-korean-red text-sm leading-none">
          ★
        </span>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { testimonials, identity } = useRestaurant()
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { ref: labelRef, isInView: labelVisible } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const { ref: sectionRef, isInView: sectionVisible } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const count = testimonials.length

  const paginate = (dir: 1 | -1) => {
    setDirection(dir)
    setActive((prev) => (prev + dir + count) % count)
  }

  // Auto-advance every 5s
  useEffect(() => {
    autoRef.current = setInterval(() => paginate(1), 5000)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [active])

  const resetAuto = (dir: 1 | -1) => {
    if (autoRef.current) clearInterval(autoRef.current)
    paginate(dir)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  const current = testimonials[active]
  // Show 3 cards on desktop: prev, active, next
  const getCard = (offset: number) =>
    testimonials[(active + offset + count) % count]

  return (
    <section
      id="testimonials"
      className="relative bg-ivory-50 py-32 lg:py-44 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(200,57,58,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Large decorative Hangul */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden xl:block"
        style={{
          fontFamily: 'var(--font-noto-kr)',
          fontWeight: 700,
          fontSize: '28vw',
          lineHeight: 1,
          color: 'rgba(200,57,58,0.025)',
          transform: 'translate(12%, -50%)',
        }}
      >
        후기
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div ref={labelRef} className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={labelVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <motion.span
                className="block h-px bg-korean-red"
                initial={{ width: 0 }}
                animate={labelVisible ? { width: 40 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <span
                className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Guest Stories
              </span>
              <span
                className="font-korean text-xs text-charcoal-200"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                후기
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                animate={labelVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="font-display font-light leading-[0.95] text-charcoal-800"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Words from
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                animate={labelVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                className="font-display italic font-light leading-[0.95] text-charcoal-800"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                our guests.
              </motion.h2>
            </div>
          </div>

          {/* Overall rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={labelVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start lg:items-end gap-2"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="font-display leading-none text-charcoal-800"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 400,
                  fontSize: '3.5rem',
                  letterSpacing: '-0.03em',
                }}
              >
                {identity.rating}
              </span>
              <div className="flex flex-col gap-1">
                <StarRating count={5} />
                <span
                  className="text-[0.6rem] tracking-[0.2em] uppercase text-charcoal-400"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {identity.reviewCount} Reviews
                </span>
              </div>
            </div>
            <p
              className="text-[0.72rem] text-charcoal-400"
              style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
            >
              Google · Zomato · Swiggy
            </p>
          </motion.div>
        </div>

        {/* ── Desktop: 3-card layout ───────────────────────────────── */}
        <div ref={sectionRef} className="hidden lg:block">
          <div className="grid grid-cols-3 gap-5">
            {[-1, 0, 1].map((offset) => {
              const card = getCard(offset)
              const isCenter = offset === 0

              return (
                <motion.div
                  key={card.id + offset}
                  animate={{
                    scale: isCenter ? 1 : 0.96,
                    opacity: isCenter ? 1 : 0.55,
                    y: isCenter ? -8 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-8 border flex flex-col gap-5 cursor-pointer"
                  onClick={() => {
                    if (offset !== 0) {
                      resetAuto(offset as 1 | -1)
                    }
                  }}
                  style={{
                    borderRadius: '2px',
                    background: isCenter ? '#FDFCF8' : '#FAF8F2',
                    borderColor: isCenter ? 'rgba(200,57,58,0.2)' : '#E8E8E6',
                    boxShadow: isCenter
                      ? '0 20px 64px rgba(60,40,20,0.1), 0 4px 16px rgba(60,40,20,0.06)'
                      : 'none',
                  }}
                >
                  {/* Red accent bar for center */}
                  {isCenter && (
                    <motion.div
                      layoutId="active-bar"
                      className="absolute top-0 left-0 right-0 h-[2px] bg-korean-red"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Quote mark */}
                  <span
                    className="font-display text-6xl leading-none select-none"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 300,
                      color: isCenter ? 'rgba(200,57,58,0.15)' : 'rgba(200,57,58,0.06)',
                      lineHeight: 0.7,
                    }}
                  >
                    "
                  </span>

                  {/* Rating */}
                  <StarRating count={card.rating} />

                  {/* Text */}
                  <p
                    className="text-charcoal-500 leading-[1.8] flex-1"
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontWeight: 300,
                      fontSize: isCenter ? '0.92rem' : '0.85rem',
                    }}
                  >
                    {card.text}
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 pt-4 border-t border-charcoal-100">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: isCenter
                          ? 'rgba(200,57,58,0.1)'
                          : 'rgba(200,57,58,0.05)',
                      }}
                    >
                      <span
                        className="text-korean-red font-medium"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.9rem' }}
                      >
                        {card.initial}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-charcoal-700 font-medium leading-tight truncate"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.82rem' }}
                      >
                        {card.name}
                      </p>
                      <p
                        className="text-charcoal-400 truncate"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem' }}
                      >
                        {card.location}
                      </p>
                    </div>
                    <span
                      className="ml-auto text-[0.58rem] tracking-[0.15em] uppercase text-charcoal-300 shrink-0"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {card.occasion}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Mobile: Single card carousel ────────────────────────── */}
        <div className="lg:hidden relative overflow-hidden" style={{ minHeight: '360px' }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative p-7 border bg-ivory-50"
              style={{
                borderRadius: '2px',
                borderColor: 'rgba(200,57,58,0.2)',
                boxShadow: '0 16px 48px rgba(60,40,20,0.08)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-korean-red" />

              <span
                className="font-display text-6xl leading-none block mb-4 select-none"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  color: 'rgba(200,57,58,0.12)',
                  lineHeight: 0.7,
                }}
              >
                "
              </span>
              <StarRating count={current.rating} />
              <p
                className="text-charcoal-500 leading-[1.8] mt-4 mb-6"
                style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: '0.9rem' }}
              >
                {current.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-charcoal-100">
                <div className="w-10 h-10 rounded-full bg-korean-red/10 flex items-center justify-center shrink-0">
                  <span className="text-korean-red font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {current.initial}
                  </span>
                </div>
                <div>
                  <p className="text-charcoal-700 font-medium text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {current.name}
                  </p>
                  <p className="text-charcoal-400 text-xs" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {current.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Controls ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-between"
        >
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const dir = i > active ? 1 : -1
                  resetAuto(dir as 1 | -1)
                  setActive(i)
                }}
                className="transition-all duration-400"
                style={{
                  width: i === active ? '28px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === active ? '#C8393A' : '#D0CFCC',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => resetAuto(-1)}
              className="group w-11 h-11 border border-charcoal-200 flex items-center justify-center hover:border-charcoal-800 hover:bg-charcoal-800 transition-all duration-300"
              style={{ borderRadius: '1px' }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                size={16}
                className="text-charcoal-500 group-hover:text-ivory-100 transition-colors duration-300"
              />
            </button>
            <button
              onClick={() => resetAuto(1)}
              className="group w-11 h-11 border border-charcoal-200 flex items-center justify-center hover:border-charcoal-800 hover:bg-charcoal-800 transition-all duration-300"
              style={{ borderRadius: '1px' }}
              aria-label="Next testimonial"
            >
              <ChevronRight
                size={16}
                className="text-charcoal-500 group-hover:text-ivory-100 transition-colors duration-300"
              />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}