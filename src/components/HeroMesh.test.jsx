import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HeroMesh from './HeroMesh'

describe('HeroMesh', () => {
  it('moves its focal point with pointer input and resets on leave', () => {
    const { getByTestId } = render(<HeroMesh progress={0.25} />)
    const mesh = getByTestId('hero-mesh')
    Object.defineProperty(mesh, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 200, height: 100 })
    })

    fireEvent(mesh, new MouseEvent('pointermove', { clientX: 150, clientY: 25, bubbles: true }))
    expect(mesh.style.getPropertyValue('--pointer-x')).toBe('75%')
    expect(mesh.style.getPropertyValue('--pointer-y')).toBe('25%')
    expect(mesh.style.getPropertyValue('--scroll-progress')).toBe('0.25')

    fireEvent.pointerLeave(mesh)
    expect(mesh.style.getPropertyValue('--pointer-x')).toBe('50%')
    expect(mesh.style.getPropertyValue('--pointer-y')).toBe('50%')
  })
})
