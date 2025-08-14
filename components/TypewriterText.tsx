'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
}

const TypewriterText = ({ text, delay = 100, className = '' }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-1 h-8 bg-primary-500 ml-1"
      />
    </span>
  )
}

export default TypewriterText 