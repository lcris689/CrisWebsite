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
})
