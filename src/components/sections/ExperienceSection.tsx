'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { ABOUT_IMAGES } from '@/lib/utils'

const features = [
  {
    number: '01',
    title: 'Authentic Flavours',
    koreanTitle: '정통 맛',
    description:
      'Every recipe traces back to its Seoul origins — untouched, uncompromised, and alive with the memory of home kitchens.',
    accent: false,
  },
  {
    number: '02',
    title: 'Premium Ingredients',
    koreanTitle: '프리미엄 재료',
    description:
      'We import Gochugaru, Doenjang, and select pantry staples directly from Korea. What we can\'t import, we make ourselves.',
    accent: false,
  },
  {
    number: '03',
    title: 'K-Culture Ambience',
    koreanTitle: 'K-문화',
    description:
      'Subtle K-pop curation, Korean editorial art, and interiors inspired by a Hongdae café — Seoul is always present.',
    accent: true,
  },
  {
    number: '04',
    title: 'Youthful Luxury',
    koreanTitle: '젊은 럭셔리',
    description:
      'Not stuffy fine dining — an elevated experience you actually want to stay in. Lively, warm, and effortlessly premium.',
    accent: false,
  },
  {
    number: '05',
    title: 'Curated Dining',
    koreanTitle: '큐레이션',
    description:
      'Small menus, thoughtful pairings, and seasonal specials. We\'d rather do fewer things extraordinarily well.',
    accent: false,
  },
  {
    number: '06',
    title: 'Pune\'s Own Seoul',
    koreanTitle: '푸네의 서울',
    description:
      'This is not a franchise. This is a one-of-a-kind space built for Pune, shaped by Seoul — and deeply, personally ours.',
    accent: false,
  },
]

const marqueeItems = [
  'Korean BBQ',
  '·',
  'Bingsu',
  '·',
  'Tteokbokki',
  '·',
  'Ramen',
  '·',
  'K-Culture',
  '·',
  'Bibimbap',
  '·',
  'Seoul Vibes',
  '·',
  'Kimchi',
  '·',
  'Corn Dog',
  '·',
  'Fried Chicken',
  '·',
]

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden py-5 border-y border-charcoal-100">
      <motion.div
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{
          duration: 28,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              item === '·'
                ? 'text-korean-red text-lg'
                : 'text-[0.72rem] tracking-[0.3em] uppercase text-charcoal-400 font-medium'
            }
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: labelRef, isInView: labelVisible } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const { ref: gridRef, isInView: gridVisible } = useInView<HTMLDivElement>({ threshold: 0.05 })
  const { ref: imageRef, isInView: imageVisible } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-ivory-50 overflow-hidden"
    >
      {/* ── Marquee strip ─────────────────────────────────────────────── */}
      <MarqueeTrack />

      {/* ── Main experience block ─────────────────────────────────────── */}
      <div className="py-32 lg:py-44">
        {/* Ambient orb */}
        <div
          className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(200,57,58,0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translateX(-30%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div ref={labelRef} className="mb-20 lg:mb-24">
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
                The Experience
              </span>
              <span
                className="font-korean text-xs text-charcoal-200"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                경험
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
              <div>
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
                    More than
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
                    just a meal.
                  </motion.h2>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={labelVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-charcoal-400 leading-[1.85] max-w-md"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 300,
                  fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
                }}
              >
                Gangnam Kitchen is designed as an immersive encounter with Korean culture — where the food, the space, and the energy come together into something you feel long after the last bite.
              </motion.p>
            </div>
          </div>

          {/* ── Feature grid + image ──────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">

            {/* Feature cards — left */}
            <div ref={gridRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, y: 35 }}
                  animate={gridVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.09,
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative p-6 border transition-all duration-500 cursor-default ${
                    feature.accent
                      ? 'bg-charcoal-800 border-charcoal-700'
                      : 'bg-ivory-50 border-charcoal-100 hover:border-charcoal-200 hover:shadow-card-luxury'
                  }`}
                  style={{ borderRadius: '2px' }}
                >
                  {/* Number */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[0.65rem] tracking-[0.25em] font-medium ${
                        feature.accent ? 'text-charcoal-500' : 'text-charcoal-300'
                      }`}
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      {feature.number}
                    </span>
                    <span
                      className={`font-korean text-[0.65rem] tracking-wider ${
                        feature.accent ? 'text-charcoal-500' : 'text-charcoal-200'
                      }`}
                      style={{ fontFamily: 'var(--font-noto-kr)' }}
                    >
                      {feature.koreanTitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-display leading-snug mb-3 ${
                      feature.accent ? 'text-ivory-100' : 'text-charcoal-800'
                    }`}
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontWeight: 400,
                      fontSize: '1.3rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`leading-relaxed text-[0.82rem] ${
                      feature.accent ? 'text-charcoal-400' : 'text-charcoal-400'
                    }`}
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                  >
                    {feature.description}
                  </p>

                  {/* Accent hover bar */}
                  {!feature.accent && (
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] bg-korean-red"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right — sticky image + floating elements */}
            <div
              ref={imageRef}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={imageVisible ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Main interior image */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: '560px', borderRadius: '2px' }}
                >
                  <motion.div style={{ y: imageY }} className="absolute inset-0 h-[120%] top-[-10%]">
                    <Image
                      src={ABOUT_IMAGES.interior.local || ABOUT_IMAGES.interior.fallback}
                      alt="Gangnam Kitchen ambience"
                      fill
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/20 via-transparent to-transparent" />
                  </motion.div>
                </div>

                {/* Floating ambient label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={imageVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-10 -left-8 px-6 py-5"
                  style={{
                    y: textY,
                    background: 'rgba(253,252,248,0.9)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.85)',
                    boxShadow: '0 16px 48px rgba(60,40,20,0.1)',
                    borderRadius: '2px',
                  }}
                >
                  <p
                    className="font-korean text-xs text-charcoal-300 mb-2 tracking-wider"
                    style={{ fontFamily: 'var(--font-noto-kr)' }}
                  >
                    분위기
                  </p>
                  <p
                    className="font-display text-xl text-charcoal-700 leading-snug"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                  >
                    Seoul café
                  </p>
                  <p
                    className="font-display italic text-korean-red text-xl leading-snug"
                    style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                  >
                    in Pune.
                  </p>
                </motion.div>

                {/* Top right tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={imageVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -top-5 -right-5 w-20 h-20 flex flex-col items-center justify-center bg-korean-red"
                  style={{ borderRadius: '50%' }}
                >
                  <span
                    className="font-korean text-ivory-100 text-xs leading-tight text-center"
                    style={{ fontFamily: 'var(--font-noto-kr)', fontWeight: 400 }}
                  >
                    코리아
                    <br />
                    무드
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Second marquee strip at bottom ──────────────────────────── */}
      <MarqueeTrack reverse />

    </section>
  )
}
