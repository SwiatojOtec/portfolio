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
            <div className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden">
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

              {/* Заголовок модального вікна */}
              <motion.div
                className="absolute top-4 left-4 z-10 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold drop-shadow-lg">💼 Job Scraper Platform</h2>
                <p className="text-gray-200 text-sm drop-shadow-lg">Демо версія</p>
              </motion.div>

              {/* Контейнер демо */}
              <motion.div
                className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <JobScraperDemo />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SimpleModal; 