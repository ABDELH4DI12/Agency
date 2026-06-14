/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

function AsyncImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  fallback = null,
}) {
  const [status, setStatus] = useState(src ? 'loading' : 'error')

  useEffect(() => {
    setStatus(src ? 'loading' : 'error')
  }, [src])

  if (status === 'error') {
    return <div className={className}>{fallback}</div>
  }

  return (
    <div className={`relative ${className}`} aria-busy={status === 'loading'}>
      {status === 'loading' && <div className="data-skeleton absolute inset-0 z-10" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`${imageClassName} transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default AsyncImage
