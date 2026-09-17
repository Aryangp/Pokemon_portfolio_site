'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Zap, Shield, Flame, Droplets, Leaf } from 'lucide-react';
import { sound } from '@/lib/soundEffects';
import { PokeBallSprite, PokeBallType } from './PokeBallSprite';

import { DEFAULT_RESUME_DATA, PartyMember } from '@/data/resumeData';

interface TrainerPartyModalProps {
  isOpen: boolean;
  onClose: () => void;
  partyMembers?: PartyMember[];
}

export const TrainerPartyModal: React.FC<TrainerPartyModalProps> = ({
  isOpen,
  onClose,
  partyMembers = DEFAULT_RESUME_DATA.partyMembers,
}) => {
  if (!isOpen) return null;

  const members = partyMembers && partyMembers.length > 0 ? partyMembers : DEFAULT_RESUME_DATA.partyMembers;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-[2px] select-none">
        <div className="absolute inset-0" onClick={() => { sound.playSelect(); onClose(); }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative z-10 w-full max-w-3xl bg-[#E6EDE8] border-ink-4 shadow-retro-lg flex flex-col max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-[#3B82F6] border-b-ink px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-pixel text-xs md:text-sm tracking-wider">
                TRAINER BATTLE PARTY // 6 ACTIVE SLOTS
              </span>
            </div>

            <button
              onClick={() => {
                sound.playSelect();
                onClose();
              }}
              className="bg-white border-ink text-[#1A202C] px-2 py-1 text-[9px] font-pixel btn-retro flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>[B] CLOSE</span>
            </button>
          </div>

          {/* Party Cards Grid */}
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white border-ink p-3.5 shadow-retro-sm flex flex-col gap-2"
              >
                {/* Member Header */}
                <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <PokeBallSprite type={member.ballType} size={32} isHovered={true} />
                    <div className="flex flex-col">
                      <span className="font-pixel text-[10px] text-[#1A202C]">
                        {member.name}
                      </span>
                      <span className="text-[9px] font-pixel text-[#64748B]">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <span className="font-pixel text-[9px] bg-[#1A202C] text-white px-2 py-0.5">
                    LV.{member.level}
                  </span>
                </div>

                {/* HP Meter */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex justify-between font-pixel text-[7px] text-[#475569]">
                    <span>HP (UPTIME)</span>
                    <span className="text-[#10B981] font-bold">{member.hp}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 border border-black overflow-hidden">
                    <div className="h-full w-full bg-[#10B981]" />
                  </div>
                </div>

                {/* 4 Moves */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {member.moves.map((move, i) => (
                    <div
                      key={i}
                      className="bg-[#F8FAFC] border border-[#1A202C] px-2 py-1 font-pixel text-[8px] text-[#1A202C] truncate"
                    >
                      • {move}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-[#CBD5D0] border-t-ink p-3 text-center font-pixel text-[9px] text-[#1A202C]">
            ★ ALL 6 PARTY MEMBERS ARE PRODUCTION READY & BATTLE TESTED ★
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
