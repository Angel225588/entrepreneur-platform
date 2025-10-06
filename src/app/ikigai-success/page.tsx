'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SuccessPage from '@/components/ui/SuccessPage'
import { STAGE_CONFIG } from '@/data/questions'

export default function IkigaiSuccessPage() {
  const router = useRouter()
  const [points, setPoints] = useState(0)

  const stageConfig = STAGE_CONFIG['ikigai']

  useEffect(() => {
    const storedPoints = localStorage.getItem('ikigai-stage-points')
    const isCompleted = localStorage.getItem('ikigai-chat-completed')

    if (!storedPoints || !isCompleted) {
      // Redirect back to chat if not completed
      router.push('/ikigai-chat')
      return
    }

    setPoints(parseInt(storedPoints))

    // Mark stage as completed in the main progress
    const currentProgress = JSON.parse(localStorage.getItem('stageProgress') || '{}')
    currentProgress['ikigai'] = {
      completed: true,
      points: parseInt(storedPoints),
      completedAt: new Date().toISOString()
    }
    localStorage.setItem('stageProgress', JSON.stringify(currentProgress))

    // Update user's total points
    const currentPoints = parseInt(localStorage.getItem('userPoints') || '0')
    const newTotal = currentPoints + parseInt(storedPoints)
    localStorage.setItem('userPoints', newTotal.toString())
  }, [router])

  const handleBackToStages = () => {
    // Clean up temporary storage
    localStorage.removeItem('ikigai-chat-answers')
    localStorage.removeItem('ikigai-chat-completed')
    localStorage.removeItem('ikigai-stage-points')

    // Navigate back to dashboard
    router.push('/dashboard')
  }

  if (points === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-muted">Preparing your celebration...</p>
        </div>
      </div>
    )
  }

  return (
    <SuccessPage
      points={points}
      title={stageConfig.title}
      onBackToStages={handleBackToStages}
    />
  )
}