import { useEffect, useRef } from 'react'
import styles from './Collections.module.css'

const collections = [
  {
    id: 1,
    num: '01',
    title: 'Hoodies',
    subtitle: 'Heavyweight Comfort',
    desc: 'Engineered from premium 450gsm fleece for a structured fit, featuring double-lined hoods and enduring warmth.',
    tag: 'Premium',
    color: 'rgba(30,50,80,0.6)',
    img: '/hoodie-new.png', // Updated path for the new green hoodie
  },
  {
    id: 2,
    num: '02',
    title: 'Tees & Essentials',
    subtitle: 'Everyday Staples',
    desc: 'Crafted from tightly knit, enzyme-washed cotton for an ultra-soft feel and relaxed drape that elevates your everyday rotation.',
    tag: 'Core',
    color: 'rgba(80,60,20,0.6)',
    img: '/tees-essential.png', // Updated path for the new t-shirt image
  },
  {
    id: 3,
    num: '03',
    title: 'Tracksuits',
    subtitle: 'Athleisure Excellence',
    desc: 'Moisture-wicking tech-fleece sets with sleek profiles, seamlessly blending athletic function with luxury aesthetics.',
    tag: 'Signature',
    color: 'rgba(50,30,30,0.6)',
    img: '/tracksuit.png', // Updated path for the new tracksuit image
  },
  {
    id: 4,
    num: '04',
    title: 'Gymwear',
    subtitle: 'Performance Focus',
    desc: 'Built for high-intensity output with four-way stretch fabrics and targeted breathability to withstand the toughest workouts.',
    tag: 'Active',
    color: 'rgba(20,40,60,0.6)',
    img: '/gymwear.png', // Updated path for the new gymwear image
  },
  {
    id: 5,
    num: '05',
    title: 'Corporate Uniforms',
    subtitle: 'Brand Excellence',
    desc: 'Bespoke corporate apparel designed to perfectly translate your brand identity into professional, highly durable daily wear.',
    tag: 'Custom',
    color: 'rgba(20,40,20,0.6)',
    img: '/corporate-uniform.png', // Updated path for the new corporate uniform image
  },
  {
    id: 6,
    num: '06',
    title: 'Outerwear & Jackets',
    subtitle: 'Weather-Ready Style',
    desc: 'Constructed with weatherproof materials and technical hardware, offering ultimate protection without compromising on modern style.',
    tag: 'Exclusive',
    color: 'rgba(30,30,30,0.8)', // Dark grey / black tones as requested
    img: '/outerwear.png',
  },
]

export default function Collections() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Disable intersection observer on mobile to prevent scroll interference
    if (window.innerWidth <= 900) {
      // Just add visible class immediately on mobile
      const elements = sectionRef.current?.querySelectorAll('.reveal')
      elements?.forEach(el => el.classList.add('visible'))
      return
    }
    
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    const t = setTimeout(() => {
      sectionRef.current?.querySelectorAll('.reveal')?.forEach(el => observer.observe(el))
    }, 100)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])

  return (
    <section id="collections" className={`section ${styles.collections}`} ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <p className="section-label" style={{ justifyContent: 'flex-start' }}>WHAT WE OFFER</p>
          <h2 className="section-title" style={{ marginBottom: '8px' }}>
            Our <span className="gold-text">Collections</span>
          </h2>
          <p className="section-subtitle" style={{ margin: 0, maxWidth: '600px', textAlign: 'left' }}>
            From formal wear to everyday luxury — the full spectrum of our craft.
          </p>
        </div>

        {/* Vertical stacked grid list */}
        <div className={styles.list}>
          {collections.map((c, i) => (
            <div
              key={c.id}
              className={`${styles.item} reveal`}
              style={{ transitionDelay: `${i * 0.1}s` }}
              id={`collection-${c.id}`}
            >
              {/* Top border line */}
              <div className={styles.itemDivider} />

              <div className={styles.itemGrid}>
                {/* Left: Plate container */}
                <div className={styles.itemVisual}>
                  <div className={`${styles.corner} ${styles.cornerTL}`} />
                  <div className={`${styles.corner} ${styles.cornerBR}`} />
                  <span className={styles.plateNumber}>Plate No. {c.num}</span>
                  <div className={styles.itemImgWrap}>
                    <img src={c.img} alt={c.title} className={styles.itemImg} loading="lazy" />
                  </div>
                </div>

                {/* Right: Content container */}
                <div className={styles.itemContent}>
                  <div className={styles.bgNumber}>{c.num}</div>

                  <div className={styles.textContent}>
                    <span className={styles.itemTag}>{c.tag}</span>
                    <h3 className={styles.itemTitle}>{c.title}</h3>
                    <p className={styles.itemSubtitle}>{c.subtitle}</p>
                    <p className={styles.itemDesc}>{c.desc}</p>

                    <a 
                      href="#contact" 
                      className={styles.inquireBtn}
                      onClick={(e) => {
                        e.preventDefault()
                        window.dispatchEvent(new CustomEvent('prefillContact', { detail: { category: c.title } }))
                        const contactEl = document.getElementById('contact')
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      INQUIRE <span className={styles.arrow}>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
