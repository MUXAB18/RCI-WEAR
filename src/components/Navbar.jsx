import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Navbar.module.css'
import OptimizedImage from './OptimizedImage'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Process', href: '#process' },
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
    const updateNav = () => {
      const currentScrollY = window.scrollY

      // Update scrolled state (glass effect kicks in after 40px)
      setScrolled(prev => {
        const isScrolled = currentScrollY > 40
        return isScrolled !== prev ? isScrolled : prev
      })

      // Hide on scroll-down, show on scroll-up
      // Only hide after 80px so navbar stays visible near the top
      setHidden(prev => {
        if (currentScrollY <= 80) {
          // Always visible near top of page
          lastY.current = currentScrollY
          return false
        }

        if (currentScrollY > lastY.current + 15) {
          // Scrolling DOWN — hide navbar
          lastY.current = currentScrollY
          return true
        }

        if (currentScrollY < lastY.current - 15) {
          // Scrolling UP — show navbar
          lastY.current = currentScrollY
          return false
        }

        return prev
      })

      // Update active section — use 45% of viewport as trigger line
      let cur = navLinks[0].label
      const threshold = window.innerHeight * 0.45
      for (const { label, href } of navLinks) {
        const el = document.querySelector(href)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= threshold) cur = label
        }
      }
      setActive(prev => (prev !== cur ? cur : prev))

      tickingRef.current = false
    }

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateNav)
        tickingRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check on mount
    updateNav()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      tickingRef.current = false
    }
  }, [])

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

  const handleNav = (e, href, label) => {
    e.preventDefault()
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
        <a
          href="#home"
          className={styles.brand}
          onClick={(e) => handleNav(e, '#home', 'Home')}
          data-cursor
          aria-label="Rasheed Clothing International – Home"
        >
          <div className={styles.logoMark}>
            <img src="/logo.jpg" alt="RCI" className={styles.logoImg} width={40} height={40} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Rasheed Clothing</span>
            <span className={styles.brandSub}>International · Est. 2017</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              className={[styles.navLink, active === l.label ? styles.navActive : ''].join(' ')}
              onClick={(e) => handleNav(e, l.href, l.label)}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              data-cursor
              aria-current={active === l.label ? 'page' : undefined}
            >
              {l.label}
              <span className={styles.navIndicator} />
            </a>
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
            <a
              key={l.label}
              href={l.href}
              className={[styles.mobileLink, active === l.label ? styles.mobileLinkActive : ''].join(' ')}
              onClick={(e) => handleNav(e, l.href, l.label)}
              style={{ transitionDelay: menuOpen ? `${i * 0.06}s` : '0s' }}
              data-cursor
              aria-current={active === l.label ? 'page' : undefined}
            >
              <span className={styles.mobileLinkNum}>0{i + 1}</span>
              <span className={styles.mobileLinkIcon}>◆</span>
              <span className={styles.mobileLinkLabel}>{l.label}</span>
              <span className={styles.mobileLinkArrow}>→</span>
            </a>
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
