import React, { useRef } from 'react'

export default function HeroMesh({ progress = 0 }) {
  const meshRef = useRef(null)

  const setPoint = (x, y) => {
    const mesh = meshRef.current
    if (!mesh) return
    mesh.style.setProperty('--pointer-x', `${x}%`)
    mesh.style.setProperty('--pointer-y', `${y}%`)
  }

  const handlePointerMove = (event) => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    setPoint(Math.round(((event.clientX - rect.left) / rect.width) * 100), Math.round(((event.clientY - rect.top) / rect.height) * 100))
  }

  return (
    <div
      ref={meshRef}
      className="hero-mesh"
      data-testid="hero-mesh"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPoint(50, 50)}
      style={{ '--scroll-progress': String(progress) }}
    />
  )
}
