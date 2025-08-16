'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { Mail, Linkedin, Send } from 'lucide-react'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const result = await emailjs.sendForm(
        'service_23bt8s4', // Ваш Service ID
        'template_p3rml6v', // Ваш Template ID
        formRef.current!,
        'wgQecvvVwpxHeaj1U' // Ваш Public Key
      )
      
      setSubmitStatus('success')
      formRef.current?.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-dark-400">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="bg-dark-300 rounded-2xl p-8 border border-primary-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t('contact.title')}
                </h3>
                
                <div className="space-y-6">
                  <motion.a
                    href={`mailto:${t('contact.email')}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-dark-200 rounded-xl hover:bg-dark-100 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium">{t('contact.email')}</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href={t('contact.linkedin.url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-dark-200 rounded-xl hover:bg-dark-100 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">LinkedIn</p>
                      <p className="text-white font-medium">{t('contact.linkedin')}</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-600/20 to-blue-600/20 rounded-2xl p-8 border border-primary-500/30">
                <h4 className="text-xl font-bold text-white mb-4">
                  {t('contact.experience.title')}
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full mr-3"></div>
                    {t('contact.experience.item1')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-3"></div>
                    {t('contact.experience.item2')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3"></div>
                    {t('contact.experience.item3')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mr-3"></div>
                    {t('contact.experience.item4')}
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-dark-300 rounded-2xl p-8 border border-primary-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('contact.form.title')}
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  className="w-full px-4 py-3 bg-dark-200 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className="w-full px-4 py-3 bg-dark-200 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-200 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300 resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full px-6 py-3 font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Відправляється...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t('contact.form.send')}</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-600/20 border border-green-500/30 rounded-lg"
              >
                <p className="text-green-400 text-center">
                  ✅ Повідомлення успішно відправлено! Дякую за звернення.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-600/20 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-center">
                  ❌ Помилка відправки. Спробуйте ще раз або напишіть на email.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 