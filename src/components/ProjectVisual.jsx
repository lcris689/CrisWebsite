import React from 'react'

const commonProps = {
  viewBox: '0 0 520 280',
  role: 'presentation',
  focusable: 'false'
}

function DataGrid() {
  return (
    <svg {...commonProps}>
      <g className="visual-grid">
        {[60, 120, 180, 240, 300, 360, 420, 480].map((x) => <path key={`x-${x}`} d={`M${x} 30V250`} />)}
        {[50, 90, 130, 170, 210, 250].map((y) => <path key={`y-${y}`} d={`M30 ${y}H490`} />)}
      </g>
      <path className="visual-line visual-line-blue" d="M38 210C96 190 112 110 170 132S245 218 300 157s89-101 180-74" />
      <g className="visual-nodes">
        <circle cx="170" cy="132" r="7" /><circle cx="300" cy="157" r="7" /><circle cx="480" cy="83" r="7" />
      </g>
      <text x="38" y="44">CITY SIGNAL / 22</text>
    </svg>
  )
}

function Orbit() {
  return (
    <svg {...commonProps}>
      <circle className="orbit orbit-one" cx="260" cy="140" r="92" />
      <ellipse className="orbit orbit-two" cx="260" cy="140" rx="190" ry="78" transform="rotate(-12 260 140)" />
      <circle className="visual-planet" cx="260" cy="140" r="38" />
      <g className="spacecraft" transform="translate(405 83)">
        <rect x="-18" y="-11" width="36" height="22" rx="4" />
        <path d="M-18-7h-34v14h34M18-7h34v14H18" />
      </g>
      <text x="35" y="44">PSYCHE / INTERACTIVE MODEL</text>
      <text className="visual-label" x="280" y="146">16 PSYCHE</text>
    </svg>
  )
}

function SleepWave() {
  return (
    <svg {...commonProps}>
      <g className="visual-grid">
        {[55, 95, 135, 175, 215].map((y) => <path key={y} d={`M35 ${y}H485`} />)}
      </g>
      <path className="visual-line visual-line-pink" d="M35 151h34l12-16 15 30 17-62 20 82 22-34h31l15-9 18 10 20-6 18 7 23-2 18-25 20 50 19-35 25 9 19-4 18 8 20-5 20 2 21-34 22 67 20-37 28 4" />
      <g className="sleep-bands"><rect x="35" y="220" width="118" height="12" /><rect x="159" y="220" width="80" height="12" /><rect x="245" y="220" width="150" height="12" /><rect x="401" y="220" width="84" height="12" /></g>
      <text x="35" y="44">ACTIGRAPHY / STATE MODEL</text>
    </svg>
  )
}

export default function ProjectVisual({ type }) {
  const Visual = type === 'orbit' ? Orbit : type === 'sleep-wave' ? SleepWave : DataGrid
  return (
    <div className={`project-visual visual-${type}`} data-project-visual aria-hidden="true">
      <Visual />
    </div>
  )
}
