'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResultPage from '@/components/ui/ResultPage'
import { STAGE_CONFIG } from '@/data/questions'

export default function IkigaiResultPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<string[]>([])

  const stageConfig = STAGE_CONFIG['ikigai']

  useEffect(() => {
    const storedAnswers = localStorage.getItem('ikigai-chat-answers')
    const isCompleted = localStorage.getItem('ikigai-chat-completed')

    if (!storedAnswers || !isCompleted) {
      // Redirect back to chat if no answers found
      router.push('/ikigai-chat')
      return
    }

    try {
      setAnswers(JSON.parse(storedAnswers))
    } catch (error) {
      console.error('Error parsing stored answers:', error)
      router.push('/ikigai-chat')
    }
  }, [router])

  const handleContinue = () => {
    // Store completion and points in localStorage
    localStorage.setItem('ikigai-stage-points', stageConfig.points.toString())
    router.push('/ikigai-success')
  }

  const insights = [
    "You've discovered the intersection of your passions, skills, and purpose.",
    "Your Ikigai reveals the sweet spot where your talents meet world needs.",
    "This clarity will guide you toward fulfilling and sustainable work.",
    "Your unique combination of love, skill, mission, and value creates your distinct path."
  ]

  if (answers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Loading your results...</p>
        </div>
      </div>
    )
  }

  return (
    <ResultPage
      title={stageConfig.title}
      answers={answers}
      questions={stageConfig.questions}
      onContinue={handleContinue}
      insights={insights}
    />
  )
}