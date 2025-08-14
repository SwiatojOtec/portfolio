'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { Mail, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-500 border-t border-primary-500/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {t('footer.name')}
            </h3>
            <p className="text-gray-300 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <motion.a
                href={`mailto:${t('contact.email')}`}
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-primary-600 rounded-lg text-white hover:bg-primary-700 transition-colors duration-300"
              >
                <Mail size={20} />
              </motion.a>
              <motion.a
                href={t('contact.linkedin.url')}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors duration-300"
              >
                <Github size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {t('nav.skills')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {t('nav.projects')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-300"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {t('footer.contacts')}
            </h3>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="text-primary-400">Email:</span> {t('contact.email')}
              </p>
              <p>
                <span className="text-primary-400">LinkedIn:</span> 
                <a 
                  href={t('contact.linkedin.url')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 ml-1"
                >
                  {t('footer.name')}
                </a>
              </p>
              <p>
                <span className="text-primary-400">Languages:</span> {t('footer.languages')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400">
            {t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 