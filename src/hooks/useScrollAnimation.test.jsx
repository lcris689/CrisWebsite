import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useScrollAnimation from './useScrollAnimation'

function Harness({ once = true }) {
  const ref = useScrollAnimation({ once, threshold: 0.2 })
  return <div ref={ref} className="reveal">Animated content</div>
}

describe('useScrollAnimation', () => {
  let instances

  beforeEach(() => {
    instances = []
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })
    window.IntersectionObserver = vi.fn(function Observer(callback) {
      this.callback = callback
      this.observe = vi.fn()
      this.unobserve = vi.fn()
      this.disconnect = vi.fn()
      instances.push(this)
    })
  })

  afterEach(() => vi.restoreAllMocks())

  it('prepares content only after the observer is available and reveals it on entry', () => {
    render(<Harness />)
    const element = screen.getByText('Animated content')

    expect(element).toHaveClass('reveal-ready')
    expect(element).not.toHaveClass('reveal-in')

    act(() => instances[0].callback([{ isIntersecting: true, target: element }], instances[0]))

    expect(element).toHaveClass('reveal-in')
    expect(instances[0].unobserve).toHaveBeenCalledWith(element)
  })

  it('reveals immediately when IntersectionObserver is unavailable', () => {
    window.IntersectionObserver = undefined
    render(<Harness />)
    expect(screen.getByText('Animated content')).toHaveClass('reveal-in')
  })

  it('reveals immediately when reduced motion is requested', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    render(<Harness />)
    expect(screen.getByText('Animated content')).toHaveClass('reveal-in')
    expect(window.IntersectionObserver).not.toHaveBeenCalled()
  })

  it('can reset repeatable animations and disconnects on cleanup', () => {
    const { unmount } = render(<Harness once={false} />)
    const element = screen.getByText('Animated content')

    act(() => instances[0].callback([{ isIntersecting: true, target: element }], instances[0]))
    act(() => instances[0].callback([{ isIntersecting: false, target: element }], instances[0]))

    expect(element).not.toHaveClass('reveal-in')
    unmount()
    expect(instances[0].disconnect).toHaveBeenCalled()
  })
})
