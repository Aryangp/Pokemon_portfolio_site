'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { PikachuAvatar } from './PikachuAvatar';
import { ChatMessage } from '@/hooks/useChatStream';
import { sound } from '@/lib/soundEffects';
import {
  Zap,
  Send,
  Square,
  Trash2,
  X,
  ExternalLink,
  Bot,
  Sparkles,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface ChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isStreaming: boolean;
  onSendMessage: (prompt: string) => void;
  onStopStreaming: () => void;
  onClearChat: () => void;
  presetPrompts: Array<{ id: string; label: string; prompt: string }>;
}

export const ChatHistoryModal: React.FC<ChatHistoryModalProps> = ({
  isOpen,
  onClose,
  messages,
  isStreaming,
  onSendMessage,
  onStopStreaming,
  onClearChat,
  presetPrompts,
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-xs select-none">
        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-[800px] h-[92vh] sm:h-[85vh] max-h-[740px] bg-[#0F172A] border-ink-4 shadow-retro-lg flex flex-col overflow-hidden relative"
        >
          {/* Top Retro Header Bar */}
          <div className="h-11 sm:h-12 bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#D97706] border-b-2 border-[#1A202C] px-3 sm:px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#1A202C] border border-black flex items-center justify-center shadow-retro-sm shrink-0">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 animate-pulse" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-pixel text-[10px] sm:text-xs text-[#1A202C] font-bold tracking-wider truncate">
                  PIKACHU AI // POKÉNAV LINK
                </span>
                <span className="text-[7.5px] sm:text-[8px] font-pixel text-[#451A03] truncate hidden sm:inline">
                  REAL-TIME GEMINI STREAMING WITH GITHUB TOOLS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playSelect();
                  onClearChat();
                }}
                title="Clear Chat Log"
                className="bg-[#1A202C] hover:bg-black text-amber-300 hover:text-white border border-black px-2.5 py-1 text-[8.5px] font-pixel btn-retro flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">RESET</span>
              </button>

              <button
                onClick={() => {
                  sound.playSelect();
                  onClose();
                }}
                className="w-7 h-7 bg-[#EF4444] hover:bg-red-700 text-white border border-black flex items-center justify-center font-pixel text-xs btn-retro cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips (Top bar in expanded modal) */}
          <div className="bg-[#1E293B] border-b border-slate-700/80 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="font-pixel text-[8px] text-amber-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              QUICK PROMPTS:
            </span>
            {presetPrompts.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  if (isStreaming) return;
                  onSendMessage(preset.prompt);
                }}
                disabled={isStreaming}
                className="bg-[#334155] hover:bg-amber-400 text-slate-200 hover:text-[#1A202C] border border-slate-600 hover:border-amber-600 px-2.5 py-1 font-pixel text-[8px] whitespace-nowrap transition-colors btn-retro cursor-pointer disabled:opacity-40"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Message History Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#090D16] scanlines-subtle">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              const isLatestBot = !isUser && index === messages.length - 1;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-start gap-3 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isUser && (
                    <PikachuAvatar
                      size={44}
                      isStreaming={isStreaming && isLatestBot}
                      className="border border-amber-400/50 shadow-retro-sm shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-3.5 border shadow-retro-sm relative ${
                      isUser
                        ? 'bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] text-[#1A202C] border-black rounded-none'
                        : 'bg-[#1E293B] text-slate-100 border-slate-600 rounded-none'
                    }`}
                  >
                    {/* Speaker identity tag */}
                    <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-black/10 dark:border-slate-600">
                      <span className="font-pixel text-[8px] font-bold uppercase tracking-wider">
                        {isUser ? 'TRAINER (YOU)' : '⚡ PIKACHU AI GUIDE'}
                      </span>
                      <span className="text-[7.5px] font-pixel opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    {/* Message Body with Markdown */}
                    <div className="font-dialogue text-lg sm:text-[19px] leading-[22px] tracking-wide break-words">
                      {isUser ? (
                        <p>{msg.content}</p>
                      ) : msg.content ? (
                        <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:my-1 prose-ul:my-1 prose-li:my-0.5 prose-a:text-amber-300 prose-a:underline prose-code:bg-slate-900 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-amber-300">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                          {isStreaming && isLatestBot && (
                            <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse align-middle" />
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-amber-300">
                          <span className="animate-spin text-sm">⚡</span>
                          <span className="font-pixel text-[9px]">
                            PIKACHU IS THINKING...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-10 h-10 bg-blue-600 border border-black flex items-center justify-center shrink-0 shadow-retro-sm">
                      <span className="font-pixel text-xs text-white">YOU</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 sm:p-4 bg-[#1E293B] border-t-2 border-[#1A202C] flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Pikachu anything about Aryan's code, tech stack, or repos..."
              disabled={isStreaming}
              className="flex-1 h-11 bg-[#0F172A] border-2 border-slate-600 focus:border-amber-400 px-3.5 font-dialogue text-lg text-white placeholder-slate-400 outline-none disabled:opacity-50 transition-colors"
            />

            {isStreaming ? (
              <button
                type="button"
                onClick={onStopStreaming}
                className="h-11 px-4 bg-[#EF4444] hover:bg-red-700 text-white font-pixel text-[9px] border-ink shadow-retro-sm btn-retro flex items-center gap-1.5 cursor-pointer"
              >
                <Square className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">STOP</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="h-11 px-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#1A202C] font-pixel text-[10px] font-bold border-ink shadow-retro-sm btn-retro flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND</span>
              </button>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
