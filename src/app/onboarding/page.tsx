'use client'

import { useRouter } from 'next/navigation'
import OnboardingCarousel from '@/components/ui/OnboardingCarousel'
import ProjectCreationForm from '@/components/ui/ProjectCreationForm'

export default function OnboardingPage() {
  const router = useRouter()

  const slides = [
    {
      id: 1,
      title: "Welcome to Your Innovation Journey",
      subtitle: "Transform Ideas into Reality",
      description: "Join thousands of innovators who have successfully built breakthrough products using our proven methodology. We'll guide you through every step of the journey.",
      image: "/images/onboarding/welcome.jpg" // You'll create this
    },
    {
      id: 2,
      title: "Start with Why",
      subtitle: "Discover Your Purpose",
      description: "Every great innovation begins with a clear understanding of WHY. We'll help you uncover your core motivation and passion that will drive your project to success.",
      image: "/images/onboarding/why.jpg" // You'll create this
    },
    {
      id: 3,
      title: "Know Your Audience",
      subtitle: "Understand Your Users",
      description: "Building successful products requires deep understanding of your target audience. Learn how to create detailed personas and identify their real needs and pain points.",
      image: "/images/onboarding/personas.jpg" // You'll create this
    },
    {
      id: 4,
      title: "Define Your Value",
      subtitle: "Create Compelling Propositions",
      description: "Discover how to articulate your unique value proposition and build a lean canvas that maps out your entire business strategy in a clear, actionable format.",
      image: "/images/onboarding/value.jpg" // You'll create this
    },
    {
      id: 5,
      title: "Create Your First Project",
      subtitle: "Let's Get Started",
      description: "Ready to begin? Give your innovation project a name and brief description. You can always update these details later as your idea evolves.",
      component: ProjectCreationForm
    }
  ]

  const handleOnboardingComplete = (projectData?: any) => {
    if (projectData) {
      // Store project data in localStorage for now
      // In a real app, this would be sent to your backend
      const projects = JSON.parse(localStorage.getItem('userProjects') || '[]')
      const newProject = {
        id: Date.now(),
        name: projectData.name,
        description: projectData.description,
        createdAt: new Date().toISOString(),
        progress: 0,
        stage: 'start-with-why'
      }

      projects.push(newProject)
      localStorage.setItem('userProjects', JSON.stringify(projects))
      localStorage.setItem('currentProject', JSON.stringify(newProject))
      localStorage.setItem('onboardingCompleted', 'true')
    }

    // Redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <OnboardingCarousel
      slides={slides}
      onComplete={handleOnboardingComplete}
    />
  )
}