'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Activity, ShieldCheck, Zap, Layers } from 'lucide-react';
import { StarterProject } from '@/data/portfolioData';
import { PokeBallSprite } from './PokeBallSprite';
import { sound } from '@/lib/soundEffects';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: StarterProject | null;
  onClose: () => void;
  isMobile?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  isMobile = false,
}) => {
  if (!project) return null;

  const getTypeStyle = (type: StarterProject['typeBadge']) => {
    switch (type) {
      case 'Electric':
        return {
          bg: 'bg-amber-400',
          text: 'text-amber-950',
          border: 'border-amber-600',
          accent: '#F59E0B',
        };
      case 'Water':
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          border: 'border-blue-700',
          accent: '#3B82F6',
        };
      case 'Fire':
        return {
          bg: 'bg-red-500',
          text: 'text-white',
          border: 'border-red-700',
          accent: '#EF4444',
        };
      case 'Grass':
        return {
          bg: 'bg-emerald-500',
          text: 'text-white',
          border: 'border-emerald-700',
          accent: '#10B981',
        };
      case 'Psychic':
        return {
          bg: 'bg-purple-500',
          text: 'text-white',
          border: 'border-purple-700',
          accent: '#8B5CF6',
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          border: 'border-gray-700',
          accent: '#6B7280',
        };
    }
  };

  const typeStyle = getTypeStyle(project.typeBadge);

  const statItems = [
    { label: 'RELIABILITY / HP', value: project.stats.hp, icon: ShieldCheck, color: 'bg-emerald-500' },
    { label: 'PERFORMANCE / ATK', value: project.stats.attack, icon: Zap, color: 'bg-red-500' },
    { label: 'SECURITY / DEF', value: project.stats.defense, icon: Activity, color: 'bg-blue-500' },
    { label: 'DX / SPEED', value: project.stats.speed, icon: Sparkles, color: 'bg-amber-500' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-[2px] select-none">
        
        {/* Backdrop click to dismiss */}
        <div className="absolute inset-0" onClick={() => { sound.playSelect(); onClose(); }} />

        {/* Modal Window Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: isMobile ? 40 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: isMobile ? 40 : 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className={`relative z-10 w-full max-w-2xl bg-[#E6EDE8] border-ink-4 shadow-retro-lg flex flex-col max-h-[90vh] overflow-y-auto ${
            isMobile ? 'rounded-t-2xl md:rounded-none' : ''
          }`}
        >
          {/* Header Red / Pokédex Ribbon */}
          <div className="bg-[#EF4444] border-b-ink px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-cyan-300 border-2 border-white shadow-[0_0_8px_#67E8F9] animate-pulse" />
              <span className="font-pixel text-[11px] md:text-xs text-white tracking-wider">
                POKÉDEX DATA ENTRY // {project.id.toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => {
                sound.playSelect();
                onClose();
              }}
              className="bg-white border-ink text-[#1A202C] hover:bg-gray-100 p-1 btn-retro flex items-center gap-1 px-2 text-[9px] font-pixel cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>[B] CLOSE</span>
            </button>
          </div>

          {/* Main Pokédex Content */}
          <div className="p-4 md:p-6 flex flex-col gap-5">
            
            {/* Top Identity Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white border-ink p-4 shadow-retro-sm">
              <div className="p-3 bg-[#F1F5F9] border-ink flex items-center justify-center shrink-0">
                <PokeBallSprite type={project.ballType} size={64} isHovered={true} />
              </div>

              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                  <span
                    className={`font-pixel text-[9px] px-2 py-0.5 border ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}
                  >
                    {project.typeBadge.toUpperCase()} TYPE
                  </span>
                  <span className="font-pixel text-[9px] bg-[#1A202C] text-white px-2 py-0.5 border border-[#1A202C]">
                    LV.{project.level}
                  </span>
                  <span className="font-pixel text-[9px] text-[#475569]">
                    {project.category}
                  </span>
                </div>

                <h2 className="font-pixel text-sm md:text-base text-[#1A202C] mt-2">
                  {project.title}
                </h2>
                
                <p className="font-dialogue text-lg md:text-xl text-[#334155] mt-1 leading-snug">
                  &ldquo;{project.flavorText}&rdquo;
                </p>
              </div>
            </div>

            {/* Project Cover / Visual Preview CRT Screen */}
            {project.coverImage && (
              <div className="bg-[#1A202C] border-ink p-2 shadow-retro-sm flex flex-col gap-1.5">
                <div className="flex items-center justify-between px-1 text-[8px] font-pixel text-gray-300">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    CRT_PREVIEW_FEED.SYS
                  </span>
                  <span className="text-amber-400">STATUS: VERIFIED</span>
                </div>
                
                <div className="relative w-full h-44 sm:h-52 bg-black border border-gray-600 overflow-hidden flex items-center justify-center">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover object-center"
                    unoptimized
                  />
                  {/* CRT Scanline & Glass reflection overlay */}
                  <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/10 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Technical Summary */}
            <div className="bg-white border-ink p-4 shadow-retro-sm">
              <h3 className="font-pixel text-[10px] text-[#1A202C] mb-2 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>PROJECT OVERVIEW</span>
              </h3>
              <p className="font-dialogue text-lg text-[#1F2937] leading-6">
                {project.summary}
              </p>
            </div>

            {/* Battle / Performance Stats */}
            <div className="bg-white border-ink p-4 shadow-retro-sm">
              <h3 className="font-pixel text-[10px] text-[#1A202C] mb-3 uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>PRODUCTION METRICS & STATS</span>
              </h3>

              <div className="flex flex-col gap-2.5">
                {statItems.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <div className="flex justify-between font-pixel text-[8px] text-[#475569]">
                      <span className="flex items-center gap-1">
                        <stat.icon className="w-3 h-3 text-[#1A202C]" />
                        {stat.label}
                      </span>
                      <span className="text-[#1A202C] font-bold">{stat.value} / 100</span>
                    </div>
                    <div className="w-full h-3 bg-[#E2E8F0] border-ink overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features Bullet List */}
            {project.keyFeatures && (
              <div className="bg-white border-ink p-4 shadow-retro-sm">
                <h3 className="font-pixel text-[10px] text-[#1A202C] mb-2 uppercase">
                  KEY FEATURES
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 font-dialogue text-lg text-[#1F2937]">
                      <span className="text-[#10B981] font-pixel text-[10px] mt-1">▶</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div>
              <h3 className="font-pixel text-[10px] text-[#1A202C] mb-2 uppercase">
                EQUIPPED TECH STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-pixel text-[9px] bg-white border-ink px-2.5 py-1 shadow-[2px_2px_0px_#1A202C] text-[#1A202C]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="w-full sm:flex-1 h-12 bg-[#10B981] hover:bg-[#059669] text-white border-ink shadow-retro flex items-center justify-center gap-2 font-pixel text-[10px] md:text-[11px] btn-retro cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LAUNCH LIVE DEMO</span>
              </a>

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="w-full sm:flex-1 h-12 bg-white hover:bg-gray-100 text-[#1A202C] border-ink shadow-retro flex items-center justify-center gap-2 font-pixel text-[10px] md:text-[11px] btn-retro cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
