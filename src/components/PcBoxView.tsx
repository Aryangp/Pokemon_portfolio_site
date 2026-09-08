'use client';

import React, { useState } from 'react';
import { STARTER_PROJECTS, PC_BOX_PROJECTS, StarterProject } from '@/data/portfolioData';
import { RadarChart } from './RadarChart';
import { GymBadgesRow } from './GymBadgesRow';
import { OakAvatar } from './OakAvatar';
import { PokeBallSprite } from './PokeBallSprite';
import { sound } from '@/lib/soundEffects';
import { Search, ExternalLink, Sparkles, Zap, Shield, Flame, Droplets } from 'lucide-react';

interface PcBoxViewProps {
  onInspectProject: (project: StarterProject) => void;
}

export const PcBoxView: React.FC<PcBoxViewProps> = ({ onInspectProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeSlot, setActiveSlot] = useState<number>(0);

  const filterTypes = ['All', 'Electric', 'Fire', 'Water', 'Grass', 'Psychic'];

  const filteredProjects = PC_BOX_PROJECTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || p.typeBadge === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypePillColor = (type: string) => {
    switch (type) {
      case 'Electric':
        return 'bg-amber-400 text-amber-950 border-amber-600';
      case 'Fire':
        return 'bg-red-500 text-white border-red-700';
      case 'Water':
        return 'bg-blue-500 text-white border-blue-700';
      case 'Grass':
        return 'bg-emerald-500 text-white border-emerald-700';
      case 'Psychic':
        return 'bg-purple-500 text-white border-purple-700';
      default:
        return 'bg-gray-200 text-gray-800 border-gray-400';
    }
  };

  return (
    <div className="w-full max-w-[1100px] min-h-[640px] blueprint-grid border-gba shadow-gba-lg p-4 md:p-6 flex flex-col gap-4 select-none mx-auto">
      
      {/* 1. TOP FILTER & SEARCH BAR (Exact Match to Screenshot 2) */}
      <div className="bg-[#CBD5E1] border-gba-sm p-3 shadow-gba flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter/Search"
            className="w-full bg-transparent font-pixel text-[10px] outline-none text-[#1A202C]"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-pixel text-[9px] text-[#1A202C] font-bold mr-1">
            Type:
          </span>
          {filterTypes.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => {
                  sound.playSelect();
                  setSelectedType(type);
                }}
                className={`px-2.5 py-1 text-[8.5px] font-pixel border-2 transition-all cursor-pointer ${
                  isSelected
                    ? `${getTypePillColor(type)} ring-2 ring-black font-bold scale-105`
                    : 'bg-white text-gray-700 border-gray-400 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN SPLIT: PROJECTS GRID (LEFT) vs USER STATS CARD (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
        
        {/* LEFT COLUMN: PROJECT CARDS WITH BATTLE STATS (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredProjects.slice(0, 4).map((project, idx) => {
              const isSelected = activeSlot === idx;

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    sound.playSelect();
                    setActiveSlot(idx);
                  }}
                  className={`bg-[#E2E8F0] border-gba-sm p-3 relative cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected ? 'ring-2 ring-amber-400 shadow-gba bg-[#F1F5F9]' : 'hover:bg-white'
                  }`}
                >
                  {/* Slot Number Badge */}
                  <div className="absolute top-2 left-2 w-5 h-5 bg-[#1A202C] text-white font-pixel text-[8px] flex items-center justify-center border border-black z-10">
                    {idx + 1}
                  </div>

                  {/* Card Visual / Starter Machine Stage thumbnail */}
                  <div className="h-28 bg-[#CBD5E1] border border-black relative flex items-center justify-around overflow-hidden mb-2">
                    {/* Beam effect if selected */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/40 via-cyan-400/20 to-transparent cyan-beam-active flex justify-center">
                        <div className="w-0.5 h-full bg-cyan-200" />
                      </div>
                    )}
                    <PokeBallSprite
                      type={project.ballType}
                      size={44}
                      isHovered={isSelected}
                    />
                  </div>

                  {/* Stats Overlay / Tech Box (Matches Screenshot 2) */}
                  <div className="bg-[#1A202C] text-white p-2 border border-black flex flex-col gap-1">
                    <div className="flex items-center justify-between border-b border-gray-700 pb-0.5">
                      <span className="font-pixel text-[8px] text-[#34D399]">
                        {project.title.substring(0, 15)}
                      </span>
                      <span className="text-[7.5px] font-pixel text-amber-400">
                        LV.{project.level}
                      </span>
                    </div>

                    <div className="font-pixel text-[7px] text-gray-300 truncate">
                      STACK: {project.techStack.slice(0, 2).join(', ')}
                    </div>

                    {/* Classic Pokemon Battle Menu [FIGHT / BAG / PKMN / RUN] */}
                    <div className="grid grid-cols-2 gap-1 pt-1 mt-1 border-t border-gray-700">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playOpen();
                          onInspectProject(project);
                        }}
                        className="bg-[#EF4444] hover:bg-red-600 text-white font-pixel text-[7px] py-0.5 px-1 text-center border border-black"
                      >
                        FIGHT [VIEW]
                      </button>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playSelect();
                        }}
                        className="bg-[#3B82F6] hover:bg-blue-600 text-white font-pixel text-[7px] py-0.5 px-1 text-center border border-black"
                      >
                        BAG [DEMO]
                      </a>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playSelect();
                        }}
                        className="bg-[#10B981] hover:bg-emerald-600 text-white font-pixel text-[7px] py-0.5 px-1 text-center border border-black"
                      >
                        PKMN [CODE]
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playSelect();
                          setActiveSlot(0);
                        }}
                        className="bg-[#64748B] hover:bg-gray-600 text-white font-pixel text-[7px] py-0.5 px-1 text-center border border-black"
                      >
                        RUN [RESET]
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: USER STATS & GYM BADGES CARD (Exact Match to Screenshot 2) (5 cols) */}
        <div className="lg:col-span-5 bg-[#F1F5F9] border-gba p-4 shadow-gba flex flex-col justify-between gap-4">
          
          {/* Top Row: User Avatar & 5-Axis Spider Radar Chart */}
          <div className="grid grid-cols-2 gap-2 items-center border-b-2 border-gray-300 pb-3">
            
            {/* User Avatar Box */}
            <div className="flex flex-col items-center">
              <span className="font-pixel text-[9px] text-[#1A202C] font-bold mb-1.5 self-start">
                User
              </span>
              <OakAvatar size={80} />
            </div>

            {/* Radar Chart Box */}
            <div className="flex flex-col items-center">
              <span className="font-pixel text-[9px] text-[#1A202C] font-bold mb-1 self-start">
                Stats
              </span>
              <RadarChart size={110} />
            </div>

          </div>

          {/* Bottom Section: Gym Badges Showcase (Screenshot 2 Match) */}
          <div className="flex flex-col gap-2">
            <span className="font-pixel text-[9.5px] text-[#1A202C] font-bold">
              Gym Badges
            </span>

            {/* Badges Grid (4 columns) */}
            <GymBadgesRow columns={4} />
          </div>

        </div>

      </div>

    </div>
  );
};
