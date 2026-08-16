import React from 'react'
import ProjectVisual from './ProjectVisual'
import useScrollAnimation from '../hooks/useScrollAnimation'

export default function ProjectCard({ project, index = 0 }) {
  const cardRef = useScrollAnimation({ threshold: 0.12 })

  return (
    <article
      className="project-card reveal"
      ref={cardRef}
      style={{ '--reveal-delay': `${index * 80}ms` }}
    >
      {project.image ? (
        <div className="project-visual visual-screenshot">
          <img
            className="project-screenshot"
            src={project.image}
            alt={project.imageAlt}
            width="1200"
            height="675"
            loading="lazy"
          />
        </div>
      ) : (
        <ProjectVisual type={project.visual} />
      )}
      <div className="project-body">
        <p className="eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="technology-list" aria-label="Technologies">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        {project.links.length > 0 && (
          <div className="project-actions">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}<span aria-hidden="true"> ↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
