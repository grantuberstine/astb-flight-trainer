import type { SectionLesson } from '../../types/lesson';

const mctLesson: SectionLesson = {
  sectionId: 'MCT',
  title: 'Mechanical Comprehension Test',
  topics: [
    {
      name: 'Forces and Motion',
      cards: [
        {
          id: 'mct-lesson-forces-1',
          heading: "Newton's Three Laws of Motion",
          content:
            "Newton's First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted on by an unbalanced force. Second Law: Force equals mass times acceleration (F = ma) — more force means more acceleration, more mass means less acceleration. Third Law: For every action, there is an equal and opposite reaction — when you push on something, it pushes back on you with the same force.",
          keyTakeaway:
            'First Law = inertia, Second Law = F = ma, Third Law = action-reaction pairs.',
        },
        {
          id: 'mct-lesson-forces-2',
          heading: 'Friction: Static vs. Kinetic',
          content:
            "Friction is the force that opposes motion between two surfaces in contact. Static friction prevents an object from starting to move and is always greater than kinetic (sliding) friction. Once an object begins sliding, kinetic friction takes over — which is why it's harder to start pushing a heavy box than to keep it moving. The amount of friction depends on the surfaces' roughness (coefficient of friction) and the normal force pressing them together.",
          keyTakeaway:
            'Static friction > kinetic friction. Friction depends on surface roughness and normal force.',
        },
        {
          id: 'mct-lesson-forces-3',
          heading: 'Inclined Planes and Gravity Components',
          content:
            "On an inclined plane, gravity splits into two components: one parallel to the slope (mg·sin θ) that pulls the object downhill, and one perpendicular to the slope (mg·cos θ) that pushes the object into the surface. A steeper angle increases the downhill component and decreases the normal force. That's why steeper ramps require more effort to hold an object in place, while gentler ramps make it easier to move heavy loads upward.",
          keyTakeaway:
            'Steeper angle = more force pulling downhill. Ramps trade distance for reduced force.',
        },
        {
          id: 'mct-lesson-forces-4',
          heading: 'Momentum and Impulse',
          content:
            "Momentum is mass times velocity (p = mv). In collisions, total momentum is conserved — the total momentum before a collision equals the total after. Impulse is force times time (J = F·t) and equals the change in momentum. This is why airbags work: by increasing the time of deceleration, they reduce the peak force on your body, even though the total change in momentum stays the same.",
          keyTakeaway:
            'Momentum is conserved in collisions. Longer impact time = lower peak force.',
        },
      ],
    },
    {
      name: 'Simple Machines',
      cards: [
        {
          id: 'mct-lesson-machines-1',
          heading: 'Lever Classes',
          content:
            "Levers have three parts: fulcrum (pivot), effort (input force), and load (output force). First-class levers (seesaw, crowbar) have the fulcrum between effort and load. Second-class levers (wheelbarrow, nutcracker) have the load between the fulcrum and effort — they always multiply force. Third-class levers (fishing rod, tweezers) have the effort between the fulcrum and load — they sacrifice force for speed and range of motion.",
          keyTakeaway:
            '1st class: fulcrum in middle. 2nd class: load in middle (force advantage). 3rd class: effort in middle (speed advantage).',
        },
        {
          id: 'mct-lesson-machines-2',
          heading: 'Pulleys and Mechanical Advantage',
          content:
            "A single fixed pulley changes force direction but doesn't reduce effort. A movable pulley provides a mechanical advantage (MA) of 2. In compound pulley systems, the MA equals the number of rope segments supporting the load. The trade-off: higher MA means you pull more rope to lift the same height. For example, a system with MA of 4 requires you to pull 4 meters of rope to lift the load 1 meter.",
          keyTakeaway:
            'MA = number of supporting rope segments. More MA = less force but more rope to pull.',
        },
        {
          id: 'mct-lesson-machines-3',
          heading: 'Gears: Direction and Speed Ratios',
          content:
            "When two gears mesh, they rotate in opposite directions. In a gear train, the driving gear turns clockwise and the driven gear turns counterclockwise. The gear ratio determines speed: a small driving gear (20 teeth) meshing with a large driven gear (60 teeth) gives a 1:3 ratio — the driven gear turns 3× slower but with 3× the torque. Adding an intermediate 'idler' gear reverses direction without changing the speed ratio.",
          keyTakeaway:
            'Meshed gears turn opposite directions. Larger gear = slower rotation but more torque.',
        },
        {
          id: 'mct-lesson-machines-4',
          heading: 'Combined Machines and the Work Trade-Off',
          content:
            "Simple machines never create energy — they trade force for distance. A ramp lets you use less force over a longer distance. When machines are combined, their mechanical advantages multiply. A lever (MA 3) feeding into a pulley system (MA 2) gives a total MA of 6. However, efficiency decreases with complexity because each component adds friction losses. The golden rule: Work input always equals work output plus energy lost to friction.",
          keyTakeaway:
            'Machines trade force for distance. Combined MAs multiply. Real machines always lose some energy to friction.',
        },
      ],
    },
    {
      name: 'Fluids and Pressure',
      cards: [
        {
          id: 'mct-lesson-fluids-1',
          heading: 'Pressure Basics',
          content:
            "Pressure is force divided by area (P = F/A), measured in Pascals (Pa). This is why a person in high heels exerts more pressure on the floor than an elephant — the heel's small area concentrates the force. In fluids, pressure increases with depth because of the weight of the fluid above (P = ρgh). At sea level, atmospheric pressure is about 101,325 Pa, equivalent to the weight of a column of air extending to the edge of the atmosphere.",
          keyTakeaway:
            'P = F/A. Smaller area = more pressure. Fluid pressure increases with depth.',
        },
        {
          id: 'mct-lesson-fluids-2',
          heading: "Pascal's Law and Hydraulics",
          content:
            "Pascal's Law states that pressure applied to a confined fluid is transmitted equally throughout the fluid. Hydraulic systems use this principle: a small piston applies force to a fluid, and a larger piston on the other side exerts a proportionally greater force. The mechanical advantage equals the ratio of piston areas. If the output piston has 10× the area, it produces 10× the force — but moves only 1/10 the distance. This is how car brakes, hydraulic jacks, and aircraft flight controls work.",
          keyTakeaway:
            "Pascal's Law: pressure is transmitted equally through confined fluid. MA = area ratio of pistons.",
        },
        {
          id: 'mct-lesson-fluids-3',
          heading: "Buoyancy and Archimedes' Principle",
          content:
            "Archimedes' principle states that the buoyant force on a submerged object equals the weight of the fluid it displaces. An object floats when its weight is less than the weight of fluid it displaces. A steel ship floats because its hollow hull shape displaces enough water to generate buoyant force exceeding the ship's weight. The fraction of a floating object that is submerged equals the ratio of the object's density to the fluid's density.",
          keyTakeaway:
            "Buoyant force = weight of displaced fluid. Objects float when they're less dense than the fluid (on average).",
        },
      ],
    },
    {
      name: 'Electricity Basics',
      cards: [
        {
          id: 'mct-lesson-electricity-1',
          heading: 'Voltage, Current, and Resistance',
          content:
            "Think of electricity like water in pipes. Voltage (V) is the pressure pushing electrons through the circuit — provided by a battery or generator. Current (I, in amperes) is the rate of electron flow — how many electrons pass a point per second. Resistance (R, in ohms) is how much a material opposes current flow. Thicker wires have less resistance, longer wires have more, and metals conduct better than insulators.",
          keyTakeaway:
            'Voltage = pressure, Current = flow rate, Resistance = opposition to flow.',
        },
        {
          id: 'mct-lesson-electricity-2',
          heading: "Ohm's Law",
          content:
            "Ohm's Law (V = IR) relates voltage, current, and resistance. If you increase voltage with the same resistance, current increases. If you increase resistance with the same voltage, current decreases. Rearranged: I = V/R (to find current) and R = V/I (to find resistance). Power can also be calculated: P = IV = I²R = V²/R. These relationships are essential for analyzing any electrical circuit.",
          keyTakeaway:
            "V = IR. More voltage = more current. More resistance = less current. Power = IV.",
        },
        {
          id: 'mct-lesson-electricity-3',
          heading: 'Series vs. Parallel Circuits',
          content:
            "In series circuits, components are connected end-to-end in a single path. Total resistance adds (R₁ + R₂ + R₃), current is the same everywhere, and voltage divides among components. If one component fails, the whole circuit breaks. In parallel circuits, components connect across the same two points. Voltage is the same across all branches, currents add up, and total resistance is less than any individual resistance (1/R_total = 1/R₁ + 1/R₂). If one branch fails, others continue working.",
          keyTakeaway:
            'Series: same current, add resistances, one failure breaks all. Parallel: same voltage, add currents, independent branches.',
        },
        {
          id: 'mct-lesson-electricity-4',
          heading: 'Circuit Components',
          content:
            "A fuse or circuit breaker protects a circuit by breaking it when current is too high (preventing fires). A capacitor stores energy in an electric field between two plates — useful for smoothing power and timing circuits. A resistor limits current flow and converts electrical energy to heat. A switch opens or closes the circuit. In diagrams, these components use standard symbols: a zigzag for resistors, two parallel lines for capacitors, and a break in a line for switches.",
          keyTakeaway:
            'Fuses protect circuits, capacitors store charge, resistors limit current, switches control flow.',
        },
      ],
    },
    {
      name: 'Engines and Energy',
      cards: [
        {
          id: 'mct-lesson-engines-1',
          heading: 'The Four-Stroke Engine Cycle',
          content:
            "Most car engines use the four-stroke cycle: (1) Intake — the piston moves down, drawing in a fuel-air mixture. (2) Compression — the piston moves up, compressing the mixture to increase its energy density. (3) Power — the spark plug ignites the compressed mixture, forcing the piston down — this is the only stroke that produces work. (4) Exhaust — the piston moves up again, pushing burned gases out. The crankshaft rotates twice (720°) per complete cycle.",
          keyTakeaway:
            'Intake → Compression → Power → Exhaust. Only the power stroke produces work. Two crankshaft rotations per cycle.',
        },
        {
          id: 'mct-lesson-engines-2',
          heading: 'Heat Transfer: Three Modes',
          content:
            "Heat transfers in three ways. Conduction: direct contact between molecules — touching a hot pan, heat flowing through a metal rod. Metals are excellent conductors; insulators (wood, plastic, air) are poor conductors. Convection: heat carried by moving fluid — hot air rising, boiling water circulating. Only occurs in liquids and gases. Radiation: electromagnetic waves carrying energy — sunlight warming Earth, a campfire warming your face. The only mode that works through a vacuum.",
          keyTakeaway:
            'Conduction = contact, Convection = fluid movement, Radiation = electromagnetic waves (works in vacuum).',
        },
        {
          id: 'mct-lesson-engines-3',
          heading: 'Efficiency and Energy Conservation',
          content:
            "Energy cannot be created or destroyed, only converted from one form to another (Conservation of Energy). Mechanical efficiency = useful work output ÷ total energy input × 100%. No engine can achieve 100% efficiency — the Second Law of Thermodynamics requires some energy to be lost as waste heat. Practical efficiencies: gasoline engines ~25-30%, diesel engines ~35-45%, electric motors ~85-95%. Engineers improve efficiency by reducing friction, improving combustion, and recovering waste heat.",
          keyTakeaway:
            'Efficiency = useful output / total input. 100% is impossible. Electric motors are far more efficient than combustion engines.',
        },
      ],
    },
  ],
};

export default mctLesson;
