import type { SectionLesson } from '../../types/lesson';

const rctLesson: SectionLesson = {
  sectionId: 'RCT',
  title: 'Reading Comprehension Test',
  topics: [
    {
      name: 'Active Reading Strategies',
      cards: [
        {
          id: 'rct-lesson-read-01',
          heading: 'Identifying the Main Idea',
          content:
            'The main idea is the central point the author is making. Look for it in the first and last sentences of the passage. Ask yourself: "If I had to summarize this passage in one sentence, what would it be?" The main idea is broader than specific details -- it encompasses the overall message rather than any single supporting fact.',
          keyTakeaway:
            'The main idea is the overarching point; check the first and last sentences first.',
        },
        {
          id: 'rct-lesson-read-02',
          heading: 'Reading for Purpose',
          content:
            'Before diving into details, skim the passage to understand its structure and purpose. Is it explaining a process, making an argument, comparing perspectives, or describing a chronological sequence? Knowing the passage type helps you anticipate what kinds of questions will follow and where to find specific information when answering them.',
          keyTakeaway:
            'Skim first to identify the passage type, then read with purpose.',
        },
        {
          id: 'rct-lesson-read-03',
          heading: 'Noting Structure and Transitions',
          content:
            'Pay attention to transition words that signal the passage\'s logical flow. Words like "however," "nevertheless," and "on the other hand" signal contrasts. "Furthermore," "moreover," and "in addition" signal supporting points. "Therefore," "consequently," and "as a result" signal conclusions. These words are roadmaps that help you navigate the author\'s argument quickly.',
          keyTakeaway:
            'Transition words reveal the logical structure -- contrasts, additions, and conclusions.',
        },
        {
          id: 'rct-lesson-read-04',
          heading: 'Managing Time on Passages',
          content:
            'On timed tests, spend about 60% of your time reading carefully and 40% answering questions. Read the passage once with focus rather than skimming and rereading. If a question asks about a specific detail, scan for keywords rather than rereading the entire passage. Answer questions you are confident about first, then return to harder ones.',
          keyTakeaway:
            'Read once with focus, use keyword scanning for detail questions, and prioritize confident answers.',
        },
      ],
    },
    {
      name: 'Question Type Strategies',
      cards: [
        {
          id: 'rct-lesson-type-01',
          heading: 'Main Idea Questions',
          content:
            'Main idea questions ask what the passage is "primarily about" or its "central purpose." Eliminate answers that are too narrow (covering only one paragraph) or too broad (claiming more than the passage discusses). The correct answer captures the scope of the entire passage. Watch for answers that are true details but do not represent the overall theme.',
          keyTakeaway:
            'Eliminate too-narrow and too-broad answers; the correct answer matches the passage\'s full scope.',
        },
        {
          id: 'rct-lesson-type-02',
          heading: 'Inference vs. Stated Detail',
          content:
            'Detail questions ask what the passage explicitly states -- the answer will be directly in the text. Inference questions ask what can be "concluded" or "inferred" -- the answer is not stated directly but is strongly supported by the text. For inferences, choose the answer that requires the smallest logical leap from what is written. Avoid answers that require outside knowledge.',
          keyTakeaway:
            'Details are stated directly; inferences require small logical leaps from the text.',
        },
        {
          id: 'rct-lesson-type-03',
          heading: 'Vocabulary in Context',
          content:
            'These questions test whether you can determine a word\'s meaning from how it is used in the passage. Do NOT simply pick the word\'s most common meaning -- the test often features words used in less common ways. Substitute each answer choice into the sentence and read it in context. The correct answer will maintain the sentence\'s original meaning and logical flow.',
          keyTakeaway:
            'Substitute each answer into the sentence; choose the one that preserves the original meaning.',
        },
        {
          id: 'rct-lesson-type-04',
          heading: 'Author Purpose and Tone',
          content:
            'Author purpose questions ask why the author wrote the passage or included a specific detail. Tone questions ask about the author\'s attitude. Look for evaluative language (positive or negative adjectives, hedging words, emphatic statements). Most ASTB passages are informational, so the tone is usually objective, balanced, or analytical rather than emotional.',
          keyTakeaway:
            'Look for evaluative language clues; ASTB passages are typically objective or balanced in tone.',
        },
      ],
    },
    {
      name: 'Common Traps',
      cards: [
        {
          id: 'rct-lesson-trap-01',
          heading: 'Extreme Answer Choices',
          content:
            'Be suspicious of answer choices containing absolute words like "always," "never," "all," "none," or "only." Passage authors rarely make such sweeping claims. More moderate language like "often," "generally," "most," or "tends to" is more likely to match the passage\'s nuanced positions. If you see an extreme answer, it is usually wrong unless the passage explicitly supports it.',
          keyTakeaway:
            'Extreme words (always, never, all, none) are usually wrong -- prefer moderate language.',
        },
        {
          id: 'rct-lesson-trap-02',
          heading: '"Not Stated" vs. "Implied"',
          content:
            'A critical distinction: something "not stated" in the passage is not the same as something the passage contradicts. On inference questions, the correct answer is supported by the passage even though it is not directly written. Wrong answers often include information that is plausible but has no textual support, or information that contradicts the passage. Always verify your answer has a basis in the text.',
          keyTakeaway:
            'Correct inferences have textual support; wrong answers are plausible but unsupported.',
        },
        {
          id: 'rct-lesson-trap-03',
          heading: 'Misreading Negatives in Questions',
          content:
            'Questions containing "NOT," "EXCEPT," or "LEAST" are easy to misread under time pressure. These questions ask you to find the one answer that does NOT apply. A useful strategy: treat each answer as a true/false statement about the passage. Three answers will be true (supported by the passage); the correct answer is the one that is false or not supported. Circle or underline the negative word to avoid confusion.',
          keyTakeaway:
            'For NOT/EXCEPT questions, find the one false statement -- underline the negative word to stay alert.',
        },
      ],
    },
  ],
};

export default rctLesson;
