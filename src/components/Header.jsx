import React from 'react'
import ParticleBackground from './ParticleBackground'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-profile-section">
        <ParticleBackground />
        <div className="container header-inner">
          <div className="intro">
            <h1>Cris Lizarraga</h1>
            <p className="title">Software Engineer</p>
            <p className="contact">
              Email: <a href="mailto:Lizarraga.cristobal689@gmail.com">Lizarraga.cristobal689@gmail.com</a> • 
              <a href="/Resume.pdf" target="_blank" rel="noreferrer"> Download Resume</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
