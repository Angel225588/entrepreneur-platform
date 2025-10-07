'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { ProgressManager } from '@/utils/progress'

type StepStatus = 'completed' | 'current' | 'locked'

interface Option {
  id: string
  title: string
  description: string
  points: number
  route: string
  image: string
  completion: number
  status: StepStatus
}

export default function WhyOptionsPage() {
  const router = useRouter()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [options, setOptions] = useState<Option[]>([])

  // Step order defines the sequential progression
  const stepOrder = ['start-with-why', 'ikigai', 'tree-of-life']

  const getStepStatus = (stageId: string): StepStatus => {
    const isCompleted = ProgressManager.isStageCompleted(stageId)
    if (isCompleted) return 'completed'

    // Sequential logic: next available step is 'current'
    const currentIndex = stepOrder.indexOf(stageId)

    // First step is always available
    if (currentIndex === 0) return 'current'

    // Check if previous stages are completed
    for (let i = 0; i < currentIndex; i++) {
      if (!ProgressManager.isStageCompleted(stepOrder[i])) {
        return 'locked'
      }
    }

    return 'current'
  }

  const getCompletionPercentage = (stageId: string): number => {
    const completion = ProgressManager.getStageCompletion(stageId)
    return completion?.completed ? 100 : 0
  }

  const baseOptions = [
    {
      id: 'start-with-why',
      title: 'START WITH WHY',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/why',
      image: '/images/stages/golden circle start with why.jpg',
    },
    {
      id: 'ikigai',
      title: 'Ikigui',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/ikigai',
      image: '/images/stages/Ikigui.jpg',
    },
    {
      id: 'tree-of-life',
      title: 'Tree of life',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/tree-of-life',
      image: '/images/stages/Tree of life.jpg',
    }
  ]

  useEffect(() => {
    // Initialize options with dynamic status and completion
    const updatedOptions = baseOptions.map(option => ({
      ...option,
      completion: getCompletionPercentage(option.id),
      status: getStepStatus(option.id)
    }))
    setOptions(updatedOptions)
  }, [])

  const getCardStyles = (status: StepStatus) => {
    const baseStyles = `
      w-full
      max-w-[398px]
      h-[309px]
      bg-bg
      border
      rounded-xl
      overflow-hidden
      transition-all
      duration-300
      group
      flex
      flex-col
      relative
    `

    switch (status) {
      case 'completed':
        return `${baseStyles} border-success bg-success/5 shadow-lg shadow-success/20 hover:shadow-xl hover:shadow-success/30 hover:scale-105 cursor-pointer`
      case 'current':
        return `${baseStyles} border-primary bg-primary/5 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 cursor-pointer ring-2 ring-primary/30`
      case 'locked':
        return `${baseStyles} border-border opacity-60 cursor-not-allowed bg-bg-light/50`
      default:
        return `${baseStyles} border-border hover:shadow-lg hover:border-border-muted hover:scale-105 cursor-pointer`
    }
  }

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'current':
        return '⏳'
      case 'locked':
        return '🔒'
      default:
        return ''
    }
  }

  const getStatusText = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'current':
        return 'Start'
      case 'locked':
        return 'Locked'
      default:
        return 'Start'
    }
  }

  const handleOptionClick = (option: Option) => {
    if (option.status === 'locked') return
    router.push(option.route)
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-primary text-bg-dark px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Points and Streaks */}
          <div className="flex items-center space-x-4">
            <span className="bg-bg-light text-text px-3 py-1 rounded-full text-sm font-medium">
              🔥 50
            </span>
            <span className="bg-bg-light text-text px-3 py-1 rounded-full text-sm font-medium">
              📚 12
            </span>
          </div>

          {/* Right side - Back and Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-bg-dark/20 hover:bg-bg-dark/30 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => setIsSideNavOpen(true)}
              className="p-2 rounded-lg bg-bg-dark/20 hover:bg-bg-dark/30 transition-colors"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-text">WHY</h1>

        {/* Options - Responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center max-w-7xl mx-auto">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={getCardStyles(option.status)}
            >
              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
                <div className={`
                  px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
                  ${option.status === 'completed'
                    ? 'bg-success/20 text-success border border-success/30'
                    : option.status === 'current'
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'bg-bg-light/80 text-text-muted border border-border'
                  }
                `}>
                  <span className="mr-1">{getStatusIcon(option.status)}</span>
                  {option.status === 'completed' ? 'Completed' : option.status === 'locked' ? 'Locked' : 'Available'}
                </div>
              </div>
              {/* Image Section - Top 60% */}
              <div className="
                relative
                h-[185px]
                bg-gradient-to-br
                from-primary/20
                to-secondary/20
                overflow-hidden
                flex
                items-center
                justify-center
              ">
                {/* Background Image */}
                <img
                  src={option.image}
                  alt={option.title}
                  className={`
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                    ${option.status === 'locked' ? 'opacity-20 grayscale' : 'opacity-40'}
                  `}
                />


                {/* Progress Indicator */}
                <div className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  z-10
                ">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium px-2 py-1 rounded-md backdrop-blur-sm ${
                      option.status === 'completed'
                        ? 'bg-success/20 text-success'
                        : option.status === 'current'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-bg/80 text-bg-dark'
                    }`}>
                      {option.completion}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-bg-dark/30 rounded-full h-3 backdrop-blur-sm">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        option.status === 'completed'
                          ? 'bg-success'
                          : option.status === 'current'
                          ? 'bg-primary'
                          : 'bg-text-muted'
                      }`}
                      style={{ width: `${option.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Text Section - Bottom 40% */}
              <div className="
                flex-1
                p-4
                flex
                flex-col
                justify-between
              ">
                {/* Title */}
                <h3 className={`
                  text-lg
                  font-semibold
                  leading-tight
                  mb-2
                  transition-colors
                  duration-300
                  line-clamp-2
                  ${option.status === 'locked'
                    ? 'text-text-muted'
                    : option.status === 'completed'
                    ? 'text-success group-hover:text-success'
                    : 'text-text group-hover:text-primary'
                  }
                `}>
                  {option.title}
                </h3>

                {/* Description */}
                <p className="
                  text-sm
                  text-text-muted
                  leading-relaxed
                  mb-3
                  line-clamp-2
                  group-hover:text-text
                  transition-colors
                  duration-300
                ">
                  {option.description}
                </p>

                {/* Points and Continue */}
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-text-muted text-bg text-xs px-2 py-1 rounded-md font-medium">
                    {option.points}
                  </span>
                  <div className={`
                    transition-opacity
                    duration-300
                    font-medium
                    flex
                    items-center
                    ${option.status === 'locked'
                      ? 'opacity-50 text-text-muted'
                      : option.status === 'completed'
                      ? 'text-success opacity-100'
                      : 'text-primary opacity-0 group-hover:opacity-100'
                    }
                  `}>
                    {getStatusText(option.status)}
                    {option.status !== 'locked' && (
                      <svg
                        className={`ml-1 w-3 h-3 transition-transform duration-300 ${
                          option.status === 'completed'
                            ? 'transform rotate-90'
                            : 'transform group-hover:translate-x-1'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {option.status === 'completed' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        )}
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative corner element */}
              <div className="
                absolute
                top-0
                right-0
                w-16
                h-16
                bg-gradient-to-bl
                from-warning/30
                to-transparent
                rounded-bl-full
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              "></div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Navigation Overlay */}
      {isSideNavOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSideNavOpen(false)}
          ></div>

          {/* Side Navigation Panel */}
          <div className="absolute right-0 top-0 h-full w-1/2 bg-bg border-l border-border shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-text">Menu</h2>
                <button
                  onClick={() => setIsSideNavOpen(false)}
                  className="p-2 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    router.push('/dashboard')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">🏠</span>
                  <span className="font-medium">Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    router.push('/projects')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">📁</span>
                  <span className="font-medium">Projects</span>
                </button>

                <button
                  onClick={() => {
                    router.push('/resources')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">📚</span>
                  <span className="font-medium">Resources</span>
                </button>

                <button
                  onClick={() => {
                    router.push('/profile')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">👤</span>
                  <span className="font-medium">Profile</span>
                </button>

                {/* Theme Toggle */}
                <div className="border-t border-border pt-4 mt-6">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-bg-light border border-border">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🌓</span>
                      <span className="font-medium text-text">Theme</span>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}