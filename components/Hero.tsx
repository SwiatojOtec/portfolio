'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import Lottie from 'lottie-react';
import TypewriterText from './TypewriterText';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [animationData, setAnimationData] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    import('/public/animations/man-working-animation.json')
      .then(data => setAnimationData(data.default))
      .catch(err => console.error('Failed to load animation:', err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPlay(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const memoizedAnimation = useMemo(() => {
    if (!animationData || (!shouldPlay && !isCompleted)) return null;
    
    return (
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={shouldPlay && !isCompleted}
        loop={false}
        onComplete={() => setIsCompleted(true)}
        style={{ width: '100%', height: 'auto', maxWidth: '600px', maxHeight: '600px' }}
      />
    );
  }, [animationData, shouldPlay, isCompleted]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="w-80 h-80 mb-8 flex items-center justify-center">
              {memoizedAnimation || (
                <div className="w-40 h-40 bg-gradient-to-r from-primary-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-dashed border-primary-500/30">
                  <span className="text-primary-400 text-sm">Завантаження...</span>
                </div>
              )}
            </div>
            <TypewriterText
              key={t('hero.title')} // Force re-render when language changes
              text={t('hero.title')}
              className="text-3xl md:text-4xl font-semibold text-primary-400 mb-6"
            />
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              key={t('hero.subtitle')} // Force re-render when language changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              {t('hero.subtitle')}
            </motion.h1>
            <motion.p
              key={t('hero.description')} // Force re-render when language changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>
            <motion.button
              key={t('hero.cta')} // Force re-render when language changes
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('hero.cta')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 