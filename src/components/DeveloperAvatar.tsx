'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/lib/soundEffects';

interface DeveloperAvatarProps {
  onAvatarClick?: () => void;
  className?: string;
}

export const DeveloperAvatar: React.FC<DeveloperAvatarProps> = ({
  onAvatarClick,
  className = '',
}) => {
  const [isTyping, setIsTyping] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleClick = () => {
    sound.playSelect();
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount % 3 === 0) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 2400);
    }
    if (onAvatarClick) onAvatarClick();
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble / Easter Egg */}
      {showEasterEgg && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: -8, scale: 1 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-12 z-20 bg-white px-3 py-1.5 border-ink shadow-retro-sm rounded-none text-[11px] font-pixel text-[#1A202C] whitespace-nowrap"
        >
          <span>BUILDING NEXT.JS APPS! ⚡</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1A202C]" />
        </motion.div>
      )}

      {/* Main Avatar & Desk Container (96px x 128px) */}
      <div
        onClick={handleClick}
        className="w-[96px] h-[128px] relative cursor-pointer group"
        title="Professor Aryan / Lead Dev (Click to interact!)"
      >
        <svg
          viewBox="0 0 96 128"
          className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
        >
          {/* Shadow beneath desk */}
          <ellipse cx="48" cy="120" rx="42" ry="6" fill="#1A202C" opacity="0.3" />

          {/* Retro Computer Desk */}
          <rect x="8" y="78" width="80" height="42" fill="#4B5563" stroke="#1A202C" strokeWidth="3" />
          <rect x="12" y="82" width="72" height="4" fill="#6B7280" />
          
          {/* Desk Drawer Handles */}
          <rect x="62" y="92" width="18" height="10" fill="#374151" stroke="#1A202C" strokeWidth="2" />
          <rect x="66" y="96" width="10" height="2" fill="#9CA3AF" />
          <rect x="62" y="106" width="18" height="10" fill="#374151" stroke="#1A202C" strokeWidth="2" />
          <rect x="66" y="110" width="10" height="2" fill="#9CA3AF" />

          {/* Pixel Monitor Stand */}
          <rect x="22" y="72" width="16" height="8" fill="#374151" stroke="#1A202C" strokeWidth="2" />
          <rect x="18" y="78" width="24" height="3" fill="#1F2937" stroke="#1A202C" strokeWidth="1.5" />

          {/* Pixel Monitor Screen */}
          <rect x="10" y="38" width="40" height="34" rx="2" fill="#1F2937" stroke="#1A202C" strokeWidth="3" />
          {/* Glowing Green/Cyan Phosphor Screen */}
          <rect x="14" y="42" width="32" height="26" fill="#064E3B" />
          <line x1="17" y1="47" x2="36" y2="47" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
          <line x1="17" y1="52" x2="42" y2="52" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <line x1="17" y1="57" x2="28" y2="57" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
          <line x1="17" y1="62" x2="38" y2="62" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />

          {/* Animated Blinking Cursor on Screen */}
          <rect x="30" y="56" width="3" height="3" fill="#A7F3D0">
            <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
          </rect>

          {/* Developer / Professor Character Behind Desk */}
          {/* Hair & Cap */}
          <rect x="52" y="14" width="28" height="16" rx="4" fill="#3B82F6" stroke="#1A202C" strokeWidth="2.5" />
          <polygon points="46,24 54,20 54,26" fill="#2563EB" stroke="#1A202C" strokeWidth="2" />
          {/* White Pokeball symbol on cap */}
          <circle cx="66" cy="22" r="4" fill="#FFFFFF" stroke="#1A202C" strokeWidth="1.5" />
          <circle cx="66" cy="22" r="1.5" fill="#EF4444" />

          {/* Face */}
          <rect x="54" y="24" width="22" height="20" fill="#FCD34D" stroke="#1A202C" strokeWidth="2.5" />
          
          {/* Eye */}
          <rect x="57" y="30" width="3" height="5" fill="#1A202C" />
          <rect x="57" y="30" width="1" height="2" fill="#FFFFFF" />

          {/* Cheerful dev smile */}
          <path d="M 57 38 Q 62 42 66 38" stroke="#1A202C" strokeWidth="1.5" fill="none" />

          {/* Lab Coat / Red Trainer Jacket */}
          <rect x="50" y="44" width="28" height="36" fill="#DC2626" stroke="#1A202C" strokeWidth="2.5" />
          {/* White Lab Coat Lapels */}
          <polygon points="50,44 60,60 56,80 50,80" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
          <polygon points="78,44 68,60 72,80 78,80" fill="#FFFFFF" stroke="#1A202C" strokeWidth="2" />
          <rect x="62" y="46" width="6" height="30" fill="#111827" />

          {/* Animated Typing Arm / Hands */}
          <g>
            <rect x="36" y="70" width="16" height="8" rx="2" fill="#DC2626" stroke="#1A202C" strokeWidth="2" />
            <circle cx="34" cy="74" r="4" fill="#FCD34D" stroke="#1A202C" strokeWidth="1.5">
              <animate attributeName="cy" values="74;71;74" dur="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="44" cy="74" r="4" fill="#FCD34D" stroke="#1A202C" strokeWidth="1.5">
              <animate attributeName="cy" values="72;75;72" dur="0.3s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Pixel Keyboard */}
          <rect x="26" y="74" width="22" height="4" fill="#D1D5DB" stroke="#1A202C" strokeWidth="1.5" />

          {/* Coffee Mug on Desk */}
          <rect x="74" y="68" width="10" height="12" rx="1" fill="#3B82F6" stroke="#1A202C" strokeWidth="2" />
          <path d="M 84 71 C 88 71, 88 77, 84 77" stroke="#1A202C" strokeWidth="2" fill="none" />
          <line x1="77" y1="64" x2="77" y2="60" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.6">
            <animate attributeName="y2" values="60;56;60" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line x1="81" y1="65" x2="81" y2="61" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.6">
            <animate attributeName="y2" values="61;57;61" dur="1.2s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Hover label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#1A202C] text-white text-[9px] font-pixel px-1.5 py-0.5 pointer-events-none z-10">
          DEV SPRITE
        </div>
      </div>
    </div>
  );
};
