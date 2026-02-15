import { useEffect, useRef } from 'react'

export default function useScrollAnimation(options = {}) {
  const elementRef = useRef(null)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('animate-in')
          // Optionally unobserve after animation
          if (options.once !== false) {
            observer.unobserve(element)
          }
        } else if (options.once === false) {
          element.classList.remove('animate-in')
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      }
    )
    
    observer.observe(element)
    
    return () => {
      if (element) observer.unobserve(element)
    }
  }, [options.threshold, options.rootMargin, options.once])
  
  return elementRef
}
