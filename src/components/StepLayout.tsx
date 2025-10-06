'use client'

import { useRouter } from 'next/navigation'
import ProgressIndicator from './ProgressIndicator'

interface StepLayoutProps {
  currentStep: number
  children: React.ReactNode
  showNextButton?: boolean
}

export default function StepLayout({ currentStep, children, showNextButton = false }: StepLayoutProps) {
  const router = useRouter()

  const steps = [
    { route: '/' },
    { route: '/why' },
    { route: '/personas' },
    { route: '/value-proposition' },
    { route: '/lean-canvas' },
    { route: '/mobius-loop' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      router.push(steps[currentStep + 1].route)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      router.push(steps[currentStep - 1].route)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-white">
      <div className="w-full max-w-sm xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto text-center">
        {children}

        <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} />

        {showNextButton && currentStep === steps.length - 1 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="bg-gray-300 text-gray-700 p-3 rounded-full hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation buttons for other steps */}
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="bg-primary-green text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}