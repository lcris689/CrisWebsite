import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

const controls = [
  { key: 'beta', symbol: 'β', label: 'Transmission rate', description: 'How quickly infection moves through contact.', min: 0.1, max: 2, step: 0.05 },
  { key: 'sigma', symbol: 'σ', label: 'Incubation rate', description: 'How quickly exposed people become infectious.', min: 0.1, max: 0.5, step: 0.05 },
  { key: 'gamma', symbol: 'γ', label: 'Recovery rate', description: 'How quickly infectious people recover.', min: 0.05, max: 0.5, step: 0.05 }
]

const series = [
  { key: 'S', label: 'Susceptible', color: '#007cf0', dash: null },
  { key: 'E', label: 'Exposed', color: '#7928ca', dash: '7 4' },
  { key: 'I', label: 'Infected', color: '#ff4d4d', dash: '3 3' },
  { key: 'R', label: 'Recovered', color: '#00a99d', dash: '10 3 2 3' }
]

export function simulate(beta, sigma, gamma) {
  const population = 1000
  const substeps = 4
  const deltaTime = 1 / substeps
  let S = 990
  let E = 10
  let I = 0
  let R = 0
  return Array.from({ length: 150 }, (_, day) => {
    const point = { day, S, E, I, R }
    for (let step = 0; step < substeps; step += 1) {
      const newlyExposed = Math.min(S, (beta * S * I * deltaTime) / population)
      const newlyInfectious = Math.min(E, sigma * E * deltaTime)
      const newlyRecovered = Math.min(I, gamma * I * deltaTime)
      S -= newlyExposed
      E += newlyExposed - newlyInfectious
      I += newlyInfectious - newlyRecovered
      R += newlyRecovered
    }
    return point
  })
}

export default function SEIRChart() {
  const svgRef = useRef(null)
  const [values, setValues] = useState({ beta: 0.5, sigma: 0.2, gamma: 0.1 })

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').interrupt().remove()

    const width = 600
    const height = 240
    const margin = { top: 20, right: 28, bottom: 38, left: 48 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const data = simulate(values.beta, values.sigma, values.gamma)
    const x = d3.scaleLinear().domain([0, 149]).range([0, innerWidth])
    const y = d3.scaleLinear().domain([0, 1000]).range([innerHeight, 0])
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    g.append('g')
      .attr('class', 'chart-grid')
      .call(d3.axisLeft(y).ticks(4).tickSize(-innerWidth).tickFormat(''))

    g.append('g')
      .attr('class', 'chart-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat((day) => `${day}d`))

    g.append('g').attr('class', 'chart-axis').call(d3.axisLeft(y).ticks(4))

    const line = (key) => d3.line()
      .x((point) => x(point.day))
      .y((point) => y(point[key]))
      .curve(d3.curveMonotoneX)

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    series.forEach((item, index) => {
      const path = g.append('path')
        .datum(data)
        .attr('class', 'seir-line')
        .attr('data-series', item.label)
        .attr('fill', 'none')
        .attr('stroke', item.color)
        .attr('stroke-width', 2.25)
        .attr('stroke-dasharray', item.dash)
        .attr('d', line(item.key))

      if (!reducedMotion && typeof path.node()?.getTotalLength === 'function') {
        const length = path.node().getTotalLength()
        path.attr('stroke-dasharray', item.dash || length)
        if (!item.dash) path.attr('stroke-dashoffset', length)
          .transition().delay(index * 100).duration(900).ease(d3.easeCubicOut).attr('stroke-dashoffset', 0)
      }
    })

    return () => svg.selectAll('*').interrupt()
  }, [values])

  const updateValue = (key, value) => setValues((current) => ({ ...current, [key]: Number(value) }))

  return (
    <div className="seir-explorer" role="region" aria-label="SEIR model controls and chart">
      <div className="seir-controls">
        {controls.map((control) => (
          <div className="control-group" key={control.key}>
            <div className="control-heading">
              <label htmlFor={`seir-${control.key}`}><span aria-hidden="true">{control.symbol}</span> {control.label}</label>
              <output htmlFor={`seir-${control.key}`}>{values[control.key].toFixed(2)}</output>
            </div>
            <p id={`seir-${control.key}-description`}>{control.description}</p>
            <input
              id={`seir-${control.key}`}
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={values[control.key]}
              aria-describedby={`seir-${control.key}-description`}
              onChange={(event) => updateValue(control.key, event.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="seir-chart-wrap">
        <svg
          ref={svgRef}
          className="seir-chart"
          viewBox="0 0 600 240"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="SEIR population over time"
        />
      </div>
      <ul className="chart-legend" aria-label="Chart series">
        {series.map((item) => <li key={item.key}><span style={{ '--legend-color': item.color }} />{item.label}</li>)}
      </ul>
    </div>
  )
}
