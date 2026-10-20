import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./components/SEIRChart', () => ({
  default: () => <div aria-label="SEIR model visualization" />
}))

describe('portfolio application', () => {
  it('provides a navigable single-page portfolio', () => {
    render(<App />)

    const banner = screen.getByRole('banner')
    expect(within(banner).getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /cristobal lizarraga/i })).toBeInTheDocument()

    for (const label of ['Projects', 'Experience']) {
      const link = within(banner).getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', `#${label.toLowerCase()}`)
      expect(document.getElementById(label.toLowerCase())).toBeInTheDocument()
    }

    expect(screen.getByRole('link', { name: 'lizarraga.cristobal689@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:lizarraga.cristobal689@gmail.com'
    )
    expect(screen.getAllByRole('link', { name: /resume/i })[0]).toHaveAttribute('href', '/Resume.pdf')
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('shows the completed ServiceNow internship before earlier experience', () => {
    render(<App />)

    const internship = screen.getByRole('heading', { level: 3, name: 'ServiceNow Intern' })
    const drafting = screen.getByRole('heading', { level: 3, name: 'Drafter' })

    expect(internship).toBeInTheDocument()
    expect(internship.compareDocumentPosition(drafting) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByText('Keenstack')).toBeInTheDocument()
    expect(screen.getByText('May 2026 — July 2026')).toBeInTheDocument()
    expect(screen.queryByText('May 2026 — August 2026')).not.toBeInTheDocument()
    expect(screen.queryByText('May 2026 — Present')).not.toBeInTheDocument()
    expect(screen.getByText(/earned the ServiceNow Certified System Administrator.*during the final week of the internship/i)).toBeInTheDocument()
    expect(screen.getAllByText(/ServiceNow Certified System Administrator/i)).toHaveLength(2)
  })

  it('features the offline CMDB Identity Guard continuation and completed ServiceNow CSA credential', () => {
    render(<App />)

    const cmdbProject = screen.getByRole('heading', { level: 3, name: 'CMDB Identity Guard Offline Demo' })
    const vastProject = screen.getByRole('heading', { level: 3, name: 'VAST MC Challenge 2022' })
    const cmdbProjectCard = cmdbProject.closest('article')

    expect(cmdbProject.compareDocumentPosition(vastProject) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(within(cmdbProjectCard).getByRole('link', { name: /view source/i })).toHaveAttribute(
      'href',
      'https://github.com/lcris689/cmdb-identity-guard-demo'
    )
    expect(screen.queryByRole('img', { name: /cmdb identity guard offline demo overview/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'CMDB Duplicate Analysis Workbench' })).not.toBeInTheDocument()
    const credential = screen.getByRole('heading', { level: 3, name: 'ServiceNow Certified System Administrator (CSA)' })
    expect(credential.closest('article')).toHaveClass('credential-card')
    expect(screen.queryByText(/pursuing the ServiceNow Certified System Administrator/i)).not.toBeInTheDocument()
  })

  it('features the in-progress Ant Foraging Lab and hides the unavailable sleep notebook', () => {
    render(<App />)

    const antForagingHeading = screen.getByRole('heading', { level: 3, name: 'Ant Foraging Lab' })
    const antForagingProject = antForagingHeading.closest('article')

    expect(within(antForagingProject).getByText('In progress')).toBeInTheDocument()
    expect(within(antForagingProject).getByText(/stochastic spatial agent-based simulation/i)).toBeInTheDocument()
    expect(within(antForagingProject).getByRole('link', { name: /view source/i })).toHaveAttribute(
      'href',
      'https://github.com/lcris689/ant-foraging-lab'
    )
    expect(screen.queryByRole('heading', { level: 3, name: 'Detecting Pediatric Sleep States' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /view notebook/i })).not.toBeInTheDocument()
  })

  it('features verified in-progress work on a constrained Gemma coding-agent harness', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { level: 3, name: 'Gemma 4 Developer Agent' })
    const project = heading.closest('article')

    expect(within(project).getByText('In progress')).toBeInTheDocument()
    expect(within(project).getByText(/constrained coding-agent submission/i)).toBeInTheDocument()
    expect(within(project).getByText(/deterministic validation/i)).toBeInTheDocument()
    for (const technology of ['Python', 'Gemma 4', 'pytest', 'YAML']) {
      expect(within(project).getByText(technology)).toBeInTheDocument()
    }
    expect(within(project).queryByRole('link')).not.toBeInTheDocument()
  })

  it('prioritizes verified Python and AI-agent skills', () => {
    render(<App />)

    const programming = screen.getByRole('heading', { level: 3, name: 'Programming' }).closest('article')
    const dataAi = screen.getByRole('heading', { level: 3, name: 'Data & AI' }).closest('article')

    expect(within(programming).getAllByRole('listitem')[0]).toHaveTextContent('Python')
    expect(within(dataAi).getByText('LLM agent evaluation')).toBeInTheDocument()
  })

  it('presents a restrained project list without sales or personality copy', () => {
    render(<App />)

    for (const heading of ['Projects', 'Experience', 'Education & certifications', 'Skills']) {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 3, name: 'Homelab Learning Lab' })).toBeInTheDocument()
    expect(screen.getAllByText('In progress')).toHaveLength(3)
    expect(screen.getAllByRole('link', { name: /resume/i })).toHaveLength(1)
    expect(screen.queryByText(/clear outcomes|problem to solve|corner of the internet|learning by making|thanks for stopping by|on the workbench/i)).not.toBeInTheDocument()
  })
})
