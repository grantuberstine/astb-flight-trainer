# Feature Research

**Domain:** Gamified ASTB-E Test Prep Web App
**Researched:** 2026-03-08
**Confidence:** HIGH (ASTB structure well-documented; gamification patterns well-established)

---

## ASTB-E Content Requirements

The app must cover the ASTB-E (Aviation Selection Test Battery, current version) comprehensively. This section defines the test structure that drives all content features.

### Composite Scores the User is Targeting

| Score | Scale | Derived From | Purpose |
|-------|-------|-------------|---------|
| OAR (Officer Aptitude Rating) | 20-80 | MST + RCT + MCT | Officer qualification |
| AQR (Academic Qualifications Rating) | 1-9 stanine | MST, RCT, MCT, ANIT, NATFI | Academic performance predictor |
| PFAR (Pilot Flight Aptitude Rating) | 1-9 stanine | All subtests including PBM | Flight training success predictor |
| FOFAR (Flight Officer Flight Aptitude Rating) | 1-9 stanine | Subset of scores | NFO selection |

**Navy SNA minimums:** AQR 4 / PFAR 5, but competitive applicants typically need AQR 5+ / PFAR 6+.

### ASTB-E Subtests (All Must Be Covered)

**1. Math Skills Test (MST)** -- ~30 questions, computer-adaptive
- Arithmetic: whole numbers, fractions, decimals, percentages
- Algebra: equations, inequalities, algebraic expressions, solving for variables
- Geometry: angles, area, perimeter, basic shapes
- Roots and exponents
- Number sequences and properties
- Word problems applying all of the above

**2. Reading Comprehension Test (RCT)** -- ~20 questions, computer-adaptive
- Passage-based questions (read passage, answer questions)
- Main idea identification
- Supporting details extraction
- Inference and logical conclusions
- Context-based vocabulary
- Author's tone and purpose

**3. Mechanical Comprehension Test (MCT)** -- ~30 questions, computer-adaptive
- Force, energy, work, power
- Simple machines: levers, pulleys, gears, inclined planes, wedges, screws
- Fluid properties: pressure, volume, velocity (gases and liquids)
- Electrical circuits: voltage, current, resistance
- Engine components and performance
- Weight distribution and center of gravity
- Mechanical tools and their applications

**4. Aviation and Nautical Information Test (ANIT)** -- ~30 questions
- Basic aerodynamics and principles of flight (lift, drag, thrust, weight)
- Aircraft components and their functions (ailerons, rudder, elevators, flaps)
- Flight instruments and cockpit layout
- Flight rules and regulations (VFR/IFR basics, airspace)
- Naval aviation history and notable aircraft
- Nautical terminology (port, starboard, bow, stern, etc.)
- Carrier operations terminology
- Weather and its effects on flight

**5. Spatial Apperception Test (SAT)** -- 35 questions, 10 minutes
- Cockpit-view-to-external-view matching
- Determine aircraft pitch (climbing, descending, level)
- Determine aircraft bank (left, right, wings level)
- Determine aircraft heading relative to coastline (toward sea, toward land, along coast)
- Requires rapid 3D spatial reasoning under time pressure
- Each question: one cockpit view, five external aircraft orientation options

**6. Naval Aviation Trait Facet Inventory (NATFI)** -- 50-100 questions
- Forced-choice personality pairs
- Measures: adaptability, stress tolerance, leadership, teamwork
- Cannot be "prepped" in the traditional sense -- no right answers
- App should explain the format and strategy but NOT generate practice content

**7. Performance Based Measures Battery (PBM)** -- Hands-on tasks
- **Dichotic Listening Task (DLT):** Different audio in each ear, respond to target ear only
- **Airplane Tracking Task (ATT):** Track moving object in 2D using joystick
- **Vertical Tracking Task (VTT):** Track object in 1D using throttle
- **Multitasking:** DLT + both tracking tasks simultaneously
- **UAV Component:** Compass/heading identification and directional reasoning
- Requires physical hardware (joystick, throttle, headset) at testing center
- Web simulation is inherently limited but directional/multitasking concepts can be practiced

### Content Depth Benchmark

Modeled after Barron's Military Flight Aptitude Tests (5th Edition by Terry L. Duran):
- Chapters 5-9 cover review material: Language, Mathematics, Technical Knowledge, Science, Mental Skills
- Two full ASTB-E practice tests (Chapters 14-15)
- Target: 600+ practice questions across all sections, with detailed explanations
- Each question needs concept explanation, not just answer key

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = the app feels broken or useless for test prep.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Full question bank covering all testable subtests (MST, RCT, MCT, ANIT, SAT)** | This IS the product -- without comprehensive questions, it's not a test prep tool | HIGH | 600+ questions needed. Largest content effort. Must cover all topics at correct difficulty. |
| **Detailed explanations for every question** | Every modern test prep tool explains answers. Users learn from mistakes, not just scores. | HIGH | Each question needs "why correct" AND "why other options wrong." Teaches concepts. |
| **Timed practice mode simulating real test conditions** | ASTB is timed and computer-adaptive. Time pressure changes performance significantly. | MEDIUM | Per-section timers matching real test constraints. SAT especially time-critical (35 questions / 10 min). |
| **Score tracking and progress dashboard** | Users need to know if they're improving and where they're weak | MEDIUM | Track scores by section, over time. Show improvement trends. |
| **Section-by-section practice** | Users must be able to focus on weak areas independently | LOW | Basic navigation to each section's question pool. |
| **Correct/incorrect feedback with explanation after each question** | Immediate feedback is fundamental to learning | LOW | Show right answer + explanation immediately or at end of set. |
| **Mobile-responsive layout** | Even though laptop-focused, users will check on phones | MEDIUM | PROJECT.md says laptop-focused, but responsive design prevents frustration. Not a native app. |
| **Study content / concept lessons per section** | A question bank alone is insufficient -- users need to learn concepts before testing them | HIGH | Lesson content for math fundamentals, mechanical principles, aviation knowledge, etc. |

### Differentiators (Competitive Advantage)

Features that make this app engaging where competitors are boring. Aligned with the core value: "Make ASTB prep engaging enough that she actually wants to study every day."

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Aviation-themed mission structure** | Transforms boring study sessions into "missions" with objectives. Each study session has purpose and narrative context. | MEDIUM | Missions = curated sets of questions/lessons. "Mission: Navigation Fundamentals" instead of "Chapter 3 Quiz." |
| **Rank progression system (Cadet to Pilot)** | Long-term motivation arc. Visible progress from beginner to mastery. Competitors have none of this. | MEDIUM | Cadet > Ensign > Lieutenant > Commander > Pilot. Unlock based on cumulative mastery, not just time spent. |
| **XP and leveling system** | Short-term motivation loop. Every action earns visible progress. Proven by Duolingo to increase engagement 40%+. | LOW | XP for completing questions, missions, streaks. Simple numeric accumulation. |
| **Daily streak tracker with streak freeze** | Duolingo's most powerful feature -- streaks increase commitment by 60%. Streak freeze reduces churn by 21%. | LOW | Track consecutive days with at least one study session. One free freeze per week. |
| **Achievement badges** | Recognition for milestones creates collection motivation. "Ace Mechanic" for perfect MCT score, etc. | LOW | 15-25 badges covering section mastery, streaks, speed, consistency. |
| **Cockpit-style dashboard UI** | Aviation theming makes the product feel purpose-built and immersive vs generic test prep | MEDIUM | HUD-style progress indicators, instrument-panel aesthetic. Not just a skin -- an experience. |
| **Diagnostic assessment (initial placement test)** | Identifies weak areas immediately so study time is optimized from day one | MEDIUM | Short test covering all sections, generates personalized priority list. |
| **Adaptive study recommendations** | Prioritize weak areas while maintaining strengths. Smarter than "do everything equally." | MEDIUM | Track per-topic accuracy. Recommend next study area based on weakest scores. Not full adaptive algorithm -- rule-based is sufficient. |
| **Study plan / countdown pacing** | Maps content to available weeks before test date. Creates urgency and structure. | MEDIUM | Input test date, app distributes content across remaining weeks. Shows "on track" vs "behind." |
| **Spaced repetition for missed questions** | Questions answered wrong resurface at increasing intervals. Proven to double retention vs massed practice. | MEDIUM | SM-2 or simplified algorithm. Track per-question performance. Re-queue missed items. |
| **Timed challenge mode with scoring** | Simulates real test pressure. Gamified with personal best scores. | LOW | Full-section timed runs with scoring. Track best scores for competitive motivation. |
| **PBM concept trainer** | No web competitor offers PBM practice. Even limited simulation (directional reasoning, multitasking exercises) adds unique value. | HIGH | Cannot fully replicate joystick/throttle. But: directional/compass exercises, dual-task attention training, reaction-time tasks. Manage expectations clearly. |
| **SAT visual trainer with cockpit views** | Spatial Apperception is one of the hardest sections and benefits enormously from repeated visual practice | HIGH | Requires aircraft orientation images (or generated SVGs). Cockpit view + 5 external views. Labor-intensive but high-value. |

### Anti-Features (Deliberately NOT Building)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **User accounts and authentication** | "What if she uses multiple devices?" | Adds server, database, auth complexity for a single-user app. Massively increases scope. | Local storage + optional JSON export/import for backup. |
| **Leaderboards / social features** | Duolingo has them, seems engaging | Single user. No community to compete against. Building social features for one person is wasted effort. | Personal best scores and self-competition (beat your last score). |
| **AI-generated questions on the fly** | "Infinite question bank!" | Quality control nightmare. ASTB questions must be accurate and at correct difficulty. Bad questions teach wrong things. | Curated, hand-reviewed question bank. Quality over quantity. |
| **Full PBM joystick/throttle simulation** | "Practice exactly like the real test" | Requires hardware the user doesn't have. Browser joystick API is unreliable. Simulation won't match real PBM feel. Sets false expectations. | PBM concept trainer (compass, multitasking, reaction time) with clear disclaimer that it's supplemental, not a substitute. |
| **NATFI practice questions** | "Cover every section!" | NATFI is a personality inventory with no right answers. Practice questions would teach gaming the system, which backfires if detected. | Explain NATFI format and strategy (be consistent, don't overthink). No practice questions. |
| **Payment / subscription system** | "Monetize it later" | Out of scope per PROJECT.md. Adds complexity for zero current value. | Build it free. If it works well, monetization is a separate future decision. |
| **Flashcard system** | "Anki-style flashcards for vocab" | Duplicates effort with question bank. Flashcards are passive; active recall via questions is superior for test prep. | Spaced repetition built INTO the question system. Missed questions resurface automatically. |
| **Video lessons** | "Khan Academy has videos" | Massive content creation effort. Single user doesn't justify video production. Text + diagrams are faster to create and consume. | Written lessons with diagrams and worked examples. Interactive where possible (e.g., gear ratio calculator). |
| **Offline/PWA mode** | "Study without internet" | Adds service worker complexity. If it's a static site with local storage, it already works offline-ish without explicit PWA setup. | Deploy as static site. If offline matters, add PWA as a polish feature later. |

---

## Feature Dependencies

```
[Question Bank (600+ questions)]
    |
    |-- requires --> [Content Authoring for all 5 testable sections]
    |                    |
    |                    |-- MST content requires --> [Math lesson content]
    |                    |-- MCT content requires --> [Mechanical lesson content]
    |                    |-- ANIT content requires --> [Aviation/Nautical lesson content]
    |                    |-- SAT content requires --> [Aircraft orientation visuals]
    |
    |-- enables --> [Timed Practice Mode]
    |-- enables --> [Score Tracking]
    |-- enables --> [Spaced Repetition]
    |-- enables --> [Diagnostic Assessment]

[Score Tracking]
    |-- enables --> [Adaptive Study Recommendations]
    |-- enables --> [Progress Dashboard]
    |-- enables --> [Study Plan / Pacing]

[XP System]
    |-- enables --> [Rank Progression]
    |-- enables --> [Achievement Badges]

[Mission Structure]
    |-- requires --> [Question Bank]
    |-- requires --> [Lesson Content]
    |-- enhanced by --> [XP System]
    |-- enhanced by --> [Rank Progression]

[Daily Streak]
    |-- independent (no dependencies)]

[Cockpit Dashboard UI]
    |-- enhanced by --> [All gamification features]
    |-- independent of content (can be built in parallel)

[Diagnostic Assessment]
    |-- requires --> [Question Bank (at least partial)]
    |-- enables --> [Adaptive Study Recommendations]

[PBM Concept Trainer]
    |-- independent of main question bank
    |-- requires --> [Custom interactive components]
```

### Dependency Notes

- **Question Bank requires Content Authoring:** The biggest dependency and bottleneck. Questions can't exist without researched, accurate content for each section. This is the critical path.
- **SAT content requires Aircraft Orientation Visuals:** The Spatial Apperception section needs visual assets (cockpit views + external aircraft views). These are either hand-drawn SVGs or carefully sourced. This is a production bottleneck.
- **Score Tracking enables three downstream features:** Adaptive recommendations, the progress dashboard, and study pacing all depend on having score data. Build tracking early.
- **Gamification features are independent of content:** XP, streaks, ranks, and badges can be built in parallel with content authoring. They're wiring, not content.
- **PBM Concept Trainer is independent:** It's a separate interactive module, not tied to the question bank. Can be built as a standalone phase.

---

## MVP Definition

### Launch With (v1) -- "Get Studying Immediately"

The user has a real test in 2-3 months. MVP must provide genuine study value fast.

- [ ] **MST question bank (100+ questions) with explanations** -- Math is the most straightforward to author and highest-volume section
- [ ] **RCT question bank (50+ questions) with explanations** -- Passages + comprehension questions
- [ ] **MCT question bank (80+ questions) with explanations** -- Physics/mechanics core content
- [ ] **ANIT question bank (80+ questions) with explanations** -- Aviation and nautical knowledge
- [ ] **Basic lesson content per section** -- Concept review before practicing (not just a question dump)
- [ ] **Section-by-section practice mode** -- Pick a section, answer questions, see scores
- [ ] **Timed practice mode** -- Full section simulation with timer
- [ ] **Score tracking per section** -- Track accuracy over time
- [ ] **Cockpit dashboard UI** -- Aviation theme from day one (this IS the differentiator)
- [ ] **XP system and daily streak** -- Minimal gamification to drive daily habit
- [ ] **Local storage persistence** -- Progress survives browser close

### Add After Core Content (v1.x) -- "Optimize and Engage"

- [ ] **SAT visual trainer (50+ questions)** -- Requires visual asset creation, high effort but high value
- [ ] **Diagnostic assessment** -- Short placement test to identify weak areas
- [ ] **Adaptive study recommendations** -- "You should study MCT next" based on scores
- [ ] **Rank progression (Cadet to Pilot)** -- Long-term motivation arc
- [ ] **Achievement badges (15-25)** -- Collection/milestone motivation
- [ ] **Spaced repetition for missed questions** -- Resurface wrong answers at intervals
- [ ] **Mission structure** -- Curated study sequences instead of just free practice
- [ ] **Study plan with test date countdown** -- Pacing guidance

### Future Consideration (v2+) -- "Polish and Extend"

- [ ] **PBM concept trainer** -- Directional reasoning, multitasking exercises, reaction time
- [ ] **Full practice test mode** -- All sections back-to-back simulating real test day
- [ ] **Progress export/import (JSON)** -- Backup/transfer between devices
- [ ] **Additional question bank expansion** -- More questions per section for variety
- [ ] **Difficulty tiering within sections** -- Easy/Medium/Hard question filtering

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Question bank (MST, RCT, MCT, ANIT) | HIGH | HIGH | P1 |
| Explanations for every question | HIGH | HIGH | P1 |
| Basic lesson content per section | HIGH | HIGH | P1 |
| Section practice mode | HIGH | LOW | P1 |
| Timed practice mode | HIGH | LOW | P1 |
| Score tracking per section | HIGH | MEDIUM | P1 |
| Cockpit dashboard UI | HIGH | MEDIUM | P1 |
| XP system | MEDIUM | LOW | P1 |
| Daily streak | HIGH | LOW | P1 |
| Local storage persistence | HIGH | LOW | P1 |
| SAT visual trainer | HIGH | HIGH | P2 |
| Diagnostic assessment | MEDIUM | MEDIUM | P2 |
| Adaptive recommendations | MEDIUM | MEDIUM | P2 |
| Rank progression | MEDIUM | LOW | P2 |
| Achievement badges | LOW | LOW | P2 |
| Spaced repetition | MEDIUM | MEDIUM | P2 |
| Mission structure | MEDIUM | MEDIUM | P2 |
| Study plan / pacing | MEDIUM | MEDIUM | P2 |
| PBM concept trainer | MEDIUM | HIGH | P3 |
| Full practice test mode | MEDIUM | LOW | P3 |
| Progress export/import | LOW | LOW | P3 |

**Priority key:**
- P1: Must have for launch -- delivers core study value
- P2: Should have, add when core content is solid
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | ASTB Prep App ($35) | Mometrix ASTB Course | Military Flight Prep (free) | UGO Prep (free) | **Our Approach** |
|---------|---------------------|---------------------|-----------------------------|------------------|-----------------|
| Question bank | 600+ questions | 900+ questions | Limited free set | Free practice sets | 600+ curated questions with full explanations |
| Explanations | Yes | Yes | Basic | Basic | Detailed concept explanations, not just answer keys |
| PBM practice | UAV/throttle simulator (unique) | No | No | No | Concept trainer (compass, multitasking) with clear limitations |
| Adaptive learning | Adaptive practice tests | Standard tests | No | No | Rule-based recommendations from score tracking |
| Gamification | None | None | None | None | **Full aviation-themed gamification -- this is our differentiator** |
| Lessons/content | 73 lessons | Video lessons | Articles | Articles/videos | Written lessons with diagrams and worked examples |
| UI/Theme | Generic test prep | Generic test prep | Generic | Generic | Cockpit dashboard, mission structure, rank progression |
| Daily engagement | None | None | None | None | Streaks, XP, badges -- designed for daily habit |
| Pricing | $34.99 one-time | $79.99/month subscription | Free | Free | Free (personal project) |
| Platform | iOS app | Web | Web | Web | Web (laptop-focused, responsive) |

**Key competitive insight:** No existing ASTB prep product has gamification. Every competitor is a traditional question bank or course. The aviation-themed gamification layer is a completely uncontested differentiator in this niche.

---

## Sources

- [Mometrix ASTB-E Practice Test & Overview](https://www.mometrix.com/academy/astb-e/) - Subtest descriptions, question topics
- [Test Prep Review: Free ASTB-E Practice Test](https://www.testprepreview.com/the-aviation-selection-test-battery-astb-e) - Question counts, content areas
- [USMC ASTB Overview PDF](https://officer.marines.com/docs/oso/aviation/ASTB_Overview.pdf) - Official test structure
- [CliffsNotes: Military Flight Aptitude Tests: The ASTB](https://www.cliffsnotes.com/test-prep/professional/other/articles/military-flight-aptitude-tests-the-astb) - Scoring details
- [Military Flight Tests: ASTB Scores](https://militaryflighttests.com/astb-scores/) - OAR, AQR, PFAR scoring
- [Air Warriors: PBM Subtest Discussion](https://www.airwarriors.com/community/threads/astb-e-performance-based-measures-pbm-subtest-matlab-practice.43216/) - PBM component details
- [ASTB Prep App (iOS)](https://apps.apple.com/us/app/astb-prep/id1549216388) - Competitor feature set
- [Duolingo Gamification Case Study (StriveCloud)](https://www.strivecloud.io/blog/gamification-examples-boost-user-retention-duolingo) - Gamification mechanics and engagement data
- [Duolingo Gamification Secrets (Orizon)](https://www.orizon.co/blog/duolingos-gamification-secrets) - Streak and XP engagement statistics
- [Khan Academy: Mastery Challenges](https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges) - Mastery learning system
- [Barron's Military Flight Aptitude Tests, 5th Edition](https://www.amazon.com/Military-Flight-Aptitude-Tests-Fifth/dp/1506288340) - Content depth benchmark
- [Career Employer: Free ASTB Practice Test 2025](https://careeremployer.com/test-prep/practice-tests/astb-practice-test/) - SAT subtest confirmation

---
*Feature research for: ASTB Flight Trainer*
*Researched: 2026-03-08*
