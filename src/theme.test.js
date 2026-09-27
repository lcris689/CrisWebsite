import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const stylesheet = readFileSync(join(process.cwd(), 'src/index.css'), 'utf8')
const documentMarkup = readFileSync(join(process.cwd(), 'index.html'), 'utf8')

describe('portfolio theme', () => {
  it('uses a deliberate dark canvas and matching browser chrome', () => {
    expect(stylesheet).toContain('color-scheme: dark;')
    expect(stylesheet).toContain('--color-canvas: #09090b;')
    expect(stylesheet).toContain('--color-surface: #111114;')
    expect(stylesheet).toContain('--color-hairline: #29292f;')
    expect(documentMarkup).toContain('<meta name="theme-color" content="#09090b" />')
  })

  it('does not use neon showcase accents or decorative project movement', () => {
    expect(stylesheet).not.toContain('--accent-lime')
    expect(stylesheet).not.toContain('.project-card:hover')
  })

  it('keeps the project list single-column and text-first', () => {
    expect(stylesheet).toContain('.project-grid { display: grid; grid-template-columns: 1fr;')
    expect(stylesheet).not.toContain('.project-screenshot')
  })

  it('animates the mathematical header while respecting reduced motion', () => {
    expect(stylesheet).toContain('@keyframes math-drift')
    expect(stylesheet).toContain('.math-backdrop * { animation: none !important; }')
  })
})
