# Gangnam Kitchen 강남 키친

> Seoul Flavours, Crafted in Pune.

A world-class premium Korean restaurant website built with Next.js 15, Framer Motion, GSAP, and Lenis smooth scroll.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
gangnam-kitchen/
├── public/
│   └── images/
│       ├── hero/           ← Hero section images
│       │   ├── hero-main.jpg
│       │   └── hero-secondary.jpg
│       ├── dishes/         ← Dish photography
│       │   ├── korean-fried-chicken.jpg
│       │   ├── bibimbap.jpg
│       │   ├── tteokbokki.jpg
│       │   ├── korean-bbq.jpg
│       │   ├── ramen.jpg
│       │   ├── kimchi-rice.jpg
│       │   ├── korean-corn-dog.jpg
│       │   └── bingsu.jpg
│       ├── gallery/        ← Gallery images (gallery-1.jpg through gallery-8.jpg)
│       └── about/          ← About page images
│           ├── restaurant.jpg
│           ├── chef.jpg
│           └── interior.jpg
├── src/
│   ├── app/                ← Next.js App Router pages
│   ├── components/
│   │   ├── layout/         ← Navbar, Footer, SmoothScrollProvider
│   │   ├── sections/       ← Page sections (Hero, About, Dishes, etc.)
│   │   ├── ui/             ← Reusable UI components
│   │   └── animations/     ← Animation wrappers
│   ├── hooks/              ← Custom React hooks
│   ├── lib/                ← Utils, image data, constants
│   ├── styles/             ← Global CSS
│   └── types/              ← TypeScript types
```

---

## 🖼️ Adding Your Own Images

The site uses a **smart image fallback system**:

1. Place your images in the correct `/public/images/` subfolder
2. Name them exactly as listed above (e.g., `hero-main.jpg`)
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
4. If the local file doesn't exist, it automatically falls back to Unsplash URLs

**Recommended image sizes:**
- Hero: 1920×1080px or larger
- Dishes: 800×800px (square) or 800×600px
- Gallery: Mixed sizes (portrait, landscape, square)
- About: 1200×800px

---

## 🎨 Design System

### Colors
- **Ivory 50** `#FDFCF8` — Main background
- **Korean Red** `#C8393A` — Brand accent
- **Charcoal 800** `#1C1B19` — Primary text
- **Charcoal 400** `#7E7C78` — Secondary text

### Typography
- **Display**: Cormorant Garamond (serif, editorial)
- **Body**: Outfit (geometric sans-serif)
- **Korean Accents**: Noto Serif KR

### Key CSS Classes
```css
.glass          /* Glassmorphism card */
.glass-cream    /* Warm glassmorphism */
.btn-primary    /* Primary button with hover slide */
.btn-outline    /* Outline button */
.hangul-decoration  /* Korean text accent */
.section-reveal     /* Scroll-triggered fade up */
```

---

## 🌐 Deployment (Vercel)

```bash
vercel
```

The `next.config.js` already has Unsplash and Pexels image domains whitelisted.

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Framework, App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Component animations |
| GSAP | Hero/scroll animations |
| Lenis | Smooth scroll |
| Lucide React | Icons |

---

## 📋 Build Phases

- **Phase 1** ✅ — Scaffold, design system, Navbar, Hero, Footer
- **Phase 2** 🔄 — About, Signature Dishes, Experience sections
- **Phase 3** ⏳ — Gallery, Testimonials, Reservation CTA
- **Phase 4** ⏳ — Menu, Reservations, Contact, About pages

---

*"If Apple designed a luxury Korean restaurant website."*
