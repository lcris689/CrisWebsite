import React from 'react'
export default function ProjectCard({ project }) {
  return (
    <article className="project-item">
      <div className="project-body">
        <div className="project-meta">
          <p className="eyebrow">{project.eyebrow}</p>
          {project.status && <span className="project-status">{project.status}</span>}
        </div>
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
