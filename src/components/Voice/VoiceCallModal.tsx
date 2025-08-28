'use client';

import React, { useState, useEffect } from 'react';

import { Phone, PhoneOff, Mic, MicOff, X, Volume2 } from 'lucide-react';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndCall: () => void;
  language: 'en' | 'es';
  isMuted: boolean;
  onToggleMute: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  audioLevel?: number;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  onClose,
  onEndCall,
  language,
  isMuted,
  onToggleMute,
  isConnecting,
  isConnected,
  audioLevel = 0,
}) => {
  const [bars] = useState(Array(40).fill(0));
  const [animatedBars, setAnimatedBars] = useState(bars);

  // Animate sound bars based on actual audio level
  useEffect(() => {
    if (!isConnected || !isOpen) return;

    const interval = setInterval(() => {
      // Animate bars based on audio level (more sensitive)
      if (audioLevel > 0.01) { // Lower threshold for detection
        setAnimatedBars(bars.map((_, index) => {
          // Create wave effect based on actual audio level
          const baseHeight = audioLevel * 100; // Convert to percentage
          const waveOffset = Math.sin((index / bars.length) * Math.PI * 2 + Date.now() / 200) * 10;
          const variation = Math.random() * 20; // Add some variation
          return Math.min(100, Math.max(10, baseHeight + waveOffset + variation));
        }));
      } else {
        // No audio - show minimal bars
        setAnimatedBars(bars.map(() => 5));
      }
    }, 50); // Faster update rate for smoother animation

    return () => clearInterval(interval);
  }, [isConnected, isOpen, bars, audioLevel]);

  const t = {
    en: {
      connecting: 'Connecting...',
      initiating: 'Initiating call. Please wait...',
      connected: 'Connected',
      callInProgress: 'Voice Call in Progress',
      endCall: 'End Call',
      mute: 'Mute',
      unmute: 'Unmute',
      aiAssistant: 'AI Legal Assistant',
      speaking: 'Listening...',
    },
    es: {
      connecting: 'Conectando...',
      initiating: 'Iniciando llamada. Por favor espere...',
      connected: 'Conectado',
      callInProgress: 'Llamada de Voz en Progreso',
      endCall: 'Finalizar',
      mute: 'Silenciar',
      unmute: 'Activar',
      aiAssistant: 'Asistente Legal IA',
      speaking: 'Escuchando...',
    },
  };

  return (
    <>
      {isOpen && (
        <div
className="fixed inset-0 z-[10000] flex items-center justify-center p-4"

        >
          {/* Glassmorphic Card */}
          <div
className="relative w-full max-w-md"

          >
            {/* Liquid glass effect - animated gradient */}
            <div
              className="absolute inset-0 rounded-3xl opacity-50"
             }
            />

            {/* Content */}
            <div className="relative p-8">
              {/* Close button - only closes modal, doesn't end call */}
              <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Close window (call continues)"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"

                >
                  <Phone className={`w-10 h-10 text-white ${isConnected ? 'animate-pulse' : ''}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t[language].aiAssistant}
                </h3>
                <p className="text-white/70 text-sm">
                  {isConnecting ? t[language].initiating : 
                   isConnected ? t[language].connected : 
                   t[language].callInProgress}
                </p>
              </div>

              {/* Sound Wave Visualization */}
              <div className="relative h-32 mb-6 flex items-center justify-center">
                <div className="flex items-end justify-center gap-1 h-full">
                  {animatedBars.map((height, index) => (
                    <div
                      key={index}

                className="w-1 bg-gradient-to-t from-gold-500 to-gold-300 rounded-full"
                     %` : '10%',
                      }}
                     }
                    />
                  ))}
                </div>
                
                {/* Center status */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/70 text-sm font-medium">
                    {isConnected && !isConnecting && (
                      <span
                       }
                       }
                      >
                        {t[language].speaking}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4">
                {/* Mute Button */}
                <button onClick={onToggleMute}
      className="p-4 rounded-full transition-all"

                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* End Call Button */}
                <button onClick={onEndCall}
      disabled={isConnecting} className="px-8 py-4 rounded-full transition-all flex items-center gap-3"

                >
                  <PhoneOff className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{t[language].endCall}</span>
                </button>

                {/* Volume Indicator */}
                <button
                  className="p-4 rounded-full transition-all"

                >
                  <Volume2 className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Animated border glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
               }
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes liquidGlass {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
};