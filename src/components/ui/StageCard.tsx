interface StageCardProps {
  title: string
  description: string
  progress: number
  onContinue: () => void
  isCompleted?: boolean
  needsAttention?: boolean
}

export default function StageCard({
  title,
  description,
  progress,
  onContinue,
  isCompleted = false,
  needsAttention = false
}: StageCardProps) {
  return (
    <div className={`
      w-full
      min-w-[320px]
      max-w-none
      sm:max-w-[640px]
      md:max-w-[768px]
      lg:max-w-[1024px]
      xl:max-w-[1200px]
      mx-auto
      bg-bg-light
      border
      ${needsAttention ? 'border-primary' : 'border-border'}
      rounded-lg
      p-4
      sm:p-6
      md:p-8
      transition-all
      duration-300
      hover:shadow-md
      hover:border-border-muted
      ${needsAttention ? 'ring-2 ring-primary/20 ring-offset-2 ring-offset-bg' : ''}
      relative
    `}>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Progress Bar */}
          <div className="mb-3 sm:mb-4">
            <div className="w-full bg-border-muted rounded-full h-2 sm:h-3">
              <div
                className="bg-success h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-text-muted mt-1">
              <span>{progress}%</span>
              {isCompleted && <span className="text-success font-medium">✓ Complete</span>}
            </div>
          </div>

          {/* Title */}
          <h3 className="
            text-lg
            sm:text-xl
            md:text-2xl
            font-semibold
            text-text
            mb-2
            sm:mb-3
            leading-tight
            break-words
          ">
            {title}
          </h3>

          {/* Description */}
          <p className="
            text-sm
            sm:text-base
            md:text-lg
            text-text-muted
            leading-relaxed
            break-words
          ">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 lg:ml-4">
          <button
            onClick={onContinue}
            className="
              w-full
              lg:w-auto
              bg-primary
              text-bg-dark
              px-4
              sm:px-6
              md:px-8
              py-2
              sm:py-3
              rounded
              font-medium
              text-sm
              sm:text-base
              hover:bg-warning
              active:bg-highlight
              transition-colors
              duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:ring-offset-2
              min-w-[80px]
              sm:min-w-[100px]
            "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}