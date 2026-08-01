import React, { useEffect, useState } from 'react'
import HeroMesh from './HeroMesh'
import useActiveSection from '../hooks/useActiveSection'
import useScrollProgress from '../hooks/useScrollProgress'

const navigation = ['projects', 'experience', 'education', 'skills']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(navigation)
  const scrollProgress = useScrollProgress()

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="site-header">
      <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress})` }} />
      <nav className="nav-shell container" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Cristobal Lizarraga, home">
          <span className="wordmark-mark">CL</span>
          <span>Cristobal Lizarraga</span>
        </a>
        <button
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
              onClick={() => setMenuOpen(false)}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a className="nav-resume" href="/Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
        </div>
      </nav>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <HeroMesh progress={scrollProgress} />
        <div className="container hero-content">
          <p className="eyebrow">Software engineer · Data builder · Creative technologist</p>
          <h1 id="hero-title">Cristobal Lizarraga builds thoughtful software for complex ideas.</h1>
          <p className="hero-lead">I turn data, engineering systems, and immersive technology into useful, understandable experiences.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:Lizarraga.cristobal689@gmail.com">Email me</a>
            <a className="button button-secondary" href="/Resume.pdf" target="_blank" rel="noreferrer">View resume</a>
          </div>
        </div>
      </section>
    </header>
  )
}
