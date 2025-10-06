'use client'

interface Stage {
  id: number
  title: string
  completed: boolean
  locked: boolean
  route: string
}

interface CircularStageNavProps {
  stages: Stage[]
  onStageClick: (stage: Stage) => void
}

export default function CircularStageNav({
  stages,
  onStageClick
}: CircularStageNavProps) {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center space-x-2">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center">
            {/* Stage Circle */}
            <button
              onClick={() => onStageClick(stage)}
              disabled={stage.locked}
              className={`
                w-4 h-4 rounded-full border-2 transition-all duration-300
                ${stage.completed
                  ? 'bg-primary border-primary'
                  : stage.locked
                    ? 'bg-bg border-border opacity-50 cursor-not-allowed'
                    : index === 0
                      ? 'bg-primary border-primary'
                      : 'bg-bg border-border hover:border-primary'
                }
                ${!stage.locked && 'hover:scale-110'}
              `}
            >
              {stage.completed && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>

            {/* Connecting Line */}
            {index < stages.length - 1 && (
              <div className={`
                w-8 h-0.5 mx-1
                ${stages[index + 1].completed || (!stages[index + 1].locked && index === 0)
                  ? 'bg-primary'
                  : 'bg-border'
                }
                transition-colors duration-300
              `}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}