'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { DISH_IMAGES } from '@/lib/utils'
import { useRestaurant } from '@/context/RestaurantContext'
import type { RestaurantDish } from '@/types/restaurant'

function DishCard({
  dish,
  index,
  isVisible,
}: {
  dish: RestaurantDish
  index: number
  isVisible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const imageData = DISH_IMAGES[dish.id]
  const imageSrc = imageData?.local || imageData?.fallback || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.07,
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        borderRadius: '2px',
        boxShadow: hovered
          ? '0 24px 64px rgba(60,40,20,0.15), 0 8px 20px rgba(60,40,20,0.08)'
          : '0 4px 24px rgba(60,40,20,0.07)',
        transition: 'box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          height: dish.size === 'large' ? '420px' : dish.size === 'wide' ? '300px' : '240px',
        }}
        data-cursor="view"
      >
        <motion.div
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={imageSrc}
            alt={dish.name}
            fill
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(to top, rgba(17,17,16,0.75) 0%, rgba(17,17,16,0.1) 50%, transparent 100%)',
            opacity: hovered ? 0.9 : 0.65,
          }}
        />

        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          {dish.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[0.58rem] tracking-[0.15em] uppercase font-medium"
              style={{
                fontFamily: 'var(--font-outfit)',
                background:
                  tag === 'Bestseller' || tag === 'Signature'
                    ? '#C8393A'
                    : 'rgba(253,252,248,0.85)',
                color:
                  tag === 'Bestseller' || tag === 'Signature'
                    ? '#FDFCF8'
                    : '#2A2927',
                backdropFilter: 'blur(10px)',
                borderRadius: '1px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Korean name — top right, decorative */}
        <motion.span
          animate={{ opacity: hovered ? 0.25 : 0.1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 right-4 font-korean font-light select-none"
          style={{
            fontFamily: 'var(--font-noto-kr)',
            fontWeight: 300,
            fontSize: '2.5rem',
            color: '#FDFCF8',
            lineHeight: 1,
          }}
        >
          {dish.koreanName.charAt(0)}
        </motion.span>

        {/* Bottom content (always visible) */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p
                className="font-display text-ivory-100 leading-tight mb-1"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 400,
                  fontSize: dish.size === 'large' ? '1.6rem' : '1.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {dish.name}
              </p>
              {/* Description slides up on hover */}
              <AnimatePresence>
                {hovered && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-ivory-300 leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontWeight: 300,
                      fontSize: '0.78rem',
                      color: 'rgba(253,252,248,0.75)',
                    }}
                  >
                    {dish.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span
                className="font-display text-ivory-100"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 400,
                  fontSize: '1.2rem',
                  color: 'rgba(253,252,248,0.9)',
                }}
              >
                ₹{dish.price}
              </span>
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0,
                  scale: hovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-korean-red"
              >
                <ArrowUpRight size={14} className="text-ivory-100" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function DishesSection() {
  const { dishes } = useRestaurant()
  const { ref: labelRef, isInView: labelVisible } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const { ref: gridRef, isInView: gridVisible } = useInView<HTMLDivElement>({ threshold: 0.05 })

  return (
    <section
      id="dishes"
      className="relative bg-ivory-100 py-32 lg:py-44 overflow-hidden"
    >
      {/* Large Hangul watermark */}
      <div
        className="absolute top-0 right-0 select-none pointer-events-none hidden xl:block"
        style={{
          fontFamily: 'var(--font-noto-kr)',
          fontWeight: 700,
          fontSize: '28vw',
          lineHeight: 1,
          color: 'rgba(200,57,58,0.025)',
          transform: 'translate(10%, -10%)',
          letterSpacing: '-0.05em',
        }}
      >
        맛
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section Header ───────────────────────────────────────────── */}
        <div ref={labelRef} className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
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
                Signature Dishes
              </span>
              <span
                className="font-korean text-xs text-charcoal-200"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                시그니처
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                animate={labelVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display font-light text-charcoal-800 leading-[0.95]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Crafted with
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                animate={labelVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="font-display italic font-light text-charcoal-800 leading-[0.95]"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 300,
                  fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                soul & fire.
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={labelVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 lg:items-end max-w-xs lg:max-w-sm"
          >
            <p
              className="text-charcoal-400 leading-relaxed lg:text-right"
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 300,
                fontSize: '0.9rem',
              }}
            >
              Every dish on our menu begins in Seoul and ends in Pune — a dialogue between two cities, told through flavour.
            </p>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-3 text-charcoal-700 hover:text-korean-red transition-colors duration-300 no-underline self-start lg:self-end"
              style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
            >
              <span className="uppercase font-medium tracking-widest">View Full Menu</span>
              <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-400 ease-out block" />
            </Link>
          </motion.div>
        </div>

        {/* ── Bento Grid ───────────────────────────────────────────────── */}
        <div ref={gridRef}>
          {/*
            Layout:
            Row 1: [large (Korean Fried Chicken)] | [small stack: Bibimbap + Tteokbokki]
            Row 2: [wide: Korean BBQ] spanning full
            Row 3: [small × 4: Ramen, Kimchi Rice, Corn Dog, Bingsu]
          */}

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Large card */}
            <div className="md:col-span-2">
              <DishCard dish={dishes[0]} index={0} isVisible={gridVisible} />
            </div>
            {/* Small stack */}
            <div className="grid grid-rows-2 gap-4">
              <DishCard dish={dishes[1]} index={1} isVisible={gridVisible} />
              <DishCard dish={dishes[2]} index={2} isVisible={gridVisible} />
            </div>
          </div>

          {/* Row 2 — wide BBQ */}
          <div className="mb-4">
            <DishCard dish={dishes[3]} index={3} isVisible={gridVisible} />
          </div>

          {/* Row 3 — four small */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dishes.slice(4).map((dish, i) => (
              <DishCard
                key={dish.id}
                dish={dish}
                index={i + 4}
                isVisible={gridVisible}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={gridVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/menu"
            className="group flex items-center gap-3 px-8 py-4 bg-charcoal-800 text-ivory-100 hover:bg-korean-red transition-colors duration-400 no-underline"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
            }}
          >
            <span className="uppercase font-medium tracking-widest">Explore Full Menu</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </Link>
          <Link
            href="/reservations"
            className="group flex items-center gap-3 px-8 py-4 border border-charcoal-300 text-charcoal-600 hover:border-charcoal-800 hover:text-charcoal-800 transition-all duration-400 no-underline"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
            }}
          >
            <span className="uppercase font-medium tracking-widest">Reserve a Table</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
