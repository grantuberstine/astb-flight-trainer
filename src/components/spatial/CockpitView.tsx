import { useRef, useEffect } from 'react';
import type { CoastlinePosition } from '../../types/question';

interface CockpitViewProps {
  pitch: number;
  bank: number;
  heading: number;
  coastline: CoastlinePosition;
  width?: number;
  height?: number;
  className?: string;
}

const SKY_COLOR = '#4A90D9';
const GROUND_COLOR = '#6B4226';
const WATER_COLOR = '#2E6B9E';

export function CockpitView({
  pitch,
  bank,
  coastline,
  width = 280,
  height = 280,
  className = '',
}: CockpitViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;
    const bankRad = (bank * Math.PI) / 180;
    const horizonY = (pitch / 90) * (height / 2);

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Save, translate to center, rotate by bank
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-bankRad);

    // Extend drawing area for rotation clipping
    const diag = Math.sqrt(width * width + height * height);

    // Sky
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(-diag, -diag, diag * 2, diag + horizonY);

    // Ground
    ctx.fillStyle = GROUND_COLOR;
    ctx.fillRect(-diag, horizonY, diag * 2, diag);

    // Coastline
    if (coastline !== 'none') {
      drawCoastline(ctx, coastline, horizonY, diag, width, height);
    }

    // Horizon line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-diag, horizonY);
    ctx.lineTo(diag, horizonY);
    ctx.stroke();

    ctx.restore();

    // Fixed aircraft reference (not rotated)
    drawAircraftReference(ctx, cx, cy);

    // Circular clip mask (cockpit frame)
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(width, height) / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Draw cockpit frame ring
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(width, height) / 2 - 2, 0, Math.PI * 2);
    ctx.stroke();
  }, [pitch, bank, coastline, width, height]);

  return (
    <div className={`inline-block ${className}`} style={{ width, height }}>
      <canvas ref={canvasRef} className="rounded-full" />
    </div>
  );
}

function drawCoastline(
  ctx: CanvasRenderingContext2D,
  coastline: CoastlinePosition,
  horizonY: number,
  diag: number,
  _width: number,
  _height: number,
) {
  // Coastline: water replaces part of the ground near the horizon
  ctx.save();
  ctx.fillStyle = WATER_COLOR;

  const coastDepth = diag * 0.4;

  ctx.beginPath();
  switch (coastline) {
    case 'left':
      // Water on left side of ground
      ctx.moveTo(-diag, horizonY);
      ctx.lineTo(-diag * 0.1, horizonY);
      ctx.bezierCurveTo(
        -diag * 0.15, horizonY + coastDepth * 0.3,
        -diag * 0.5, horizonY + coastDepth * 0.5,
        -diag, horizonY + coastDepth,
      );
      ctx.closePath();
      break;

    case 'right':
      // Water on right side of ground
      ctx.moveTo(diag, horizonY);
      ctx.lineTo(diag * 0.1, horizonY);
      ctx.bezierCurveTo(
        diag * 0.15, horizonY + coastDepth * 0.3,
        diag * 0.5, horizonY + coastDepth * 0.5,
        diag, horizonY + coastDepth,
      );
      ctx.closePath();
      break;

    case 'ahead-left':
      // Water ahead curving left
      ctx.moveTo(-diag, horizonY);
      ctx.lineTo(diag * 0.3, horizonY);
      ctx.bezierCurveTo(
        diag * 0.1, horizonY + coastDepth * 0.2,
        -diag * 0.2, horizonY + coastDepth * 0.4,
        -diag, horizonY + coastDepth * 0.6,
      );
      ctx.closePath();
      break;

    case 'ahead-right':
      // Water ahead curving right
      ctx.moveTo(diag, horizonY);
      ctx.lineTo(-diag * 0.3, horizonY);
      ctx.bezierCurveTo(
        -diag * 0.1, horizonY + coastDepth * 0.2,
        diag * 0.2, horizonY + coastDepth * 0.4,
        diag, horizonY + coastDepth * 0.6,
      );
      ctx.closePath();
      break;
  }

  ctx.fill();
  ctx.restore();
}

function drawAircraftReference(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
) {
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  // Left wing
  ctx.beginPath();
  ctx.moveTo(cx - 30, cy);
  ctx.lineTo(cx - 10, cy);
  ctx.stroke();

  // Right wing
  ctx.beginPath();
  ctx.moveTo(cx + 10, cy);
  ctx.lineTo(cx + 30, cy);
  ctx.stroke();

  // Center dot
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  // Vertical tail indicator
  ctx.beginPath();
  ctx.moveTo(cx, cy + 5);
  ctx.lineTo(cx, cy + 15);
  ctx.stroke();
}
