import { useEffect, useRef, useState } from 'react'
import { srcSetFor } from '../data/images'

// Image with lazy loading and a quiet fade-in once decoded.
// Photos get a srcset of smaller copies. Lazy images use sizes="auto" (the browser measures the rendered box, so a
// card picks a card-sized file); browsers without it fall back to the viewport width.
export default function Img({ src, alt = '', className = '', priority = false, sizes, ...rest }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [src])

  return (
    <img
      ref={ref}
      src={src}
      srcSet={srcSetFor(src)}
      alt={alt}
      sizes={srcSetFor(src) ? sizes || (priority ? '100vw' : 'auto, 100vw') : undefined}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...rest}
    />
  )
}
