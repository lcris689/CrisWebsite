import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectCard from './components/ProjectCard'
import SEIRChart from './components/SEIRChart'
import SectionHeading from './components/SectionHeading'
import { education, experience, projects, skillGroups } from './data/portfolio'

export default function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <section id="projects" className="page-section" aria-labelledby="projects-heading">
          <div className="container">
            <SectionHeading id="projects-heading" title="Projects" description="Selected projects and ongoing work." />
            <div className="project-grid">
              {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
            </div>
          </div>
        </section>

        <section id="experience" className="page-section section-soft" aria-labelledby="experience-heading">
          <div className="container">
            <SectionHeading id="experience-heading" title="Experience" />
            <div className="timeline">
              {experience.map((job) => (
                <article className="timeline-item" key={`${job.role}-${job.company}`}>
                  <div className="timeline-meta"><p>{job.period}</p></div>
                  <div className="timeline-content">
                    <h3>{job.role}</h3>
                    <p className="company">{job.company}</p>
                    <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="research-panel">
              <div className="research-intro">
                <h3>SEIR model explorer</h3>
                <p>Interactive visualization of how transmission, incubation, and recovery rates change a simulated outbreak.</p>
              </div>
              <SEIRChart />
            </div>
          </div>
        </section>

        <section id="education" className="page-section" aria-labelledby="education-heading">
          <div className="container">
            <SectionHeading id="education-heading" title="Education & certifications" />
            <div className="education-grid">
              {education.map((item) => (
                <article className={`education-card${item.type === 'credential' ? ' credential-card' : ''}`} key={item.degree}>
                  <p className="eyebrow">{item.date}</p>
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                  {item.gpa && <span>GPA {item.gpa}</span>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="page-section section-bordered" aria-labelledby="skills-heading">
          <div className="container">
            <SectionHeading id="skills-heading" title="Skills" />
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
