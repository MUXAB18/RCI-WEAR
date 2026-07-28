import { useEffect, useRef } from 'react'
import styles from './Collections.module.css'

const collections = [
  {
    id: 1,
    num: '01',
    title: 'Formal Wear',
    subtitle: 'Contemporary Class',
    desc: 'Sharp, sophisticated formal collections for every professional occasion.',
    tag: 'Premium',
    color: 'rgba(30,50,80,0.6)',
  },
  {
    id: 2,
    num: '02',
    title: 'Traditional',
    subtitle: 'Heritage Craft',
    desc: 'Celebrating culture through authentic garments with modern sensibility.',
    tag: 'Heritage',
    color: 'rgba(80,60,20,0.6)',
  },
  {
    id: 3,
    num: '03',
    title: 'Corporate Uniforms',
    subtitle: 'Brand Excellence',
    desc: 'Custom corporate wear reflecting your brand identity with precision.',
    tag: 'Custom',
    color: 'rgba(20,40,20,0.6)',
  },
  {
    id: 4,
    num: '04',
    title: 'Casual Luxury',
    subtitle: 'Everyday Prestige',
    desc: 'Effortlessly stylish casualwear for the discerning individual.',
    tag: 'Lifestyle',
    color: 'rgba(50,30,30,0.6)',
  },
  {
    id: 5,
    num: '05',
    title: 'Kids Collection',
    subtitle: 'Little Stars',
    desc: 'Adorable, comfortable, high-quality clothing for the little ones.',
    tag: 'Kids',
    color: 'rgba(25,25,50,0.6)',
  },
]

export default function Collections() {
  const sectionRef = useRef(null)

  useEffect(() => {
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
          <div>
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">
              Our <span className="gold-text">Collections</span>
            </h2>
          </div>
          <p className="section-subtitle">
            From formal wear to everyday luxury — the full spectrum of our craft.
          </p>
        </div>

        {/* Horizontal list — editorial style */}
        <div className={styles.list}>
          {collections.map((c, i) => (
            <div
              key={c.id}
              className={`${styles.item} reveal`}
              style={{ transitionDelay: `${i * 0.06}s` }}
              id={`collection-${c.id}`}
              data-cursor
            >
              <div className={styles.itemLeft}>
                <span className={styles.itemNum}>{c.num}</span>
              </div>

              <div className={styles.itemCenter}>
                <span className={styles.itemTag}>{c.tag}</span>
                <h3 className={styles.itemTitle}>{c.title}</h3>
                <p className={styles.itemSubtitle}>{c.subtitle}</p>
              </div>

              <div className={styles.itemRight}>
                <p className={styles.itemDesc}>{c.desc}</p>
                <button
                  className={styles.itemBtn}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  data-cursor
                >
                  Inquire
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className={styles.itemArrow}>→</div>

              {/* Color accent line */}
              <div className={styles.itemAccent} style={{ background: c.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
