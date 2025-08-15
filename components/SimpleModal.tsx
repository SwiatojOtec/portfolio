'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobScraperDemo from './JobScraperDemo';
import { X } from 'lucide-react';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Фоновий оверлей */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Модальне вікно */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <div className="relative w-full max-w-8xl max-h-[90vh] overflow-hidden">
              {/* Кнопка закриття */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <X size={24} />
              </motion.button>

              {/* Двоколонковий контейнер */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
                {/* Ліва колонка - Демо */}
                <motion.div
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="p-4 bg-gray-800 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white">🚀 Демо версія</h3>
                    <p className="text-sm text-gray-300">Спробуйте функціональність</p>
                  </div>
                  <div className="h-full">
                    <JobScraperDemo />
                  </div>
                </motion.div>

                {/* Права колонка - Опис проекту */}
                <motion.div
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="p-4 bg-gray-800 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white">📋 Опис проекту</h3>
                    <p className="text-sm text-gray-300">Деталі та технології</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {/* Заголовок проекту */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Job Scraper Platform</h2>
                      <p className="text-gray-300 leading-relaxed">
                        Модульний парсер вакансій з кількох джерел для автоматизації пошуку роботи
                      </p>
                    </div>

                    {/* Технології */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">🛠️ Технології</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm">Python</span>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm">Flask</span>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm">SQLite</span>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm">Selenium</span>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm">BeautifulSoup</span>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm">HTML/CSS/JS</span>
                      </div>
                    </div>

                    {/* Ключові особливості */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">✨ Ключові особливості</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Парсинг з 11 українських платформ пошуку роботи
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Фільтрація в реальному часі
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Система управління статусами
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          RESTful API
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          Автоматичне видалення дублікатів
                        </li>
                      </ul>
                    </div>

                    {/* Підтримувані сайти */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">🌐 Підтримувані сайти</h4>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">DOU.ua</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">Work.ua</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">Djinni</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">Robota.ua</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">HappyMonday</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">Jobs.ua</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">Jooble.ua</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">GRC.ua</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">Jobspresso</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">GenTech</span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded">Risk.inc</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SimpleModal; 