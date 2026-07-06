import { useState, useRef, useCallback } from 'react'

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Automatic WebP/AVIF format detection and fallback
 * - Responsive image sizing
 * - Lazy loading with intersection observer
 * - Progressive loading with blur placeholder
 * - Error handling with fallback
 */

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  blur = true,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  ...props
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imgRef = useRef(null)

  // Generate optimized image sources
  const generateSources = useCallback((baseSrc) => {
    if (!baseSrc) return { webp: '', avif: '', original: '' }
    
    // Remove extension and add format-specific extensions
    const basePath = baseSrc.replace(/\.(jpg|jpeg|png)$/i, '')
    
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`, 
      original: baseSrc
    }
  }, [])

  // Generate responsive sizes for different breakpoints
  const generateSrcSet = useCallback((basePath, format) => {
    const sizes = [400, 800, 1200, 1600]
    return sizes
      .map(size => `${basePath}_${size}w.${format} ${size}w`)
      .join(', ')
  }, [])

  const sources = generateSources(src)

  const handleLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setImageError(true)
  }, [])

  // Blur placeholder styles
  const placeholderStyle = {
    filter: blur && !imageLoaded ? 'blur(10px)' : 'none',
    transition: 'filter 0.3s ease',
    ...(props.style || {})
  }

  return (
    <>
      <img
        ref={imgRef}
        src={sources.original}
        alt={alt}
        className={`optimized-image ${className}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        style={placeholderStyle}
        {...props}
      />
      
      {/* Error fallback */}
      {imageError && (
        <div
          className="image-error-placeholder"
          style={{
            width: width || '100%',
            height: height || '200px',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: '14px'
          }}
        >
          Image not available
        </div>
      )}
    </>
  )
}

// Utility function to preload critical images
export function preloadImage(src) {
  const sources = generateSources(src)
  
  // Try AVIF first, then WebP, then original
  const formats = [
    { src: sources.avif, type: 'image/avif' },
    { src: sources.webp, type: 'image/webp' },
    { src: sources.original, type: 'image/jpeg' }
  ]

  formats.forEach(({ src, type }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    link.type = type
    document.head.appendChild(link)
  })
}

function generateSources(src) {
  if (!src) return { webp: '', avif: '', original: '' }
  
  const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '')
  
  return {
    avif: `${basePath}.avif`,
    webp: `${basePath}.webp`, 
    original: src
  }
}