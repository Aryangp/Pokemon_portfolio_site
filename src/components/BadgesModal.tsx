'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ShieldCheck, Star } from 'lucide-react';
import { sound } from '@/lib/soundEffects';

import { DEFAULT_RESUME_DATA, GymBadge } from '@/data/resumeData';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  gymBadges?: GymBadge[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  gymBadges = DEFAULT_RESUME_DATA.gymBadges,
}) => {
  if (!isOpen) return null;

  const badges = gymBadges && gymBadges.length > 0 ? gymBadges : DEFAULT_RESUME_DATA.gymBadges;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-[2px] select-none">
        <div className="absolute inset-0" onClick={() => { sound.playSelect(); onClose(); }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative z-10 w-full max-w-2xl bg-[#E6EDE8] border-ink-4 shadow-retro-lg flex flex-col max-h-[88vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-[#10B981] border-b-ink px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Award className="w-5 h-5" />
              <span className="font-pixel text-xs md:text-sm tracking-wider">
                KANTO GYM BADGE CASE // {badges.length} OF {badges.length} EARNED
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

          {/* Badge Grid */}
          <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((badge, idx) => (
              <div
                key={badge.id}
                className="bg-white border-ink p-3.5 shadow-retro-sm flex gap-3 items-start group hover:border-[#10B981] transition-colors"
              >
                {/* Badge Icon Medallion */}
                <div
                  className="w-12 h-12 rounded-lg border-2 border-[#1A202C] flex items-center justify-center shrink-0 shadow-inner group-hover:rotate-6 transition-transform"
                  style={{ backgroundColor: badge.color }}
                >
                  <Star className="w-6 h-6 text-[#1A202C] fill-[#1A202C]/20" />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-pixel text-[9px] text-[#1A202C] font-bold">
                      {badge.name}
                    </span>
                    <span className="text-[8px] font-pixel text-[#10B981]">
                      ★ EARNED
                    </span>
                  </div>

                  <span className="font-pixel text-[8px] text-[#059669] mt-0.5">
                    {badge.skill}
                  </span>

                  <p className="font-dialogue text-base text-[#475569] mt-1 leading-snug">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Case Status */}
          <div className="bg-[#CBD5D0] border-t-ink p-3 text-center">
            <span className="font-pixel text-[9px] text-[#1A202C]">
              ★ ALL 8 GYM LEADERS DEFEATED // QUALIFIED FOR ELITE 4 OPPORTUNITIES ★
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
