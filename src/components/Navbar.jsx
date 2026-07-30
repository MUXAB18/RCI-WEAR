import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Navbar.module.css'
import OptimizedImage from './OptimizedImage'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Design', href: '#design-studio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onGetQuote, onContact }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const navRef = useRef(null)
  const linksRef = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, opacity: 0 })

  /* ── Scroll behavior ── */
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateNav = () => {
      const currentScrollY = window.scrollY

      // Update scrolled state (glass effect kicks in after 40px)
      setScrolled(currentScrollY > 40)

      // Only hide on mobile, never on desktop
      const isMobile = window.innerWidth <= 768
      
      if (!isMobile) {
        // Desktop: always show navbar
        setHidden(false)
      } else {
        // Mobile: hide/show based on scroll direction
        if (currentScrollY <= 50) {
          setHidden(false)
        } else if (currentScrollY > lastScrollY && currentScrollY > 150) {
          setHidden(true)
        } else if (currentScrollY < lastScrollY) {
          setHidden(false)
        }
      }

      lastScrollY = currentScrollY

      // Update active section
      let currentSection = 'Home'
      const viewportMiddle = currentScrollY + (window.innerHeight / 2)
      
      // Check each section to find which one occupies the middle of viewport
      for (const { label, href } of navLinks) {
        const element = document.querySelector(href)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = currentScrollY + rect.top
          const elementBottom = elementTop + element.offsetHeight
          
          // Section is active if viewport middle is within it
          if (viewportMiddle >= elementTop && viewportMiddle < elementBottom) {
            currentSection = label
            break
          }
        }
      }
      
      if (active !== currentSection) {
        setActive(currentSection)
      }
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateNav, { passive: true })

    // Initial check on mount (delayed to ensure DOM is ready)
    const initTimer = setTimeout(updateNav, 300)

    return () => {
      clearTimeout(initTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateNav)
    }
  }, [active])

  /* ── Sliding Indicator ── */
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = linksRef.current[active]
      if (activeEl) {
        // Adjust left/width slightly for padding so it matches the text width
        setIndicatorStyle({
          width: activeEl.offsetWidth - 24,
          left: activeEl.offsetLeft + 12,
          opacity: 1
        })
      }
    }
    
    // Slight delay to ensure layout is done
    const timer = setTimeout(updateIndicator, 50)
    window.addEventListener('resize', updateIndicator)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [active])

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
              ref={el => linksRef.current[l.label] = el}
              href={l.href}
              className={[styles.navLink, active === l.label ? styles.navActive : ''].join(' ')}
              onClick={(e) => handleNav(e, l.href, l.label)}
              onMouseMove={handleMagnet}
              onMouseLeave={resetMagnet}
              data-cursor
              aria-current={active === l.label ? 'page' : undefined}
            >
              {l.label}
              <span className={styles.navHoverIndicator} />
            </a>
          ))}
          <div className={styles.slidingIndicator} style={indicatorStyle} />
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
