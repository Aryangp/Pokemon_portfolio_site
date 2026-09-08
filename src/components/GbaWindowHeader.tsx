'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '@/lib/soundEffects';

export type ViewTab = 'lab' | 'pcbox' | 'trainercard' | 'party' | 'pokenav';

interface GbaWindowHeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const GbaWindowHeader: React.FC<GbaWindowHeaderProps> = ({
  currentTab,
  onSelectTab,
  isMuted,
  onToggleSound,
}) => {
  const tabs: Array<{ id: ViewTab; label: string; icon: string }> = [
    { id: 'lab', label: "OAK'S LAB", icon: '🔴' },
    { id: 'pcbox', label: 'PC BOX & STATS', icon: '💻' },
    { id: 'trainercard', label: 'TRAINER CARD', icon: '⭐' },
    { id: 'party', label: 'ACTIVE PARTY', icon: '🍃' },
    { id: 'pokenav', label: 'POKÉNAV', icon: '📱' },
  ];

  return (
    <header className="w-full bg-[#1E293B] border-b-4 border-[#0F172A] text-white select-none z-30 sticky top-0 shadow-md">
      
      {/* Top Browser Titlebar (as seen in screenshots: Mac dots + localhost URL) */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F172A] border-b border-gray-700">
        {/* Mac OS Window Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#EF4444] border border-red-700" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B] border border-amber-700" />
          <div className="w-3 h-3 rounded-full bg-[#10B981] border border-emerald-700" />
          <span className="ml-3 font-pixel text-[9px] text-gray-400 hidden sm:inline">
            Pokémon Dev OS // localhost:3000
          </span>
        </div>

        {/* Audio Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="flex items-center gap-1.5 bg-[#1E293B] hover:bg-[#334155] border border-gray-600 px-2.5 py-1 text-[9px] font-pixel text-emerald-400 cursor-pointer rounded"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">8-BIT SFX ON</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Retro Navigation Tabs */}
      <nav className="flex items-center gap-1 px-3 py-1.5 overflow-x-auto bg-[#1E293B]">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playSelect();
                onSelectTab(tab.id);
              }}
              className={`px-3 py-1.5 font-pixel text-[9px] md:text-[10px] whitespace-nowrap transition-all border-t-2 border-x-2 rounded-t cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#CBD5E1] text-[#0F172A] border-white shadow-sm font-bold scale-102 z-10'
                  : 'bg-[#0F172A] text-gray-300 border-gray-700 hover:bg-[#334155] hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
