interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full transition-colors duration-300 ${
            index === currentStep
              ? 'bg-primary-green'
              : index < currentStep
              ? 'bg-green-300'
              : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  )
}