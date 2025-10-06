'use client'

import { useRouter } from 'next/navigation'
import StepLayout from './StepLayout'

export default function Welcome() {
  const router = useRouter()

  const handleStart = () => {
    router.push('/why')
  }

  return (
    <StepLayout currentStep={0}>
      <div className="space-y-8 md:space-y-12">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight">
            Welcome to Gepeto
          </h1>

          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed px-2">
            This is a guide for you to successfully build your project from scratch passing through the 6 following steps.
          </p>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-primary-green text-white text-lg xs:text-xl sm:text-2xl font-medium py-3 xs:py-4 sm:py-5 px-8 sm:px-12 rounded-full hover:bg-green-600 active:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 touch-manipulation"
        >
          Start
        </button>
      </div>
    </StepLayout>
  )
}