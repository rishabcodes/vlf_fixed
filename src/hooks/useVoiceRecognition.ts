import { useState, useCallback, useRef, useEffect } from 'react';
import { logger } from '@/lib/safe-logger';

interface UseVoiceRecognitionOptions {
  language?: 'en' | 'es';
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export function useVoiceRecognition(options: UseVoiceRecognitionOptions = {}) {
  const { language: optionsLanguage, onResult, onError, onEnd } = options;
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const currentLanguageRef = useRef<'en' | 'es'>('en');

  // Check browser support
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      logger.warn('Speech recognition not supported in this browser');
    }
  }, []);

  const startListening = useCallback((language: 'en' | 'es' = 'en') => {
    if (!isSupported) {
      setError('Speech recognition not supported');
      return;
    }

    try {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();
      
      currentLanguageRef.current = language;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'es' ? 'es-US' : 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        logger.info('Voice recognition started');
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interim = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + ' ';
          } else {
            interim += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          onResult?.(finalTranscript.trim(), true);
        } else if (interim) {
          setInterimTranscript(interim);
          onResult?.(interim, false);
          }
};

      recognition.onerror = (event: any) => {
        logger.error('Voice recognition error:', event.error);
        setError(event.error);
        setIsListening(false);
        onError?.(event.error);
      };

      recognition.onend = () => {
        logger.info('Voice recognition ended');
        setIsListening(false);
        onEnd?.();
      };

      recognition.start();
      recognitionRef.current = recognition;

    } catch (error) {
      logger.error('Failed to start voice recognition:', error);
      setError('Failed to start voice recognition');
      setIsListening(false);
    }
  }, [isSupported, onResult, onError, onEnd]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
        setIsListening(false);
        setInterimTranscript('');
      } catch (error) {
        logger.error('Error stopping voice recognition:', error);
      }
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
        }
};
  }, []);

  // Legacy interface for backward compatibility
  const start = useCallback(() => {
    startListening(optionsLanguage || currentLanguageRef.current);
  }, [startListening, optionsLanguage]);

  const stop = stopListening;

  return {
    // New interface
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    // Legacy interface
    start,
    stop
  };
}
