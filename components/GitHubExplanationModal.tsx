import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, Shield, Scale, Heart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface GitHubExplanationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GitHubExplanationModal({ isOpen, onClose }: GitHubExplanationModalProps) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {t('githubModal.title')}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t('githubModal.subtitle')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Ethical Considerations */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Heart className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t('githubModal.ethical.title')}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {t('githubModal.ethical.description')}
                  </p>
                </div>
              </div>

              {/* Legal Compliance */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Scale className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t('githubModal.legal.title')}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {t('githubModal.legal.description')}
                  </p>
                </div>
              </div>

              {/* Technical Protection */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t('githubModal.technical.title')}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {t('githubModal.technical.description')}
                  </p>
                </div>
              </div>

              {/* Alternative Approach */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-3">
                  {t('githubModal.alternative.title')}
                </h4>
                <p className="text-gray-300 leading-relaxed mb-3">
                  {t('githubModal.alternative.description')}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>💡</span>
                  <span>{t('githubModal.alternative.note')}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-800 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  {t('githubModal.footer')}
                </p>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {t('githubModal.close')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 