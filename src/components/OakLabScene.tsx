'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { StarterProject, STARTER_PROJECTS, DEVELOPER_PROFILE } from '@/data/portfolioData';
import { PokeBallSprite } from './PokeBallSprite';
import { sound } from '@/lib/soundEffects';
import { FileText, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OakLabSceneProps {
  onSelectStarter: (project: StarterProject) => void;
  onDownloadResume: () => void;
}

export const OakLabScene: React.FC<OakLabSceneProps> = ({
  onSelectStarter,
  onDownloadResume,
}) => {
  const [hoveredBallIndex, setHoveredBallIndex] = useState<number | null>(null);
  const [dialogueText, setDialogueText] = useState(
    `HELLO THERE! I AM ${DEVELOPER_PROFILE.name}.\nLet's start your journey.`
  );

  const starters = STARTER_PROJECTS.slice(0, 3); // 3 classic starters on the main table

  const handleHoverStarter = (project: StarterProject | null, idx: number | null) => {
    setHoveredBallIndex(idx);
    if (project) {
      sound.playHover();
      setDialogueText(
        `STARTER: ${project.title.toUpperCase()}!\nType: [${project.typeBadge}]. ${project.summary.substring(0, 75)}...`
      );
    } else {
      setDialogueText(
        `HELLO THERE! I AM ${DEVELOPER_PROFILE.name}.\nLet's start your journey.`
      );
    }
  };

  const handleDownload = () => {
    sound.playFanfare();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10B981', '#06B6D4', '#EF4444', '#FBBF24'],
    });
    onDownloadResume();
  };

  return (
    <div className="w-full max-w-[1100px] h-[640px] md:h-[680px] bg-[#EDE8D0] border-gba shadow-gba-lg relative flex flex-col justify-between overflow-hidden select-none mx-auto">
      
      {/* 1. TOP LAB WALL & EQUIPMENT SECTION (Teal/Sage Wall with Lab Furniture) */}
      <div className="w-full h-[220px] md:h-[250px] lab-wall border-b-[4px] border-[#1A202C] relative flex items-end justify-between px-6 md:px-12 pb-2">
        
        {/* Left: Scientific Research Counter & Microwave/Analyzer Machine with Pokéball */}
        <div className="flex flex-col items-center">
          <div className="w-32 md:w-44 h-24 bg-[#94A3B8] border-gba-sm relative flex flex-col justify-between p-2 shadow-md">
            {/* Machine Dials & Scanner Screen */}
            <div className="flex items-center justify-between">
              <div className="w-16 h-11 bg-[#064E3B] border-2 border-black p-1">
                <div className="w-full h-1 bg-[#10B981] animate-pulse" />
                <div className="w-9 h-1 bg-[#34D399] mt-1" />
                <div className="w-6 h-1 bg-[#6EE7B7] mt-1" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-black" />
                <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border border-black" />
              </div>
            </div>
            {/* Counter Surface with research Pokéball */}
            <div className="flex items-center justify-center gap-2 pt-1 border-t-2 border-[#64748B]">
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-black flex items-center justify-center relative overflow-hidden shadow-xs">
                <div className="absolute top-0 w-full h-1/2 bg-red-600" />
                <div className="absolute bottom-0 w-full h-1/2 bg-white" />
                <div className="w-1.5 h-1.5 rounded-full bg-white border border-black z-10" />
              </div>
              <span className="font-pixel text-[8px] text-white tracking-wider">LAB_01</span>
            </div>
          </div>
          {/* Machine Table Legs */}
          <div className="w-36 md:w-48 h-8 bg-[#64748B] border-x-4 border-b-4 border-[#1A202C]" />
        </div>

        {/* Center: Wooden Computer Desk with Professor Oak Behind It */}
        <div className="relative flex flex-col items-center">
          
          {/* Real High-Resolution / Sugimori Professor Oak Character Behind Desk */}
          <div className="relative z-0 -mb-6 cursor-pointer group" onClick={() => sound.playSelect()}>
            <div className="w-28 h-36 md:w-32 md:h-40 relative drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/professor_oak_bust.png"
                alt="Professor Aryan"
                fill
                className="object-contain object-bottom transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Wooden Computer Desk */}
          <div className="w-56 md:w-64 h-20 bg-[#A27B5C] border-gba-sm relative z-10 flex items-center justify-between px-3 shadow-md">
            
            {/* CRT Computer Monitor with Glowing Green Code */}
            <div className="w-20 h-16 bg-[#D1D5DB] border-2 border-black flex flex-col items-center justify-center p-1 -mt-6 shadow-sm">
              <div className="w-full h-full bg-[#064E3B] border border-black flex flex-col justify-around p-1">
                <div className="w-full h-1 bg-[#10B981] animate-pulse" />
                <div className="w-10 h-1 bg-[#34D399]" />
                <div className="w-12 h-1 bg-[#6EE7B7]" />
                <div className="w-7 h-1 bg-[#A7F3D0]" />
              </div>
            </div>

            {/* Keyboard, Mouse, and Research Coffee Mug */}
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-20 h-4 bg-[#E5E7EB] border border-black flex justify-around items-center px-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-400" />
                  ))}
                </div>
                <div className="w-3.5 h-2.5 bg-gray-300 border border-black rounded-xs" />
              </div>
              <div className="text-[7px] font-pixel text-[#FEF3C7] tracking-widest uppercase">
                PROF. ARYAN PC
              </div>
            </div>

          </div>
          {/* Desk Base Legs */}
          <div className="w-52 md:w-60 h-7 bg-[#6F4E37] border-x-4 border-b-4 border-[#1A202C]" />
        </div>

        {/* Right: Lab Bookshelf & Documentation */}
        <div className="flex flex-col items-center">
          <div className="w-32 md:w-40 h-28 bg-[#854D0E] border-gba-sm p-2 flex flex-col justify-around shadow-md">
            {/* Shelf 1 */}
            <div className="flex gap-1.5 items-end h-7 border-b-2 border-amber-950 pb-0.5">
              <div className="w-3.5 h-6 bg-red-600 border border-black" />
              <div className="w-4 h-5.5 bg-blue-600 border border-black" />
              <div className="w-4.5 h-7 bg-emerald-600 border border-black" />
              <div className="w-3.5 h-5 bg-amber-500 border border-black" />
            </div>
            {/* Shelf 2 */}
            <div className="flex gap-1.5 items-end h-7 border-b-2 border-amber-950 pb-0.5">
              <div className="w-4.5 h-6.5 bg-purple-600 border border-black" />
              <div className="w-3.5 h-6 bg-yellow-500 border border-black" />
              <div className="w-4 h-7 bg-cyan-600 border border-black" />
            </div>
            {/* Shelf 3 */}
            <div className="flex gap-1.5 items-end h-7">
              <div className="w-4 h-5.5 bg-gray-200 border border-black" />
              <div className="w-4.5 h-6.5 bg-red-700 border border-black" />
              <div className="w-3.5 h-6 bg-green-700 border border-black" />
            </div>
          </div>
          <div className="w-36 md:w-44 h-5 bg-[#543407] border-x-4 border-b-4 border-[#1A202C]" />
        </div>

      </div>

      {/* 2. PARQUET WOODEN FLOOR & STARTERS STAGE */}
      <div className="w-full flex-1 parquet-floor relative flex flex-col items-center justify-center p-6">
        
        {/* TOP RIGHT: CLASSIC POKÉMON DIALOGUE BOX (Screenshot 1 Match) */}
        <div className="absolute top-4 right-4 md:right-8 z-20 flex flex-col items-end gap-3 max-w-[360px] md:max-w-[420px]">
          
          {/* Black Dialogue Window */}
          <div className="w-full bg-[#1A202C] text-white p-4 border-dialogue-black shadow-gba relative">
            <p className="font-pixel text-[10.5px] md:text-xs leading-relaxed text-gray-100 whitespace-pre-line tracking-wide">
              {dialogueText}
            </p>
            {/* Dialogue indicator marker */}
            <span className="absolute bottom-2 right-3 text-[#EF4444] font-pixel text-xs animate-bounce">
              ▼
            </span>
          </div>

          {/* Glowing Green Button: DOWNLOAD TRAINER ID (RESUME PDF) */}
          <button
            onClick={handleDownload}
            className="btn-emerald-glow px-4 py-2.5 text-center flex flex-col items-center justify-center cursor-pointer font-pixel text-[10px] md:text-[11px] text-[#064E3B] font-bold tracking-wider active:translate-y-1 transition-all"
          >
            <div className="flex items-center gap-1.5 drop-shadow">
              <FileText className="w-3.5 h-3.5 text-[#064E3B]" />
              <span>DOWNLOAD TRAINER ID</span>
            </div>
            <span className="text-[8px] text-[#047857] font-pixel tracking-normal mt-0.5">
              (RESUME PDF)
            </span>
          </button>
        </div>

        {/* CENTER-FOREGROUND: WOODEN STARTER TABLE (Exact Match to Screenshot 1) */}
        <div className="relative z-10 flex flex-col items-center mt-12 md:mt-16">
          
          {/* Table Top Surface with Starter Pokéballs */}
          <div className="w-[320px] md:w-[400px] h-[78px] bg-[#C19A6B] border-gba-sm shadow-gba flex items-center justify-around px-4 relative">
            
            {starters.map((project, idx) => {
              const isHovered = hoveredBallIndex === idx;

              return (
                <div
                  key={project.id}
                  className="relative flex flex-col items-center cursor-pointer group"
                  onMouseEnter={() => handleHoverStarter(project, idx)}
                  onMouseLeave={() => handleHoverStarter(null, null)}
                  onClick={() => {
                    sound.playOpen();
                    onSelectStarter(project);
                  }}
                >
                  {/* Vertical Cyan Beam on hover */}
                  {isHovered && (
                    <div className="absolute -top-32 w-12 h-36 bg-gradient-to-t from-cyan-400/80 via-cyan-400/40 to-transparent pointer-events-none cyan-beam-active flex justify-center">
                      <div className="w-0.5 h-full bg-white" />
                    </div>
                  )}

                  {/* Pokéball Node */}
                  <motion.div
                    animate={{
                      y: isHovered ? -10 : 0,
                      scale: isHovered ? 1.15 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                  >
                    <PokeBallSprite
                      type={project.ballType}
                      size={54}
                      isHovered={isHovered}
                    />
                  </motion.div>

                  {/* Starter Name Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-10 bg-white border-2 border-black px-2 py-0.5 text-[8px] font-pixel text-black whitespace-nowrap shadow-sm z-30">
                      {project.title.split(' ')[0]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Table Legs */}
          <div className="w-[290px] md:w-[370px] h-7 bg-[#8B5A2B] border-x-4 border-b-4 border-[#1A202C] flex justify-between px-6">
            <div className="w-4 h-full bg-[#543407]" />
            <div className="w-4 h-full bg-[#543407]" />
          </div>

          {/* Floor Shadow Under Table */}
          <div className="w-[280px] md:w-[360px] h-3 bg-[#1A202C]/40 rounded-full blur-[2px] mt-0.5" />

          {/* Dark Pill Bar: "Starters: Click to Inspect" (Exact Match to Screenshot 1) */}
          <div className="mt-2 bg-[#2D3748] text-white border-2 border-black px-4 py-1 rounded-full shadow-md font-pixel text-[9px] tracking-wide">
            Starters: Click to Inspect
          </div>

        </div>

      </div>

    </div>
  );
};

