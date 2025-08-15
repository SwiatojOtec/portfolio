'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobScraperDemo from './JobScraperDemo';
import { X } from 'lucide-react';

interface InkSplashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InkSplashModal: React.FC<InkSplashModalProps> = ({ isOpen, onClose }) => {
  const [inkStage, setInkStage] = useState<'splash' | 'spread' | 'modal' | 'closing'>('splash');

  useEffect(() => {
    if (isOpen) {
      setInkStage('splash');
      // Запускаємо анімацію чернил
      setTimeout(() => setInkStage('spread'), 300);
      setTimeout(() => setInkStage('modal'), 800);
    } else {
      setInkStage('closing');
      setTimeout(() => setInkStage('splash'), 500);
    }
  }, [isOpen]);

  if (!isOpen && inkStage === 'splash') return null;

  return (
    <AnimatePresence>
      {/* Чернильний туман */}
      <motion.div
        key="ink-overlay"
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: inkStage === 'splash' ? 0 : 1,
          scale: inkStage === 'splash' ? 0.1 : 1,
        }}
        transition={{
          duration: inkStage === 'splash' ? 0.3 : 0.8,
          ease: "easeInOut"
        }}
      >
        {/* Початкова точка чернил (центр екрану) */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: inkStage === 'splash' ? 1 : 0,
            opacity: inkStage === 'splash' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Розповсюдження чернил */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-0 h-0 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: inkStage === 'spread' ? '200vw' : '0vw',
            height: inkStage === 'spread' ? '200vh' : '0vh',
            opacity: inkStage === 'spread' ? 0.95 : 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Модальне вікно з демо */}
      <motion.div
        key="modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: inkStage === 'modal' ? 1 : 0,
          scale: inkStage === 'modal' ? 1 : 0.8,
        }}
        transition={{
          duration: 0.5,
          delay: inkStage === 'modal' ? 0.2 : 0,
          ease: "easeOut"
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.3 }
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
            transition={{ delay: 0.5 }}
          >
            <X size={24} />
          </motion.button>

          {/* Заголовок модального вікна */}
          <motion.div
            className="absolute top-4 left-4 z-10 text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold">🦑 Job Scraper Platform</h2>
            <p className="text-gray-300 text-sm">Демо версія</p>
          </motion.div>

          {/* Контейнер демо */}
          <motion.div
            className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <JobScraperDemo />
          </motion.div>
        </div>
      </motion.div>

      {/* Фоновий оверлей для закриття */}
      {inkStage === 'modal' && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
};

export default InkSplashModal; 