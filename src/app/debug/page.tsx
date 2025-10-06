'use client'

import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [mounted, setMounted] = useState(false)
  const [cssVars, setCssVars] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)

    // Check CSS variables
    const computedStyle = getComputedStyle(document.documentElement)
    const vars = {
      '--bg': computedStyle.getPropertyValue('--bg'),
      '--text': computedStyle.getPropertyValue('--text'),
      '--primary': computedStyle.getPropertyValue('--primary'),
      '--border': computedStyle.getPropertyValue('--border'),
    }
    setCssVars(vars)
  }, [])

  if (!mounted) {
    return <div>Loading debug info...</div>
  }

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'monospace',
      background: 'var(--bg, #1a1a1a)',
      color: 'var(--text, #ffffff)',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: 'var(--primary, #ffd700)' }}>🔧 Debug Information</h1>

      <div style={{
        background: 'var(--bg-light, #2a2a2a)',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid var(--border, #444)',
        marginTop: '20px'
      }}>
        <h2>CSS Variables Status:</h2>
        <ul>
          {Object.entries(cssVars).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value || '❌ NOT FOUND'}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        background: 'var(--bg-light, #2a2a2a)',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid var(--border, #444)',
        marginTop: '20px'
      }}>
        <h2>Theme Test:</h2>
        <div style={{
          background: 'var(--primary, #ffd700)',
          color: 'var(--bg-dark, #000)',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          This should be PRIMARY background
        </div>

        <div style={{
          background: 'var(--secondary, #blue)',
          color: 'var(--bg-dark, #000)',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          This should be SECONDARY background
        </div>

        <div style={{
          background: 'var(--success, #green)',
          color: 'var(--bg-dark, #000)',
          padding: '10px',
          borderRadius: '4px'
        }}>
          This should be SUCCESS background
        </div>
      </div>

      <div style={{
        background: 'var(--bg-light, #2a2a2a)',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid var(--border, #444)',
        marginTop: '20px'
      }}>
        <h2>Navigation Test:</h2>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            background: 'var(--primary, #ffd700)',
            color: 'var(--bg-dark, #000)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Go to Home
        </button>

        <button
          onClick={() => window.location.href = '/dashboard'}
          style={{
            background: 'var(--secondary, #blue)',
            color: 'var(--bg-dark, #000)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => window.location.href = '/why-chat'}
          style={{
            background: 'var(--success, #green)',
            color: 'var(--bg-dark, #000)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Go to Why Chat
        </button>
      </div>
    </div>
  )
}