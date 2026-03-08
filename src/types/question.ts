export type SectionId = 'MST' | 'RCT' | 'MCT' | 'ANIT' | 'SAT';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface BaseQuestion {
  id: string;
  section: SectionId;
  difficulty: Difficulty;
  tags: string[];
  explanation: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  text: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
}

export interface PassageSubQuestion {
  text: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface PassageQuestion extends BaseQuestion {
  type: 'passage';
  passage: string;
  questions: PassageSubQuestion[];
}

export interface SpatialScenarioParams {
  pitch: number;
  bank: number;
  heading: number;
  coastline: string;
}

export interface SpatialQuestion extends BaseQuestion {
  type: 'spatial';
  scenarioParams: SpatialScenarioParams;
  correctAnswer: 0 | 1 | 2 | 3 | 4;
}

export type Question = MultipleChoiceQuestion | PassageQuestion | SpatialQuestion;
