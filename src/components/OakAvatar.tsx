'use client';

import React from 'react';
import Image from 'next/image';

interface OakAvatarProps {
  size?: number;
  className?: string;
  showBadge?: boolean;
}

export const OakAvatar: React.FC<OakAvatarProps> = ({
  size = 68,
  className = '',
  showBadge = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] border-ink shadow-retro-sm overflow-hidden select-none shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/professor_oak_avatar.png"
        alt="Professor Aryan"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-cover object-top scale-110 drop-shadow-sm transition-transform duration-200 hover:scale-125"
        priority
      />

      {showBadge && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border border-black rounded-full" />
      )}
    </div>
  );
};

