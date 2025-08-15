'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Target, Users, Settings, Code, Globe, Wrench, Cloud, BarChart3, Zap, GitBranch, Database } from 'lucide-react'

interface SkillData {
  name: string
  icon: any
  color: string
  skills: string[]
  particles: number
}

export default function AnimatedSkills() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const skills: SkillData[] = [
    {
      name: t('skills.projectManagement'),
      icon: Target,
      color: "from-blue-500 to-blue-600",
      skills: ['Campaign planning', 'Budgeting', 'Execution', 'Timeline management'],
      particles: 15
    },
    {
      name: t('skills.methodologies'),
      icon: GitBranch,
      color: "from-emerald-500 to-emerald-600",
      skills: ['Agile', 'Scrum', 'Kanban', 'Waterfall'],
      particles: 12
    },
    {
      name: t('skills.processOptimization'),
      icon: Settings,
      color: "from-green-500 to-green-600",
      skills: ['Workflow setup', 'Process automation', 'Efficiency improvement', 'CRM setup'],
      particles: 12
    },
    {
      name: t('skills.teamManagement'),
      icon: Users,
      color: "from-purple-500 to-purple-600",
      skills: ['Leadership', 'Conflict resolution', 'Team coordination', 'Communication'],
      particles: 10
    },
    {
      name: t('skills.businessProduct'),
      icon: BarChart3,
      color: "from-pink-500 to-pink-600",
      skills: ['Business Analysis', 'Product Prototyping', 'UX principles', 'MVP Development'],
      particles: 11
    },
    {
      name: t('skills.programming'),
      icon: Code,
      color: "from-red-500 to-red-600",
      skills: ['Python', 'JavaScript', 'HTML/CSS', 'SQL', 'API Integration', 'Automation scripts'],
      particles: 8
    },
    {
      name: t('skills.cloudDevops'),
      icon: Cloud,
      color: "from-cyan-500 to-cyan-600",
      skills: ['Firebase', 'Vercel', 'PythonAnywhere', 'GitHub', 'CI/CD basics'],
      particles: 14
    },
    {
      name: t('skills.toolsPlatforms'),
      icon: Wrench,
      color: "from-orange-500 to-orange-600",
      skills: ['Jira', 'Asana', 'Trello', 'Notion', 'Google Workspace', 'Slack'],
      particles: 14
    },
    {
      name: t('skills.languages'),
      icon: Globe,
      color: "from-indigo-500 to-indigo-600",
      skills: ['Ukrainian (Native)', 'Polish (Fluent)', 'English (Intermediate)'],
      particles: 6
    }
  ]

  return (
    <section id="skills" className="py-20 bg-dark-400 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          key={`${t('skills.title')}-${t('skills.subtitle')}`} // Force re-render when language changes
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5
                }}
                className="bg-dark-300 rounded-2xl p-6 border border-primary-500/30 hover:border-primary-500/60 transition-all duration-300 h-full"
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} mb-6`}>
                  <skill.icon className="w-8 h-8 text-white" />
                </div>

                {/* Skill name */}
                <h3 className="text-xl font-bold text-white mb-4">
                  {skill.name}
                </h3>

                {/* Skills list */}
                <ul className="space-y-2 mb-4">
                  {skill.skills.map((skillItem, skillIndex) => (
                    <li key={skillIndex} className="text-gray-300 text-sm flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${skill.color}`}></div>
                      {skillItem}
                    </li>
                  ))}
                </ul>

                {/* Floating particles around card */}
                {hoveredSkill === index && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {[...Array(8)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        initial={{ 
                          x: Math.random() * 200 - 100, 
                          y: Math.random() * 200 - 100, 
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{ 
                          x: Math.random() * 200 - 100, 
                          y: Math.random() * 200 - 100, 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: particleIndex * 0.2 
                        }}
                        className="absolute w-2 h-2 bg-primary-400 rounded-full"
                        style={{
                          left: `${50 + (particleIndex % 3 - 1) * 30}%`,
                          top: `${50 + Math.floor(particleIndex / 3) * 30}%`
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 blur-xl`}
                animate={{
                  opacity: hoveredSkill === index ? 0.3 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 