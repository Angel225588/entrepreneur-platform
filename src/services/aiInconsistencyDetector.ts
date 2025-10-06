interface Note {
  id: string
  title: string
  content: string
  stage: string
  stageId: number
  question?: string
  answer?: string
  type: 'qna' | 'insight' | 'goal' | 'idea'
  priority: 'urgent' | 'important' | 'normal'
  hasInconsistency: boolean
  inconsistencyDetails?: string
  createdAt: string
  updatedAt: string
  color: string
}

interface InconsistencyResult {
  hasInconsistency: boolean
  details?: string
  severity: 'low' | 'medium' | 'high'
  suggestions?: string[]
}

class AIInconsistencyDetector {
  private inconsistencyRules = [
    {
      name: 'Target Market Alignment',
      check: (notes: Note[]) => this.checkTargetMarketAlignment(notes),
      stages: ['Start with Why', 'Personas', 'Value Proposition']
    },
    {
      name: 'Value Proposition Consistency',
      check: (notes: Note[]) => this.checkValuePropositionConsistency(notes),
      stages: ['Start with Why', 'Value Proposition', 'Lean Canvas']
    },
    {
      name: 'Goal-Strategy Alignment',
      check: (notes: Note[]) => this.checkGoalStrategyAlignment(notes),
      stages: ['Start with Why', 'MVP', 'Mobius Loop']
    },
    {
      name: 'Resource-Scope Mismatch',
      check: (notes: Note[]) => this.checkResourceScopeMismatch(notes),
      stages: ['Lean Canvas', 'MVP']
    }
  ]

  detectInconsistencies(notes: Note[]): Map<string, InconsistencyResult> {
    const results = new Map<string, InconsistencyResult>()

    // Run each inconsistency rule
    for (const rule of this.inconsistencyRules) {
      const relevantNotes = notes.filter(note =>
        rule.stages.includes(note.stage)
      )

      if (relevantNotes.length >= 2) {
        const inconsistencies = rule.check(relevantNotes)
        inconsistencies.forEach((result, noteId) => {
          if (result.hasInconsistency) {
            results.set(noteId, result)
          }
        })
      }
    }

    return results
  }

  private checkTargetMarketAlignment(notes: Note[]): Map<string, InconsistencyResult> {
    const results = new Map<string, InconsistencyResult>()

    const whyNotes = notes.filter(note => note.stage === 'Start with Why')
    const personaNotes = notes.filter(note => note.stage === 'Personas')
    const valueNotes = notes.filter(note => note.stage === 'Value Proposition')

    // Look for target market misalignment
    for (const personaNote of personaNotes) {
      const content = (personaNote.content || personaNote.answer || '').toLowerCase()

      // Check for overly broad or conflicting target markets
      if (content.includes('all') || content.includes('everyone') || content.includes('any')) {
        for (const valueNote of valueNotes) {
          const valueContent = (valueNote.content || valueNote.answer || '').toLowerCase()
          if (valueContent.includes('specific') || valueContent.includes('niche') || valueContent.includes('targeted')) {
            results.set(personaNote.id, {
              hasInconsistency: true,
              details: 'Your target market appears too broad compared to your value proposition. Consider narrowing your focus to a specific segment.',
              severity: 'medium',
              suggestions: [
                'Define a specific user persona',
                'Identify the most valuable customer segment',
                'Align your value proposition with this segment'
              ]
            })
          }
        }
      }
    }

    return results
  }

  private checkValuePropositionConsistency(notes: Note[]): Map<string, InconsistencyResult> {
    const results = new Map<string, InconsistencyResult>()

    const whyNotes = notes.filter(note => note.stage === 'Start with Why')
    const valueNotes = notes.filter(note => note.stage === 'Value Proposition')

    // Check if value proposition aligns with core motivation
    for (const valueNote of valueNotes) {
      const valueContent = (valueNote.content || valueNote.answer || '').toLowerCase()

      for (const whyNote of whyNotes) {
        const whyContent = (whyNote.content || whyNote.answer || '').toLowerCase()

        // Simple keyword conflict detection
        const valueKeywords = this.extractKeywords(valueContent)
        const whyKeywords = this.extractKeywords(whyContent)

        const alignment = this.calculateKeywordAlignment(valueKeywords, whyKeywords)

        if (alignment < 0.3) { // Low alignment threshold
          results.set(valueNote.id, {
            hasInconsistency: true,
            details: 'Your value proposition may not align well with your core motivation. Ensure they support the same overall goal.',
            severity: 'high',
            suggestions: [
              'Review your core motivation',
              'Refine your value proposition to better support your why',
              'Consider if you need to adjust either statement'
            ]
          })
        }
      }
    }

    return results
  }

  private checkGoalStrategyAlignment(notes: Note[]): Map<string, InconsistencyResult> {
    const results = new Map<string, InconsistencyResult>()

    const goalNotes = notes.filter(note => note.type === 'goal')
    const strategyNotes = notes.filter(note => note.stage === 'MVP' || note.stage === 'Mobius Loop')

    // Check for unrealistic timelines or resource expectations
    for (const goalNote of goalNotes) {
      const goalContent = (goalNote.content || goalNote.answer || '').toLowerCase()

      if (goalContent.includes('100%') || goalContent.includes('perfect') || goalContent.includes('immediate')) {
        results.set(goalNote.id, {
          hasInconsistency: true,
          details: 'This goal may be too ambitious or unrealistic. Consider setting more achievable milestones.',
          severity: 'medium',
          suggestions: [
            'Break down into smaller, measurable goals',
            'Set realistic timelines',
            'Define success metrics that are achievable'
          ]
        })
      }
    }

    return results
  }

  private checkResourceScopeMismatch(notes: Note[]): Map<string, InconsistencyResult> {
    const results = new Map<string, InconsistencyResult>()

    const canvasNotes = notes.filter(note => note.stage === 'Lean Canvas')
    const mvpNotes = notes.filter(note => note.stage === 'MVP')

    // Check for scope-resource misalignment
    for (const mvpNote of mvpNotes) {
      const mvpContent = (mvpNote.content || mvpNote.answer || '').toLowerCase()

      // Look for feature-heavy MVP descriptions
      const featureCount = (mvpContent.match(/feature|function|capability|tool|system/g) || []).length

      if (featureCount > 5) {
        results.set(mvpNote.id, {
          hasInconsistency: true,
          details: 'Your MVP may be too complex. Focus on the core features that validate your key assumptions.',
          severity: 'medium',
          suggestions: [
            'Identify the 1-3 core features for validation',
            'Remove nice-to-have features from MVP',
            'Focus on learning over completeness'
          ]
        })
      }
    }

    return results
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction - remove common words and extract meaningful terms
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they']

    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word))
      .slice(0, 10) // Take top 10 keywords
  }

  private calculateKeywordAlignment(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0

    const intersection = keywords1.filter(word => keywords2.includes(word))
    const union = [...new Set([...keywords1, ...keywords2])]

    return intersection.length / union.length
  }

  // Real-time inconsistency detection for new notes
  analyzeNewNote(newNote: Note, existingNotes: Note[]): InconsistencyResult {
    const allNotes = [...existingNotes, newNote]
    const inconsistencies = this.detectInconsistencies(allNotes)

    return inconsistencies.get(newNote.id) || {
      hasInconsistency: false,
      severity: 'low'
    }
  }

  // Batch analysis for existing notes
  analyzeAllNotes(notes: Note[]): Note[] {
    const inconsistencies = this.detectInconsistencies(notes)

    return notes.map(note => {
      const inconsistency = inconsistencies.get(note.id)
      if (inconsistency) {
        return {
          ...note,
          hasInconsistency: true,
          inconsistencyDetails: inconsistency.details,
          priority: inconsistency.severity === 'high' ? 'urgent' as const : note.priority
        }
      }
      return note
    })
  }
}

export const aiInconsistencyDetector = new AIInconsistencyDetector()
export type { InconsistencyResult }