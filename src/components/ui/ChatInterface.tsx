'use client'

import { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import ChatHeader from './ChatHeader'

interface Message {
  id: string
  message: string
  isUser: boolean
  timestamp: string
}

interface ChatInterfaceProps {
  title: string
  questions: string[]
  onComplete: (answers: string[]) => void
  initialMessage?: string
}

export default function ChatInterface({
  title,
  questions,
  onComplete,
  initialMessage = "Let's begin! I'll ask you some questions to help you discover more about yourself and your project."
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Add initial message and first question
    const initialMessages: Message[] = [
      {
        id: '1',
        message: initialMessage,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]

    if (questions.length > 0) {
      initialMessages.push({
        id: '2',
        message: questions[0],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })
    }

    setMessages(initialMessages)
  }, [questions, initialMessage])

  const handleSendMessage = () => {
    if (!currentInput.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      message: currentInput.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const newAnswers = [...answers, currentInput.trim()]
    setAnswers(newAnswers)
    setMessages(prev => [...prev, userMessage])
    setCurrentInput('')

    // Move to next question or complete
    const nextQuestionIndex = currentQuestionIndex + 1

    if (nextQuestionIndex < questions.length) {
      // Add next question after a brief delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          message: questions[nextQuestionIndex],
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, aiMessage])
        setCurrentQuestionIndex(nextQuestionIndex)
      }, 1000)
    } else {
      // All questions answered
      setTimeout(() => {
        const completionMessage: Message = {
          id: (Date.now() + 1).toString(),
          message: "Great! You've answered all the questions. Thank you for sharing your thoughts. You can now complete this section.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, completionMessage])
        setIsComplete(true)
      }, 1000)
    }
  }

  const handleComplete = () => {
    onComplete(answers)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (currentInput.trim() || isComplete) {
        isComplete ? handleComplete() : handleSendMessage()
      }
    }
  }

  const isInputEmpty = !currentInput.trim()
  const buttonText = isComplete ? 'Complete' : 'Send'
  const isButtonDisabled = !isComplete && isInputEmpty

  return (
    <div className="flex flex-col h-screen bg-bg">
      <ChatHeader title={title} />

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.message}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Footer */}
      <footer className="sticky bottom-0 bg-bg border-t border-border">
        <div className="p-4">
          <div className="relative">
            <input
              className="w-full h-12 px-4 pr-28 rounded-lg bg-bg-light border border-border text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder={isComplete ? "All questions answered!" : "Type your answer..."}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isComplete}
            />
            <button
              className={`
                absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4 rounded-lg font-semibold text-sm transition-all duration-300
                ${isButtonDisabled
                  ? 'bg-border text-text-muted cursor-not-allowed'
                  : isComplete
                    ? 'bg-success text-bg-dark shadow-lg animate-pulse'
                    : 'bg-primary text-bg-dark hover:bg-warning'
                }
              `}
              onClick={isComplete ? handleComplete : handleSendMessage}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}