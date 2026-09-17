'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Cpu } from 'lucide-react';
import { sound } from '@/lib/soundEffects';

interface NavbarProps {
  currentTab: 'lab' | 'pcbox' | 'career' | 'badges' | 'party' | 'pokenav';
  onSelectTab: (tab: 'lab' | 'pcbox' | 'career' | 'badges' | 'party' | 'pokenav') => void;
  isExeMode: boolean;
  onToggleExeMode: () => void;
  onOpenMobileDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isExeMode,
  onToggleExeMode,
  onOpenMobileDrawer,
}) => {
  const [isMuted, setIsMuted] = useState(() => (typeof window !== 'undefined' ? sound.isMuted() : false));

  const handleToggleSound = () => {
    const nextMute = sound.toggleMute();
    setIsMuted(nextMute);
  };

  const navItems: Array<{ id: 'lab' | 'pcbox' | 'career' | 'badges' | 'party' | 'pokenav'; label: string }> = [
    { id: 'lab', label: 'LAB' },
    { id: 'pcbox', label: 'PC BOX' },
    { id: 'career', label: 'CAREER' },
    { id: 'badges', label: 'BADGES' },
    { id: 'party', label: 'PARTY' },
    { id: 'pokenav', label: 'POKÉNAV' },
  ];

  return (
    <header className="w-full h-14 md:h-16 bg-[#CBD5D0] border-b-ink z-30 flex items-center justify-between px-4 md:px-8 select-none">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            sound.playSelect();
            onSelectTab('lab');
          }}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          {/* Mini Pixel Pokéball */}
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-ink flex items-center justify-center relative overflow-hidden group-hover:rotate-45 transition-transform duration-300 shadow-retro-sm">
            <div className="absolute top-0 w-full h-1/2 bg-[#EF4444] border-b-2 border-[#1A202C]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-[#1A202C] z-10" />
          </div>
          <div className="flex flex-col">
            <span className="font-pixel text-xs md:text-sm text-[#1A202C] tracking-tight group-hover:text-[#059669] transition-colors">
              TRAINER.DEV
            </span>
            <span className="text-[9px] md:text-[10px] font-pixel text-[#4B5563] hidden sm:inline">
              PROF. ARYAN LABS
            </span>
          </div>
        </button>
      </div>

      {/* Desktop Links (>= 1024px) */}
      <nav className="hidden lg:flex items-center gap-1 bg-[#E6EDE8] border-ink p-1 shadow-retro-sm">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playSelect();
                onSelectTab(item.id);
              }}
              className={`px-3 py-1.5 text-[11px] font-pixel transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#10B981] text-white border-ink shadow-[2px_2px_0px_#1A202C]'
                  : 'text-[#1A202C] hover:bg-[#CBD5D0] border border-transparent'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Action Controls & Sound Toggle */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Audio Mute/Unmute */}
        <button
          onClick={handleToggleSound}
          title={isMuted ? 'Unmute 8-bit Audio' : 'Mute 8-bit Audio'}
          className="w-9 h-9 md:w-10 md:h-10 bg-white border-ink flex items-center justify-center btn-retro cursor-pointer text-[#1A202C]"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#EF4444]" />
          ) : (
            <div className="flex items-center gap-0.5">
              <Volume2 className="w-4 h-4 text-[#10B981]" />
            </div>
          )}
        </button>

        {/* [EXE MODE] Switch */}
        <button
          onClick={() => {
            if (isExeMode) {
              sound.playSelect();
            } else {
              sound.playPcBoot();
            }
            onToggleExeMode();
          }}
          className={`flex items-center gap-1.5 px-2.5 md:px-3.5 py-1.5 md:py-2 text-[10px] md:text-xs font-pixel border-ink cursor-pointer transition-all ${
            isExeMode
              ? 'bg-[#3B82F6] text-white shadow-retro-sm animate-pulse'
              : 'bg-[#1A202C] text-[#34D399] btn-retro'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {isExeMode ? 'RETURN TO LAB' : '[EXE MODE: PC BOX]'}
          </span>
          <span className="sm:hidden">
            {isExeMode ? 'LAB' : 'EXE'}
          </span>
        </button>

        {/* Mobile Menu Drawer Trigger (< 1024px) */}
        <button
          onClick={() => {
            sound.playSelect();
            onOpenMobileDrawer();
          }}
          className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 bg-white border-ink btn-retro text-[10px] font-pixel text-[#1A202C]"
        >
          <span className="text-[#EF4444]">▶</span>
          <span>START</span>
        </button>
      </div>
    </header>
  );
};
