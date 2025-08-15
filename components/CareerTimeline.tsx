'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Briefcase, Building, Rocket, Award, Code, Users } from 'lucide-react'
import CareerAnimation from './CareerAnimations'

interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
  icon: any
  color: string
  achievements: string[]
  animationType: 'flooring' | 'construction' | 'marketing' | 'education'
}

export default function CareerTimeline() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const handleCardVisibility = (index: number, isVisible: boolean) => {
    setVisibleCards(prev => {
      const newSet = new Set(prev)
      if (isVisible) {
        newSet.add(index)
      } else {
        newSet.delete(index)
      }
      return newSet
    })
  }

  const timelineItems: TimelineItem[] = [
    {
      year: "2023 - Present",
      title: "Owner - Flooring Retail Business",
      company: "STILL HOUSE",
      description: "Founded and launched the business, managing all operational and strategic processes.",
      icon: Building,
      color: "from-blue-500 to-blue-600",
      animationType: 'flooring',
      achievements: [
        "Founded and launched the business",
        "Researched and partnered with suppliers",
        "Implemented inventory management system",
        "Expanded services to include installation"
      ]
    },
    {
      year: "2020-2023",
      title: "Assistant Director",
      company: "PAN PIVDENBUD",
      description: "Managed construction crews and ensured project delivery on time and within budget.",
      icon: Users,
      color: "from-green-500 to-green-600",
      animationType: 'construction',
      achievements: [
        "Managed construction crews",
        "Led communication with clients",
        "Implemented tracking systems",
        "Oversaw project execution"
      ]
    },
    {
      year: "2019-2020",
      title: "Marketing Specialist",
      company: "PAN PIVDENBUD",
      description: "Developed and launched corporate website, planned and executed Google Ads campaigns.",
      icon: Rocket,
      color: "from-purple-500 to-purple-600",
      animationType: 'marketing',
      achievements: [
        "Developed corporate website",
        "Planned Google Ads campaigns",
        "Designed corporate identity",
        "Handled company registration"
      ]
    },
    {
      year: "2016-2019",
      title: "Marketing and Management (BA)",
      company: "University of Economics and Human Sciences - Warsaw, Poland",
      description: "Studied marketing project management, process optimization, and business administration.",
      icon: Award,
      color: "from-orange-500 to-orange-600",
      animationType: 'education',
      achievements: [
        "Marketing project management",
        "Process optimization",
        "Business administration",
        "International business"
      ]
    }
  ]

  return (
    <section id="career" className="py-20 bg-dark-300 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('career.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('career.subtitle')}
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Центральная линия */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 via-blue-500 to-purple-500" />
          
          {/* Timeline items */}
          <div className="space-y-16"> {/* Уменьшил отступы с 32 на 16 */}
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-dark-400 rounded-2xl p-6 border border-primary-500/30 hover:border-primary-500/60 transition-all duration-300"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="text-primary-400 font-semibold text-sm mb-2">
                      {item.year}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    
                    <div className="text-blue-400 font-medium mb-3">
                      {item.company}
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      {item.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-400 text-sm"
                        >
                          <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${item.color}`}></div>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="relative"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} shadow-lg`} />
                    <motion.div
                      className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-400 to-blue-400 opacity-0"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>
                </div>

                {/* Animation Area */}
                <div className="w-5/12 flex justify-center relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                    viewport={{ once: true }}
                    onViewportEnter={() => handleCardVisibility(index, true)}
                    onViewportLeave={() => handleCardVisibility(index, false)}
                    className="w-full"
                  >
                    <CareerAnimation 
                      type={item.animationType} 
                      isVisible={visibleCards.has(index)}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 rounded-2xl p-8 border border-primary-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('career.cta')}
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              {t('career.cta.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              {t('projects.cta')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 