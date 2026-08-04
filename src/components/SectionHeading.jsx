import React from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

export default function SectionHeading({ id, eyebrow, title, description, level = 2 }) {
  const Heading = `h${level}`
  const headingRef = useScrollAnimation({ threshold: 0.15 })

  return (
    <div ref={headingRef} className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <Heading id={id}>{title}</Heading>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
