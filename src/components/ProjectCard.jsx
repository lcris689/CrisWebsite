import React from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

export default function ProjectCard({ project }) {
  const cardRef = useScrollAnimation({ threshold: 0.2 })
  
  return (
    <article className="card scroll-animate" ref={cardRef}>
      <div className="card-body">
        <h3>{project.title}</h3>
        <p className="muted">{project.description}</p>
        <div className="card-actions">
          {project.url && <a className="btn" href={project.url} target="_blank" rel="noreferrer">Link</a>}
          {project.repo && <a className="btn ghost" href={project.repo} target="_blank" rel="noreferrer">Code</a>}
        </div>
      </div>
      <img src={project.image} alt={project.title} className="card-image" />
    </article>
  )
}