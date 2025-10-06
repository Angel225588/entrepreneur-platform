'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ResultPage from '@/components/ui/ResultPage'
import { STAGE_CONFIG } from '@/data/questions'

export default function TreeResultPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<string[]>([])

  const stageConfig = STAGE_CONFIG['tree-of-life']

  useEffect(() => {
    const storedAnswers = localStorage.getItem('tree-chat-answers')
    const isCompleted = localStorage.getItem('tree-chat-completed')

    if (!storedAnswers || !isCompleted) {
      // Redirect back to chat if no answers found
      router.push('/tree-chat')
      return
    }

    try {
      setAnswers(JSON.parse(storedAnswers))
    } catch (error) {
      console.error('Error parsing stored answers:', error)
      router.push('/tree-chat')
    }
  }, [router])

  const handleContinue = () => {
    // Store completion and points in localStorage
    localStorage.setItem('tree-stage-points', stageConfig.points.toString())
    router.push('/tree-success')
  }

  const insights = [
    "You've explored the roots of your identity and core values.",
    "Your personal growth tree shows the strong foundation you've built.",
    "The branches represent new opportunities for expansion and impact.",
    "This reflection will guide your project's alignment with your authentic self."
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