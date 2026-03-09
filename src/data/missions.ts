import type { Mission } from '../types/gamification';

export const MISSIONS: Mission[] = [
  {
    id: 'first-sortie',
    name: 'First Sortie',
    description: 'Your first training flight. Complete a few questions and prove you can score above 60%.',
    objectives: [
      { type: 'complete-questions', target: 10, label: 'Complete 10 questions in any section' },
      { type: 'score-threshold', target: 60, label: 'Score 60% or higher on a quiz' },
    ],
    xpReward: 50,
  },
  {
    id: 'math-navigator',
    name: 'Math Navigator',
    description: 'Master the Math Skills Test with focused practice and a strong score.',
    objectives: [
      { type: 'complete-questions', sectionId: 'MST', target: 20, label: 'Complete 20 MST questions' },
      { type: 'score-threshold', sectionId: 'MST', target: 80, label: 'Score 80%+ on MST' },
    ],
    xpReward: 100,
  },
  {
    id: 'bookworm-aviator',
    name: 'Bookworm Aviator',
    description: 'Sharpen your reading comprehension skills with passages and inference questions.',
    objectives: [
      { type: 'complete-questions', sectionId: 'RCT', target: 15, label: 'Complete 15 RCT questions' },
      { type: 'score-threshold', sectionId: 'RCT', target: 75, label: 'Score 75%+ on RCT' },
    ],
    xpReward: 100,
  },
  {
    id: 'grease-monkey',
    name: 'Grease Monkey',
    description: 'Get hands-on with mechanical concepts, gears, and physics fundamentals.',
    objectives: [
      { type: 'complete-questions', sectionId: 'MCT', target: 20, label: 'Complete 20 MCT questions' },
      { type: 'score-threshold', sectionId: 'MCT', target: 80, label: 'Score 80%+ on MCT' },
    ],
    xpReward: 100,
  },
  {
    id: 'flight-school',
    name: 'Flight School',
    description: 'Study aviation and nautical knowledge to prepare for the skies and seas.',
    objectives: [
      { type: 'complete-questions', sectionId: 'ANIT', target: 20, label: 'Complete 20 ANIT questions' },
      { type: 'score-threshold', sectionId: 'ANIT', target: 80, label: 'Score 80%+ on ANIT' },
    ],
    xpReward: 100,
  },
  {
    id: 'eagle-eye',
    name: 'Eagle Eye',
    description: 'Train your spatial awareness to identify aircraft orientation from cockpit views.',
    objectives: [
      { type: 'complete-questions', sectionId: 'SAT', target: 15, label: 'Complete 15 SAT questions' },
      { type: 'score-threshold', sectionId: 'SAT', target: 75, label: 'Score 75%+ on SAT' },
    ],
    xpReward: 100,
  },
  {
    id: 'cross-training',
    name: 'Cross-Training',
    description: 'A well-rounded aviator trains across all disciplines. Practice every section and maintain a 70% average.',
    objectives: [
      { type: 'complete-questions', sectionId: 'MST', target: 5, label: 'Practice MST' },
      { type: 'complete-questions', sectionId: 'RCT', target: 5, label: 'Practice RCT' },
      { type: 'complete-questions', sectionId: 'MCT', target: 5, label: 'Practice MCT' },
      { type: 'complete-questions', sectionId: 'ANIT', target: 5, label: 'Practice ANIT' },
      { type: 'complete-questions', sectionId: 'SAT', target: 5, label: 'Practice SAT' },
      { type: 'score-threshold', target: 70, label: 'Score 70%+ average across all sections' },
    ],
    xpReward: 200,
    badgeId: 'all-sections',
  },
];
