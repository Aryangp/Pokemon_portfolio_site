'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/soundEffects';

export interface BadgeItem {
  id: string;
  name: string;
  type: string;
  tech: string;
  color: string;
  iconBg: string;
  details: string;
}

export const GYM_BADGES_LIST: BadgeItem[] = [
  {
    id: 'badge-react',
    name: 'React 19 Core',
    type: 'Frontend',
    tech: 'React & RSC',
    color: '#06B6D4',
    iconBg: '#E0F2FE',
    details: 'Mastery of React Server Components, Suspense, and Actions',
  },
  {
    id: 'badge-next',
    name: 'Next.js App Router',
    type: 'FullStack',
    tech: 'Next.js 16',
    color: '#000000',
    iconBg: '#F1F5F9',
    details: 'Turbopack edge streaming, SEO optimization, dynamic routing',
  },
  {
    id: 'badge-ts',
    name: 'TypeScript Strict',
    type: 'TypeSafety',
    tech: 'TypeScript 5',
    color: '#3B82F6',
    iconBg: '#DBEAFE',
    details: 'Zero-any strict type inference, generics, discriminated unions',
  },
  {
    id: 'badge-tailwind',
    name: 'Tailwind Design System',
    type: 'Styling',
    tech: 'Tailwind v4',
    color: '#10B981',
    iconBg: '#D1FAE5',
    details: 'Responsive design tokens, micro-interactions, dark modes',
  },
  {
    id: 'badge-node',
    name: 'Node / WebSockets',
    type: 'Backend',
    tech: 'Node.js Engine',
    color: '#22C55E',
    iconBg: '#DCFCE7',
    details: 'High-concurrency async event loop, streaming pub/sub pipelines',
  },
  {
    id: 'badge-db',
    name: 'Postgres & Redis',
    type: 'Database',
    tech: 'PostgreSQL',
    color: '#8B5CF6',
    iconBg: '#EDE9FE',
    details: 'ACID transactions, B-Tree index optimization, caching',
  },
  {
    id: 'badge-ai',
    name: 'Agentic AI Systems',
    type: 'Intelligence',
    tech: 'LLM Orchestration',
    color: '#F59E0B',
    iconBg: '#FEF3C7',
    details: 'Sub-50ms token routing, semantic cache, autonomous agents',
  },
  {
    id: 'badge-sys',
    name: 'Distributed Systems',
    type: 'Architecture',
    tech: 'Edge Architecture',
    color: '#EF4444',
    iconBg: '#FEE2E2',
    details: 'High-availability fault tolerance, CRDTs, edge clusters',
  },
];

interface GymBadgesRowProps {
  onBadgeClick?: (badge: BadgeItem) => void;
  className?: string;
  columns?: number;
}

export const GymBadgesRow: React.FC<GymBadgesRowProps> = ({
  onBadgeClick,
  className = '',
  columns = 4,
}) => {
  const [hoveredBadge, setHoveredBadge] = useState<BadgeItem | null>(null);

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Badges Grid */}
      <div
        className={`grid gap-2.5`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {GYM_BADGES_LIST.map((badge, idx) => {
          const isHovered = hoveredBadge?.id === badge.id;

          return (
            <div
              key={badge.id}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredBadge(badge);
              }}
              onMouseLeave={() => setHoveredBadge(null)}
              onClick={() => {
                sound.playSelect();
                if (onBadgeClick) onBadgeClick(badge);
              }}
              className="relative aspect-square bg-[#F8FAFC] border-gba-sm flex flex-col items-center justify-center p-1 cursor-pointer transition-all hover:scale-108 hover:border-[#10B981] group"
            >
              {/* Badge Visual Icon */}
              <div
                className="w-7 h-7 md:w-8 md:h-8 rounded-md flex items-center justify-center border border-[#1A202C] shadow-sm transition-transform group-hover:rotate-6"
                style={{ backgroundColor: badge.color }}
              >
                <span className="font-pixel text-[8px] text-white font-bold drop-shadow-sm">
                  {badge.tech.substring(0, 2).toUpperCase()}
                </span>
              </div>

              {/* Sub-label */}
              <span className="font-pixel text-[6.5px] text-[#475569] mt-1 truncate max-w-full">
                {badge.tech.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Retro Hover Tooltip Window (as seen in Screenshot 2: "Details / Name: Reest / Job: React") */}
      {hoveredBadge && (
        <div className="absolute -bottom-24 right-0 z-30 bg-white border-gba-sm p-2.5 shadow-gba min-w-[170px] pointer-events-none">
          <div className="text-[9px] font-pixel text-[#1A202C] font-bold border-b border-gray-300 pb-1 mb-1">
            Details:
          </div>
          <div className="text-[8px] font-pixel text-[#10B981]">
            Name: {hoveredBadge.name}
          </div>
          <div className="text-[7.5px] font-pixel text-[#475569] mt-0.5">
            Role: {hoveredBadge.type} Mastery
          </div>
          <div className="text-[7px] font-pixel text-[#1A202C] mt-1 bg-gray-100 p-1 border border-gray-300">
            {hoveredBadge.details}
          </div>
        </div>
      )}
    </div>
  );
};
