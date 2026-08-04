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
        <section className="about-band" aria-labelledby="about-heading">
          <div className="container about-grid">
            <div>
              <p className="eyebrow">Profile</p>
              <h2 id="about-heading">Engineering breadth, grounded in clear outcomes.</h2>
            </div>
            <p className="about-copy">Software Engineer with a Master's degree in Computer Science and experience across enterprise workflows, full-stack development, data engineering, machine learning, and AR/VR. Bilingual in English and Spanish, with a focus on making technical systems useful to the people they serve.</p>
            <dl className="profile-facts">
              <div><dt>Based in</dt><dd>Arizona</dd></div>
              <div><dt>Education</dt><dd>M.S. Computer Science</dd></div>
              <div><dt>Languages</dt><dd>English · Spanish</dd></div>
            </dl>
          </div>
        </section>

        <section id="projects" className="page-section" aria-labelledby="projects-heading">
          <div className="container">
            <SectionHeading id="projects-heading" eyebrow="Selected work" title="Projects built for real questions." description="Data-rich systems, immersive learning, and applied machine learning." />
            <div className="project-grid">
              {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
            </div>
          </div>
        </section>

        <section id="experience" className="page-section section-soft" aria-labelledby="experience-heading">
          <div className="container">
            <SectionHeading id="experience-heading" eyebrow="Experience" title="Building across disciplines." description="From enterprise service workflows and production-ready building plans to research-grade data pipelines." />
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
                <p className="eyebrow">Interactive research artifact</p>
                <h3>Explore an SEIR epidemiological model.</h3>
                <p>Adjust transmission, incubation, and recovery rates to see how a simulated outbreak changes over time.</p>
              </div>
              <SEIRChart />
            </div>
          </div>
        </section>

        <section id="education" className="page-section" aria-labelledby="education-heading">
          <div className="container">
            <SectionHeading id="education-heading" eyebrow="Education" title="A foundation in computer science." />
            <div className="education-grid">
              {education.map((item) => (
                <article className="education-card" key={item.degree}>
                  <p className="eyebrow">{item.date}</p>
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                  <span>GPA {item.gpa}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="page-section section-bordered" aria-labelledby="skills-heading">
          <div className="container">
            <SectionHeading id="skills-heading" eyebrow="Capabilities" title="Tools selected for the problem." description="A practical toolkit spanning software, data, cloud, visualization, and immersive systems." />
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

        <section className="cta-band" aria-labelledby="contact-heading">
          <div className="container cta-inner">
            <div>
              <p className="eyebrow">Start a conversation</p>
              <h2 id="contact-heading">Have an interesting problem to solve?</h2>
            </div>
            <a className="button button-primary" href="mailto:Lizarraga.cristobal689@gmail.com">Contact me</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
