import React, { useMemo, useState } from 'react'

function seededRandom(seed) {
  let value = seed >>> 0
  return () => {
    value += 0x6D2B79F5
    let next = value
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

function makeCurve(random) {
  const frequencyX = 2 + Math.floor(random() * 4)
  let frequencyY = 2 + Math.floor(random() * 5)
  if (frequencyY === frequencyX) frequencyY += 1
  const phase = random() * Math.PI
  const points = Array.from({ length: 181 }, (_, index) => {
    const time = (index / 180) * Math.PI * 2
    const x = 600 + 500 * Math.sin(frequencyX * time + phase)
    const y = 310 + 245 * Math.sin(frequencyY * time)
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  })

  return points.join(' ')
}

export function generateMathField(seed) {
  const random = seededRandom(seed)
  return {
    curves: Array.from({ length: 3 }, () => makeCurve(random)),
    points: Array.from({ length: 36 }, () => ({
      x: 55 + random() * 1090,
      y: 45 + random() * 530,
      radius: 0.8 + random() * 1.6,
      delay: random() * -12,
    })),
  }
}

function createSeed() {
  if (globalThis.crypto?.getRandomValues) {
    return globalThis.crypto.getRandomValues(new Uint32Array(1))[0]
  }
  return Math.floor(Math.random() * 4294967295)
}

export default function MathBackdrop({ seed }) {
  const [resolvedSeed] = useState(() => seed ?? createSeed())
  const field = useMemo(() => generateMathField(resolvedSeed), [resolvedSeed])

  return (
    <div className="math-backdrop" data-testid="math-backdrop" aria-hidden="true">
      <svg viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="math-curves">
          {field.curves.map((path, index) => (
            <path className={`math-curve math-curve-${index + 1}`} d={path} key={path} />
          ))}
        </g>
        <g className="math-points">
          {field.points.map((point, index) => (
            <circle
              className="math-point"
              cx={point.x}
              cy={point.y}
              r={point.radius}
              style={{ '--point-delay': `${point.delay}s` }}
              key={`${point.x}-${point.y}-${index}`}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
