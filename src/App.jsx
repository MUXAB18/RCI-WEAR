import { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'

// ── Above-fold: eager imports (always needed immediately) ──
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Collections from './components/Collections'
import CustomCursor from './components/CustomCursor'

// ── Below-fold: lazy imports (loaded only when needed) ──
// These are split into async chunks by Vite's manualChunks config.
// On mobile (Slow 4G), this saves ~200-400ms of JS parse time.
const Portfolio     = lazy(() => import('./components/Portfolio'))
const Contact       = lazy(() => import('./components/Contact'))
const Footer        = lazy(() => import('./components/Footer'))
const QuoteModal    = lazy(() => import('./components/QuoteModal'))
const ContactModal  = lazy(() => import('./components/ContactModal'))
const WhatsAppChatBot = lazy(() => import('./components/WhatsAppChatBot'))

/* ── Marquee items ── */
const MARQUEE = [
  'Premium Quality', '✦', 'Since 2017', '✦', 'Rasheed Clothing International',
  '✦', 'Custom Craftsmanship', '✦', 'Global Delivery', '✦', 'Luxury Fashion',
  '✦', 'Premium Quality', '✦', 'Since 2017', '✦', 'Rasheed Clothing International',
  '✦', 'Custom Craftsmanship', '✦', 'Global Delivery', '✦', 'Luxury Fashion', '✦',
]

/** Tiny fallback — invisible but prevents layout shift */
function SilentFallback() {
  return null
}

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen]     = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  // Delay loading heavy below-fold components until after LCP paints
  const [loadBelow, setLoadBelow] = useState(false)

  /* ── Register Service Worker ── */
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Defer SW registration until after page load
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {})
      })
    }
  }, [])

  /* ── Load below-fold content after initial render ── */
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise 2s timeout
    // This gives the browser time to paint the hero before loading more JS
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setLoadBelow(true), { timeout: 2000 })
      return () => cancelIdleCallback(id)
    } else {
      const t = setTimeout(() => setLoadBelow(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  /* ── Global Scroll Reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el)
      })
    }

    const t = setTimeout(observe, 200)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  /* ── Scroll Progress Bar ── */
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(() => {
          const st = window.scrollY
          const dh = document.documentElement.scrollHeight - window.innerHeight
          bar.style.transform = `scaleX(${dh > 0 ? st / dh : 0})`
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Scroll progress */}
      <div id="scroll-progress" />

      {/* Custom cursor — already skips itself on touch/coarse devices */}
      <CustomCursor />

      <Navbar
        onGetQuote={() => setIsQuoteModalOpen(true)}
        onContact={() => setIsContactModalOpen(true)}
      />

      <main>
        {/* ── Above fold: renders immediately ── */}
        <Hero onGetQuote={() => setIsQuoteModalOpen(true)} />

        {/* Marquee ticker */}
        <div className="marquee-track" aria-hidden="true">
          <div className="marquee-inner">
            {MARQUEE.map((item, i) => (
              <span key={i} className="marquee-item">
                {item === '✦' ? <span>{item}</span> : item}
              </span>
            ))}
          </div>
        </div>

        <About />
        <Collections />

        {/* ── Below fold: lazy, loaded after LCP paints ── */}
        {loadBelow && (
          <Suspense fallback={<SilentFallback />}>
            <Portfolio />
            <Contact />
          </Suspense>
        )}
      </main>

      {loadBelow && (
        <Suspense fallback={<SilentFallback />}>
          <Footer />
        </Suspense>
      )}

      {/* Modals — load lazily, only render when opened */}
      {loadBelow && (
        <Suspense fallback={<SilentFallback />}>
          {isQuoteModalOpen && (
            <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
          )}
          {isContactModalOpen && (
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          )}
          <WhatsAppChatBot />
        </Suspense>
      )}
    </>
  )
}
