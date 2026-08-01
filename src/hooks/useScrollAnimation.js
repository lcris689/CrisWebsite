import { useEffect, useRef } from 'react'

export default function useScrollAnimation({ threshold = 0.1, rootMargin = '0px 0px -12% 0px', once = true } = {}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const Observer = window.IntersectionObserver

    if (reducedMotion || typeof Observer !== 'function') {
      element.classList.add('reveal-in')
      return undefined
    }

    element.classList.add('reveal-ready')
    const observer = new Observer(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('reveal-in')
        if (once) observer.unobserve(element)
      } else if (!once) {
        element.classList.remove('reveal-in')
      }
    }, { threshold, rootMargin })

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return elementRef
}
