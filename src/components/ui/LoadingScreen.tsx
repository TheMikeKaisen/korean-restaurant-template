'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  restaurantName: string
  koreanName: string
}

export function LoadingScreen({ restaurantName, koreanName }: LoadingScreenProps) {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<'logo' | 'wipe' | 'done'>('logo')

  useEffect(() => {
    // Only show on first visit per session
    const seen = sessionStorage.getItem('gk-loaded')
    if (seen) return

    setVisible(true)
    sessionStorage.setItem('gk-loaded', '1')

    // Phase timing
    // 0ms    — logo fades in
    // 1400ms — progress bar fills
    // 2000ms — wipe begins
    // 2800ms — done, unmount

    const t1 = setTimeout(() => setPhase('wipe'), 2000)
    const t2 = setTimeout(() => setPhase('done'), 2900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!visible || phase === 'done') return null

  const nameParts = restaurantName.split(' ')
  const firstName = nameParts[0]
  const rest = nameParts.slice(1).join(' ')

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#111110' }}
          exit={{
            clipPath: ['inset(0 0 0% 0)', 'inset(0 0 100% 0)'],
            transition: {
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(253,252,248,0.5) 40px, rgba(253,252,248,0.5) 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(253,252,248,0.5) 40px, rgba(253,252,248,0.5) 41px)
              `,
            }}
          />

          {/* Korean character — large decorative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute select-none pointer-events-none"
            style={{
              fontFamily: 'var(--font-noto-kr)',
              fontWeight: 700,
              fontSize: '40vw',
              lineHeight: 1,
              color: 'rgba(200,57,58,0.06)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            강
          </motion.div>

          {/* Logo */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            {/* Restaurant name */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline gap-3"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 300,
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    letterSpacing: '-0.03em',
                    color: '#FAF8F2',
                    lineHeight: 1,
                  }}
                >
                  {firstName}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    letterSpacing: '-0.03em',
                    color: '#C8393A',
                    lineHeight: 1,
                  }}
                >
                  {rest}
                </span>
              </motion.div>
            </div>

            {/* Korean name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="overflow-hidden"
            >
              <span
                style={{
                  fontFamily: 'var(--font-noto-kr)',
                  fontWeight: 300,
                  fontSize: '0.75rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(253,252,248,0.35)',
                }}
              >
                {koreanName}
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mt-8 overflow-hidden"
              style={{ width: 'clamp(120px, 20vw, 200px)', height: '1px', background: 'rgba(253,252,248,0.1)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <motion.div
                style={{ height: '100%', background: '#C8393A', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 1.0,
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 300,
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(253,252,248,0.25)',
                marginTop: '0.5rem',
              }}
            >
              Seoul · Pune · India
            </motion.p>
          </div>

          {/* Bottom left — year */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 left-8"
          >
            <span
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 300,
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'rgba(253,252,248,0.2)',
                textTransform: 'uppercase',
              }}
            >
              Est. 2019
            </span>
          </motion.div>

          {/* Bottom right — cuisine tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 right-8"
          >
            <span
              style={{
                fontFamily: 'var(--font-noto-kr)',
                fontWeight: 300,
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: 'rgba(253,252,248,0.2)',
              }}
            >
              한국 요리
            </span>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}