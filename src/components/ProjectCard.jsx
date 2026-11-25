import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ProjectCard({ project }) {
  const [isImageOpen, setIsImageOpen] = useState(false)
  const imageTriggerRef = useRef(null)
  const closeButtonRef = useRef(null)
  const hasProjectImage = project.showImage && project.image && project.imageAlt

  useEffect(() => {
    if (!isImageOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsImageOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      imageTriggerRef.current?.focus()
    }
  }, [isImageOpen])

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
        {(project.links.length > 0 || hasProjectImage) && (
          <div className="project-actions">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}<span aria-hidden="true"> ↗</span>
              </a>
            ))}
            {hasProjectImage && (
              <button ref={imageTriggerRef} type="button" onClick={() => setIsImageOpen(true)}>
                View project image<span aria-hidden="true"> ↗</span>
              </button>
            )}
          </div>
        )}
      </div>
      {isImageOpen && createPortal(
        <div
          className="project-image-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsImageOpen(false)
          }}
        >
          <div
            className="project-image-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${project.slug}-image-title`}
          >
            <div className="project-image-header">
              <h2 id={`${project.slug}-image-title`}>{project.title} image</h2>
              <button ref={closeButtonRef} type="button" onClick={() => setIsImageOpen(false)}>
                Close image
              </button>
            </div>
            <img src={project.image} alt={project.imageAlt} width="1895" height="903" />
          </div>
        </div>,
        document.body,
      )}
    </article>
  )
}
