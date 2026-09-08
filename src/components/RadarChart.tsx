'use client';

import React from 'react';

interface RadarChartProps {
  stats?: {
    frontend: number;
    backend: number;
    devops: number;
    ux: number;
    etc: number;
  };
  size?: number;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  stats = {
    frontend: 95,
    backend: 90,
    devops: 82,
    ux: 88,
    etc: 92,
  },
  size = 140,
  className = '',
}) => {
  const center = size / 2;
  const radius = size * 0.36;

  // 5 axes angles (in radians, starting from top)
  const axes = [
    { label: 'Frontend', angle: -Math.PI / 2, val: stats.frontend / 100 },
    { label: 'Backend', angle: -Math.PI / 2 + (2 * Math.PI) / 5, val: stats.backend / 100 },
    { label: 'Backend', angle: -Math.PI / 2 + (4 * Math.PI) / 5, val: stats.devops / 100 },
    { label: 'UX', angle: -Math.PI / 2 + (6 * Math.PI) / 5, val: stats.ux / 100 },
    { label: 'ETC', angle: -Math.PI / 2 + (8 * Math.PI) / 5, val: stats.etc / 100 },
  ];

  // Concentric polygon levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getPolygonPoints = (scale: number) => {
    return axes
      .map((axis) => {
        const x = center + radius * scale * Math.cos(axis.angle);
        const y = center + radius * scale * Math.sin(axis.angle);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const statPolygonPoints = axes
    .map((axis) => {
      const x = center + radius * axis.val * Math.cos(axis.angle);
      const y = center + radius * axis.val * Math.sin(axis.angle);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid Rings */}
        {levels.map((lvl, idx) => (
          <polygon
            key={idx}
            points={getPolygonPoints(lvl)}
            fill={lvl === 1.0 ? '#F8FAFC' : 'transparent'}
            stroke="#94A3B8"
            strokeWidth={lvl === 1.0 ? '1.5' : '1'}
            strokeDasharray={lvl < 1.0 ? '2,2' : undefined}
          />
        ))}

        {/* Axis Lines radiating from center */}
        {axes.map((axis, idx) => {
          const x = center + radius * Math.cos(axis.angle);
          const y = center + radius * Math.sin(axis.angle);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Golden / Amber Stat Filled Polygon */}
        <polygon
          points={statPolygonPoints}
          fill="rgba(245, 158, 11, 0.45)"
          stroke="#D97706"
          strokeWidth="2"
        />

        {/* Stat Vertex Dots */}
        {axes.map((axis, idx) => {
          const x = center + radius * axis.val * Math.cos(axis.angle);
          const y = center + radius * axis.val * Math.sin(axis.angle);
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="2.5"
              fill="#B45309"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis Labels */}
        {/* Top: Frontend */}
        <text
          x={center}
          y={center - radius - 6}
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#334155"
        >
          Frontend
        </text>

        {/* Top Right: Backend */}
        <text
          x={center + radius + 14}
          y={center - 6}
          textAnchor="start"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#334155"
        >
          Backend
        </text>

        {/* Bottom Right: Backend/DevOps */}
        <text
          x={center + radius - 4}
          y={center + radius + 14}
          textAnchor="start"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#334155"
        >
          Backend
        </text>

        {/* Bottom Left: ETC/UTC */}
        <text
          x={center - radius - 10}
          y={center + radius + 14}
          textAnchor="end"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#334155"
        >
          ETC
        </text>

        {/* Top Left: UX */}
        <text
          x={center - radius - 10}
          y={center - 6}
          textAnchor="end"
          fontSize="8.5"
          fontFamily="monospace"
          fill="#334155"
        >
          UX
        </text>
      </svg>
    </div>
  );
};
