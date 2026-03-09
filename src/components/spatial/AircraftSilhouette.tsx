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
  size = 120,
}: AircraftSilhouetteProps) {
  // Heading rotates the aircraft, bank tilts it
  const totalRotation = heading + bank;

  // Pitch shown as a small nose-up/down arrow indicator
  const pitchLabel = pitch > 0 ? `+${pitch}°` : pitch < 0 ? `${pitch}°` : '';

  let borderColor = 'border-slate-300';
  let bgColor = 'bg-white';
  let fillColor = '#1e293b';
  if (correct) {
    borderColor = 'border-emerald-400';
    bgColor = 'bg-emerald-50';
    fillColor = '#047857';
  } else if (incorrect) {
    borderColor = 'border-red-400';
    bgColor = 'bg-red-50';
    fillColor = '#b91c1c';
  } else if (selected) {
    borderColor = 'border-pink-400';
    bgColor = 'bg-pink-50';
    fillColor = '#be185d';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border-2 p-1 transition-colors ${borderColor} ${bgColor} ${
        disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-pink-400 hover:bg-pink-50 cursor-pointer'
      }`}
      style={{ width: size + 12, height: size + 28 }}
    >
      <svg
        viewBox="0 0 100 114"
        width={size}
        height={size + 16}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Compass ring and cardinal markers */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#e2e8f0" strokeWidth="1" />

        {/* N - bold and prominent */}
        <text x="50" y="8" textAnchor="middle" fontSize="11" fill="#1e293b" fontWeight="800" fontFamily="sans-serif">N</text>
        {/* S */}
        <text x="50" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="700" fontFamily="sans-serif">S</text>
        {/* E */}
        <text x="98" y="53" textAnchor="end" fontSize="9" fill="#94a3b8" fontWeight="700" fontFamily="sans-serif">E</text>
        {/* W */}
        <text x="2" y="53" textAnchor="start" fontSize="9" fill="#94a3b8" fontWeight="700" fontFamily="sans-serif">W</text>

        {/* Cardinal tick marks */}
        <line x1="50" y1="10" x2="50" y2="15" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="85" x2="50" y2="90" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="10" y1="50" x2="15" y2="50" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="85" y1="50" x2="90" y2="50" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* 45° tick marks */}
        <line x1="78" y1="22" x2="74.5" y2="25.5" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="22" y1="22" x2="25.5" y2="25.5" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="78" y1="78" x2="74.5" y2="74.5" stroke="#e2e8f0" strokeWidth="1" />
        <line x1="22" y1="78" x2="25.5" y2="74.5" stroke="#e2e8f0" strokeWidth="1" />

        {/* Aircraft - rotated by heading + bank */}
        <g transform={`rotate(${totalRotation}, 50, 50)`}>
          {/* Fighter jet top-down silhouette */}
          <path
            d={`
              M 50,20
              C 51.5,22 52.5,26 53,32
              L 53,42
              L 76,54
              L 76,57
              L 72,56
              L 53,48
              L 53,62
              L 62,68
              L 62,71
              L 50,68
              L 38,71
              L 38,68
              L 47,62
              L 47,48
              L 28,56
              L 24,57
              L 24,54
              L 47,42
              L 47,32
              C 47.5,26 48.5,22 50,20
              Z
            `}
            fill={fillColor}
            stroke={fillColor}
            strokeWidth="0.5"
            strokeLinejoin="round"
          />

          {/* Canopy */}
          <ellipse cx="50" cy="33" rx="2" ry="4" fill="rgba(255,255,255,0.2)" />
        </g>

        {/* Pitch indicator below compass */}
        {pitchLabel && (
          <text x="50" y="112" textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="600" fontFamily="sans-serif">
            Pitch {pitchLabel}
          </text>
        )}
      </svg>
    </button>
  );
}
