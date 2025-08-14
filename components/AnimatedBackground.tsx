'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Устанавливаем размер canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Создаем частицы
    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(100, Math.floor(window.innerWidth / 10))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`
        })
      }
      return particles
    }

    particlesRef.current = createParticles()

    // Анимация
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Обновляем и рисуем частицы
      particlesRef.current.forEach((particle, index) => {
        // Движение
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Притяжение к мыши
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const force = (200 - distance) / 200
          particle.vx += dx * force * 0.0001
          particle.vy += dy * force * 0.0001
        }
        
        // Границы
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8
        
        // Ограничиваем скорость
        particle.vx = Math.max(-2, Math.min(2, particle.vx))
        particle.vy = Math.max(-2, Math.min(2, particle.vy))
        
        // Рисуем частицу
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
        
        // Соединяем близкие частицы
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index === otherIndex) return
          
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = (100 - distance) / 100 * 0.3
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })
      
      // Сброс прозрачности
      ctx.globalAlpha = 1
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Обработчик мыши
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
} 