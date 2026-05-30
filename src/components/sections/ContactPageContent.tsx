'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import {
  MapPin, Phone, Mail, Clock, Instagram,
  ChevronRight, Check, ArrowRight
} from 'lucide-react'
import { useRestaurant } from '@/context/RestaurantContext'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function ContactPageContent() {
  const { location, contact, hours, identity } = useRestaurant()

  const contactDetails = [
    {
      icon: MapPin,
      label: 'Find Us',
      korean: '위치',
      lines: [location.address, `${location.city}, ${location.state} ${location.pincode}`, location.country],
      link: location.googleMapsUrl,
      linkLabel: 'Open in Maps',
    },
    {
      icon: Phone,
      label: 'Call Us',
      korean: '전화',
      lines: [contact.phone],
      link: `tel:${contact.phone.replace(/\s+/g, '')}`,
      linkLabel: 'Call Now',
    },
    {
      icon: Mail,
      label: 'Email Us',
      korean: '이메일',
      lines: [contact.email],
      link: `mailto:${contact.email}`,
      linkLabel: 'Send Email',
    },
    {
      icon: Clock,
      label: 'Hours',
      korean: '시간',
      lines: hours.map(h => `${h.days}: ${h.time}`),
      link: null,
      linkLabel: null,
    },
  ]

  const [form, setForm] = useState<ContactForm>({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { ref: headerRef, isInView: headerVisible } = useInView<HTMLDivElement>({ threshold: 0.2 })
  const { ref: contentRef, isInView: contentVisible } = useInView<HTMLDivElement>({ threshold: 0.05 })

  const set = (key: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  const isValid = form.name && form.email && form.subject && form.message

  return (
    <main className="bg-ivory-50 overflow-x-hidden min-h-screen">

      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 overflow-hidden"
      >
        {/* Ambient orb */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(200,57,58,0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(20%, -20%)',
          }}
        />

        <div className="relative z-10 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
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
              Get in Touch
            </span>
            <span
              className="font-korean text-xs text-charcoal-200"
              style={{ fontFamily: 'var(--font-noto-kr)' }}
            >
              연락처
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
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
              Let's talk
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
              over Korean food.
            </motion.h1>
          </div>
        </div>
      </div>

      {/* ── Contact cards + Form ──────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
      >

        {/* ── Left: Contact details ────────────────────────────────── */}
        <div className="lg:col-span-4 space-y-4">
          {contactDetails.map((detail, i) => {
            const Icon = detail.icon
            return (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: -30 }}
                animate={contentVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 border border-charcoal-100 bg-ivory-50 hover:border-charcoal-200 hover:shadow-card-luxury transition-all duration-500 relative overflow-hidden"
                style={{ borderRadius: '2px' }}
              >
                {/* Hover accent bar */}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-korean-red"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(200,57,58,0.08)' }}
                    >
                      <Icon size={14} className="text-korean-red" />
                    </div>
                    <div>
                      <p
                        className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        {detail.label}
                      </p>
                    </div>
                  </div>
                  <span
                    className="font-korean text-[0.6rem] text-charcoal-200"
                    style={{ fontFamily: 'var(--font-noto-kr)' }}
                  >
                    {detail.korean}
                  </span>
                </div>

                <div className="space-y-0.5 mb-4">
                  {detail.lines.map((line, li) => (
                    <p
                      key={li}
                      className="text-sm text-charcoal-600 leading-relaxed"
                      style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {detail.link && (
                  <a
                    href={detail.link}
                    target={detail.link.startsWith('http') ? '_blank' : undefined}
                    rel={detail.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.15em] uppercase text-charcoal-400 hover:text-korean-red transition-colors duration-300 no-underline"
                    style={{ fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
                  >
                    {detail.linkLabel}
                    <ChevronRight size={11} />
                  </a>
                )}
              </motion.div>
            )
          })}

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={contentVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 border border-charcoal-100 bg-ivory-50"
            style={{ borderRadius: '2px' }}
          >
            <p
              className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium mb-4"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              Follow Us
            </p>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-charcoal-600 hover:text-korean-red transition-colors duration-300 no-underline"
            >
              <Instagram size={16} />
              <span
                className="text-sm"
                style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
              >
                {contact.instagram}
              </span>
            </a>
          </motion.div>
        </div>

        {/* ── Right: Message form ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 lg:col-start-6"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-5"
              >
                <div>
                  <p
                    className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-400 mb-5 border-b border-charcoal-100 pb-3"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    Send a Message
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        Name <span className="text-korean-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your full name"
                        required
                        className="px-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 placeholder-charcoal-300 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        Email <span className="text-korean-red">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@example.com"
                        required
                        className="px-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 placeholder-charcoal-300 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder={contact.phone}
                        className="px-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 placeholder-charcoal-300 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
                      />
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        Subject <span className="text-korean-red">*</span>
                      </label>
                      <select
                        value={form.subject}
                        onChange={set('subject')}
                        required
                        className="px-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px', color: form.subject ? '#2A2927' : '#ABA9A5' }}
                      >
                        <option value="" disabled>Select a topic</option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Reservation Help">Reservation Help</option>
                        <option value="Private Dining">Private Dining</option>
                        <option value="Corporate Events">Corporate Events</option>
                        <option value="Press & Media">Press & Media</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      Message <span className="text-korean-red">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us how we can help…"
                      rows={6}
                      required
                      className="px-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 placeholder-charcoal-300 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300 resize-none"
                      style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isValid || loading}
                  className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 overflow-hidden transition-all duration-400 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: isValid && !loading ? '#1C1B19' : '#ABA9A5',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.15em',
                    borderRadius: '1px',
                  }}
                >
                  {!loading && isValid && (
                    <motion.span
                      className="absolute inset-0 bg-korean-red"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span className="relative z-10 uppercase font-medium tracking-widest text-ivory-100">
                    {loading ? 'Sending…' : 'Send Message'}
                  </span>
                  {!loading && (
                    <ArrowRight
                      size={14}
                      className="relative z-10 text-ivory-100 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  )}
                  {loading && (
                    <motion.span
                      className="relative z-10 w-4 h-4 border-2 border-ivory-100/30 border-t-ivory-100 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </button>

                <p
                  className="text-center text-[0.68rem] text-charcoal-400"
                  style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                >
                  We typically respond within 4–6 hours during business hours.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="contact-confirmation"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-20 px-8 border border-charcoal-100 bg-ivory-50"
                style={{ borderRadius: '2px' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-korean-red/10 flex items-center justify-center mb-6"
                >
                  <Check size={24} className="text-korean-red" />
                </motion.div>

                <p
                  className="font-korean text-sm text-charcoal-300 mb-3 tracking-wider"
                  style={{ fontFamily: 'var(--font-noto-kr)' }}
                >
                  메시지 전송됨
                </p>

                <h2
                  className="font-display text-charcoal-800 mb-3 leading-snug"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 400,
                    fontSize: '2.2rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Message{' '}
                  <span className="italic text-korean-red">received.</span>
                </h2>

                <p
                  className="text-charcoal-500 leading-relaxed max-w-sm mb-2"
                  style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: '0.9rem' }}
                >
                  Thank you, <strong style={{ fontWeight: 500, color: '#3E3D3A' }}>{form.name}</strong>. We've received your message and will be in touch soon.
                </p>

                <p
                  className="text-charcoal-400 text-sm mb-10"
                  style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}
                >
                  A copy has been sent to{' '}
                  <strong style={{ fontWeight: 500, color: '#5A5855' }}>{form.email}</strong>
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
                  }}
                  className="text-[0.72rem] tracking-[0.15em] uppercase text-charcoal-400 hover:text-korean-red transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-outfit)', fontWeight: 500 }}
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Map embed strip ───────────────────────────────────────────── */}
      <div className="w-full h-72 lg:h-96 relative overflow-hidden border-t border-charcoal-100">
        <iframe
          src={location.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${identity.name} location map`}
        />
        {/* Overlay label */}
        <div className="absolute top-6 left-6 z-10 px-5 py-4" style={{ background: 'rgba(253,252,248,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.85)', borderRadius: '2px' }}>
          <p className="font-display text-charcoal-800 leading-tight" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '1.1rem' }}>
            {identity.name}
          </p>
          <p className="text-[0.65rem] tracking-wide text-charcoal-400 mt-0.5" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
            {location.neighborhood} · {location.city}
          </p>
        </div>
      </div>

    </main>
  )
}