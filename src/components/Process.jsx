import { useEffect, useRef } from 'react'
import styles from './Process.module.css'

const steps = [
  {
    num: '01',
    title: 'The Blueprint',
    desc: 'Every masterpiece begins with absolute clarity. We decode your vision—analyzing technical requirements, aesthetic goals, and precise measurements to establish an uncompromising blueprint for production.',
  },
  {
    num: '02',
    title: 'Material Curation',
    desc: 'We meticulously curate premium textiles and bespoke trims from trusted global mills. Only materials that meet our rigorous standards for drape, durability, and texture are selected for your garments.',
  },
  {
    num: '03',
    title: 'The Prototype',
    desc: 'Before full-scale production, our master pattern-makers construct a pristine sample. This physical prototype undergoes exhaustive fittings to ensure the silhouette and construction are flawless.',
  },
  {
    num: '04',
    title: 'Precision Assembly',
    desc: 'Our artisans bring the blueprint to life. Utilizing advanced machinery and time-honored tailoring techniques, each panel is cut, embroidered, and stitched with exacting precision in our Sialkot facility.',
  },
  {
    num: '05',
    title: 'Final Audit',
    desc: 'Excellence is never left to chance. Every single garment is subjected to a rigorous quality audit—inspecting seams, finishes, and dimensions—before being elegantly packaged for global dispatch.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    const t = setTimeout(() => {
      sectionRef.current?.querySelectorAll('.reveal, .reveal-up')?.forEach(el => observer.observe(el))
    }, 100)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  return (
    <section id="process" className={`section ${styles.process}`} ref={sectionRef} aria-label="Our Couture Manufacturing Process">
      <div className={`container ${styles.container}`}>
        
        {/* Header */}
        <div className={`${styles.header} reveal-up`}>
          <p className="section-label">Behind the Craft</p>
          <h2 className="section-title">
            The Process
          </h2>
          <p className={styles.subtitle}>
            A meticulous five-step journey from conceptual vision to tangible reality. 
            Engineered for brands that demand perfection.
          </p>
        </div>

        {/* Elegant Horizontal Timeline */}
        <div className={`${styles.timelineWrapper} reveal-up`}>
          <div className={styles.grid}>
            {/* The horizontal axis line */}
            <div className={styles.line}></div>
            
            {steps.map((step, i) => {
              const isBottom = i % 2 === 0;
              return (
                <div key={i} className={styles.step}>
                  
                  {/* Top Content Area */}
                  <div className={styles.contentTopWrapper}>
                    {!isBottom && (
                      <div className={`${styles.content} ${styles.contentTop}`}>
                        <div className={styles.stepHeader}>
                          <span className={styles.stepNum}>{step.num}</span>
                          <h3 className={styles.stepTitle}>{step.title}</h3>
                        </div>
                        <p className={styles.stepDesc}>{step.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Dot Area */}
                  <div className={styles.dotWrapper}>
                    <div className={styles.dot}>
                      <div className={styles.innerDot}></div>
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className={styles.contentBottomWrapper}>
                    {isBottom && (
                      <div className={`${styles.content} ${styles.contentBottom}`}>
                        <div className={styles.stepHeader}>
                          <span className={styles.stepNum}>{step.num}</span>
                          <h3 className={styles.stepTitle}>{step.title}</h3>
                        </div>
                        <p className={styles.stepDesc}>{step.desc}</p>
                      </div>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.cta} reveal-up`}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaLabel}>Ready to realize your vision?</p>
            <h3 className={styles.ctaTitle}>
              Your design. Our craft. <em>Extraordinary results.</em>
            </h3>
            <a
              href="#contact"
              className={`btn-primary ${styles.ctaBtn}`}
              onClick={(e) => {
                e.preventDefault()
                const formEl = document.querySelector('#quote-form')
                if (formEl) {
                  const subjField = formEl.querySelector('select[name="subject"]')
                  if (subjField) {
                    const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set
                    setter.call(subjField, 'Free Mock Up')
                    subjField.dispatchEvent(new Event('change', { bubbles: true }))
                  }
                }
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get Free Mock Up
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
