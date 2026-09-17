'use client';

import React, { useState } from 'react';
import { sound } from '@/lib/soundEffects';
import { DEFAULT_RESUME_DATA, DeveloperProfile } from '@/data/resumeData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PokeNavViewProps {
  profile?: DeveloperProfile;
}

export const PokeNavView: React.FC<PokeNavViewProps> = ({
  profile = DEFAULT_RESUME_DATA.profile,
}) => {
  const currentProfile = profile || DEFAULT_RESUME_DATA.profile;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    sound.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#EF4444', '#FBBF24'],
    });

    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-[1000px] min-h-[640px] flex items-center justify-center p-2 md:p-6 select-none mx-auto">
      
      {/* HANDHELD POKÉNAV GBA PHYSICAL DEVICE CASING (Screenshot 5 Match) */}
      <div className="w-full bg-gradient-to-r from-[#CBD5E1] via-[#E2E8F0] to-[#94A3B8] border-gba shadow-gba-lg rounded-[28px] p-4 md:p-8 relative flex flex-col md:flex-row items-center gap-6 overflow-hidden">
        
        {/* Device Corner Screws */}
        <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-gray-400 border border-black flex items-center justify-center">
          <div className="w-2 h-0.5 bg-black" />
        </div>
        <div className="absolute top-3 right-4 w-3 h-3 rounded-full bg-gray-400 border border-black flex items-center justify-center">
          <div className="w-2 h-0.5 bg-black" />
        </div>
        <div className="absolute bottom-3 left-4 w-3 h-3 rounded-full bg-gray-400 border border-black flex items-center justify-center">
          <div className="w-2 h-0.5 bg-black" />
        </div>
        <div className="absolute bottom-3 right-4 w-3 h-3 rounded-full bg-gray-400 border border-black flex items-center justify-center">
          <div className="w-2 h-0.5 bg-black" />
        </div>

        {/* LEFT VERTICAL HARDWARE BUTTON STRIP (Screenshot 5 Match) */}
        <div className="flex md:flex-col gap-3 justify-center shrink-0 z-10 w-full md:w-auto">
          
          {/* LinkedIn Button */}
          <a
            href={currentProfile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSelect()}
            className="w-16 md:w-20 h-16 md:h-20 bg-[#0284C7] hover:bg-[#0369A1] text-white border-gba-sm rounded-xl flex flex-col items-center justify-center p-1.5 shadow-md btn-gba cursor-pointer group"
          >
            <LinkedinIcon className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            <span className="font-pixel text-[7.5px] mt-1">LinkedIn</span>
          </a>

          {/* GitHub Button */}
          <a
            href={currentProfile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playSelect()}
            className="w-16 md:w-20 h-16 md:h-20 bg-[#1E293B] hover:bg-black text-white border-gba-sm rounded-xl flex flex-col items-center justify-center p-1.5 shadow-md btn-gba cursor-pointer group"
          >
            <GithubIcon className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            <span className="font-pixel text-[7.5px] mt-1">GitHub</span>
          </a>

          {/* Email Button */}
          <a
            href={`mailto:${currentProfile.email}`}
            onClick={() => sound.playSelect()}
            className="w-16 md:w-20 h-16 md:h-20 bg-[#059669] hover:bg-[#047857] text-white border-gba-sm rounded-xl flex flex-col items-center justify-center p-1.5 shadow-md btn-gba cursor-pointer group"
          >
            <Mail className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            <span className="font-pixel text-[7.5px] mt-1">Email</span>
          </a>

        </div>

        {/* MAIN POKÉNAV DISPLAY SCREEN WITH WORLD MAP (Screenshot 5 Match) */}
        <div className="flex-1 w-full h-[400px] md:h-[460px] bg-[#60A5FA] border-gba-sm rounded-2xl relative overflow-hidden flex items-center justify-center p-4 md:p-6 shadow-inner">
          
          {/* Pixel World Map Background Graphic */}
          <svg
            viewBox="0 0 600 400"
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          >
            {/* Ocean Waves */}
            <rect width="600" height="400" fill="#60A5FA" />
            {/* Continent 1 (Kanto / Americas) */}
            <path
              d="M 60 70 Q 120 40 180 80 Q 220 120 200 180 Q 160 220 100 240 Q 40 180 60 70 Z"
              fill="#86EFAC"
              stroke="#16A34A"
              strokeWidth="3"
            />
            {/* Continent 2 (Johto / Eurasia) */}
            <path
              d="M 320 60 Q 440 30 520 80 Q 560 160 480 200 Q 400 240 340 180 Q 280 120 320 60 Z"
              fill="#86EFAC"
              stroke="#16A34A"
              strokeWidth="3"
            />
            {/* Islands (Hoenn / Cinnabar) */}
            <circle cx="260" cy="280" r="28" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
            <circle cx="480" cy="290" r="22" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
            {/* Map Grid Lines */}
            <line x1="0" y1="200" x2="600" y2="200" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="300" y1="0" x2="300" y2="400" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4,4" />
          </svg>

          {/* CRT SCANLINES & GLARE */}
          <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

          {/* CENTER MESSAGING TERMINAL WINDOW (Exact Match to Screenshot 5) */}
          <div className="relative z-10 w-full max-w-[440px] bg-[#1E293B]/95 border-2 border-white/80 shadow-gba p-4 md:p-6 rounded-lg backdrop-blur-sm">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-4">
              <span className="font-pixel text-[11px] md:text-xs text-[#34D399] tracking-wider">
                Messaging Terminal
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            </div>

            {/* Form */}
            {isSent ? (
              <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] animate-bounce" />
                <span className="font-pixel text-xs text-white">
                  TRANSMISSION SENT!
                </span>
                <p className="font-dialogue text-lg text-emerald-300">
                  Professor Aryan will receive your challenge invite instantly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label className="font-pixel text-[8.5px] text-gray-300">
                    Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Trainer Red"
                    className="w-full bg-[#0F172A] border border-gray-500 rounded px-3 py-1.5 font-dialogue text-lg text-white outline-none focus:border-[#34D399]"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="font-pixel text-[8.5px] text-gray-300">
                    Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="red@pallet.town"
                    className="w-full bg-[#0F172A] border border-gray-500 rounded px-3 py-1.5 font-dialogue text-lg text-white outline-none focus:border-[#34D399]"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="font-pixel text-[8.5px] text-gray-300">
                    Message:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Let's build battle-ready software together..."
                    className="w-full bg-[#0F172A] border border-gray-500 rounded px-3 py-1.5 font-dialogue text-lg text-white outline-none focus:border-[#34D399] resize-none"
                  />
                </div>

                {/* Submit Action: SEND CHALLENGE INVITE */}
                <button
                  type="submit"
                  onClick={() => sound.playSelect()}
                  className="w-full mt-1 bg-[#10B981] hover:bg-[#059669] text-white font-pixel text-[10px] md:text-[11px] py-2.5 border border-white/80 shadow-md flex items-center justify-center gap-2 cursor-pointer btn-gba"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND CHALLENGE INVITE</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
