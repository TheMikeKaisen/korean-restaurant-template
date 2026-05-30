'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRestaurant } from '@/context/RestaurantContext'

const navLinks = [
  { label: 'Home', href: '/', korean: '홈' },
  { label: 'Menu', href: '/menu', korean: '메뉴' },
  { label: 'About', href: '/about', korean: '소개' },
  { label: 'Gallery', href: '/gallery', korean: '갤러리' },
  { label: 'Contact', href: '/contact', korean: '연락처' },
]

export function Navbar() {
  const { identity, location, contact } = useRestaurant()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pathname = usePathname()
  const hasDarkHero = pathname === '/' || pathname === '/about'
  const lastScrollY = useRef(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setScrolled(currentScrollY > 50)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        animate={{
          y: hidden && !mobileOpen ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3'
            : 'py-5'
        )}
      >
        {/* Background glass effect */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-500',
            scrolled
              ? 'bg-ivory-50/85 backdrop-blur-xl border-b border-charcoal-100/50 shadow-sm'
              : 'bg-transparent'
          )}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start gap-0 no-underline">
            <div className="flex items-baseline gap-2">
              <span
                className={`font-display text-2xl font-500 tracking-tight leading-none ${
                  scrolled || !hasDarkHero ? 'text-charcoal-800' : 'text-ivory-100'
                }`}
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}
              >
                {identity.name.split(' ')[0]}
              </span>
              <span
                className="text-korean-red font-display text-2xl italic leading-none"
                style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}
              >
                {identity.name.split(' ').slice(1).join(' ')}
              </span>
            </div>
            <span
              className={`font-korean text-[9px] tracking-[0.25em] uppercase ${
                scrolled || !hasDarkHero ? 'text-charcoal-300' : 'text-ivory-100/50'
              }`}
              style={{ fontFamily: 'var(--font-noto-kr)', letterSpacing: '0.2em' }}
            >
              {identity.koreanName} · {location.city}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className={cn(
                  'relative px-4 py-2 group overflow-hidden font-body text-[0.78rem] font-400 tracking-[0.1em] uppercase transition-colors duration-300 no-underline',
                  pathname === link.href
                    ? 'text-korean-red'
                    : scrolled || !hasDarkHero
                      ? 'text-charcoal-500 hover:text-charcoal-800'
                      : 'text-ivory-100/70 hover:text-ivory-100'
                )}
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                <span className="relative z-10">{link.label}</span>

                {/* Active indicator */}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-korean-red"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover underline */}
                <span
                  className={cn(
                    'absolute bottom-1 left-4 right-4 h-px bg-charcoal-300',
                    'transform origin-left transition-transform duration-300 ease-out',
                    hoveredLink === link.href && pathname !== link.href
                      ? 'scale-x-100'
                      : 'scale-x-0'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/reservations"
              className={cn(
                'hidden md:inline-flex items-center gap-2',
                'px-5 py-2.5 bg-charcoal-800 text-ivory-100',
                'font-body text-[0.72rem] font-500 tracking-[0.12em] uppercase',
                'transition-all duration-400 hover:bg-korean-red',
                'group overflow-hidden relative',
              )}
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              <span className="relative z-10">Reserve</span>
              <ChevronRight
                size={12}
                className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-charcoal-700 hover:text-charcoal-900 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-ivory-50 flex flex-col"
          >
            {/* Top spacing for nav */}
            <div className="h-20" />

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'group flex items-center justify-between py-5',
                      'border-b border-charcoal-100 no-underline',
                    )}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-display text-5xl font-light text-charcoal-800 group-hover:text-korean-red transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
                      >
                        {link.label}
                      </span>
                      <span
                        className="font-korean text-sm text-charcoal-300 hidden sm:block"
                        style={{ fontFamily: 'var(--font-noto-kr)' }}
                      >
                        {link.korean}
                      </span>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-charcoal-300 group-hover:text-korean-red group-hover:translate-x-1 transition-all duration-300"
                    />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <Link
                  href="/reservations"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-800 text-ivory-100 font-body text-sm tracking-widest uppercase hover:bg-korean-red transition-colors duration-400 no-underline"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  Reserve a Table
                  <ChevronRight size={14} />
                </Link>
              </motion.div>
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="px-8 pb-10 flex items-center justify-between"
            >
              <div>
                <p
                  className="font-body text-xs text-charcoal-400 tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {location.neighborhood}, {location.city}
                </p>
                <p
                  className="font-body text-xs text-charcoal-300 mt-1"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {contact.phone}
                </p>
              </div>
              <span
                className="font-korean text-2xl text-charcoal-200"
                style={{ fontFamily: 'var(--font-noto-kr)' }}
              >
                강남
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
