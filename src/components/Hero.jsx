import { useEffect, useRef, lazy, Suspense } from 'react'
import styles from './Hero.module.css'
import MagneticButton from './MagneticButton'



export default function Hero({ onGetQuote }) {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const eyebrowRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const taglineRef = useRef(null)
  const descRef = useRef(null)
  const actionsRef = useRef(null)
  const statsRef = useRef(null)
  const scrollRef = useRef(null)

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
        <div className={styles.bgTint} />
      </div>

      {/* Cinematic grid lines (now just one dashed center line) */}
      <div className={styles.gridLines}>
        <div className={styles.gridLineCenter} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Left text column */}
        <div className={styles.contentText}>

          {/* Eyebrow / Est line (now above title) */}
          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <div className={styles.eyebrowSticker}>
              <span className={styles.eyebrowBold}>EST. 2017</span>
              <span className={styles.eyebrowLight}>SIALKOT, PAKISTAN</span>
            </div>
          </div>

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

          {/* Tagline */}
          <div ref={taglineRef} className={styles.tagline}>
            <p className={styles.taglineText}>Where imagination meets fabrication</p>
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
              EXPLORE COLLECTIONS
            </MagneticButton>
            <MagneticButton
              className={`${styles.ctaPill} ${styles.ctaOutline}`}
              onClick={() => scrollTo('#contact')}
            >
              GET IN TOUCH
            </MagneticButton>
          </div>

          {/* Stats */}
          <div ref={statsRef} className={styles.stats}>
            {[
              { num: '10K+', label: 'MONTHLY CAPACITY' },
              { num: 'OEM', label: 'PRIVATE LABEL READY' },
              { num: '100%', label: 'QUALITY INSPECTED' },
              { num: '24h', label: 'RESPONSE GUARANTEE' },
              { num: 'A+', label: 'FABRIC GRADE SOURCING' },
            ].map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <div className={styles.statLabelWrap}>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*
          Logo column — desktop only.
        */}
        <div className={styles.logoFloat} aria-hidden="true">
          <div className={styles.logoRingOuter} />
          <div className={styles.logoRingMiddle} />
          <div className={styles.logoRingInner} />
          <div className={styles.logoInner}>
            <img
              src="/logo.webp"
              alt="Rasheed Clothing International"
              className={styles.logoImg}
              width={220}
              height={220}
              loading="eager"
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
