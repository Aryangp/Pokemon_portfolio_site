'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/soundEffects';

interface ProfessorOakCharacterProps {
  onOakClick?: () => void;
  className?: string;
  size?: 'normal' | 'large';
}

export const ProfessorOakCharacter: React.FC<ProfessorOakCharacterProps> = ({
  onOakClick,
  className = '',
  size = 'large',
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechText, setSpeechText] = useState('WELCOME TRAINER!');

  const speeches = [
    'WELCOME TO MY RESEARCH LAB!',
    'CHOOSE A STARTER PROJECT!',
    'ALL PROJECTS ARE BATTLE-TESTED! ⚡',
    'NEXT.JS 16 + REACT 19 RESEARCH READY!',
    'PRESS ANY POKÉBALL TO INSPECT!',
    'GREETINGS FROM PALLET TOWN! 🌲',
  ];

  const handleClick = () => {
    sound.playSelect();
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    const quote = speeches[nextCount % speeches.length];
    setSpeechText(quote);
    setShowSpeech(true);
    setTimeout(() => setShowSpeech(false), 2800);

    if (onOakClick) onOakClick();
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble on Click / Interactive */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 bg-white px-3.5 py-2 border-ink shadow-retro rounded-none text-[10px] font-pixel text-[#1A202C] whitespace-nowrap"
          >
            <span className="font-bold text-[#059669] mr-1">OAK:</span>
            <span>{speechText}</span>
            {/* Speech arrow downward */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1A202C]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Character Artwork Container */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="relative cursor-pointer group flex flex-col items-center"
        title="Professor Samuel Oak (Click to talk!)"
      >
        {/* Ambient Backlight Glow */}
        <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl group-hover:bg-emerald-400/40 transition-all duration-300 pointer-events-none" />

        {/* Character Image with High-Res Sugimori Art */}
        <div
          className={`relative overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] transition-transform duration-200 ${
            size === 'large'
              ? 'w-[200px] h-[250px] md:w-[240px] md:h-[300px] lg:w-[260px] lg:h-[320px]'
              : 'w-[140px] h-[175px]'
          }`}
        >
          <Image
            src="/images/professor_oak_bust.png"
            alt="Professor Oak"
            fill
            className="object-contain object-bottom drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            priority
          />

          {/* Interactive Pokéball Sparkle Indicator */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[38%] left-[2%] w-4 h-4 rounded-full bg-cyan-400/60 blur-xs pointer-events-none"
          />
        </div>

        {/* Nameplate Tag below character */}
        <div className="mt-1 bg-[#1A202C] text-white border-2 border-[#1A202C] px-3 py-0.5 shadow-retro-sm flex items-center gap-1.5 group-hover:bg-[#065F46] group-hover:border-[#10B981] transition-colors z-10">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-pixel text-[8px] md:text-[9px] tracking-wider text-white">
            PROF. SAMUEL OAK
          </span>
        </div>

        {/* Floor Drop Shadow */}
        <div className="w-40 h-3 bg-[#1A202C]/50 rounded-full blur-[2px] mt-0.5 pointer-events-none" />
      </motion.div>
    </div>
  );
};
