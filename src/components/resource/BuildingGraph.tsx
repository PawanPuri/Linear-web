import { useRef, useEffect, useCallback, useState } from "react";

const W = 800;
const H = 200;

const yellowPts: [number, number][] = [
  [0, 195], [80, 185], [180, 168], [260, 162], [320, 158],
  [380, 155], [440, 140], [520, 118], [600, 95], [680, 75],
  [760, 60], [800, 55],
];

const grayPts: [number, number][] = [
  [0, 195], [80, 175], [180, 148], [260, 132], [320, 120],
  [380, 110], [440, 100], [520, 88], [600, 70], [680, 50],
  [760, 35], [800, 28],
];

function catmull(pts: [number, number][]): string {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

function getYatX(pts: [number, number][], targetX: number): number {
  let i = 0;
  for (; i < pts.length - 1; i++) {
    if (pts[i + 1][0] >= targetX) break;
  }
  const p0 = pts[Math.max(0, i - 1)];
  const p1 = pts[i];
  const p2 = pts[Math.min(pts.length - 1, i + 1)];
  const p3 = pts[Math.min(pts.length - 1, i + 2)];

  const segLen = p2[0] - p1[0];
  if (segLen === 0) return p1[1];
  const t = Math.max(0, Math.min(1, (targetX - p1[0]) / segLen));

  const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
  const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

  const mt = 1 - t;
  return (
    mt * mt * mt * p1[1] +
    3 * mt * mt * t * cp1y +
    3 * mt * t * t * cp2y +
    t * t * t * p2[1]
  );
}

function buildFillPath(pts: [number, number][]): string {
  const line = catmull(pts);
  const last = pts[pts.length - 1];
  const first = pts[0];
  return `${line} L ${last[0]} ${H} L ${first[0]} ${H} Z`;
}


export function useGraphMouse() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
      setMouseY(e.clientY - rect.top);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
    setMouseY(null);
  }, []);

  return { mouseX, mouseY, handleMouseMove, handleMouseLeave };
}


const yPathFull = catmull(yellowPts);
const gPathFull = catmull(grayPts);
const fillDFull = buildFillPath(yellowPts);
const yLast = yellowPts[yellowPts.length - 1];
const gLast = grayPts[grayPts.length - 1];


interface BuildingGraphProps {
  mouseX: number | null;
  mouseY: number | null;
}

export default function BuildingGraph({ mouseX }: BuildingGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRectRef  = useRef<SVGRectElement>(null);
  const yDotRef      = useRef<SVGCircleElement>(null);
  const gDotRef      = useRef<SVGCircleElement>(null);

  const currentClip = useRef<number>(W);
  const targetClip  = useRef<number>(W);
  const animIdRef   = useRef<number | null>(null);

  const tick = useCallback(() => {
    currentClip.current += (targetClip.current - currentClip.current) * 0.1;
    const cw = currentClip.current;

    clipRectRef.current?.setAttribute("width", String(Math.max(0, cw)));

    if (yDotRef.current) {
      const dotX = Math.min(cw, yLast[0]);
      const dotY = dotX >= yLast[0] ? yLast[1] : getYatX(yellowPts, dotX);
      yDotRef.current.setAttribute("cx", String(dotX));
      yDotRef.current.setAttribute("cy", String(dotY));
    }

    if (gDotRef.current) {
      const dotX = Math.min(cw, gLast[0]);
      const dotY = dotX >= gLast[0] ? gLast[1] : getYatX(grayPts, dotX);
      gDotRef.current.setAttribute("cx", String(dotX));
      gDotRef.current.setAttribute("cy", String(dotY));
    }

    if (Math.abs(currentClip.current - targetClip.current) > 0.3) {
      animIdRef.current = requestAnimationFrame(tick);
    } else {
      currentClip.current = targetClip.current;
      animIdRef.current   = null;
    }
  }, []);

  useEffect(() => {
    const containerW = containerRef.current?.clientWidth ?? 1;

    if (mouseX === null) {
      targetClip.current = W;
    } else {
      const ratio = Math.max(0, Math.min(1, mouseX / containerW));
      targetClip.current = ratio * W;
    }

    if (!animIdRef.current) {
      animIdRef.current = requestAnimationFrame(tick);
    }
  }, [mouseX, tick]);

  return (
    <div ref={containerRef} className="building-graph">
      <svg
        className="building-graph-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="revealClip">
            <rect ref={clipRectRef} x="0" y="0" width={W} height={H} />
          </clipPath>
          <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#c9922a" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#c9922a" stopOpacity={0}    />
          </linearGradient>
        </defs>

        {/* Lines + fill clipped to cursor X */}
        <g clipPath="url(#revealClip)">
          <path d={fillDFull} fill="url(#fillGrad)" stroke="none" />
          <path
            d={yPathFull}
            fill="none"
            stroke="#f0c040"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={gPathFull}
            fill="none"
            stroke="#555"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Dots outside clip — sit exactly on line edge */}
        <circle ref={gDotRef} cx={gLast[0]} cy={gLast[1]} r={4}   fill="#888"    />
        <circle ref={yDotRef} cx={yLast[0]} cy={yLast[1]} r={5.5} fill="#f0c040" />
      </svg>
    </div>
  );
}