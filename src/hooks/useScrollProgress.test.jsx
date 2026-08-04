import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import useScrollProgress, { calculateScrollProgress } from './useScrollProgress'

describe('scroll progress', () => {
  it('clamps page progress to a zero-to-one range', () => {
    expect(calculateScrollProgress(0, 1000, 500)).toBe(0)
    expect(calculateScrollProgress(250, 1000, 500)).toBe(0.5)
    expect(calculateScrollProgress(900, 1000, 500)).toBe(1)
    expect(calculateScrollProgress(100, 500, 500)).toBe(0)
  })

  it('updates after a scroll event', () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback()
      return 1
    })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 250 })
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 1000 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 500 })

    const { result } = renderHook(() => useScrollProgress())
    act(() => window.dispatchEvent(new Event('scroll')))

    expect(result.current).toBe(0.5)
  })
})
