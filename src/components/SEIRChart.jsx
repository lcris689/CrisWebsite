import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export default function SEIRChart() {
  const svgRef = useRef()
  
  // Interactive parameters with realistic defaults
  const [beta, setBeta] = useState(0.5)     // transmission rate
  const [sigma, setSigma] = useState(0.2)   // incubation rate
  const [gamma, setGamma] = useState(0.1)   // recovery rate
  
  useEffect(() => {
    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()
    
    // Dimensions
    const width = 600
    const height = 200
    const margin = { top: 20, right: 20, bottom: 30, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    
    // SEIR Model Parameters (now using state)
    const N = 1000    // total population
    
    // Initial conditions
    let S = 990
    let E = 10
    let I = 0
    let R = 0
    
    // Generate SEIR data over time
    const data = []
    const timeSteps = 150
    
    for (let t = 0; t < timeSteps; t++) {
      data.push({ t, S, E, I, R })
      
      // SEIR differential equations (Euler method)
      const dS = -beta * S * I / N
      const dE = beta * S * I / N - sigma * E
      const dI = sigma * E - gamma * I
      const dR = gamma * I
      
      S += dS
      E += dE
      I += dI
      R += dR
    }
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'transparent')
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    
    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, timeSteps])
      .range([0, innerWidth])
    
    const yScale = d3.scaleLinear()
      .domain([0, N])
      .range([innerHeight, 0])
    
    // Line generators
    const lineS = d3.line()
      .x(d => xScale(d.t))
      .y(d => yScale(d.S))
      .curve(d3.curveMonotoneX)
    
    const lineE = d3.line()
      .x(d => xScale(d.t))
      .y(d => yScale(d.E))
      .curve(d3.curveMonotoneX)
    
    const lineI = d3.line()
      .x(d => xScale(d.t))
      .y(d => yScale(d.I))
      .curve(d3.curveMonotoneX)
    
    const lineR = d3.line()
      .x(d => xScale(d.t))
      .y(d => yScale(d.R))
      .curve(d3.curveMonotoneX)
    
    // Axes
    const xAxis = d3.axisBottom(xScale).ticks(5)
    const yAxis = d3.axisLeft(yScale).ticks(5)
    
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('color', '#666')
    
    g.append('g')
      .call(yAxis)
      .attr('color', '#666')
    
    // Add axis labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 28)
      .attr('fill', '#999')
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .text('Time (days)')
    
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -35)
      .attr('fill', '#999')
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .text('Population')
    
    // Create paths for each compartment
    const pathS = g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', lineS)
    
    const pathE = g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f59e0b')
      .attr('stroke-width', 2)
      .attr('d', lineE)
    
    const pathI = g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ef4444')
      .attr('stroke-width', 2)
      .attr('d', lineI)
    
    const pathR = g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', lineR)
    
    // Animate the lines
    const totalLength = pathI.node().getTotalLength()
    
    pathS.attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0)
    
    pathE.attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .delay(200)
      .attr('stroke-dashoffset', 0)
    
    pathI.attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .delay(400)
      .attr('stroke-dashoffset', 0)
    
    pathR.attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .delay(600)
      .attr('stroke-dashoffset', 0)
    
    // Add legend
    const legend = g.append('g')
      .attr('transform', `translate(${innerWidth - 120}, 10)`)
    
    const legendData = [
      { label: 'Susceptible', color: '#3b82f6' },
      { label: 'Exposed', color: '#f59e0b' },
      { label: 'Infected', color: '#ef4444' },
      { label: 'Recovered', color: '#10b981' }
    ]
    
    legendData.forEach((item, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 18})`)
      
      legendRow.append('line')
        .attr('x1', 0)
        .attr('x2', 20)
        .attr('y1', 9)
        .attr('y2', 9)
        .attr('stroke', item.color)
        .attr('stroke-width', 2)
      
      legendRow.append('text')
        .attr('x', 25)
        .attr('y', 9)
        .attr('dy', '0.32em')
        .attr('fill', '#ccc')
        .attr('font-size', '10px')
        .text(item.label)
    })
    
  }, [beta, sigma, gamma]) // Re-run when parameters change
  
  return (
    <div>
      <div className="seir-controls">
        <div className="control-group">
          <label>
            <span className="control-label">β (Beta) - Transmission Rate</span>
            <span className="control-info">Contact rate × probability of transmission per contact (0.1 to 2.0)</span>
            <div className="control-row">
              <input 
                type="range" 
                min="0.1" 
                max="2.0" 
                step="0.05" 
                value={beta} 
                onChange={(e) => setBeta(parseFloat(e.target.value))}
                className="slider"
              />
              <span className="control-value">{beta.toFixed(2)}</span>
            </div>
          </label>
        </div>
        
        <div className="control-group">
          <label>
            <span className="control-label">σ (Sigma) - Incubation Rate</span>
            <span className="control-info">Rate of progression from exposed to infectious (0.1 to 0.5, inverse of 2-10 day incubation)</span>
            <div className="control-row">
              <input 
                type="range" 
                min="0.1" 
                max="0.5" 
                step="0.05" 
                value={sigma} 
                onChange={(e) => setSigma(parseFloat(e.target.value))}
                className="slider"
              />
              <span className="control-value">{sigma.toFixed(2)}</span>
            </div>
          </label>
        </div>
        
        <div className="control-group">
          <label>
            <span className="control-label">γ (Gamma) - Recovery Rate</span>
            <span className="control-info">Rate of recovery from infection (0.05 to 0.5, inverse of 2-20 day infectious period)</span>
            <div className="control-row">
              <input 
                type="range" 
                min="0.05" 
                max="0.5" 
                step="0.05" 
                value={gamma} 
                onChange={(e) => setGamma(parseFloat(e.target.value))}
                className="slider"
              />
              <span className="control-value">{gamma.toFixed(2)}</span>
            </div>
          </label>
        </div>
      </div>
      
      <div className="seir-chart">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}
