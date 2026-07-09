import { useEffect, useRef, lazy, Suspense } from 'react'
import styles from './Hero.module.css'
import MagneticButton from './MagneticButton'

/*
 * HeroCanvas (Three.js) is ONLY loaded on desktop (pointer:fine devices).
 * On mobile this import never executes, keeping Three.js out of the bundle.
 */
const isDesktop = typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches

const HeroCanvas = isDesktop
  ? lazy(() => import('./HeroCanvas'))
  : null

export default function Hero({ onGetQuote }) {
  const heroRef     = useRef(null)
  const bgRef       = useRef(null)
  const eyebrowRef  = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const taglineRef  = useRef(null)
  const descRef     = useRef(null)
  const actionsRef  = useRef(null)
  const statsRef    = useRef(null)
  const scrollRef   = useRef(null)

  /*
   * ── PERFORMANCE NOTE ──
   * Hero content is IMMEDIATELY VISIBLE on first paint (no opacity:0 baseline).
   * GSAP enhances the entrance but does NOT gate visibility.
   * This ensures Lighthouse can measure LCP on the hero title.
   *
   * The wipe overlay has been REMOVED — it was covering the entire page
   * for 2.5+ seconds, causing the NO_LCP / FCP:5.8s disaster.
   */
  useEffect(() => {
    let ctx

    // Load GSAP asynchronously — if it fails, content is already visible
    const init = async () => {
      try {
        const g = await import('gsap')
        const gsap = g.gsap || g.default

        ctx = gsap.context(() => {
          // Short delay (0.3s) — just enough for the page to settle
          // Content is ALREADY visible, this just adds polish
          const tl = gsap.timeline({ delay: 0.3 })

          // Subtle bg zoom
          tl.fromTo(bgRef.current,
            { scale: 1.04 },
            { scale: 1, duration: 1.6, ease: 'power3.out' },
            0
          )

          // Eyebrow — animate from current visible state to enhanced state
          tl.fromTo(eyebrowRef.current,
            { opacity: 0.4, y: 8 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            0.1
          )

          // Title lines
          tl.fromTo(line1Ref.current,
            { opacity: 0.5, x: -12 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
            0.15
          )
          tl.fromTo(line2Ref.current,
            { opacity: 0.5, x: -12 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
            0.25
          )

          // Tagline
          tl.fromTo(taglineRef.current,
            { opacity: 0.4, y: 8 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            0.35
          )

          // Description
          tl.fromTo(descRef.current,
            { opacity: 0.4, y: 8 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            0.45
          )

          // Buttons
          tl.fromTo(actionsRef.current,
            { opacity: 0.4, y: 8 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            0.55
          )

          // Stats
          tl.fromTo(statsRef.current,
            { opacity: 0.4, y: 8 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            0.6
          )

          // Scroll indicator
          tl.fromTo(scrollRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' },
            0.9
          )
        })
      } catch {
        // GSAP failed to load — content already visible, nothing to do
      }
    }

    init()
    return () => ctx?.revert()
  }, [])

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" ref={heroRef} className={styles.hero}>

      {/* Background */}
      <div className={styles.bg} ref={bgRef}>
        <div className={styles.bgImage} />
        {/* Monogram Watermark */}
        <div className={styles.monogramWatermark}>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" aria-hidden="true">
            <circle cx="50" cy="50" r="46" strokeWidth="4"/>
            <text x="50" y="65" fontSize="32" fill="currentColor" stroke="none" textAnchor="middle" letterSpacing="4" fontFamily="sans-serif" fontWeight="bold">R</text>
          </svg>
        </div>
        <div className={styles.bgTint} />
        {/* 3D canvas — desktop only, loaded lazily */}
        {HeroCanvas && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>

      {/* Cinematic grid lines */}
      <div className={styles.gridLines}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.gridLine} style={{ left: `${(i + 1) * 16.66}%` }} />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Left text column */}
        <div className={styles.contentText}>

          {/*
            LCP ELEMENT: The h1 is the Largest Contentful Paint element.
            It must be visible on first paint — no opacity:0, no clip-path hide.
            CSS class hero-title-lcp is defined in index.html critical CSS.
          */}
          <h1 className={`${styles.title} hero-title-lcp`}>
            <span ref={line1Ref} className={styles.titleLine}>
              Rasheed Clothing
            </span>
            <span ref={line2Ref} className={`${styles.titleLine} ${styles.titleLineGold}`}>
              International
            </span>
          </h1>

          {/* Eyebrow / Est line */}
          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span>Est. Premium Collections · Since 2017</span>
          </div>

          {/* Tagline */}
          <div ref={taglineRef} className={styles.tagline}>
            <span className={styles.taglineBar} />
            <p className={styles.taglineText}>Where Imagination Meets Fabrication</p>
          </div>

          {/* Description */}
          <p ref={descRef} className={styles.description}>
            Crafting excellence in every thread. From timeless traditional wear
            to contemporary designs — engineered for those who demand the finest.
          </p>

          {/* CTA Buttons */}
          <div ref={actionsRef} className={styles.actions}>
            <MagneticButton
              className={styles.ctaPill}
              onClick={() => scrollTo('#portfolio')}
            >
              Explore Collections
            </MagneticButton>
            <MagneticButton
              className={`${styles.ctaPill} ${styles.ctaOutline}`}
              onClick={() => scrollTo('#contact')}
            >
              Get in touch
            </MagneticButton>
          </div>

          {/* Stats */}
          <div ref={statsRef} className={styles.stats}>
            {[
              { num: '10+', label: 'Years Experience' },
              { num: '500+', label: 'Clients Worldwide' },
              { num: '100%', label: 'Premium Quality' },
            ].map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/*
          Logo column — desktop only.
          fetchpriority="high" so this is the LCP image candidate
          that loads before anything else.
        */}
        <div className={styles.logoFloat} aria-hidden="true">
          <div className={styles.logoRing} />
          <div className={styles.logoRing2} />
          <div className={styles.logoInner}>
            <img
              src="/logo.webp"
              alt="Rasheed Clothing International"
              className={styles.logoImg}
              width={380}
              height={380}
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
        <span className={styles.scrollText}>Scroll</span>
      </div>

      {/* Corner marks */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      {/* Bottom accent line */}
      <div className={styles.heroAccentLine} />

    </section>
  )
}
