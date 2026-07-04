import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './Portfolio.module.css'
import LookbookModal from './LookbookModal'

const filters = ['All', 'Hoodies', 'Tees and Essential Shorts', 'Tracksuits', 'Gymwear']

const items = [
  { id: 101, cat: 'Hoodies', title: 'Celestial Blue Zip-Up', desc: 'Blue heavyweight zip-up with white star graphics', img: '/portfolio/custom_hoodie_1.jpg', badge: 'New Arrival' },
  { id: 102, cat: 'Hoodies', title: 'Celestial Purple Zip-Up', desc: 'Purple heavyweight zip-up with white star graphics', img: '/portfolio/custom_hoodie_2.jpg', badge: 'New Arrival' },
  { id: 103, cat: 'Hoodies', title: 'Celestial Blue Detail', desc: 'Detailed view of the blue star zip-up hoodie', img: '/portfolio/custom_hoodie_3.png' },
  { id: 104, cat: 'Hoodies', title: 'Celestial Purple Detail', desc: 'Detailed view of the purple star zip-up hoodie', img: '/portfolio/custom_hoodie_4.png' },
  { id: 1, cat: 'Hoodies', title: 'Dead Snake Custom', desc: 'Black hoodie with red serpent graphic', img: '/portfolio/IMG_5442.PNG', badge: 'Limited' },
  { id: 2, cat: 'Hoodies', title: 'Forever Havin Motion', desc: 'Heavyweight black hoodie with white puff print', img: '/portfolio/IMG_5441.PNG', badge: 'Signature' },
  { id: 3, cat: 'Hoodies', title: 'Jetlag Studios Signature', desc: 'Two-tone sleeve lettering with chest logo', img: '/portfolio/IMG_5440.PNG', badge: 'Premium' },
  { id: 4, cat: 'Hoodies', title: 'Dark Root Minimal', desc: 'Subtle gray root graphic on pure black', img: '/portfolio/IMG_5443.PNG' },
  { id: 5, cat: 'Hoodies', title: 'Neon Benji 21', desc: 'Bright green hoodie with patches & print', img: '/portfolio/IMG_5444.PNG', badge: 'New' },
  { id: 6, cat: 'Hoodies', title: 'Premium Edition', desc: 'Custom crafted detailing', img: '/portfolio/IMG_5445.PNG' },
  { id: 7, cat: 'Hoodies', title: 'Classic Heavyweight', desc: 'High-quality cotton construction', img: '/portfolio/IMG_5446.PNG' },
  { id: 8, cat: 'Hoodies', title: 'Signature Drop', desc: 'Exclusive release garment', img: '/portfolio/IMG_5447.PNG', badge: 'Exclusive' },
  { id: 9, cat: 'Tees and Essential Shorts', title: 'First 48 Crimson Set', desc: 'Red motion matching short set', img: '/portfolio/IMG_5454.PNG', badge: 'New' },
  { id: 10, cat: 'Tees and Essential Shorts', title: 'Plain White Heavyweight', desc: 'Premium cotton construction tee', img: '/portfolio/IMG_5449.PNG' },
  { id: 11, cat: 'Tees and Essential Shorts', title: 'Broken Tears Graphic', desc: 'Raven puff print back design', img: '/portfolio/IMG_5450.PNG', badge: 'Limited' },
  { id: 12, cat: 'Tees and Essential Shorts', title: 'First 48 Midnight Set', desc: 'Black motion matching short set', img: '/portfolio/IMG_5453.PNG' },
  { id: 13, cat: 'Tees and Essential Shorts', title: 'First 48 Snow Set', desc: 'White motion matching short set', img: '/portfolio/IMG_5455.PNG', badge: 'New' },
  { id: 14, cat: 'Tees and Essential Shorts', title: 'Essential Core Tee', desc: 'Minimalist street styling', img: '/portfolio/IMG_5448.PNG' },
  { id: 15, cat: 'Tees and Essential Shorts', title: 'Lounge Comfort Set', desc: 'Premium relaxation fit', img: '/portfolio/IMG_5451.PNG' },
  { id: 16, cat: 'Tees and Essential Shorts', title: 'Signature Athletic Gear', desc: 'High motion mobility set', img: '/portfolio/IMG_5452.PNG' },
  { id: 17, cat: 'Tracksuits', title: 'Pain 2 Champain Noir', desc: 'Black heavyweight tracksuit matching set', img: '/portfolio/IMG_5456.PNG', badge: 'Signature' },
  { id: 18, cat: 'Tracksuits', title: 'Money Crazy Noir', desc: 'Full zip black tracksuit with patches', img: '/portfolio/IMG_5457.PNG', badge: 'Limited' },
  { id: 19, cat: 'Tracksuits', title: 'Noir Tracksuit Profile', desc: 'Form-fitting custom black activewear', img: '/portfolio/IMG_5458.PNG' },
  { id: 20, cat: 'Tracksuits', title: 'Noir Back Graphic', desc: 'Bold back print on premium fleece', img: '/portfolio/IMG_5459.PNG' },
  { id: 21, cat: 'Tracksuits', title: 'Pain 2 Champain Ash', desc: 'Gray heavyweight tracksuit with embroidery', img: '/portfolio/IMG_5460.PNG', badge: 'New' },
  { id: 22, cat: 'Tracksuits', title: 'Ash Back Graphic', desc: 'Signature back motif on premium heather', img: '/portfolio/IMG_5461.PNG' },
  { id: 23, cat: 'Gymwear', title: 'Core Logo Singlet Stack', desc: 'Red and black high-performance gym wear', img: '/portfolio/IMG_5462.PNG', badge: 'Performance' },
  { id: 24, cat: 'Gymwear', title: 'Signature Training Top', desc: 'Sleek black B-logo performance singlet', img: '/portfolio/IMG_5463.jpg' },
  { id: 25, cat: 'Gymwear', title: 'Crimson Training Top', desc: 'Bold red B-logo performance singlet', img: '/portfolio/IMG_5464.jpg', badge: 'New' },
]

/* ── Luxury Product Card with 3D tilt ── */
function ProductCard({ item, index, onOpen }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const tiltRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const hoverRef = useRef(false)

  const lerp = (a, b, t) => a + (b - a) * t

  /* ── RAF tilt loop ── */
  useEffect(() => {
    const animate = () => {
      tiltRef.current.x = lerp(tiltRef.current.x, targetRef.current.x, 0.09)
      tiltRef.current.y = lerp(tiltRef.current.y, targetRef.current.y, 0.09)

      const { x, y } = tiltRef.current
      const scale = hoverRef.current ? 1.02 : 1

      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale3d(${scale},${scale},1)`
      }
      if (imgRef.current) {
        imgRef.current.style.transform =
          `scale(${hoverRef.current ? 1.07 : 1}) translate(${y * 0.4}px, ${x * -0.4}px)`
      }
      if (glowRef.current) {
        const gx = (50 + y * 4).toFixed(1)
        const gy = (50 - x * 4).toFixed(1)
        glowRef.current.style.background =
          `radial-gradient(circle at ${gx}% ${gy}%, rgba(200,169,110,0.15) 0%, transparent 55%)`
        glowRef.current.style.opacity = hoverRef.current ? 1 : 0
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    targetRef.current = {
      x: ((e.clientY - cy) / (rect.height / 2)) * -8,
      y: ((e.clientX - cx) / (rect.width / 2)) * 8,
    }
  }, [])

  const onEnter = () => { hoverRef.current = true }
  const onLeave = () => {
    hoverRef.current = false
    targetRef.current = { x: 0, y: 0 }
  }

  return (
    <div
      className={`${styles.card} reveal`}
      style={{ transitionDelay: `${(index % 6) * 0.07}s` }}
      id={`portfolio-item-${item.id}`}
    >
      <div
        ref={cardRef}
        className={styles.cardInner}
        onMouseMove={onMouseMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={() => onOpen(item)}
        style={{ willChange: 'transform' }}
        data-cursor-text="VIEW"
      >
        {/* Glow layer */}
        <div ref={glowRef} className={styles.cardGlow} />

        {/* Image */}
        <div className={styles.imageWrap}>
          <img
            ref={imgRef}
            src={item.img}
            alt={item.title}
            className={styles.cardImage}
            loading="lazy"
            style={{ willChange: 'transform' }}
          />

          {/* Badge */}
          {item.badge && (
            <span className={styles.badge}>{item.badge}</span>
          )}

          {/* Hover overlay */}
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <p className={styles.overlayCat}>{item.cat}</p>
              <h3 className={styles.overlayTitle}>{item.title}</h3>
              <p className={styles.overlayDesc}>{item.desc}</p>
              <button
                className={styles.overlayBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  
                  // Hide overlay immediately on mobile
                  if (window.innerWidth <= 640) {
                    setShowOverlay(false)
                  }
                  
                  // Auto-fill contact form
                  const form = document.querySelector('#quote-form')
                  if (form) {
                    // Fill the subject field
                    const subjectField = form.querySelector('select[name="subject"]')
                    if (subjectField) {
                      subjectField.value = 'Custom Order'
                      subjectField.dispatchEvent(new Event('change', { bubbles: true }))
                    }
                    
                    // Fill the message field with full product details
                    const messageField = form.querySelector('textarea[name="message"]')
                    if (messageField) {
                      messageField.value = `Product: ${item.title}
Category: ${item.cat}
${item.badge ? `Badge: ${item.badge}\n` : ''}
Description: ${item.desc}

I'm interested in this product. Please provide:
- Pricing information
- Available sizes/colors  
- Customization options
- Minimum order quantity
- Lead time

Thank you!`
                      messageField.dispatchEvent(new Event('input', { bubbles: true }))
                      messageField.dispatchEvent(new Event('change', { bubbles: true }))
                    }
                    
                    // Wait for overlay to close, then scroll
                    setTimeout(() => {
                      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      
                      // Focus on name field
                      setTimeout(() => {
                        const nameField = form.querySelector('input[name="name"]')
                        if (nameField) nameField.focus()
                      }, 1000)
                    }, 100)
                  }
                }}
                data-cursor
              >
                Enquire
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className={styles.cardFooter}>
          <div className={styles.cardInfo}>
            <span className={styles.cardCat}>{item.cat.split(' ')[0]}</span>
            <h4 className={styles.cardTitle}>{item.title}</h4>
          </div>
          <div className={styles.cardArrowWrap}>
            <svg className={styles.cardArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const sectionRef = useRef(null)

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    const delay = setTimeout(() => {
      sectionRef.current?.querySelectorAll('.reveal')?.forEach(el => observer.observe(el))
    }, 100)
    return () => { clearTimeout(delay); observer.disconnect() }
  }, [active])

  let filtered = []
  if (active === 'All') {
    filters.filter(f => f !== 'All').forEach(cat => {
      const catItems = items.filter(i => i.cat === cat)
      filtered = [...filtered, ...catItems.slice(0, cat === 'Gymwear' ? 1 : 3)]
    })
  } else {
    filtered = items.filter(i => i.cat === active)
  }

  return (
    <section id="portfolio" className={`section ${styles.portfolio}`} ref={sectionRef}>
      <div className="container">

        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <p className="section-label">Our Work</p>
          <h2 className="section-title">
            Portfolio <span className="gold-text">Gallery</span>
          </h2>
          <p className={`section-subtitle ${styles.subtitle}`}>
            A glimpse into our finest creations. Real products, real motion, uncompromised quality.
          </p>
        </div>

        {/* Filter Pills */}
        <div className={`${styles.filters} reveal`} style={{ transitionDelay: '0.1s' }}>
          {filters.map(f => {
            const count = f === 'All' ? items.length : items.filter(i => i.cat === f).length
            if (f !== 'All' && count === 0) return null
            return (
              <button
                key={f}
                className={[styles.pill, active === f ? styles.pillActive : ''].join(' ')}
                onClick={() => setActive(f)}
                data-cursor
              >
                <span>{f}</span>
                <span className={styles.pillCount}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} onOpen={setSelectedItem} />
          ))}
        </div>

        {/* Footer note */}
        <div className={`${styles.note} reveal`}>
          <div className={styles.noteDot} />
          <p>Authentic Rasheed Clothing International products. Reach out to start your order.</p>
        </div>
      </div>
      
      <LookbookModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </section>
  )
}
