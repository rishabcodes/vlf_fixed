'use client';

import React, { useState, Suspense, lazy } from 'react';
import { ChatButton } from './ChatButton';

// Lazy load the heavy chat component
const UnifiedModernChatbot = lazy(() => 
  import('./UnifiedModernChatbot').then(mod => ({ 
    default: mod.UnifiedModernChatbot 
  }))
);

interface LazyChatProps {
  language?: 'en' | 'es';
}

export const LazyChat: React.FC<LazyChatProps> = ({ language = 'en' }) => {
  const [shouldLoad, setShouldLoad] = useState(false);

  const handleChatClick = () => {
    setShouldLoad(true);
  };

  // If chat hasn't been clicked yet, show lightweight button
  if (!shouldLoad) {
    return <ChatButton onClick={handleChatClick} language={language} />;
  }

  // Render the chat immediately - it will handle its own loading states
  return (
    <Suspense fallback={null}>
      <UnifiedModernChatbot language={language} initiallyOpen={true} />
    </Suspense>
  );
};