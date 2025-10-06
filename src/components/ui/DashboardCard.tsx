'use client'

import { useEffect, useState } from 'react'

interface DashboardCardProps {
  title: string
  description: string
  image?: {
    light: string
    dark: string
  }
  progress?: number
  onContinue: () => void
  isCompleted?: boolean
  locked?: boolean
  needsAttention?: boolean
}

export default function DashboardCard({
  title,
  description,
  image,
  progress = 0,
  onContinue,
  isCompleted = false,
  locked = false,
  needsAttention = false
}: DashboardCardProps) {
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
    <div
      className={`
        w-[301px]
        min-[425px]:w-full
        min-[425px]:min-w-[299px]
        min-[425px]:max-w-[398px]
        md:max-w-none
        md:w-full
        h-[309px]
        md:h-[350px]
        lg:h-[380px]
        bg-bg
        border
        ${needsAttention ? 'border-primary' : 'border-border'}
        rounded-xl
        overflow-hidden
        transition-all
        duration-300
        ${locked
          ? 'opacity-50 cursor-not-allowed'
          : needsAttention
            ? 'hover:border-primary hover:scale-105 cursor-pointer animate-pulse'
            : 'hover:border-border-muted hover:scale-105 cursor-pointer'
        }
        group
        flex
        flex-col
        relative
        shadow-lg
        ${needsAttention ? 'ring-2 ring-primary/20 ring-offset-2 ring-offset-bg' : ''}
      `}
      style={{
        boxShadow: locked
          ? '0 4px 6px rgba(0,0,0,0.1)'
          : needsAttention
            ? '0 8px 25px rgba(59, 130, 246, 0.15), 0 4px 10px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
      onMouseEnter={(e) => {
        if (!locked) {
          e.currentTarget.style.boxShadow = needsAttention
            ? '0 25px 35px rgba(59, 130, 246, 0.25), 0 15px 15px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.1)'
        }
      }}
      onMouseLeave={(e) => {
        if (!locked) {
          e.currentTarget.style.boxShadow = needsAttention
            ? '0 8px 25px rgba(59, 130, 246, 0.15), 0 4px 10px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.1)'
        }
      }}
      onClick={!locked ? onContinue : undefined}
    >
      {/* Image Section - Top 60% */}
      <div className="
        relative
        h-[185px]
        md:h-[210px]
        lg:h-[240px]
        bg-gradient-to-br
        from-primary/20
        to-secondary/20
        overflow-hidden
        flex
        items-center
        justify-center
      ">
        {image ? (
          <img
            src={isDark ? image.dark : image.light}
            alt={title}
            className={`
              w-full
              h-full
              object-cover
              transition-transform
              duration-300
              ${!locked && 'group-hover:scale-110'}
            `}
          />
        ) : (
          <div className={`
            w-20
            h-20
            bg-primary
            text-bg-dark
            rounded-full
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            transition-transform
            duration-300
            ${!locked && 'group-hover:scale-110'}
          `}>
            {title.charAt(0)}
          </div>
        )}

        {/* Lock Overlay */}
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/80">
            <span className="text-4xl">🔒</span>
          </div>
        )}

        {/* Progress Indicator */}
        {progress > 0 && (
          <div className="
            absolute
            bottom-3
            left-3
            right-3
          ">
            <div className="w-full bg-bg-dark/20 rounded-full h-2">
              <div
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Completion Badge */}
        {isCompleted && (
          <div className="
            absolute
            top-3
            right-3
            bg-success
            text-white
            rounded-full
            w-8
            h-8
            flex
            items-center
            justify-center
            text-sm
            font-bold
          ">
            ✓
          </div>
        )}
      </div>

      {/* Text Section - Bottom 40% */}
      <div
        className="
          flex-1
          p-4
          flex
          flex-col
          justify-between
          relative
        "
        style={{
          boxShadow: !isDark ? 'inset 0 1px 3px rgba(0,0,0,0.05), 0 -1px 0 rgba(0,0,0,0.02)' : 'none'
        }}
      >
        {/* Title */}
        <h3 className={`
          text-lg
          md:text-xl
          lg:text-2xl
          font-semibold
          ${needsAttention ? 'text-primary' : 'text-text'}
          leading-tight
          mb-2
          md:mb-3
          group-hover:text-primary
          transition-colors
          duration-300
          line-clamp-2
        `}>
          {title}
        </h3>

        {/* Description */}
        <p className="
          text-sm
          md:text-base
          lg:text-lg
          text-text-muted
          leading-relaxed
          mb-3
          md:mb-4
          line-clamp-2
          group-hover:text-text
          transition-colors
          duration-300
        ">
          {description}
        </p>

        {/* Progress Text */}
        <div className="flex justify-between items-center text-xs">
          {progress > 0 && (
            <span className="text-text-muted">{progress}% Complete</span>
          )}
          <div className="
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            text-primary
            font-medium
            flex
            items-center
          ">
            Continue
            <svg
              className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Priority Indicator */}
      {needsAttention && (
        <div className="
          absolute
          top-2
          left-2
          w-3
          h-3
          bg-primary
          rounded-full
          animate-ping
        "></div>
      )}

      {/* Attention Pulse Ring */}
      {needsAttention && (
        <div className="
          absolute
          top-2
          left-2
          w-3
          h-3
          bg-primary
          rounded-full
        "></div>
      )}

      {/* Decorative corner element */}
      <div className={`
        absolute
        top-0
        right-0
        w-16
        h-16
        bg-gradient-to-bl
        ${needsAttention ? 'from-primary/40' : 'from-warning/30'}
        to-transparent
        rounded-bl-full
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
      `}></div>
    </div>
  )
}