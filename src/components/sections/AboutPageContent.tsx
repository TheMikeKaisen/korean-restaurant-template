'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { ABOUT_IMAGES } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

const timeline = [
  {
    year: '2017',
    korean: '시작',
    title: 'The Idea',
    body: 'Ji-Woo Han, fresh from two years cooking in Seoul\'s Itaewon district, returns to Pune with a single obsession: to recreate the Korean food experiences that changed her life — with zero compromise.',
  },
  {
    year: '2018',
    korean: '준비',
    title: 'The Preparation',
    body: 'Eighteen months of recipe testing, ingredient sourcing, and two trips back to Seoul to apprentice under a michelin-recognised Korean grandmother in Mapo-gu. Every dish earns its place.',
  },
  {
    year: '2019',
    korean: '개업',
    title: 'Doors Open',
    body: 'Gangnam Kitchen opens in Koregaon Park with a 28-seat dining room, a menu of 22 dishes, and a waitlist on day one. Pune had never tasted anything like it.',
  },
  {
    year: '2021',
    korean: '성장',
    title: 'Growing Deeper',
    body: 'Through the pandemic, we pivoted to meal kits — and discovered that our guests didn\'t just love our food, they wanted to understand it. We launched Korean cooking workshops alongside the restaurant.',
  },
  {
    year: '2024',
    korean: '현재',
    title: 'Today',
    body: 'A 60-seat dining room, 50+ dishes, a thriving weekend brunch programme, and a reputation as Pune\'s definitive Korean dining destination. We\'re still obsessed with getting it right.',
  },
]

const values = [
  {
    number: '01',
    title: 'Authenticity Above All',
    body: 'We will never water down a dish for comfort. If it\'s spicy in Seoul, it\'s spicy here. If it takes three days to ferment, we wait three days.',
    korean: '정통',
  },
  {
    number: '02',
    title: 'Ingredients as Craft',
    body: 'We import what we can\'t replicate. We make what we can\'t import. There is no shortcut in our kitchen — only process and patience.',
    korean: '재료',
  },
  {
    number: '03',
    title: 'Space as Experience',
    body: 'The room is as considered as the food. Every material, every playlist, every light source is chosen to make you feel like you\'ve quietly landed somewhere beautiful.',
    korean: '공간',
  },
  {
    number: '04',
    title: 'Community as Purpose',
    body: 'We are a Korean restaurant in Pune — a bridge between two cultures. That\'s not a marketing line. It\'s our entire reason for existing.',
    korean: '커뮤니티',
  },
]

export function AboutPageContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImageY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroContentY = useTransform(heroScroll, [0, 1], ['0%', '15%'])

  const { ref: timelineRef, isInView: timelineVisible } = useInView<HTMLDivElement>({ threshold: 0.05 })
  const { ref: valuesRef, isInView: valuesVisible } = useInView<HTMLDivElement>({ threshold: 0.05 })
  const { ref: ctaRef, isInView: ctaVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <main className="bg-ivory-50 overflow-x-hidden">

      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY, scale: 1.08 }}>
          <Image
            src={ABOUT_IMAGES.restaurant.local || ABOUT_IMAGES.restaurant.fallback}
            alt="Gangnam Kitchen restaurant"
            fill priority quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/75 via-charcoal-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory-50/60 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ y: heroContentY }}
          className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-16 xl:px-24 pb-24 max-w-[1400px]"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-8 h-px bg-korean-red block" />
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
              Our Story
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-ivory-100 leading-[0.92]"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(3.5rem, 9vw, 9.5rem)', letterSpacing: '-0.03em' }}
            >
              Born in Seoul.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ delay: 0.65, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic font-light leading-[0.92]"
              style={{
                fontFamily: 'var(--font-cormorant)', fontWeight: 300,
                fontSize: 'clamp(3.5rem, 9vw, 9.5rem)', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #C8393A, #E8504F)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              Made in Pune.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg text-ivory-100/70 leading-relaxed"
            style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
          >
            The story of one chef's obsession, one city's appetite, and a restaurant that refuses to compromise on either.
          </motion.p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 right-10 z-10 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-[0.58rem] tracking-[0.3em] uppercase text-ivory-100/40 [writing-mode:vertical-rl]" style={{ fontFamily: 'var(--font-outfit)' }}>
            Scroll to explore
          </span>
        </motion.div>
      </div>

      {/* ── Intro statement ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-8 h-px bg-korean-red block" />
              <span className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>About Us</span>
              <span className="font-korean text-xs text-charcoal-200" style={{ fontFamily: 'var(--font-noto-kr)' }}>소개</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="font-display font-light text-charcoal-800 leading-[0.95]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', letterSpacing: '-0.03em' }}
              >
                We are not a
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
                className="font-display italic font-light text-charcoal-800 leading-[0.95]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', letterSpacing: '-0.03em' }}
              >
                trend restaurant.
              </motion.h2>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 space-y-6 pt-4">
            {[
              'Gangnam Kitchen exists because Korean food deserves more than novelty. It deserves reverence. The techniques are centuries old. The flavours are deeply considered. The balance of spice, sweetness, fermentation, and smoke is not an accident — it is an art form.',
              'We are the only restaurant in Pune that makes its own gochujang paste, ferments its own kimchi in-house for a minimum of 72 hours, and imports key pantry ingredients directly from Korea. Not because we need to tell you that — because the food tells you itself.',
              'Come hungry. Come curious. Come ready to stay a while.',
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-charcoal-500 leading-[1.85]"
                style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: 'clamp(0.88rem, 1.2vw, 1rem)' }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chef Image full-bleed ──────────────────────────────────────── */}
      <section className="relative h-[55vh] lg:h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={ABOUT_IMAGES.chef.local || ABOUT_IMAGES.chef.fallback}
            alt="Chef Ji-Woo Han"
            fill quality={85}
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory-50/50 via-transparent to-ivory-50/20" />
        </motion.div>

        <div className="relative z-10 h-full flex items-end px-6 lg:px-16 xl:px-24 pb-12 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-5"
            style={{ background: 'rgba(253,252,248,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.85)', borderRadius: '2px' }}
          >
            <p className="font-display text-xl text-charcoal-700 leading-snug" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              Ji-Woo Han
            </p>
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-400 mt-1" style={{ fontFamily: 'var(--font-outfit)' }}>
              Founder & Head Chef
            </p>
            <p className="font-korean text-xs text-charcoal-300 mt-1" style={{ fontFamily: 'var(--font-noto-kr)' }}>
              창업자 및 수석 셰프
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-40 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="w-8 h-px bg-korean-red block" />
          <span className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>Our Journey</span>
          <span className="font-korean text-xs text-charcoal-200" style={{ fontFamily: 'var(--font-noto-kr)' }}>여정</span>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[calc(4rem+1px)] top-0 bottom-0 w-px bg-charcoal-100 hidden lg:block"
            initial={{ scaleY: 0, originY: 0 }}
            animate={timelineVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                animate={timelineVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.14, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-10 border-b border-charcoal-100 last:border-0"
              >
                {/* Year column */}
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2">
                  <div className="relative flex items-center justify-center">
                    <span
                      className="font-display text-3xl text-charcoal-800 leading-none relative z-10"
                      style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                    >
                      {item.year}
                    </span>
                    {/* Timeline dot */}
                    <div className="hidden lg:block absolute -right-[calc(2rem+9px)] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ivory-50 border-2 border-korean-red z-10" />
                  </div>
                  <span className="font-korean text-[0.65rem] text-charcoal-300 tracking-wider" style={{ fontFamily: 'var(--font-noto-kr)' }}>
                    {item.korean}
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-8 lg:col-start-4">
                  <h3
                    className="font-display text-charcoal-800 mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '1.6rem', letterSpacing: '-0.01em' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-charcoal-500 leading-[1.85]"
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: '0.93rem' }}
                  >
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values grid ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-40 bg-ivory-100">
        <div className="px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="w-8 h-px bg-korean-red block" />
            <span className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>What We Stand For</span>
            <span className="font-korean text-xs text-charcoal-200" style={{ fontFamily: 'var(--font-noto-kr)' }}>가치</span>
          </motion.div>

          <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val.number}
                initial={{ opacity: 0, y: 35 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 bg-ivory-50 border border-charcoal-100 hover:border-charcoal-200 hover:shadow-card-luxury transition-all duration-500"
                style={{ borderRadius: '2px' }}
              >
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-korean-red"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[0.65rem] tracking-[0.25em] font-medium text-charcoal-300" style={{ fontFamily: 'var(--font-outfit)' }}>{val.number}</span>
                  <span className="font-korean text-xs text-charcoal-200" style={{ fontFamily: 'var(--font-noto-kr)' }}>{val.korean}</span>
                </div>
                <h3
                  className="font-display text-charcoal-800 mb-4 leading-snug group-hover:text-korean-red transition-colors duration-400"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '1.5rem', letterSpacing: '-0.01em' }}
                >
                  {val.title}
                </h3>
                <p className="text-charcoal-400 leading-relaxed text-sm" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
                  {val.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
        <div ref={ctaRef} className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 border-t border-charcoal-100 pt-16">
          <div>
            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                animate={ctaVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-light text-charcoal-800 leading-[0.95]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', letterSpacing: '-0.03em' }}
              >
                Come taste
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%', opacity: 0 }}
                animate={ctaVisible ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display italic font-light leading-[0.95]"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', letterSpacing: '-0.03em', color: '#C8393A' }}
              >
                our story.
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <Link
              href="/reservations"
              className="group flex items-center gap-3 px-8 py-4 bg-charcoal-800 text-ivory-100 hover:bg-korean-red transition-colors duration-400 no-underline"
              style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
            >
              <span className="uppercase font-medium tracking-widest">Reserve a Table</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/menu"
              className="group flex items-center gap-3 px-8 py-4 border border-charcoal-300 text-charcoal-600 hover:border-charcoal-800 hover:text-charcoal-800 transition-all duration-400 no-underline"
              style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
            >
              <span className="uppercase font-medium tracking-widest">View Menu</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  )
}