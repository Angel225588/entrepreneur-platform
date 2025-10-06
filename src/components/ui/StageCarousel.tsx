'use client'

import { useState } from 'react'

interface Stage {
  id: number
  name: string
  icon: string
  locked: boolean
  completed: boolean
  route: string
}

interface StageCarouselProps {
  stages: Stage[]
  onStageClick: (stage: Stage) => void
}

export default function StageCarousel({ stages, onStageClick }: StageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextStage = () => {
    setCurrentIndex((prev) => (prev + 1) % stages.length)
  }

  const prevStage = () => {
    setCurrentIndex((prev) => (prev - 1 + stages.length) % stages.length)
  }

  return (
    <div className="bg-bg-light border-t border-border py-4 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">Project Stages</h3>
        <div className="flex space-x-2">
          <button
            onClick={prevStage}
            className="p-2 rounded-lg bg-bg border border-border text-text hover:bg-highlight transition-colors"
            aria-label="Previous stage"
          >
            ←
          </button>
          <button
            onClick={nextStage}
            className="p-2 rounded-lg bg-bg border border-border text-text hover:bg-highlight transition-colors"
            aria-label="Next stage"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {stages.map((stage, index) => (
            <div
              key={stage.id}
              className="w-full flex-shrink-0 px-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stages.slice(index, index + 6).map((stageItem) => (
                  <div
                    key={stageItem.id}
                    onClick={() => !stageItem.locked && onStageClick(stageItem)}
                    className={`
                      relative
                      p-4
                      rounded-xl
                      border
                      transition-all
                      duration-300
                      cursor-pointer
                      flex
                      flex-col
                      items-center
                      text-center
                      space-y-2
                      ${stageItem.locked
                        ? 'bg-bg border-border opacity-50 cursor-not-allowed'
                        : stageItem.completed
                          ? 'bg-success/10 border-success hover:bg-success/20'
                          : 'bg-bg border-border hover:bg-highlight hover:border-border-muted'
                      }
                    `}
                  >
                    {/* Lock Overlay */}
                    {stageItem.locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-bg/80 rounded-xl">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}

                    {/* Completion Badge */}
                    {stageItem.completed && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-success text-white rounded-full flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}

                    {/* Icon */}
                    <div className="text-3xl">{stageItem.icon}</div>

                    {/* Name */}
                    <h4 className="text-sm font-medium text-text leading-tight">
                      {stageItem.name}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {stages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  )
}