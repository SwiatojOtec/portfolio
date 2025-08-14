'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  magnetic?: boolean
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick, 
  magnetic = true 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    x.set(mouseX / 10)
    y.set(mouseY / 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
} 