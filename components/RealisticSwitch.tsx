'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface RealisticSwitchProps {
  isOn: boolean
  onToggle: () => void
  leftLabel: string
  rightLabel: string
  leftFlag: string
  rightFlag: string
}

const RealisticSwitch = ({ 
  isOn, 
  onToggle, 
  leftLabel, 
  rightLabel, 
  leftFlag, 
  rightFlag 
}: RealisticSwitchProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
    onToggle()
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Labels */}
      <div className="flex justify-between w-full max-w-lg">
        <div className={`text-center transition-all duration-300 ${!isOn ? 'text-primary-400 font-bold' : 'text-gray-400'}`}>
          <div className="text-4xl mb-2">{leftFlag}</div>
          <div className="text-base font-medium">{leftLabel}</div>
        </div>
        <div className={`text-center transition-all duration-300 ${isOn ? 'text-primary-400 font-bold' : 'text-gray-400'}`}>
          <div className="text-4xl mb-2">{rightFlag}</div>
          <div className="text-base font-medium">{rightLabel}</div>
        </div>
      </div>

      {/* Switch Container */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Switch Plate */}
        <div 
          className="relative w-32 h-40 bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-lg shadow-2xl border-2 border-gray-300"
          style={{
            background: `
              linear-gradient(145deg, #f8f9fa 0%, #ffffff 50%, #e9ecef 100%),
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 50%)
            `,
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.8),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `
          }}
        >
          {/* Screws */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner">
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600">
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-0.5 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner">
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600">
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-0.5 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Switch Cutout */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-20 rounded-md"
            style={{
              background: `
                linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)
              `,
              boxShadow: `
                inset 0 4px 8px rgba(0,0,0,0.6),
                inset 0 -2px 4px rgba(255,255,255,0.1)
              `
            }}
          >
            {/* Switch Button */}
            <motion.button
              className="absolute inset-1 rounded-sm cursor-pointer focus:outline-none"
              onClick={handleClick}
              animate={{
                rotateX: isOn ? -15 : 15,
                y: isOn ? -2 : 2,
                scale: isPressed ? 0.95 : 1
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.15
              }}
              style={{
                background: `
                  linear-gradient(${isOn ? '145deg' : '325deg'}, 
                    #f8f9fa 0%, 
                    #ffffff 30%, 
                    #e9ecef 70%, 
                    #dee2e6 100%
                  )
                `,
                boxShadow: `
                  0 ${isOn ? '2px 8px' : '4px 12px'} rgba(0,0,0,0.4),
                  inset 0 1px 0 rgba(255,255,255,0.9),
                  inset 0 -1px 0 rgba(0,0,0,0.1),
                  0 0 0 1px rgba(0,0,0,0.1)
                `,
                transformStyle: 'preserve-3d' as const,
              }}
            >
              {/* Switch Button Face */}
              <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-white/50 to-transparent"></div>
              
              {/* Switch Button Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-sm font-bold transition-all duration-200 ${
                  isOn ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isOn ? 'ON' : 'OFF'}
                </div>
              </div>

              {/* Switch Button Highlight */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/3 rounded-t-sm"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)'
                }}
              ></div>
            </motion.button>
          </div>

          {/* Switch Plate Highlight */}
          <div 
            className="absolute inset-1 rounded-md pointer-events-none"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.4), transparent 30%)'
            }}
          ></div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: isOn 
              ? '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)'
              : '0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2)'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Status Indicator */}
      <div className="flex items-center space-x-3">
        <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
          isOn ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'
        }`}></div>
        <span className="text-lg text-gray-300 font-medium">
          {isOn ? 'English Mode' : 'Українська'}
        </span>
      </div>
    </div>
  )
}

export default RealisticSwitch 