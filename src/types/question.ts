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
  optionExplanations?: [string, string, string, string];
}

export interface PassageSubQuestion {
  text: string;
  options: [string, string, string, string];
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: string;
  optionExplanations?: [string, string, string, string];
}

export interface PassageQuestion extends BaseQuestion {
  type: 'passage';
  passage: string;
  questions: PassageSubQuestion[];
}

export type CoastlinePosition = 'none' | 'left' | 'right' | 'ahead-left' | 'ahead-right';

export interface SpatialScenarioParams {
  pitch: number;
  bank: number;
  heading: number;
  coastline: CoastlinePosition;
}

export interface SpatialQuestion extends BaseQuestion {
  type: 'spatial';
  scenarioParams: SpatialScenarioParams;
  answerOptions: [SpatialScenarioParams, SpatialScenarioParams, SpatialScenarioParams, SpatialScenarioParams, SpatialScenarioParams];
  correctAnswer: 0 | 1 | 2 | 3 | 4;
}

export type Question = MultipleChoiceQuestion | PassageQuestion | SpatialQuestion;
