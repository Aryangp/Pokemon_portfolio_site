'use client';

import React from 'react';
import Image from 'next/image';
import { Zap } from 'lucide-react';

interface PikachuAvatarProps {
  size?: number;
  className?: string;
  isStreaming?: boolean;
  showBadge?: boolean;
}

export const PikachuAvatar: React.FC<PikachuAvatarProps> = ({
  size = 68,
  className = '',
  isStreaming = false,
  showBadge = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center bg-gradient-to-b from-[#FEF08A] via-[#FDE047] to-[#EAB308] border-ink shadow-retro-sm overflow-hidden select-none shrink-0 ${
        isStreaming ? 'ring-2 ring-amber-400 ring-offset-1 animate-pulse' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/pikachu_avatar.png"
        alt="Pikachu AI Assistant"
        width={size * 2}
        height={size * 2}
        className={`w-full h-full object-cover object-center scale-110 drop-shadow-sm transition-transform duration-200 ${
          isStreaming ? 'scale-120' : 'hover:scale-125'
        }`}
        priority
      />

      {showBadge && (
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-amber-400 border border-black flex items-center justify-center shadow-xs">
          <Zap className="w-2.5 h-2.5 text-amber-950 fill-amber-950" />
        </div>
      )}

      {isStreaming && (
        <span className="absolute top-0.5 right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
      )}
    </div>
  );
};
