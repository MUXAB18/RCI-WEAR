import { useRef, useCallback } from 'react'

export default function MagneticButton({ children, className, onClick, cursorText }) {
  const btnRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.3
    const dy = (e.clientY - cy) * 0.3
    btn.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    btn.style.transform = `translate(0px, 0px)`
  }, [])

  return (
    <button
      ref={btnRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor
      data-cursor-text={cursorText}
      style={{ transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      {children}
    </button>
  )
}
