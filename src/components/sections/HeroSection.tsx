'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronRight, ArrowDown } from 'lucide-react'
import { useRestaurant } from '@/context/RestaurantContext'
import { SplitText } from '@/components/animations/SplitText'

// Korean decorative characters used as visual accents
const hangulAccents = ['한', '국', '식', '당', '맛', '멋']

export function HeroSection() {
  const { identity, hero, images } = useRestaurant()
  const HERO_IMAGE = images.hero || images.heroFallback
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [currentAccent, setCurrentAccent] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.4])

  useEffect(() => {
    // Trigger entrance after mount
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Rotating Hangul accent
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAccent((prev) => (prev + 1) % hangulAccents.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // GSAP for fine-tuned entrance animation
  useEffect(() => {
    const initGSAP = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        if (!containerRef.current) return

        // Subtle parallax on decorative elements via GSAP
        gsap.to('.gsap-float-1', {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        gsap.to('.gsap-float-2', {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        })
      } catch (e) {
        // GSAP not critical
      }
    }
    initGSAP()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: '110%' },
    visible: {
      opacity: 1,
      y: '0%',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-ivory-50"
    >
      {/* ── Background Image with Parallax ───────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Gangnam Kitchen — Premium Korean Restaurant in Pune"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
          onLoad={() => setLoaded(true)}
        />
        {/* Strong left overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/40 to-charcoal-900/10" />
        {/* Bottom fade to ivory */}
        <div className="absolute inset-0 bg-gradient-to-t from-ivory-50/70 via-transparent to-transparent" />
        <motion.div
          className="absolute inset-0 bg-ivory-50/20"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* ── Floating Ambient Orbs ─────────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="gsap-float-1 absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '-10%',
            left: '-5%',
            background:
              'radial-gradient(circle, rgba(200, 57, 58, 0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="gsap-float-2 absolute w-[500px] h-[500px] rounded-full"
          style={{
            bottom: '10%',
            right: '5%',
            background:
              'radial-gradient(circle, rgba(236, 200, 74, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* ── Korean Geometric Pattern ──────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, #C8393A 40px, #C8393A 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, #C8393A 40px, #C8393A 41px)
          `,
        }}
      />

      {/* ── Floating Hangul Accent (decorative) ──────────────────────── */}
      <div className="absolute top-1/4 right-[8%] z-[2] pointer-events-none hidden xl:block">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentAccent}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block font-korean text-[200px] font-light leading-none select-none"
            style={{
              fontFamily: 'var(--font-noto-kr)',
              fontWeight: 300,
              color: 'rgba(200, 57, 58, 0.06)',
              letterSpacing: '-0.05em',
            }}
          >
            {hangulAccents[currentAccent]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Small Floating Cards ──────────────────────────────────────── */}
      <motion.div
        className="absolute top-[22%] right-[5%] xl:right-[18%] z-[5] hidden md:block"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="px-4 py-3 rounded-2xl border border-white/80 text-center"
          style={{
            background: 'rgba(253, 252, 248, 0.75)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(60, 40, 20, 0.1)',
          }}
        >
          <p
            className="text-[0.6rem] tracking-[0.2em] uppercase text-charcoal-400 mb-1"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Est.
          </p>
          <p
            className="font-display text-2xl text-charcoal-700 leading-none"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}
          >
            2019
          </p>
          <p
            className="font-korean text-[0.6rem] text-charcoal-300 mt-1"
            style={{ fontFamily: 'var(--font-noto-kr)' }}
          >
            강남 키친
          </p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[30%] right-[3%] xl:right-[12%] z-[5] hidden lg:block"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <div
          className="px-5 py-3 rounded-2xl border border-white/70 flex items-center gap-3"
          style={{
            background: 'rgba(253, 252, 248, 0.8)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 8px 32px rgba(60, 40, 20, 0.08)',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-korean-red/10 flex items-center justify-center">
            <span className="text-korean-red text-xs font-semibold" style={{ fontFamily: 'var(--font-outfit)' }}>★</span>
          </div>
          <div>
            <p
              className="text-[0.65rem] font-medium text-charcoal-700"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              4.9 / 5.0
            </p>
            <p
              className="text-[0.58rem] text-charcoal-400 tracking-wide"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {identity.reviewCount} Reviews
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Main Content ──────────────────────────────────────────────── */}
      <motion.div
        className="relative z-[10] h-screen flex flex-col justify-center pt-20 px-6 lg:px-16 xl:px-24 max-w-[1400px]"
        style={{ y: contentY }}
      >
        {/* Pre-headline tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-korean-red block" />
          <span
            className="text-[0.68rem] tracking-[0.3em] uppercase text-korean-red font-medium"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {hero.locationTag}
          </span>
        </motion.div>

        {/* Hero Headline */}
        <div className="mb-6">
          {/* Line 1 */}
          <SplitText
            text={hero.line1}
            as="h1"
            type="chars"
            delay={0.4}
            stagger={0.035}
            immediate
            className="block font-display font-light leading-[0.95] text-ivory-100"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              letterSpacing: '-0.03em',
            }}
          />
          {/* Line 2 */}
          <SplitText
            text={hero.line2}
            as="h1"
            type="chars"
            delay={0.55}
            stagger={0.03}
            immediate
            className="block font-display italic font-light leading-[0.95] text-ivory-100"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              letterSpacing: '-0.03em',
            }}
          />
          {/* Line 3 */}
          <div className="flex items-baseline gap-5 flex-wrap mt-1">
            <SplitText
              text={hero.line3}
              as="span"
              type="chars"
              delay={0.7}
              stagger={0.035}
              immediate
              className="block font-display font-light leading-[0.95] text-ivory-100"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(2.8rem, 7.5vw, 7.5rem)',
                letterSpacing: '-0.03em',
              }}
            />
            <SplitText
              text={hero.accentWord}
              as="span"
              type="chars"
              delay={1}
              stagger={0.04}
              immediate
              className="block font-display italic font-500 leading-[0.95]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 500,
                fontSize: 'clamp(2.8rem, 7.5vw, 7.5rem)',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #C8393A 0%, #E8504F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            />
          </div>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-ivory-100/75 leading-relaxed mb-12"
          style={{
            fontFamily: 'var(--font-outfit)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            letterSpacing: '0.01em',
          }}
        >
          {hero.subtext}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 flex-wrap"
        >
          {/* Primary CTA */}
          <Link href="/reservations" className="group relative overflow-hidden">
            <div
              className="flex items-center gap-3 px-8 py-4 bg-charcoal-800 text-ivory-100 no-underline"
              style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
            >
              <div
                className="absolute inset-0 bg-korean-red transform origin-left transition-transform duration-500 ease-out"
                style={{
                  transform: 'scaleX(0)',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = 'scaleX(1)'
                }}
              />
              <span className="relative z-10 uppercase tracking-widest font-medium text-ivory-100">
                Reserve a Table
              </span>
              <ChevronRight
                size={14}
                className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 text-ivory-100"
              />
            </div>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/menu"
            className="group flex items-center gap-3 px-8 py-4 border border-ivory-100/40 text-ivory-100/80 hover:border-ivory-100 hover:text-ivory-100 transition-all duration-400 no-underline"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
            }}
          >
            <span className="uppercase tracking-widest font-medium">
              Explore Menu
            </span>
            <ChevronRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex items-center gap-10 mt-16 pt-8 border-t border-ivory-100/20"
        >
          {[
            { value: identity.menuCount, label: 'Menu Items', korean: '메뉴' },
            { value: identity.guestCount, label: 'Happy Guests', korean: '고객' },
            { value: `${identity.rating}★`, label: 'Rating', korean: '평점' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span
                className="font-display font-500 text-ivory-100 leading-none"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 500,
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-[0.65rem] tracking-[0.2em] uppercase text-ivory-100/60"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-[0.6rem] tracking-[0.3em] uppercase text-ivory-100/50"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-ivory-100/50" />
        </motion.div>
      </motion.div>

      {/* ── Side label (vertical text) ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col items-center gap-4"
      >
        <div
          className="w-px h-20 bg-gradient-to-b from-transparent via-charcoal-300 to-transparent"
        />
        <span
          className="text-[0.58rem] tracking-[0.35em] uppercase text-ivory-100/40 [writing-mode:vertical-rl]"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          Premium Korean Dining
        </span>
        <div
          className="w-px h-20 bg-gradient-to-b from-transparent via-charcoal-300 to-transparent"
        />
      </motion.div>
    </section>
  )
}
