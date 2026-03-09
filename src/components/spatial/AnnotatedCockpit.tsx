import type { SpatialScenarioParams } from '../../types/question';
import { CockpitView } from './CockpitView';

interface AnnotatedCockpitProps {
  scenarioParams: SpatialScenarioParams;
  className?: string;
}

export function AnnotatedCockpit({ scenarioParams, className = '' }: AnnotatedCockpitProps) {
  const { pitch, bank, heading, coastline } = scenarioParams;

  return (
    <div className={`relative inline-block ${className}`}>
      <CockpitView
        pitch={pitch}
        bank={bank}
        heading={heading}
        coastline={coastline}
        width={240}
        height={240}
      />

      {/* Annotation labels */}
      <div className="absolute inset-0" style={{ width: 240, height: 240 }}>
        {bank !== 0 && (
          <span
            className="absolute rounded bg-slate-800/70 px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap"
            style={{
              top: '15%',
              left: bank > 0 ? '5%' : undefined,
              right: bank < 0 ? '5%' : undefined,
            }}
          >
            Bank {bank > 0 ? 'right' : 'left'} {Math.abs(bank)}&deg;
          </span>
        )}

        {pitch !== 0 && (
          <span
            className="absolute left-1/2 -translate-x-1/2 rounded bg-slate-800/70 px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap"
            style={{
              top: pitch > 0 ? '25%' : '65%',
            }}
          >
            Nose {pitch > 0 ? 'up' : 'down'} {Math.abs(pitch)}&deg;
          </span>
        )}

        {coastline !== 'none' && (
          <span
            className="absolute rounded bg-slate-800/70 px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap"
            style={{
              bottom: '25%',
              left: coastline.includes('left') ? '5%' : undefined,
              right: coastline.includes('right') ? '5%' : undefined,
            }}
          >
            Coast: {coastline}
          </span>
        )}

        <span
          className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-slate-800/70 px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap"
        >
          Heading: {heading}&deg;
        </span>
      </div>
    </div>
  );
}
