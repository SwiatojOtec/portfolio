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
    'nav.career': 'Кар\'єра',
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
    'career.cta.description': 'Поєднуючи досвід управління проектами з технічними навичками для створення інноваційних рішень',
    
    // Career Items
    'career.flooring.year': '2023 - Present',
    'career.flooring.title': 'Власник - Роздрібний бізнес підлогових покриттів',
    'career.flooring.company': 'STILL HOUSE',
    'career.flooring.description': 'Заснував та запустив бізнес, управляю всіма операційними та стратегічними процесами.',
    'career.flooring.achievement1': 'Заснував та запустив бізнес',
    'career.flooring.achievement2': 'Дослідив та налагодив партнерство з постачальниками',
    'career.flooring.achievement3': 'Впровадив систему управління складом',
    'career.flooring.achievement4': 'Розширив послуги, включивши монтаж',
    
    'career.construction.year': '2020-2023',
    'career.construction.title': 'Заступник директора',
    'career.construction.company': 'ПАН ПІВДЕНБУД',
    'career.construction.description': 'Управляв будівельними бригадами та забезпечував здачу проектів вчасно та в рамках бюджету.',
    'career.construction.achievement1': 'Управляв будівельними бригадами',
    'career.construction.achievement2': 'Керував комунікацією з клієнтами',
    'career.construction.achievement3': 'Впровадив системи відстеження',
    'career.construction.achievement4': 'Контролював виконання проектів',
    
    'career.marketing.year': '2019-2020',
    'career.marketing.title': 'Маркетинговий спеціаліст',
    'career.marketing.company': 'ПАН ПІВДЕНБУД',
    'career.marketing.description': 'Розробив та запустив корпоративний веб-сайт, планував та виконував кампанії Google Ads.',
    'career.marketing.achievement1': 'Розробив корпоративний веб-сайт',
    'career.marketing.achievement2': 'Планував кампанії Google Ads',
    'career.marketing.achievement3': 'Створив корпоративну ідентичність',
    'career.marketing.achievement4': 'Займався реєстрацією компанії',
    
    'career.education.year': '2016-2019',
    'career.education.title': 'Маркетинг та управління (BA)',
    'career.education.company': 'Університет економіки та гуманітарних наук - Варшава, Польща',
    'career.education.description': 'Вивчав управління маркетинговими проектами, оптимізацію процесів та адміністрування бізнесу.',
    'career.education.achievement1': 'Управління маркетинговими проектами',
    'career.education.achievement2': 'Оптимізація процесів',
    'career.education.achievement3': 'Адміністрування бізнесу',
    'career.education.achievement4': 'Міжнародний бізнес',
    
    // Projects Section
    'projects.title': 'Проекти',
    'projects.subtitle': 'Від автоматизації до веб-розробки - створюю рішення, які вирішують реальні проблеми',
    'projects.cta': 'Зв\'язатися зі мною',
    'projects.technologies': 'Технології:',
    'projects.features': 'Ключові особливості:',
    'projects.github': 'GitHub',
    'projects.liveDemo': 'Переглянути',
    'projects.jobScraper.title': 'Job Scraper Platform',
    'projects.jobScraper.description': 'Модульний парсер вакансій з кількох джерел для автоматизації пошуку роботи',
    'projects.jobScraper.tech': 'Python, Flask, SQLite, Selenium, BeautifulSoup, HTML, CSS, JavaScript',
    'projects.jobScraper.features': 'Парсинг з 9 платформ, фільтрація в реальному часі, управління статусами, RESTful API',
    'projects.photography.title': 'Photography Portfolio + Telegram Bot',
    'projects.photography.description': 'Професійне портфоліо фотографа Михайла Панкрат\'єва з сучасним дизайном та інтеграцією Telegram',
    'projects.photography.tech': 'HTML5, CSS3, Tailwind CSS, JavaScript, Python, Firebase, Telegram Bot API',
    'projects.photography.features': 'Завантаження фото через бота, галерея з фільтрами, хмарний бекенд, адаптивний дизайн',
    'projects.panParket.title': 'Pan Parket - Система управління магазином паркету',
    'projects.panParket.description': 'Повноцінна e-commerce система з адміністративною панеллю, складським обліком, генерацією рахунків та аналітикою продажів. Включає розрахунок по площі приміщення та управління всіма аспектами бізнесу.',
    'projects.panParket.tech': 'React + TypeScript, Node.js + Express, PostgreSQL, Prisma ORM, JWT Auth, Multer, React Query',
    'projects.panParket.features': 'Каталог товарів, кошик з розрахунком по площі, адмін панель, складський облік, генерація рахунків, аналітика продажів, управління замовленнями та клієнтами',
    'projects.adminDemo': 'Admin Tools Demo',
    
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
    
    // GitHub Explanation Modal
    'githubModal.title': 'Чому проект не на GitHub?',
    'githubModal.subtitle': 'Пояснення етичних та юридичних аспектів',
    'githubModal.purpose.title': 'Мета проекту',
    'githubModal.purpose.description': 'Це особистий, некомерційний інструмент, створений для автоматизації власного пошуку вакансій. Парсер розроблявся виключно для особистого використання та навчання, без наміру комерціалізації або масового поширення.',
    'githubModal.ethical.title': 'Етичні міркування',
    'githubModal.ethical.description': 'Я глибоко поважаю роботу сайтів з вакансіями та їх творців. Ці платформи створюють величезну цінність для роботодавців та шукачів роботи, інвестували значні ресурси в розробку та підтримку сервісів.',
    'githubModal.technical.title': 'Технічні заходи етичного парсингу',
    'githubModal.technical.description': 'При розробці я приділив особливу увагу "віжливому" збору даних. Парсер налаштований на роботу з низькою інтенсивністю (використання time.sleep()), щоб не створювати зайвого навантаження на сервери сайтів. Додаток поважає директиви файлу robots.txt та має кастомний User-Agent, що ідентифікує парсер як особистий навчальний проект.',
    'githubModal.legal.title': 'Юридична відповідність',
    'githubModal.legal.description': 'Парсинг даних з комерційних сайтів може порушувати їхні умови використання та українське законодавство про захист інтелектуальної власності. Я не хочу створювати прецеденти для зловживань та потенційних правопорушень.',
    'githubModal.protection.title': 'Захист та обмеження',
    'githubModal.protection.description': 'Мій проект демонструє технічні можливості, але має вбудовані обмеження для запобігання зловживанням. Код не призначений для масового використання та містить технічні бар\'єри для захисту інтересів сайтів з вакансіями.',
    'githubModal.alternative.title': 'Альтернативний підхід',
    'githubModal.alternative.description': 'Замість публікації коду, я демонструю функціональність через інтерактивну демо-версію. Це дозволяє показати мої навички та технічну компетентність, не порушуючи права інших та не створюючи ризиків для їх сервісів.',
    'githubModal.alternative.note': 'Демо-версія використовує мок-дані та не звертається до реальних сайтів',
    'githubModal.footer': 'Дякую за розуміння та підтримку етичного та відповідального підходу до розробки',
    'githubModal.close': 'Зрозуміло',
    
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
    'nav.career': 'Career',
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
    
    // Career Items
    'career.flooring.year': '2023 - Present',
    'career.flooring.title': 'Owner - Flooring Retail Business',
    'career.flooring.company': 'STILL HOUSE',
    'career.flooring.description': 'Founded and launched the business, managing all operational and strategic processes.',
    'career.flooring.achievement1': 'Founded and launched the business',
    'career.flooring.achievement2': 'Researched and partnered with suppliers',
    'career.flooring.achievement3': 'Implemented inventory management system',
    'career.flooring.achievement4': 'Expanded services to include installation',
    
    'career.construction.year': '2020-2023',
    'career.construction.title': 'Assistant Director',
    'career.construction.company': 'PAN PIVDENBUD',
    'career.construction.description': 'Managed construction crews and ensured project delivery on time and within budget.',
    'career.construction.achievement1': 'Managed construction crews',
    'career.construction.achievement2': 'Led communication with clients',
    'career.construction.achievement3': 'Implemented tracking systems',
    'career.construction.achievement4': 'Oversaw project execution',
    
    'career.marketing.year': '2019-2020',
    'career.marketing.title': 'Marketing Specialist',
    'career.marketing.company': 'PAN PIVDENBUD',
    'career.marketing.description': 'Developed and launched corporate website, planned and executed Google Ads campaigns.',
    'career.marketing.achievement1': 'Developed corporate website',
    'career.marketing.achievement2': 'Planned Google Ads campaigns',
    'career.marketing.achievement3': 'Designed corporate identity',
    'career.marketing.achievement4': 'Handled company registration',
    
    'career.education.year': '2016-2019',
    'career.education.title': 'Marketing and Management (BA)',
    'career.education.company': 'University of Economics and Human Sciences - Warsaw, Poland',
    'career.education.description': 'Studied marketing project management, process optimization, and business administration.',
    'career.education.achievement1': 'Marketing project management',
    'career.education.achievement2': 'Process optimization',
    'career.education.achievement3': 'Business administration',
    'career.education.achievement4': 'International business',
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.subtitle': 'From automation to web development - creating solutions that solve real problems',
    'projects.cta': 'Get in Touch',
    'projects.technologies': 'Technologies:',
    'projects.features': 'Key Features:',
    'projects.github': 'GitHub',
    'projects.liveDemo': 'Check it',
    'projects.jobScraper.title': 'Job Scraper Platform',
    'projects.jobScraper.description': 'Modular, multi-source vacancy parser to automate the job search process',
    'projects.jobScraper.tech': 'Python, Flask, SQLite, Selenium, BeautifulSoup, HTML, CSS, JavaScript',
    'projects.jobScraper.features': 'Parsed data from 9 job platforms, real-time filtering, status management, RESTful API',
    'projects.photography.title': 'Photography Portfolio + Telegram Bot',
    'projects.photography.description': 'Professional photography portfolio for Михайло Панкрат\'єв with modern design and Telegram integration',
    'projects.photography.tech': 'HTML5, CSS3, Tailwind CSS, JavaScript, Python, Firebase, Telegram Bot API',
    'projects.photography.features': 'Photo upload via bot, gallery with filters, cloud backend, responsive design',
    'projects.panParket.title': 'Pan Parket - Parquet Store Management System',
    'projects.panParket.description': 'Full-featured e-commerce system with administrative panel, inventory management, invoice generation and sales analytics. Includes area-based calculations and comprehensive business management.',
    'projects.panParket.tech': 'React + TypeScript, Node.js + Express, PostgreSQL, Prisma ORM, JWT Auth, Multer, React Query',
    'projects.panParket.features': 'Product catalog, area-based shopping cart, admin panel, inventory management, invoice generation, sales analytics, order and customer management',
    'projects.adminDemo': 'Admin Tools Demo',
    
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
    
    // GitHub Explanation Modal
    'githubModal.title': 'Why is the project not on GitHub?',
    'githubModal.subtitle': 'Explanation of ethical and legal aspects',
    'githubModal.purpose.title': 'Project Purpose',
    'githubModal.purpose.description': 'This is a personal, non-commercial tool created for automating my own job search. The parser was developed exclusively for personal use and learning, without any intention of commercialization or mass distribution.',
    'githubModal.ethical.title': 'Ethical Considerations',
    'githubModal.ethical.description': 'I deeply respect the work of job sites and their creators. These platforms create enormous value for employers and job seekers, investing significant resources in development and service maintenance.',
    'githubModal.technical.title': 'Technical Measures for Ethical Scraping',
    'githubModal.technical.description': 'During development, I paid special attention to "polite" data collection. The parser is configured to work with low intensity (using time.sleep()) to avoid creating excessive load on site servers. The application respects robots.txt directives and has a custom User-Agent that identifies the parser as a personal educational project.',
    'githubModal.legal.title': 'Legal Compliance',
    'githubModal.legal.description': 'Scraping data from commercial websites may violate their terms of service and Ukrainian legislation on intellectual property protection. I do not want to create precedents for abuse or potential legal violations.',
    'githubModal.protection.title': 'Protection and Limitations',
    'githubModal.protection.description': 'My project demonstrates technical capabilities but has built-in limitations to prevent abuse. The code is not intended for mass use and contains technical barriers to protect the interests of job sites.',
    'githubModal.alternative.title': 'Alternative Approach',
    'githubModal.alternative.description': 'Instead of publishing code, I demonstrate functionality through an interactive demo version. This allows me to showcase my skills and technical competence without violating others\' rights or creating risks for their services.',
    'githubModal.alternative.note': 'Demo version uses mock data and does not access real websites',
    'githubModal.footer': 'Thank you for understanding and supporting the ethical and responsible approach to development',
    'githubModal.close': 'Got it',
    
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