'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { sound } from '@/lib/soundEffects';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: 'lab' | 'pcbox' | 'badges' | 'party' | 'pokenav') => void;
  onDownloadCv: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onDownloadCv,
  isMuted,
  onToggleSound,
}) => {
  if (!isOpen) return null;

  const menuItems: Array<{ id: 'lab' | 'pcbox' | 'badges' | 'party' | 'pokenav'; label: string; desc: string }> = [
    { id: 'lab', label: '1. OAK\'S LAB', desc: 'Starter Machine & Overview' },
    { id: 'pcbox', label: '2. BILL\'S PC [EXE]', desc: 'Project Storage Boxes' },
    { id: 'badges', label: '3. GYM BADGES', desc: '8/8 Technical Badges' },
    { id: 'party', label: '4. BATTLE PARTY', desc: 'Active Tech Stack' },
    { id: 'pokenav', label: '5. POKÉNAV', desc: 'Contact & Channels' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-[2px] select-none">
        <div className="absolute inset-0" onClick={() => { sound.playSelect(); onClose(); }} />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-[300px] h-full bg-[#E6EDE8] border-l-ink-4 shadow-retro-lg flex flex-col justify-between p-5"
        >
          {/* Top Title */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#1A202C]">
              <div className="flex items-center gap-2">
                <span className="text-[#EF4444] font-pixel text-sm">▶</span>
                <span className="font-pixel text-xs text-[#1A202C] tracking-wider">
                  START MENU
                </span>
              </div>

              <button
                onClick={() => {
                  sound.playSelect();
                  onClose();
                }}
                className="w-8 h-8 bg-white border-ink flex items-center justify-center btn-retro cursor-pointer text-[#1A202C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-2.5 mt-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playSelect();
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className="w-full bg-white hover:bg-[#CBD5D0] border-ink p-3 text-left shadow-retro-sm btn-retro flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex flex-col">
                    <span className="font-pixel text-[10px] text-[#1A202C] group-hover:text-[#10B981] transition-colors">
                      {item.label}
                    </span>
                    <span className="font-dialogue text-base text-[#64748B]">
                      {item.desc}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#1A202C] group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-3 pt-4 border-t-2 border-[#1A202C]">
            <button
              onClick={() => {
                onDownloadCv();
                onClose();
              }}
              className="w-full h-12 bg-[#10B981] text-white font-pixel text-[10px] border-ink shadow-retro-emerald flex items-center justify-center gap-2 btn-retro cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </button>

            <button
              onClick={() => {
                onToggleSound();
              }}
              className="w-full h-10 bg-white text-[#1A202C] font-pixel text-[9px] border-ink shadow-retro-sm flex items-center justify-center gap-2 btn-retro cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-500" />
                  <span>UNMUTE 8-BIT AUDIO</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>MUTE 8-BIT AUDIO</span>
                </>
              )}
            </button>

            <div className="text-center font-pixel text-[8px] text-[#64748B] pt-2">
              TRAINER.DEV // PALLET TOWN
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
