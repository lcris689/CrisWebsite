import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useActiveSection from './useActiveSection'

describe('useActiveSection', () => {
  let callback
  let options

  beforeEach(() => {
    document.body.innerHTML = '<section id="projects"></section><section id="experience"></section>'
    window.IntersectionObserver = vi.fn(function Observer(cb, observerOptions) {
      callback = cb
      options = observerOptions
      this.observe = vi.fn()
      this.disconnect = vi.fn()
    })
  })

  it('tracks the most visible observed section', () => {
    const { result } = renderHook(() => useActiveSection(['projects', 'experience']))

    expect(options.threshold).toBe(0)
    expect(options.rootMargin).toBe('-20% 0px -55% 0px')

    act(() => callback([
      { isIntersecting: true, intersectionRatio: 0.4, target: document.getElementById('projects') },
      { isIntersecting: true, intersectionRatio: 0.8, target: document.getElementById('experience') }
    ]))

    expect(result.current).toBe('experience')
  })
})
