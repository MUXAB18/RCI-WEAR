import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Collections from './components/Collections'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import QuoteModal from './components/QuoteModal'
import ContactModal from './components/ContactModal'
import WhatsAppChatBot from './components/WhatsAppChatBot'

/* ── Marquee items ── */
const MARQUEE = [
  'Premium Quality', '✦', 'Since 2017', '✦', 'Rasheed Clothing International',
  '✦', 'Custom Craftsmanship', '✦', 'Global Delivery', '✦', 'Luxury Fashion',
  '✦', 'Premium Quality', '✦', 'Since 2017', '✦', 'Rasheed Clothing International',
  '✦', 'Custom Craftsmanship', '✦', 'Global Delivery', '✦', 'Luxury Fashion', '✦',
]

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  /* ── Register Service Worker for offline support & caching ── */
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => {
          console.warn('⚠️  Service Worker registration failed:', err)
        })
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

    const t = setTimeout(observe, 100)
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

      <CustomCursor />
      <Navbar
        onGetQuote={() => setIsQuoteModalOpen(true)}
        onContact={() => setIsContactModalOpen(true)}
      />
      <main>
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
        <Portfolio />
        <Contact />
      </main>
      <Footer />

      {/* Floating components */}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <WhatsAppChatBot />
    </>
  )
}
