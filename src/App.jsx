import { useEffect, useRef, useState } from 'react'
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

  /* ── Optimized Lenis Smooth Scroll ── */
  useEffect(() => {
    let lenis, rafId

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        lenis = new Lenis({
          duration: 1.2, // Reduced duration for better performance
          easing: t => 1 - Math.pow(1 - t, 3), // Simplified easing
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        })

        const raf = (time) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      } catch (e) {
        console.warn('Lenis unavailable, using native scroll')
      }
    }

    init()
    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  /* ── Global Scroll Reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.07, rootMargin: '0px 0px -48px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el)
      })
    }

    const t = setTimeout(observe, 200)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  /* ── Optimized Scroll Progress Bar ── */
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

    // Throttle scroll events for better performance
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Optimized GSAP Section Animations ── */
  useEffect(() => {
    let gsap, ScrollTrigger, ctx

    const initGSAP = async () => {
      try {
        const g = await import('gsap')
        const st = await import('gsap/ScrollTrigger')
        gsap = g.gsap || g.default
        ScrollTrigger = st.ScrollTrigger

        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          // Lighter parallax effects
          gsap.utils.toArray('[data-parallax]').forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.2 // Reduced default speed
            gsap.fromTo(el,
              { y: 0 },
              {
                y: () => el.offsetHeight * speed * -0.5, // Reduced intensity
                ease: 'none',
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1, // Less smooth but more performant
                }
              }
            )
          })

          // Simplified counters
          gsap.utils.toArray('[data-count]').forEach(el => {
            const target = parseInt(el.dataset.count)
            const obj = { val: 0 }
            ScrollTrigger.create({
              trigger: el,
              start: 'top 85%',
              onEnter: () => {
                gsap.to(obj, {
                  val: target,
                  duration: 1.2, // Faster animation
                  ease: 'power2.out',
                  onUpdate: () => {
                    el.textContent = Math.round(obj.val) + (el.dataset.suffix || '')
                  }
                })
              }
            })
          })
        })
      } catch (e) {
        // GSAP failed — use CSS animations as fallback
        console.warn('GSAP unavailable, using CSS fallbacks')
      }
    }

    const t = setTimeout(initGSAP, 300) // Reduced delay
    return () => { clearTimeout(t); ctx?.revert() }
  }, [])

  return (
    <>
      {/* Luxury loader */}
      <div id="luxury-loader">
        <div className="lc lc-tl" />
        <div className="lc lc-tr" />
        <div className="lc lc-bl" />
        <div className="lc lc-br" />
        <span className="loader-eyebrow">Est. 2017 · Sialkot, Pakistan</span>
        <span className="loader-brand">
          Rasheed Clothing<br />
          <span className="loader-brand-gold">International</span>
        </span>
        <div className="loader-line-wrap">
          <div className="loader-line" />
        </div>
        <span className="loader-sub">Loading Collection</span>
      </div>

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
