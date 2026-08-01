import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <a className="wordmark" href="#top">Cristobal Lizarraga</a>
          <p>Software, data, and interactive systems.</p>
        </div>
        <div className="footer-links" aria-label="Footer links">
          <a href="mailto:Lizarraga.cristobal689@gmail.com">Email</a>
          <a href="/Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
          <a href="https://github.com/lcris689/CrisWebsite" target="_blank" rel="noreferrer">Source</a>
        </div>
      </div>
    </footer>
  )
}
