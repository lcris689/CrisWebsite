import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'
import SEIRChart, { simulate } from './SEIRChart'

beforeAll(() => {
  SVGElement.prototype.getTotalLength = () => 100
})

describe('SEIRChart', () => {
  it('keeps every compartment non-negative and conserves population at extreme settings', () => {
    const points = simulate(2, 0.5, 0.05)

    points.forEach(({ S, E, I, R }) => {
      expect(Math.min(S, E, I, R)).toBeGreaterThanOrEqual(0)
      expect(S + E + I + R).toBeCloseTo(1000, 6)
    })
  })

  it('renders responsive controls and updates values', () => {
    const { container } = render(<SEIRChart />)

    expect(screen.getByRole('region', { name: /seir model controls and chart/i })).toBeInTheDocument()
    const beta = screen.getByRole('slider', { name: /transmission rate/i })
    const sigma = screen.getByRole('slider', { name: /incubation rate/i })
    const gamma = screen.getByRole('slider', { name: /recovery rate/i })
    expect(beta).toHaveAttribute('min', '0.1')
    expect(sigma).toHaveAttribute('max', '0.5')
    expect(gamma).toHaveAttribute('min', '0.05')

    fireEvent.change(beta, { target: { value: '0.75' } })
    expect(screen.getByText('0.75')).toBeInTheDocument()

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('viewBox', '0 0 600 240')
    expect(svg).toHaveAttribute('aria-label', 'SEIR population over time')
  })
})
