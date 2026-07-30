import { useState, useRef, useEffect, useMemo } from 'react'
import styles from './Portfolio.module.css'
import LookbookModal from './LookbookModal'
import OptimizedImage from './OptimizedImage'

const filters = ['All', 'Hoodies', 'Tees & Essentials', 'Tracksuits', 'Gymwear', 'Corporate Uniforms']

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
  { id: 9, cat: 'Tees & Essentials', title: 'First 48 Crimson Set', desc: 'Red motion matching short set', img: '/portfolio/IMG_5454.PNG', badge: 'New' },
  { id: 10, cat: 'Tees & Essentials', title: 'Plain White Heavyweight', desc: 'Premium cotton construction tee', img: '/portfolio/IMG_5449.PNG' },
  { id: 11, cat: 'Tees & Essentials', title: 'Broken Tears Graphic', desc: 'Raven puff print back design', img: '/portfolio/IMG_5450.PNG', badge: 'Limited' },
  { id: 12, cat: 'Tees & Essentials', title: 'First 48 Midnight Set', desc: 'Black motion matching short set', img: '/portfolio/IMG_5453.PNG' },
  { id: 13, cat: 'Tees & Essentials', title: 'First 48 Snow Set', desc: 'White motion matching short set', img: '/portfolio/IMG_5455.PNG', badge: 'New' },
  { id: 14, cat: 'Tees & Essentials', title: 'Essential Core Tee', desc: 'Minimalist street styling', img: '/portfolio/IMG_5448.PNG' },
  { id: 15, cat: 'Tees & Essentials', title: 'Lounge Comfort Set', desc: 'Premium relaxation fit', img: '/portfolio/IMG_5451.PNG' },
  { id: 16, cat: 'Tees & Essentials', title: 'Signature Athletic Gear', desc: 'High motion mobility set', img: '/portfolio/IMG_5452.PNG' },
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

/* ── Optimized Product Card ── */
function ProductCard({ item, index, onOpen }) {
  return (
    <div
      className={`${styles.card} reveal`}
      style={{ transitionDelay: `${(index % 6) * 0.05}s` }}
      id={`portfolio-item-${item.id}`}
    >
      <div
        className={styles.cardInner}
        onClick={() => onOpen(item)}
        data-cursor-text="VIEW"
      >
        {/* Image */}
        <div className={styles.imageWrap}>
          <OptimizedImage
            src={item.img}
            alt={item.title}
            className={styles.cardImage}
            loading="lazy"
            width={400}
            height={500}
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

                  // Auto-fill contact form
                  const form = document.querySelector('#quote-form')
                  if (form) {
                    const messageContent = `Product: ${item.title}
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

                    const subjectField = form.querySelector('select[name="subject"]')
                    if (subjectField) {
                      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set
                      nativeInputValueSetter.call(subjectField, 'Custom Order')
                      subjectField.dispatchEvent(new Event('change', { bubbles: true }))
                    }

                    const messageField = form.querySelector('textarea[name="message"]')
                    if (messageField) {
                      const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set
                      nativeTextAreaValueSetter.call(messageField, messageContent)
                      messageField.dispatchEvent(new Event('input', { bubbles: true }))
                      messageField.dispatchEvent(new Event('change', { bubbles: true }))
                    }

                    if (window.innerWidth <= 640) onOpen(null)

                    setTimeout(() => {
                      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      setTimeout(() => {
                        form.querySelector('input[name="name"]')?.focus()
                      }, 600)
                    }, window.innerWidth <= 640 ? 300 : 100)
                  }
                }}
                data-cursor
              >
                Enquire
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
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
              <path d="M5 12h14M12 5l7 7-7 7" />
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
  const gridRef = useRef(null)

  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [visibleCount, setVisibleCount] = useState(8)

  const filtered = useMemo(() => {
    if (active === 'All') {
      const topItems = [];
      const remainingItems = [];
      const categories = ['Hoodies', 'Tees & Essentials', 'Tracksuits', 'Gymwear', 'Corporate Uniforms'];
      
      categories.forEach(cat => {
        const catItems = items.filter(i => i.cat === cat);
        topItems.push(...catItems.slice(0, 2));
        remainingItems.push(...catItems.slice(2));
      });
      return [...topItems, ...remainingItems];
    }
    return items.filter(i => i.cat === active)
  }, [active])

  const visibleItems = filtered.slice(0, visibleCount)

  useEffect(() => {
    setVisibleCount(8)
  }, [active])

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8)
  }

  const handleScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  // Scroll reveal observer & initial scroll checks
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    const delay = setTimeout(() => {
      sectionRef.current?.querySelectorAll('.reveal')?.forEach(el => observer.observe(el))
    }, 100)

    const grid = gridRef.current
    if (grid) {
      grid.addEventListener('scroll', handleScroll)
      // Check initial scroll bounds
      setTimeout(handleScroll, 200)
    }

    return () => {
      clearTimeout(delay)
      observer.disconnect()
      if (grid) {
        grid.removeEventListener('scroll', handleScroll)
      }
    }
  }, [active, filtered])

  const handleArrowScroll = (direction) => {
    if (gridRef.current) {
      const cardWidth = gridRef.current.querySelector(`.${styles.card}`)?.offsetWidth || 200
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
      gridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
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
        <div className={styles.filtersWrapper}>
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
            
            <button
              className="btn-primary"
              style={{ marginLeft: 'auto', padding: '10px 24px', fontSize: '10px', height: 'fit-content' }}
              onClick={() => {
                const formEl = document.querySelector('#quote-form')
                if (formEl) {
                  const catField = formEl.querySelector('select[name="category"]')
                  if (catField) {
                    const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set
                    setter.call(catField, active === 'All' ? '' : active)
                    catField.dispatchEvent(new Event('change', { bubbles: true }))
                  }
                  const subjField = formEl.querySelector('select[name="subject"]')
                  if (subjField) {
                    const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set
                    setter.call(subjField, 'Free Mock Up')
                    subjField.dispatchEvent(new Event('change', { bubbles: true }))
                  }
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Get Free Mock Up
            </button>
          </div>
          {/* Scroll hint for mobile */}
          <div className={styles.scrollHint}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span>Scroll to see more categories</span>
          </div>
        </div>

        {/* Mobile Navigation Arrows (Visible only on mobile/touch screens) */}
        <div className={styles.mobileNav}>
          <button
            className={[styles.navBtn, !showLeftArrow ? styles.navBtnDisabled : ''].join(' ')}
            onClick={() => handleArrowScroll('left')}
            disabled={!showLeftArrow}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className={[styles.navBtn, !showRightArrow ? styles.navBtnDisabled : ''].join(' ')}
            onClick={() => handleArrowScroll('right')}
            disabled={!showRightArrow}
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className={styles.grid} ref={gridRef}>
          {visibleItems.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} onOpen={setSelectedItem} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filtered.length && (
          <div className={styles.loadMore}>
            <button className={`btn-primary ${styles.loadMoreBtn}`} onClick={handleShowMore}>
              Show More
            </button>
          </div>
        )}
      </div>

      <LookbookModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  )
}
