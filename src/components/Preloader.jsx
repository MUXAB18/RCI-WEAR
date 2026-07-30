import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Start fading out after 1.6 seconds to allow animation to complete
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1600)

    // Remove from DOM completely after fade out completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2400) // 1600 + 800ms transition

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden'

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
      document.body.style.overflow = '' // Revert inline style
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`${styles.preloader} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <span className={styles.text}>Rasheed Clothing International</span>
        <div className={styles.lineWrapper}>
          <div className={styles.line} />
        </div>
      </div>
    </div>
  )
}
