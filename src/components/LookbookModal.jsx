import { useEffect, useState } from 'react'
import styles from './LookbookModal.module.css'

export default function LookbookModal({ item, isOpen, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  useEffect(() => {
    if (isOpen) {
      // Reset image loaded state
      setImageLoaded(false)
      
      // Preload the image
      if (item?.img) {
        const img = new Image()
        img.src = item.img
        img.onload = () => setImageLoaded(true)
        img.onerror = () => setImageLoaded(true) // Still show even if error
      }
      
      // Simple overflow hidden for all devices
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      setImageLoaded(false)
    }
    
    return () => { 
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen, item])

  if (!item) return null

  const handleInquire = () => {
    onClose()
    
    // Wait for modal close animation, then scroll and fill form
    setTimeout(() => {
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
        
        // Scroll to form centered
        form.scrollIntoView({ behavior: 'smooth', block: 'center' })
        
        // Focus on name field after scroll completes
        setTimeout(() => {
          const nameField = form.querySelector('input[name="name"]')
          if (nameField) nameField.focus()
        }, 1000)
      }
    }, 400)
  }

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} data-cursor-text="CLOSE">
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal" data-cursor>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.imageSide}>
          {!imageLoaded && (
            <div className={styles.imageSkeleton}>
              <div className={styles.spinner} />
            </div>
          )}
          <img 
            src={item.img} 
            alt={item.title} 
            className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
          {item.badge && <span className={styles.badge}>{item.badge}</span>}
        </div>

        <div className={styles.infoSide}>
          <span className={styles.cat}>{item.cat}</span>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.desc}>
            {item.desc}. This premium garment is crafted with meticulous attention to detail. Designed for comfort, durability, and a striking silhouette.
          </p>
          <button className={styles.inquireBtn} onClick={handleInquire} data-cursor>
            Inquire About This Piece
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}
