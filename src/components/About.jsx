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
      sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right')?.forEach(el => observer.observe(el))
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
            <p className="section-label">Our Story</p>
            <h2 className="section-title">
              Crafting Dreams<br/>Into <em className="gold-text" style={{ fontStyle: 'italic' }}>Reality</em>
            </h2>
            <div className="divider" />

            <p className={styles.body}>
              Rasheed Clothing International was born from a passion for fashion and a relentless pursuit of quality. With roots in the rich textile heritage of Pakistan, we blend traditional craftsmanship with contemporary design sensibilities.
            </p>
            <p className={styles.body}>
              Whether it's a bespoke bridal ensemble, corporate uniforms, or a full ready-to-wear collection — every garment is engineered to make you feel extraordinary.
            </p>

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

            {/* Values grid */}
            <div className={styles.values}>
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`${styles.valueItem} reveal`}
                  style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
                >
                  <span className={styles.valueNum}>{v.icon}</span>
                  <div>
                    <h4 className={styles.valueName}>{v.title}</h4>
                    <p className={styles.valueDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
