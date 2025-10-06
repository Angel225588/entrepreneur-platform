export interface Project {
  id: number
  title: string
  description: string
  image?: {
    light: string
    dark: string
  }
  progress: number
  completed: boolean
  locked: boolean
  route?: string
}

export interface Stage {
  id: number
  name: string
  completed: boolean
  route: string
  locked?: boolean
}

export interface UserProject {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  stages: StageProgress[]
}

export interface StageProgress {
  stageId: number
  progress: number
  completed: boolean
  completedAt?: string
}

export interface FeatureCardData {
  title: string
  description: string
  icon: string
  gradient: string
}

export interface ChatMessage {
  id: string
  message: string
  isUser: boolean
  timestamp: string
}

export interface StageCompletion {
  completed: boolean
  points: number
  completedAt: string
  answers?: string[]
}

export interface UserProgress {
  totalPoints: number
  streak: number
  stages: Record<string, StageCompletion>
  lastActivity: string
}

export interface GameStats {
  level: number
  pointsToNextLevel: number
  totalCompletedStages: number
  currentStreak: number
}