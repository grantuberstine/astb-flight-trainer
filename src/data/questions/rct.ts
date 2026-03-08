import type { PassageQuestion } from '../../types/question';

const rctQuestions: PassageQuestion[] = [
  // ============================================================
  // MILITARY HISTORY / OPERATIONS (~4 passages)
  // ============================================================
  {
    id: 'rct-001',
    section: 'RCT',
    type: 'passage',
    difficulty: 'medium',
    tags: ['military-history', 'naval-aviation'],
    explanation: 'This passage covers the early development of naval aviation and its impact on military strategy.',
    passage:
      'The history of naval aviation began in earnest during World War I, when the British Royal Navy first experimented with launching aircraft from converted merchant ships. However, it was not until the 1920s and 1930s that purpose-built aircraft carriers entered service, fundamentally altering the nature of naval warfare. The Japanese attack on Pearl Harbor in December 1941 demonstrated the devastating potential of carrier-based aviation, as a fleet of six carriers launched nearly 400 aircraft against the American Pacific Fleet without a single Japanese surface ship coming within gun range of the harbor. This event convinced military strategists worldwide that the aircraft carrier had supplanted the battleship as the capital ship of modern navies. The subsequent battles of the Coral Sea and Midway in 1942 were the first naval engagements in history where the opposing fleets never came within visual range of each other, with all offensive action carried out by aircraft.',
    questions: [
      {
        text: 'What is the primary purpose of this passage?',
        options: [
          'To describe the Japanese attack on Pearl Harbor',
          'To trace how aircraft carriers became the dominant naval weapon',
          'To compare British and American naval strategies',
          'To argue that battleships are obsolete',
        ],
        correctAnswer: 1,
        explanation: 'The passage traces the evolution from early experiments to carriers becoming the capital ship, making the development of carrier dominance the main theme.',
      },
      {
        text: 'According to the passage, what made the battles of Coral Sea and Midway historically significant?',
        options: [
          'They were the largest naval battles in history',
          'They involved the most aircraft ever launched',
          'They were the first naval battles fought entirely by aircraft without ships seeing each other',
          'They marked the first use of radar in combat',
        ],
        correctAnswer: 2,
        explanation: 'The passage states these were "the first naval engagements in history where the opposing fleets never came within visual range of each other."',
      },
      {
        text: 'The word "supplanted" as used in the passage most nearly means:',
        options: ['Supported', 'Replaced', 'Accompanied', 'Strengthened'],
        correctAnswer: 1,
        explanation: 'In context, "supplanted" means the aircraft carrier took the place of the battleship as the most important ship, i.e., replaced it.',
        optionExplanations: [
          'Incorrect: "Supported" implies working alongside, but the passage describes a replacement.',
          'Correct: "Supplanted" means to take the place of; the carrier replaced the battleship.',
          'Incorrect: "Accompanied" means going alongside, not replacing.',
          'Incorrect: "Strengthened" does not fit the context of one ship type overtaking another.',
        ],
      },
    ],
  },
  {
    id: 'rct-002',
    section: 'RCT',
    type: 'passage',
    difficulty: 'medium',
    tags: ['military-history', 'strategy'],
    explanation: 'This passage discusses the concept of combined arms warfare and its evolution.',
    passage:
      'Combined arms warfare refers to the integration of different military branches -- infantry, armor, artillery, and air power -- into a unified tactical approach. The concept has ancient roots; Roman legions combined heavy infantry with cavalry and missile troops to devastating effect. However, modern combined arms doctrine emerged during World War I, when the stalemate of trench warfare forced commanders to seek new approaches. The British introduction of tanks at the Battle of Cambrai in 1917, supported by coordinated artillery barrages and infantry advances, offered a glimpse of future warfare. By World War II, the German Wehrmacht perfected these principles in their Blitzkrieg tactics, using fast-moving armored columns supported by close air support to bypass enemy strongpoints and disrupt command structures. Today, combined arms remains the foundation of military doctrine worldwide, though the specific components have expanded to include cyber operations, electronic warfare, and precision-guided munitions.',
    questions: [
      {
        text: 'The author\'s attitude toward combined arms warfare can best be described as:',
        options: [
          'Critical of its destructive potential',
          'Objectively informative about its development',
          'Enthusiastically supportive',
          'Skeptical of its effectiveness',
        ],
        correctAnswer: 1,
        explanation: 'The passage takes a neutral, informative tone, presenting the historical development of combined arms without expressing personal judgment.',
      },
      {
        text: 'Based on the passage, what can be inferred about the relationship between trench warfare and combined arms development?',
        options: [
          'Trench warfare made combined arms unnecessary',
          'The frustration of trench warfare stalemate drove innovation in combined arms tactics',
          'Combined arms was developed to support trench warfare',
          'Trench warfare was more effective than combined arms',
        ],
        correctAnswer: 1,
        explanation: 'The passage states that "the stalemate of trench warfare forced commanders to seek new approaches," implying that the deadlock of trench warfare motivated the development of combined arms tactics.',
      },
      {
        text: 'According to the passage, which of the following is NOT mentioned as a modern extension of combined arms?',
        options: [
          'Cyber operations',
          'Electronic warfare',
          'Precision-guided munitions',
          'Autonomous drone swarms',
        ],
        correctAnswer: 3,
        explanation: 'The passage mentions cyber operations, electronic warfare, and precision-guided munitions as modern additions, but does not mention autonomous drone swarms.',
      },
    ],
  },
  {
    id: 'rct-003',
    section: 'RCT',
    type: 'passage',
    difficulty: 'hard',
    tags: ['military-history', 'logistics'],
    explanation: 'This passage examines the critical role of logistics in military operations.',
    passage:
      'Military historians often observe that amateurs study tactics while professionals study logistics. This aphorism reflects a fundamental truth: no army can fight effectively without a reliable supply chain providing food, ammunition, fuel, and medical supplies. Napoleon\'s catastrophic retreat from Moscow in 1812 was precipitated not primarily by Russian military prowess but by the failure of his supply lines to sustain an army of over 600,000 across the vast Russian landscape. Similarly, Rommel\'s Afrika Korps, despite tactical brilliance in the North African desert, was ultimately defeated when Allied forces interdicted its supply routes across the Mediterranean. In modern warfare, the logistical challenge has grown exponentially. A single armored division today requires approximately 5,000 tons of supplies per day during active operations. The 1991 Gulf War demonstrated this reality: coalition forces spent six months building up supplies in Saudi Arabia before launching a ground offensive that lasted only 100 hours. The ratio of support personnel to combat troops in modern Western militaries typically exceeds 7 to 1.',
    questions: [
      {
        text: 'What is the main idea of this passage?',
        options: [
          'Napoleon was a poor military strategist',
          'Modern armies require too many support personnel',
          'Logistics is the decisive factor in military success',
          'The Gulf War was the most logistically complex operation in history',
        ],
        correctAnswer: 2,
        explanation: 'The passage\'s central argument, supported by multiple historical examples, is that logistics is the fundamental determinant of military effectiveness.',
      },
      {
        text: 'The word "interdicted" as used in the passage most nearly means:',
        options: ['Monitored', 'Disrupted or cut off', 'Protected', 'Redirected'],
        correctAnswer: 1,
        explanation: 'In context, "interdicted" means to disrupt or cut off supply routes, which led to the defeat of Rommel\'s forces.',
      },
      {
        text: 'The author mentions the 7:1 ratio of support to combat personnel primarily to:',
        options: [
          'Criticize military inefficiency',
          'Argue for reducing military budgets',
          'Illustrate the scale of modern logistical requirements',
          'Compare modern and historical armies',
        ],
        correctAnswer: 2,
        explanation: 'The ratio is presented as evidence of the "exponentially" growing logistical challenge in modern warfare, not as criticism or comparison.',
      },
      {
        text: 'Based on the passage, what can be inferred about the Gulf War ground offensive?',
        options: [
          'It was poorly planned',
          'Its brevity was enabled by extensive logistical preparation',
          'It could have been launched without the supply buildup',
          'It was unsuccessful',
        ],
        correctAnswer: 1,
        explanation: 'The passage juxtaposes six months of supply buildup against 100 hours of combat, implying the quick victory was possible because of thorough logistical preparation.',
      },
    ],
  },
  {
    id: 'rct-004',
    section: 'RCT',
    type: 'passage',
    difficulty: 'easy',
    tags: ['military-history', 'aviation'],
    explanation: 'This passage covers the history of military flight training.',
    passage:
      'Military flight training has undergone dramatic transformation since the Wright brothers first demonstrated powered flight to the U.S. Army in 1908. In World War I, pilot training was dangerously abbreviated, with some aviators receiving as few as 10 hours of flight instruction before being sent into combat. The attrition rate was staggering: the average life expectancy of a new combat pilot on the Western Front was measured in weeks. By World War II, training programs had become more structured, typically requiring 200 or more hours of flight time before a pilot earned their wings. Today, U.S. Navy and Marine Corps aviators complete a rigorous multi-year training pipeline that includes ground school, primary flight training in turboprop aircraft, and advanced training in their specific platform. The introduction of flight simulators has revolutionized training by allowing student pilots to practice emergency procedures and complex maneuvers without risk to aircraft or personnel.',
    questions: [
      {
        text: 'What is the passage primarily about?',
        options: [
          'The dangers of flying in World War I',
          'How flight simulators work',
          'The evolution of military flight training over time',
          'Why Navy pilots are better trained than other service branches',
        ],
        correctAnswer: 2,
        explanation: 'The passage traces the development of military flight training from 1908 through the present day, making its evolution the central topic.',
      },
      {
        text: 'According to the passage, what was a primary benefit of introducing flight simulators?',
        options: [
          'They reduced training costs',
          'They allowed safe practice of dangerous procedures',
          'They replaced the need for actual flight hours',
          'They shortened the training pipeline',
        ],
        correctAnswer: 1,
        explanation: 'The passage states simulators allow practicing "emergency procedures and complex maneuvers without risk to aircraft or personnel."',
      },
      {
        text: 'The word "attrition" as used in the passage most nearly means:',
        options: ['Success', 'Loss through casualties', 'Improvement', 'Competition'],
        correctAnswer: 1,
        explanation: 'In this military context, "attrition" refers to the loss of pilots through casualties, as reinforced by the mention of short life expectancy.',
      },
    ],
  },

  // ============================================================
  // SCIENCE / TECHNOLOGY (~4 passages)
  // ============================================================
  {
    id: 'rct-005',
    section: 'RCT',
    type: 'passage',
    difficulty: 'medium',
    tags: ['science', 'aerodynamics'],
    explanation: 'This passage explains the four forces of flight and how they interact.',
    passage:
      'Four fundamental forces act on an aircraft in flight: lift, weight, thrust, and drag. Lift is generated primarily by the wings and acts perpendicular to the direction of flight. According to Bernoulli\'s principle, the curved upper surface of a wing causes air to accelerate, reducing pressure above the wing relative to below it, creating an upward force. Weight, the force of gravity acting on the aircraft\'s mass, opposes lift. Thrust, produced by engines, propels the aircraft forward, while drag -- the aerodynamic resistance encountered as the aircraft moves through air -- opposes thrust. For steady, level flight, these forces must be in equilibrium: lift equals weight, and thrust equals drag. When a pilot increases thrust beyond the drag force, the aircraft accelerates. When lift exceeds weight, the aircraft climbs. Understanding these relationships is essential for pilots, as changes in speed, altitude, and configuration constantly alter the balance of forces.',
    questions: [
      {
        text: 'According to the passage, what condition must be met for steady, level flight?',
        options: [
          'Thrust must exceed drag',
          'Lift must exceed weight',
          'All four forces must be in equilibrium',
          'Drag must be minimized',
        ],
        correctAnswer: 2,
        explanation: 'The passage explicitly states that "for steady, level flight, these forces must be in equilibrium: lift equals weight, and thrust equals drag."',
      },
      {
        text: 'What happens when thrust exceeds drag, according to the passage?',
        options: [
          'The aircraft climbs',
          'The aircraft decelerates',
          'The aircraft accelerates',
          'The aircraft turns',
        ],
        correctAnswer: 2,
        explanation: 'The passage states: "When a pilot increases thrust beyond the drag force, the aircraft accelerates."',
      },
      {
        text: 'The passage describes Bernoulli\'s principle in relation to:',
        options: [
          'How engines produce thrust',
          'How wings generate lift',
          'Why drag increases with speed',
          'How weight affects performance',
        ],
        correctAnswer: 1,
        explanation: 'Bernoulli\'s principle is mentioned specifically to explain the mechanism by which wings create lift through pressure differential.',
      },
    ],
  },
  {
    id: 'rct-006',
    section: 'RCT',
    type: 'passage',
    difficulty: 'hard',
    tags: ['science', 'weather'],
    explanation: 'This passage discusses weather phenomena relevant to aviation.',
    passage:
      'Thunderstorms represent one of the most significant weather hazards in aviation. A typical thunderstorm progresses through three stages: the cumulus stage, characterized by strong updrafts; the mature stage, where both updrafts and downdrafts coexist alongside heavy precipitation, lightning, and possible hail; and the dissipating stage, dominated by downdrafts. Particularly dangerous is the microburst, a localized column of sinking air that produces damaging winds on or near the ground. Microbursts create severe wind shear -- rapid changes in wind speed or direction -- that have caused numerous aircraft accidents during approach and departure phases. The phenomenon occurs when rain evaporates in dry air beneath a thunderstorm, cooling the air and causing it to descend rapidly. Upon reaching the ground, the air spreads outward in all directions at speeds that can exceed 100 knots. Modern airports employ Low-Level Wind Shear Alert Systems (LLWAS) and Terminal Doppler Weather Radar to detect these phenomena and warn pilots, but the unpredictable and short-lived nature of microbursts means they remain a persistent threat.',
    questions: [
      {
        text: 'During which stage of a thunderstorm do both updrafts and downdrafts occur?',
        options: [
          'Cumulus stage',
          'Mature stage',
          'Dissipating stage',
          'All three stages',
        ],
        correctAnswer: 1,
        explanation: 'The passage identifies the mature stage as having "both updrafts and downdrafts coexist alongside heavy precipitation, lightning, and possible hail."',
      },
      {
        text: 'According to the passage, what causes a microburst to form?',
        options: [
          'Lightning heating the air',
          'Strong updrafts in the cumulus stage',
          'Rain evaporating in dry air, cooling it and causing rapid descent',
          'High-altitude winds forcing air downward',
        ],
        correctAnswer: 2,
        explanation: 'The passage explains that "rain evaporates in dry air beneath a thunderstorm, cooling the air and causing it to descend rapidly."',
      },
      {
        text: 'The passage implies that microbursts remain dangerous despite detection technology because:',
        options: [
          'The technology is too expensive for most airports',
          'Pilots ignore the warnings',
          'They are unpredictable and brief in duration',
          'They occur too frequently to track',
        ],
        correctAnswer: 2,
        explanation: 'The passage concludes that "the unpredictable and short-lived nature of microbursts means they remain a persistent threat."',
        optionExplanations: [
          'Incorrect: Cost is not mentioned as a limiting factor.',
          'Incorrect: Pilot response to warnings is not discussed.',
          'Correct: The passage cites unpredictability and brief duration as the reasons.',
          'Incorrect: Frequency is not mentioned as an obstacle.',
        ],
      },
    ],
  },
  {
    id: 'rct-007',
    section: 'RCT',
    type: 'passage',
    difficulty: 'medium',
    tags: ['science', 'radar'],
    explanation: 'This passage explains the principles and applications of radar technology.',
    passage:
      'Radar, an acronym for Radio Detection And Ranging, operates by transmitting radio waves and analyzing the echoes reflected from objects. Developed independently by several nations in the late 1930s, radar proved decisive in World War II, particularly during the Battle of Britain, where it gave British defenders advance warning of incoming German air raids. The basic principle is straightforward: a transmitter emits a pulse of radio energy, which travels at the speed of light. When the pulse strikes an object, a portion of the energy is reflected back to a receiver. By measuring the time delay between transmission and reception, the system calculates the object\'s distance. The direction is determined by the antenna\'s orientation. Modern radar systems have grown far more sophisticated, incorporating Doppler processing to measure the speed of moving targets, synthetic aperture techniques to create high-resolution ground images, and phased array antennas that can electronically steer beams without mechanical movement. Despite advances in stealth technology designed to reduce radar signatures, radar remains the primary means of air surveillance and air traffic control worldwide.',
    questions: [
      {
        text: 'How does basic radar determine the distance to an object?',
        options: [
          'By measuring the strength of the returned signal',
          'By measuring the time delay between transmission and reception of the pulse',
          'By analyzing the frequency shift of the returned signal',
          'By triangulating signals from multiple antennas',
        ],
        correctAnswer: 1,
        explanation: 'The passage states: "By measuring the time delay between transmission and reception, the system calculates the object\'s distance."',
      },
      {
        text: 'The passage mentions Doppler processing in the context of:',
        options: [
          'Determining an object\'s distance',
          'Measuring the speed of moving targets',
          'Reducing radar signatures',
          'Steering radar beams electronically',
        ],
        correctAnswer: 1,
        explanation: 'Doppler processing is specifically mentioned as a technique to "measure the speed of moving targets."',
      },
      {
        text: 'What role did radar play in the Battle of Britain?',
        options: [
          'It allowed British aircraft to fly at night',
          'It provided early warning of incoming air attacks',
          'It guided British bombs to German targets',
          'It jammed German communications',
        ],
        correctAnswer: 1,
        explanation: 'The passage states radar "gave British defenders advance warning of incoming German air raids."',
      },
      {
        text: 'The author\'s conclusion about radar suggests that:',
        options: [
          'Stealth technology has made radar obsolete',
          'Radar will soon be replaced by newer technologies',
          'Radar continues to be essential despite countermeasures',
          'Only military applications of radar remain relevant',
        ],
        correctAnswer: 2,
        explanation: 'The passage concludes that "despite advances in stealth technology... radar remains the primary means of air surveillance and air traffic control worldwide."',
      },
    ],
  },
  {
    id: 'rct-008',
    section: 'RCT',
    type: 'passage',
    difficulty: 'easy',
    tags: ['science', 'materials'],
    explanation: 'This passage discusses the evolution of aircraft construction materials.',
    passage:
      'The materials used in aircraft construction have evolved dramatically since the early days of aviation. The Wright Flyer of 1903 was built primarily of wood and fabric, materials that were lightweight but structurally limited. By the 1930s, aluminum alloys had become the standard material for aircraft construction, offering an excellent combination of strength, light weight, and resistance to corrosion. The development of jet engines in the 1940s introduced new challenges, as the extreme temperatures in engine components required heat-resistant alloys of nickel and titanium. Today, composite materials -- particularly carbon fiber reinforced polymers -- are increasingly replacing aluminum in modern aircraft. The Boeing 787 Dreamliner, for example, uses composites for approximately 50% of its structural weight. Composites offer superior strength-to-weight ratios compared to aluminum, resist fatigue and corrosion, and can be molded into aerodynamically efficient shapes. However, they are more expensive to manufacture and more difficult to inspect for internal damage.',
    questions: [
      {
        text: 'What is the passage mainly about?',
        options: [
          'Why the Boeing 787 uses composite materials',
          'The advantages of aluminum in aircraft',
          'How aircraft building materials have changed over time',
          'The problems with wood and fabric construction',
        ],
        correctAnswer: 2,
        explanation: 'The passage traces the progression from wood/fabric to aluminum to composites, making the evolution of materials the main topic.',
      },
      {
        text: 'According to the passage, what is a disadvantage of composite materials?',
        options: [
          'They are heavier than aluminum',
          'They corrode easily',
          'They are more expensive and harder to inspect for damage',
          'They cannot withstand high temperatures',
        ],
        correctAnswer: 2,
        explanation: 'The passage notes composites "are more expensive to manufacture and more difficult to inspect for internal damage."',
      },
      {
        text: 'Why did jet engines require new materials, according to the passage?',
        options: [
          'Jet engines were heavier than piston engines',
          'Extreme temperatures required heat-resistant alloys',
          'Aluminum was too expensive for jet aircraft',
          'Jet engines needed lighter materials to increase speed',
        ],
        correctAnswer: 1,
        explanation: 'The passage states that "extreme temperatures in engine components required heat-resistant alloys."',
      },
    ],
  },

  // ============================================================
  // CURRENT AFFAIRS / POLICY (~3 passages)
  // ============================================================
  {
    id: 'rct-009',
    section: 'RCT',
    type: 'passage',
    difficulty: 'hard',
    tags: ['policy', 'defense'],
    explanation: 'This passage discusses challenges in modern defense procurement.',
    passage:
      'Defense procurement -- the process by which governments acquire weapons systems, equipment, and services -- has become increasingly complex and controversial. Modern weapons platforms often require decades to develop from initial concept to operational deployment. The F-35 Lightning II program, the most expensive weapons acquisition in history, began development in the early 1990s and did not achieve initial operational capability until 2015, with total program costs estimated to exceed $1.7 trillion over its lifetime. Critics argue that such extended timelines create a paradox: by the time a system reaches the fleet, the threat environment it was designed to address may have fundamentally changed. Proponents counter that complex systems require extensive testing and refinement, and that cutting corners leads to fielding unreliable equipment that endangers service members. A middle ground has emerged in the concept of "spiral development," where a basic capability is fielded quickly and then incrementally upgraded. This approach, borrowed from the software industry, attempts to balance the competing demands of technological sophistication, affordability, and timely delivery.',
    questions: [
      {
        text: 'The "paradox" mentioned in the passage refers to:',
        options: [
          'The high cost of modern weapons',
          'The conflict between quality and quantity',
          'Systems becoming outdated before they are deployed',
          'The difficulty of testing complex equipment',
        ],
        correctAnswer: 2,
        explanation: 'The passage describes the paradox as: "by the time a system reaches the fleet, the threat environment it was designed to address may have fundamentally changed."',
      },
      {
        text: 'What is "spiral development" as described in the passage?',
        options: [
          'A method of testing equipment in combat',
          'Deploying a basic version quickly and upgrading incrementally',
          'Developing multiple weapons systems simultaneously',
          'A circular approach to defense budgeting',
        ],
        correctAnswer: 1,
        explanation: 'The passage defines spiral development as where "a basic capability is fielded quickly and then incrementally upgraded."',
        optionExplanations: [
          'Incorrect: Combat testing is not mentioned in the definition.',
          'Correct: The passage describes fielding basic capability quickly with incremental upgrades.',
          'Incorrect: Parallel development of systems is not discussed.',
          'Incorrect: Budgeting is not the focus of spiral development.',
        ],
      },
      {
        text: 'The author\'s tone in discussing defense procurement is best described as:',
        options: [
          'Harshly critical of government waste',
          'Balanced, presenting multiple perspectives',
          'Strongly supportive of the F-35 program',
          'Dismissive of critics\' concerns',
        ],
        correctAnswer: 1,
        explanation: 'The passage presents both critics\' arguments and proponents\' counterarguments, and identifies a "middle ground," indicating a balanced approach.',
      },
    ],
  },
  {
    id: 'rct-010',
    section: 'RCT',
    type: 'passage',
    difficulty: 'medium',
    tags: ['policy', 'international-relations'],
    explanation: 'This passage discusses freedom of navigation operations.',
    passage:
      'Freedom of navigation is a principle of international law holding that ships of any nation may travel through international waters without restriction. The United Nations Convention on the Law of the Sea (UNCLOS), adopted in 1982, codifies these rights while also establishing exclusive economic zones extending 200 nautical miles from a nation\'s coastline. Within these zones, coastal states have rights over natural resources but cannot restrict navigation. The principle has become a flashpoint in several regions, most notably the South China Sea, where China has claimed sovereignty over vast areas based on historical precedent. The United States, though not a signatory to UNCLOS, regularly conducts Freedom of Navigation Operations (FONOPs), in which warships deliberately transit areas where other nations have made what the U.S. considers excessive maritime claims. These operations serve a dual purpose: asserting legal principles and demonstrating military capability. Critics worry that such operations risk escalation, while supporters argue that failure to challenge excessive claims would effectively acquiesce to them, eroding the international order.',
    questions: [
      {
        text: 'According to the passage, what are exclusive economic zones?',
        options: [
          'Waters where no foreign ships are permitted',
          'Areas extending 200 nautical miles from coastlines where states have resource rights but cannot restrict navigation',
          'International waters open to all nations',
          'Military zones established by the United Nations',
        ],
        correctAnswer: 1,
        explanation: 'The passage defines EEZs as extending 200 nautical miles from coastlines where "coastal states have rights over natural resources but cannot restrict navigation."',
      },
      {
        text: 'What dual purpose do FONOPs serve, according to the passage?',
        options: [
          'Training sailors and testing equipment',
          'Gathering intelligence and deterring aggression',
          'Asserting legal principles and demonstrating military capability',
          'Supporting allies and enforcing sanctions',
        ],
        correctAnswer: 2,
        explanation: 'The passage explicitly states FONOPs serve "a dual purpose: asserting legal principles and demonstrating military capability."',
      },
      {
        text: 'The word "acquiesce" as used in the passage most nearly means:',
        options: ['Object strongly', 'Accept without protest', 'Negotiate', 'Retaliate'],
        correctAnswer: 1,
        explanation: 'In context, "acquiesce" means to passively accept or consent without protest, as failure to challenge claims would effectively accept them.',
      },
    ],
  },
  {
    id: 'rct-011',
    section: 'RCT',
    type: 'passage',
    difficulty: 'medium',
    tags: ['policy', 'environment'],
    explanation: 'This passage examines the military\'s approach to environmental responsibility.',
    passage:
      'The relationship between military operations and environmental stewardship presents unique challenges. Military installations manage millions of acres of land that often serve as critical habitats for endangered species -- a consequence of these areas being largely undeveloped and buffered from urban sprawl. The Department of Defense has become one of the largest land managers in the United States and must balance readiness requirements with environmental regulations, including the Endangered Species Act and the Clean Water Act. Some installations have found that environmental management actually enhances training realism; realistic training environments require healthy, diverse ecosystems. However, tensions arise when environmental restrictions limit training activities. The noise from artillery ranges, for instance, can disturb nesting birds, while armored vehicle maneuvers may damage fragile desert terrain. The military has responded by developing Integrated Natural Resource Management Plans that seek to harmonize operational needs with conservation goals, often employing dedicated environmental staff and partnering with wildlife agencies. These efforts have led to notable conservation successes, including the recovery of the red-cockaded woodpecker on several military installations.',
    questions: [
      {
        text: 'Why do military installations often harbor endangered species?',
        options: [
          'The military deliberately introduces endangered species',
          'The land is largely undeveloped and protected from urban growth',
          'Environmental regulations require the military to breed endangered species',
          'Military bases have ideal climates for rare species',
        ],
        correctAnswer: 1,
        explanation: 'The passage explains that military lands "often serve as critical habitats for endangered species -- a consequence of these areas being largely undeveloped and buffered from urban sprawl."',
      },
      {
        text: 'According to the passage, how can environmental management benefit military training?',
        options: [
          'It reduces the cost of maintaining training areas',
          'It provides tax benefits for the military',
          'Healthy ecosystems create more realistic training environments',
          'It improves morale among service members',
        ],
        correctAnswer: 2,
        explanation: 'The passage states that "environmental management actually enhances training realism; realistic training environments require healthy, diverse ecosystems."',
      },
      {
        text: 'The passage\'s overall perspective on military environmental management is that:',
        options: [
          'The military should prioritize readiness over environmental concerns',
          'Environmental regulations unfairly burden the military',
          'A balance between operations and conservation is achievable and beneficial',
          'The military has failed in its environmental responsibilities',
        ],
        correctAnswer: 2,
        explanation: 'The passage presents both challenges and successes, emphasizing efforts to "harmonize operational needs with conservation goals" and citing conservation successes.',
      },
    ],
  },

  // ============================================================
  // GENERAL KNOWLEDGE (~4 passages)
  // ============================================================
  {
    id: 'rct-012',
    section: 'RCT',
    type: 'passage',
    difficulty: 'easy',
    tags: ['general-knowledge', 'leadership'],
    explanation: 'This passage discusses different leadership styles and their applications.',
    passage:
      'Leadership theory has identified several distinct styles, each with advantages in particular situations. Authoritative leadership, in which the leader sets a clear vision and direction, tends to be most effective during periods of uncertainty or organizational change. Democratic leadership, which involves team members in decision-making, builds commitment and leverages collective intelligence but can slow response time. Servant leadership, a concept popularized by Robert Greenleaf in the 1970s, emphasizes the leader\'s role in supporting and developing team members rather than exercising power over them. Research suggests that the most effective leaders are not wedded to a single style but are situationally adaptive -- they read the context and adjust their approach accordingly. In military settings, this adaptability is particularly important: a platoon leader may need to exercise directive authority during combat but shift to a more collaborative approach during training or garrison operations. The key insight is that leadership effectiveness depends not just on the leader\'s behavior but on the fit between that behavior and the demands of the situation.',
    questions: [
      {
        text: 'According to the passage, when is authoritative leadership most effective?',
        options: [
          'During routine daily operations',
          'When team morale is high',
          'During periods of uncertainty or organizational change',
          'When working with experienced professionals',
        ],
        correctAnswer: 2,
        explanation: 'The passage states that authoritative leadership "tends to be most effective during periods of uncertainty or organizational change."',
      },
      {
        text: 'The passage suggests that the best leaders:',
        options: [
          'Always use authoritative leadership',
          'Avoid democratic leadership in military settings',
          'Adapt their style to fit the situation',
          'Focus exclusively on servant leadership',
        ],
        correctAnswer: 2,
        explanation: 'The passage argues that "the most effective leaders are not wedded to a single style but are situationally adaptive."',
      },
      {
        text: 'What is a drawback of democratic leadership mentioned in the passage?',
        options: [
          'It reduces team commitment',
          'It can slow response time',
          'It ignores team members\' input',
          'It is ineffective in all military contexts',
        ],
        correctAnswer: 1,
        explanation: 'The passage notes that democratic leadership "can slow response time" despite its benefits of building commitment and leveraging collective intelligence.',
      },
    ],
  },
  {
    id: 'rct-013',
    section: 'RCT',
    type: 'passage',
    difficulty: 'hard',
    tags: ['general-knowledge', 'human-factors'],
    explanation: 'This passage discusses human factors in aviation safety.',
    passage:
      'Human factors research has transformed aviation safety by recognizing that the majority of aircraft accidents result not from mechanical failure but from human error. The concept of Crew Resource Management (CRM), developed in the late 1970s following a series of catastrophic accidents attributed to failures in cockpit communication and decision-making, represents perhaps the most significant safety innovation in modern aviation. CRM training emphasizes that effective crew performance requires more than individual technical skill; it demands structured communication, shared situational awareness, and a cockpit culture where junior crew members feel empowered to speak up when they identify potential hazards. The principle of "sterile cockpit," now mandated by regulation, prohibits non-essential conversation during critical phases of flight such as takeoff and landing. Studies have shown that CRM training reduces the rate of human-error accidents by approximately 50%. However, challenges remain. Automation has introduced new categories of human error, as pilots may become complacent or lose manual flying skills when systems operate autonomously for extended periods. The phenomenon known as "automation surprise" -- when automated systems behave in unexpected ways -- has been implicated in several recent accidents.',
    questions: [
      {
        text: 'The primary cause of most aircraft accidents, according to the passage, is:',
        options: [
          'Mechanical failure',
          'Weather conditions',
          'Human error',
          'Design flaws',
        ],
        correctAnswer: 2,
        explanation: 'The passage states that "the majority of aircraft accidents result not from mechanical failure but from human error."',
      },
      {
        text: 'What does the "sterile cockpit" rule require?',
        options: [
          'That cockpits be kept physically clean',
          'That only essential conversation occurs during critical flight phases',
          'That all crew members remain silent during flight',
          'That electronic devices be turned off during flight',
        ],
        correctAnswer: 1,
        explanation: 'The passage defines sterile cockpit as prohibiting "non-essential conversation during critical phases of flight such as takeoff and landing."',
      },
      {
        text: 'The passage suggests that automation has:',
        options: [
          'Eliminated the need for CRM training',
          'Solved all human factors problems',
          'Created new types of human error even as it prevents others',
          'Made flying completely safe',
        ],
        correctAnswer: 2,
        explanation: 'The passage describes how automation introduces "new categories of human error" including complacency, skill degradation, and "automation surprise."',
        optionExplanations: [
          'Incorrect: The passage does not suggest CRM is no longer needed.',
          'Incorrect: The passage explicitly mentions new challenges from automation.',
          'Correct: Automation created new error types like complacency and automation surprise.',
          'Incorrect: The passage describes ongoing challenges with automation.',
        ],
      },
      {
        text: 'The word "implicated" as used in the passage most nearly means:',
        options: ['Cleared of blame', 'Shown to be involved in causing', 'Prevented', 'Suggested as a solution for'],
        correctAnswer: 1,
        explanation: '"Implicated" here means identified as a contributing factor in causing accidents.',
      },
    ],
  },
  {
    id: 'rct-014',
    section: 'RCT',
    type: 'passage',
    difficulty: 'easy',
    tags: ['general-knowledge', 'navigation'],
    explanation: 'This passage explains basic navigation concepts.',
    passage:
      'Navigation, the art and science of determining position and planning routes, has relied on various methods throughout history. Celestial navigation, which uses the positions of stars, sun, and moon relative to the horizon, was the primary method for ocean voyaging for centuries. A navigator would use a sextant to measure the angle between a celestial body and the horizon, then consult published tables to determine latitude. Longitude was more challenging to determine until the development of accurate marine chronometers in the 18th century. The introduction of radio navigation aids in the 20th century simplified the process, allowing navigators to determine position by receiving signals from ground-based transmitters. Today, the Global Positioning System (GPS) provides position accuracy within a few meters using signals from a constellation of satellites. Despite the reliability of GPS, military navigators are still trained in traditional methods. This redundancy is intentional: GPS signals can be jammed or spoofed by adversaries, and understanding fundamental navigation principles ensures that operators can continue their mission even when technology fails.',
    questions: [
      {
        text: 'Why was determining longitude historically more difficult than latitude?',
        options: [
          'There are no celestial bodies that indicate longitude',
          'Accurate timekeeping devices were needed but not available until the 18th century',
          'Longitude lines are curved while latitude lines are straight',
          'Sextants could not be used for longitude measurements',
        ],
        correctAnswer: 1,
        explanation: 'The passage states that longitude determination required "accurate marine chronometers" that were not developed until the 18th century.',
      },
      {
        text: 'Why do military navigators still learn traditional navigation methods?',
        options: [
          'GPS is too expensive for military use',
          'Traditional methods are more accurate than GPS',
          'GPS signals can be jammed or spoofed by adversaries',
          'Military regulations require it for historical reasons',
        ],
        correctAnswer: 2,
        explanation: 'The passage explains that "GPS signals can be jammed or spoofed by adversaries" as the reason for maintaining traditional navigation skills.',
      },
      {
        text: 'The passage is organized primarily by:',
        options: [
          'Comparing the advantages of each navigation method',
          'Presenting navigation methods in chronological order',
          'Arguing that GPS is superior to all other methods',
          'Describing the technical details of celestial navigation',
        ],
        correctAnswer: 1,
        explanation: 'The passage moves chronologically from celestial navigation through radio aids to GPS, presenting navigation methods in their historical order of development.',
      },
    ],
  },
  {
    id: 'rct-015',
    section: 'RCT',
    type: 'passage',
    difficulty: 'medium',
    tags: ['general-knowledge', 'physiology'],
    explanation: 'This passage discusses the physiological challenges of flight.',
    passage:
      'The human body evolved for life at sea level and is poorly adapted to the conditions encountered at altitude. As altitude increases, atmospheric pressure decreases, and with it the partial pressure of oxygen available for breathing. At 10,000 feet, the effective oxygen concentration is roughly equivalent to breathing 14% oxygen at sea level, compared to the normal 21%. Above 10,000 feet, most individuals begin to experience the effects of hypoxia -- oxygen deprivation to the brain and body tissues. Symptoms progress insidiously: initial effects include impaired judgment, euphoria, and decreased reaction time, followed by confusion, loss of coordination, and eventually unconsciousness. The danger is compounded by the fact that one of hypoxia\'s earliest symptoms is impaired judgment, making it difficult for affected individuals to recognize their own deteriorating condition. This is why pressurized cabins and supplemental oxygen systems are critical in aviation. Military pilots flying high-performance aircraft are trained to recognize their personal hypoxia symptoms through controlled altitude chamber exposures, as individual responses vary significantly. These training exercises simulate hypoxic conditions in a safe environment, allowing pilots to identify their unique symptom profiles.',
    questions: [
      {
        text: 'Why is hypoxia particularly dangerous according to the passage?',
        options: [
          'It causes immediate unconsciousness',
          'It only affects experienced pilots',
          'Its early symptom of impaired judgment prevents self-recognition',
          'It cannot be treated with supplemental oxygen',
        ],
        correctAnswer: 2,
        explanation: 'The passage highlights that "one of hypoxia\'s earliest symptoms is impaired judgment, making it difficult for affected individuals to recognize their own deteriorating condition."',
      },
      {
        text: 'At what altitude do most individuals begin to experience hypoxia effects?',
        options: [
          '5,000 feet',
          '8,000 feet',
          '10,000 feet',
          '15,000 feet',
        ],
        correctAnswer: 2,
        explanation: 'The passage states "above 10,000 feet, most individuals begin to experience the effects of hypoxia."',
      },
      {
        text: 'Why do military pilots undergo altitude chamber training?',
        options: [
          'To build tolerance to low oxygen levels',
          'To learn to fly at high altitudes without oxygen',
          'To recognize their individual hypoxia symptoms in a safe setting',
          'To test the reliability of their oxygen equipment',
        ],
        correctAnswer: 2,
        explanation: 'The passage explains these exercises "simulate hypoxic conditions in a safe environment, allowing pilots to identify their unique symptom profiles."',
        optionExplanations: [
          'Incorrect: The passage does not suggest that tolerance can be built.',
          'Incorrect: The purpose is recognition, not adaptation to flying without oxygen.',
          'Correct: The training allows identification of personal hypoxia symptoms.',
          'Incorrect: Equipment testing is not the stated purpose.',
        ],
      },
    ],
  },
  {
    id: 'rct-016',
    section: 'RCT',
    type: 'passage',
    difficulty: 'hard',
    tags: ['science', 'technology'],
    explanation: 'This passage discusses unmanned aerial vehicles and their impact on military operations.',
    passage:
      'Unmanned aerial vehicles (UAVs), commonly called drones, have fundamentally altered the character of modern military operations. Early military drones were primarily used for reconnaissance, providing commanders with real-time intelligence without risking pilot lives. The introduction of armed drones, beginning with the MQ-1 Predator\'s first missile strike in 2001, collapsed the traditional boundary between intelligence gathering and strike operations. A single platform could now find, fix, and finish targets in a continuous process that previously required coordination among multiple manned aircraft. The advantages are significant: UAVs can loiter over target areas for 20 or more hours, far exceeding the endurance of manned aircraft. They eliminate the risk of pilot capture, and their operational costs are a fraction of manned alternatives. However, the proliferation of drone technology raises profound questions. The low cost of entry has enabled dozens of nations and non-state actors to acquire capable systems. The psychological impact on both operators -- who engage targets remotely from thousands of miles away -- and civilian populations who live under persistent surveillance remains poorly understood. Furthermore, the ease of employing lethal force without risk to one\'s own personnel may lower the threshold for the use of military action.',
    questions: [
      {
        text: 'According to the passage, what traditional boundary did armed drones collapse?',
        options: [
          'Between air and ground operations',
          'Between intelligence gathering and strike operations',
          'Between military and civilian technology',
          'Between offensive and defensive warfare',
        ],
        correctAnswer: 1,
        explanation: 'The passage states that armed drones "collapsed the traditional boundary between intelligence gathering and strike operations."',
      },
      {
        text: 'The author\'s overall stance on military drones can best be characterized as:',
        options: [
          'Enthusiastically in favor of expanded use',
          'Strongly opposed due to ethical concerns',
          'Acknowledging benefits while raising significant concerns',
          'Neutral with no expressed opinion',
        ],
        correctAnswer: 2,
        explanation: 'The passage describes significant advantages, then pivots to "profound questions" about proliferation, psychological impact, and lowered thresholds for force.',
      },
      {
        text: 'Which concern about drones does the passage suggest is the most strategically significant?',
        options: [
          'Their high operational costs',
          'The risk of pilot injury',
          'The possibility that ease of use may encourage more frequent military action',
          'Their limited endurance compared to manned aircraft',
        ],
        correctAnswer: 2,
        explanation: 'The passage identifies the concern that "the ease of employing lethal force without risk to one\'s own personnel may lower the threshold for the use of military action" as a profound question.',
      },
    ],
  },
  {
    id: 'rct-017',
    section: 'RCT',
    type: 'passage',
    difficulty: 'easy',
    tags: ['general-knowledge', 'fitness'],
    explanation: 'This passage discusses the importance of physical fitness in military service.',
    passage:
      'Physical fitness has been a cornerstone of military readiness throughout history, but the nature of fitness requirements has evolved with changing operational demands. Ancient armies valued raw strength and endurance for hand-to-hand combat and long marches. Modern military operations, while still physically demanding, require a broader range of fitness attributes. Soldiers may need to carry loads exceeding 100 pounds over rough terrain, sprint between covered positions under fire, drag a wounded comrade to safety, or maintain focus during extended periods of sleep deprivation. Recognizing this, all U.S. military branches have updated their fitness tests in recent years to emphasize functional fitness over traditional metrics like maximum push-ups or sit-ups. The Army Combat Fitness Test, for example, includes deadlifts, standing power throws, and sprint-drag-carry events that simulate combat movements. Research has consistently shown that physically fit service members suffer fewer injuries, recover faster from wounds, and demonstrate better cognitive performance under stress. The connection between physical fitness and mental resilience is particularly well-documented: regular exercise has been shown to reduce rates of anxiety, depression, and post-traumatic stress.',
    questions: [
      {
        text: 'According to the passage, why have military fitness tests been updated?',
        options: [
          'Because service members were becoming less fit',
          'To make tests easier to administer',
          'To better reflect the functional demands of modern combat',
          'To reduce injury rates during testing',
        ],
        correctAnswer: 2,
        explanation: 'The passage states that branches updated tests "to emphasize functional fitness over traditional metrics" in response to the diverse physical demands of modern operations.',
      },
      {
        text: 'The passage identifies all of the following as benefits of physical fitness EXCEPT:',
        options: [
          'Fewer injuries',
          'Better cognitive performance under stress',
          'Higher promotion rates',
          'Reduced rates of anxiety and depression',
        ],
        correctAnswer: 2,
        explanation: 'The passage mentions fewer injuries, better cognitive performance, and reduced anxiety/depression, but does not mention promotion rates.',
      },
      {
        text: 'The passage\'s main argument is that:',
        options: [
          'Ancient soldiers were more physically fit than modern ones',
          'Physical fitness remains essential but its definition has expanded for modern military needs',
          'Push-ups and sit-ups are no longer valid measures of fitness',
          'The Army Combat Fitness Test is the best fitness test ever developed',
        ],
        correctAnswer: 1,
        explanation: 'The passage traces how fitness requirements have evolved from narrow (strength/endurance) to broader (functional fitness including cognitive resilience) while remaining essential.',
      },
    ],
  },
];

export default rctQuestions;
