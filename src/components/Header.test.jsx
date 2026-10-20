import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('opens and closes its mobile navigation accessibly', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const toggle = screen.getByRole('button', { name: /toggle navigation/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const projectsLink = screen.getByRole('link', { name: 'Projects' })
    projectsLink.focus()
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()

    await user.click(toggle)
    await user.click(projectsLink)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('provides portfolio navigation and primary calls to action', () => {
    render(<Header />)
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^cristobal lizarraga$/i)
    expect(screen.getByText('Software engineer building Python, data, AI, and web systems.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience')
    expect(screen.getAllByRole('link', { name: 'Resume' })).toHaveLength(1)
    expect(screen.queryByRole('link', { name: /browse projects|open résumé/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/corner of the internet|on the workbench|running collection/i)).not.toBeInTheDocument()
    expect(screen.getByTestId('math-backdrop')).toHaveAttribute('aria-hidden', 'true')
  })
})
