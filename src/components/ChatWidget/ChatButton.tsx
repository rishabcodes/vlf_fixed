'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  language?: 'en' | 'es';
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick, language = 'en' }) => {
  const labels = {
    en: 'Chat with us',
    es: 'Chatea con nosotros'
  };

  return (
    <button
      onClick={onClick}

                className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-primary/50 group z-50"
      aria-label={labels[language]}
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </div>
    </button>
  );
};