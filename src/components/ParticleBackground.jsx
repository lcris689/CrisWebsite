import React, { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef()
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    let mouse = { x: null, y: null, radius: 150 }
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.3
      }
      
      update() {
        // Boundary bouncing
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
        
        // Mouse interaction - repulsion
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouse.radius && mouse.x !== null) {
          const force = (mouse.radius - distance) / mouse.radius
          const angle = Math.atan2(dy, dx)
          this.vx -= Math.cos(angle) * force * 0.2
          this.vy -= Math.sin(angle) * force * 0.2
        }
        
        // Apply velocity with damping
        this.vx *= 0.99
        this.vy *= 0.99
        this.x += this.vx
        this.y += this.vy
        
        // Gentle drift back to center if too far
        if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.1
        if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.1
      }
      
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`
        ctx.fill()
      }
    }
    
    // Initialize particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ))
    }
    
    // Connect nearby particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
    
    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    
    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }
    
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="particle-canvas" />
}
