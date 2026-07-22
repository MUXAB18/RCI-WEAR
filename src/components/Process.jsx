import { useEffect, useRef } from 'react'
import styles from './Process.module.css'

/* ── Process steps data ── */
const steps = [
  {
    num: '01',
    title: 'Design & Concept',
    desc: 'Every garment begins as a vision. Our design team translates your brief, mood board, or reference into precise technical drawings and specifications.',
    detail: 'Sketch → Tech Pack → Approval',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 52L20 42l8 4 18-24 4 2-20 26-6-4-10 6z"/>
        <circle cx="48" cy="16" r="6"/>
        <path d="M42 16h-8M54 16h-2M48 10v-2M48 22v2M53.2 11.5l1.4-1.4M42.8 21.5l-1.4 1.4"/>
        <path d="M8 20h12M8 28h8M8 36h5" strokeOpacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Fabric Sourcing',
    desc: 'Only premium-grade textiles enter our facility. We partner with certified mills for heavyweight cotton, performance blends, luxury weaves, and specialty fabrics.',
    detail: 'Mill Partnership → Quality Test → Approval',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="12" y="18" width="40" height="28" rx="2"/>
        <path d="M12 26h40M12 34h40"/>
        <path d="M22 18v28M32 18v28M42 18v28" strokeOpacity="0.35"/>
        <path d="M32 10c-5 0-9 3-10 8h20c-1-5-5-8-10-8z"/>
        <circle cx="32" cy="10" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Cutting & Patterning',
    desc: 'Master pattern makers cut each panel with laser precision. Consistent sizing across every piece in the run — from size XS to 4XL.',
    detail: 'Pattern Master → Marker → Cut',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="18" r="6"/>
        <circle cx="18" cy="46" r="6"/>
        <path d="M22.5 21.5L46 46M22.5 42.5L46 18"/>
        <path d="M28 32h28" strokeDasharray="3 3"/>
        <circle cx="18" cy="18" r="2" fill="currentColor" stroke="none"/>
        <circle cx="18" cy="46" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Stitching & Tailoring',
    desc: 'Skilled artisans assemble each garment stitch by stitch. Double-needle seams, reinforced stress points, and precision alignment on every piece.',
    detail: 'Assembly → Seaming → Pressing',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 12l4 4-16 36 4 2 16-36 4 4 4-4-8-8-4 2z"/>
        <path d="M40 20c0 0 8 6 8 16s-8 16-8 16"/>
        <path d="M46 28c0 0 4 3 4 8s-4 8-4 8" strokeOpacity="0.5"/>
        <circle cx="34" cy="16" r="3"/>
        <path d="M32 13l-2-3M36 13l2-3" strokeOpacity="0.6"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Embroidery & Embellishment',
    desc: 'Your brand comes alive. Custom logo embroidery, puff print, screen print, heat transfer, and specialty techniques applied with specialist machinery.',
    detail: 'Setup → Print/Embroider → Cure/Fix',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="10" y="22" width="44" height="26" rx="3"/>
        <path d="M10 32h44"/>
        <path d="M22 22V12a10 10 0 0 1 20 0v10"/>
        <circle cx="32" cy="39" r="5"/>
        <path d="M32 34v-4M32 44v4M27 39h-4M37 39h4M29 36l-3-3M35 42l3 3M29 42l-3 3M35 36l3-3" strokeOpacity="0.55"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Quality Inspection',
    desc: 'Every single garment is measured, checked, and approved against our quality spec sheet. Thread, seam, print, and fit — nothing ships with a defect.',
    detail: 'Measure → Inspect → Tag → Approve',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="28" cy="28" r="16"/>
        <path d="M40 40l14 14"/>
        <path d="M22 28l5 5 9-10"/>
      </svg>
    ),
  },
  {
    num: '07',
    title: 'Packaging & Delivery',
    desc: 'Garments are folded, tagged, poly-bagged, and packed to export standard. Then shipped worldwide via trusted logistics — tracked, insured, on time.',
    detail: 'Fold → Bag → Box → Ship',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 22l22-12 22 12v24L32 58 10 46V22z"/>
        <path d="M10 22l22 12 22-12M32 34v24"/>
        <path d="M21 16.5L43 28.5" strokeOpacity="0.4"/>
        <path d="M38 12l6 3-6 3" strokeOpacity="0.6"/>
        <circle cx="50" cy="50" r="8" fill="var(--hero-bg)" strokeWidth="0"/>
        <path d="M46 50l3 3 5-5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    const t = setTimeout(() => {
      sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')?.forEach(el => observer.observe(el))
    }, 100)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  return (
    <section id="process" className={`section ${styles.process}`} ref={sectionRef} aria-label="How It's Made — Our Manufacturing Process">
      <div className="container">

        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <p className="section-label">Behind the Craft</p>
          <h2 className="section-title">
            How It's <span className="gold-text">Made</span>
          </h2>
          <p className={`section-subtitle ${styles.headerSub}`}>
            Seven precise steps. One obsession with quality. This is how a garment goes from
            concept to your door — under one roof, in Sialkot, Pakistan.
          </p>
        </div>

        {/* Steps */}
        <ol className={styles.steps} aria-label="Manufacturing process steps">
          {steps.map((step, i) => (
            <li
              key={step.num}
              className={`${styles.step} reveal`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Step number + connecting line */}
              <div className={styles.stepLeft}>
                <div className={styles.stepNumWrap} aria-hidden="true">
                  <span className={styles.stepNum}>{step.num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={styles.connector} aria-hidden="true">
                    <div className={styles.connectorLine} />
                    <div className={styles.connectorDot} />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className={styles.iconWrap} aria-hidden="true">
                <div className={styles.icon}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className={styles.content}>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.desc}>{step.desc}</p>
                <div className={styles.detail}>
                  <div className={styles.detailLine} aria-hidden="true" />
                  <span className={styles.detailText}>{step.detail}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Bottom CTA */}
        <div className={`${styles.cta} reveal`}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaLabel}>Ready to start your order?</p>
            <h3 className={styles.ctaTitle}>
              Your design. Our craft. <em>Extraordinary results.</em>
            </h3>
            <a
              href="#contact"
              className={`btn-primary ${styles.ctaBtn}`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Your Order
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
