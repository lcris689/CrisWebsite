import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SectionHeading from './SectionHeading'

describe('SectionHeading', () => {
  it('labels a section with an eyebrow, heading, and supporting copy', () => {
    render(
      <SectionHeading
        id="work-heading"
        eyebrow="Selected work"
        title="Projects built for real questions"
        description="A focused selection of data and immersive projects."
        level={3}
      />
    )

    expect(screen.getByText('Selected work')).toHaveClass('eyebrow')
    expect(screen.getByRole('heading', { level: 3, name: 'Projects built for real questions' })).toHaveAttribute(
      'id',
      'work-heading'
    )
    expect(screen.getByText(/focused selection/i)).toBeInTheDocument()
  })
})
