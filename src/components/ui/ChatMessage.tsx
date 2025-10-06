'use client'

interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp?: string
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-bg-dark font-bold text-sm flex-shrink-0">
          AI
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <span className="text-xs text-text-muted mb-1">
          {isUser ? 'You' : 'AI Assistant'}
        </span>
        <div
          className={`
            p-3 rounded-lg max-w-xs
            ${isUser
              ? 'bg-primary text-bg-dark rounded-tr-none'
              : 'bg-bg-light border border-border text-text rounded-tl-none'
            }
          `}
        >
          <p className="text-sm md:text-base leading-relaxed">{message}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-text-muted mt-1">{timestamp}</span>
        )}
      </div>

      {isUser && (
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-bg-dark font-bold text-sm flex-shrink-0">
          U
        </div>
      )}
    </div>
  )
}