'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function ResourcesPage() {
  const router = useRouter()
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')

  const recentFiles = [
    {
      id: 1,
      name: 'Business Model Canvas Template.pdf',
      type: 'PDF',
      size: '2.1 MB',
      lastModified: '2 hours ago',
      thumbnail: '/images/resources/template-thumb.jpg',
      category: 'Templates'
    },
    {
      id: 2,
      name: 'Market Research Notes.md',
      type: 'Notes',
      size: '156 KB',
      lastModified: '1 day ago',
      thumbnail: '/images/resources/notes-thumb.jpg',
      category: 'Notes'
    },
    {
      id: 3,
      name: 'Startup Pitch Deck.pptx',
      type: 'Presentation',
      size: '8.5 MB',
      lastModified: '3 days ago',
      thumbnail: '/images/resources/presentation-thumb.jpg',
      category: 'Templates'
    }
  ]

  const categories = [
    {
      id: 'notes',
      name: 'Project Notes',
      icon: '📝',
      count: '24 files',
      size: '12.4 MB',
      color: 'bg-blue-500/10 border-blue-500/20',
      route: '/notes'
    },
    {
      id: 'templates',
      name: 'Templates',
      icon: '📋',
      count: '15 files',
      size: '45.2 MB',
      color: 'bg-green-500/10 border-green-500/20',
      route: '/resources/templates'
    },
    {
      id: 'videos',
      name: 'Training Videos',
      icon: '🎥',
      count: '8 videos',
      size: '1.2 GB',
      color: 'bg-purple-500/10 border-purple-500/20',
      route: '/resources/videos'
    },
    {
      id: 'audio',
      name: 'Podcasts & Audio',
      icon: '🎧',
      count: '12 files',
      size: '245 MB',
      color: 'bg-orange-500/10 border-orange-500/20',
      route: '/resources/audio'
    },
    {
      id: 'images',
      name: 'Graphics & Images',
      icon: '🖼️',
      count: '67 files',
      size: '156 MB',
      color: 'bg-pink-500/10 border-pink-500/20',
      route: '/resources/images'
    },
    {
      id: 'tools',
      name: 'Business Tools',
      icon: '🛠️',
      count: '9 tools',
      size: '—',
      color: 'bg-indigo-500/10 border-indigo-500/20',
      route: '/resources/tools'
    }
  ]

  const collections = [
    {
      id: 'favorites',
      name: 'Favorites',
      icon: '⭐',
      count: '18 items',
      color: 'bg-yellow-500/10 border-yellow-500/20'
    },
    {
      id: 'important',
      name: 'Important Docs',
      icon: '🔐',
      count: '7 items',
      color: 'bg-red-500/10 border-red-500/20'
    }
  ]

  const handleCategoryClick = (category: any) => {
    if (category.route) {
      router.push(category.route)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Header */}
      <div className="bg-primary text-bg-dark px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - AI Avatar and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-bg-dark/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg">📚</span>
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-bg-dark">
                Resources
              </h1>
              <p className="text-sm text-bg-dark/80">
                Your business toolkit
              </p>
            </div>
          </div>

          {/* Right side - Search and Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 bg-bg-dark/20 border border-bg-dark/30 rounded-lg text-bg-dark placeholder-bg-dark/60 focus:outline-none focus:border-bg-dark/50"
              />
              <span className="absolute left-3 top-2.5 text-bg-dark/60">🔍</span>
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
        {/* Mobile Search Bar */}
        <div className="mb-6 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
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

        {/* Recent Files */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text">Recent</h2>
            <button
              onClick={() => router.push('/resources/all-documents')}
              className="text-sm text-primary hover:text-primary/80"
            >
              View All
            </button>
          </div>

          {/* Horizontal Scrollable Recent Files */}
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                className="bg-bg-light border border-border rounded-xl p-3 min-w-[160px] hover:border-primary/30 transition-colors cursor-pointer group flex-shrink-0"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-2xl">
                    {file.type === 'PDF' ? '📄' : file.type === 'Notes' ? '📝' : '📊'}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-text truncate group-hover:text-primary transition-colors">
                  {file.name}
                </h3>
                <p className="text-xs text-text-muted mt-1">{file.size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text">Categories</h2>
            <button className="text-sm text-primary hover:text-primary/80">
              View All
            </button>
          </div>

          {/* Horizontal Scrollable Categories */}
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`${category.color} border rounded-xl p-4 min-w-[200px] hover:scale-105 transition-all cursor-pointer group flex-shrink-0`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-text group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-text-muted">{category.count}</p>
                  </div>
                </div>
                <p className="text-sm text-text-muted">{category.size}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text mb-4">Collections</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className={`${collection.color} border rounded-xl p-4 hover:scale-105 transition-all cursor-pointer group`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{collection.icon}</span>
                  <div>
                    <h3 className="font-medium text-text group-hover:text-primary transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-xs text-text-muted">{collection.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text mb-4">Storage Overview</h2>

          <div className="bg-bg-light border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text">Total Storage</span>
              <span className="text-sm text-text-muted">1.8 GB used of 5 GB</span>
            </div>

            <div className="w-full bg-bg rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full" style={{ width: '36%' }}></div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-text">24</div>
                <div className="text-xs text-text-muted">Notes</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-text">67</div>
                <div className="text-xs text-text-muted">Files</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-text">8</div>
                <div className="text-xs text-text-muted">Videos</div>
              </div>
            </div>
          </div>
        </div>
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
                    setIsSideNavOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-primary/10 border border-primary text-primary"
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