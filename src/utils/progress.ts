import { UserProgress, GameStats, StageCompletion } from '@/types'

const POINTS_PER_LEVEL = 5000
const STREAK_BONUS_MULTIPLIER = 0.1

export class ProgressManager {
  static getUserProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress()
    }

    try {
      const stored = localStorage.getItem('userProgress')
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error reading user progress:', error)
    }

    return this.getDefaultProgress()
  }

  static saveUserProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('userProgress', JSON.stringify(progress))
    } catch (error) {
      console.error('Error saving user progress:', error)
    }
  }

  static completeStage(stageId: string, points: number, answers: string[]): UserProgress {
    const currentProgress = this.getUserProgress()

    // Calculate streak bonus
    const streakBonus = Math.floor(points * currentProgress.streak * STREAK_BONUS_MULTIPLIER)
    const totalPoints = points + streakBonus

    const completion: StageCompletion = {
      completed: true,
      points: totalPoints,
      completedAt: new Date().toISOString(),
      answers
    }

    const updatedProgress: UserProgress = {
      ...currentProgress,
      totalPoints: currentProgress.totalPoints + totalPoints,
      streak: currentProgress.streak + 1,
      stages: {
        ...currentProgress.stages,
        [stageId]: completion
      },
      lastActivity: new Date().toISOString()
    }

    this.saveUserProgress(updatedProgress)
    return updatedProgress
  }

  static getGameStats(): GameStats {
    const progress = this.getUserProgress()

    const level = Math.floor(progress.totalPoints / POINTS_PER_LEVEL) + 1
    const pointsInCurrentLevel = progress.totalPoints % POINTS_PER_LEVEL
    const pointsToNextLevel = POINTS_PER_LEVEL - pointsInCurrentLevel

    const totalCompletedStages = Object.values(progress.stages).filter(
      stage => stage.completed
    ).length

    return {
      level,
      pointsToNextLevel,
      totalCompletedStages,
      currentStreak: progress.streak
    }
  }

  static isStageCompleted(stageId: string): boolean {
    const progress = this.getUserProgress()
    return progress.stages[stageId]?.completed || false
  }

  static getStageCompletion(stageId: string): StageCompletion | null {
    const progress = this.getUserProgress()
    return progress.stages[stageId] || null
  }

  static getTotalPoints(): number {
    const progress = this.getUserProgress()
    return progress.totalPoints
  }

  static getCurrentStreak(): number {
    const progress = this.getUserProgress()
    return progress.streak
  }

  static resetProgress(): void {
    if (typeof window === 'undefined') return

    localStorage.removeItem('userProgress')
    localStorage.removeItem('stageProgress')
    localStorage.removeItem('userPoints')

    // Clear any stage-specific data
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.includes('-chat-') || key.includes('-stage-'))) {
        keysToRemove.push(key)
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  private static getDefaultProgress(): UserProgress {
    return {
      totalPoints: 0,
      streak: 0,
      stages: {},
      lastActivity: new Date().toISOString()
    }
  }
}

export default ProgressManager