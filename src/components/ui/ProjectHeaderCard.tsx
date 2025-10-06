'use client'

import { useEffect, useState } from 'react'

interface ProjectHeaderCardProps {
  title: string
  description: string
  badge: string
  onStart: () => void
}

export default function ProjectHeaderCard({
  title,
  description,
  badge,
  onStart
}: ProjectHeaderCardProps) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkTheme = () => {
      const hasLightClass = document.body.classList.contains('light')
      setIsDark(!hasLightClass)
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-[400px] h-[200px] bg-bg-light border border-border rounded-xl overflow-hidden flex group hover:shadow-lg hover:border-border-muted transition-all duration-300">
      {/* Left side - Icon */}
      <div className="w-[160px] h-full bg-bg-dark rounded-l-xl flex items-center justify-center">
        <div className="text-white text-4xl">
          {/* Bull/Taurus icon */}
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C8.5 2 6 4.5 6 8C6 9.5 6.5 10.8 7.3 11.8C7.1 12.5 7 13.2 7 14C7 18.4 10.6 22 15 22H16C16.6 22 17 21.6 17 21S16.6 20 16 20H15C11.7 20 9 17.3 9 14C9 13.4 9.1 12.9 9.3 12.4C10.1 13.4 11.5 14 12 14C12.5 14 13.9 13.4 14.7 12.4C14.9 12.9 15 13.4 15 14C15 17.3 12.3 20 9 20H8C7.4 20 7 20.4 7 21S7.4 22 8 22H9C13.4 22 17 18.4 17 14C17 13.2 16.9 12.5 16.7 11.8C17.5 10.8 18 9.5 18 8C18 4.5 15.5 2 12 2ZM12 4C14.2 4 16 5.8 16 8C16 9.1 15.6 10.1 14.9 10.9C14.6 10.3 14.1 9.8 13.5 9.5C13.8 9.1 14 8.6 14 8C14 6.9 13.1 6 12 6S10 6.9 10 8C10 8.6 10.2 9.1 10.5 9.5C9.9 9.8 9.4 10.3 9.1 10.9C8.4 10.1 8 9.1 8 8C8 5.8 9.8 4 12 4Z"
              fill="currentColor"
            />
            <circle cx="10" cy="7" r="1" fill="currentColor"/>
            <circle cx="14" cy="7" r="1" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Top section - Title and badge */}
        <div>
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-lg font-bold text-text leading-tight">
              {title}
            </h2>
            <span className="bg-text-muted text-bg text-xs px-2 py-1 rounded-md font-medium">
              {badge}
            </span>
          </div>

          <p className="text-sm text-text-muted leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Bottom section - Start button */}
        <button
          onClick={onStart}
          className="w-full bg-bg-dark text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
        >
          Start
        </button>
      </div>
    </div>
  )
}