import React from 'react'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="profile">
          <img src="/assets/profile.jpg" alt="Profile photo" className="avatar" />
        </div>
        <div className="intro">
          <h1>Cristobal Lizarraga</h1>
          <p className="title">Software Engineer</p>
          <p className="contact">
            Email: <a href="mailto:Cristobal.Lizarraga@gmail.com">Cristobal.Lizarraga@gmail.com</a> • 
            <a href="/Resume.pdf" target="_blank" rel="noreferrer"> Download PDF</a>
          </p>
        </div>
      </div>
    </header>
  )
}
