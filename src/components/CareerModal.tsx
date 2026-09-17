'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, GraduationCap, Award, MapPin, Calendar, CheckCircle2, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { sound } from '@/lib/soundEffects';
import { WorkExperienceItem, EducationItem, AchievementItem } from '@/data/resumeData';

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  achievements: AchievementItem[];
  isRemote?: boolean;
  dataSource?: string;
  onReload?: () => void;
}

export const CareerModal: React.FC<CareerModalProps> = ({
  isOpen,
  onClose,
  workExperience,
  education,
  achievements,
  isRemote = false,
  dataSource = 'local_bundled',
  onReload,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'experience' | 'education' | 'achievements'>('experience');
  const [selectedExpId, setSelectedExpId] = useState<string>(workExperience[0]?.id || 'exp-policybazaar');

  if (!isOpen) return null;

  const currentExp = workExperience.find((w) => w.id === selectedExpId) || workExperience[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-[2px] select-none">
        {/* Backdrop click to dismiss */}
        <div
          className="absolute inset-0"
          onClick={() => {
            sound.playSelect();
            onClose();
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-10 w-full max-w-4xl bg-[#E6EDE8] border-ink-4 shadow-retro-lg flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header Ribbon */}
          <div className="bg-[#1E293B] border-b-ink px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="font-pixel text-xs md:text-sm tracking-wider text-emerald-400">
                  TRAINER CAREER EXPEDITIONS // QUEST ARCHIVE
                </span>
                <span className="text-[8px] font-pixel text-gray-400 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isRemote ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`} />
                  SOURCE: {isRemote ? 'GITHUB GIST (LIVE)' : 'LOCAL JSON FALLBACK'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onReload && (
                <button
                  onClick={() => {
                    sound.playSelect();
                    onReload();
                  }}
                  title="Sync with GitHub Gist"
                  className="bg-[#334155] border-ink text-emerald-300 hover:bg-[#475569] p-1 px-2 text-[9px] font-pixel btn-retro flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">SYNC GIST</span>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playSelect();
                  onClose();
                }}
                className="bg-white border-ink text-[#1A202C] hover:bg-gray-100 p-1 px-2.5 text-[9px] font-pixel btn-retro flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>[B] CLOSE</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="bg-[#CBD5D0] border-b-ink px-4 py-2 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => {
                sound.playSelect();
                setActiveSubTab('experience');
              }}
              className={`px-3 py-1.5 font-pixel text-[9px] md:text-[10px] flex items-center gap-1.5 border-ink cursor-pointer transition-all ${
                activeSubTab === 'experience'
                  ? 'bg-[#10B981] text-white shadow-retro-sm'
                  : 'bg-white text-[#1A202C] hover:bg-gray-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>WORK EXPERIENCE ({workExperience.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                setActiveSubTab('education');
              }}
              className={`px-3 py-1.5 font-pixel text-[9px] md:text-[10px] flex items-center gap-1.5 border-ink cursor-pointer transition-all ${
                activeSubTab === 'education'
                  ? 'bg-[#3B82F6] text-white shadow-retro-sm'
                  : 'bg-white text-[#1A202C] hover:bg-gray-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>EDUCATION & CGPA</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                setActiveSubTab('achievements');
              }}
              className={`px-3 py-1.5 font-pixel text-[9px] md:text-[10px] flex items-center gap-1.5 border-ink cursor-pointer transition-all ${
                activeSubTab === 'achievements'
                  ? 'bg-[#F59E0B] text-white shadow-retro-sm'
                  : 'bg-white text-[#1A202C] hover:bg-gray-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>HACKATHONS & AWARDS</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            
            {/* VIEW 1: WORK EXPERIENCE */}
            {activeSubTab === 'experience' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Left: Company Expedition List */}
                <div className="lg:col-span-4 flex flex-col gap-2.5">
                  <span className="font-pixel text-[9px] text-[#475569] uppercase tracking-wider">
                    EXPEDITION LOGS:
                  </span>
                  
                  {workExperience.map((exp) => {
                    const isSelected = selectedExpId === exp.id;
                    return (
                      <div
                        key={exp.id}
                        onClick={() => {
                          sound.playSelect();
                          setSelectedExpId(exp.id);
                        }}
                        className={`p-3 border-ink flex flex-col gap-1 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#10B981] text-white shadow-retro ring-2 ring-[#059669]'
                            : 'bg-white text-[#1A202C] hover:bg-gray-50 shadow-retro-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-pixel text-[11px] font-bold">
                            {exp.company}
                          </span>
                          <span
                            className={`font-pixel text-[7.5px] px-1.5 py-0.5 border ${
                              isSelected ? 'bg-white/20 text-white border-white/40' : 'bg-gray-100 text-gray-700 border-gray-300'
                            }`}
                          >
                            {exp.period.split('–')[0].trim()}
                          </span>
                        </div>

                        <span className={`text-[9px] font-pixel ${isSelected ? 'text-emerald-100' : 'text-[#475569]'}`}>
                          {exp.role}
                        </span>

                        <div className="flex items-center gap-1 text-[8px] font-pixel opacity-80 mt-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Detailed Experience View */}
                {currentExp && (
                  <div className="lg:col-span-8 flex flex-col gap-4 bg-white border-ink p-4 md:p-5 shadow-retro">
                    
                    {/* Role Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-gray-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-pixel text-xs md:text-sm text-[#1A202C] font-bold">
                            {currentExp.company}
                          </h3>
                          <span
                            className="font-pixel text-[8px] px-2 py-0.5 text-white border border-black shadow-sm"
                            style={{ backgroundColor: currentExp.badgeColor || '#10B981' }}
                          >
                            ★ {currentExp.badgeName || 'VERIFIED GUILD'}
                          </span>
                        </div>
                        <div className="font-dialogue text-xl text-[#059669] font-bold mt-0.5">
                          {currentExp.role}
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end text-[8.5px] font-pixel text-[#64748B]">
                        <span className="flex items-center gap-1 text-[#1A202C]">
                          <Calendar className="w-3 h-3 text-[#10B981]" />
                          {currentExp.period}
                        </span>
                        <span className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#3B82F6]" />
                          {currentExp.location}
                        </span>
                      </div>
                    </div>

                    {/* Tech Arsenal Tags */}
                    <div>
                      <span className="font-pixel text-[8.5px] text-[#475569] block mb-1.5 uppercase">
                        DEPLOYED STACK & PROTOCOLS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentExp.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="font-pixel text-[8.5px] bg-[#F1F5F9] border-ink px-2 py-0.5 text-[#1E293B] shadow-[1px_1px_0px_#1A202C]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Battle Feats / Highlights */}
                    <div className="flex flex-col gap-2">
                      <span className="font-pixel text-[8.5px] text-[#475569] uppercase">
                        BATTLE ACHIEVEMENTS & PRODUCTION IMPACT:
                      </span>
                      <div className="flex flex-col gap-2">
                        {currentExp.highlights.map((bullet, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2 bg-[#F8FAFC] border border-gray-200"
                          >
                            <span className="text-[#10B981] font-pixel text-[11px] mt-0.5 shrink-0">
                              ▶
                            </span>
                            <p className="font-dialogue text-lg md:text-[19px] text-[#334155] leading-relaxed">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* VIEW 2: EDUCATION */}
            {activeSubTab === 'education' && (
              <div className="flex flex-col gap-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-ink p-5 shadow-retro flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#3B82F6] border-2 border-[#1A202C] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <GraduationCap className="w-8 h-8" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="font-pixel text-[9px] bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 inline-block w-fit">
                          TRAINER ACADEMY DEGREE
                        </span>
                        <h3 className="font-pixel text-sm text-[#1A202C] font-bold">
                          {edu.institution}
                        </h3>
                        <p className="font-dialogue text-xl text-[#059669] font-bold">
                          {edu.degree}
                        </p>
                        <div className="flex items-center gap-3 text-[9px] font-pixel text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {edu.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CGPA Badge */}
                    <div className="bg-[#FEF3C7] border-2 border-[#1A202C] p-4 flex flex-col items-center justify-center min-w-[150px] shadow-retro-sm">
                      <span className="font-pixel text-[8px] text-[#92400E]">
                        ACADEMIC CGPA
                      </span>
                      <span className="font-pixel text-xl text-[#B45309] font-bold mt-1">
                        ★ {edu.cgpa}
                      </span>
                      <span className="font-pixel text-[7.5px] text-[#78350F] text-center mt-1">
                        {edu.honors || 'Top Tier Distinction'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW 3: ACHIEVEMENTS & HACKATHONS */}
            {activeSubTab === 'achievements' && (
              <div className="flex flex-col gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="bg-white border-ink p-5 shadow-retro flex flex-col gap-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-gray-200 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#F59E0B] border-2 border-[#1A202C] flex items-center justify-center text-white shrink-0 shadow-sm">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="font-pixel text-[8px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5">
                            ★ NATIONWIDE HACKATHON
                          </span>
                          <h3 className="font-pixel text-xs md:text-sm text-[#1A202C] font-bold mt-1">
                            {ach.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end text-[8.5px] font-pixel text-[#64748B]">
                        <span className="text-[#10B981] font-bold">{ach.date}</span>
                        <span>{ach.location}</span>
                      </div>
                    </div>

                    <div className="bg-[#FFFBEB] border border-amber-300 p-2.5 font-pixel text-[9px] text-[#92400E]">
                      ⚡ {ach.sponsors}
                    </div>

                    <p className="font-dialogue text-xl text-[#334155] leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Footer Ribbon */}
          <div className="bg-[#CBD5D0] border-t-ink p-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="font-pixel text-[8px] text-[#475569]">
              ★ ALL WORK EXPERIENCES VERIFIED WITH LIVE PRODUCTION DATA ★
            </span>
            <div className="font-pixel text-[8px] text-[#059669]">
              PROF. ARYAN LABS // GURUGRAM & AMBALA
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
