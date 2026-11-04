import { useEffect, useRef, useState } from 'react'

// Image with lazy loading and a quiet fade-in once decoded.
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
      alt={alt}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...rest}
    />
  )
}
