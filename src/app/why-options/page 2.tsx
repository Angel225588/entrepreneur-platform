'use client'

import { useRouter } from 'next/navigation'

export default function WhyOptionsPage() {
  const router = useRouter()

  const options = [
    {
      id: 'start-with-why',
      title: 'START WITH WHY',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/why'
    },
    {
      id: 'ikigai',
      title: 'Ikigui',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/ikigai'
    },
    {
      id: 'tree-of-life',
      title: 'Tree of life',
      description: 'In this section you will know exactly why you are doing this project which is the most important step to achieve success on your project',
      points: 500,
      route: '/tree-of-life'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <button
          onClick={() => router.back()}
          className="text-2xl"
        >
          ←
        </button>
        <div className="flex space-x-2">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">🔥 50</span>
          <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm">100</span>
        </div>
      </div>

      {/* Title */}
      <div className="px-6 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">WHY</h1>

        {/* Options */}
        <div className="space-y-6">
          {options.map((option) => (
            <div key={option.id} className="bg-gray-100 rounded-2xl p-6 relative overflow-hidden">
              {/* Background pattern/image placeholder */}
              <div className="absolute left-4 top-4 w-24 h-24 bg-blue-200 rounded-xl opacity-50"></div>

              <div className="relative z-10 ml-32">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {option.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {option.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
                    {option.points}
                  </span>
                  <button
                    onClick={() => router.push(option.route)}
                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}