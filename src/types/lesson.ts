import type { SectionId } from './question';

export interface ConceptCard {
  id: string;
  heading: string;
  content: string;
  svgDiagram?: React.ComponentType;
  keyTakeaway?: string;
}

export interface SectionLesson {
  sectionId: SectionId;
  title: string;
  topics: Array<{
    name: string;
    cards: ConceptCard[];
  }>;
}
