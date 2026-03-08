import type { SectionLesson } from '../../types/lesson';

const satLesson: SectionLesson = {
  sectionId: 'SAT',
  title: 'Spatial Apperception Test',
  topics: [
    {
      name: 'Reading the Cockpit View',
      cards: [
        {
          id: 'sat-lesson-1-1',
          heading: 'The Horizon Line',
          content:
            'The cockpit view shows what a pilot sees looking forward through the windscreen. The most important feature is the horizon line -- the boundary between sky (blue) and ground (brown). In straight and level flight, the horizon is a horizontal line through the center of the view.',
          keyTakeaway:
            'The horizon line is your primary reference. Its position and angle tell you everything about the aircraft\'s orientation.',
        },
        {
          id: 'sat-lesson-1-2',
          heading: 'How Bank Tilts the Horizon',
          content:
            'When an aircraft banks (rolls), the horizon line tilts. Here is the key insight that trips up many test-takers: the horizon tilts OPPOSITE to the bank direction. If the aircraft banks RIGHT, the horizon tilts LEFT (left side drops). If the aircraft banks LEFT, the horizon tilts RIGHT. Think of it this way -- the aircraft rolls, but the real horizon stays flat. You are seeing the horizon from a tilted perspective.',
          keyTakeaway:
            'Bank direction is OPPOSITE to horizon tilt. Horizon tilts left = aircraft banks right.',
        },
        {
          id: 'sat-lesson-1-3',
          heading: 'How Pitch Moves the Horizon',
          content:
            'Pitch (nose up or down) shifts the horizon vertically. Nose UP (climbing) pushes the horizon DOWN -- you see more sky. Nose DOWN (diving) pushes the horizon UP -- you see more ground. The greater the pitch angle, the further the horizon shifts from center.',
          keyTakeaway:
            'Horizon below center = climbing (nose up). Horizon above center = diving (nose down).',
        },
        {
          id: 'sat-lesson-1-4',
          heading: 'The Aircraft Reference Symbol',
          content:
            'The small yellow crosshair/wings symbol at the center of the cockpit view represents your aircraft\'s fixed position. It never moves -- it always stays at the center. Everything else (horizon, ground, coastline) moves relative to this fixed reference point. Use it as your anchor when reading the view.',
          keyTakeaway:
            'The center reference symbol is fixed. Judge everything relative to it.',
        },
        {
          id: 'sat-lesson-1-5',
          heading: 'Combining Pitch and Bank',
          content:
            'Most SAT questions combine pitch and bank. Read them separately, then combine. First: Is the horizon tilted? Which direction? (That tells you bank.) Second: Is the horizon above or below center? (That tells you pitch.) A tilted horizon that is also shifted down means a climbing, banked turn.',
          keyTakeaway:
            'Read bank (tilt) and pitch (vertical position) as two separate cues, then combine them.',
        },
      ],
    },
    {
      name: 'Understanding Aircraft Orientation',
      cards: [
        {
          id: 'sat-lesson-2-1',
          heading: 'Pitch, Bank, and Heading',
          content:
            'Three values define an aircraft\'s orientation: PITCH is nose angle up or down (positive = climbing, negative = diving). BANK is roll angle left or right (positive = right wing down). HEADING is compass direction (0/360 = north, 90 = east, 180 = south, 270 = west). The answer options show aircraft silhouettes from above with these orientations applied.',
          keyTakeaway:
            'Pitch = up/down, Bank = tilt left/right, Heading = compass direction.',
        },
        {
          id: 'sat-lesson-2-2',
          heading: 'Cockpit View to External View',
          content:
            'The tricky part of SAT is mapping what you see in the cockpit to how the aircraft looks from outside. From the cockpit, a right bank tilts the horizon LEFT. From outside (the answer silhouettes), a right-banked aircraft has its right wing pointing DOWN. The heading you see in the cockpit corresponds to the direction the aircraft nose points in the top-down silhouette view.',
          keyTakeaway:
            'Practice mentally flipping between inside (cockpit) and outside (silhouette) views.',
        },
        {
          id: 'sat-lesson-2-3',
          heading: 'Common Confusion Points',
          content:
            'The #1 mistake: confusing bank direction. Remember -- horizon tilts OPPOSITE to bank. The #2 mistake: flipping pitch. Horizon DOWN = nose UP (climbing), not diving. The #3 mistake: mirror headings. 090 (east) and 270 (west) look similar but the aircraft points opposite directions. Always verify heading with coastline clues when available.',
          keyTakeaway:
            'Bank direction and pitch direction are the two most common errors. Double-check both before answering.',
        },
        {
          id: 'sat-lesson-2-4',
          heading: 'Reading the Silhouette Options',
          content:
            'Each answer shows an aircraft from above. The nose of the aircraft points in the heading direction. The wings show bank angle -- if the aircraft appears to roll right, that is a right bank. A pitch change is shown as a slight vertical offset of the aircraft. Compare each silhouette\'s orientation to what you determined from the cockpit view.',
          keyTakeaway:
            'Focus on nose direction (heading) and wing tilt (bank) in the silhouettes first.',
        },
      ],
    },
    {
      name: 'Coastline Clues and Strategy',
      cards: [
        {
          id: 'sat-lesson-3-1',
          heading: 'How Coastline Reveals Heading',
          content:
            'When a coastline is visible in the cockpit view, it provides a crucial heading clue. The coastline appears at the boundary between land (brown) and water (blue). If the coastline is on your LEFT, and you know the coast runs north-south, you can determine which direction you are heading. Coastline is the most reliable heading confirmation available.',
          keyTakeaway:
            'Use coastline position to confirm or determine heading. It eliminates mirror-heading traps.',
        },
        {
          id: 'sat-lesson-3-2',
          heading: 'Elimination Strategy',
          content:
            'With 5 options, systematic elimination is faster than trying to find the exact match. Step 1: Eliminate wrong headings (usually removes 2-3 options). Step 2: Eliminate wrong bank direction (removes 1 more). Step 3: Check pitch to pick between remaining options. If coastline is present, use it first -- heading elimination is the biggest time saver.',
          keyTakeaway:
            'Eliminate by heading first, then bank, then pitch. Work from most to least obvious cue.',
        },
        {
          id: 'sat-lesson-3-3',
          heading: 'Time Management for SAT',
          content:
            'The SAT section is one of the fastest-paced ASTB sections. You need to answer quickly. Do NOT try to perfectly analyze every parameter -- use the elimination strategy. If you are stuck between two options, pick the one with the correct heading and move on. A quick answer with 50/50 odds is better than running out of time on later questions.',
          keyTakeaway:
            'Speed matters. Eliminate obvious wrong answers fast, make your best pick, and move on.',
        },
      ],
    },
  ],
};

export default satLesson;
