'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { ExternalLink, Github, Globe, Bot } from 'lucide-react'

import SimpleModal from './SimpleModal'

export default function Projects() {
  const { t } = useLanguage()
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const projects = [
    {
      title: t('projects.jobScraper.title'),
      description: t('projects.jobScraper.description'),
      tech: t('projects.jobScraper.tech'),
      features: t('projects.jobScraper.features'),
      image: '/api/placeholder/600/400',
      github: '#',
      live: '#',
      icon: Globe,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: t('projects.photography.title'),
      description: t('projects.photography.description'),
      tech: t('projects.photography.tech'),
      features: t('projects.photography.features'),
      image: '/api/placeholder/600/400',
      github: '#',
      live: '#',
      icon: Bot,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-dark-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                      <project.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </motion.div>

              {/* Project Content */}
              <motion.div
                className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">{t('projects.technologies')}</h4>
                  <p className="text-gray-400">{project.tech}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-3">{t('projects.features')}</h4>
                  <p className="text-gray-400">{project.features}</p>
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-dark-400 hover:bg-dark-500 text-white rounded-lg transition-colors duration-300 border border-primary-500/30 hover:border-primary-500/60"
                  >
                    <Github size={20} />
                    <span>{t('projects.github')}</span>
                  </motion.a>
                  
                  <motion.button
                    onClick={() => project.title.includes('Job Scraper') ? setIsDemoModalOpen(true) : null}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                    <span>{t('projects.liveDemo')}</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>



        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
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
              Зв&apos;язатися зі мною
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Simple Modal */}
      <SimpleModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </section>
  )
} 