'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import NoteCard from '@/components/ui/NoteCard'
import NotificationBadge from '@/components/ui/NotificationBadge'
import { aiInconsistencyDetector } from '@/services/aiInconsistencyDetector'

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

export default function NotesPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentProject, setCurrentProject] = useState<any>(null)

  useEffect(() => {
    // Load current project from localStorage
    const stored = localStorage.getItem('currentProject')
    if (stored) {
      setCurrentProject(JSON.parse(stored))
    }

    // Load notes from localStorage or initialize with sample data
    const storedNotes = localStorage.getItem('projectNotes')
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes)
      setNotes(parsedNotes)
      setFilteredNotes(parsedNotes)
    } else {
      // Initialize with sample notes based on the reference
      const initialNotes: Note[] = [
        {
          id: '1',
          title: 'Why am I starting this project?',
          content: 'I want to create a platform that helps entrepreneurs validate their ideas systematically. Too many great ideas fail because they skip the validation phase.',
          stage: 'Start with Why',
          stageId: 1,
          question: 'What is your core motivation for this project?',
          answer: 'I want to create a platform that helps entrepreneurs validate their ideas systematically. Too many great ideas fail because they skip the validation phase.',
          type: 'qna',
          priority: 'important',
          hasInconsistency: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          color: 'blue'
        },
        {
          id: '2',
          title: 'Target Market Insights',
          content: 'Entrepreneurs aged 25-45 who have been burned by failed startups. They need structured guidance and validation frameworks.',
          stage: 'Personas',
          stageId: 2,
          type: 'insight',
          priority: 'normal',
          hasInconsistency: true,
          inconsistencyDetails: 'This target market conflicts with your stated goal of helping "all entrepreneurs". Consider narrowing your focus.',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          color: 'orange'
        },
        {
          id: '3',
          title: 'Core Value Proposition',
          content: 'We provide a structured, AI-powered validation process that reduces startup failure rate by 60%.',
          stage: 'Value Proposition',
          stageId: 3,
          type: 'goal',
          priority: 'urgent',
          hasInconsistency: false,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString(),
          color: 'green'
        },
        {
          id: '4',
          title: 'Key Success Metrics',
          content: '• User validation completion rate > 70%\n• Startup success rate improvement\n• Time to market reduction\n• User satisfaction score > 4.5/5',
          stage: 'Start with Why',
          stageId: 1,
          type: 'goal',
          priority: 'important',
          hasInconsistency: false,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          updatedAt: new Date(Date.now() - 259200000).toISOString(),
          color: 'purple'
        },
        {
          id: '5',
          title: 'Competitive Advantage',
          content: 'AI-powered inconsistency detection between different stages of the validation process. No other platform offers this level of coherence checking.',
          stage: 'Value Proposition',
          stageId: 3,
          type: 'idea',
          priority: 'normal',
          hasInconsistency: false,
          createdAt: new Date(Date.now() - 345600000).toISOString(),
          updatedAt: new Date(Date.now() - 345600000).toISOString(),
          color: 'indigo'
        }
      ]
      setNotes(initialNotes)
      setFilteredNotes(initialNotes)
      localStorage.setItem('projectNotes', JSON.stringify(initialNotes))
    }
  }, [])

  const filterStages = ['All', 'Start with Why', 'Personas', 'Value Proposition', 'Lean Canvas', 'MVP', 'Mobius Loop']

  // AI Inconsistency Detection
  const runInconsistencyDetection = useCallback(() => {
    const analyzedNotes = aiInconsistencyDetector.analyzeAllNotes(notes)
    setNotes(analyzedNotes)
    setFilteredNotes(analyzedNotes.filter(note =>
      selectedFilter === 'All' || note.stage === selectedFilter
    ))
    localStorage.setItem('projectNotes', JSON.stringify(analyzedNotes))
  }, [notes, selectedFilter])

  // Run inconsistency detection when notes change
  useEffect(() => {
    if (notes.length > 0) {
      const timer = setTimeout(() => {
        runInconsistencyDetection()
      }, 2000) // Run after 2 seconds of no changes
      return () => clearTimeout(timer)
    }
  }, [notes.length, runInconsistencyDetection]) // Only run when note count changes

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    if (filter === 'All') {
      setFilteredNotes(notes)
    } else {
      setFilteredNotes(notes.filter(note => note.stage === filter))
    }
  }

  const handleNoteEdit = (noteId: string) => {
    // TODO: Implement note editing
    console.log('Edit note:', noteId)
  }

  const handleNoteDelete = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId)
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes.filter(note =>
      selectedFilter === 'All' || note.stage === selectedFilter
    ))
    localStorage.setItem('projectNotes', JSON.stringify(updatedNotes))
  }

  const handleInconsistencyFix = (noteId: string) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId
        ? { ...note, hasInconsistency: false, inconsistencyDetails: undefined }
        : note
    )
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes.filter(note =>
      selectedFilter === 'All' || note.stage === selectedFilter
    ))
    localStorage.setItem('projectNotes', JSON.stringify(updatedNotes))
  }

  const urgentCount = notes.filter(note => note.priority === 'urgent').length
  const inconsistencyCount = notes.filter(note => note.hasInconsistency).length

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Header */}
      <div className="bg-primary text-bg-dark px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - AI Avatar and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-bg-dark/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg">📝</span>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-bg-dark">
                Project Notes
              </h1>
              <p className="text-sm text-bg-dark/80">
                With your AI assistant
              </p>
            </div>
          </div>

          {/* Right side - Notifications and Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="hidden md:flex items-center space-x-3">
              {inconsistencyCount > 0 && (
                <NotificationBadge
                  count={inconsistencyCount}
                  type="inconsistency"
                  label="Inconsistencies"
                />
              )}
              {urgentCount > 0 && (
                <NotificationBadge
                  count={urgentCount}
                  type="urgent"
                  label="Urgent Items"
                />
              )}
            </div>

            {/* Menu button */}
            <button
              onClick={() => setIsSideNavOpen(true)}
              className="p-2 rounded-lg bg-bg-dark/20 hover:bg-bg-dark/30 transition-colors"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {filterStages.map((stage) => (
            <button
              key={stage}
              onClick={() => handleFilterChange(stage)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === stage
                  ? 'bg-primary text-white'
                  : 'bg-bg-light text-text hover:bg-highlight border border-border'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleNoteEdit}
              onDelete={handleNoteDelete}
              onFixInconsistency={handleInconsistencyFix}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-bg-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-text-muted">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">No notes yet</h3>
            <p className="text-text-muted mb-6">
              Start adding notes to track your project insights and answers.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Add Your First Note
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center w-16 h-16 text-white rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-all hover:scale-105"
        >
          <span className="text-3xl font-light">+</span>
        </button>
      </div>

      {/* Side Navigation Overlay */}
      {isSideNavOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSideNavOpen(false)}
          ></div>

          {/* Side Navigation Panel */}
          <div className="absolute right-0 top-0 h-full w-1/2 bg-bg border-l border-border shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-text">Menu</h2>
                <button
                  onClick={() => setIsSideNavOpen(false)}
                  className="p-2 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Navigation Items */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    router.push('/dashboard')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">🏠</span>
                  <span className="font-medium">Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary/10 border border-primary text-primary"
                >
                  <span className="text-xl">📝</span>
                  <span className="font-medium">Notes</span>
                </button>

                <button
                  onClick={() => {
                    router.push('/profile')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">👤</span>
                  <span className="font-medium">Profile</span>
                </button>

                {/* Theme Toggle */}
                <div className="border-t border-border pt-4 mt-6">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-bg-light border border-border">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🌓</span>
                      <span className="font-medium text-text">Theme</span>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}