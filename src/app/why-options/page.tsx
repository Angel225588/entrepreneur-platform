'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function WhyOptionsPage() {
  const router = useRouter()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  const options = [
    {
      id: 'start-with-why',
      title: 'START WITH WHY',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/why',
      image: '/images/stages/golden circle start with why.jpg',
      completion: 0
    },
    {
      id: 'ikigai',
      title: 'Ikigui',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/ikigai',
      image: '/images/stages/Ikigui.jpg',
      completion: 0
    },
    {
      id: 'tree-of-life',
      title: 'Tree of life',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/tree-of-life',
      image: '/images/stages/Tree of life.jpg',
      completion: 0
    }
  ]

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
              onClick={() => router.push(option.route)}
              className="
                w-full
                max-w-[398px]
                h-[309px]
                bg-bg
                border
                border-border
                rounded-xl
                overflow-hidden
                transition-all
                duration-300
                hover:shadow-lg hover:border-border-muted hover:scale-105 cursor-pointer
                group
                flex
                flex-col
                relative
              "
            >
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
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    opacity-40
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
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
                    <span className="text-bg-dark text-sm font-medium bg-bg/80 px-2 py-1 rounded-md backdrop-blur-sm">
                      {option.completion}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-bg-dark/30 rounded-full h-3 backdrop-blur-sm">
                    <div
                      className="bg-success h-3 rounded-full transition-all duration-500"
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
                <h3 className="
                  text-lg
                  font-semibold
                  text-text
                  leading-tight
                  mb-2
                  group-hover:text-primary
                  transition-colors
                  duration-300
                  line-clamp-2
                ">
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
                  <div className="
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    text-primary
                    font-medium
                    flex
                    items-center
                  ">
                    Start
                    <svg
                      className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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