import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const stylesheet = readFileSync(join(process.cwd(), 'src/index.css'), 'utf8')
const documentMarkup = readFileSync(join(process.cwd(), 'index.html'), 'utf8')

describe('portfolio theme', () => {
  it('uses warm editorial surfaces and matching browser chrome', () => {
    expect(stylesheet).toContain('color-scheme: light;')
    expect(stylesheet).toContain('--color-canvas: #f5efe6;')
    expect(stylesheet).toContain('--color-night: #1b211e;')
    expect(stylesheet).toContain('--color-sky: #dceff1;')
    expect(documentMarkup).toContain('<meta name="theme-color" content="#f5efe6" />')
  })

  it('does not use neon showcase accents or decorative project movement', () => {
    expect(stylesheet).not.toContain('--accent-lime')
    expect(stylesheet).not.toContain('.project-card:hover')
  })

  it('keeps the project list single-column and text-first', () => {
    expect(stylesheet).toContain('.project-grid { display: grid; grid-template-columns: 1fr;')
    expect(stylesheet).toContain('.project-item { color: var(--color-ink); background: var(--color-paper);')
    expect(stylesheet).not.toContain('.project-item:first-child')
    expect(stylesheet).not.toContain('.project-screenshot')
  })

  it('animates the mathematical header while respecting reduced motion', () => {
    expect(stylesheet).toContain('@keyframes math-drift')
    expect(stylesheet).toContain('.math-backdrop * { animation: none !important; }')
  })
})
