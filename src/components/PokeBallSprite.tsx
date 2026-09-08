'use client';

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/soundEffects';

export type PokeBallType =
  | 'pokeball'
  | 'greatball'
  | 'ultraball'
  | 'masterball'
  | 'premierball'
  | 'luxuryball'
  | 'duskball'
  | 'quickball'
  | 'cherishball'
  | 'safariball'
  | 'diveball'
  | 'healball'
  | 'netball'
  | 'heavyball';

export interface PokeBallProps {
  type?: PokeBallType;
  size?: number;
  className?: string;
  isHovered?: boolean;
  isOpen?: boolean;
  wobble?: boolean;
  wobbleOnHover?: boolean;
  interactive?: boolean;
  showShadow?: boolean;
  glowColor?: string;
  onClick?: (e?: React.MouseEvent) => void;
}

export const PokeBallSprite: React.FC<PokeBallProps> = ({
  type = 'pokeball',
  size = 56,
  className = '',
  isHovered = false,
  isOpen = false,
  wobble = false,
  wobbleOnHover = true,
  interactive = false,
  showShadow = true,
  glowColor,
  onClick,
}) => {
  const uniqueId = useId().replace(/:/g, '_');
  const [localHover, setLocalHover] = useState(false);
  const [clickWobble, setClickWobble] = useState(false);

  const activeHover = isHovered || localHover;

  const handleClick = (e: React.MouseEvent) => {
    if (interactive || onClick) {
      sound.playWobble();
      setClickWobble(true);
      setTimeout(() => setClickWobble(false), 950);
    }
    if (onClick) onClick(e);
  };

  // 3D Color palettes and design specifications per ball type
  const getBallSpecs = () => {
    switch (type) {
      case 'greatball':
        return {
          name: 'GREAT BALL',
          topStops: ['#60A5FA', '#2563EB', '#1E40AF', '#172554'],
          bottomStops: ['#FFFFFF', '#F1F5F9', '#CBD5E1', '#64748B'],
          accentType: 'great',
          ledColor: '#38BDF8',
          buttonBevel: ['#FFFFFF', '#CBD5E1', '#475569'],
        };

      case 'ultraball':
        return {
          name: 'ULTRA BALL',
          topStops: ['#475569', '#1E293B', '#0F172A', '#020617'],
          bottomStops: ['#FFFFFF', '#F1F5F9', '#CBD5E1', '#64748B'],
          accentType: 'ultra',
          ledColor: '#F59E0B',
          buttonBevel: ['#FEF08A', '#F59E0B', '#78350F'],
        };

      case 'masterball':
        return {
          name: 'MASTER BALL',
          topStops: ['#C084FC', '#9333EA', '#6B21A8', '#3B0764'],
          bottomStops: ['#FFFFFF', '#F1F5F9', '#CBD5E1', '#64748B'],
          accentType: 'master',
          ledColor: '#F472B6',
          buttonBevel: ['#FDF4FF', '#E879F9', '#701A75'],
        };

      case 'premierball':
        return {
          name: 'PREMIER BALL',
          topStops: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#94A3B8'],
          bottomStops: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#94A3B8'],
          accentType: 'premier',
          ledColor: '#EF4444',
          buttonBevel: ['#FFFFFF', '#E2E8F0', '#475569'],
        };

      case 'luxuryball':
        return {
          name: 'LUXURY BALL',
          topStops: ['#3F3F46', '#18181B', '#09090B', '#000000'],
          bottomStops: ['#3F3F46', '#18181B', '#09090B', '#000000'],
          accentType: 'luxury',
          ledColor: '#EF4444',
          buttonBevel: ['#FEF08A', '#F59E0B', '#78350F'],
        };

      case 'duskball':
        return {
          name: 'DUSK BALL',
          topStops: ['#34D399', '#059669', '#064E3B', '#022C22'],
          bottomStops: ['#475569', '#1E293B', '#0F172A', '#020617'],
          accentType: 'dusk',
          ledColor: '#F97316',
          buttonBevel: ['#FED7AA', '#F97316', '#7C2D12'],
        };

      case 'quickball':
        return {
          name: 'QUICK BALL',
          topStops: ['#38BDF8', '#0284C7', '#0369A1', '#082F49'],
          bottomStops: ['#38BDF8', '#0284C7', '#0369A1', '#082F49'],
          accentType: 'quick',
          ledColor: '#FACC15',
          buttonBevel: ['#FEF08A', '#FACC15', '#854D0E'],
        };

      case 'cherishball':
        return {
          name: 'CHERISH BALL',
          topStops: ['#F87171', '#DC2626', '#991B1B', '#450A0A'],
          bottomStops: ['#F87171', '#DC2626', '#991B1B', '#450A0A'],
          accentType: 'cherish',
          ledColor: '#FFFFFF',
          buttonBevel: ['#FFFFFF', '#E2E8F0', '#475569'],
        };

      case 'safariball':
        return {
          name: 'SAFARI BALL',
          topStops: ['#A3E635', '#65A30D', '#3F6212', '#1A2E05'],
          bottomStops: ['#F5F5F4', '#E7E5E4', '#D6D3D1', '#78716C'],
          accentType: 'safari',
          ledColor: '#84CC16',
          buttonBevel: ['#FFFFFF', '#CBD5E1', '#475569'],
        };

      case 'diveball':
        return {
          name: 'DIVE BALL',
          topStops: ['#67E8F9', '#06B6D4', '#0E7490', '#164E63'],
          bottomStops: ['#FFFFFF', '#E0F2FE', '#BAE6FD', '#38BDF8'],
          accentType: 'dive',
          ledColor: '#22D3EE',
          buttonBevel: ['#FFFFFF', '#A5F3FC', '#0891B2'],
        };

      case 'healball':
        return {
          name: 'HEAL BALL',
          topStops: ['#F472B6', '#EC4899', '#BE185D', '#500724'],
          bottomStops: ['#FFFFFF', '#FDF2F8', '#FCE7F3', '#F472B6'],
          accentType: 'heal',
          ledColor: '#38BDF8',
          buttonBevel: ['#FFFFFF', '#FBCFE8', '#BE185D'],
        };

      case 'netball':
        return {
          name: 'NET BALL',
          topStops: ['#2DD4BF', '#0D9488', '#115E59', '#042F2E'],
          bottomStops: ['#FFFFFF', '#F1F5F9', '#CBD5E1', '#64748B'],
          accentType: 'net',
          ledColor: '#2DD4BF',
          buttonBevel: ['#FFFFFF', '#99F6E4', '#0F766E'],
        };

      case 'heavyball':
        return {
          name: 'HEAVY BALL',
          topStops: ['#94A3B8', '#64748B', '#334155', '#0F172A'],
          bottomStops: ['#94A3B8', '#64748B', '#334155', '#0F172A'],
          accentType: 'heavy',
          ledColor: '#38BDF8',
          buttonBevel: ['#E2E8F0', '#94A3B8', '#1E293B'],
        };

      case 'pokeball':
      default:
        return {
          name: 'POKÉ BALL',
          topStops: ['#FF6B6B', '#EF4444', '#B91C1C', '#7F1D1D'],
          bottomStops: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#94A3B8'],
          accentType: 'standard',
          ledColor: '#38BDF8',
          buttonBevel: ['#FFFFFF', '#E2E8F0', '#475569'],
        };
    }
  };

  const ball = getBallSpecs();
  const shouldWobble = wobble || clickWobble || (wobbleOnHover && activeHover);
  const activeLedColor = glowColor || (activeHover || clickWobble ? ball.ledColor : '#FFFFFF');

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => {
        setLocalHover(true);
        if (interactive) sound.playHover();
      }}
      onMouseLeave={() => setLocalHover(false)}
      className={`relative inline-flex flex-col items-center justify-center select-none ${
        interactive || onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 1. DYNAMIC GROUND DROP SHADOW (Reacts in sync with 3D rocking) */}
      {showShadow && (
        <motion.div
          animate={
            shouldWobble
              ? {
                  scaleX: [1, 1.25, 0.85, 1.15, 0.95, 1],
                  scaleY: [1, 0.85, 1.15, 0.9, 1.05, 1],
                  x: [0, 6, -5, 3, -1.5, 0],
                  opacity: [0.45, 0.6, 0.35, 0.55, 0.45],
                }
              : {
                  scaleX: activeHover ? 1.15 : 1,
                  scaleY: activeHover ? 0.9 : 1,
                  x: 0,
                  opacity: activeHover ? 0.55 : 0.35,
                }
          }
          transition={{
            duration: shouldWobble ? 0.95 : 0.25,
            repeat: wobble ? Infinity : 0,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1.5 w-[84%] h-[20%] bg-[#0B1120] rounded-full blur-[2.5px] pointer-events-none z-0"
        />
      )}

      {/* 2. 3D BALL SPHERICAL VECTOR ACTOR */}
      <motion.div
        animate={
          shouldWobble
            ? {
                rotate: [0, -26, 22, -14, 8, -3, 0],
                x: [0, -5, 4, -2.5, 1.5, -0.5, 0],
                y: activeHover ? -6 : 0,
                scaleX: [1, 1.04, 0.97, 1.02, 0.99, 1],
                scaleY: [1, 0.96, 1.03, 0.98, 1.01, 1],
              }
            : {
                rotate: 0,
                x: 0,
                y: activeHover ? -6 : 0,
                scale: activeHover ? 1.06 : 1,
              }
        }
        transition={{
          rotate: shouldWobble
            ? { duration: 0.95, ease: [0.36, 0.07, 0.19, 0.97], repeat: wobble ? Infinity : 0 }
            : { duration: 0.25 },
          x: shouldWobble
            ? { duration: 0.95, ease: [0.36, 0.07, 0.19, 0.97], repeat: wobble ? Infinity : 0 }
            : { duration: 0.25 },
          y: { type: 'spring', stiffness: 420, damping: 22 },
          scale: { type: 'spring', stiffness: 420, damping: 22 },
          scaleX: shouldWobble
            ? { duration: 0.95, ease: 'easeInOut', repeat: wobble ? Infinity : 0 }
            : { duration: 0.25 },
          scaleY: shouldWobble
            ? { duration: 0.95, ease: 'easeInOut', repeat: wobble ? Infinity : 0 }
            : { duration: 0.25 },
        }}
        style={{ transformOrigin: '50% 88%' }}
        className="w-full h-full relative z-10 filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <defs>
            {/* Top Shell 3D Radial Sphere Lighting Shader */}
            <radialGradient id={`grad-top-${uniqueId}`} cx="32%" cy="24%" r="76%">
              <stop offset="0%" stopColor={ball.topStops[0]} />
              <stop offset="48%" stopColor={ball.topStops[1]} />
              <stop offset="82%" stopColor={ball.topStops[2]} />
              <stop offset="100%" stopColor={ball.topStops[3]} />
            </radialGradient>

            {/* Bottom Shell 3D Radial Sphere Lighting Shader */}
            <radialGradient id={`grad-bottom-${uniqueId}`} cx="34%" cy="66%" r="72%">
              <stop offset="0%" stopColor={ball.bottomStops[0]} />
              <stop offset="45%" stopColor={ball.bottomStops[1]} />
              <stop offset="78%" stopColor={ball.bottomStops[2]} />
              <stop offset="100%" stopColor={ball.bottomStops[3]} />
            </radialGradient>

            {/* Primary Specular Dome Gloss Flare */}
            <radialGradient id={`gloss-${uniqueId}`} cx="32%" cy="20%" r="48%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Secondary Ground Bounce Reflection Flare */}
            <radialGradient id={`bounce-${uniqueId}`} cx="48%" cy="92%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* 3D Sphere Perimeter Rim Occlusion Shader */}
            <radialGradient id={`rim-shadow-${uniqueId}`} cx="50%" cy="50%" r="50%">
              <stop offset="72%" stopColor="#000000" stopOpacity="0" />
              <stop offset="90%" stopColor="#000000" stopOpacity="0.32" />
              <stop offset="98%" stopColor="#000000" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
            </radialGradient>

            {/* Metallic Chamfer Gradient for Outer Button Collar */}
            <linearGradient id={`btn-bevel-${uniqueId}`} x1="15%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor={ball.buttonBevel[0]} />
              <stop offset="50%" stopColor={ball.buttonBevel[1]} />
              <stop offset="100%" stopColor={ball.buttonBevel[2]} />
            </linearGradient>

            {/* Tactile Button Dome Gradient */}
            <radialGradient id={`btn-dome-${uniqueId}`} cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor={activeLedColor} />
              <stop offset="100%" stopColor="#0F172A" />
            </radialGradient>

            {/* Shell Hemisphere Clip-Paths */}
            <clipPath id={`clip-top-${uniqueId}`}>
              <rect x="0" y="0" width="100" height="50" />
            </clipPath>
            <clipPath id={`clip-bottom-${uniqueId}`}>
              <rect x="0" y="50" width="100" height="50" />
            </clipPath>
          </defs>

          {/* 1. SOLID DEEP INNER SPHERE CORE */}
          <circle cx="50" cy="50" r="47.5" fill="#0A0F1D" />

          {/* 2. TOP HEMISPHERE (With 3D Curved Sphere Shading) */}
          <g clipPath={`url(#clip-top-${uniqueId})`}>
            {/* Top Base Curved Shell */}
            <circle cx="50" cy="50" r="47" fill={`url(#grad-top-${uniqueId})`} />

            {/* GREAT BALL: Dual Aerodynamic Curved Fins */}
            {ball.accentType === 'great' && (
              <>
                <path
                  d="M 17 14 C 25 24, 31 37, 29 50 L 15 50 C 15 34, 11 22, 17 14 Z"
                  fill="#EF4444"
                  stroke="#991B1B"
                  strokeWidth="1.2"
                />
                <path
                  d="M 83 14 C 75 24, 69 37, 71 50 L 85 50 C 85 34, 89 22, 83 14 Z"
                  fill="#EF4444"
                  stroke="#991B1B"
                  strokeWidth="1.2"
                />
                <path d="M 21 16 Q 27 30 25 48" stroke="#FCA5A5" strokeWidth="1.2" fill="none" opacity="0.85" />
                <path d="M 79 16 Q 73 30 75 48" stroke="#FCA5A5" strokeWidth="1.2" fill="none" opacity="0.85" />
              </>
            )}

            {/* ULTRA BALL: Golden H-Brace Chassis */}
            {ball.accentType === 'ultra' && (
              <>
                <path d="M 22 8 L 35 8 L 41 46 L 29 46 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
                <path d="M 78 8 L 65 8 L 59 46 L 71 46 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
                <rect x="29" y="14" width="42" height="10" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
                <rect x="31" y="16" width="38" height="2" fill="#FEF08A" />
                <line x1="25" y1="10" x2="33" y2="44" stroke="#FEF08A" strokeWidth="1" opacity="0.8" />
                <line x1="75" y1="10" x2="67" y2="44" stroke="#FEF08A" strokeWidth="1" opacity="0.8" />
              </>
            )}

            {/* MASTER BALL: Imperial Magenta Domes & Embossed 'M' Badge */}
            {ball.accentType === 'master' && (
              <>
                {/* Left Dome */}
                <circle cx="25" cy="27" r="11.5" fill="#DB2777" stroke="#831843" strokeWidth="1.2" />
                <circle cx="23" cy="24" r="4.5" fill="#F472B6" opacity="0.85" />
                <circle cx="21" cy="22" r="1.5" fill="#FFFFFF" opacity="0.9" />

                {/* Right Dome */}
                <circle cx="75" cy="27" r="11.5" fill="#DB2777" stroke="#831843" strokeWidth="1.2" />
                <circle cx="73" cy="24" r="4.5" fill="#F472B6" opacity="0.85" />
                <circle cx="71" cy="22" r="1.5" fill="#FFFFFF" opacity="0.9" />

                {/* Embossed 'M' Monogram */}
                <text
                  x="50"
                  y="33"
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  fill="#FFFFFF"
                  stroke="#4C1D95"
                  strokeWidth="1.5"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                >
                  M
                </text>
              </>
            )}

            {/* QUICK BALL: 4-Point Golden Lightning Starburst */}
            {ball.accentType === 'quick' && (
              <>
                <polygon
                  points="50,4 56,22 74,18 62,32 70,47 50,38 30,47 38,32 26,18 44,22"
                  fill="#FACC15"
                  stroke="#CA8A04"
                  strokeWidth="1.2"
                />
                <circle cx="50" cy="50" r="19" fill="#0284C7" />
              </>
            )}

            {/* DUSK BALL: Glowing Orange Orbs & Obsidian Chevrons */}
            {ball.accentType === 'dusk' && (
              <>
                <path d="M 15 48 Q 50 15 85 48" stroke="#0F172A" strokeWidth="5" fill="none" />
                <circle cx="28" cy="28" r="8.5" fill="#F97316" stroke="#9A3412" strokeWidth="1.2" />
                <circle cx="26" cy="26" r="3.5" fill="#FED7AA" opacity="0.9" />
                <circle cx="72" cy="28" r="8.5" fill="#F97316" stroke="#9A3412" strokeWidth="1.2" />
                <circle cx="70" cy="26" r="3.5" fill="#FED7AA" opacity="0.9" />
                <circle cx="50" cy="17" r="6.5" fill="#F97316" stroke="#9A3412" strokeWidth="1.2" />
                <circle cx="48.5" cy="15.5" r="2.5" fill="#FED7AA" opacity="0.9" />
              </>
            )}

            {/* LUXURY BALL: Polished Gold Crown Trims */}
            {ball.accentType === 'luxury' && (
              <>
                <path
                  d="M 18 46 L 28 14 L 40 46 L 50 20 L 60 46 L 72 14 L 82 46 Z"
                  fill="#F59E0B"
                  stroke="#B45309"
                  strokeWidth="1.2"
                />
                <line x1="18" y1="46" x2="82" y2="46" stroke="#EF4444" strokeWidth="2.5" />
                <line x1="28" y1="16" x2="38" y2="44" stroke="#FEF08A" strokeWidth="1" />
                <line x1="72" y1="16" x2="62" y2="44" stroke="#FEF08A" strokeWidth="1" />
              </>
            )}

            {/* SAFARI BALL: Woodland Camo Patches */}
            {ball.accentType === 'safari' && (
              <>
                <path d="M 20 18 Q 32 12 36 26 Q 42 36 30 42 Q 18 36 20 18 Z" fill="#3F6212" />
                <path d="M 64 16 Q 78 20 74 34 Q 66 44 58 36 Q 54 24 64 16 Z" fill="#4D7C0F" />
                <path d="M 44 8 Q 56 6 54 18 Q 48 24 42 16 Z" fill="#78350F" />
              </>
            )}

            {/* DIVE BALL: Oceanic Wave Crests */}
            {ball.accentType === 'dive' && (
              <>
                <path d="M 10 46 Q 30 20 50 46 Q 70 20 90 46" stroke="#0E7490" strokeWidth="4" fill="none" />
                <path d="M 18 38 Q 34 16 50 38 Q 66 16 82 38" stroke="#E0F2FE" strokeWidth="2.5" fill="none" />
              </>
            )}

            {/* HEAL BALL: Magenta Cross Rings */}
            {ball.accentType === 'heal' && (
              <>
                <ellipse cx="50" cy="30" rx="32" ry="12" fill="none" stroke="#DB2777" strokeWidth="3" />
                <ellipse cx="50" cy="30" rx="30" ry="10" fill="none" stroke="#FBCFE8" strokeWidth="1" />
              </>
            )}

            {/* NET BALL: Cyan Interlocking Crosshatch Mesh */}
            {ball.accentType === 'net' && (
              <>
                <path d="M 22 10 L 78 48 M 78 10 L 22 48" stroke="#042F2E" strokeWidth="3" />
                <path d="M 50 4 L 50 48 M 12 30 L 88 30" stroke="#042F2E" strokeWidth="3" />
                <circle cx="50" cy="30" r="5" fill="#2DD4BF" stroke="#042F2E" strokeWidth="1.5" />
              </>
            )}

            {/* HEAVY BALL: Cobalt Blue Compression Studs */}
            {ball.accentType === 'heavy' && (
              <>
                <circle cx="26" cy="24" r="6" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.5" />
                <circle cx="74" cy="24" r="6" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.5" />
                <circle cx="50" cy="14" r="5" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.5" />
              </>
            )}
          </g>

          {/* 3. BOTTOM HEMISPHERE (With 3D Curved Light & Shadow) */}
          <g clipPath={`url(#clip-bottom-${uniqueId})`}>
            {/* Base Bottom Curved Shell */}
            <circle cx="50" cy="50" r="47" fill={`url(#grad-bottom-${uniqueId})`} />

            {/* Ground bounce reflection on bottom dome */}
            <circle cx="50" cy="50" r="47" fill={`url(#bounce-${uniqueId})`} pointerEvents="none" />

            {/* PREMIER BALL: Crimson Equatorial Seam Ribbon */}
            {ball.accentType === 'premier' && (
              <path d="M 3 50 Q 50 56 97 50 L 97 54 Q 50 60 3 54 Z" fill="#DC2626" />
            )}

            {/* LUXURY BALL: Bottom Gold Trim Bands */}
            {ball.accentType === 'luxury' && (
              <>
                <path d="M 22 52 L 32 80 L 42 52 L 50 72 L 58 52 L 68 80 L 78 52 Z" fill="#F59E0B" opacity="0.9" />
                <line x1="20" y1="52" x2="80" y2="52" stroke="#EF4444" strokeWidth="2.5" />
              </>
            )}
          </g>

          {/* 4. PRIMARY 3D SPECULAR GLOSS HIGHLIGHT (Curved Glassy Reflection) */}
          <ellipse
            cx="36"
            cy="20"
            rx="21"
            ry="11"
            fill={`url(#gloss-${uniqueId})`}
            transform="rotate(-20 36 20)"
            pointerEvents="none"
          />
          {/* Intense hot-spot specular pinprick */}
          <ellipse
            cx="28"
            cy="15"
            rx="5.5"
            ry="2.8"
            fill="#FFFFFF"
            opacity="0.95"
            transform="rotate(-20 28 15)"
            pointerEvents="none"
          />

          {/* 5. 3D SPHERE PERIMETER RIM OCCLUSION VIGNETTE */}
          <circle cx="50" cy="50" r="47" fill={`url(#rim-shadow-${uniqueId})`} pointerEvents="none" />

          {/* 6. PHYSICAL 3D EQUATORIAL RECESSED SEAM TRENCH */}
          {/* Deep inner groove trench */}
          <path d="M 3 50 L 97 50" stroke="#0A0F1D" strokeWidth="6.5" strokeLinecap="round" />
          {/* Top shell bevel lip highlight */}
          <path d="M 4 47.2 L 96 47.2" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.45" />
          {/* Bottom shell inner groove shadow */}
          <path d="M 4 51.5 L 96 51.5" stroke="#000000" strokeWidth="1.2" opacity="0.75" />

          {/* 7. 3D CENTER RELEASE BUTTON ASSEMBLY */}
          {/* Outer Chamfered Metallic Bezel Ring */}
          <circle
            cx="50"
            cy="50"
            r="16.5"
            fill={`url(#btn-bevel-${uniqueId})`}
            stroke="#0A0F1D"
            strokeWidth="2.8"
          />

          {/* Recessed Inner Socket Moat */}
          <circle cx="50" cy="50" r="11.8" fill="#0A0F1D" />

          {/* Convex Center Tactile Push-Button */}
          <circle
            cx="50"
            cy="50"
            r="8.5"
            fill={`url(#btn-dome-${uniqueId})`}
            stroke="#1E293B"
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* Center LED Core Lens Diode */}
          <circle
            cx="50"
            cy="50"
            r="5"
            fill={activeLedColor}
            opacity={activeHover || clickWobble ? 1 : 0.9}
            className="transition-all duration-300"
          />

          {/* Button Specular Micro-Dot */}
          <circle cx="47.5" cy="47.5" r="2.2" fill="#FFFFFF" opacity={activeHover || clickWobble ? 0.98 : 0.75} />

          {/* 8. OPEN / CAPTURE ENERGY FLARE */}
          {isOpen && (
            <g>
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.5"
                opacity="0.9"
                className="animate-ping"
              />
              <line x1="50" y1="10" x2="50" y2="0" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              <line x1="90" y1="50" x2="100" y2="50" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="90" x2="50" y2="100" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              <line x1="10" y1="50" x2="0" y2="50" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </svg>

        {/* 9. INTERACTIVE LED HALO PULSE ON HOVER OR CLICK */}
        <AnimatePresence>
          {(activeHover || clickWobble) && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full blur-[2px] pointer-events-none z-20"
              style={{ backgroundColor: `${activeLedColor}50` }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
