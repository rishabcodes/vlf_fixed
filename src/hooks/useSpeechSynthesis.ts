import { useCallback, useRef } from 'react';

interface UseSpeechSynthesisOptions {
  language: 'en' | 'es';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent) => void;
}

export function useSpeechSynthesis({
  language,
  onStart,
  onEnd,
  onError,
}: UseSpeechSynthesisOptions) {
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (!window.speechSynthesis) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      if (onStart) utterance.onstart = onStart;
      if (onEnd) utterance.onend = onEnd;
      if (onError) utterance.onerror = onError;

      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [language, onStart, onEnd, onError]
  );

  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, cancel, isSupported: !!window.speechSynthesis };
}
