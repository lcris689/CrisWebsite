import React from 'react'
import ProjectCard from './components/ProjectCard'

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A short summary demonstrating tech and impact.',
    url: '#',
    repo: '#'
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Another project emphasizing architecture and results.',
    url: '#',
    repo: '#'
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Tooling, automation, or small library example.',
    url: '#',
    repo: '#'
  }
]

export default function App() {
  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <h1>Your Name</h1>
          <p className="lead">Software Engineer — I build things that scale.</p>
        </div>
      </header>

      <main className="container">
        <section>
          <h2>Projects</h2>
          <div className="grid">
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section>
          <h2>About / Resume</h2>
          <p>Short summary about you, and links to download resume / contact.</p>
          <p>
            <a className="btn" href="/resume.pdf" target="_blank" rel="noreferrer">Download Resume</a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">Built with React + Vite • <a href="https://github.com/lcris689/CrisWebsite">Source</a></div>
      </footer>
    </div>
  )
}