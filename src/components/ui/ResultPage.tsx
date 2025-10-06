'use client'

import { useRouter } from 'next/navigation'
import ChatHeader from './ChatHeader'

interface ResultPageProps {
  title: string
  answers: string[]
  questions: string[]
  onContinue: () => void
  insights?: string[]
}

export default function ResultPage({
  title,
  answers,
  questions,
  onContinue,
  insights = []
}: ResultPageProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen bg-bg">
      <ChatHeader title="Stage Summary" />

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Completion Icon */}
        <div className="text-center">
          <div className="inline-block p-3 bg-success/20 rounded-full mb-4">
            <svg
              className="text-success w-12 h-12"
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text">Stage Complete!</h2>
          <p className="text-text-muted mt-2">Here is a summary of your responses.</p>
        </div>

        {/* Responses Summary */}
        <div className="bg-bg-light border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-text mb-4">Your Responses</h3>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-text-muted font-medium mb-2">
                  Q{index + 1}: {question}
                </p>
                <p className="text-text leading-relaxed">
                  {answers[index] || 'No response provided'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        {insights.length > 0 && (
          <div className="bg-bg-light border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-text mb-4">Key Insights</h3>
            <ul className="space-y-3 list-disc list-inside text-text">
              {insights.map((insight, index) => (
                <li key={index} className="leading-relaxed">
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Continue Button */}
      <footer className="p-4 bg-bg border-t border-border">
        <button
          onClick={onContinue}
          className="w-full h-12 px-4 rounded-lg bg-primary text-bg-dark font-semibold text-sm hover:bg-warning transition-colors"
        >
          Continue to Success
        </button>
      </footer>
    </div>
  )
}