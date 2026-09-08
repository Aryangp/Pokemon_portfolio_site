'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Download, Sparkles, FileText } from 'lucide-react';
import { sound } from '@/lib/soundEffects';
import { OakAvatar } from './OakAvatar';

interface DialogueBoxProps {
  dialogueText: string;
  speakerName?: string;
  onDownloadCv?: () => void;
  className?: string;
  isMobile?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogueText,
  speakerName = 'PROF. OAK',
  onDownloadCv,
  className = '',
  isMobile = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const speed = 18; // Speed in ms per character

    typingTimerRef.current = setInterval(() => {
      if (charIndex < dialogueText.length) {
        const nextChar = dialogueText.charAt(charIndex);
        setDisplayedText((prev) => prev + nextChar);

        // Sound blip on alphanumeric characters every 2-3 letters
        if (charIndex % 3 === 0 && /[a-zA-Z0-9]/.test(nextChar)) {
          sound.playDialogue();
        }

        charIndex++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsTyping(false);
      }
    }, speed);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [dialogueText]);

  const handleDownload = () => {
    sound.playFanfare();

    // Trigger celebratory retro confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10B981', '#06B6D4', '#EF4444', '#FBBF24'],
    });

    if (onDownloadCv) {
      onDownloadCv();
    } else {
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', 'Aryan_Gupta_Resume.pdf');
    }
  };

  return (
    <div
      className={`bg-white border-ink shadow-retro relative z-20 flex flex-col justify-between select-none ${className}`}
      style={{
        width: isMobile ? '100%' : '880px',
        minHeight: isMobile ? '110px' : '140px',
      }}
    >
      {/* Speaker Nameplate Tag */}
      <div className="absolute -top-3.5 left-6 bg-[#1A202C] text-white px-3 py-0.5 border border-[#1A202C] shadow-retro-sm z-30 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
        <span className="font-pixel text-[9px] md:text-[10px] tracking-wider text-[#34D399]">
          {speakerName}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 h-full">
        
        {/* Left Avatar Portrait & Typewriter Text */}
        <div className="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
          <OakAvatar size={isMobile ? 54 : 76} className="border-ink shadow-retro-sm shrink-0" />

          <div className="flex-1 min-w-0 pr-2">
            <p className="font-dialogue text-xl md:text-[22px] leading-6 text-[#1A202C] tracking-wide min-h-[48px]">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-[#10B981] ml-1 animate-pulse align-middle" />
              )}
            </p>
          </div>
        </div>

        {/* Right: [DOWNLOAD CV] Button */}
        <div className="w-full md:w-auto flex justify-end shrink-0">
          <button
            onClick={handleDownload}
            className="w-full md:w-[180px] h-[48px] bg-[#10B981] hover:bg-[#059669] text-white border-ink shadow-retro-emerald flex items-center justify-center gap-2 font-pixel text-[10px] md:text-[11px] tracking-wider transition-all active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>DOWNLOAD CV</span>
          </button>
        </div>
      </div>

      {/* Retro dialogue continuation indicator ▼ */}
      <div className="absolute bottom-2 right-4 md:right-52 text-[#EF4444] font-pixel text-[10px] animate-bounce pointer-events-none">
        ▼
      </div>
    </div>
  );
};

