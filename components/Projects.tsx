'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { ExternalLink, Github, Bot, Globe } from 'lucide-react'

export default function Projects() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t('projects.panParket.title'),
      description: t('projects.panParket.description'),
      tech: t('projects.panParket.tech'),
      features: t('projects.panParket.features'),
      image: '/api/placeholder/600/400',
      github: '#',
      live: 'https://www.pan-parket.com',
      icon: Globe,
      color: 'from-green-500 to-green-600'
    },
    {
      title: t('projects.photography.title'),
      description: t('projects.photography.description'),
      tech: t('projects.photography.tech'),
      features: t('projects.photography.features'),
      image: '/api/placeholder/600/400',
      github: 'https://github.com/SwiatojOtec/photo-portfolio',
      live: 'https://photo-pank-9a004.web.app',
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
                  {/* Картинка для Photography Portfolio */}
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <img
                      src="/images/photo-portfolio-screenshot.png"
                      alt="Photography Portfolio - Михайло Панкрат'єв"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
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
                  
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300"
                  >
                    <ExternalLink size={20} />
                    <span>{t('projects.liveDemo')}</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>




      </div>

    </section>
  )
} 