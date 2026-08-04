import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
    this.elements = new Set()
  }

  observe = (element) => {
    this.elements.add(element)
    this.callback([{ isIntersecting: true, target: element }], this)
  }

  unobserve = (element) => this.elements.delete(element)
  disconnect = () => this.elements.clear()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: IntersectionObserverMock
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0)
window.cancelAnimationFrame = (id) => window.clearTimeout(id)

afterEach(() => cleanup())
