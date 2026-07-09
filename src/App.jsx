import { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'

// ── Above-fold + critical navigation targets: eager imports ──
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Collections from './components/Collections'
import Contact from './components/Contact'   // must be eager: navbar links to #contact
import CustomCursor from './components/CustomCursor'

// ── Below-fold: lazy imports (loaded only when idle) ──
const Portfolio     = lazy(() => import('./components/Portfolio'))
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

  /* ── Global Scroll Reveal (Robust for lazy-loaded content) ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target) // Stop observing once revealed
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )

    const observeNodes = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        if (!el.classList.contains('visible')) {
          observer.observe(el)
        }
      })
    }

    // Initial observe
    const t = setTimeout(observeNodes, 200)

    // Watch for new lazy-loaded elements being added to the DOM
    const mutationObserver = new MutationObserver(() => {
      observeNodes()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => { 
      clearTimeout(t)
      observer.disconnect()
      mutationObserver.disconnect()
    }
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

        {/* ── Below fold: lazy ── */}
        {loadBelow && (
          <Suspense fallback={<SilentFallback />}>
            <Portfolio />
          </Suspense>
        )}

        {/*
          Contact is ALWAYS rendered (not behind loadBelow gate).
          Reason: the navbar has a link to #contact that must always work.
          The component itself is eagerly imported above.
        */}
        <Contact />
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
