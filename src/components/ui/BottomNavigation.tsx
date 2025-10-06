'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavItem {
  id: string
  label: string
  icon: string
  route: string
  badge?: number
}

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [showAddModal, setShowAddModal] = useState(false)

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '🏠',
      route: '/dashboard'
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: '📝',
      route: '/notes',
      badge: 3
    },
    {
      id: 'add',
      label: 'Add',
      icon: '+',
      route: '/add'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: '📚',
      route: '/resources'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      route: '/profile'
    }
  ]

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'add') {
      setShowAddModal(true)
    } else {
      router.push(item.route)
    }
  }

  const handleAddAction = (action: string) => {
    setShowAddModal(false)
    switch (action) {
      case 'note':
        router.push('/notes?action=add')
        break
      case 'project':
        router.push('/dashboard?action=new-project')
        break
      case 'idea':
        router.push('/notes?action=add&type=idea')
        break
      default:
        break
    }
  }

  const isActive = (route: string) => {
    if (route === '/dashboard' && pathname === '/') return true
    return pathname === route || pathname.startsWith(route)
  }

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-bg border-t border-border backdrop-blur-lg bg-opacity-95">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                  relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200
                  ${item.id === 'add'
                    ? 'bg-primary text-bg-dark scale-110 shadow-lg'
                    : isActive(item.route)
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text'
                  }
                `}
              >
                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 bg-warning text-bg-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`text-xl mb-1 ${item.id === 'add' ? 'font-light' : ''}`}>
                  {item.icon}
                </div>

                {/* Label */}
                <span className="text-xs font-medium">
                  {item.label}
                </span>

                {/* Active Indicator */}
                {isActive(item.route) && item.id !== 'add' && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Action Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          ></div>

          {/* Modal */}
          <div className="absolute bottom-20 left-4 right-4">
            <div className="bg-bg border border-border rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-lg font-semibold text-text">Quick Actions</h3>
              </div>

              {/* Actions */}
              <div className="p-2">
                <button
                  onClick={() => handleAddAction('note')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-bg-light transition-colors"
                >
                  <span className="text-xl">📝</span>
                  <div className="text-left">
                    <div className="font-medium text-text">Add Note</div>
                    <div className="text-sm text-text-muted">Create a new project note</div>
                  </div>
                </button>

                <button
                  onClick={() => handleAddAction('idea')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-bg-light transition-colors"
                >
                  <span className="text-xl">💡</span>
                  <div className="text-left">
                    <div className="font-medium text-text">Quick Idea</div>
                    <div className="text-sm text-text-muted">Capture a quick insight</div>
                  </div>
                </button>

                <button
                  onClick={() => handleAddAction('project')}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-bg-light transition-colors"
                >
                  <span className="text-xl">🚀</span>
                  <div className="text-left">
                    <div className="font-medium text-text">New Project</div>
                    <div className="text-sm text-text-muted">Start a new venture</div>
                  </div>
                </button>
              </div>

              {/* Cancel */}
              <div className="border-t border-border p-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-full p-3 text-text-muted hover:text-text transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for mobile to prevent content overlap */}
      <div className="h-16 md:hidden"></div>
    </>
  )
}