import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Outfit, Noto_Serif_KR } from 'next/font/google'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-kr',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gangnam Kitchen — Seoul Flavours, Crafted in Pune',
    template: '%s | Gangnam Kitchen',
  },
  description:
    "Pune's most premium Korean dining experience. Authentic Seoul flavours, curated ingredients, and a luxurious K-culture ambience.",
  keywords: ['Korean restaurant Pune', 'Korean food Pune', 'Gangnam Kitchen', 'Korean BBQ Pune'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Gangnam Kitchen',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FDFCF8',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${notoSerifKR.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ivory-50 text-charcoal-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
