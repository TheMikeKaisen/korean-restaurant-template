'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { GALLERY_IMAGES } from '@/lib/utils'
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

// Extended gallery for the full page — more items
const ALL_GALLERY = [
  ...GALLERY_IMAGES,
  {
    id: 'g9',
    local: '/images/gallery/gallery-9.jpg',
    fallback: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80',
    alt: 'Korean table setting',
    category: 'ambience',
    aspect: 'square',
  },
  {
    id: 'g10',
    local: '/images/gallery/gallery-10.jpg',
    fallback: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80',
    alt: 'Tteokbokki close-up',
    category: 'food',
    aspect: 'portrait',
  },
  {
    id: 'g11',
    local: '/images/gallery/gallery-11.jpg',
    fallback: 'https://images.unsplash.com/photo-1602273660127-a0000560a47c?w=800&q=80',
    alt: 'Korean fried chicken plating',
    category: 'food',
    aspect: 'landscape',
  },
  {
    id: 'g12',
    local: '/images/gallery/gallery-12.jpg',
    fallback: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',
    alt: 'Weekend brunch spread',
    category: 'food',
    aspect: 'landscape',
  },
]

const categories = [
  { id: 'all', label: 'All', korean: '전체' },
  { id: 'food', label: 'Food', korean: '음식' },
  { id: 'ambience', label: 'Ambience', korean: '분위기' },
]

// Masonry column heights — deterministic layout
const colConfig = [
  // col 1 heights
  ['tall', 'short', 'medium'],
  // col 2
  ['short', 'tall', 'short'],
  // col 3
  ['medium', 'medium', 'tall'],
  // col 4
  ['short', 'tall', 'short'],
]

const heightMap: Record<string, string> = {
  tall: '440px',
  medium: '320px',
  short: '240px',
}

function LightboxModal({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: typeof ALL_GALLERY
  activeIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = items[activeIndex]
  const src = item.local || item.fallback

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9990] bg-charcoal-900/95 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 border border-ivory-100/20 flex items-center justify-center text-ivory-100/70 hover:text-ivory-100 hover:border-ivory-100/50 transition-all duration-300"
        style={{ borderRadius: '1px' }}
        aria-label="Close lightbox"
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-10">
        <span
          className="text-[0.65rem] tracking-[0.25em] uppercase text-ivory-100/50"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {activeIndex + 1} / {items.length}
        </span>
      </div>

      {/* Image */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl w-full max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ aspectRatio: '4/3' }}
      >
        <Image
          src={src}
          alt={item.alt}
          fill
          quality={90}
          sizes="(max-width: 1024px) 95vw, 80vw"
          className="object-contain"
        />
      </motion.div>

      {/* Caption */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
        <p
          className="font-display text-ivory-100/80 text-lg"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
        >
          {item.alt}
        </p>
        <p
          className="text-[0.6rem] tracking-[0.2em] uppercase text-ivory-100/40 mt-1"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {item.category}
        </p>
      </div>

      {/* Arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-ivory-100/20 flex items-center justify-center text-ivory-100/60 hover:text-ivory-100 hover:border-ivory-100/50 transition-all duration-300"
        style={{ borderRadius: '1px' }}
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-ivory-100/20 flex items-center justify-center text-ivory-100/60 hover:text-ivory-100 hover:border-ivory-100/50 transition-all duration-300"
        style={{ borderRadius: '1px' }}
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  )
}

function GalleryTile({
  item,
  height,
  index,
  isVisible,
  onClick,
}: {
  item: (typeof ALL_GALLERY)[0]
  height: string
  index: number
  isVisible: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const src = item.local || item.fallback

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden cursor-pointer mb-3"
      style={{ height, borderRadius: '2px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={item.alt}
          fill
          quality={80}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </motion.div>

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/25 via-transparent to-transparent" />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-charcoal-900/55"
      />

      {/* Hover content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-end p-4"
          >
            <p
              className="font-display text-ivory-100 leading-snug text-base"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
            >
              {item.alt}
            </p>
            <p
              className="text-[0.58rem] tracking-[0.2em] uppercase text-ivory-100/60 mt-1"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {item.category}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand icon */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.25 }}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ivory-50 flex items-center justify-center"
      >
        <ArrowUpRight size={13} className="text-charcoal-800" />
      </motion.div>
    </motion.div>
  )
}

export function GalleryPageContent() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { ref: headerRef, isInView: headerVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const { ref: gridRef, isInView: gridVisible } = useInView<HTMLDivElement>({ threshold: 0.03 })

  const filtered =
    activeCategory === 'all'
      ? ALL_GALLERY
      : ALL_GALLERY.filter((img) => img.category === activeCategory)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  }, [filtered.length])
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))
  }, [filtered.length])

  // Distribute items across 4 columns (desktop) / 2 columns (tablet)
  const col1 = filtered.filter((_, i) => i % 4 === 0)
  const col2 = filtered.filter((_, i) => i % 4 === 1)
  const col3 = filtered.filter((_, i) => i % 4 === 2)
  const col4 = filtered.filter((_, i) => i % 4 === 3)

  const getHeight = (colIdx: number, rowIdx: number) => {
    const heights = colConfig[colIdx % 4]
    return heightMap[heights[rowIdx % heights.length]]
  }

  const renderColumn = (items: typeof ALL_GALLERY, colIdx: number) =>
    items.map((item, rowIdx) => {
      const globalIndex = filtered.indexOf(item)
      return (
        <GalleryTile
          key={item.id}
          item={item}
          height={getHeight(colIdx, rowIdx)}
          index={globalIndex}
          isVisible={gridVisible}
          onClick={() => openLightbox(globalIndex)}
        />
      )
    })

  return (
    <main className="bg-ivory-50 overflow-x-hidden min-h-screen">

      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div className="pt-36 pb-12 lg:pt-44 lg:pb-16 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={headerVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-8 h-px bg-korean-red block" />
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

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <div className="overflow-hidden mb-1">
                <motion.h1
                  initial={{ y: '105%', opacity: 0 }}
                  animate={headerVisible ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                  className="font-display font-light text-charcoal-800 leading-[0.92]"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(3rem, 8vw, 8.5rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  A feast
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '105%', opacity: 0 }}
                  animate={headerVisible ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                  className="font-display italic font-light leading-[0.92]"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(3rem, 8vw, 8.5rem)',
                    letterSpacing: '-0.03em',
                    color: '#C8393A',
                  }}
                >
                  for the eyes.
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="relative px-5 py-2.5 transition-all duration-300 overflow-hidden"
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.15em',
                      borderRadius: '1px',
                      background: isActive ? '#1C1B19' : 'transparent',
                      color: isActive ? '#FDFCF8' : '#7E7C78',
                      border: `1px solid ${isActive ? '#1C1B19' : '#D0CFCC'}`,
                    }}
                  >
                    <span className="relative z-10 uppercase font-medium tracking-widest">
                      {cat.label}
                    </span>
                    {!isActive && (
                      <motion.span
                        className="absolute inset-0 bg-charcoal-800"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Masonry Grid ─────────────────────────────────────────────── */}
      <div className="px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto pb-24">
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* Item count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 mb-6"
              >
                <span
                  className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-400"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {filtered.length} photos
                </span>
                <span className="w-8 h-px bg-charcoal-200 block" />
              </motion.div>

              {/* 4-col masonry desktop, 2-col tablet, 1-col mobile */}
              <div className="hidden lg:grid grid-cols-4 gap-3">
                <div>{renderColumn(col1, 0)}</div>
                <div>{renderColumn(col2, 1)}</div>
                <div>{renderColumn(col3, 2)}</div>
                <div>{renderColumn(col4, 3)}</div>
              </div>

              {/* 2-col tablet */}
              <div className="hidden sm:grid lg:hidden grid-cols-2 gap-3">
                <div>
                  {filtered.filter((_, i) => i % 2 === 0).map((item, rowIdx) => {
                    const globalIndex = filtered.indexOf(item)
                    return (
                      <GalleryTile
                        key={item.id}
                        item={item}
                        height={getHeight(0, rowIdx)}
                        index={globalIndex}
                        isVisible={gridVisible}
                        onClick={() => openLightbox(globalIndex)}
                      />
                    )
                  })}
                </div>
                <div>
                  {filtered.filter((_, i) => i % 2 === 1).map((item, rowIdx) => {
                    const globalIndex = filtered.indexOf(item)
                    return (
                      <GalleryTile
                        key={item.id}
                        item={item}
                        height={getHeight(1, rowIdx)}
                        index={globalIndex}
                        isVisible={gridVisible}
                        onClick={() => openLightbox(globalIndex)}
                      />
                    )
                  })}
                </div>
              </div>

              {/* 1-col mobile */}
              <div className="grid sm:hidden grid-cols-1 gap-3">
                {filtered.map((item, i) => (
                  <GalleryTile
                    key={item.id}
                    item={item}
                    height="280px"
                    index={i}
                    isVisible={gridVisible}
                    onClick={() => openLightbox(i)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            items={filtered}
            activeIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

    </main>
  )
}