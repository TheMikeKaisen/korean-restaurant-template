'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { ABOUT_IMAGES } from '@/lib/utils'

const stats = [
  { value: '50+', label: 'Authentic Dishes', korean: '메뉴' },
  { value: '5', label: 'Years of Craft', korean: '연도' },
  { value: '100%', label: 'Korean Recipes', korean: '정통' },
  { value: '∞', label: 'Soul in Every Bite', korean: '마음' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const { ref: headingRef, isInView: headingVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const { ref: bodyRef, isInView: bodyVisible } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const { ref: statsRef, isInView: statsVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const { ref: imageWrapRef, isInView: imageVisible } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-ivory-50 overflow-hidden py-32 lg:py-44"
    >
      {/* ── Subtle background texture ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C8393A 0, #C8393A 1px, transparent 0, transparent 50%)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Floating ambient orb ──────────────────────────────────────── */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(237,229,216,0.55) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section label ─────────────────────────────────────────────── */}
        <div ref={headingRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={headingVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.span
              className="block h-px bg-korean-red"
              initial={{ width: 0 }}
              animate={headingVisible ? { width: 40 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <span
              className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Our Story
            </span>
            <span
              className="font-korean text-xs text-charcoal-200 ml-2"
              style={{ fontFamily: 'var(--font-noto-kr)' }}
            >
              이야기
            </span>
          </motion.div>

          {/* Split headline — large editorial */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%', opacity: 0 }}
              animate={headingVisible ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-charcoal-800 leading-[0.95]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(3rem, 7vw, 7.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Where Seoul
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%', opacity: 0 }}
              animate={headingVisible ? { y: '0%', opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display italic font-light text-charcoal-800 leading-[0.95] pl-[8vw] lg:pl-[12vw]"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 300,
                fontSize: 'clamp(3rem, 7vw, 7.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              meets{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #C8393A 0%, #E8504F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontStyle: 'normal',
                  fontWeight: 500,
                }}
              >
                Pune.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* ── Two-column content + image ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

          {/* ── Left: Image stack ─────────────────────────────────────── */}
          <div
            ref={imageWrapRef}
            className="lg:col-span-5 relative"
          >
            {/* Main image */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, scale: 0.96, x: -40 }}
              animate={imageVisible ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 overflow-hidden"
              style={{ borderRadius: '2px' }}
            >
              <motion.div style={{ y: imageY }} className="relative h-[500px] lg:h-[640px]">
                <Image
                  src={ABOUT_IMAGES.restaurant.local || ABOUT_IMAGES.restaurant.fallback}
                  alt="Gangnam Kitchen interior"
                  fill
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/30 via-transparent to-transparent" />
              </motion.div>
            </motion.div>

            {/* Floating glass card — bottom right of image */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={imageVisible ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-6 lg:-right-10 z-20 px-6 py-5 max-w-[200px]"
              style={{
                background: 'rgba(253, 252, 248, 0.92)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.9)',
                boxShadow: '0 16px 48px rgba(60,40,20,0.12)',
                borderRadius: '2px',
              }}
            >
              <p
                className="font-korean text-[0.6rem] tracking-[0.2em] text-charcoal-300 mb-2"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                강남 키친
              </p>
              <p
                className="font-display text-3xl text-charcoal-700 leading-none mb-1"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
              >
                Since
              </p>
              <p
                className="font-display italic text-4xl leading-none"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 500,
                  color: '#C8393A',
                }}
              >
                2019
              </p>
            </motion.div>

            {/* Secondary inset image */}
            <motion.div
              initial={{ opacity: 0, y: -20, x: -20 }}
              animate={imageVisible ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-6 -left-6 lg:-left-10 z-20 w-36 h-44 lg:w-44 lg:h-56 overflow-hidden"
              style={{
                boxShadow: '0 12px 40px rgba(60,40,20,0.14)',
                borderRadius: '2px',
              }}
            >
              <Image
                src={ABOUT_IMAGES.chef.local || ABOUT_IMAGES.chef.fallback}
                alt="Our chef"
                fill
                quality={80}
                sizes="200px"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* ── Right: Body copy ──────────────────────────────────────── */}
          <div ref={bodyRef} className="lg:col-span-6 lg:col-start-7 space-y-8">

            {/* Decorative divider */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={bodyVisible ? 'visible' : 'hidden'}
              className="block h-px bg-charcoal-200 w-full"
            />

            {/* Body paragraphs */}
            {[
              {
                text: `Gangnam Kitchen was born from a singular obsession — to bring the soulful, vibrant flavours of Seoul to the streets of Pune. Not a watered-down version. The real thing.`,
                delay: 0,
              },
              {
                text: `Every dish we serve is a love letter to Korean culinary tradition — slow-fermented kimchi, hand-pressed rice cakes, fire-kissed BBQ meats, and desserts cold enough to stop time. We source our ingredients with the same care a Korean grandmother would, because that's the only standard we know.`,
                delay: 0.12,
              },
              {
                text: `Tucked in Koregaon Park, our space is designed to feel like a pause from the world — a Seoul café reborn in Pune, where every corner invites you to slow down, share, and savour.`,
                delay: 0.24,
              },
            ].map((para, i) => (
              <motion.p
                key={i}
                custom={para.delay}
                variants={fadeUp}
                initial="hidden"
                animate={bodyVisible ? 'visible' : 'hidden'}
                className="text-charcoal-500 leading-[1.85]"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 300,
                  fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                }}
              >
                {para.text}
              </motion.p>
            ))}

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 20 }}
              animate={bodyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="border-l-2 border-korean-red pl-6 py-1"
            >
              <p
                className="font-display italic text-charcoal-600 leading-snug"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                }}
              >
                "Food is how we carry home with us,<br />
                wherever we go."
              </p>
              <p
                className="text-[0.68rem] tracking-[0.2em] uppercase text-charcoal-400 mt-3"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                — Chef Ji-Woo Han, Founder
              </p>
            </motion.blockquote>

            {/* CTA link */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={bodyVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="/about"
                className="group inline-flex items-center gap-3 text-charcoal-700 hover:text-korean-red transition-colors duration-300 no-underline"
                style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
              >
                <span className="uppercase font-medium tracking-widest">Read Our Full Story</span>
                <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-400 ease-out block" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="mt-28 pt-14 border-t border-charcoal-100 grid grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col gap-2"
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display font-light leading-none text-charcoal-800 group-hover:text-korean-red transition-colors duration-400"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-korean text-xs text-charcoal-200 hidden sm:block"
                  style={{ fontFamily: 'var(--font-noto-kr)' }}
                >
                  {stat.korean}
                </span>
              </div>
              <span
                className="text-[0.68rem] tracking-[0.2em] uppercase text-charcoal-400"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {stat.label}
              </span>
              <motion.span
                className="block h-px bg-charcoal-200"
                initial={{ scaleX: 0, originX: 0 }}
                animate={statsVisible ? { scaleX: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
