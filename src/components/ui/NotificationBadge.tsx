'use client'

interface NotificationBadgeProps {
  count: number
  type: 'urgent' | 'important' | 'inconsistency'
  label: string
}

export default function NotificationBadge({ count, type, label }: NotificationBadgeProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500/20 border-red-400 text-red-300'
      case 'important':
        return 'bg-yellow-500/20 border-yellow-400 text-yellow-300'
      case 'inconsistency':
        return 'bg-orange-500/20 border-orange-400 text-orange-300'
      default:
        return 'bg-blue-500/20 border-blue-400 text-blue-300'
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return '🚨'
      case 'important':
        return '⚡'
      case 'inconsistency':
        return '⚠️'
      default:
        return '📌'
    }
  }

  if (count === 0) return null

  return (
    <div
      className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg border backdrop-blur-sm
        ${getTypeStyles(type)}
        transition-all duration-300 hover:scale-105 cursor-pointer
      `}
      title={`${count} ${label.toLowerCase()}`}
    >
      <span className="text-sm">{getIcon(type)}</span>
      <span className="text-sm font-medium">{count}</span>
      <span className="text-xs hidden lg:block">{label}</span>
    </div>
  )
}