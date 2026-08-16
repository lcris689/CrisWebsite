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

    for (const label of ['Projects', 'Experience', 'Education', 'Skills']) {
      const link = within(banner).getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', `#${label.toLowerCase()}`)
      expect(document.getElementById(label.toLowerCase())).toBeInTheDocument()
    }

    expect(screen.getAllByRole('link', { name: /email|contact/i })[0]).toHaveAttribute(
      'href',
      'mailto:Lizarraga.cristobal689@gmail.com'
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
    expect(screen.getByText('May 2026 — August 2026')).toBeInTheDocument()
    expect(screen.queryByText('May 2026 — Present')).not.toBeInTheDocument()
    expect(screen.getByText(/earned the ServiceNow Certified System Administrator.*after completing the internship/i)).toBeInTheDocument()
    expect(screen.getAllByText(/ServiceNow Certified System Administrator/i)).toHaveLength(2)
  })

  it('features the offline CMDB Identity Guard continuation and completed ServiceNow CSA credential', () => {
    render(<App />)

    const cmdbProject = screen.getByRole('heading', { level: 3, name: 'CMDB Identity Guard Offline Demo' })
    const vastProject = screen.getByRole('heading', { level: 3, name: 'VAST MC Challenge 2022' })

    expect(cmdbProject.compareDocumentPosition(vastProject) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.getByRole('link', { name: /view source/i })).toHaveAttribute(
      'href',
      'https://github.com/lcris689/cmdb-identity-guard-demo'
    )
    expect(screen.getByRole('img', { name: /cmdb identity guard offline demo overview/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'CMDB Duplicate Analysis Workbench' })).not.toBeInTheDocument()
    const credential = screen.getByRole('heading', { level: 3, name: 'ServiceNow Certified System Administrator (CSA)' })
    expect(credential.closest('article')).toHaveClass('credential-card')
    expect(screen.queryByText(/pursuing the ServiceNow Certified System Administrator/i)).not.toBeInTheDocument()
  })
})
