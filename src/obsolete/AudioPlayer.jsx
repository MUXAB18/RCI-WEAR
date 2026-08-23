import { useState, useRef, useEffect } from 'react'
import styles from './AudioPlayer.module.css'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // For a real production site, you'd put a high-end ambient track here.
    // We'll use a placeholder or simply simulate the UI for now.
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_27d8dbab8c.mp3?filename=ambient-piano-amp-strings-10711.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    
    return () => {
      audioRef.current.pause()
    }
  }, [])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      // Browsers require user interaction before playing audio
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <button 
      className={`${styles.audioBtn} ${isPlaying ? styles.playing : ''}`} 
      onClick={togglePlay}
      data-cursor
      aria-label="Toggle Ambient Audio"
    >
      <span className={styles.label}>Sound</span>
      <div className={styles.equalizer}>
        <div className={`${styles.bar} ${styles.bar1}`} />
        <div className={`${styles.bar} ${styles.bar2}`} />
        <div className={`${styles.bar} ${styles.bar3}`} />
        <div className={`${styles.bar} ${styles.bar4}`} />
        <div className={`${styles.bar} ${styles.bar5}`} />
      </div>
    </button>
  )
}
