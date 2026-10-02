'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';
import {
  FileText,
  Zap,
  Send,
  Square,
  Maximize2,
  Compass,
  RotateCcw,
} from 'lucide-react';
import { sound } from '@/lib/soundEffects';
import { OakAvatar } from './OakAvatar';
import { PikachuAvatar } from './PikachuAvatar';
import { ChatMessage, PRESET_PROMPTS } from '@/hooks/useChatStream';

interface DialogueBoxProps {
  dialogueText: string;
  speakerName?: string;
  onDownloadCv?: () => void;
  className?: string;
  isMobile?: boolean;
  // AI Chatbot Integration props
  chatMessages?: ChatMessage[];
  isStreaming?: boolean;
  onSendMessage?: (prompt: string) => void;
  onStopStreaming?: () => void;
  onClearChat?: () => void;
  onOpenFullLog?: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogueText,
  speakerName = 'PROF. ARYAN',
  onDownloadCv,
  className = '',
  isMobile = false,
  chatMessages = [],
  isStreaming = false,
  onSendMessage,
  onStopStreaming,
  onClearChat,
  onOpenFullLog,
}) => {
  const [activeMode, setActiveMode] = useState<'pikachu' | 'oak'>('pikachu');
  const [displayedOakText, setDisplayedOakText] = useState('');
  const [isOakTyping, setIsOakTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Latest bot message from conversation history
  const latestBotMessage = chatMessages
    .slice()
    .reverse()
    .find((m) => m.role === 'model');

  // If dialogueText changes from hovering a starter project in lab mode
  useEffect(() => {
    if (dialogueText && dialogueText.startsWith('POKÉDEX ENTRY')) {
      setActiveMode('oak');
    }
  }, [dialogueText]);

  // Oak Typewriter animation
  useEffect(() => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    setDisplayedOakText('');
    setIsOakTyping(true);

    let charIndex = 0;
    const speed = 16;

    typingTimerRef.current = setInterval(() => {
      if (charIndex < dialogueText.length) {
        const nextChar = dialogueText.charAt(charIndex);
        setDisplayedOakText((prev) => prev + nextChar);

        if (charIndex % 3 === 0 && /[a-zA-Z0-9]/.test(nextChar)) {
          sound.playDialogue();
        }

        charIndex++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsOakTyping(false);
      }
    }, speed);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [dialogueText]);

  const handleDownload = () => {
    sound.playFanfare();
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

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isStreaming || !onSendMessage) return;
    setActiveMode('pikachu');
    onSendMessage(inputText);
    setInputText('');
  };

  const handleSelectPreset = (prompt: string) => {
    if (isStreaming || !onSendMessage) return;
    setActiveMode('pikachu');
    onSendMessage(prompt);
  };

  const isPikachuMode = activeMode === 'pikachu';

  return (
    <div
      className={`w-full bg-white border-ink shadow-retro flex flex-col justify-between select-none relative z-20 ${className}`}
      style={{
        maxWidth: isMobile ? '100%' : '920px',
      }}
    >
      {/* 1. TOP HEADER RIBBON (Integrated, Clean, Non-overlapping on both mobile & desktop) */}
      <div className="bg-[#1A202C] text-white px-2.5 sm:px-3 py-1.5 border-b-2 border-[#1A202C] flex items-center justify-between gap-2">
        {/* Left: Speaker Badge */}
        <div className="flex items-center gap-1.5 min-w-0">
          {isPikachuMode ? (
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse shrink-0" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
          )}
          <span
            className={`font-pixel text-[8.5px] sm:text-[9.5px] tracking-wider truncate font-bold ${
              isPikachuMode ? 'text-amber-300' : 'text-emerald-300'
            }`}
          >
            {isPikachuMode ? '⚡ PIKACHU AI GUIDE' : speakerName}
          </span>
        </div>

        {/* Right: Mode Switchers & Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              sound.playSelect();
              setActiveMode('pikachu');
            }}
            className={`px-2 py-0.5 font-pixel text-[7.5px] sm:text-[8.5px] flex items-center gap-1 transition-all cursor-pointer ${
              isPikachuMode
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-[#2D3748] text-gray-300 hover:text-white'
            }`}
          >
            <Zap className="w-2.5 h-2.5" />
            <span>CHAT</span>
          </button>

          <button
            onClick={() => {
              sound.playSelect();
              setActiveMode('oak');
            }}
            className={`px-2 py-0.5 font-pixel text-[7.5px] sm:text-[8.5px] flex items-center gap-1 transition-all cursor-pointer ${
              !isPikachuMode
                ? 'bg-emerald-500 text-white font-bold'
                : 'bg-[#2D3748] text-gray-300 hover:text-white'
            }`}
          >
            <Compass className="w-2.5 h-2.5" />
            <span>OAK</span>
          </button>

          {onOpenFullLog && (
            <button
              onClick={() => {
                sound.playOpen();
                onOpenFullLog();
              }}
              title="Expand Full Chat Log"
              className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 font-pixel text-[7.5px] sm:text-[8.5px] flex items-center gap-1 cursor-pointer"
            >
              <Maximize2 className="w-2.5 h-2.5" />
              <span className="hidden sm:inline">LOG</span>
              {chatMessages.length > 1 && (
                <span className="bg-amber-400 text-black text-[7px] px-1 rounded-full font-bold">
                  {chatMessages.length}
                </span>
              )}
            </button>
          )}

          {onClearChat && chatMessages.length > 1 && isPikachuMode && (
            <button
              onClick={() => {
                sound.playSelect();
                onClearChat();
              }}
              title="Reset Chat"
              className="bg-[#2D3748] hover:bg-red-600 text-gray-300 hover:text-white px-1.5 py-0.5 font-pixel text-[7.5px] cursor-pointer"
            >
              <RotateCcw className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. MAIN BODY CONTENT */}
      <div className="p-3 sm:p-4 flex flex-col justify-between gap-2.5 flex-1">
        
        {/* Upper Row: Avatar + Speech Content */}
        <div className="flex items-start gap-2.5 sm:gap-3.5 flex-1 min-w-0">
          {/* Character Avatar */}
          {isPikachuMode ? (
            <PikachuAvatar
              size={isMobile ? 48 : 70}
              isStreaming={isStreaming}
              className="border-ink shadow-retro-sm shrink-0"
            />
          ) : (
            <OakAvatar
              size={isMobile ? 48 : 70}
              className="border-ink shadow-retro-sm shrink-0"
            />
          )}

          {/* Dialogue Text View */}
          <div className="flex-1 min-w-0 pr-1 max-h-[84px] sm:max-h-[96px] overflow-y-auto no-scrollbar">
            {isPikachuMode ? (
              <div className="font-dialogue text-[17px] sm:text-[20px] leading-[20px] sm:leading-[23px] text-[#1A202C] tracking-wide prose prose-sm max-w-none prose-p:my-0.5 prose-a:text-blue-600 prose-a:font-bold prose-code:bg-gray-100 prose-code:px-1 prose-code:text-amber-700">
                {latestBotMessage?.content ? (
                  <>
                    <ReactMarkdown>{latestBotMessage.content}</ReactMarkdown>
                    {isStreaming && (
                      <span className="inline-block w-2 h-4 bg-amber-500 ml-1 animate-pulse align-middle" />
                    )}
                  </>
                ) : isStreaming ? (
                  <div className="flex items-center gap-2 text-amber-600 py-1">
                    <span className="animate-spin text-sm">⚡</span>
                    <span className="font-pixel text-[8.5px] sm:text-[9.5px]">
                      Pikachu is thinking...
                    </span>
                  </div>
                ) : (
                  <p>
                    Pika pika! ⚡ Ask me anything about Aryan or tap a question below!
                  </p>
                )}
              </div>
            ) : (
              <p className="font-dialogue text-[17px] sm:text-[21px] leading-[20px] sm:leading-[23px] text-[#1A202C] tracking-wide min-h-[40px]">
                {displayedOakText}
                {isOakTyping && (
                  <span className="inline-block w-2 h-4 bg-[#10B981] ml-1 animate-pulse align-middle" />
                )}
              </p>
            )}
          </div>

          {/* Download CV Action Button (Desktop Only) */}
          {!isMobile && (
            <div className="shrink-0 flex flex-col gap-1">
              <button
                onClick={handleDownload}
                className="w-[140px] h-[36px] bg-[#10B981] hover:bg-[#059669] text-white border-ink shadow-retro-sm flex items-center justify-center gap-1.5 font-pixel text-[9px] tracking-wider transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-white" />
                <span>DOWNLOAD CV</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. QUICK PROMPT CHIPS (1-Click Questions in scrollable row) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 border-t border-gray-200">
          <span className="font-pixel text-[7.5px] text-gray-400 uppercase shrink-0 hidden sm:inline">
            PROMPTS:
          </span>
          {PRESET_PROMPTS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.prompt)}
              disabled={isStreaming}
              className="bg-[#F1F5F9] hover:bg-amber-100 text-[#1E293B] border border-gray-300 hover:border-amber-400 px-2 py-0.5 font-pixel text-[7.5px] sm:text-[8px] whitespace-nowrap transition-colors btn-retro cursor-pointer disabled:opacity-40"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* 4. INTERACTIVE CHAT INPUT BAR */}
        {onSendMessage && (
          <form
            onSubmit={handleSendChat}
            className="flex items-center gap-1.5 pt-1 border-t border-gray-200"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Pikachu about Aryan's code, tech stack, or repos..."
                disabled={isStreaming}
                className="w-full h-8 sm:h-9 bg-[#F8FAFC] border-2 border-gray-300 focus:border-amber-400 px-2.5 font-dialogue text-[16px] sm:text-[18px] text-[#1A202C] placeholder-gray-400 outline-none transition-colors disabled:opacity-50"
              />
            </div>

            {isStreaming ? (
              <button
                type="button"
                onClick={onStopStreaming}
                className="h-8 sm:h-9 px-3 bg-[#EF4444] hover:bg-red-700 text-white font-pixel text-[8.5px] border-ink shadow-retro-sm btn-retro flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Square className="w-3 h-3" />
                <span>STOP</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="h-8 sm:h-9 px-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-pixel text-[8.5px] sm:text-[9px] font-bold border-ink shadow-retro-sm btn-retro flex items-center gap-1 cursor-pointer disabled:opacity-40 shrink-0"
              >
                <Send className="w-3 h-3" />
                <span>ASK</span>
              </button>
            )}
          </form>
        )}

      </div>
    </div>
  );
};
