'use client'

import { useRouter } from 'next/navigation'
import BottomNavigation from '@/components/ui/BottomNavigation'

export default function ProjectsPage() {
  const router = useRouter()

  const projects = [
    {
      id: 1,
      name: 'Project name',
      description: 'Here is a short description about the project',
      progress: 30
    },
    {
      id: 2,
      name: 'Project name',
      description: 'Here is a short description about the project',
      progress: 30
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

      {/* Projects Header */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-black">Projects</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-gray-300 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-gray-400 transition-colors"
          >
            +
          </button>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div
                        className="bg-primary-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gray-800 text-white px-4 py-2 rounded ml-4 hover:bg-gray-700 transition-colors"
                >
                  start
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