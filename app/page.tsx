'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarterProject } from '@/data/portfolioData';
import { useDynamicResumeData } from '@/lib/resumeService';
import { useDynamicProjects } from '@/lib/portfolioService';
import { sound } from '@/lib/soundEffects';

// Components
import Image from 'next/image';
import { PokeBallLoader } from '@/components/PokeBallLoader';
import { Navbar } from '@/components/Navbar';
import { StarterMachine } from '@/components/StarterMachine';
import { ProfessorOakCharacter } from '@/components/ProfessorOakCharacter';
import { OakAvatar } from '@/components/OakAvatar';
import { DialogueBox } from '@/components/DialogueBox';
import { PokeBallSprite } from '@/components/PokeBallSprite';
import { ProjectModal } from '@/components/ProjectModal';
import { PcBoxMode } from '@/components/PcBoxMode';
import { BadgesModal } from '@/components/BadgesModal';
import { TrainerPartyModal } from '@/components/TrainerPartyModal';
import { CareerModal } from '@/components/CareerModal';
import { PokeNavModal } from '@/components/PokeNavModal';
import { MobileDrawer } from '@/components/MobileDrawer';
import { Cpu, FileText, Briefcase, Sparkles } from 'lucide-react';

export default function Home() {
  const { resumeData, isRemote, dataSource, reload: reloadResume } = useDynamicResumeData();
  const { projects, isLive: isProjectsLive } = useDynamicProjects();
  const [isLoading, setIsLoading] = useState(true);
  const [isExeMode, setIsExeMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'lab' | 'pcbox' | 'career' | 'badges' | 'party' | 'pokenav'>('lab');

  // Interactive Hover / Selection States
  const [hoveredProject, setHoveredProject] = useState<StarterProject | null>(null);
  const [inspectedProject, setInspectedProject] = useState<StarterProject | null>(null);

  // Modals
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [showPokeNavModal, setShowPokeNavModal] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [dialogueText, setDialogueText] = useState(resumeData.profile.dialogueIntro);
  const [isMuted, setIsMuted] = useState(() => (typeof window !== 'undefined' ? sound.isMuted() : false));

  // Sync dialogue text when resumeData loads or changes
  useEffect(() => {
    if (!hoveredProject) {
      setDialogueText(resumeData.profile.dialogueIntro);
    }
  }, [resumeData.profile.dialogueIntro, hoveredProject]);

  // Update dialogue text when hovering projects
  useEffect(() => {
    if (hoveredProject) {
      setDialogueText(
        `POKÉDEX ENTRY #${hoveredProject.id.toUpperCase()}: ${hoveredProject.title}! Type: [${hoveredProject.typeBadge}]. ${hoveredProject.summary}`
      );
    } else {
      setDialogueText(resumeData.profile.dialogueIntro);
    }
  }, [hoveredProject, resumeData.profile.dialogueIntro]);

  const handleSelectTab = (tab: 'lab' | 'pcbox' | 'career' | 'badges' | 'party' | 'pokenav') => {
    setActiveTab(tab);
    if (tab === 'lab') {
      setIsExeMode(false);
    } else if (tab === 'pcbox') {
      setIsExeMode(true);
    } else if (tab === 'career') {
      setShowCareerModal(true);
    } else if (tab === 'badges') {
      setShowBadgesModal(true);
    } else if (tab === 'party') {
      setShowPartyModal(true);
    } else if (tab === 'pokenav') {
      setShowPokeNavModal(true);
    }
  };

  const handleToggleExeMode = () => {
    const nextMode = !isExeMode;
    setIsExeMode(nextMode);
    setActiveTab(nextMode ? 'pcbox' : 'lab');
  };

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const handleDownloadCv = () => {
    sound.playFanfare();
    const link = document.createElement('a');
    link.href = resumeData.profile.resumePdfUrl || '#';
    link.setAttribute('download', 'Aryan_Gupta_Resume.pdf');
  };

  return (
    <div className="min-h-screen bg-[#2563EB] blueprint-grid text-[#1A202C] flex flex-col justify-between relative overflow-x-hidden font-sans">
      
      {/* 1. Intro Pokéball Wobble Loader */}
      {isLoading && (
        <PokeBallLoader onLoaded={() => setIsLoading(false)} />
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={handleSelectTab}
        isExeMode={isExeMode}
        onToggleExeMode={handleToggleExeMode}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
      />

      {/* 3. Main Stage Content Switcher (Lab vs EXE Mode: Bill's PC) */}
      <main className="flex-1 flex flex-col items-center justify-center w-full relative py-4 px-3 md:px-6">
        
        {/* VIEW A: BILL'S PC BOX MODE (EXE MODE) */}
        {isExeMode ? (
          <PcBoxMode
            projects={projects}
            onReturnToLab={() => {
              setIsExeMode(false);
              setActiveTab('lab');
            }}
            onInspectProject={(proj) => setInspectedProject(proj)}
          />
        ) : (
          /* VIEW B: PROFESSOR ARYAN'S RESEARCH LAB */
          <>
            {/* DESKTOP VIEWPORT (>= 1024px: 1440px x 900px Canvas, Zero Scroll) */}
            <section className="hidden lg:flex flex-col items-center justify-between w-full max-w-[1440px] h-[calc(900px-64px)] relative select-none px-6 py-4">
              
              {/* STAGE CONTAINER WITH RICH POKÉMON LAB BACKGROUND & INK BORDERS */}
              <div className="w-full h-full border-ink-4 shadow-retro-lg relative flex flex-col justify-between overflow-hidden rounded-none">
                
                {/* 1. RICH POKÉMON RESEARCH LAB BACKGROUND IMAGE */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/pokemon_lab_background.jpg"
                    alt="Professor Aryan's Pokémon Research Laboratory"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle dark gradient overlay to ensure UI elements pop */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60 pointer-events-none" />
                  {/* Subtle retro scanline texture */}
                  <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
                </div>

                {/* 2. TOP LAB HUD BAR (Scientific Status & Tech Stack) */}
                <div className="w-full h-[120px] relative z-10 flex items-center justify-between px-8 pt-4">
                  
                  {/* Left: Scientific Research Terminal Log Card */}
                  <div className="h-[96px] w-[340px] bg-[#064E3B]/90 backdrop-blur-md border-2 border-[#10B981] shadow-retro-sm p-2.5 flex flex-col justify-between rounded-none">
                    <div className="flex items-center justify-between border-b border-emerald-400/40 pb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-pixel text-[8px] text-emerald-300 tracking-wider">
                          LAB_RESEARCH_LOG.SYS
                        </span>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${isProjectsLive || isRemote ? 'bg-emerald-400 animate-ping' : 'bg-blue-400'}`} />
                    </div>
                    <div className="font-dialogue text-[17px] text-emerald-100 leading-[18px]">
                      &gt; SDE 1: Policybazaar (Backend)<br />
                      &gt; Go API: {isProjectsLive ? 'RENDER API (LIVE)' : 'BUNDLED BACKUP'}<br />
                      &gt; Gist Sync: {isRemote ? 'GITHUB GIST (LIVE)' : 'LOCAL DATASET'}
                    </div>
                  </div>

                  {/* Center: Lab Header & Badges */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-[#1A202C]/90 backdrop-blur-sm border-2 border-white px-5 py-1.5 shadow-retro-sm">
                      <span className="font-pixel text-[11px] text-white tracking-widest font-bold flex items-center gap-2">
                        <span className="text-amber-400">★</span>
                        <span>PROF. {resumeData.profile.name.toUpperCase()} RESEARCH LAB</span>
                        <span className="text-amber-400">★</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-600/90 border border-white px-2.5 py-0.5 font-pixel text-[9px] text-white shadow-retro-sm">
                        .NET 8 & C#
                      </div>
                      <div className="bg-black/90 border border-white px-2.5 py-0.5 font-pixel text-[9px] text-white shadow-retro-sm">
                        Kafka & Azure Bus
                      </div>
                      <div className="bg-emerald-600/90 border border-white px-2.5 py-0.5 font-pixel text-[9px] text-white shadow-retro-sm">
                        Redis & MongoDB
                      </div>
                      <div className="bg-amber-600/90 border border-white px-2.5 py-0.5 font-pixel text-[9px] text-white shadow-retro-sm">
                        Python & FastAPI
                      </div>
                    </div>
                  </div>

                  {/* Right: Lab Zone & Status Indicator */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="bg-[#1A202C]/90 backdrop-blur-sm border-2 border-emerald-400 px-3.5 py-1.5 shadow-retro-sm flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="font-pixel text-[9px] text-emerald-300">
                        DISPENSER: ONLINE ({projects.length} STARTERS)
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        sound.playSelect();
                        setShowCareerModal(true);
                      }}
                      className="bg-[#10B981] hover:bg-[#059669] text-white border border-white px-2.5 py-1 text-[8.5px] font-pixel btn-retro flex items-center gap-1 cursor-pointer"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>VIEW CAREER EXPEDITIONS</span>
                    </button>
                  </div>

                </div>

                {/* 3. CENTER STAGE: GROUNDED STARTER TABLE + PROFESSOR ARYAN */}
                <div className="w-full flex-1 relative z-10 flex items-center justify-between px-10 pb-36">
                  
                  {/* Center-Left: Grounded Starter Table with Solid Legs & Shadows */}
                  <div className="flex-1 max-w-[840px] flex flex-col items-center justify-center">
                    <StarterMachine
                      projects={projects}
                      hoveredProjectId={hoveredProject?.id || null}
                      onHoverProject={(proj) => setHoveredProject(proj)}
                      onSelectProject={(proj) => setInspectedProject(proj)}
                    />
                  </div>

                  {/* Right Side: High-Resolution Scaled Up Professor Character */}
                  <div className="shrink-0 flex flex-col items-center justify-end pl-4">
                    <ProfessorOakCharacter
                      onOakClick={() => {
                        setDialogueText(
                          'PROF. ARYAN: "Every starter in that Silph Co. dispenser contains a complete production architecture! Pick one to examine its Pokédex technical specs!"'
                        );
                      }}
                      size="large"
                    />
                  </div>

                </div>

                {/* 4. PROFESSOR DIALOGUE BOX (Pinned Bottom) */}
                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-20 w-[920px] max-w-[95%]">
                  <DialogueBox
                    dialogueText={dialogueText}
                    speakerName={`PROF. ${resumeData.profile.name.split(' ')[0].toUpperCase()}`}
                    onDownloadCv={handleDownloadCv}
                  />
                </div>

              </div>
            </section>

            {/* MOBILE VIEWPORT (< 1024px: Responsive Vertical Flow) */}
            <section className="flex lg:hidden flex-col items-center w-full max-w-md px-4 py-4 gap-4 pb-20 select-none">
              
              {/* Mobile Lab Hero Stage */}
              <div className="w-full border-ink-4 shadow-retro relative overflow-hidden p-4 flex items-center justify-between rounded-none">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/pokemon_lab_background.jpg"
                    alt="Professor Aryan's Pokémon Research Laboratory"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                </div>

                <div className="relative z-10 flex flex-col text-white">
                  <span className="font-pixel text-[11px] font-bold text-emerald-300">
                    {resumeData.profile.name}
                  </span>
                  <span className="text-[9px] font-pixel text-gray-200 mt-0.5">
                    {resumeData.profile.trainerClass}
                  </span>
                  <span className="text-[8px] font-pixel text-amber-300 mt-1">
                    ★ POLICYBAZAAR SDE 1 // AMBALA
                  </span>
                </div>

                <div className="relative z-10">
                  <OakAvatar size={68} className="border-2 border-white shadow-retro-sm" showBadge={true} />
                </div>
              </div>

              {/* Mobile Dialogue Box */}
              <div className="w-full">
                <DialogueBox
                  dialogueText={dialogueText}
                  speakerName={`PROF. ${resumeData.profile.name.split(' ')[0].toUpperCase()}`}
                  onDownloadCv={handleDownloadCv}
                  isMobile={true}
                />
              </div>

              {/* Mobile Career Expeditions Button */}
              <button
                onClick={() => {
                  sound.playSelect();
                  setShowCareerModal(true);
                }}
                className="w-full h-11 bg-[#10B981] hover:bg-[#059669] text-white border-ink shadow-retro-sm font-pixel text-[10px] flex items-center justify-center gap-2 btn-retro cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>EXPEDITIONS: POLICYBAZAAR & HISTORY</span>
              </button>

              {/* Touch Starter Grid */}
              <div className="w-full flex flex-col gap-2 mt-2">
                <div className="flex items-center justify-between px-1">
                  <span className="font-pixel text-[10px] text-white">
                    STARTER POKÉBALLS:
                  </span>
                  <span className="font-pixel text-[8px] text-emerald-400">
                    TAP TO INSPECT ({projects.length})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        sound.playOpen();
                        setInspectedProject(project);
                      }}
                      className="h-[76px] bg-white border-ink shadow-retro-sm p-2 flex items-center gap-2 btn-retro text-left cursor-pointer"
                    >
                      <PokeBallSprite
                        type={project.ballType}
                        size={40}
                        isHovered={false}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-pixel text-[8px] text-[#059669] block truncate">
                          {project.typeBadge}
                        </span>
                        <h4 className="font-pixel text-[9px] text-[#1A202C] font-bold truncate">
                          {project.title}
                        </h4>
                        <span className="font-pixel text-[7px] text-[#64748B]">
                          LV.{project.level}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </section>
          </>
        )}

      </main>

      {/* 4. Mobile Sticky Footer (56px) (< 1024px) */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#CBD5D0] border-t-ink flex items-center justify-around px-3 z-30 shadow-lg">
        <button
          onClick={() => {
            sound.playPcBoot();
            setIsExeMode(true);
            setActiveTab('pcbox');
          }}
          className="flex-1 h-10 bg-[#3B82F6] text-white border-ink shadow-retro-sm font-pixel text-[9px] flex items-center justify-center gap-1.5 btn-retro mx-1 cursor-pointer"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>⭐ PROJECTS</span>
        </button>

        <button
          onClick={() => {
            sound.playSelect();
            setShowCareerModal(true);
          }}
          className="flex-1 h-10 bg-[#8B5CF6] text-white border-ink shadow-retro-sm font-pixel text-[9px] flex items-center justify-center gap-1.5 btn-retro mx-1 cursor-pointer"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>EXPEDITIONS</span>
        </button>

        <button
          onClick={handleDownloadCv}
          className="flex-1 h-10 bg-[#10B981] text-white border-ink shadow-retro-sm font-pixel text-[9px] flex items-center justify-center gap-1.5 btn-retro mx-1 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>RESUME</span>
        </button>
      </footer>

      {/* 5. Pokédex Project Inspector Modal */}
      <ProjectModal
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
      />

      {/* 6. Career Expeditions Modal (Policybazaar, Settyl, Milda, UIET, Hackathons) */}
      <CareerModal
        isOpen={showCareerModal}
        onClose={() => setShowCareerModal(false)}
        workExperience={resumeData.workExperience}
        education={resumeData.education}
        achievements={resumeData.achievements}
        isRemote={isRemote}
        dataSource={dataSource}
        onReload={reloadResume}
      />

      {/* 7. Gym Badges Modal */}
      <BadgesModal
        isOpen={showBadgesModal}
        onClose={() => setShowBadgesModal(false)}
        gymBadges={resumeData.gymBadges}
      />

      {/* 8. Trainer Party Modal */}
      <TrainerPartyModal
        isOpen={showPartyModal}
        onClose={() => setShowPartyModal(false)}
        partyMembers={resumeData.partyMembers}
      />

      {/* 9. PokéNav Contact Modal */}
      <PokeNavModal
        isOpen={showPokeNavModal}
        onClose={() => setShowPokeNavModal(false)}
        profile={resumeData.profile}
      />

      {/* 10. Mobile START Menu Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onSelectTab={handleSelectTab}
        onDownloadCv={handleDownloadCv}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

    </div>
  );
}

