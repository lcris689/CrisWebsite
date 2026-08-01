import { useEffect, useRef, useState } from 'react'

export function calculateScrollProgress(scrollY, scrollHeight, viewportHeight) {
  const available = scrollHeight - viewportHeight
  if (available <= 0) return 0
  return Math.min(1, Math.max(0, scrollY / available))
}

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    const update = () => {
      frame.current = null
      setProgress(calculateScrollProgress(window.scrollY, document.documentElement.scrollHeight, window.innerHeight))
    }
    const requestUpdate = () => {
      if (frame.current === null) frame.current = window.requestAnimationFrame(update)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame.current !== null) window.cancelAnimationFrame(frame.current)
    }
  }, [])

  return progress
}
