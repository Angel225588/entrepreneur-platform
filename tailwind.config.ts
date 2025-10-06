import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS Custom Properties
        'bg-dark': 'var(--bg-dark)',
        'bg': 'var(--bg)',
        'bg-light': 'var(--bg-light)',
        'text': 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'highlight': 'var(--highlight)',
        'border': 'var(--border)',
        'border-muted': 'var(--border-muted)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'danger': 'var(--danger)',
        'warning': 'var(--warning)',
        'success': 'var(--success)',
        'info': 'var(--info)',
        // Legacy support
        'primary-green': '#4CAF50',
      },
      screens: {
        'xs': '320px',    // Mobile S (iPhone 5/SE)
        'sm': '375px',    // Mobile M (iPhone 6/7/8)
        'md': '425px',    // Mobile L (iPhone Plus)
        'lg': '768px',    // Tablet
        'xl': '1024px',   // Tablet L / Laptop S
        '2xl': '1366px',  // Laptop
        '3xl': '1440px',  // Laptop L
        '4xl': '1920px',  // Desktop
      },
    },
  },
  plugins: [],
}
export default config