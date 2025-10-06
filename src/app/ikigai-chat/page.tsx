'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ChatInterface from '@/components/ui/ChatInterface'
import { STAGE_CONFIG } from '@/data/questions'

export default function IkigaiChatPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<string[]>([])

  const stageConfig = STAGE_CONFIG['ikigai']

  const handleComplete = (userAnswers: string[]) => {
    setAnswers(userAnswers)
    // Store answers in localStorage for the result page
    localStorage.setItem('ikigai-chat-answers', JSON.stringify(userAnswers))
    localStorage.setItem('ikigai-chat-completed', 'true')

    // Navigate to result page
    router.push('/ikigai-result')
  }

  return (
    <ChatInterface
      title={stageConfig.title}
      questions={stageConfig.questions}
      onComplete={handleComplete}
      initialMessage={stageConfig.initialMessage}
    />
  )
}