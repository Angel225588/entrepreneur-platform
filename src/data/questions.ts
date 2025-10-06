export const START_WITH_WHY_QUESTIONS = [
  "What is the core problem or challenge you want to solve with this project?",
  "Why do you personally care about solving this problem? What drives your passion for this?",
  "What would success look like for you and others affected by this problem?",
  "What experiences or moments led you to realize this problem needed to be addressed?",
  "How do you envision the world being different once your project succeeds?",
  "What values and beliefs are most important to you in approaching this project?",
  "What would happen if this problem remains unsolved? Who would be affected?",
  "What unique perspective or approach do you bring to solving this problem?"
]

export const IKIGAI_QUESTIONS = [
  "What activities or subjects make you lose track of time because you enjoy them so much?",
  "What skills or talents do others frequently compliment you on or ask for your help with?",
  "What problems in the world make you feel frustrated or motivated to take action?",
  "What are people willing to pay for that relates to your interests and skills?",
  "How does your project align with what you love doing most?",
  "What unique combination of skills makes you the right person for this project?",
  "How will your project serve others or make a positive impact on the world?",
  "What sustainable value or income could this project generate?",
  "Where do these four elements (love, skills, world needs, value) intersect in your project?"
]

export const TREE_OF_LIFE_QUESTIONS = [
  "What are the foundational values and principles that guide your decisions?",
  "What experiences from your past have shaped who you are today?",
  "What natural talents and abilities do you possess?",
  "What knowledge and skills have you developed over time?",
  "What relationships and connections support your growth?",
  "What vision do you have for your future and legacy?",
  "How does this project connect to your core identity and values?",
  "What branches of growth do you see this project creating in your life?",
  "How will this project help you bear fruit that benefits others?"
]

export const STAGE_CONFIG = {
  'start-with-why': {
    title: 'Start with Why',
    questions: START_WITH_WHY_QUESTIONS,
    points: 1500,
    initialMessage: "Let's discover your WHY! I'll guide you through questions that will help uncover the deep purpose and motivation behind your project. Take your time to reflect on each answer."
  },
  'ikigai': {
    title: 'Ikigai Discovery',
    questions: IKIGAI_QUESTIONS,
    points: 1800,
    initialMessage: "Welcome to your Ikigai discovery journey! These questions will help you find the intersection of what you love, what you're good at, what the world needs, and what you can be valued for. Let's explore together!"
  },
  'tree-of-life': {
    title: 'Tree of Life',
    questions: TREE_OF_LIFE_QUESTIONS,
    points: 1600,
    initialMessage: "Let's explore your Tree of Life! These questions will help you understand your roots, trunk, branches, and the fruits of your personal and professional growth. Let's begin this reflective journey."
  }
} as const

export type StageType = keyof typeof STAGE_CONFIG