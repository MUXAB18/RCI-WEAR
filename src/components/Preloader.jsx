import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Start fading out after 1s
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1000)

    // Remove from DOM after fade completes (1000 + 500ms transition)
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
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
