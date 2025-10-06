'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HeroSection from '@/components/ui/HeroSection'
import FeatureCard from '@/components/ui/FeatureCard'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Home() {
  const router = useRouter()
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false)

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted')
    setIsOnboardingCompleted(!!onboardingCompleted)
  }, [])

  const features = [
    {
      title: "Start with Why",
      description: "Discover your project's core purpose and drive. Build sustainable motivation by understanding the deeper meaning behind your innovation.",
      icon: "💡",
      gradient: "from-bg-light to-bg"
    },
    {
      title: "Build for Users",
      description: "Create detailed personas and understand your target audience. Design solutions that truly resonate with real people's needs.",
      icon: "👥",
      gradient: "from-secondary/10 to-primary/10"
    },
    {
      title: "Validate Early",
      description: "Test your ideas quickly with lean methodology. Build, measure, learn - create products people actually want.",
      icon: "🚀",
      gradient: "from-success/10 to-info/10"
    },
    {
      title: "Track Progress",
      description: "Monitor your development journey with structured milestones. Stay focused and motivated throughout your project lifecycle.",
      icon: "📊",
      gradient: "from-warning/10 to-danger/10"
    }
  ]

  const handleGetStarted = () => {
    if (isOnboardingCompleted) {
      router.push('/dashboard')
    } else {
      router.push('/onboarding')
    }
  }

  const handleFeatureClick = (title: string) => {
    if (title === "Start with Why") {
      if (isOnboardingCompleted) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding')
      }
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <HeroSection
        title="Gepeto"
        subtitle="Build Your Next Big Idea"
        description="Transform your concepts into reality with our structured methodology. From initial why to market launch, we guide you through every step."
        onGetStarted={handleGetStarted}
      />

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-6">
              Why Choose Gepeto?
            </h2>
            <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
              Discover a proven methodology for building successful products that combines design thinking with lean startup principles.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'
                } max-w-2xl`}
              >
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  gradient={feature.gradient}
                  onClick={() => handleFeatureClick(feature.title)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-text mb-6">
            Ready to Build Your Vision?
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-text-muted mb-8 max-w-2xl mx-auto">
            Join thousands of innovators who have transformed their ideas into successful products with Gepeto.
          </p>
          <button
            onClick={handleGetStarted}
            className="
              inline-flex
              items-center
              justify-center
              px-12
              py-4
              bg-primary
              text-bg-dark
              text-lg
              xs:text-xl
              sm:text-2xl
              md:text-3xl
              lg:text-4xl
              xl:text-5xl
              2xl:text-6xl
              font-semibold
              rounded-full
              hover:bg-warning
              active:bg-highlight
              transition-all
              duration-300
              transform
              hover:scale-105
              focus:outline-none
              focus:ring-4
              focus:ring-primary
              focus:ring-opacity-50
              shadow-lg
              hover:shadow-xl
            "
          >
            Start Building Today
          </button>
        </div>
      </section>
    </div>
  )
}