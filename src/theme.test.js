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

  it('removes card movement when reduced motion is requested', () => {
    expect(stylesheet).toContain('.project-card:hover, .project-card:focus-within { transform: none; }')
  })

  it('shows the full project screenshot instead of cropping it on narrow cards', () => {
    expect(stylesheet).toContain('.project-card:first-child .visual-screenshot { min-height: 0; aspect-ratio: 16 / 9; }')
  })
})
