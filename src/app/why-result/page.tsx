'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResultPage from '@/components/ui/ResultPage'
import { STAGE_CONFIG } from '@/data/questions'

export default function WhyResultPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<string[]>([])

  const stageConfig = STAGE_CONFIG['start-with-why']

  useEffect(() => {
    const storedAnswers = localStorage.getItem('why-chat-answers')
    const isCompleted = localStorage.getItem('why-chat-completed')

    if (!storedAnswers || !isCompleted) {
      // Redirect back to chat if no answers found
      router.push('/why-chat')
      return
    }

    try {
      setAnswers(JSON.parse(storedAnswers))
    } catch (error) {
      console.error('Error parsing stored answers:', error)
      router.push('/why-chat')
    }
  }, [router])

  const handleContinue = () => {
    // Store completion and points in localStorage
    localStorage.setItem('why-stage-points', stageConfig.points.toString())
    router.push('/why-success')
  }

  const insights = [
    "You've identified the core motivation driving your project forward.",
    "Your personal connection to this problem will fuel your persistence through challenges.",
    "Understanding your 'why' will help you communicate your vision to others.",
    "These insights will guide your decision-making throughout the project journey."
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