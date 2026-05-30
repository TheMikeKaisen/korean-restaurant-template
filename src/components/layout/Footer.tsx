'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { useRestaurant } from '@/context/RestaurantContext'

const footerLinks = {
  dining: [
    { label: 'Our Menu', href: '/menu' },
    { label: 'Reservations', href: '/reservations' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Private Dining', href: '/contact' },
  ],
  about: [
    { label: 'Our Story', href: '/about' },
    { label: 'The Kitchen', href: '/about#kitchen' },
    { label: 'K-Culture', href: '/about#culture' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  const { identity, location, contact, hours } = useRestaurant()
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 })

  return (
    <footer ref={ref} className="relative bg-charcoal-900 text-ivory-200 overflow-hidden">
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(200,57,58,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Korean pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(253,252,248,0.5) 30px, rgba(253,252,248,0.5) 31px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(253,252,248,0.5) 30px, rgba(253,252,248,0.5) 31px)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Top CTA Banner ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="py-20 border-b border-charcoal-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div>
            <p
              className="text-[0.68rem] tracking-[0.3em] uppercase text-charcoal-400 mb-3"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Table Reservations
            </p>
            <h2
              className="font-display text-4xl lg:text-6xl text-ivory-100 font-light leading-[1.1]"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
            >
              Join us for a{' '}
              <span className="italic text-korean-red">Seoul</span>
              <br />
              experience.
            </h2>
          </div>
          <Link
            href="/reservations"
            className="group flex items-center gap-3 px-8 py-4 border border-charcoal-600 text-ivory-200 hover:bg-korean-red hover:border-korean-red transition-all duration-400 no-underline shrink-0"
            style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.78rem', letterSpacing: '0.12em' }}
          >
            <span className="uppercase tracking-widest font-medium">Reserve Now</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </Link>
        </motion.div>

        {/* ── Main Footer Grid ────────────────────────────────────────── */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-display text-2xl font-500 text-ivory-100 leading-none"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}
                >
                  {identity.name.split(' ')[0]}
                </span>
                <span
                  className="font-display italic text-2xl text-korean-red leading-none"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
                >
                  {identity.name.split(' ').slice(1).join(' ')}
                </span>
              </div>
              <span
                className="font-korean text-[9px] tracking-[0.2em] text-charcoal-400"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                {identity.koreanName}
              </span>
            </div>
            <p
              className="text-sm text-charcoal-400 leading-relaxed mb-6 max-w-[220px]"
              style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
            >
              {identity.tagline}
            </p>

            {/* Hangul decorative */}
            <div
              className="font-korean text-7xl font-light leading-none select-none"
              style={{
                fontFamily: 'var(--font-noto-kr)',
                fontWeight: 300,
                color: 'rgba(253, 252, 248, 0.04)',
              }}
            >
              강남
            </div>
          </motion.div>

          {/* Dining links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-500 mb-6 font-medium"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Dining
            </p>
            <ul className="space-y-3">
              {footerLinks.dining.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-400 hover:text-ivory-200 transition-colors duration-300 no-underline"
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-500 mb-6 font-medium"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Explore
            </p>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-400 hover:text-ivory-200 transition-colors duration-300 no-underline"
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-500 mb-6 font-medium"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Find Us
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-korean-red mt-0.5 shrink-0" />
                <div>
                  <p
                    className="text-sm text-charcoal-400 leading-relaxed"
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                  >
                    {location.address}<br />
                    {location.city}, {location.state} {location.pincode}
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-korean-red shrink-0" />
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="text-sm text-charcoal-400 hover:text-ivory-200 transition-colors no-underline"
                  style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-korean-red shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-charcoal-400 hover:text-ivory-200 transition-colors no-underline"
                  style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                >
                  {contact.email}
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6 pt-6 border-t border-charcoal-700">
              <p
                className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 mb-3"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Hours
              </p>
              <div className="space-y-1">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between items-center gap-4">
                    <span
                      className="text-[0.72rem] text-charcoal-500"
                      style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                    >
                      {h.days}
                    </span>
                    <span
                      className="text-[0.72rem] text-charcoal-400"
                      style={{ fontFamily: 'var(--font-outfit)', fontWeight: 400 }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="py-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[0.65rem] text-charcoal-600 tracking-wide"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            © {new Date().getFullYear()} {identity.name}. All rights reserved. {location.neighborhood}, {location.city}.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-600 hover:text-ivory-200 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>

            <span
              className="font-korean text-[0.6rem] text-charcoal-700 tracking-widest"
              style={{ fontFamily: 'var(--font-noto-kr)' }}
            >
              맛있게 드세요
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
