'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Compass, Mail, MapPin, Send, PhoneCall } from 'lucide-react';
import { sound } from '@/lib/soundEffects';
import { DEFAULT_RESUME_DATA, DeveloperProfile } from '@/data/resumeData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface PokeNavModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: DeveloperProfile;
}

export const PokeNavModal: React.FC<PokeNavModalProps> = ({
  isOpen,
  onClose,
  profile = DEFAULT_RESUME_DATA.profile,
}) => {
  if (!isOpen) return null;

  const currentProfile = profile || DEFAULT_RESUME_DATA.profile;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-[2px] select-none">
        <div className="absolute inset-0" onClick={() => { sound.playSelect(); onClose(); }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative z-10 w-full max-w-xl bg-[#E6EDE8] border-ink-4 shadow-retro-lg flex flex-col max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-[#8B5CF6] border-b-ink px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5" />
              <span className="font-pixel text-xs md:text-sm tracking-wider">
                POKÉNAV // MATCH CALL & CONTACT
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

          {/* Body */}
          <div className="p-4 md:p-6 flex flex-col gap-4">
            
            {/* Trainer Card */}
            <div className="bg-white border-ink p-4 shadow-retro-sm flex flex-col gap-3">
              <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2">
                <div>
                  <span className="font-pixel text-xs text-[#1A202C]">
                    {currentProfile.name}
                  </span>
                  <p className="font-pixel text-[9px] text-[#10B981]">
                    {currentProfile.title}
                  </p>
                </div>
                <span className="font-pixel text-[8px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-1">
                  ● AVAILABLE FOR HIRE
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#475569] font-pixel text-[9px]">
                <MapPin className="w-4 h-4 text-[#EF4444]" />
                <span>{currentProfile.location}</span>
              </div>
            </div>

            {/* Quick Match Call Channels */}
            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[10px] text-[#1A202C]">
                TRANSMISSION CHANNELS:
              </span>

              <a
                href={`mailto:${currentProfile.email}`}
                onClick={() => sound.playSelect()}
                className="bg-white hover:bg-gray-50 border-ink p-3 shadow-retro-sm flex items-center justify-between btn-retro cursor-pointer text-[#1A202C]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 border border-ink">
                    <Mail className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <div className="font-pixel text-[10px]">EMAIL INBOX</div>
                    <div className="font-dialogue text-lg text-gray-600">{currentProfile.email}</div>
                  </div>
                </div>
                <Send className="w-4 h-4 text-[#10B981]" />
              </a>

              <a
                href={currentProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="bg-white hover:bg-gray-50 border-ink p-3 shadow-retro-sm flex items-center justify-between btn-retro cursor-pointer text-[#1A202C]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 border border-ink">
                    <GithubIcon className="w-4 h-4 text-slate-900" />
                  </div>
                  <div>
                    <div className="font-pixel text-[10px]">GITHUB PROFILE</div>
                    <div className="font-dialogue text-lg text-gray-600">Inspect Repositories & Commits</div>
                  </div>
                </div>
                <span className="font-pixel text-[9px] text-[#3B82F6]">OPEN ↗</span>
              </a>

              <a
                href={currentProfile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSelect()}
                className="bg-white hover:bg-gray-50 border-ink p-3 shadow-retro-sm flex items-center justify-between btn-retro cursor-pointer text-[#1A202C]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 border border-ink">
                    <LinkedinIcon className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <div className="font-pixel text-[10px]">LINKEDIN NETWORK</div>
                    <div className="font-dialogue text-lg text-gray-600">Connect for Opportunities</div>
                  </div>
                </div>
                <span className="font-pixel text-[9px] text-[#3B82F6]">OPEN ↗</span>
              </a>
            </div>

          </div>

          {/* Footer */}
          <div className="bg-[#CBD5D0] border-t-ink p-3 text-center font-pixel text-[9px] text-[#1A202C]">
            POKÉNAV SIGNAL: STRONG (5/5 BARS)
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
