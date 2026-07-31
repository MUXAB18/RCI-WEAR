# RCI-WEAR — Rasheed Clothing International

> **Premium custom clothing — Where Imagination Meets Fabrication.**

A production-grade, high-performance marketing & e-commerce web application built with **React 18 + Vite 5 + CSS Modules**.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Getting Started (Setup)](#getting-started-setup)
3. [Development Workflow](#development-workflow)
4. [Building for Production](#building-for-production)
5. [Deployment](#deployment)
6. [Environment Configuration](#environment-configuration)
7. [Architecture Overview](#architecture-overview)
8. [Performance Strategy](#performance-strategy)
9. [Jitter & Layout-Shift Prevention](#jitter--layout-shift-prevention)
10. [Accessibility (WCAG 2.1 AA)](#accessibility-wcag-21-aa)
11. [Running Lighthouse / Performance Tests](#running-lighthouse--performance-tests)
12. [Folder Structure](#folder-structure)

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | React 18 | Concurrent rendering, Suspense, lazy loading |
| **Bundler** | Vite 5 + Terser | ESM-native, instant HMR, aggressive tree-shaking |
| **Styling** | CSS Modules + Vanilla CSS | Zero runtime, scoped, no class-name collisions |
| **Animations** | GSAP + CSS transforms | GPU-composited, jitter-free motion |
| **Smooth Scroll** | Lenis (@studio-freight/lenis) | Buttery 60fps scroll across all devices |
| **Canvas** | React-Konva (Design Studio) | Isolated canvas, loaded lazily |
| **Email** | EmailJS | Client-side form submission, no backend needed |
| **Service Worker** | Custom SW (/public/sw.js) | Offline support, asset caching, instant repeat visits |
| **Hosting** | Vercel / Netlify (static) | CDN edge, automatic HTTPS, instant rollbacks |
| **Analytics** | Google Analytics 4 (deferred) | Loaded after first interaction — never blocks render |

---

## Getting Started (Setup)

### Prerequisites

- **Node.js** >= 18.0
- **npm** >= 9.0

### Install

```bash
git clone https://github.com/your-org/rci-wear.git
cd rci-wear
npm install
```

---

## Development Workflow

```bash
npm run dev
```

Opens the dev server at http://localhost:5173 with instant Hot Module Replacement (HMR).

> **Note:** The service worker is only registered in production builds. In development, asset caching is intentionally disabled so you always see the latest changes.

---

## Building for Production

```bash
npm run build
```

This produces an optimised `dist/` folder:
- All JS minified with **Terser** (drop_console, drop_debugger, 2 compression passes)
- CSS automatically split per-route chunk via cssCodeSplit: true
- Heavy libraries split into async vendor chunks (see Architecture)
- All hashed filenames for safe, long-lived browser caching

Preview the production build locally:

```bash
npm run preview
```

---

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel login
vercel --prod
```

Vercel automatically detects Vite, runs `npm run build`, and serves from a global CDN with HTTP/2 and Brotli compression.

### Netlify

1. Connect the GitHub repository in the Netlify dashboard
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### SPA Routing Rewrite (required for all hosts)

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Environment Configuration

Create `.env.local` in the project root (never commit this file):

```env
# EmailJS — for Contact form
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Access in code via `import.meta.env.VITE_YOUR_KEY`. Only VITE_ prefixed variables are exposed to the client bundle.

---

## Architecture Overview

### Modular Component Architecture

```
src/
├── components/             # One component per file, co-located CSS Module
│   ├── Navbar.jsx / Navbar.module.css
│   ├── Hero.jsx / Hero.module.css
│   ├── Collections.jsx / Collections.module.css
│   ├── Contact.jsx / Contact.module.css
│   ├── DesignStudio.jsx    ← lazy-loaded (heavy Konva canvas)
│   ├── Portfolio.jsx       ← lazy-loaded
│   ├── Process.jsx         ← lazy-loaded
│   ├── Footer.jsx          ← lazy-loaded
│   └── OptimizedImage.jsx  # Shared responsive image component
├── App.jsx                 # Root — eager + lazy split
├── App.css                 # Global layout overrides
└── index.css               # Design system tokens, base reset
```

### Above-fold vs Below-fold Split

```jsx
// Above-fold: eager imports — render immediately on first paint
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Collections from './components/Collections'
import Contact from './components/Contact'

// Below-fold: lazy imports — loaded only when browser is idle
const Portfolio    = lazy(() => import('./components/Portfolio'))
const Process      = lazy(() => import('./components/Process'))
const DesignStudio = lazy(() => import('./components/DesignStudio'))
const Footer       = lazy(() => import('./components/Footer'))
```

requestIdleCallback (2s timeout fallback) triggers below-fold loading, giving the browser time to paint the hero first.

### Manual Chunk Splitting (Vite)

| Chunk | Libraries | When Loaded |
|---|---|---|
| three-vendor | Three.js, @react-three/fiber | Desktop hero canvas only |
| gsap-vendor | GSAP | On first animation trigger |
| lenis-vendor | Lenis smooth scroll | On idle |
| emailjs-vendor | @emailjs/browser | When Contact form opens |
| react-vendor | react, react-dom | Always (pre-bundled) |

---

## Performance Strategy

### Core Web Vitals Targets

| Metric | Target | Strategy |
|---|---|---|
| **LCP** | < 1.8s | Hero image preloaded; H1 painted on first frame (no opacity:0) |
| **INP** | < 100ms | Debounced handlers; no heavy work on interaction threads |
| **CLS** | < 0.05 | Explicit image dimensions; scrollbar-gutter: stable; aspect-ratio |

### Image Optimisation

- All Design Studio garment images converted from PNG (~2.2 MB each) to **WebP** (~75% size reduction)
- Images served with loading="lazy" and explicit width/height attributes
- Shared OptimizedImage component uses srcset + sizes for responsive delivery
- Hero background uses fetchpriority="high"

### Font Loading (No FOIT/FOUT)

```html
<!-- media="print" trick: non-blocking, swaps to all once downloaded -->
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?...&display=swap"
  media="print" onload="this.media='all'" />
```

### Service Worker Caching Strategies

| Resource | Strategy |
|---|---|
| Hashed JS/CSS (/assets/*) | Cache-first |
| Images (WebP, PNG) | Stale-while-revalidate |
| Fonts (woff2) | Cache-first |
| HTML / Navigation | Network-first |

### Deferred Third-Party Scripts

- **Google Analytics**: defer attribute — never blocks parsing
- **Google AdSense**: loaded only after first user interaction OR 3-second fallback

---

## Jitter & Layout-Shift Prevention

### 1. scrollbar-gutter: stable

```css
/* index.css */
html {
  scrollbar-gutter: stable;
}
```

On Windows at non-100% zoom, native scrollbars appear and disappear, shifting content by ~17px. This rule reserves permanent space for the scrollbar — the primary cause of horizontal CLS jitter on desktop.

### 2. Transform-Only Animations

All GSAP and CSS animations use only transform and opacity:

```js
// Correct: compositor thread, zero layout cost
gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })

// Wrong: triggers layout recalculation every frame
gsap.fromTo(el, { marginTop: 20 }, { marginTop: 0 })
```

### 3. Explicit Image Dimensions

Every img tag has width and height attributes so the browser reserves space immediately:

```jsx
<img src="/logo.webp" alt="RCI" width={40} height={40} />
```

### 4. Aspect-Ratio Reservations

Image containers use CSS aspect-ratio so space is reserved before src resolves:

```css
.imageContainer {
  aspect-ratio: 3 / 4;
  overflow: hidden;
}
```

### 5. Passive & Debounced Event Handlers

```js
window.addEventListener('scroll', handler, { passive: true })
window.addEventListener('resize', debounce(handler, 100))
```

### 6. Preloader Gate

A lightweight preloader renders on first paint to mask any unavoidable reflow from JS hydration, ensuring users only see the polished loaded UI.

---

## Accessibility (WCAG 2.1 AA)

- Semantic HTML5 elements throughout (header, nav, main, section, footer)
- All interactive elements have accessible labels (aria-label, aria-expanded, aria-controls)
- Full keyboard navigation; modals trap focus and restore on close
- Color contrast ratios meet WCAG AA (>= 4.5:1 for body text)
- Touch targets minimum 44x44px on mobile
- Decorative images use alt="" to be ignored by screen readers

---

## Running Lighthouse / Performance Tests

### In Chrome DevTools

1. Open production URL (or npm run preview)
2. DevTools → Lighthouse tab
3. Select Mobile or Desktop → Analyze page load

### CLI

```bash
npm install -g lighthouse
lighthouse https://rasheedclothingintl.me/ \
  --output=html \
  --output-path=./report.html \
  --preset=desktop
```

### PageSpeed Insights

```
https://pagespeed.web.dev/analysis?url=https://rasheedclothingintl.me/
```

---

## Folder Structure

```
rci-wear/
├── public/
│   ├── sw.js                # Service Worker
│   ├── studio/              # Design Studio garment images (WebP)
│   ├── portfolio/           # Portfolio images (WebP)
│   └── logo.webp
├── src/
│   ├── components/          # UI components + co-located CSS Modules
│   ├── App.jsx              # Root component, lazy/eager split
│   ├── App.css
│   ├── index.css            # Design tokens, base reset, CSS vars
│   └── main.jsx
├── index.html               # Shell HTML — critical CSS, SEO meta, structured data
├── vite.config.js           # Build config — chunk splitting, Terser
├── package.json
└── README.md
```

---

*Built with care for performance, accessibility, and scalability.*
