'use client';

import React from 'react';
import { DEFAULT_RESUME_DATA, DeveloperProfile } from '@/data/resumeData';
import { OakAvatar } from './OakAvatar';
import { RadarChart } from './RadarChart';
import { GymBadgesRow } from './GymBadgesRow';
import { sound } from '@/lib/soundEffects';
import { Award, Zap, Heart, Brain, Sparkles } from 'lucide-react';

interface TrainerCardViewProps {
  profile?: DeveloperProfile;
}

export const TrainerCardView: React.FC<TrainerCardViewProps> = ({
  profile = DEFAULT_RESUME_DATA.profile,
}) => {
  const currentProfile = profile || DEFAULT_RESUME_DATA.profile;

  return (
    <div className="w-full max-w-[1000px] min-h-[640px] blueprint-grid border-gba shadow-gba-lg p-4 md:p-8 flex flex-col justify-center select-none mx-auto">
      
      {/* Official Pokémon Trainer ID Card (Screenshot 3 Match) */}
      <div className="bg-[#F8FAFC] border-gba-sm p-6 md:p-8 shadow-gba flex flex-col gap-6">
        
        {/* Top Section: Trainer Identity & Radar Chart */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b-2 border-gray-300 pb-6">
          
          {/* Trainer Photo & Metadata (7 cols) */}
          <div className="md:col-span-7 flex items-start gap-5">
            <OakAvatar size={96} className="shadow-gba shrink-0" />

            <div className="flex flex-col gap-1.5">
              <span className="font-pixel text-[13px] text-[#1A202C] font-bold">
                Trainer ID: #00151
              </span>
              <div className="font-pixel text-[11px] text-[#10B981]">
                Name: {currentProfile.name}
              </div>
              <div className="font-pixel text-[9.5px] text-[#475569]">
                Level/Role: SDE 1 Backend Engineer
              </div>
              <div className="font-pixel text-[8.5px] text-[#64748B]">
                Class: {currentProfile.trainerClass}
              </div>
              <div className="font-pixel text-[8px] text-[#059669]">
                ★ UIET Panjab Univ (CGPA 9.00)
              </div>
            </div>
          </div>

          {/* 5-Axis Spider Polygon Radar Chart (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <span className="font-pixel text-[9px] text-[#1A202C] font-bold self-center mb-1">
              ENGINEERING STATS
            </span>
            <RadarChart size={135} />
          </div>

        </div>

        {/* Middle Section: Gym Badges Ribbon */}
        <div className="flex flex-col gap-2.5 border-b-2 border-gray-300 pb-6">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-xs text-[#1A202C] font-bold">
              Gym Badges (8/8 Complete)
            </span>
            <span className="font-pixel text-[8.5px] text-[#10B981]">
              ★ REGIONAL CHAMPION RANK
            </span>
          </div>

          <GymBadgesRow columns={8} />
        </div>

        {/* Bottom Section: 3 Core Traits / Soft Skills (Screenshot 3 Match) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Adaptability */}
          <div className="bg-white border-2 border-black p-3.5 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[#3B82F6]">
              <Zap className="w-4 h-4" />
              <span className="font-pixel text-[10px] text-[#1A202C] font-bold">
                Adaptability
              </span>
            </div>
            <p className="font-dialogue text-base text-[#334155] leading-snug">
              Rapidly masters new stacks, edge frameworks, and high-velocity codebases with zero friction.
            </p>
          </div>

          {/* Card 2: Problem-Solving */}
          <div className="bg-white border-2 border-black p-3.5 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[#EF4444]">
              <Brain className="w-4 h-4" />
              <span className="font-pixel text-[10px] text-[#1A202C] font-bold">
                Problem-Solving
              </span>
            </div>
            <p className="font-dialogue text-base text-[#334155] leading-snug">
              Deep-dives into root causes, optimizes latency bottlenecks, and constructs resilient systems.
            </p>
          </div>

          {/* Card 3: Team Empathy */}
          <div className="bg-white border-2 border-black p-3.5 shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <Heart className="w-4 h-4" />
              <span className="font-pixel text-[10px] text-[#1A202C] font-bold">
                Team Empathy
              </span>
            </div>
            <p className="font-dialogue text-base text-[#334155] leading-snug">
              Committed to clear documentation, high PR standards, code reviews, and developer mentorship.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
