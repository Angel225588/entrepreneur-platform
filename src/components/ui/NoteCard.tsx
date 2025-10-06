'use client'

import { useState } from 'react'

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

interface NoteCardProps {
  note: Note
  onEdit: (noteId: string) => void
  onDelete: (noteId: string) => void
  onFixInconsistency: (noteId: string) => void
}

export default function NoteCard({ note, onEdit, onDelete, onFixInconsistency }: NoteCardProps) {
  const [showActions, setShowActions] = useState(false)
  const [showInconsistencyDetails, setShowInconsistencyDetails] = useState(false)

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
      orange: 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800',
      green: 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800',
      purple: 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800',
      pink: 'bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800',
      teal: 'bg-teal-100 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '🚨'
      case 'important':
        return '⚡'
      default:
        return '💭'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'qna':
        return '❓'
      case 'insight':
        return '💡'
      case 'goal':
        return '🎯'
      case 'idea':
        return '💭'
      default:
        return '📝'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-300 hover:shadow-lg cursor-pointer
        ${getColorClasses(note.color)}
        ${note.hasInconsistency ? 'ring-2 ring-red-400 ring-offset-2 ring-offset-bg' : ''}
        ${note.priority === 'urgent' ? 'animate-pulse' : ''}
        group
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Priority and Type Indicators */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm">{getPriorityIcon(note.priority)}</span>
          <span className="text-sm">{getTypeIcon(note.type)}</span>
          <span className="text-xs text-text-muted bg-bg/50 px-2 py-1 rounded-full">
            {note.stage}
          </span>
        </div>

        {/* Inconsistency Warning */}
        {note.hasInconsistency && (
          <button
            onClick={() => setShowInconsistencyDetails(!showInconsistencyDetails)}
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Has inconsistency - click for details"
          >
            ⚠️
          </button>
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold text-text mb-2 line-clamp-2">
        {note.title}
      </h3>

      {/* Content */}
      <div className="text-sm text-text leading-relaxed mb-3">
        {note.question && (
          <div className="mb-2">
            <span className="font-medium text-text-muted">Q: </span>
            <span className="text-text">{note.question}</span>
          </div>
        )}
        {note.answer && (
          <div className="mb-2">
            <span className="font-medium text-text-muted">A: </span>
            <span className="text-text">{note.answer}</span>
          </div>
        )}
        {!note.question && !note.answer && (
          <p className="line-clamp-4">{note.content}</p>
        )}
      </div>

      {/* Inconsistency Details */}
      {note.hasInconsistency && showInconsistencyDetails && (
        <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs">
          <p className="text-red-700 dark:text-red-300 mb-2">
            <strong>⚠️ Inconsistency Detected:</strong>
          </p>
          <p className="text-red-600 dark:text-red-400">
            {note.inconsistencyDetails}
          </p>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-xs text-text-muted">
        {formatDate(note.updatedAt)}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-bg/90 backdrop-blur-sm rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {note.hasInconsistency && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFixInconsistency(note.id)
              }}
              className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
              title="Mark inconsistency as resolved"
            >
              ✅
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(note.id)
            }}
            className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
            title="Edit note"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(note.id)
            }}
            className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      )}

      {/* Attention Pulse for High Priority */}
      {note.priority === 'urgent' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      )}
      {note.priority === 'urgent' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      )}
    </div>
  )
}