'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PokeBallSprite } from './PokeBallSprite';
import { sound } from '@/lib/soundEffects';

interface PokeBallLoaderProps {
  onLoaded: () => void;
}

export const PokeBallLoader: React.FC<PokeBallLoaderProps> = ({ onLoaded }) => {
  const [stage, setStage] = useState<'dropping' | 'wobbling' | 'caught' | 'opening' | 'done'>('dropping');
  const [wobbleCount, setWobbleCount] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING RESEARCH TERMINAL...');

  useEffect(() => {
    // 1. Drop down
    const dropTimer = setTimeout(() => {
      setStage('wobbling');
      sound.playWobble();
      setStatusText('CONNECTING TO PALLET NETWORK...');
    }, 800);

    return () => clearTimeout(dropTimer);
  }, []);

  useEffect(() => {
    if (stage !== 'wobbling') return;

    if (wobbleCount < 3) {
      const wobbleTimer = setTimeout(() => {
        sound.playWobble();
        setWobbleCount((prev) => prev + 1);
        if (wobbleCount === 0) setStatusText('HYDRATING STARTER PROTOCOLS...');
        if (wobbleCount === 1) setStatusText('CALIBRATING BILL\'S PC SYSTEM...');
      }, 700);
      return () => clearTimeout(wobbleTimer);
    } else {
      // Caught / Gotcha!
      const catchTimer = setTimeout(() => {
        setStage('caught');
        sound.playGotcha();
        setStatusText('★ GOTCHA! WELCOME TO OAK\'S LAB ★');
      }, 500);

      const finishTimer = setTimeout(() => {
        setStage('opening');
      }, 1600);

      const exitTimer = setTimeout(() => {
        setStage('done');
        onLoaded();
      }, 2100);

      return () => {
        clearTimeout(catchTimer);
        clearTimeout(finishTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [stage, wobbleCount, onLoaded]);

  const handleSkip = () => {
    sound.playSelect();
    setStage('done');
    onLoaded();
  };

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="pokeball-loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#CBD5D0] select-none px-4"
        onClick={handleSkip}
      >
        {/* Retro scanline texture */}
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

        {/* Ambient Game Boy border frame */}
        <div className="w-full max-w-lg bg-[#E6EDE8] border-ink-4 shadow-retro-lg p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Light flare flash on catch */}
          {stage === 'opening' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 25, opacity: 0.95 }}
              transition={{ duration: 0.6 }}
              className="absolute w-16 h-16 rounded-full bg-white z-30 pointer-events-none"
            />
          )}

          {/* Top terminal badge */}
          <div className="bg-[#1A202C] text-white px-4 py-1.5 text-[10px] md:text-xs font-pixel tracking-wider mb-8 border-ink">
            TRAINER.DEV // BOOTLOADER v2.4
          </div>

          {/* Centered Pokéball Actor */}
          <div className="relative h-40 flex items-center justify-center">
            {/* Ground Shadow */}
            <motion.div
              animate={
                stage === 'dropping'
                  ? { scale: [0.2, 1.2, 1], opacity: [0.2, 0.6, 0.4] }
                  : stage === 'wobbling'
                  ? {
                      scale: [1, 1.15, 0.9, 1.1, 1],
                      opacity: [0.4, 0.5, 0.4, 0.5, 0.4],
                    }
                  : { scale: 1.2, opacity: 0.6 }
              }
              transition={{ duration: 0.6 }}
              className="absolute -bottom-2 w-28 h-6 bg-[#1A202C] rounded-full opacity-40 blur-[1px]"
            />

            {/* Wobbling / Bouncing Ball */}
            <motion.div
              animate={
                stage === 'dropping'
                  ? { y: [-140, 0, -25, 0], scale: [1, 0.85, 1.05, 1] }
                  : stage === 'wobbling'
                  ? {
                      rotate: [0, -28, 24, -14, 8, 0],
                      x: [0, -6, 6, -3, 2, 0],
                    }
                  : stage === 'caught'
                  ? {
                      scale: [1, 1.2, 1],
                      filter: [
                        'drop-shadow(0 0 0px #06B6D4)',
                        'drop-shadow(0 0 25px #06B6D4)',
                        'drop-shadow(0 0 10px #06B6D4)',
                      ],
                    }
                  : {}
              }
              transition={
                stage === 'dropping'
                  ? { duration: 0.75, ease: 'easeOut' }
                  : stage === 'wobbling'
                  ? { duration: 0.65, ease: 'easeInOut' }
                  : { duration: 0.5 }
              }
              className="relative cursor-pointer"
            >
              <PokeBallSprite
                type="pokeball"
                size={88}
                isHovered={stage === 'caught' || stage === 'opening'}
                isOpen={stage === 'opening'}
              />

              {/* Red glow pulse on center button during wobble */}
              {stage === 'wobbling' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-500 animate-ping opacity-75 pointer-events-none" />
              )}
            </motion.div>
          </div>

          {/* Wobble Star / Sparkle particles */}
          {stage === 'wobbling' && (
            <div className="flex gap-3 my-4">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 border-ink border-2 transition-colors duration-200 ${
                    idx < wobbleCount ? 'bg-[#10B981]' : 'bg-white'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Status dialogue */}
          <div className="mt-6 bg-white w-full border-ink p-3 shadow-retro-sm text-center">
            <p className="font-dialogue text-xl md:text-2xl text-[#1A202C] tracking-wide min-h-[32px]">
              {statusText}
            </p>
          </div>

          {/* Skip helper */}
          <button
            onClick={handleSkip}
            className="mt-6 text-[10px] font-pixel text-[#4B5563] hover:text-[#1A202C] underline cursor-pointer"
          >
            [ CLICK ANYWHERE TO SKIP INTRO ]
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
