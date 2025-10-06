'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SuccessPageProps {
  points: number
  title: string
  onBackToStages: () => void
}

export default function SuccessPage({ points, title, onBackToStages }: SuccessPageProps) {
  const router = useRouter()

  useEffect(() => {
    // Trigger confetti animation on mount
    const triggerConfetti = () => {
      // Simple confetti using CSS animations
      const confettiContainer = document.getElementById('confetti-container')
      if (confettiContainer) {
        confettiContainer.innerHTML = ''

        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div')
          confetti.className = 'absolute w-2 h-2 animate-ping'
          confetti.style.left = Math.random() * 100 + '%'
          confetti.style.top = Math.random() * 100 + '%'
          confetti.style.animationDelay = Math.random() * 3 + 's'
          confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`
          confettiContainer.appendChild(confetti)
        }

        // Remove confetti after animation
        setTimeout(() => {
          confettiContainer.innerHTML = ''
        }, 5000)
      }
    }

    triggerConfetti()
  }, [])

  return (
    <div className="relative flex flex-col h-screen justify-center items-center text-center p-6 bg-bg overflow-hidden">
      {/* Confetti Container */}
      <div id="confetti-container" className="absolute inset-0 pointer-events-none z-10"></div>

      <main className="flex-1 flex flex-col justify-center items-center space-y-6 z-20">
        {/* Animated Trophy */}
        <div className="relative">
          <div className="w-48 h-48 relative">
            {/* Outer Ring */}
            <svg className="w-full h-full text-primary animate-pulse" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="283"
                className="animate-spin"
                opacity="0.3"
              />
            </svg>

            {/* Trophy Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-12 h-12 text-bg-dark" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.61A80.13,80.13,0,0,0,204.35,136H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80h24v32.93A23.84,23.84,0,0,1,48,120Zm128,56a64,64,0,0,1-96,0V56H176Zm56-80a24,24,0,0,1-24,24,23.84,23.84,0,0,1,0-7.07V80h24Z"/>
                </svg>
              </div>
            </div>

            {/* Sparkles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-ping">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 left-1/3 transform -translate-x-1/2 animate-ping">
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 right-1/3 transform translate-x-1/2 animate-ping">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-text animate-pulse">
          Congratulations!
        </h1>

        <p className="text-xl text-text-muted">
          You earned <span className="font-bold text-primary">{points} Points!</span>
        </p>

        <p className="text-lg text-text-muted">
          {title} completed successfully!
        </p>
      </main>

      {/* Back to Stages Button */}
      <footer className="w-full p-4 z-20">
        <button
          onClick={onBackToStages}
          className="w-full h-12 px-4 rounded-lg bg-primary text-bg-dark font-semibold text-lg hover:bg-warning transition-all duration-300 transform hover:scale-105"
        >
          Go back to Stages
        </button>
      </footer>
    </div>
  )
}