'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import DashboardCard from '@/components/ui/DashboardCard'
import ProjectHeaderCard from '@/components/ui/ProjectHeaderCard'
import ThemeToggle from '@/components/ui/ThemeToggle'
import StageSection from '@/components/ui/StageSection'
import { CONTAINERS, BUTTONS } from '@/constants/styles'
import dashboardData from '@/data/dashboard-images.json'

export default function DashboardPage() {
  const router = useRouter()
  const [projects] = useState(dashboardData.projects)
  const [stages] = useState(dashboardData.stages)
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<any>(null)

  useEffect(() => {
    // Load current project from localStorage
    const stored = localStorage.getItem('currentProject')
    if (stored) {
      setCurrentProject(JSON.parse(stored))
    }
  }, [])

  const handleStageClick = (stage: any) => {
    if (!stage.locked) {
      router.push(stage.route)
    }
  }

  const handleCardClick = (project: any) => {
    if (!project.locked) {
      if (project.id === 1) {
        router.push('/why-options')
      } else {
        router.push(`/step-${project.id}`)
      }
    }
  }

  const handleProjectHeaderStart = () => {
    router.push('/why-options')
  }

  const scrollToStage = (stageNumber: number) => {
    const element = document.getElementById(`stage-${stageNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Header */}
      <div className="bg-primary text-bg-dark px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Greeting (desktop) / Points (mobile) */}
          <div className="flex items-center space-x-4">
            {/* Mobile: Points and Streaks */}
            <div className="flex items-center space-x-4 md:hidden">
              <span className="bg-bg-light text-text px-3 py-1 rounded-full text-sm font-medium">
                🔥 50
              </span>
              <span className="bg-bg-light text-text px-3 py-1 rounded-full text-sm font-medium">
                📚 12
              </span>
            </div>

            {/* Desktop: Greeting */}
            <div className="hidden md:block">
              <h1 className="text-2xl lg:text-3xl font-bold text-bg-dark">
                Hello, {currentProject?.name ? currentProject.name.split(' ')[0] : 'Angel'}
              </h1>
            </div>
          </div>

          {/* Right side - Project card (desktop) / Menu (mobile) */}
          <div className="flex items-center space-x-4">
            {/* Desktop: Project Stats */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-bg-dark/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <span className="text-blue-300">📘</span>
                  <span className="text-bg-dark">100k</span>
                </div>
              </div>
              <div className="bg-bg-dark/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <span className="text-red-300">🔥</span>
                  <span className="text-bg-dark">300</span>
                </div>
              </div>
            </div>

            {/* Menu button - always visible */}
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
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        {/* Project Name and Description Card - Mobile Only */}
        <div className="mb-6 flex justify-center md:hidden">
          <div
            className="
              w-[301px]
              min-[425px]:w-full
              min-[425px]:min-w-[299px]
              min-[425px]:max-w-[398px]
              bg-gradient-to-br
              from-bg-light
              via-bg
              to-bg-dark/20
              rounded-xl
              p-6
              text-center
              shadow-xl
              border
              border-border
              backdrop-blur-sm
            "
            style={{
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1), inset 0 -1px 1px rgba(255,255,255,0.1), 0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
              {currentProject?.name || 'Innovation Project'}
            </h1>
            <p className="text-text-muted leading-relaxed">
              {currentProject?.description || 'Build your next breakthrough product using our structured methodology'}
            </p>
          </div>
        </div>

        {/* Stage Navigation */}
        <div className="py-6">
          {/* Mobile: Dots Navigation */}
          <div className="flex items-center justify-center md:hidden">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <button
                  onClick={() => scrollToStage(1)}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-300 bg-primary border-primary hover:scale-110"
                  title="Stage 1: Start with Why"
                ></button>
                <div className="w-8 h-0.5 mx-1 bg-border transition-colors duration-300"></div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => scrollToStage(2)}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-300 bg-bg border-border hover:border-primary hover:scale-110 cursor-pointer"
                  title="Stage 2: Personas"
                ></button>
                <div className="w-8 h-0.5 mx-1 bg-border transition-colors duration-300"></div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => scrollToStage(3)}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-300 bg-bg border-border hover:border-primary hover:scale-110 cursor-pointer"
                  title="Stage 3: Value Proposition"
                ></button>
                <div className="w-8 h-0.5 mx-1 bg-border transition-colors duration-300"></div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => scrollToStage(4)}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-300 bg-bg border-border hover:border-primary hover:scale-110 cursor-pointer"
                  title="Stage 4: Lean Canvas"
                ></button>
                <div className="w-8 h-0.5 mx-1 bg-border transition-colors duration-300"></div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => scrollToStage(5)}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-300 bg-bg border-border hover:border-primary hover:scale-110 cursor-pointer"
                  title="Stage 5: MVP"
                ></button>
                <div className="w-8 h-0.5 mx-1 bg-border transition-colors duration-300"></div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => scrollToStage(6)}
                  className="w-4 h-4 rounded-full border-2 transition-all duration-300 bg-bg border-border hover:border-primary hover:scale-110 cursor-pointer"
                  title="Stage 6: Mobius Loop"
                ></button>
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal Progress Bar */}
          <div className="hidden md:block max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              {[
                { id: 1, name: 'Start with Why', completed: true },
                { id: 2, name: 'Personas', completed: false },
                { id: 3, name: 'Value Prop', completed: false },
                { id: 4, name: 'Lean Canvas', completed: false },
                { id: 5, name: 'MVP', completed: false },
                { id: 6, name: 'Mobius Loop', completed: false }
              ].map((stage, index) => (
                <div key={stage.id} className="flex items-center flex-1">
                  <button
                    onClick={() => scrollToStage(stage.id)}
                    className={`
                      w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300
                      flex items-center justify-center text-xs lg:text-sm font-bold
                      ${stage.completed
                        ? 'bg-primary border-primary text-bg-dark'
                        : 'bg-bg border-border text-text-muted hover:border-primary hover:scale-105'
                      }
                    `}
                    title={`Stage ${stage.id}: ${stage.name}`}
                  >
                    {stage.completed ? '✓' : stage.id}
                  </button>

                  {/* Progress line */}
                  {index < 5 && (
                    <div className="flex-1 h-0.5 mx-2 lg:mx-4 bg-border">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: stage.completed ? '100%' : '0%' }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stage Labels */}
            <div className="flex items-center justify-between mt-3">
              {[
                'Start with Why', 'Personas', 'Value Prop', 'Lean Canvas', 'MVP', 'Mobius Loop'
              ].map((name, index) => (
                <div key={index} className="flex-1 text-center">
                  <span className="text-xs lg:text-sm text-text-muted font-medium">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* All Project Cards in Responsive Grid */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
            {projects.map((project) => {
              const needsAttention = !project.locked && !project.completed && (project.progress > 0 || project.id === 1)

              return (
                <DashboardCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  progress={project.progress}
                  isCompleted={project.completed}
                  locked={project.locked}
                  needsAttention={needsAttention}
                  onContinue={() => handleCardClick(project)}
                />
              )
            })}
          </div>
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

                <button
                  onClick={() => {
                    localStorage.removeItem('onboardingCompleted')
                    localStorage.removeItem('currentProject')
                    localStorage.removeItem('userProjects')
                    router.push('/onboarding')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-warning/10 border border-warning text-warning hover:bg-warning/20 transition-colors"
                >
                  <span className="text-xl">🔄</span>
                  <span className="font-medium">Reset Onboarding</span>
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