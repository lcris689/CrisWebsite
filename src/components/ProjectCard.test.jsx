import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProjectCard from './ProjectCard'

const project = {
  slug: 'sample',
  eyebrow: 'Data visualization',
  title: 'Sample project',
  description: 'A useful project.',
  technologies: ['D3.js', 'Python'],
  links: [{ label: 'View project', href: 'https://example.com/project' }],
  visual: 'data-grid'
}

describe('ProjectCard', () => {
  it('renders project details and a safe external action without raster placeholders', () => {
    const { container } = render(<ProjectCard project={project} index={0} />)

    expect(screen.getByText('Data visualization')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sample project' })).toBeInTheDocument()
    expect(screen.getByText('D3.js')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view project/i })).toMatchObject({
      target: '_blank',
      rel: 'noreferrer'
    })
    expect(container.querySelector('img')).not.toBeInTheDocument()
    expect(container.querySelector('[data-project-visual]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('does not render an empty action area when a project has no links', () => {
    const { container } = render(<ProjectCard project={{ ...project, links: [] }} index={1} />)
    expect(container.querySelector('.project-actions')).not.toBeInTheDocument()
  })

  it('uses an authentic project screenshot when one is provided', () => {
    render(
      <ProjectCard
        project={{
          ...project,
          image: '/projects/cmdb-identity-guard-offline.webp',
          imageAlt: 'CMDB Identity Guard offline demo overview',
        }}
      />,
    )

    expect(screen.getByRole('img', { name: 'CMDB Identity Guard offline demo overview' })).toHaveAttribute(
      'src',
      '/projects/cmdb-identity-guard-offline.webp',
    )
  })
})
