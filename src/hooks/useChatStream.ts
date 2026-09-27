'use client';

import { useState, useRef, useCallback } from 'react';
import { API_ENDPOINTS } from '@/lib/apiConfig';
import { sound } from '@/lib/soundEffects';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export const PRESET_PROMPTS = [
  {
    id: 'about',
    label: '⚡ About Aryan',
    prompt: 'Tell me about Aryan Gupta, his skills and background!',
  },
  {
    id: 'projects',
    label: '📂 Top Projects',
    prompt: 'What are Aryan\'s top featured projects and production architectures?',
  },
  {
    id: 'github',
    label: '🐙 GitHub Repos',
    prompt: 'What repositories and open source work does Aryan have on GitHub?',
  },
  {
    id: 'work',
    label: '💼 Policybazaar Exp',
    prompt: 'What did Aryan engineer at Policybazaar as SDE 1?',
  },
  {
    id: 'contact',
    label: '📡 Contact Aryan',
    prompt: 'How can I get in touch with Aryan for opportunities or collaborations?',
  },
];

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'model',
      content:
        'Pika pika! ⚡ Hello Trainer! I\'m Pikachu, Aryan\'s AI guide! Ask me about his software projects, tech stack, Policybazaar engineering, or GitHub repos! Pika pika!',
      timestamp: new Date(),
    },
  ]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (userPrompt: string) => {
      const trimmed = userPrompt.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      sound.playSelect();

      const userMsgId = `user-${Date.now()}`;
      const botMsgId = `bot-${Date.now()}`;

      const userMsg: ChatMessage = {
        id: userMsgId,
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      const botMsg: ChatMessage = {
        id: botMsgId,
        role: 'model',
        content: '',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setIsStreaming(true);

      // Build history payload (excluding current prompt and empty bot msg)
      const historyPayload = messages
        .filter((m) => m.id !== 'init-1')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      abortControllerRef.current = new AbortController();

      try {
        const baseEndpoint = API_ENDPOINTS.chatStream;
        // Append query param ?message= to guarantee compatibility across Go router query and body parsers
        const url = new URL(baseEndpoint, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8080');
        url.searchParams.set('message', trimmed);
        url.searchParams.set('prompt', trimmed);

        const response = await fetch(url.toString(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'text/event-stream',
          },
          body: JSON.stringify({
            message: trimmed,
            prompt: trimmed,
            history: historyPayload,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status}`);
        }

        if (!response.body) {
          throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedText = '';
        let buffer = '';
        let chunkCount = 0;

        sound.playPikachuVoice();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || !trimmedLine.startsWith('data:')) continue;

            const rawData = trimmedLine.replace(/^data:\s*/, '');
            if (rawData === '[DONE]') continue;

            try {
              const parsed = JSON.parse(rawData);

              if (parsed.error) {
                throw new Error(parsed.error);
              }

              if (parsed.chunk) {
                accumulatedText += parsed.chunk;
                chunkCount++;

                // Subtle retro audio blip every 5 chunks
                if (chunkCount % 4 === 0) {
                  sound.playDialogue();
                }

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMsgId
                      ? { ...msg, content: accumulatedText }
                      : msg
                  )
                );
              }
            } catch {
              // Ignore partial JSON parse errors
            }
          }
        }

        sound.playPikachuThunder();
      } catch (err: unknown) {
        const isAbort =
          err instanceof DOMException && err.name === 'AbortError';

        if (!isAbort) {
          const errMsg =
            err instanceof Error ? err.message : 'Connection interrupted';
          setError(errMsg);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMsgId
                ? {
                    ...msg,
                    content: `Pika! ⚠️ Couldn't reach the AI server (${errMsg}). Make sure the backend server is running! Pika pika!`,
                  }
                : msg
            )
          );
        }
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
      sound.playSelect();
    }
  }, []);

  const clearChat = useCallback(() => {
    sound.playSelect();
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'model',
        content:
          'Pika pika! ⚡ Chat reset! Ask me anything about Aryan\'s work or pick a question below! Pika pika!',
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    stopStreaming,
    clearChat,
    presetPrompts: PRESET_PROMPTS,
  };
}
