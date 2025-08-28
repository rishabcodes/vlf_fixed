import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setTyping: (typing: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    set => ({
      messages: [],
      isTyping: false,

      addMessage: message =>
        set(state => ({
          messages: [...state.messages, message],
        })),

      clearMessages: () => set({ messages: [] }),

      setTyping: typing => set({ isTyping: typing }),
    }),
    {
      name: 'vasquez-chat-store',
      partialize: state => ({ messages: state.messages }), // Only persist messages
    }
  )
);
