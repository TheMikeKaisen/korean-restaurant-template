'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Calendar, Clock, Users, ChevronDown, Check, Phone, Mail, ArrowRight } from 'lucide-react'
import { useRestaurant } from '@/context/RestaurantContext'

const TIMES = [
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
]

const OCCASIONS = [
  'None', 'Birthday', 'Anniversary', 'Date Night',
  'Business Lunch', 'Family Gathering', 'Other',
]

const GUEST_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8]

interface FormState {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  requests: string
}

function CustomSelect({
  value, onChange, options, placeholder, icon: Icon,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
  icon: React.ElementType
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-4 border border-charcoal-200 bg-ivory-50 text-left hover:border-charcoal-400 transition-colors duration-300 focus:outline-none focus:border-charcoal-600"
        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
      >
        <Icon size={14} className="text-charcoal-400 shrink-0" />
        <span className={value ? 'text-charcoal-700' : 'text-charcoal-400'}>{value || placeholder}</span>
        <ChevronDown
          size={14}
          className={`ml-auto text-charcoal-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95, originY: 0 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 z-20 bg-ivory-50 border border-charcoal-200 border-t-0 shadow-float max-h-52 overflow-y-auto"
            style={{ borderRadius: '0 0 1px 1px' }}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false) }}
                className="w-full text-left px-4 py-3 text-charcoal-600 hover:bg-ivory-200 hover:text-charcoal-900 transition-colors duration-200 flex items-center justify-between"
                style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.83rem' }}
              >
                {opt}
                {value === opt && <Check size={12} className="text-korean-red" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function InputField({
  label, value, onChange, type = 'text', placeholder, required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium"
        style={{ fontFamily: 'var(--font-outfit)' }}
      >
        {label}{required && <span className="text-korean-red ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="px-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 placeholder-charcoal-300 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300"
        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
      />
    </div>
  )
}

export function ReservationsPageContent() {
  const { location, contact, hours, images } = useRestaurant()
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '',
    date: '', time: '', guests: '',
    occasion: '', requests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { ref: formRef, isInView: formVisible } = useInView<HTMLDivElement>({ threshold: 0.05 })

  const set = (key: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  const isValid = form.name && form.email && form.phone && form.date && form.time && form.guests

  return (
    <main className="bg-ivory-50 overflow-x-hidden min-h-screen">

      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div className="pt-36 pb-12 lg:pt-44 lg:pb-16 px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="w-8 h-px bg-korean-red block" />
          <span className="text-[0.65rem] tracking-[0.35em] uppercase text-korean-red font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>Reserve a Table</span>
          <span className="font-korean text-xs text-charcoal-200" style={{ fontFamily: 'var(--font-noto-kr)' }}>예약</span>
        </motion.div>

        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-light text-charcoal-800 leading-[0.92]"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(3rem, 8vw, 8.5rem)', letterSpacing: '-0.03em' }}
          >
            Your evening,
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="font-display italic font-light leading-[0.92]"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(3rem, 8vw, 8.5rem)', letterSpacing: '-0.03em', color: '#C8393A' }}
          >
            reserved.
          </motion.h1>
        </div>
      </div>

      {/* ── Split layout: Form + Image ────────────────────────────────── */}
      <div ref={formRef} className="px-6 lg:px-16 xl:px-24 max-w-[1400px] mx-auto pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">

        {/* ── Form ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={formVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-5"
              >
                {/* Personal details */}
                <div>
                  <p
                    className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-400 mb-4 border-b border-charcoal-100 pb-3"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    Your Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Full Name" value={form.name} onChange={set('name')} placeholder="Ji-Woo Kim" required />
                    <InputField label="Phone" value={form.phone} onChange={set('phone')} type="tel" placeholder={contact.phone} required />
                  </div>
                  <div className="mt-4">
                    <InputField label="Email Address" value={form.email} onChange={set('email')} type="email" placeholder="you@example.com" required />
                  </div>
                </div>

                {/* Reservation details */}
                <div>
                  <p
                    className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-400 mb-4 border-b border-charcoal-100 pb-3"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    Reservation Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Date<span className="text-korean-red ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" />
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) => set('date')(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          className="w-full pl-10 pr-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300"
                          style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Time<span className="text-korean-red ml-0.5">*</span>
                      </label>
                      <CustomSelect
                        value={form.time}
                        onChange={set('time')}
                        options={TIMES}
                        placeholder="Select time"
                        icon={Clock}
                      />
                    </div>

                    {/* Guests */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Guests<span className="text-korean-red ml-0.5">*</span>
                      </label>
                      <CustomSelect
                        value={form.guests}
                        onChange={set('guests')}
                        options={GUEST_COUNTS.map(String)}
                        placeholder="How many?"
                        icon={Users}
                      />
                    </div>
                  </div>
                </div>

                {/* Optional */}
                <div>
                  <p
                    className="text-[0.65rem] tracking-[0.25em] uppercase text-charcoal-400 mb-4 border-b border-charcoal-100 pb-3"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    Optional
                  </p>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>Occasion</label>
                      <CustomSelect
                        value={form.occasion}
                        onChange={set('occasion')}
                        options={OCCASIONS}
                        placeholder="Any special occasion?"
                        icon={ChevronDown}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-500 font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>Special Requests</label>
                      <textarea
                        value={form.requests}
                        onChange={(e) => set('requests')(e.target.value)}
                        placeholder="Dietary requirements, seating preferences, or anything else we should know…"
                        rows={4}
                        className="px-4 py-4 border border-charcoal-200 bg-ivory-50 text-charcoal-700 placeholder-charcoal-300 hover:border-charcoal-400 focus:border-charcoal-700 focus:outline-none transition-colors duration-300 resize-none"
                        style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', borderRadius: '1px' }}
                      />
                    </div>
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
                    {loading ? 'Confirming…' : 'Confirm Reservation'}
                  </span>
                  {!loading && (
                    <ArrowRight size={14} className="relative z-10 text-ivory-100 group-hover:translate-x-1 transition-transform duration-300" />
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
                  We'll confirm your booking via email and phone within 2 hours.
                </p>
              </motion.form>
            ) : (
              // ── Confirmation state ──────────────────────────────────
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center py-16 px-8 border border-charcoal-100 bg-ivory-50"
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
                  예약 완료
                </p>
                <h2
                  className="font-display text-charcoal-800 mb-4 leading-snug"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontSize: '2.2rem', letterSpacing: '-0.02em' }}
                >
                  Your table is{' '}
                  <span className="italic text-korean-red">awaiting.</span>
                </h2>
                <p
                  className="text-charcoal-500 leading-relaxed mb-2 max-w-sm"
                  style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: '0.9rem' }}
                >
                  Thank you, <strong style={{ fontWeight: 500, color: '#3E3D3A' }}>{form.name}</strong>. We've received your reservation request.
                </p>
                <p className="text-charcoal-400 text-sm mb-8" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
                  A confirmation will be sent to <strong style={{ fontWeight: 500, color: '#5A5855' }}>{form.email}</strong>
                </p>
                <div
                  className="w-full border border-charcoal-100 px-6 py-5 text-left mb-8 space-y-2"
                  style={{ borderRadius: '1px' }}
                >
                  {[
                    ['Date', form.date],
                    ['Time', form.time],
                    ['Guests', `${form.guests} ${Number(form.guests) === 1 ? 'person' : 'people'}`],
                    form.occasion && form.occasion !== 'None' ? ['Occasion', form.occasion] : null,
                  ].filter((item): item is string[] => item !== null).map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-charcoal-400" style={{ fontFamily: 'var(--font-outfit)' }}>{label}</span>
                      <span className="text-sm text-charcoal-700" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 400 }}>{value}</span>
                    </div>
                  ))}
                </div>
                 <p className="text-xs text-charcoal-400" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
                  Questions? Call us at{' '}
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-korean-red no-underline hover:underline">{contact.phone}</a>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Right: Image + Info ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={formVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 lg:col-start-9 space-y-6"
        >
          {/* Interior image */}
          <div className="relative h-72 lg:h-96 overflow-hidden" style={{ borderRadius: '2px' }}>
            <Image
              src={images.interior || images.interiorFallback}
              alt="Gangnam Kitchen interior"
              fill quality={80}
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-800/30 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="font-korean text-ivory-100/60 text-sm" style={{ fontFamily: 'var(--font-noto-kr)' }}>코리아가온 파크</span>
            </div>
          </div>

          {/* Info card */}
          <div
            className="p-6 border border-charcoal-100 bg-ivory-50 space-y-5"
            style={{ borderRadius: '2px' }}
          >
            <div>
              <p className="text-[0.6rem] tracking-[0.25em] uppercase text-charcoal-400 mb-1.5" style={{ fontFamily: 'var(--font-outfit)' }}>Address</p>
              <p className="text-sm text-charcoal-600 leading-relaxed" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
                {location.address}<br />{location.city}, {location.state} {location.pincode}
              </p>
            </div>
            <div className="h-px bg-charcoal-100" />
            <div>
              <p className="text-[0.6rem] tracking-[0.25em] uppercase text-charcoal-400 mb-1.5" style={{ fontFamily: 'var(--font-outfit)' }}>Hours</p>
              <div className="space-y-1">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between">
                    <span className="text-sm text-charcoal-500" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>{h.days}</span>
                    <span className="text-sm text-charcoal-600" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 400 }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px bg-charcoal-100" />
            <div className="space-y-3">
              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-charcoal-600 hover:text-korean-red transition-colors duration-300 no-underline" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
                <Phone size={13} className="text-korean-red" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-charcoal-600 hover:text-korean-red transition-colors duration-300 no-underline" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
                <Mail size={13} className="text-korean-red" />
                {contact.email}
              </a>
            </div>
          </div>

          <p className="text-xs text-charcoal-400 leading-relaxed" style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300 }}>
            For large groups (8+) or private dining enquiries, please contact us directly. We'd love to curate something special.
          </p>
        </motion.div>

      </div>
    </main>
  )
}