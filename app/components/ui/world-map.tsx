"use client";

import { useMemo, useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";
import Image from "next/image";
import clsx from "clsx";

type LatLng = { lat: number; lng: number; label?: string };

export interface MapConnection {
  start: LatLng;
  end: LatLng;
}

interface MapProps {
  dots?: MapConnection[];
  lineColor?: string;
  className?: string;
  showLabels?: boolean;
  glow?: boolean;
  bordered?: boolean;
}

export function WorldMap({
  dots = [],
  lineColor = "#14b8a6",
  className,
  showLabels = true,
  glow = true,
  bordered = true,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  const { svgMap, width, height } = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const dotColor = theme === "dark" ? "#FFFFFF40" : "#00000033";
    const bgColor = "transparent";
    const svg = map.getSVG({ radius: 0.22, color: dotColor, shape: "circle", backgroundColor: bgColor });
    return { svgMap: svg, width: 800, height: 400 };
  }, [theme]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const midX = (start.x + end.x) / 2;
    const lift = Math.max(30, Math.min(90, Math.hypot(end.x - start.x, end.y - start.y) / 6));
    const midY = Math.min(start.y, end.y) - lift;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className={clsx("relative w-full aspect-[2/1] rounded-2xl overflow-hidden", bordered && "shadow-lg border border-gray-200/60 dark:border-white/10", className)}>
      
      {/* Subtle continents overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 800 400" className="w-full h-full opacity-10">
          <rect width="800" height="400" fill={theme === "dark" ? "#FFFFFF10" : "#00000010"} rx={20} />
          {/* Optionally, add simple continent shapes here if you want more detail */}
        </svg>
      </div>

      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        height={height}
        width={width}
        draggable={false}
        priority
      />

      <svg ref={svgRef} viewBox="0 0 800 400" className="absolute inset-0 h-full w-full pointer-events-none select-none">
        <defs>
          <linearGradient id="wm-path" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="6%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="94%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {glow && (
            <filter id="wm-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}
        </defs>

        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`route-${i}`}>
              <motion.path
                d={createCurvedPath(start, end)}
                fill="none"
                stroke="url(#wm-path)"
                strokeWidth="1.6"
                filter={glow ? "url(#wm-glow)" : undefined}
                initial={{ pathLength: 0, opacity: 0.6 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.45 * i, ease: "easeInOut" }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-${i}`}>
              <g>
                <circle cx={s.x} cy={s.y} r="2.5" fill={lineColor} />
                <circle cx={s.x} cy={s.y} r="2.5" fill={lineColor} opacity="0.5">
                  <animate attributeName="r" from="2.5" to="9" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                {showLabels && dot.start.label && (
                  <motion.text x={s.x + 6} y={s.y - 6} fontSize="10" fill="white" style={{ textShadow: "0 0 2px rgba(0,0,0,0.6)" }}>
                    {dot.start.label}
                  </motion.text>
                )}
              </g>

              <g>
                <circle cx={e.x} cy={e.y} r="2.5" fill={lineColor} />
                <circle cx={e.x} cy={e.y} r="2.5" fill={lineColor} opacity="0.5">
                  <animate attributeName="r" from="2.5" to="9" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                {showLabels && dot.end.label && (
                  <motion.text x={e.x + 6} y={e.y - 6} fontSize="10" fill="white" style={{ textShadow: "0 0 2px rgba(0,0,0,0.6)" }}>
                    {dot.end.label}
                  </motion.text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default WorldMap;
