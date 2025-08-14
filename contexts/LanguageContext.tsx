'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import RealisticSwitch from '../components/RealisticSwitch'
import { playClickSound } from '../utils/audioUtils'

type Language = 'uk' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  openModal: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  uk: {
    // Navigation
    'nav.home': 'Головна',
    'nav.projects': 'Проекти',
    'nav.skills': 'Навички',
    'nav.contact': 'Контакти',
    
    // Hero Section
    'hero.title': 'Привіт, я Микола!',
    'hero.subtitle': 'Project Manager & Developer',
    'hero.description': 'Досвідчений проект-менеджер з технічною підготовкою та навичками розробки. Спеціалізуюся на управлінні складними проектами, координації команд та створенні інноваційних рішень. Поєдную стратегічне мислення з технічною експертизою для досягнення визначених цілей.',
    'hero.cta': 'Дізнатися більше',
    
    // Skills Section
    'skills.title': 'Навички та компетенції',
    'skills.subtitle': 'Комбіную досвід управління проектами з технічними навичками для створення ефективних рішень',
    
    // Skill Categories
    'skills.projectManagement': 'Project Management',
    'skills.methodologies': 'Methodologies',
    'skills.processOptimization': 'Process Optimization',
    'skills.teamManagement': 'Team Management',
    'skills.businessProduct': 'Business & Product',
    'skills.programming': 'Programming',
    'skills.cloudDevops': 'Cloud & DevOps',
    'skills.toolsPlatforms': 'Tools & Platforms',
    'skills.languages': 'Languages',
    
    // Career Timeline
    'career.title': 'Кар\'єрний шлях',
    'career.subtitle': '7+ років досвіду в управлінні проектами, від будівельної галузі до IT-сфери',
    'career.cta': 'Готовий до нових викликів',
    'career.cta.description': 'Поєдную досвід управління проектами з технічними навичками для створення інноваційних рішень',
    
    // Projects Section
    'projects.title': 'Проекти',
    'projects.subtitle': 'Від автоматизації до веб-розробки - створюю рішення, які вирішують реальні проблеми',
    'projects.cta': 'Зв\'язатися зі мною',
    'projects.technologies': 'Технології:',
    'projects.features': 'Ключові особливості:',
    'projects.github': 'GitHub',
    'projects.liveDemo': 'Live Demo',
    'projects.jobScraper.title': 'Job Scraper Platform',
    'projects.jobScraper.description': 'Модульний парсер вакансій з кількох джерел для автоматизації пошуку роботи',
    'projects.jobScraper.tech': 'Python, Flask, SQLite, Selenium, BeautifulSoup, HTML, CSS, JavaScript',
    'projects.jobScraper.features': 'Парсинг з 9 платформ, фільтрація в реальному часі, управління статусами, RESTful API',
    'projects.photography.title': 'Photography Portfolio + Telegram Bot',
    'projects.photography.description': 'Повноцінне портфоліо фотографа з інтеграцією Telegram',
    'projects.photography.tech': 'HTML5, CSS3, Tailwind CSS, JavaScript, Python, Firebase, Telegram Bot API',
    'projects.photography.features': 'Завантаження фото через бота, галерея з фільтрами, хмарний бекенд',
    
    // Contact Section
    'contact.title': 'Зв\'язатися зі мною',
    'contact.subtitle': 'Завжди відкритий до нових можливостей та співпраці. Давайте обговоримо ваш проект!',
    'contact.email': 'nikolay4pankratiev@gmail.com',
    'contact.linkedin': 'LinkedIn',
    'contact.linkedin.url': 'https://www.linkedin.com/in/mykola-pankratiev-775a1b180/',
    'contact.experience.title': 'Досвід та компетенції',
    'contact.experience.item1': '7+ років досвіду в управлінні проектами',
    'contact.experience.item2': 'Досвід в будівельній галузі та роздрібному бізнесі',
    'contact.experience.item3': 'Технічні навички: Python, JavaScript, автоматизація',
    'contact.experience.item4': 'Володіння трьома мовами: українська, польська, англійська',
    'contact.form.title': 'Написати повідомлення',
    'contact.form.name': 'Ім\'я',
    'contact.form.namePlaceholder': 'Ваше ім\'я',
    'contact.form.email': 'Email',
    'contact.form.message': 'Повідомлення',
    'contact.form.messagePlaceholder': 'Опишіть ваш проект або питання...',
    'contact.form.send': 'Написати повідомлення',
    
    // Modal
    'modal.title': 'Виберіть мову',
    'modal.subtitle': 'Оберіть мову для перегляду сайту',
    'modal.ukrainian': 'Українська',
    'modal.english': 'English',
    'modal.done': 'Готово',
    'nav.changeLanguage': 'Змінити мову',
    
    // Footer
    'footer.name': 'Микола Панкрат\'єв',
    'footer.description': 'Project Manager & Developer з 7-річним досвідом в управлінні проектами та технічними навичками.',
    'footer.quickLinks': 'Швидкі посилання',
    'footer.contacts': 'Контакти',
    'footer.languages': 'Мови: Українська, Польська, Англійська',
    'footer.rights': '© 2025 Всі права захищені. Зроблено з ❤️'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Hi, I\'m Mykola',
    'hero.subtitle': 'Project Manager & Developer',
    'hero.description': 'Experienced project manager with technical background and development skills. Specialize in managing complex projects, coordinating teams, and creating innovative solutions. Combine strategic thinking with technical expertise to achieve defined goals.',
    'hero.cta': 'Learn More',
    
    // Skills Section
    'skills.title': 'Skills & Competencies',
    'skills.subtitle': 'Combining project management experience with technical skills to create effective solutions',
    
    // Skill Categories
    'skills.projectManagement': 'Project Management',
    'skills.methodologies': 'Methodologies',
    'skills.processOptimization': 'Process Optimization',
    'skills.teamManagement': 'Team Management',
    'skills.businessProduct': 'Business & Product',
    'skills.programming': 'Programming',
    'skills.cloudDevops': 'Cloud & DevOps',
    'skills.toolsPlatforms': 'Tools & Platforms',
    'skills.languages': 'Languages',
    
    // Career Timeline
    'career.title': 'Career Path',
    'career.subtitle': '7+ years of experience in project management, from construction industry to IT sphere',
    'career.cta': 'Ready for New Challenges',
    'career.cta.description': 'Combining project management experience with technical skills to create innovative solutions',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.subtitle': 'From automation to web development - creating solutions that solve real problems',
    'projects.cta': 'Get in Touch',
    'projects.technologies': 'Technologies:',
    'projects.features': 'Key Features:',
    'projects.github': 'GitHub',
    'projects.liveDemo': 'Live Demo',
    'projects.jobScraper.title': 'Job Scraper Platform',
    'projects.jobScraper.description': 'Modular, multi-source vacancy parser to automate the job search process',
    'projects.jobScraper.tech': 'Python, Flask, SQLite, Selenium, BeautifulSoup, HTML, CSS, JavaScript',
    'projects.jobScraper.features': 'Parsed data from 9 job platforms, real-time filtering, status management, RESTful API',
    'projects.photography.title': 'Photography Portfolio + Telegram Bot',
    'projects.photography.description': 'Full-stack photography portfolio with seamless Telegram integration',
    'projects.photography.tech': 'HTML5, CSS3, Tailwind CSS, JavaScript, Python, Firebase, Telegram Bot API',
    'projects.photography.features': 'Photo upload via bot, gallery with filters, cloud backend',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Always open to new opportunities and collaboration. Let\'s discuss your project!',
    'contact.email': 'nikolay4pankratiev@gmail.com',
    'contact.linkedin': 'LinkedIn',
    'contact.linkedin.url': 'https://www.linkedin.com/in/mykola-pankratiev-775a1b180/',
    'contact.experience.title': 'Experience & Competencies',
    'contact.experience.item1': '7+ years of experience in project management',
    'contact.experience.item2': 'Experience in construction industry and retail business',
    'contact.experience.item3': 'Technical skills: Python, JavaScript, automation',
    'contact.experience.item4': 'Proficiency in three languages: Ukrainian, Polish, English',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Describe your project or question...',
    'contact.form.send': 'Send Message',
    
    // Modal
    'modal.title': 'Choose Language',
    'modal.subtitle': 'Select language to view the site',
    'modal.ukrainian': 'Ukrainian',
    'modal.english': 'English',
    'modal.done': 'Done',
    'nav.changeLanguage': 'Change Language',
    
    // Footer
    'footer.name': 'Mykola Pankratiev',
    'footer.description': 'Project Manager & Developer with 7 years of experience in project management and technical skills.',
    'footer.quickLinks': 'Quick Links',
    'footer.contacts': 'Contacts',
    'footer.languages': 'Languages: Ukrainian, Polish, English',
    'footer.rights': '© 2025 All rights reserved. Made with ❤️'
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('uk')
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem('language') as Language
    const hasVisited = localStorage.getItem('hasVisited')
    
    if (savedLanguage && (savedLanguage === 'uk' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
    
    if (!hasVisited) {
      setShowModal(true)
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    playClickSound()
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  const openModal = () => setShowModal(true)

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t, openModal }}>
      {children}
      {mounted && showModal && (
        <LanguageModal 
          onLanguageSelect={handleLanguageChange}
          onClose={() => setShowModal(false)}
          t={t}
          currentLanguage={language}
        />
      )}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageModalProps {
  onLanguageSelect: (lang: Language) => void
  onClose: () => void
  t: (key: string) => string
  currentLanguage: Language
}

function LanguageModal({ onLanguageSelect, onClose, t, currentLanguage }: LanguageModalProps) {
  const handleToggle = () => {
    const newLanguage = currentLanguage === 'uk' ? 'en' : 'uk'
    onLanguageSelect(newLanguage)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
      onClick={onClose}
    >
      <div
        className="bg-dark-300 p-8 w-full max-w-lg shadow-2xl border border-primary-500/30"
        style={{ 
          borderRadius: '24px',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          {t('modal.title')}
        </h2>
        <p className="text-gray-300 text-center mb-8">
          {t('modal.subtitle')}
        </p>
        
        <div className="flex justify-center mb-8">
          <RealisticSwitch
            isOn={currentLanguage === 'en'}
            onToggle={handleToggle}
            leftLabel={t('modal.ukrainian')}
            rightLabel={t('modal.english')}
            leftFlag="🇺🇦"
            rightFlag="🇺🇸"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            {t('modal.done')}
          </button>
        </div>
      </div>
    </div>
  )
}