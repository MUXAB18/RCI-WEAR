import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'
import HeroCanvas from './HeroCanvas'
import MagneticButton from './MagneticButton'

export default function Hero({ onGetQuote }) {
  const heroRef = useRef(null)
  const eyebrowRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const taglineRef = useRef(null)
  const descRef = useRef(null)
  const actionsRef = useRef(null)
  const statsRef = useRef(null)
  const scrollRef = useRef(null)
  const sideLabelRef = useRef(null)
  const overlayRef = useRef(null)
  const bgRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const curRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  /* ── Cinematic entrance with GSAP ── */
  useEffect(() => {
    let gsap, ctx

    const init = async () => {
      try {
        const g = await import('gsap')
        gsap = g.gsap || g.default

        // Kill loader
        const loader = document.getElementById('luxury-loader')

        ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 0.2 })

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
            if (loader) loader.classList.add('done')
          }, [], 0.1)
        })
      } catch (e) {
        // CSS fallback
        const loader = document.getElementById('luxury-loader')
        if (loader) loader.classList.add('done')
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

  /* ── Mouse parallax ── */
  const flashlightRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
        clientX: e.clientX,
        clientY: e.clientY
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      curRef.current.x = lerp(curRef.current.x, mouseRef.current.x, 0.04)
      curRef.current.y = lerp(curRef.current.y, mouseRef.current.y, 0.04)

      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.06) translate(${curRef.current.x * -12}px, ${curRef.current.y * -10}px)`
      }
      
      if (flashlightRef.current && mouseRef.current.clientX) {
        flashlightRef.current.style.background = `radial-gradient(800px circle at ${mouseRef.current.clientX}px ${mouseRef.current.clientY}px, rgba(200,169,110,0.08), transparent 40%)`
      }
      
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── Scroll parallax - DISABLED to prevent jitter ── */
  useEffect(() => {
    // Parallax disabled for smooth scrolling
    // const content = heroRef.current?.querySelector(`.${styles.content}`)
    // let ticking = false
    
    // const onScroll = () => {
    //   if (!ticking) {
    //     window.requestAnimationFrame(() => {
    //       const sy = window.scrollY
    //       if (content) {
    //         content.style.transform = `translateY(${sy * 0.22}px)`
    //         content.style.opacity = Math.max(0, 1 - sy / 600)
    //       }
    //       ticking = false
    //     })
    //     ticking = true
    //   }
    // }
    
    // window.addEventListener('scroll', onScroll, { passive: true })
    // return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" ref={heroRef} className={styles.hero}>
      <HeroCanvas />

      {/* Wipe overlay */}
      <div ref={overlayRef} className={styles.wipeOverlay} />

      {/* Background image with parallax */}
      <div ref={bgRef} className={styles.bg}>
        <div className={styles.bgImage} />
        <div className={styles.bgTint} />
      </div>

      {/* Flashlight overlay */}
      <div ref={flashlightRef} className={styles.flashlight} />

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
            <em>Rasheed</em> Clothing
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
            className={`btn-primary ${styles.cta}`}
            onClick={() => scrollTo('#portfolio')}
          >
            Explore Collections
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </MagneticButton>
          <MagneticButton
            className={`btn-outline ${styles.cta}`}
            onClick={() => scrollTo('#contact')}
          >
            Get In Touch
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

      {/* Logo circle — floating */}
      <div className={styles.logoFloat} id="hero-logo-area">
        <div className={styles.logoRing} />
        <div className={styles.logoRing2} />
        <div className={styles.logoInner}>
          <img src="/logo.jpg" alt="RCI" className={styles.logoImg} />
        </div>
      </div>

      {/* Vertical side label */}
      <div className={styles.sideLabel} ref={sideLabelRef}>
        <div className={styles.sideLabelLine} />
        <span className={styles.sideLabelText}>Premium · Since 2017</span>
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
