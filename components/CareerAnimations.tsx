'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Lottie from 'lottie-react'

interface CareerAnimationProps {
  type: 'flooring' | 'construction' | 'marketing' | 'education'
  isVisible: boolean
}

export default function CareerAnimation({ type, isVisible }: CareerAnimationProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [shouldPlay, setShouldPlay] = useState(false)
  const [animationData, setAnimationData] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const lottieRef = useRef<any>(null)

  // Мемоизируем анимацию чтобы предотвратить лишние перерендеры
  const memoizedAnimation = useMemo(() => {
    if (!animationData || !shouldPlay) return null
    
    return (
      <Lottie
        animationData={animationData}
        loop={false} // Убираем бесконечный цикл
        autoplay={shouldPlay && !isCompleted}
        style={{ 
          width: '100%', 
          height: 'auto',
          maxWidth: '2000px',
          maxHeight: '1900px'
        }}
        onDOMLoaded={() => console.log('Lottie DOM loaded')}
        onComplete={() => {
          console.log('Lottie animation completed')
          setIsCompleted(true)
        }}
        onError={(error) => console.error('Lottie error:', error)}
        ref={lottieRef}
      />
    )
  }, [animationData, shouldPlay, isCompleted])

  useEffect(() => {
    setIsMounted(true)
    console.log('Component mounted, type:', type)
    
    // Динамически загружаем анимацию
    if (type === 'flooring') {
      console.log('Loading flooring animation...')
      import('/public/animations/store-animation.json')
        .then(data => {
          console.log('Animation loaded successfully:', data)
          setAnimationData(data.default)
        })
        .catch(err => {
          console.error('Failed to load animation:', err)
        })
    } else if (type === 'construction') {
      console.log('Loading construction animation...')
      import('/public/animations/construction-animation.json')
        .then(data => {
          console.log('Construction animation loaded successfully:', data)
          setAnimationData(data.default)
        })
        .catch(err => {
          console.error('Failed to load construction animation:', err)
        })
    } else if (type === 'marketing') {
      console.log('Loading marketing animation...')
      import('/public/animations/marketing-animation.json')
        .then(data => {
          console.log('Marketing animation loaded successfully:', data)
          setAnimationData(data.default)
        })
        .catch(err => {
          console.error('Failed to load marketing animation:', err)
        })
    } else if (type === 'education') {
      console.log('Loading education animation...')
      import('/public/animations/education-animation.json')
        .then(data => {
          console.log('Education animation loaded successfully:', data)
          setAnimationData(data.default)
        })
        .catch(err => {
          console.error('Failed to load education animation:', err)
        })
    }
  }, [type])

  useEffect(() => {
    if (isVisible) {
      console.log('Card became visible, starting timer...')
      // Задержка 0.6 секунды после появления карточки
      const timer = setTimeout(() => {
        console.log('Timer finished, setting shouldPlay to true')
        setShouldPlay(true)
      }, 600)
      
      return () => {
        console.log('Clearing timer')
        clearTimeout(timer)
      }
    } else {
      console.log('Card became invisible, setting shouldPlay to false')
      setShouldPlay(false)
      // Останавливаем анимацию только если она еще не завершилась
      if (lottieRef.current && !isCompleted) {
        lottieRef.current.stop()
      }
    }
  }, [isVisible, isCompleted])

  // Останавливаем анимацию при размонтировании
  useEffect(() => {
    const currentRef = lottieRef.current;
    return () => {
      if (currentRef) {
        currentRef.stop()
      }
    }
  }, [])

  // Анимация для Flooring Retail Business - Lottie анимация
  const renderFlooringAnimation = () => {
    console.log('Flooring animation render:', { animationData, shouldPlay, isVisible })
    
    if (!animationData) {
      return (
        <div className="relative w-full h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-40 h-40 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-blue-400 font-bold text-2xl">STILL HOUSE</div>
            <div className="text-gray-400 text-lg mt-1">Flooring Retail</div>
            <div className="text-base text-gray-500 mt-1">Loading animation...</div>
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-full flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          {shouldPlay && (
            <Lottie
              animationData={animationData}
              loop={false} // Убираем бесконечный цикл
              autoplay={shouldPlay && !isCompleted}
              style={{ 
                width: '100%', 
                height: 'auto',
                maxWidth: '2000px',
                maxHeight: '1900px'
              }}
              onDOMLoaded={() => console.log('Lottie DOM loaded')}
              onComplete={() => {
                console.log('Lottie animation completed')
                setIsCompleted(true)
              }}
              onError={(error) => console.error('Lottie error:', error)}
              ref={lottieRef}
            />
          )}
        </div>
      </div>
    )
  }

  // Заглушки для других анимаций
  const renderConstructionAnimation = () => {
    if (!animationData) {
      return (
        <div className="relative w-full h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-40 h-40 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-green-400 font-bold text-2xl">PAN PIVDENBUD</div>
            <div className="text-gray-400 text-lg mt-1">Construction</div>
            <div className="text-base text-gray-500 mt-1">Loading animation...</div>
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-full flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          {shouldPlay && (
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={shouldPlay && !isCompleted}
              style={{ 
                width: '100%', 
                height: 'auto',
                maxWidth: '1700px',
                maxHeight: '1600px'
              }}
              onDOMLoaded={() => console.log('Construction Lottie DOM loaded')}
              onComplete={() => {
                console.log('Construction Lottie animation completed')
                setIsCompleted(true)
              }}
              onError={(error) => console.error('Construction Lottie error:', error)}
              ref={lottieRef}
            />
          )}
        </div>
      </div>
    )
  }

  const renderMarketingAnimation = () => {
    if (!animationData) {
      return (
        <div className="relative w-full h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-40 h-40 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-purple-400 font-bold text-2xl">PAN PIVDENBUD</div>
            <div className="text-gray-400 text-lg mt-1">Marketing</div>
            <div className="text-base text-gray-500 mt-1">Loading animation...</div>
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-full flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          {shouldPlay && (
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={shouldPlay && !isCompleted}
              style={{ 
                width: '100%', 
                height: 'auto',
                maxWidth: '1700px',
                maxHeight: '1600px'
              }}
              onDOMLoaded={() => console.log('Marketing Lottie DOM loaded')}
              onComplete={() => {
                console.log('Marketing Lottie animation completed')
                setIsCompleted(true)
              }}
              onError={(error) => console.error('Marketing Lottie error:', error)}
              ref={lottieRef}
            />
          )}
        </div>
      </div>
    )
  }

  const renderEducationAnimation = () => {
    if (!animationData) {
      return (
        <div className="relative w-full h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="w-40 h-40 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div className="text-orange-400 font-bold text-2xl">University</div>
            <div className="text-gray-400 text-lg mt-1">Education</div>
            <div className="text-base text-gray-500 mt-1">Loading animation...</div>
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-full flex items-center justify-center">
        <div className="w-full flex items-center justify-center">
          {shouldPlay && (
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={shouldPlay && !isCompleted}
              style={{ 
                width: '100%', 
                height: 'auto',
                maxWidth: '1700px',
                maxHeight: '1600px'
              }}
              onDOMLoaded={() => console.log('Education Lottie DOM loaded')}
              onComplete={() => {
                console.log('Education Lottie animation completed')
                setIsCompleted(true)
              }}
              onError={(error) => console.error('Education Lottie error:', error)}
              ref={lottieRef}
            />
          )}
        </div>
      </div>
    )
  }

  const renderAnimation = () => {
    if (!isMounted) return null
    
    switch (type) {
      case 'flooring':
        return renderFlooringAnimation()
      case 'construction':
        return renderConstructionAnimation()
      case 'marketing':
        return renderMarketingAnimation()
      case 'education':
        return renderEducationAnimation()
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {renderAnimation()}
    </div>
  )
} 