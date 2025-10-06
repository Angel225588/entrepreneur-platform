'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ChatInterface from '@/components/ui/ChatInterface'
import { STAGE_CONFIG } from '@/data/questions'

export default function TreeChatPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<string[]>([])

  const stageConfig = STAGE_CONFIG['tree-of-life']

  const handleComplete = (userAnswers: string[]) => {
    setAnswers(userAnswers)
    // Store answers in localStorage for the result page
    localStorage.setItem('tree-chat-answers', JSON.stringify(userAnswers))
    localStorage.setItem('tree-chat-completed', 'true')

    // Navigate to result page
    router.push('/tree-result')
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