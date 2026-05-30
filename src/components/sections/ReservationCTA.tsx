'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { ChevronRight, MapPin, Clock, Phone } from 'lucide-react'
import { useRestaurant } from '@/context/RestaurantContext'

export function ReservationCTA() {
  const { images, contact, location, hours } = useRestaurant()
  const interiorSrc = images.reservationCta || images.reservationCtaFallback

  const quickInfo = [
    {
      icon: MapPin,
      label: 'Location',
      value: location.address,
      sub: `${location.city}, ${location.state} ${location.pincode}`,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: `${hours[0]?.days || 'Mon–Fri'} ${hours[0]?.time || '12pm–10pm'}`,
      sub: `${hours[1]?.days || 'Sat–Sun'} ${hours[1]?.time || '11am–11pm'}`,
    },
    {
      icon: Phone,
      label: 'Reservations',
      value: contact.phone,
      sub: contact.email,
    },
  ]

  const sectionRef = useRef<HTMLElement>(null)
  const { ref: contentRef, isInView: contentVisible } = useInView<HTMLDivElement>({ threshold: 0.15 })
  const { ref: infoRef, isInView: infoVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.65, 0.75])

  return (
    <section
      ref={sectionRef}
      id="reservations-cta"
      className="relative overflow-hidden"
      style={{ minHeight: '90vh' }}
    >
      {/* ── Full-bleed Background Image ───────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY, scale: 1.1 }}>
        <Image
          src={interiorSrc}
          alt="Gangnam Kitchen dining room"
          fill
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Multi-layer overlay — warm charcoal tint */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(17,17,16,0.82) 0%, rgba(28,27,25,0.65) 50%, rgba(17,17,16,0.80) 100%)',
          opacity: overlayOpacity,
        }}
      />

      {/* Ivory gradient bleed at top */}
      <div
        className="absolute top-0 inset-x-0 h-32 z-[2]"
        style={{
          background: 'linear-gradient(to bottom, #FAF8F2 0%, transparent 100%)',
        }}
      />

      {/* Ivory gradient bleed at bottom */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 z-[2]"
        style={{
          background: 'linear-gradient(to top, #FDFCF8 0%, transparent 100%)',
        }}
      />

      {/* Korean grid pattern on overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(253,252,248,0.5) 40px, rgba(253,252,248,0.5) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(253,252,248,0.5) 40px, rgba(253,252,248,0.5) 41px)
          `,
        }}
      />

      {/* ── Ambient red orb ───────────────────────────────────────── */}
      <motion.div
        className="absolute z-[2] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(200,57,58,0.12) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Main Content ──────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 lg:px-8 py-32 lg:py-48 min-h-[90vh]"
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-10"
        >
          <motion.span
            className="block h-px bg-korean-red"
            initial={{ width: 0 }}
            animate={contentVisible ? { width: 40 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <span
            className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Reserve Your Table
          </span>
          <motion.span
            className="block h-px bg-korean-red"
            initial={{ width: 0 }}
            animate={contentVisible ? { width: 40 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.h2
            initial={{ y: '105%', opacity: 0 }}
            animate={contentVisible ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-light leading-[0.92] text-ivory-100"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(3.2rem, 8vw, 9rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Your Seoul
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: '105%', opacity: 0 }}
            animate={contentVisible ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="font-display italic font-light leading-[0.92]"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 300,
              fontSize: 'clamp(3.2rem, 8vw, 9rem)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #C8393A 0%, #E8504F 60%, #C8393A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            awaits.
          </motion.h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg text-ivory-200/70 leading-relaxed mb-12"
          style={{
            fontFamily: 'var(--font-outfit)',
            fontWeight: 300,
            fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)',
          }}
        >
          Reserve your table for an evening of authentic Korean cuisine, warm ambience, and an experience that stays with you long after the last bite.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/reservations"
            className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 bg-korean-red text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800 transition-colors duration-500 no-underline"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
            }}
          >
            <span className="uppercase font-medium tracking-widest relative z-10">
              Book a Table
            </span>
            <ChevronRight
              size={14}
              className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>

          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="group flex items-center gap-3 px-10 py-4 border border-ivory-100/30 text-ivory-200/80 hover:border-ivory-100/60 hover:text-ivory-100 transition-all duration-400 no-underline"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
            }}
          >
            <Phone size={13} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="uppercase font-medium tracking-widest">{contact.phone}</span>
          </a>
        </motion.div>

        {/* Hangul accent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16"
        >
          <span
            className="font-korean text-sm tracking-[0.3em] text-ivory-100/20"
            style={{ fontFamily: 'var(--font-noto-kr)' }}
          >
            예약하세요 · 오늘 저녁
          </span>
        </motion.div>

      </div>

      {/* ── Info Bar ─────────────────────────────────────────────── */}
      <div
        ref={infoRef}
        className="relative z-10 border-t"
        style={{ borderColor: 'rgba(253,252,248,0.1)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x"
          style={{ '--tw-divide-opacity': 0.12 } as React.CSSProperties}
        >
          {quickInfo.map((info, i) => {
            const Icon = info.icon
            return (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={infoVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-start gap-4 sm:px-10 first:pl-0 last:pr-0"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(200,57,58,0.15)' }}
                >
                  <Icon size={14} className="text-korean-red" />
                </div>
                <div>
                  <p
                    className="text-[0.6rem] tracking-[0.25em] uppercase text-ivory-100/40 mb-1"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {info.label}
                  </p>
                  <p
                    className="text-sm text-ivory-100/85 font-medium leading-snug"
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 400 }}
                  >
                    {info.value}
                  </p>
                  <p
                    className="text-xs text-ivory-100/45 leading-snug mt-0.5"
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                  >
                    {info.sub}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}