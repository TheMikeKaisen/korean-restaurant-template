'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { GALLERY_IMAGES } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { id: 'all', label: 'All', korean: '전체' },
  { id: 'food', label: 'Food', korean: '음식' },
  { id: 'ambience', label: 'Ambience', korean: '분위기' },
]

// Each cell in the masonry defines how it sits in CSS grid
// We use a 4-col grid on desktop, 2-col on tablet, 1-col mobile
// row-span controls height
const gridConfig = [
  { colSpan: 'md:col-span-2', rowSpan: 'row-span-2' }, // g1 — tall-wide
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-1' }, // g2
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-1' }, // g3
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-1' }, // g4
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-2' }, // g5 — tall
  { colSpan: 'md:col-span-2', rowSpan: 'row-span-1' }, // g6 — wide
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-1' }, // g7
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-1' }, // g8
]

function GalleryCell({
  item,
  config,
  index,
  isVisible,
}: {
  item: (typeof GALLERY_IMAGES)[0]
  config: (typeof gridConfig)[0]
  index: number
  isVisible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const src = item.local || item.fallback

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative overflow-hidden cursor-pointer ${config.colSpan} ${config.rowSpan}`}
      style={{
        minHeight: '220px',
        borderRadius: '2px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <motion.div
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={item.alt}
          fill
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </motion.div>

      {/* Base gradient — always present, subtle */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent" />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-charcoal-900/50"
      />

      {/* Hover content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-start justify-end p-5"
          >
            <span
              className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory-200/70 mb-1.5"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {item.category}
            </span>
            <p
              className="font-display text-ivory-100 leading-snug"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 400,
                fontSize: '1.1rem',
              }}
            >
              {item.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow icon on hover */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.7,
          x: hovered ? 0 : 6,
          y: hovered ? 0 : -6,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 right-4 w-8 h-8 bg-ivory-50 flex items-center justify-center"
        style={{ borderRadius: '50%' }}
      >
        <ArrowUpRight size={14} className="text-charcoal-800" />
      </motion.div>
    </motion.div>
  )
}

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const { ref: labelRef, isInView: labelVisible } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const { ref: filterRef, isInView: filterVisible } = useInView<HTMLDivElement>({ threshold: 0.5 })
  const { ref: gridRef, isInView: gridVisible } = useInView<HTMLDivElement>({ threshold: 0.05 })

  const filtered =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory)

  return (
    <section
      id="gallery"
      className="relative bg-ivory-100 py-32 lg:py-44 overflow-hidden"
    >
      {/* Large Hangul watermark */}
      <div
        className="absolute bottom-0 left-0 select-none pointer-events-none hidden xl:block"
        style={{
          fontFamily: 'var(--font-noto-kr)',
          fontWeight: 700,
          fontSize: '30vw',
          lineHeight: 0.85,
          color: 'rgba(200,57,58,0.022)',
          transform: 'translate(-8%, 15%)',
        }}
      >
        갤
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div ref={labelRef} className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
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
                Gallery
              </span>
              <span
                className="font-korean text-xs text-charcoal-200"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                갤러리
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
                Seen &amp;
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
                savoured.
              </motion.h2>
            </div>
          </div>

          {/* Category filters */}
          <motion.div
            ref={filterRef}
            initial={{ opacity: 0, y: 20 }}
            animate={filterVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative group px-5 py-2.5 transition-all duration-300 overflow-hidden"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  borderRadius: '1px',
                  background:
                    activeCategory === cat.id
                      ? '#1C1B19'
                      : 'transparent',
                  color:
                    activeCategory === cat.id
                      ? '#FDFCF8'
                      : '#7E7C78',
                  border: `1px solid ${activeCategory === cat.id ? '#1C1B19' : '#D0CFCC'}`,
                }}
              >
                <span className="relative z-10 uppercase font-medium tracking-widest">
                  {cat.label}
                </span>
                {activeCategory !== cat.id && (
                  <motion.span
                    className="absolute inset-0 bg-charcoal-800"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ zIndex: 0 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Masonry Grid ────────────────────────────────────────────── */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-[220px]"
            >
              {filtered.map((item, i) => {
                const cfg = gridConfig[i % gridConfig.length]
                return (
                  <GalleryCell
                    key={item.id}
                    item={item}
                    config={cfg}
                    index={i}
                    isVisible={gridVisible}
                  />
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={gridVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-center"
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 text-charcoal-600 hover:text-charcoal-900 transition-colors duration-300 no-underline"
            style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
          >
            <span className="uppercase font-medium tracking-widest">View Full Gallery</span>
            <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-500 ease-out block" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
