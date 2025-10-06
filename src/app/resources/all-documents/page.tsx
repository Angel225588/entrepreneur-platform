'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function AllDocumentsPage() {
  const router = useRouter()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')

  const allDocuments = [
    {
      id: 1,
      name: 'Business Model Canvas Template.pdf',
      type: 'PDF',
      size: '2.1 MB',
      lastModified: '2 hours ago',
      category: 'Templates'
    },
    {
      id: 2,
      name: 'Market Research Notes.md',
      type: 'Notes',
      size: '156 KB',
      lastModified: '1 day ago',
      category: 'Notes'
    },
    {
      id: 3,
      name: 'Startup Pitch Deck.pptx',
      type: 'Presentation',
      size: '8.5 MB',
      lastModified: '3 days ago',
      category: 'Templates'
    },
    {
      id: 4,
      name: 'Customer Interview Audio.mp3',
      type: 'Audio',
      size: '45.2 MB',
      lastModified: '1 week ago',
      category: 'Audio'
    },
    {
      id: 5,
      name: 'Product Mockups.fig',
      type: 'Design',
      size: '12.8 MB',
      lastModified: '1 week ago',
      category: 'Images'
    },
    {
      id: 6,
      name: 'Financial Projections.xlsx',
      type: 'Spreadsheet',
      size: '890 KB',
      lastModified: '2 weeks ago',
      category: 'Documents'
    },
    {
      id: 7,
      name: 'Logo Design Assets.zip',
      type: 'Archive',
      size: '25.4 MB',
      lastModified: '2 weeks ago',
      category: 'Images'
    },
    {
      id: 8,
      name: 'Team Meeting Recording.mp4',
      type: 'Video',
      size: '156 MB',
      lastModified: '3 weeks ago',
      category: 'Videos'
    }
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄'
      case 'Notes': return '📝'
      case 'Presentation': return '📊'
      case 'Audio': return '🎧'
      case 'Design': return '🎨'
      case 'Spreadsheet': return '📊'
      case 'Archive': return '📦'
      case 'Video': return '🎥'
      default: return '📄'
    }
  }

  const filteredDocuments = selectedFilter === 'All'
    ? allDocuments
    : allDocuments.filter(doc => {
        switch (selectedFilter) {
          case 'Documents': return ['PDF', 'Spreadsheet'].includes(doc.type)
          case 'Images': return ['Design'].includes(doc.type)
          case 'Videos': return ['Video'].includes(doc.type)
          case 'Audio': return ['Audio'].includes(doc.type)
          case 'Templates': return doc.category === 'Templates'
          default: return true
        }
      })

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Header */}
      <div className="bg-primary text-bg-dark px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - AI Avatar and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-bg-dark/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg">📄</span>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-bg-dark">
                All Documents
              </h1>
              <p className="text-sm text-bg-dark/80">
                Complete file library
              </p>
            </div>
          </div>

          {/* Right side - Search and Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 bg-bg-dark/20 border border-bg-dark/30 rounded-lg text-bg-dark placeholder-bg-dark/60 focus:outline-none focus:border-bg-dark/50"
              />
              <span className="absolute left-3 top-2.5 text-bg-dark/60">🔍</span>
            </div>

            {/* Back and Menu buttons */}
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-bg-dark/20 hover:bg-bg-dark/30 transition-colors"
            >
              ←
            </button>
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
        {/* Mobile Search Bar */}
        <div className="mb-6 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-bg-light border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-primary"
            />
            <span className="absolute left-3 top-3.5 text-text-muted">🔍</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {['All', 'Documents', 'Images', 'Videos', 'Audio', 'Templates'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-bg-light text-text hover:bg-highlight border border-border'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-bg-light border border-border rounded-xl p-3 hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-2xl">
                  {getFileIcon(doc.type)}
                </span>
              </div>
              <h3 className="text-sm font-medium text-text truncate group-hover:text-primary transition-colors">
                {doc.name}
              </h3>
              <p className="text-xs text-text-muted mt-1">{doc.size}</p>
              <p className="text-xs text-text-muted">{doc.lastModified}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-bg-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-text-muted">📄</span>
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">No documents found</h3>
            <p className="text-text-muted mb-6">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
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
                    router.push('/notes')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">📝</span>
                  <span className="font-medium">Notes</span>
                </button>

                <button
                  onClick={() => {
                    router.push('/resources')
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-bg-light border border-border text-text hover:bg-highlight transition-colors"
                >
                  <span className="text-xl">📚</span>
                  <span className="font-medium">Resources</span>
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