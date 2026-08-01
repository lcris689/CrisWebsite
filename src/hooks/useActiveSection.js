import { useEffect, useState } from 'react'

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('')
  const ids = sectionIds.join('|')

  useEffect(() => {
    const Observer = window.IntersectionObserver
    if (typeof Observer !== 'function') return undefined

    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new Observer((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActiveSection(visible[0].target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return activeSection
}
