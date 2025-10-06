'use client'

import { useRouter } from 'next/navigation'

interface ChatHeaderProps {
  title: string
  points?: number
  streak?: number
}

export default function ChatHeader({ title, points = 50, streak = 12 }: ChatHeaderProps) {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between p-4 bg-primary text-bg-dark border-b border-border-muted">
      <button
        onClick={() => router.back()}
        className="p-2 text-bg-dark hover:bg-bg-dark/10 rounded-lg transition-colors"
      >
        <svg
          fill="currentColor"
          height="24"
          viewBox="0 0 256 256"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
        </svg>
      </button>

      <h1 className="text-lg font-bold text-bg-dark truncate mx-4">
        {title}
      </h1>

      <div className="flex items-center space-x-2">
        <span className="bg-bg-dark/20 text-bg-dark px-3 py-1 rounded-full text-sm font-medium">
          🔥 {points}
        </span>
        <span className="bg-bg-dark/20 text-bg-dark px-3 py-1 rounded-full text-sm font-medium">
          📚 {streak}
        </span>
      </div>
    </header>
  )
}