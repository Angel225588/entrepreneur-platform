export const GRID_LAYOUTS = {
  RESPONSIVE_CARD_GRID: `
    grid
    gap-4
    md:gap-6
    lg:gap-8
    justify-items-center
    grid-cols-1
    min-[425px]:grid-cols-1
    min-[425px]:max-w-[398px]
    min-[425px]:mx-auto
    md:grid-cols-2
    md:max-w-none
    lg:grid-cols-3
    xl:max-w-7xl
    xl:mx-auto
  `.trim().replace(/\s+/g, ' '),

  NOTES_STYLE_GRID: `
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-4
    mb-20
  `.trim().replace(/\s+/g, ' ')
} as const

export const BUTTONS = {
  PRIMARY: `
    inline-flex
    items-center
    justify-center
    px-6
    py-3
    bg-primary
    text-bg-dark
    font-semibold
    rounded-lg
    hover:bg-warning
    active:bg-highlight
    transition-all
    duration-300
    focus:outline-none
    focus:ring-4
    focus:ring-primary
    focus:ring-opacity-50
  `.trim().replace(/\s+/g, ' '),

  NAVIGATION: `
    w-full
    flex
    items-center
    space-x-3
    p-3
    rounded-lg
    bg-bg-light
    border
    border-border
    text-text
    hover:bg-highlight
    transition-colors
  `.trim().replace(/\s+/g, ' ')
} as const

export const CONTAINERS = {
  SECTION_SPACING: 'mb-16 md:mb-20 lg:mb-24 scroll-mt-24',
  MAX_WIDTH: 'max-w-7xl mx-auto mb-8',
  RESPONSIVE_PADDING: 'px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12'
} as const