'use client'

import { useRouter } from 'next/navigation'
import BottomNavigation from '@/components/ui/BottomNavigation'

export default function DashboardPage() {
  const router = useRouter()

  const steps = [
    {
      id: 1,
      title: 'Start with Why',
      description: 'Here we can add the description or a little interest.',
      completed: false
    },
    {
      id: 2,
      title: 'Personas',
      description: 'Here we can add the description or a little interest.',
      completed: false
    },
    {
      id: 3,
      title: 'Value Proposition canvas',
      description: 'Here we can add the description or a little interest.',
      completed: false
    },
    {
      id: 4,
      title: 'Lean canvas',
      description: 'Here we can add the description or a little interest.',
      completed: false
    },
    {
      id: 5,
      title: 'Minimum valuable product',
      description: 'Here we can add the description or a little interest.',
      completed: false
    },
    {
      id: 6,
      title: 'Mobius Loop',
      description: 'Here we can add the description or a little interest.',
      completed: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary-green text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-lg">⭐ 3</span>
            <span className="text-lg">💚 200</span>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-primary-green h-2 rounded-full transition-all duration-300"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (index === 0) router.push('/why-options')
                    else router.push(`/step-${step.id}`)
                  }}
                  className="bg-gray-800 text-white px-4 py-2 rounded ml-4 hover:bg-gray-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}