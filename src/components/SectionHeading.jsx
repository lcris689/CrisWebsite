import React from 'react'
export default function SectionHeading({ id, eyebrow, title, description, level = 2 }) {
  const Heading = `h${level}`

  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading id={id}>{title}</Heading>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}
