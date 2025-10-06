'use client'

import DashboardCard from './DashboardCard'
import { Project } from '@/types'
import { CONTAINERS, GRID_LAYOUTS } from '@/constants/styles'

interface StageSectionProps {
  stageId: number
  projects: Project[]
  onCardClick: (project: Project) => void
}

export default function StageSection({ stageId, projects, onCardClick }: StageSectionProps) {
  const stageProjects = projects.filter(project => project.id === stageId)

  return (
    <div id={`stage-${stageId}`} className={CONTAINERS.SECTION_SPACING}>
      <div className={CONTAINERS.MAX_WIDTH}>
        <div className={GRID_LAYOUTS.NOTES_STYLE_GRID}>
          {stageProjects.map((project) => {
            // A card needs attention if it's not locked, not completed, and either has progress or is the first available stage
            const needsAttention = !project.locked && !project.completed && (project.progress > 0 || stageId === 1)

            return (
              <DashboardCard
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                progress={project.progress}
                isCompleted={project.completed}
                locked={project.locked}
                needsAttention={needsAttention}
                onContinue={() => onCardClick(project)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}