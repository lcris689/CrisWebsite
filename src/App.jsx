import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectCard from './components/ProjectCard'

const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A short summary demonstrating tech and impact.',
    url: '',
    repo: ''
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Another project emphasizing architecture and results.',
    url: '',
    repo: ''
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Tooling, automation, or small library example.',
    url: '',
    repo: ''
  }
]

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="container">
        <section id="summary">
          <h2>Summary</h2>
          <p>Concise professional summary. One or two sentences that describe you and what you build.</p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="grid">
            {projects.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          <article className="job">
            <h3>Job Title — Company</h3>
            <p className="meta">Location • Dates</p>
            <ul>
              <li>Key achievement or responsibility describing impact.</li>
            </ul>
          </article>
        </section>

        <section id="education">
          <h2>Education</h2>
          <p>Computer Science MS — ASU — 2024</p>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <p>List of relevant skills, languages, tools and frameworks.</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}