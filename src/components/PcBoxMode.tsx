'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StarterProject, PC_BOX_PROJECTS } from '@/data/portfolioData';
import { PokeBallSprite } from './PokeBallSprite';
import { sound } from '@/lib/soundEffects';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Monitor,
  Sparkles,
  LogOut,
  Palette,
  Layers,
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface PcBoxModeProps {
  onReturnToLab: () => void;
  onInspectProject: (project: StarterProject) => void;
  projects?: StarterProject[];
}

type WallpaperTheme = 'meadow' | 'magma' | 'ocean' | 'cyber';

export const PcBoxMode: React.FC<PcBoxModeProps> = ({
  onReturnToLab,
  onInspectProject,
  projects = PC_BOX_PROJECTS,
}) => {
  const allProjects = projects && projects.length > 0 ? projects : PC_BOX_PROJECTS;
  const boxes = [
    { id: 'box1', name: 'BOX 1: PRODUCTION', category: 'Production' },
    { id: 'box2', name: 'BOX 2: OPEN SOURCE', category: 'Open Source' },
    { id: 'box3', name: 'BOX 3: LAB EXPERIMENTS', category: 'Lab Experiments' },
  ];

  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<StarterProject>(allProjects[0]);
  const [wallpaper, setWallpaper] = useState<WallpaperTheme>('meadow');

  const currentBox = boxes[currentBoxIndex];
  const filteredProjects = allProjects.filter(
    (p) => p.boxCategory === currentBox.category || currentBoxIndex === 0
  );

  const handlePrevBox = () => {
    sound.playSelect();
    setCurrentBoxIndex((prev) => (prev > 0 ? prev - 1 : boxes.length - 1));
  };

  const handleNextBox = () => {
    sound.playSelect();
    setCurrentBoxIndex((prev) => (prev < boxes.length - 1 ? prev + 1 : 0));
  };

  const getWallpaperClass = () => {
    switch (wallpaper) {
      case 'magma':
        return 'bg-[#FEE2E2] border-red-300';
      case 'ocean':
        return 'bg-[#E0F2FE] border-blue-300';
      case 'cyber':
        return 'bg-[#0F172A] border-emerald-500 text-emerald-400';
      case 'meadow':
      default:
        return 'bg-[#DCFCE7] border-emerald-300';
    }
  };

  return (
    <div className="w-full max-w-[1440px] min-h-[calc(100vh-64px)] flex flex-col items-center justify-between p-4 md:p-8 select-none">
      
      {/* PC System Frame */}
      <div className="w-full bg-[#CBD5D0] border-ink-4 shadow-retro-lg flex flex-col p-4 md:p-6 gap-6">
        
        {/* Top PC Ribbon */}
        <div className="bg-[#1A202C] text-white p-3 border-ink flex flex-col sm:flex-row items-center justify-between gap-3 shadow-retro-sm">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[#34D399] animate-pulse" />
            <span className="font-pixel text-xs md:text-sm tracking-wider text-[#34D399]">
              PROF. ARYAN LABS // BILL&apos;S PC STORAGE ARCHIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Wallpaper Selector */}
            <div className="flex items-center gap-1 bg-[#2D3748] px-2 py-1 border border-gray-600">
              <Palette className="w-3.5 h-3.5 text-gray-300" />
              {(['meadow', 'magma', 'ocean', 'cyber'] as WallpaperTheme[]).map((wp) => (
                <button
                  key={wp}
                  onClick={() => {
                    sound.playSelect();
                    setWallpaper(wp);
                  }}
                  className={`w-4 h-4 border border-[#1A202C] ${
                    wp === 'meadow'
                      ? 'bg-emerald-400'
                      : wp === 'magma'
                      ? 'bg-red-400'
                      : wp === 'ocean'
                      ? 'bg-blue-400'
                      : 'bg-slate-900'
                  } ${wallpaper === wp ? 'ring-2 ring-white' : ''}`}
                />
              ))}
            </div>

            {/* Exit to Lab */}
            <button
              onClick={() => {
                sound.playSelect();
                onReturnToLab();
              }}
              className="bg-[#EF4444] text-white hover:bg-red-700 px-3 py-1 font-pixel text-[10px] flex items-center gap-1.5 btn-retro cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOG OFF [LAB]</span>
            </button>
          </div>
        </div>

        {/* Main Grid & Inspector Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Storage Box (7 Columns on Desktop) */}
          <div className="lg:col-span-7 flex flex-col bg-white border-ink shadow-retro p-4">
            
            {/* Box Header & Navigation */}
            <div className="flex items-center justify-between bg-[#1A202C] text-white p-2.5 border-ink mb-4 shadow-retro-sm">
              <button
                onClick={handlePrevBox}
                className="w-8 h-8 bg-white text-[#1A202C] border-ink flex items-center justify-center btn-retro cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center">
                <span className="font-pixel text-xs md:text-sm text-[#FBBF24]">
                  {currentBox.name}
                </span>
                <span className="text-[9px] font-pixel text-gray-400">
                  SLOTS: {filteredProjects.length} / 24 OCCUPIED
                </span>
              </div>

              <button
                onClick={handleNextBox}
                className="w-8 h-8 bg-white text-[#1A202C] border-ink flex items-center justify-center btn-retro cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* PC Box Storage Grid (6 Columns x 4 Rows = 24 Slots) */}
            <div
              className={`grid grid-cols-4 sm:grid-cols-6 gap-3 p-4 border-ink min-h-[320px] transition-colors duration-300 ${getWallpaperClass()}`}
            >
              {Array.from({ length: 24 }).map((_, slotIndex) => {
                const project = filteredProjects[slotIndex];
                const isSelected = project && selectedProject?.id === project.id;

                return (
                  <div
                    key={slotIndex}
                    onClick={() => {
                      if (project) {
                        sound.playSelect();
                        setSelectedProject(project);
                      }
                    }}
                    className={`aspect-square border-2 flex flex-col items-center justify-center p-1 relative transition-all cursor-pointer ${
                      project
                        ? isSelected
                          ? 'bg-white border-[#06B6D4] ring-2 ring-[#06B6D4] shadow-md scale-105 z-10'
                          : 'bg-white/80 border-[#1A202C] hover:bg-white hover:scale-102'
                        : 'border-dashed border-gray-400/60 bg-white/20'
                    }`}
                  >
                    {project ? (
                      <>
                        <PokeBallSprite
                          type={project.ballType}
                          size={36}
                          isHovered={isSelected}
                        />
                        <span className="font-pixel text-[7px] text-[#1A202C] truncate max-w-full mt-1">
                          {project.title.split(' ')[0]}
                        </span>
                      </>
                    ) : (
                      <span className="font-pixel text-[8px] text-gray-400/70">
                        {slotIndex + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Helper Footer */}
            <div className="mt-3 flex items-center justify-between text-[10px] font-pixel text-[#64748B]">
              <span>SELECT ITEM TO INSPECT DATA</span>
              <span>DOUBLE CLICK OR TAP INSPECT</span>
            </div>
          </div>

          {/* Right: Selected Project Inspector Pane (5 Columns on Desktop) */}
          <div className="lg:col-span-5 flex flex-col bg-white border-ink shadow-retro p-5 justify-between gap-4">
            
            {/* Header Identity */}
            <div className="flex items-start gap-4 pb-4 border-b-2 border-gray-200">
              <div className="p-3 bg-[#F1F5F9] border-ink flex items-center justify-center">
                <PokeBallSprite
                  type={selectedProject.ballType}
                  size={54}
                  isHovered={true}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[9px] bg-[#1A202C] text-white px-2 py-0.5 border border-[#1A202C]">
                    LV.{selectedProject.level}
                  </span>
                  <span className="font-pixel text-[9px] text-[#059669] font-bold">
                    {selectedProject.typeBadge.toUpperCase()} TYPE
                  </span>
                </div>
                <h3 className="font-pixel text-xs md:text-sm text-[#1A202C] mt-1.5">
                  {selectedProject.title}
                </h3>
                <span className="text-[10px] font-pixel text-gray-500">
                  {selectedProject.category}
                </span>
              </div>
            </div>

            {/* Project Cover Preview Thumbnail */}
            {selectedProject.coverImage && (
              <div className="relative w-full h-32 bg-black border border-gray-400 overflow-hidden">
                <Image
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                  unoptimized
                />
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
              </div>
            )}

            {/* Summary & Flavor Text */}
            <div className="bg-[#F8FAFC] border-ink p-3">
              <p className="font-dialogue text-lg text-[#1E293B] leading-5">
                {selectedProject.summary}
              </p>
            </div>

            {/* Mini Stats Grid */}
            <div className="flex flex-col gap-1.5">
              <span className="font-pixel text-[9px] text-[#475569]">
                SPECIFICATIONS:
              </span>
              <div className="grid grid-cols-2 gap-2 font-pixel text-[8px]">
                <div className="p-1.5 bg-emerald-50 border border-emerald-200">
                  HP: {selectedProject.stats.hp}% (Uptime)
                </div>
                <div className="p-1.5 bg-red-50 border border-red-200">
                  ATK: {selectedProject.stats.attack}% (Speed)
                </div>
                <div className="p-1.5 bg-blue-50 border border-blue-200">
                  DEF: {selectedProject.stats.defense}% (Security)
                </div>
                <div className="p-1.5 bg-amber-50 border border-amber-200">
                  SPD: {selectedProject.stats.speed}% (DX)
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <span className="font-pixel text-[9px] text-[#475569] block mb-1">
                TECH ARSENAL:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-pixel text-[8px] bg-[#E2E8F0] px-2 py-0.5 border border-gray-400 text-[#1E293B]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  sound.playOpen();
                  onInspectProject(selectedProject);
                }}
                className="flex-1 h-11 bg-[#06B6D4] hover:bg-cyan-600 text-white font-pixel text-[10px] border-ink shadow-retro-sm btn-retro flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>INSPECT POKÉDEX</span>
              </button>

              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="h-11 px-4 bg-[#10B981] hover:bg-emerald-700 text-white font-pixel text-[10px] border-ink shadow-retro-sm btn-retro flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>DEMO</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
