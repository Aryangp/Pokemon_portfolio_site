'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/soundEffects';
import { Sparkles, Heart } from 'lucide-react';

export const AboutPartyView: React.FC = () => {
  const [clickedPokemon, setClickedPokemon] = useState<string | null>(null);

  const handlePokemonClick = (name: string, soundQuote: string) => {
    sound.playSelect();
    setClickedPokemon(`${name}: "${soundQuote}"`);
    setTimeout(() => setClickedPokemon(null), 3000);
  };

  return (
    <div className="w-full max-w-[1050px] min-h-[640px] bg-[#E2F0D9] border-gba shadow-gba-lg flex flex-col justify-between select-none mx-auto overflow-hidden">
      
      {/* Main Split: Left Pixel Art Picnic Scene vs Right Narrative Story */}
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
        
        {/* LEFT: LUSH OUTDOOR PIXEL TREE & PARTY SCENE (Screenshot 4 Match) (6 cols) */}
        <div className="md:col-span-6 bg-gradient-to-b from-[#BAE6FD] via-[#BBF7D0] to-[#86EFAC] p-6 flex flex-col items-center justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-[#1A202C]">
          
          {/* Outdoor Picnic Art Frame */}
          <div className="relative w-full h-[360px] flex items-center justify-center">
            <svg viewBox="0 0 400 360" className="w-full h-full drop-shadow-md">
              {/* Sky & Clouds */}
              <ellipse cx="80" cy="50" rx="30" ry="12" fill="#FFFFFF" opacity="0.8" />
              <ellipse cx="100" cy="45" rx="20" ry="10" fill="#FFFFFF" opacity="0.8" />
              <ellipse cx="320" cy="70" rx="40" ry="14" fill="#FFFFFF" opacity="0.8" />

              {/* Giant Shady Oak Tree */}
              <rect x="70" y="80" width="36" height="200" fill="#854D0E" stroke="#1A202C" strokeWidth="3" />
              {/* Foliage Clusters */}
              <circle cx="90" cy="90" r="60" fill="#15803D" stroke="#1A202C" strokeWidth="3" />
              <circle cx="50" cy="110" r="45" fill="#16A34A" stroke="#1A202C" strokeWidth="3" />
              <circle cx="130" cy="110" r="50" fill="#22C55E" stroke="#1A202C" strokeWidth="3" />
              <circle cx="90" cy="50" r="40" fill="#4ADE80" stroke="#1A202C" strokeWidth="2.5" />

              {/* Rolling Meadow Hill */}
              <path d="M 0 260 Q 200 220 400 260 L 400 360 L 0 360 Z" fill="#4ADE80" stroke="#1A202C" strokeWidth="3" />
              {/* Picnic Blanket */}
              <polygon points="120,270 240,270 260,310 100,310" fill="#EF4444" stroke="#1A202C" strokeWidth="2.5" />
              <polygon points="130,275 230,275 245,305 115,305" fill="#FFFFFF" />

              {/* Trainer Resting Under Tree */}
              <g transform="translate(130, 230) scale(0.9)">
                {/* Body relaxing against tree */}
                <rect x="20" y="24" width="22" height="32" rx="4" fill="#DC2626" stroke="#1A202C" strokeWidth="2" />
                <rect x="24" y="10" width="16" height="16" rx="2" fill="#FCD34D" stroke="#1A202C" strokeWidth="2" />
                <path d="M 22 10 C 22 4, 42 4, 42 10 Z" fill="#8B5A2B" stroke="#1A202C" strokeWidth="2" />
                <polygon points="26,24 32,32 38,24" fill="#FFFFFF" />
              </g>

              {/* SNORLAX Sleeping on Grass (Right) */}
              <g transform="translate(260, 220) scale(1.1)" className="cursor-pointer" onClick={() => handlePokemonClick('Snorlax', 'Zzz... Snorlax woke up refreshed and reviewed PRs!')}>
                {/* Belly */}
                <ellipse cx="40" cy="50" rx="34" ry="28" fill="#1E3A8A" stroke="#1A202C" strokeWidth="3" />
                <ellipse cx="40" cy="52" rx="24" ry="20" fill="#FEF3C7" stroke="#1A202C" strokeWidth="2" />
                {/* Head */}
                <ellipse cx="40" cy="24" rx="18" ry="14" fill="#1E3A8A" stroke="#1A202C" strokeWidth="2.5" />
                <polygon points="24,14 26,4 32,16" fill="#1E3A8A" stroke="#1A202C" strokeWidth="2" />
                <polygon points="56,14 54,4 48,16" fill="#1E3A8A" stroke="#1A202C" strokeWidth="2" />
                <ellipse cx="40" cy="26" rx="12" ry="9" fill="#FEF3C7" />
                {/* Sleeping Closed Eyes */}
                <line x1="33" y1="24" x2="37" y2="24" stroke="#1A202C" strokeWidth="2" />
                <line x1="43" y1="24" x2="47" y2="24" stroke="#1A202C" strokeWidth="2" />
                {/* ZZZ indicator */}
                <text x="58" y="10" fontFamily="monospace" fontSize="14" fill="#1E40AF" fontWeight="bold">Z</text>
                <text x="66" y="2" fontFamily="monospace" fontSize="11" fill="#3B82F6" fontWeight="bold">z</text>
              </g>

              {/* ALAKAZAM Standing Meditating (Center Back) */}
              <g transform="translate(200, 175) scale(0.85)" className="cursor-pointer" onClick={() => handlePokemonClick('Alakazam', 'Alakazam calculated 100% test coverage with mental psionics!')}>
                <rect x="22" y="18" width="18" height="24" fill="#F59E0B" stroke="#1A202C" strokeWidth="2" />
                <polygon points="20,18 31,4 42,18" fill="#D97706" stroke="#1A202C" strokeWidth="2" />
                <polygon points="12,28 31,48 50,28" fill="#78350F" />
                {/* Spoons */}
                <line x1="12" y1="20" x2="6" y2="35" stroke="#E2E8F0" strokeWidth="3" />
                <line x1="50" y1="20" x2="56" y2="35" stroke="#E2E8F0" strokeWidth="3" />
              </g>

              {/* EEVEE Sitting by Picnic (Bottom Left) */}
              <g transform="translate(100, 270) scale(0.9)" className="cursor-pointer" onClick={() => handlePokemonClick('Eevee', 'Vee! Eevee is ready to evolve into any modern framework!')}>
                <ellipse cx="24" cy="28" rx="14" ry="12" fill="#B45309" stroke="#1A202C" strokeWidth="2" />
                <circle cx="24" cy="14" r="10" fill="#B45309" stroke="#1A202C" strokeWidth="2" />
                {/* Big Ears */}
                <polygon points="14,12 6,0 20,8" fill="#78350F" stroke="#1A202C" strokeWidth="1.5" />
                <polygon points="34,12 42,0 28,8" fill="#78350F" stroke="#1A202C" strokeWidth="1.5" />
                {/* Fluffy White Collar */}
                <circle cx="24" cy="24" r="7" fill="#FEF3C7" stroke="#1A202C" strokeWidth="1.5" />
              </g>

              {/* CHANSEY / BLISSEY (Bottom Center) */}
              <g transform="translate(195, 260) scale(0.85)" className="cursor-pointer" onClick={() => handlePokemonClick('Blissey', 'Blissey restored 100% server uptime and high team morale!')}>
                <ellipse cx="28" cy="26" rx="20" ry="18" fill="#F472B6" stroke="#1A202C" strokeWidth="2" />
                <ellipse cx="28" cy="26" rx="10" ry="12" fill="#FDF2F8" />
                {/* Egg */}
                <ellipse cx="28" cy="30" rx="7" ry="9" fill="#FFFFFF" stroke="#1A202C" strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* Interactive Speech Toast */}
          {clickedPokemon ? (
            <div className="bg-white border-2 border-black p-2 font-pixel text-[8.5px] text-[#1A202C] shadow-sm animate-bounce">
              {clickedPokemon}
            </div>
          ) : (
            <div className="font-pixel text-[8px] text-[#166534] bg-white/70 px-2 py-0.5 border border-green-800 rounded-full">
              ★ Click any Pokémon in the party to interact!
            </div>
          )}

        </div>

        {/* RIGHT: STORY & BIO CARD (Screenshot 4 Match) (6 cols) */}
        <div className="md:col-span-6 bg-[#FFFFFF] p-6 md:p-8 flex flex-col justify-between gap-4">
          
          <div>
            <div className="border-b-2 border-gray-200 pb-3 mb-4">
              <h2 className="font-pixel text-base md:text-lg text-[#1A202C] font-bold">
                My Story:
              </h2>
              <h3 className="font-dialogue text-2xl text-[#10B981] font-bold">
                Why I Love Building This World
              </h3>
            </div>

            <div className="flex flex-col gap-3 font-dialogue text-lg md:text-xl text-[#334155] leading-relaxed">
              <p>
                My journey in technology began with a deep love for exploratory systems and interactive software. Just like assembling a well-balanced Pokémon team, constructing production applications requires harmony across frontend ergonomics, robust backend architecture, and bulletproof reliability.
              </p>
              <p>
                Over the past 3+ years, I&apos;ve dedicated myself to mastering modern full-stack web standards: sub-50ms token routing with Next.js Server Actions, distributed caching layers, accessible component design systems, and autonomous agent workflows.
              </p>
              <p>
                I thrive in environments where creativity meets engineering rigor—building products that delight users and stand resilient under high traffic.
              </p>
            </div>
          </div>

          {/* Bottom Mini Sprite Lineup */}
          <div className="pt-3 border-t-2 border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="font-pixel text-[8.5px] text-[#475569]">
                STATUS: READY FOR THE NEXT EXPEDITION
              </span>
            </div>
            <span className="font-pixel text-[8.5px] text-[#10B981]">
              PALLET TOWN, 2026
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
