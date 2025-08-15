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
          className="relative w-full max-w-2xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl flex flex-col"
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
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Project Purpose */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-yellow-500/20 rounded-lg flex-shrink-0">
                  <Github className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1.5">
                    {t('githubModal.purpose.title')}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t('githubModal.purpose.description')}
                  </p>
                </div>
              </div>

              {/* Ethical Considerations */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-blue-500/20 rounded-lg flex-shrink-0">
                  <Heart className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1.5">
                    {t('githubModal.ethical.title')}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t('githubModal.ethical.description')}
                  </p>
                </div>
              </div>

              {/* Technical Measures */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-purple-500/20 rounded-lg flex-shrink-0">
                  <Shield className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1.5">
                    {t('githubModal.technical.title')}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t('githubModal.technical.description')}
                  </p>
                </div>
              </div>

              {/* Legal Compliance */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-green-500/20 rounded-lg flex-shrink-0">
                  <Scale className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1.5">
                    {t('githubModal.legal.title')}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t('githubModal.legal.description')}
                  </p>
                </div>
              </div>

              {/* Protection and Limitations */}
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-red-500/20 rounded-lg flex-shrink-0">
                  <Shield className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1.5">
                    {t('githubModal.protection.title')}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t('githubModal.protection.description')}
                  </p>
                </div>
              </div>

              {/* Alternative Approach */}
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                <h4 className="text-base font-semibold text-white mb-2">
                  {t('githubModal.alternative.title')}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-2">
                  {t('githubModal.alternative.description')}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
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