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

                {/* Права колонка - Візуалізація проекту */}
                <motion.div
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl relative"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* Заголовок поверх картинки */}
                  <div className="absolute top-4 left-4 z-10">
                    <h3 className="text-lg font-semibold text-white drop-shadow-lg">🎯 Візуалізація проекту</h3>
                    <p className="text-sm text-gray-200 drop-shadow-lg">Skill Matching концепція</p>
                  </div>
                  
                  {/* Картинка, що заповнює весь прямокутник */}
                  <div className="w-full h-full">
                    <img
                      src="/images/skill-matching-concept.png"
                      alt="Skill Matching - концепція збору та обробки даних з різних платформ"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  
                  {/* Напівпрозорий оверлей для кращої читабельності заголовка */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
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