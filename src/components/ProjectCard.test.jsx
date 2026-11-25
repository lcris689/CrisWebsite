import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(container.querySelector('[data-project-visual]')).not.toBeInTheDocument()
  })

  it('does not render an empty action area when a project has no links', () => {
    const { container } = render(<ProjectCard project={{ ...project, links: [] }} index={1} />)
    expect(container.querySelector('.project-actions')).not.toBeInTheDocument()
  })

  it('opens an optional project image in an accessible dialog', async () => {
    const user = userEvent.setup()
    render(
      <ProjectCard
        project={{
          ...project,
          image: '/projects/psyche-vr.png',
          imageAlt: 'Psyche spacecraft model above a tennis court for scale',
          showImage: true,
        }}
      />,
    )

    expect(screen.queryByRole('img')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /view project image/i }))

    expect(screen.getByRole('dialog', { name: /sample project image/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /psyche spacecraft model above a tennis court/i })).toHaveAttribute(
      'src',
      '/projects/psyche-vr.png',
    )

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view project image/i })).toHaveFocus()
  })
})
