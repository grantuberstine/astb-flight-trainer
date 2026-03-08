interface AircraftSilhouetteProps {
  pitch: number;
  bank: number;
  heading: number;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: number;
}

export function AircraftSilhouette({
  pitch,
  bank,
  heading,
  selected = false,
  correct = false,
  incorrect = false,
  onClick,
  disabled = false,
  size = 64,
}: AircraftSilhouetteProps) {
  // Pitch shown as vertical offset (positive pitch = nose up = shift up)
  const pitchOffset = -(pitch / 90) * 8;

  // Heading rotates the whole aircraft (0 = north = nose up)
  const headingRotation = heading;

  // Bank tilts the aircraft body
  const bankRotation = bank;

  // Combined rotation
  const totalRotation = headingRotation + bankRotation;

  let borderColor = 'border-navy-600';
  let bgColor = 'bg-navy-800/50';
  if (correct) {
    borderColor = 'border-green-500';
    bgColor = 'bg-green-500/10';
  } else if (incorrect) {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-500/10';
  } else if (selected) {
    borderColor = 'border-gold-400';
    bgColor = 'bg-gold-400/10';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border-2 p-1 transition-colors ${borderColor} ${bgColor} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-navy-400 cursor-pointer'
      }`}
      style={{ width: size + 12, height: size + 12 }}
    >
      <svg
        viewBox="0 0 60 60"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Heading indicator - N marker */}
        <text
          x="30"
          y="8"
          textAnchor="middle"
          fontSize="7"
          fill="#94a3b8"
          fontWeight="bold"
        >
          N
        </text>

        {/* Aircraft group - rotated by heading + bank, offset by pitch */}
        <g transform={`translate(30, ${30 + pitchOffset}) rotate(${totalRotation}, 0, 0)`}>
          {/* Fuselage */}
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          {/* Wings */}
          <line x1="-14" y1="2" x2="14" y2="2" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
          {/* Tail */}
          <line x1="-6" y1="10" x2="6" y2="10" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
          {/* Nose marker */}
          <circle cx="0" cy="-12" r="1.5" fill="#e2e8f0" />
        </g>
      </svg>
    </button>
  );
}
