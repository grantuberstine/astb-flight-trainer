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

// Realistic ASTB-style colors
const SKY_TOP = '#1E5FA8';
const SKY_BOTTOM = '#6BA3D6';
const GROUND_TOP = '#8B6914';
const GROUND_BOTTOM = '#5C4A1E';
const WATER_COLOR = '#1A5276';
const HORIZON_COLOR = '#FFFFFF';

export function CockpitView({
  pitch,
  bank,
  coastline,
  width = 300,
  height = 300,
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
    const radius = Math.min(width, height) / 2 - 8;
    const bankRad = (bank * Math.PI) / 180;
    const horizonY = (pitch / 90) * radius;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Clip to circular viewport
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // Rotate by bank
    ctx.translate(cx, cy);
    ctx.rotate(-bankRad);

    const diag = Math.sqrt(width * width + height * height);

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, -diag, 0, horizonY);
    skyGrad.addColorStop(0, SKY_TOP);
    skyGrad.addColorStop(1, SKY_BOTTOM);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(-diag, -diag, diag * 2, diag + horizonY);

    // Ground gradient
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, diag);
    groundGrad.addColorStop(0, GROUND_TOP);
    groundGrad.addColorStop(1, GROUND_BOTTOM);
    ctx.fillStyle = groundGrad;
    ctx.fillRect(-diag, horizonY, diag * 2, diag);

    // Coastline
    if (coastline !== 'none') {
      drawCoastline(ctx, coastline, horizonY, diag);
    }

    // Horizon line (thick white)
    ctx.strokeStyle = HORIZON_COLOR;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-diag, horizonY);
    ctx.lineTo(diag, horizonY);
    ctx.stroke();

    // Pitch ladder lines (thin white dashes at +/- 10, 20 degrees)
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    const pxPerDeg = radius / 90;
    for (const deg of [10, 20, -10, -20]) {
      const y = horizonY - deg * pxPerDeg;
      const halfLen = deg > 0 ? 20 : 15;
      ctx.beginPath();
      ctx.setLineDash([4, 3]);
      ctx.moveTo(-halfLen, y);
      ctx.lineTo(halfLen, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.restore(); // un-rotate, un-clip

    // ── Cockpit Frame (drawn on top, not rotated) ──

    // Outer ring shadow
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 3, 0, Math.PI * 2);
    ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fill();
    ctx.restore();

    // Metal frame ring
    const frameGrad = ctx.createRadialGradient(cx, cy, radius - 4, cx, cy, radius + 6);
    frameGrad.addColorStop(0, '#3a3a3a');
    frameGrad.addColorStop(0.3, '#555555');
    frameGrad.addColorStop(0.5, '#777777');
    frameGrad.addColorStop(0.7, '#555555');
    frameGrad.addColorStop(1, '#2a2a2a');
    ctx.strokeStyle = frameGrad;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Inner bevel highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 5, 0, Math.PI * 2);
    ctx.stroke();

    // Bank angle markers around the top of the frame
    drawBankMarkers(ctx, cx, cy, radius);

    // Fixed aircraft reference symbol (wings + dot)
    drawAircraftSymbol(ctx, cx, cy);

  }, [pitch, bank, coastline, width, height]);

  return (
    <div className={`inline-block ${className}`} style={{ width, height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function drawBankMarkers(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
) {
  const markerRadius = radius + 1;
  const angles = [0, 10, 20, 30, 45, 60, -10, -20, -30, -45, -60];
  const majorAngles = new Set([0, 30, 60, -30, -60]);

  ctx.save();
  for (const angle of angles) {
    const rad = ((angle - 90) * Math.PI) / 180;
    const isMajor = majorAngles.has(angle);
    const innerR = markerRadius - (isMajor ? 10 : 6);
    const outerR = markerRadius;

    const x1 = cx + Math.cos(rad) * innerR;
    const y1 = cy + Math.sin(rad) * innerR;
    const x2 = cx + Math.cos(rad) * outerR;
    const y2 = cy + Math.sin(rad) * outerR;

    ctx.strokeStyle = angle === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.5)';
    ctx.lineWidth = isMajor ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Triangle at top center (current bank indicator)
  const triSize = 6;
  const triY = cy - markerRadius + 12;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(cx, triY);
  ctx.lineTo(cx - triSize / 2, triY + triSize);
  ctx.lineTo(cx + triSize / 2, triY + triSize);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawAircraftSymbol(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
) {
  // Yellow/orange aircraft reference like real attitude indicators
  const color = '#FFB800';

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  // Left wing
  ctx.beginPath();
  ctx.moveTo(cx - 45, cy);
  ctx.lineTo(cx - 12, cy);
  ctx.stroke();

  // Left wing down-tick
  ctx.beginPath();
  ctx.moveTo(cx - 12, cy);
  ctx.lineTo(cx - 12, cy + 8);
  ctx.stroke();

  // Right wing
  ctx.beginPath();
  ctx.moveTo(cx + 12, cy);
  ctx.lineTo(cx + 45, cy);
  ctx.stroke();

  // Right wing down-tick
  ctx.beginPath();
  ctx.moveTo(cx + 12, cy);
  ctx.lineTo(cx + 12, cy + 8);
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCoastline(
  ctx: CanvasRenderingContext2D,
  coastline: CoastlinePosition,
  horizonY: number,
  diag: number,
) {
  ctx.save();
  ctx.fillStyle = WATER_COLOR;

  const coastDepth = diag * 0.4;

  ctx.beginPath();
  switch (coastline) {
    case 'left':
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
