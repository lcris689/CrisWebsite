import React, { useEffect, useRef, useState } from 'react'
import MathBackdrop from './MathBackdrop'
import useActiveSection from '../hooks/useActiveSection'

const navigation = ['projects', 'experience']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef(null)
  const activeSection = useActiveSection(navigation)

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenuAndRestoreFocus = () => {
    setMenuOpen(false)
    menuToggleRef.current?.focus()
  }

  return (
    <header className="site-header">
      <nav className="nav-shell container" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Cristobal Lizarraga, home">
          <span>Cristobal Lizarraga</span>
        </a>
        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span aria-hidden="true">{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
        <div id="primary-links" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              aria-current={activeSection === item ? 'location' : undefined}
              onClick={closeMenuAndRestoreFocus}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a className="nav-resume" href="/Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        </div>
      </nav>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <MathBackdrop />
        <div className="container hero-content">
          <h1 id="hero-title">Cristobal Lizarraga</h1>
        </div>
      </section>
    </header>
  )
}
