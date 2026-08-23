import { useEffect, useRef } from 'react'
import styles from './About.module.css'
import OptimizedImage from './OptimizedImage'

const values = [
  { icon: '01', title: 'Premium Quality', desc: 'Only the finest fabrics make it into our creations. Every piece is a testament to excellence.' },
  { icon: '02', title: 'Master Craftsmanship', desc: 'Decades of skill woven into every stitch. Traditional artistry with contemporary sensibility.' },
  { icon: '03', title: 'Custom Designs', desc: 'Your vision brought to life. Tailored precisely to your style, measurements, and preferences.' },
  { icon: '04', title: 'Global Delivery', desc: 'We respect your timeline. Reliable production ensures your orders arrive as promised, worldwide.' },
]

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    // Reveal Observer
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06 }
    )
    const delay = setTimeout(() => {
      sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up')?.forEach(el => observer.observe(el))
    }, 100)

    // Parallax with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!imgRef.current) {
            ticking = false
            return
          }
          const rect = sectionRef.current?.getBoundingClientRect()
          // Only parallax if section is somewhat in view
          if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            const yOffset = (window.innerHeight - rect.top) * 0.05
            imgRef.current.style.transform = `translateY(${yOffset - 30}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(delay)
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="about" className={`section ${styles.about}`} ref={sectionRef}>
      <div className="container">

        {/* Centered Header */}
        <div className={`${styles.sectionHeader} reveal-up`}>
          <p className="section-label">Our Story</p>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>
            Crafting Dreams<br />Into <em className="silver-text" style={{ fontStyle: 'italic' }}>Reality</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Left visual */}
          <div className={`${styles.visual} reveal-left`}>
            <div className={styles.imageFrame} ref={imgRef} style={{ transition: 'transform 0.1s linear' }}>
              <div className={styles.imageMain}>
                <OptimizedImage
                  src="/about_img.jpg"
                  alt="Rasheed Clothing International craftsmanship"
                  width={600}
                  height={800}
                />
                <div className={styles.imageSheen} />
              </div>
              <div className={styles.imageAccent}>
                <span className={styles.accentLabel}>Est.</span>
                <span className={styles.accentYear}>2017</span>
              </div>
              {/* Decorative corners */}
              <div className={`${styles.frameCorner} ${styles.fcTL}`} />
              <div className={`${styles.frameCorner} ${styles.fcBR}`} />
            </div>
          </div>

          {/* Right text */}
          <div className={`${styles.text} reveal-right`}>
            <div className={styles.bodyContainer}>
              <h4 className={styles.bodyHeading}>
                Crafted to Perform, Styled to Last
              </h4>
              <p className={styles.body}>
                Rasheed Clothing International was born from a passion for fashion and a relentless pursuit of quality. Rooted in Pakistan's rich textile heritage, we blend traditional craftsmanship with contemporary design sensibilities — engineering every piece for comfort, durability, and standout style.
              </p>
              <p className={styles.body}>
                From premium hoodies and everyday essentials to performance gymwear, tracksuits, and custom team jerseys, we manufacture apparel that carries your brand with precision. Corporate uniforms, athletic kits, or full ready-to-wear collections — every garment is built to make your brand feel extraordinary.
              </p>
            </div>

            {/* Chamber badge */}
            <div className={styles.memberBadge}>
              <div className={styles.badgeImgWrap}>
                <img src="/chamber.png" alt="Sialkot Chamber" width={60} height={60} />
              </div>
              <div>
                <span className={styles.badgeLabel}>Approved Member</span>
                <span className={styles.badgeName}>Sialkot Chamber of Commerce</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values grid moved below to save vertical space and look more elegant */}
        <div className={`${styles.valuesContainer} reveal-up`}>
          <div className={styles.values}>
            {values.map((v, i) => (
              <div
                key={i}
                className={styles.valueItem}
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className={styles.valueNum}>{v.icon}</span>
                <div>
                  <h3 className={styles.valueName}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
