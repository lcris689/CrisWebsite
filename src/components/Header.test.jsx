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

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('provides portfolio navigation and primary calls to action', () => {
    render(<Header />)
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/cristobal lizarraga/i)
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:Lizarraga.cristobal689@gmail.com')
    expect(screen.getByRole('link', { name: 'View resume' })).toHaveAttribute('href', '/Resume.pdf')
  })
})
