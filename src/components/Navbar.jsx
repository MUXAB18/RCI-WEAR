import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Navbar.module.css'
import OptimizedImage from './OptimizedImage'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onGetQuote, onContact }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const lastY = useRef(0)
  const navRef = useRef(null)
  const sectionsRef = useRef([])
  const tickingRef = useRef(false)
  const scrollThrottle = useRef(0)

  /* ── Scroll behavior ── */
  useEffect(() => {
    sectionsRef.current = navLinks
      .map((link) => ({
        label: link.label,
        el: document.querySelector(link.href),
      }))
      .filter((section) => section.el)

    let lastScrollY = window.scrollY
    
    const updateNav = () => {
      const currentScrollY = window.scrollY
      
      // Update scrolled state
      if ((currentScrollY > 40) !== scrolled) {
        setScrolled(currentScrollY > 40)
      }
      
      // Update hidden state
      const shouldHide = currentScrollY > lastY.current && currentScrollY > 300
      if (shouldHide !== hidden) {
        setHidden(shouldHide)
      }
      
      lastY.current = currentScrollY
      
      // Update active section (less frequently)
      if (Math.abs(currentScrollY - lastScrollY) > 50) {
        let cur = sectionsRef.current[0]?.label || 'Home'
        for (const { label, el } of sectionsRef.current) {
          if (el.getBoundingClientRect().top <= 100) cur = label
        }
        if (cur !== active) setActive(cur)
        lastScrollY = currentScrollY
      }
      
      tickingRef.current = false
    }

    const handleScroll = () => {
      // Throttle scroll events
      const now = Date.now()
      if (now - scrollThrottle.current < 16) return // ~60fps
      scrollThrottle.current = now
      
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateNav)
        tickingRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      tickingRef.current = false
    }
  }, [scrolled, hidden, active])

  /* ── Magnetic nav links ── */
  const handleMagnet = useCallback((e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.25
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.25
    btn.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])

  const resetMagnet = useCallback((e) => {
    e.currentTarget.style.transform = ''
  }, [])

  const handleNav = (href, label) => {
    setMenuOpen(false)
    setActive(label)
    
    // For Contact, scroll directly to the form
    if (label === 'Contact') {
      const form = document.querySelector('#quote-form')
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } else {
      // Scroll to section for other links
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      ref={navRef}
      className={[
        styles.nav,
        scrolled ? styles.scrolled : '',
        hidden ? styles.hidden : '',
      ].join(' ')}
    >
      <div className={styles.inner}>

        {/* Brand */}
        <button
          className={styles.brand}
          onClick={() => handleNav('#home', 'Home')}
          data-cursor
        >
          <div className={styles.logoMark}>
            <img src="/logo.jpg" alt="RCI" className={styles.logoImg} width={40} height={40} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Rasheed Clothing</span>
            <span className={styles.brandSub}>International · Est. 2017</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map(l => (
            <button
              key={l.label}
              className={[styles.navLink, active === l.label ? styles.navActive : ''].join(' ')}
              onClick={() => handleNav(l.href, l.label)}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              data-cursor
            >
              {l.label}
              <span className={styles.navIndicator} />
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          className={`btn-primary ${styles.navCta}`}
          onClick={onGetQuote}
          data-cursor
        >
          Get a Quote
        </button>

        {/* Burger */}
        <button
          className={[styles.burger, menuOpen ? styles.burgerOpen : ''].join(' ')}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={[styles.mobileMenu, menuOpen ? styles.mobileOpen : ''].join(' ')}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuInner}>
          {navLinks.map((l, i) => (
            <button
              key={l.label}
              className={[styles.mobileLink, active === l.label ? styles.mobileLinkActive : ''].join(' ')}
              onClick={() => handleNav(l.href, l.label)}
              style={{ transitionDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
              data-cursor
            >
              <span className={styles.mobileLinkNum}>0{i + 1}</span>
              <span className={styles.mobileLinkLabel}>{l.label}</span>
              <span className={styles.mobileLinkArrow}>→</span>
            </button>
          ))}
          <div className={styles.mobileCtaWrap}>
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setMenuOpen(false)
                onGetQuote?.()
              }}
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
