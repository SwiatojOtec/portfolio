'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobScraperDemo from './JobScraperDemo';
import { X } from 'lucide-react';

interface VantaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VantaModal: React.FC<VantaModalProps> = ({ isOpen, onClose }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    const initVanta = async () => {
      try {
        const VANTA: any = await import('vanta');
        
        // Створюємо ефект "мережевої анімації" з Vanta.NET
        const effect = VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x0a0a0a,
          color: 0x3b82f6,
          spacing: 35.00,
          maxDistance: 25.00,
          points: 20.00
        });
        
        setVantaEffect(effect);
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };

    // Затримка для плавного входу
    const timer = setTimeout(initVanta, 100);
    
    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Фоновий оверлей з Vanta.js */}
          <motion.div
            key="vanta-background"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div ref={vantaRef} className="w-full h-full" />
          </motion.div>

          {/* Модальне вікно */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
          >
            <div className="relative w-full max-w-7xl max-h-[90vh] overflow-hidden">
              {/* Кнопка закриття */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <X size={24} />
              </motion.button>

              {/* Заголовок модального вікна */}
              <motion.div
                className="absolute top-4 left-4 z-10 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold drop-shadow-lg">🕸️ Job Scraper Platform</h2>
                <p className="text-gray-200 text-sm drop-shadow-lg">Демо версія з мережевою анімацією</p>
              </motion.div>

              {/* Контейнер демо */}
              <motion.div
                className="w-full h-full bg-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <JobScraperDemo />
              </motion.div>
            </div>
          </motion.div>

          {/* Додатковий оверлей для закриття */}
          <motion.div
            className="fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default VantaModal; 