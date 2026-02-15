import React from 'react'
import SEIRChart from './SEIRChart'
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
      <div className="container">
        <div className="seir-container">
          <h3 className="seir-title">SEIR Epidemiological Model</h3>
          <p className="seir-subtitle">Research work from ASU Fellowship (2022-2023)</p>
          <SEIRChart />
        </div>
      </div>
    </header>
  )
}
