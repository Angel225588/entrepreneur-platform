'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface OnboardingSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image?: string
  component?: React.ComponentType<any>
}

interface OnboardingCarouselProps {
  slides: OnboardingSlide[]
  onComplete?: (projectData?: any) => void
}

export default function OnboardingCarousel({ slides, onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const handleComplete = (projectData?: any) => {
    if (onComplete) {
      onComplete(projectData)
    } else {
      router.push('/dashboard')
    }
  }

  const currentSlideData = slides[currentSlide]
  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header with progress */}
      <div className="bg-primary text-bg-dark px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Welcome</h1>
            <span className="text-sm opacity-80">
              {currentSlide + 1} of {slides.length}
            </span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm px-3 py-1 rounded-md bg-bg-dark/20 hover:bg-bg-dark/30 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Main carousel content */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
        >
          {/* Slide content */}
          <div className="h-full flex flex-col items-center justify-center px-6 py-8">
            {/* Image section */}
            {currentSlideData.image && (
              <div className="w-full max-w-2xl mb-8">
                <div className="aspect-video relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Text content */}
            <div className="text-center max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
                {currentSlideData.title}
              </h2>
              <h3 className="text-xl sm:text-2xl text-primary mb-6">
                {currentSlideData.subtitle}
              </h3>
              <p className="text-lg text-text-muted leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>

            {/* Custom component for last slide */}
            {currentSlideData.component && (
              <div className="mt-8 w-full max-w-md">
                <currentSlideData.component onComplete={handleComplete} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="bg-bg-light border-t border-border px-6 py-4">
        {/* Progress dots */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-primary scale-110'
                    : index < currentSlide
                    ? 'bg-success'
                    : 'bg-border hover:bg-border-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`px-6 py-2 rounded-lg transition-all duration-200 ${
              currentSlide === 0
                ? 'bg-border text-text-muted cursor-not-allowed'
                : 'bg-bg border border-border text-text hover:bg-highlight'
            }`}
          >
            Previous
          </button>

          {!isLastSlide ? (
            <button
              onClick={nextSlide}
              className="px-6 py-2 bg-primary text-bg-dark rounded-lg hover:bg-warning transition-all duration-200 font-medium"
            >
              Next
            </button>
          ) : (
            <span className="text-sm text-text-muted">Complete the form to continue</span>
          )}
        </div>
      </div>
    </div>
  )
}