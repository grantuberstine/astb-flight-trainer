import type { SectionLesson } from '../../types/lesson';

const mstLesson: SectionLesson = {
  sectionId: 'MST',
  title: 'Math Skills Test',
  topics: [
    {
      name: 'Arithmetic Fundamentals',
      cards: [
        {
          id: 'mst-lesson-arith-01',
          heading: 'Fraction Operations',
          content:
            'To add or subtract fractions, find a common denominator first. To multiply fractions, multiply numerators and denominators straight across, then simplify. To divide fractions, multiply by the reciprocal of the divisor. Always reduce your final answer to lowest terms.',
          keyTakeaway:
            'Common denominator for add/subtract; multiply straight across; divide by flipping the second fraction.',
        },
        {
          id: 'mst-lesson-arith-02',
          heading: 'Decimal-Percent-Fraction Conversions',
          content:
            'To convert a decimal to a percent, multiply by 100 (move decimal two places right). To convert a percent to a decimal, divide by 100. To convert a fraction to a decimal, divide the numerator by the denominator. Key benchmarks: 1/4 = 0.25 = 25%, 1/3 ≈ 0.333 = 33.3%, 1/2 = 0.5 = 50%, 3/4 = 0.75 = 75%.',
          keyTakeaway:
            'Move the decimal two places right for percent, two places left for decimal.',
        },
        {
          id: 'mst-lesson-arith-03',
          heading: 'Order of Operations (PEMDAS)',
          content:
            'Evaluate expressions in this order: Parentheses, Exponents, Multiplication and Division (left to right), Addition and Subtraction (left to right). A common mistake is performing addition before multiplication. Remember that multiplication and division share the same priority level and are evaluated left to right.',
          keyTakeaway:
            'PEMDAS: Parentheses first, then exponents, then multiply/divide left to right, then add/subtract left to right.',
        },
        {
          id: 'mst-lesson-arith-04',
          heading: 'Estimation Strategies',
          content:
            'On timed tests, estimation saves valuable seconds. Round numbers to convenient values before computing: 497 x 31 ≈ 500 x 30 = 15,000. When estimating square roots, identify the nearest perfect squares above and below. For percentages, use benchmarks: 10% is easy to compute, then scale.',
          keyTakeaway:
            'Round to friendly numbers, use perfect square benchmarks, and leverage 10% as a building block.',
        },
      ],
    },
    {
      name: 'Algebra Essentials',
      cards: [
        {
          id: 'mst-lesson-alg-01',
          heading: 'Solving Linear Equations',
          content:
            'To solve a linear equation, isolate the variable by performing inverse operations on both sides. Distribute any parentheses first, combine like terms, then move variable terms to one side and constants to the other. Always check your solution by substituting back into the original equation.',
          keyTakeaway:
            'Distribute, combine like terms, isolate the variable, and verify by substitution.',
        },
        {
          id: 'mst-lesson-alg-02',
          heading: 'Translating Word Problems to Equations',
          content:
            'Identify the unknown and assign it a variable. Key phrases: "is" means equals, "of" means multiply, "more than" means add, "less than" means subtract, "twice" means multiply by 2. Set up the equation by translating the English sentence phrase by phrase, then solve algebraically.',
          keyTakeaway:
            'Assign a variable, translate key phrases into math operations, then solve.',
        },
        {
          id: 'mst-lesson-alg-03',
          heading: 'Exponent Rules',
          content:
            'Same base multiplication: add exponents (x^a * x^b = x^(a+b)). Same base division: subtract exponents (x^a / x^b = x^(a-b)). Power of a power: multiply exponents ((x^a)^b = x^(ab)). Any nonzero number to the zero power equals 1. Negative exponents mean reciprocals: x^(-n) = 1/x^n.',
          keyTakeaway:
            'Multiply → add exponents. Divide → subtract exponents. Power of power → multiply exponents.',
        },
        {
          id: 'mst-lesson-alg-04',
          heading: 'Inequality Basics',
          content:
            'Inequalities follow the same rules as equations with one critical difference: when you multiply or divide both sides by a negative number, you must flip the inequality sign. For compound inequalities, solve each part separately and find the intersection. Graph solutions on a number line to verify.',
          keyTakeaway:
            'Flip the inequality sign when multiplying or dividing by a negative number.',
        },
      ],
    },
    {
      name: 'Geometry Foundations',
      cards: [
        {
          id: 'mst-lesson-geo-01',
          heading: 'Triangle Properties and the Pythagorean Theorem',
          content:
            'The angles of any triangle sum to 180 degrees. In a right triangle, a^2 + b^2 = c^2, where c is the hypotenuse. Know the common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17. Special right triangles: in a 45-45-90, the hypotenuse = leg * sqrt(2); in a 30-60-90, the sides are in ratio 1 : sqrt(3) : 2.',
          keyTakeaway:
            'Pythagorean theorem for right triangles; memorize common triples and special triangle ratios.',
        },
        {
          id: 'mst-lesson-geo-02',
          heading: 'Circle Formulas',
          content:
            'Circumference = 2 * pi * r = pi * d. Area = pi * r^2. Sector area = (central angle / 360) * pi * r^2. Arc length = (central angle / 360) * 2 * pi * r. Remember: the radius is half the diameter, and area always involves r squared while circumference involves r to the first power.',
          keyTakeaway:
            'Circumference uses r; area uses r squared. Sectors and arcs use the fraction (angle/360).',
        },
        {
          id: 'mst-lesson-geo-03',
          heading: 'Area and Volume Formulas',
          content:
            'Rectangle area = l * w. Triangle area = (1/2) * b * h. Trapezoid area = (1/2)(b1 + b2)(h). Rectangular prism volume = l * w * h. Cylinder volume = pi * r^2 * h. Cone volume = (1/3) * pi * r^2 * h. Sphere volume = (4/3) * pi * r^3. Surface area of a cube = 6s^2.',
          keyTakeaway:
            'Memorize key formulas: cones and pyramids use 1/3 of the prism formula; spheres use 4/3.',
        },
        {
          id: 'mst-lesson-geo-04',
          heading: 'Coordinate Geometry Basics',
          content:
            'Distance formula: d = sqrt((x2-x1)^2 + (y2-y1)^2). Midpoint: ((x1+x2)/2, (y1+y2)/2). Slope: m = (y2-y1)/(x2-x1). Slope-intercept form: y = mx + b. Parallel lines have equal slopes. Perpendicular lines have slopes that are negative reciprocals.',
          keyTakeaway:
            'Distance uses the Pythagorean theorem; slope = rise/run; parallel lines share slope.',
        },
      ],
    },
    {
      name: 'Problem-Solving Strategies',
      cards: [
        {
          id: 'mst-lesson-strat-01',
          heading: 'Rate-Time-Distance Framework',
          content:
            'The fundamental formula is Distance = Rate x Time. For two objects moving toward each other, add their speeds. For objects moving apart, also add speeds. For objects moving in the same direction, subtract speeds. For boats or planes with wind/current, groundspeed = airspeed + tailwind or airspeed - headwind.',
          keyTakeaway:
            'D = R x T. Add speeds for objects approaching; subtract for same-direction travel.',
        },
        {
          id: 'mst-lesson-strat-02',
          heading: 'Percent Change Formula',
          content:
            'Percent change = (new - original) / original x 100. For successive percent changes, multiply the factors rather than adding percentages. For example, a 20% increase then a 10% decrease: 1.20 x 0.90 = 1.08, or an 8% net increase. This is why a 20% increase followed by a 20% decrease does NOT return to the original value.',
          keyTakeaway:
            'Percent change = (difference / original) x 100. Multiply factors for successive changes.',
        },
        {
          id: 'mst-lesson-strat-03',
          heading: 'Work Problems Approach',
          content:
            'Express each worker\'s contribution as a rate (fraction of work per unit time). Worker A completes a job in 6 hours → rate is 1/6 per hour. Combined rate = sum of individual rates. Time to complete = 1 / combined rate. For drains or opposing forces, subtract their rate from the fill rate.',
          keyTakeaway:
            'Rate = 1/time. Add rates for combined work; subtract for opposing forces.',
        },
      ],
    },
  ],
};

export default mstLesson;
