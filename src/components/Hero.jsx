import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'
import MagneticButton from './MagneticButton'
import OptimizedImage from './OptimizedImage'

export default function Hero({ onGetQuote }) {
  const heroRef = useRef(null)
  const bgRef = useRef(null)          /* FIX: was referenced in GSAP but never declared */
  const eyebrowRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const taglineRef = useRef(null)
  const descRef = useRef(null)
  const actionsRef = useRef(null)
  const statsRef = useRef(null)
  const scrollRef = useRef(null)
  const overlayRef = useRef(null)

  /* ── Cinematic entrance with GSAP ── */
  useEffect(() => {
    let gsap, ctx

    const init = async () => {
      try {
        const g = await import('gsap')
        gsap = g.gsap || g.default

        // Kill loader removed, using app-skeleton

        ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 1.5 })

          // Overlay wipe out
          tl.to(overlayRef.current, {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 1.2,
            ease: 'power4.inOut',
          }, 0)

          // BG zoom in
          tl.fromTo(bgRef.current,
            { scale: 1.08, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' },
            0.2
          )

          // Eyebrow
          tl.fromTo(eyebrowRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.8
          )

          // Title lines — fade and slide in (no clip-path)
          tl.fromTo(line1Ref.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
            1.0
          )
          tl.fromTo(line2Ref.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
            1.2
          )

          // Tagline
          tl.fromTo(taglineRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            1.6
          )

          // Description
          tl.fromTo(descRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            1.8
          )

          // Buttons
          tl.fromTo(actionsRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            2.0
          )

          // Stats
          tl.fromTo(statsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            2.1
          )

          // Scroll indicator
          tl.fromTo(scrollRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power2.out' },
            2.5
          )

          // Kill loader after animations start
          tl.call(() => {
            const skeleton = document.getElementById('app-skeleton')
            if (skeleton) skeleton.style.animation = 'fadeOut 0.8s ease forwards'
          }, [], 0)
        })
      } catch (e) {
        // CSS fallback
        const skeleton = document.getElementById('app-skeleton')
        if (skeleton) skeleton.style.animation = 'fadeOut 0.8s ease forwards'
        ;[eyebrowRef, line1Ref, line2Ref, taglineRef, descRef, actionsRef, statsRef, scrollRef].forEach((r, i) => {
          if (r.current) {
            r.current.style.animation = `fadeUp 0.8s var(--ease-luxury) ${0.3 + i * 0.15}s both`
          }
        })
      }
    }

    init()
    return () => ctx?.revert()
  }, [])

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" ref={heroRef} className={styles.hero}>

      {/* Wipe overlay */}
      <div ref={overlayRef} className={styles.wipeOverlay} />

      {/* Background image */}
      <div className={styles.bg} ref={bgRef}>
        <div className={styles.bgImage} />
        {/* Monogram Watermark */}
        <div className={styles.monogramWatermark}>
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
            <circle cx="50" cy="50" r="46" strokeWidth="4"/>
            <text x="50" y="65" fontSize="32" fill="currentColor" stroke="none" textAnchor="middle" letterSpacing="4" fontFamily="sans-serif" fontWeight="bold">R</text>
          </svg>
        </div>
        <div className={styles.bgTint} />
      </div>

      {/* Cinematic grid lines */}
      <div className={styles.gridLines}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.gridLine} style={{ left: `${(i + 1) * 16.66}%` }} />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>

        {/* Main title */}
        <h1 className={styles.title}>
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
