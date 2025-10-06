'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function ProjectsPage() {
  const router = useRouter()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  const projects = [
    {
      id: 1,
      name: 'Innovation Project',
      description: 'Build your next breakthrough product using our structured methodology',
      progress: 30,
      locked: false
    },
    {
      id: 2,
      name: 'Product Development',
      description: 'Complete product development cycle from ideation to launch',
      progress: 0,
      locked: true
    }
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-primary text-bg-dark px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Points and Streaks */}
          <div className="flex items-center space-x-4">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              🔥 50
            </span>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Projects Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-text">Projects</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-primary text-bg-dark w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-primary/90 transition-colors"
          >
            +
          </button>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col items-center space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => !project.locked && router.push('/dashboard')}
              className={`
                w-[301px]
                min-[425px]:w-full
                min-[425px]:min-w-[299px]
                min-[425px]:max-w-[398px]
                h-[309px]
                bg-bg-light
                border
                border-border
                rounded-xl
                overflow-hidden
                transition-all
                duration-300
                ${project.locked
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-lg hover:border-border-muted hover:scale-105 cursor-pointer'
                }
                group
                flex
                flex-col
                relative
              `}
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
                <div className={`
                  w-20
                  h-20
                  bg-primary
                  text-bg-dark
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-2xl
                  font-bold
                  transition-transform
                  duration-300
                  ${!project.locked && 'group-hover:scale-110'}
                `}>
                  {project.name.charAt(0)}
                </div>

                {/* Lock Overlay */}
                {project.locked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-bg/80">
                    <span className="text-4xl">🔒</span>
                  </div>
                )}

                {/* Progress Indicator */}
                {project.progress > 0 && (
                  <div className="
                    absolute
                    bottom-3
                    left-3
                    right-3
                  ">
                    <div className="w-full bg-bg-dark/20 rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
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
                  {project.name}
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
                  {project.description}
                </p>

                {/* Progress and Continue */}
                <div className="flex justify-between items-center text-xs">
                  {project.progress > 0 && (
                    <span className="text-text-muted">{project.progress}% Complete</span>
                  )}
                  <div className={`
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    text-primary
                    font-medium
                    flex
                    items-center
                    ${project.locked ? 'hidden' : ''}
                  `}>
                    Continue
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
              <div className={`
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
                ${project.locked ? 'hidden' : ''}
              `}></div>
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
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary/10 border border-primary text-primary"
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