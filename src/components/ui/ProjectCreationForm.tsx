'use client'

import { useState } from 'react'

interface ProjectCreationFormProps {
  onComplete: (projectData: { name: string; description: string }) => void
}

export default function ProjectCreationForm({ onComplete }: ProjectCreationFormProps) {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!projectName.trim()) return

    setIsSubmitting(true)

    // Simulate a brief loading state
    setTimeout(() => {
      const projectData = {
        name: projectName.trim(),
        description: projectDescription.trim() || 'A new innovation project'
      }

      onComplete(projectData)
      setIsSubmitting(false)
    }, 500)
  }

  const isValid = projectName.trim().length > 0

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-text mb-2">
            Project Name *
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter your project name..."
            className="
              w-full
              px-4
              py-3
              bg-bg
              border
              border-border
              rounded-lg
              text-text
              placeholder-text-muted
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-transparent
              transition-all
              duration-200
            "
            maxLength={50}
            required
          />
          <p className="mt-1 text-xs text-text-muted">
            {projectName.length}/50 characters
          </p>
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-text mb-2">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe your project vision..."
            rows={4}
            className="
              w-full
              px-4
              py-3
              bg-bg
              border
              border-border
              rounded-lg
              text-text
              placeholder-text-muted
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-transparent
              transition-all
              duration-200
              resize-none
            "
            maxLength={200}
          />
          <p className="mt-1 text-xs text-text-muted">
            {projectDescription.length}/200 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`
            w-full
            py-3
            px-6
            rounded-lg
            font-medium
            transition-all
            duration-200
            ${isValid && !isSubmitting
              ? 'bg-primary text-bg-dark hover:bg-warning hover:scale-105 shadow-lg hover:shadow-xl'
              : 'bg-border text-text-muted cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-bg-dark border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Project...</span>
            </div>
          ) : (
            'Create Project & Start Journey'
          )}
        </button>
      </form>

      {/* Additional info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-text-muted">
          You can always update your project details later in the dashboard
        </p>
      </div>
    </div>
  )
}