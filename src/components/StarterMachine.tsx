'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StarterProject } from '@/data/portfolioData';
import { PokeBallSprite } from './PokeBallSprite';
import { sound } from '@/lib/soundEffects';

interface StarterMachineProps {
  projects: StarterProject[];
  hoveredProjectId: string | null;
  onHoverProject: (project: StarterProject | null) => void;
  onSelectProject: (project: StarterProject) => void;
}

export const StarterMachine: React.FC<StarterMachineProps> = ({
  projects,
  hoveredProjectId,
  onHoverProject,
  onSelectProject,
}) => {
  // Color mapping for elemental badges
  const getTypeBadgeColor = (type: StarterProject['typeBadge']) => {
    switch (type) {
      case 'Electric':
        return 'bg-amber-400 text-amber-950 border-amber-600';
      case 'Water':
        return 'bg-blue-500 text-white border-blue-700';
      case 'Fire':
        return 'bg-red-500 text-white border-red-700';
      case 'Grass':
        return 'bg-emerald-500 text-white border-emerald-700';
      case 'Psychic':
        return 'bg-purple-500 text-white border-purple-700';
      default:
        return 'bg-gray-500 text-white border-gray-700';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[760px] mx-auto select-none">
      
      {/* Machine Capsule Main Frame */}
      <div className="w-full h-[120px] bg-gradient-to-b from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] border-ink-4 shadow-retro-lg relative rounded-none flex items-center justify-around px-4 md:px-8">
        
        {/* Machine Top Accent Bar / Metallic Rim */}
        <div className="absolute top-0 left-0 right-0 h-3.5 bg-[#475569] border-b-2 border-[#1A202C] flex items-center justify-between px-4">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
          </div>
          <span className="text-[7.5px] font-pixel text-[#E2E8F0] tracking-widest uppercase">
            SILPH CO. STARTER DISPENSER // v4.2
          </span>
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
          </div>
        </div>

        {/* Machine Base Vent Slots */}
        <div className="absolute bottom-1 left-6 right-6 h-2 flex justify-between px-2 opacity-50">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3 h-1 bg-[#1A202C]" />
          ))}
        </div>

        {/* Pokéball Slots / Pedestals (5 starters) */}
        {projects.slice(0, 5).map((project, idx) => {
          const isHovered = hoveredProjectId === project.id;

          return (
            <div
              key={project.id}
              className="relative flex flex-col items-center justify-end h-full pt-4 pb-2 z-10 group"
              onMouseEnter={() => {
                sound.playHover();
                onHoverProject(project);
              }}
              onMouseLeave={() => {
                onHoverProject(null);
              }}
              onClick={() => {
                sound.playOpen();
                onSelectProject(project);
              }}
            >
              {/* Cyan Vertical Beam on Hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-7 w-14 h-48 -top-32 pointer-events-none z-0 flex flex-col items-center justify-end origin-bottom"
                >
                  <div className="w-full h-full bg-gradient-to-t from-[#06B6D4]/50 via-[#06B6D4]/25 to-transparent cyan-beam-active" />
                  <div className="w-0.5 h-full bg-cyan-200/90 absolute" />
                </motion.div>
              )}

              {/* Project Hover Tooltip Preview */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: -16, scale: 1 }}
                  transition={{ duration: 0.12 }}
                  className="absolute -top-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap"
                >
                  <div className="bg-white border-ink p-2 shadow-retro flex flex-col items-center gap-1 min-w-[150px]">
                    <span
                      className={`text-[8px] font-pixel px-1.5 py-0.5 border ${getTypeBadgeColor(
                        project.typeBadge
                      )}`}
                    >
                      {project.typeBadge.toUpperCase()} TYPE
                    </span>
                    <span className="font-pixel text-[10px] text-[#1A202C] font-bold">
                      {project.title}
                    </span>
                    <span className="text-[9px] font-dialogue text-[#4B5563]">
                      Click to Inspect Pokédex
                    </span>
                  </div>
                </motion.div>
              )}

              {/* 3D Pokéball on Pedestal */}
              <div className="cursor-pointer relative z-10">
                <PokeBallSprite
                  type={project.ballType}
                  size={54}
                  isHovered={isHovered}
                  interactive={true}
                />
              </div>

              {/* Metallic Pedestal (60px x 16px) */}
              <div className="w-[60px] h-[16px] relative flex flex-col items-center justify-center mt-1">
                {/* Pedestal Top Ring */}
                <div
                  className={`w-full h-3 bg-gradient-to-r from-[#64748B] via-[#E2E8F0] to-[#64748B] border-ink border-2 flex items-center justify-center transition-all ${
                    isHovered ? 'border-[#06B6D4] shadow-[0_0_8px_#06B6D4]' : ''
                  }`}
                >
                  {/* Glowing center indicator LED */}
                  <div
                    className={`w-2 h-1 rounded-full transition-colors duration-200 ${
                      isHovered ? 'bg-[#06B6D4] animate-ping' : 'bg-[#10B981]'
                    }`}
                  />
                </div>
                {/* Pedestal Base Collar */}
                <div className="w-10 h-1.5 bg-[#334155] border-x-2 border-b-2 border-[#1A202C]" />
              </div>

              {/* Pedestal Number Badge */}
              <div className="text-[8px] font-pixel text-[#475569] mt-0.5">
                NO.0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

