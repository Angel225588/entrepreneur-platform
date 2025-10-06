import StepLayout from '@/components/StepLayout'

export default function LeanCanvasPage() {
  return (
    <StepLayout currentStep={4}>
      <div className="space-y-6 md:space-y-8">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight">
          Lean canvas
        </h1>

        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed px-2">
          We will find out who is your client, what are they needs, motivations and frustrations.
        </p>
      </div>
    </StepLayout>
  )
}