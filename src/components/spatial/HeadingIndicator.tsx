interface HeadingIndicatorProps {
  heading: number;
  width?: number;
}

const CARDINAL: Record<number, string> = {
  0: 'N', 45: 'NE', 90: 'E', 135: 'SE',
  180: 'S', 225: 'SW', 270: 'W', 315: 'NW', 360: 'N',
};

export function HeadingIndicator({ heading, width = 300 }: HeadingIndicatorProps) {
  // Normalize heading to 0-360
  const h = ((heading % 360) + 360) % 360;

  // We show a 180° window centered on current heading
  const halfWindow = 90;
  const stripWidth = width - 40; // leave room for pointer
  const pxPerDeg = stripWidth / (halfWindow * 2);

  // Generate tick marks for the visible range
  const ticks: { deg: number; x: number; label?: string; major: boolean }[] = [];
  for (let deg = -halfWindow; deg <= halfWindow; deg += 5) {
    let actual = ((h + deg) % 360 + 360) % 360;
    actual = Math.round(actual);
    const x = (deg + halfWindow) * pxPerDeg + 20;
    const isMajor = actual % 45 === 0;
    const isMinor10 = actual % 10 === 0;

    if (isMajor) {
      ticks.push({ deg: actual, x, label: CARDINAL[actual] ?? `${actual}°`, major: true });
    } else if (isMinor10) {
      ticks.push({ deg: actual, x, label: `${actual}°`, major: false });
    } else {
      ticks.push({ deg: actual, x, major: false });
    }
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={36} viewBox={`0 0 ${width} 36`}>
        {/* Background strip */}
        <rect x="20" y="4" width={stripWidth} height="28" rx="4" fill="#1e293b" />

        {/* Tick marks and labels */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={t.x} y1={t.major ? 8 : 12}
              x2={t.x} y2={t.major ? 22 : 20}
              stroke={t.major ? '#f8fafc' : '#64748b'}
              strokeWidth={t.major ? 1.5 : 0.75}
            />
            {t.label && (
              <text
                x={t.x}
                y={30}
                textAnchor="middle"
                fontSize={t.major ? 8 : 7}
                fill={t.major ? '#f8fafc' : '#94a3b8'}
                fontWeight={t.major ? 'bold' : 'normal'}
                fontFamily="sans-serif"
              >
                {t.label}
              </text>
            )}
          </g>
        ))}

        {/* Center pointer triangle (top) */}
        <polygon
          points={`${width / 2 - 5},4 ${width / 2 + 5},4 ${width / 2},10`}
          fill="#f472b6"
        />

        {/* Center line */}
        <line
          x1={width / 2} y1="10"
          x2={width / 2} y2="22"
          stroke="#f472b6"
          strokeWidth="1.5"
        />
      </svg>
      <p className="text-xs font-semibold text-slate-600">
        HDG {Math.round(h)}°
      </p>
    </div>
  );
}
