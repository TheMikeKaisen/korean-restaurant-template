'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useRestaurant } from '@/context/RestaurantContext'
import { DISH_IMAGES } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const CARD_WIDTH_VW = 75  // each card = 75vw on desktop
const CARD_GAP = 32        // px gap between cards

function DishCard({
  dish,
  index,
  totalCards,
}: {
  dish: ReturnType<typeof useRestaurant>['dishes'][0]
  index: number
  totalCards: number
}) {
  const [hovered, setHovered] = useState(false)
  const imageData = DISH_IMAGES[dish.imageKey as keyof typeof DISH_IMAGES]
  const src = imageData?.local || imageData?.fallback || ''

  const num = String(index + 1).padStart(2, '0')

  return (
    <div
      className="relative shrink-0 h-screen flex items-center justify-center"
      style={{ width: `${CARD_WIDTH_VW}vw` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
    >
      <div
        className="relative w-full h-[82vh] overflow-hidden group"
        style={{ borderRadius: '2px' }}
      >
        {/* Image with inner parallax */}
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          style={{ scale: 1.06 }} // slight overscale to allow parallax room
        >
          <Image
            src={src}
            alt={dish.name}
            fill
            quality={90}
            sizes="75vw"
            className="object-cover"
            priority={index < 2}
          />
        </motion.div>

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/30 to-transparent" />

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 0.15 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-korean-red"
        />

        {/* Index number — top left decorative */}
        <div className="absolute top-8 left-8 z-10">
          <span
            className="text-ivory-100/20 select-none"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(4rem, 8vw, 9rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            {num}
          </span>
        </div>

        {/* Korean name — top right decorative */}
        <motion.div
          animate={{ opacity: hovered ? 0.4 : 0.15 }}
          transition={{ duration: 0.4 }}
          className="absolute top-8 right-8 z-10"
        >
          <span
            style={{
              fontFamily: 'var(--font-noto-kr)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              color: '#FDFCF8',
              lineHeight: 1,
            }}
          >
            {dish.koreanName}
          </span>
        </motion.div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 z-10">
          {/* Tags */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {dish.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[0.58rem] tracking-[0.18em] uppercase font-medium"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  background:
                    tag === 'Bestseller' || tag === 'Signature'
                      ? '#C8393A'
                      : 'rgba(253,252,248,0.15)',
                  color: '#FDFCF8',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '1px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Dish name */}
          <h3
            className="text-ivory-100 leading-[0.92] mb-3"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {dish.name}
          </h3>

          {/* Description + price row */}
          <div className="flex items-end justify-between gap-8">
            <motion.p
              animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? 0 : 6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md"
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 300,
                fontSize: 'clamp(0.8rem, 1.2vw, 0.95rem)',
                color: 'rgba(253,252,248,0.72)',
                lineHeight: 1.75,
              }}
            >
              {dish.description}
            </motion.p>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  color: 'rgba(253,252,248,0.9)',
                  lineHeight: 1,
                }}
              >
                ₹{dish.price}
              </span>
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0,
                  x: hovered ? 0 : -8,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/reservations"
                  className="flex items-center gap-2 text-ivory-100 no-underline group"
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  Order Now
                  <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HorizontalScrollDishes() {
  const { dishes, identity } = useRestaurant()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)

  const { ref: labelRef, isInView: labelVisible } = useInView<HTMLDivElement>({ threshold: 0.3 })

  // Total scrollable width = (cards * card_width) + gaps - viewport_width
  useEffect(() => {
    const calculateWidth = () => {
      if (!trackRef.current) return
      const vw = window.innerWidth
      const totalTrack = dishes.length * (CARD_WIDTH_VW / 100 * vw) + (dishes.length - 1) * CARD_GAP
      const scrollable = totalTrack - vw + 160 // 160 = left offset
      setTrackWidth(scrollable)
    }
    calculateWidth()
    window.addEventListener('resize', calculateWidth)
    return () => window.removeEventListener('resize', calculateWidth)
  }, [dishes.length])

  // Scroll-driven horizontal movement
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -trackWidth])
  const x = useSpring(xRaw, { stiffness: 80, damping: 20, restDelta: 1 })

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Section height = viewport + scrollable track
  const sectionHeight = `calc(100vh + ${trackWidth}px)`

  return (
    <section
      ref={sectionRef}
      id="dishes"
      className="relative bg-charcoal-900"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div
          ref={labelRef}
          className="absolute top-0 left-0 right-0 z-20 px-8 lg:px-16 pt-8 flex items-start justify-between"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={labelVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-3"
            >
              <motion.span
                className="block h-px bg-korean-red"
                initial={{ width: 0 }}
                animate={labelVisible ? { width: 32 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <span
                className="text-[0.6rem] tracking-[0.35em] uppercase text-korean-red font-medium"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Signature Dishes
              </span>
              <span
                className="font-korean text-xs text-charcoal-600"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                시그니처
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={labelVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-display font-light text-ivory-100 leading-none"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Crafted with{' '}
                <span
                  className="italic"
                  style={{ color: '#C8393A' }}
                >
                  soul &amp; fire.
                </span>
              </span>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={labelVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hidden lg:flex items-center gap-3 mt-2"
          >
            <span
              className="text-[0.6rem] tracking-[0.3em] uppercase text-charcoal-500"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-charcoal-500"
            >
              →
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scrolling track ──────────────────────────────────────── */}
        <motion.div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center pl-16 lg:pl-24"
          style={{
            x,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 'clamp(4rem, 8vw, 8rem)',
            gap: `${CARD_GAP}px`,
          }}
        >
          {dishes.map((dish, i) => (
            <DishCard
              key={dish.id}
              dish={dish}
              index={i}
              totalCards={dishes.length}
            />
          ))}

          {/* End card — CTA */}
          <div
            className="relative shrink-0 h-screen flex items-center justify-center pr-16"
            style={{ width: '50vw' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 items-start"
            >
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 4vw, 4rem)',
                    letterSpacing: '-0.03em',
                    color: '#FAF8F2',
                    lineHeight: 1.1,
                  }}
                >
                  {identity.menuCount} dishes.
                </motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: 'clamp(2rem, 4vw, 4rem)',
                    letterSpacing: '-0.03em',
                    color: '#C8393A',
                    lineHeight: 1.1,
                  }}
                >
                  One obsession.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center gap-4 mt-4"
              >
                <Link
                  href="/menu"
                  className="group flex items-center gap-3 px-8 py-4 bg-korean-red text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800 transition-all duration-400 no-underline"
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  <span className="uppercase font-medium tracking-widest">Full Menu</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/reservations"
                  className="group flex items-center gap-3 px-8 py-4 border border-charcoal-600 text-charcoal-400 hover:border-ivory-100/30 hover:text-ivory-100 transition-all duration-400 no-underline"
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                  }}
                >
                  <span className="uppercase font-medium tracking-widest">Reserve</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Progress bar + counter ───────────────────────────────── */}
        <div className="absolute bottom-8 left-0 right-0 px-8 lg:px-16 z-20">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[0.58rem] tracking-[0.25em] uppercase text-charcoal-600"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {identity.name}
            </span>
            <span
              className="font-korean text-[0.6rem] text-charcoal-700"
              style={{ fontFamily: 'var(--font-noto-kr)' }}
            >
              맛있게 드세요
            </span>
          </div>
          {/* Track */}
          <div
            className="w-full h-px bg-charcoal-800 relative overflow-hidden"
          >
            <motion.div
              className="absolute left-0 top-0 h-full bg-korean-red"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        {/* ── Dish counter ─────────────────────────────────────────── */}
        <motion.div
          className="absolute bottom-16 right-8 lg:right-16 z-20"
          style={{ opacity: scrollYProgress }}
        >
          <span
            className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-600"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {dishes.length} dishes
          </span>
        </motion.div>

      </div>
    </section>
  )
}