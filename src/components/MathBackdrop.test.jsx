import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import MathBackdrop, { generateMathField } from './MathBackdrop'

describe('MathBackdrop', () => {
  it('creates a repeatable mathematical field from a seed', () => {
    expect(generateMathField(689)).toEqual(generateMathField(689))
    expect(generateMathField(689)).not.toEqual(generateMathField(690))
  })

  it('renders randomized parametric curves and sample points as decoration', () => {
    const { container } = render(<MathBackdrop seed={689} />)

    expect(screen.getByTestId('math-backdrop')).toHaveAttribute('aria-hidden', 'true')
    expect(container.querySelectorAll('.math-curve')).toHaveLength(3)
    expect(container.querySelectorAll('.math-point')).toHaveLength(36)
  })
})
