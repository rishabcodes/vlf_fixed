'use client';

import React, { useEffect, useRef, useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { RetellWebClient } from 'retell-client-js-sdk';
import { toast } from 'react-hot-toast';

import { Phone, PhoneOff, Mic, MicOff, Loader2, X, Volume2 } from 'lucide-react';

interface RetellGlassmorphicClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

export const RetellGlassmorphicClient: React.FC<RetellGlassmorphicClientProps> = ({
  isActive,
  onClose,
  language = 'en',
  onTranscript,
  onResponse
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [bars] = useState(Array(40).fill(0));
  const [animatedBars, setAnimatedBars] = useState(bars);
  
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const isStartingCall = useRef(false);

  // Translations
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
      agentSpeaking: 'Assistant is speaking...',
      userSpeaking: 'You are speaking...',
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
      agentSpeaking: 'El asistente está hablando...',
      userSpeaking: 'Estás hablando...',
    },
  };

  // Animate sound bars based on who's talking
  useEffect(() => {
    if (!isConnected || !isActive) return;

    const interval = setInterval(() => {
      if (isAgentTalking || isUserTalking) {
        setAnimatedBars(bars.map(() => {
          const baseHeight = 30;
          const variation = Math.random() * 50;
          return Math.min(100, baseHeight + variation);
        }));
      } else {
        setAnimatedBars(bars.map(() => 5));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isConnected, isActive, bars, isAgentTalking, isUserTalking]);

  useEffect(() => {
    let mounted = true;
    
    if (isActive && !isConnected && !isConnecting && mounted) {
      startCall();
    }
    
    return () => {
      mounted = false;
      // Cleanup on unmount - ensure call is properly ended
      if (retellClientRef.current) {
        logger.info('⚠️ Component unmounting, ending call...');
        try {
          // Try to stop the call
          retellClientRef.current.stopCall();
          
          // Remove event listeners
          if (typeof retellClientRef.current.removeAllListeners === 'function') {
            retellClientRef.current.removeAllListeners();
          }
        } catch (e) {
          logger.error('Error stopping call on unmount:', e);
        }
        
        // Clear the reference
        retellClientRef.current = null;
        
        // Reset flag
        isStartingCall.current = false;
      }
    };
  }, [isActive]); // Only depend on isActive to avoid re-renders

  const startCall = async () => {
    // Prevent multiple simultaneous calls
    if (isStartingCall.current || isConnecting || isConnected) {
      logger.info('Call already in progress, skipping...');
      return;
    }
    
    isStartingCall.current = true;
    logger.info('🎤 Starting Retell Web SDK call...');
    setIsConnecting(true);
    const callStartTime = Date.now();

    try {
      // Step 1: Get call credentials from backend
      logger.info('Getting call credentials...');
      
      const response = await fetch('/api/retell/create-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID || ''
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to create call: ${error}`);
      }

      const responseData = await response.json();
      const access_token = responseData.access_token;
      const call_id = responseData.call_id;
      const call_status = responseData.call_status;
      
      if (!access_token) {
        throw new Error('Invalid response from server: missing access_token');
      }
      
      const timeElapsed = Date.now() - callStartTime;
      logger.info('✅ Got access token in', timeElapsed, 'ms');
      logger.info('Call details:', { 
        call_id,
        call_status,
        token_length: access_token?.length,
        time_remaining: (30000 - timeElapsed) + 'ms'
      });

      // Step 2: IMMEDIATELY Initialize and Connect
      logger.info('🚀 Connecting immediately to avoid timeout...');
      const retellClient = new RetellWebClient();
      retellClientRef.current = retellClient;

      // Step 3: Set up event listeners
      retellClient.on('call_started', () => {
        logger.info('✅ Call started successfully at', Date.now() - callStartTime, 'ms');
        setIsConnected(true);
        setIsConnecting(false);
        toast.success('Connected to AI Assistant!');
      });

      retellClient.on('call_ended', () => {
        logger.info('📞 Call ended');
        setIsConnected(false);
        cleanup();
      });

      retellClient.on('error', (error: any) => {
        logger.error('❌ Retell error:', error);
        toast.error(error.message || 'Connection failed');
        setIsConnecting(false);
        setIsConnected(false);
        cleanup();
      });

      // Audio speaking events
      retellClient.on('agent_start_talking', () => {
        logger.info('🤖 Agent started talking');
        setIsAgentTalking(true);
        setIsUserTalking(false);
      });

      retellClient.on('agent_stop_talking', () => {
        logger.info('🤖 Agent stopped talking');
        setIsAgentTalking(false);
      });

      // Update events for transcripts
      retellClient.on('update', (update: any) => {
        logger.info('📝 Update received:', update);
        
        if (update.transcript) {
          setTranscript(update.transcript);
          onTranscript?.(update.transcript);
          setIsUserTalking(true);
          setIsAgentTalking(false);
        }

        if (update.response) {
          setResponse(update.response);
          onResponse?.(update.response);
        }

        // Handle other update types
        if (update.type === 'transcript') {
          setTranscript(update.text || '');
          onTranscript?.(update.text || '');
        }
        
        if (update.type === 'response') {
          setResponse(update.text || '');
          onResponse?.(update.text || '');
        }
      });

      // Audio level monitoring
      retellClient.on('audio', (audio: Float32Array) => {
        if (audio && audio.length > 0) {
          const sum = audio.reduce((acc, val) => acc + Math.abs(val), 0);
          const average = sum / audio.length;
          const level = Math.min(100, average * 500);
          setAudioLevel(level);
        }
      });

      // Step 4: START CALL IMMEDIATELY
      logger.info('⏱️ Starting call at', Date.now() - callStartTime, 'ms after request');
      
      try {
        await retellClient.startCall({
          accessToken: access_token,
          sampleRate: 24000,
        });
        
        logger.info('✅ startCall() completed at', Date.now() - callStartTime, 'ms');
        
        // Try to start audio playback
        setTimeout(async () => {
          try {
            await retellClient.startAudioPlayback();
            logger.info('✅ Audio playback started');
          } catch (audioError) {
            logger.warn('Audio playback error (non-fatal):', audioError);
          }
        }, 100);
        
      } catch (startError: any) {
        logger.error('❌ Failed to start call at', Date.now() - callStartTime, 'ms');
        logger.error('Error details:', startError);
        throw new Error(`Connection failed: ${startError.message || 'Unknown error'}`);
      }

    } catch (error: any) {
      logger.error('❌ Failed to start call:', error);
      toast.error(`Failed to connect: ${error.message || 'Unknown error'}`);
      isStartingCall.current = false;
      setIsConnecting(false);
      setIsConnected(false);
      cleanup();
      onClose();
    } finally {
      isStartingCall.current = false;
    }
  };

  const endCall = async () => {
    logger.info('📞 Ending call... Current state:', {
      isConnected,
      isConnecting,
      hasClient: !!retellClientRef.current
    });
    
    // Set a flag to prevent multiple end call attempts
    if (!retellClientRef.current && !isConnected) {
      logger.info('⚠️ No active call to end');
      cleanup();
      return;
    }
    
    if (retellClientRef.current) {
      try {
        logger.info('🔌 Attempting to stop Retell call...');
        
        // Try to stop the call
        const stopPromise = retellClientRef.current.stopCall();
        
        // If stopCall returns a promise, await it with a timeout
        if (stopPromise && typeof stopPromise.then === 'function') {
          await Promise.race([
            stopPromise,
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('stopCall timeout')), 3000)
            )
          ]);
          logger.info('✅ Call stopped successfully');
        } else {
          // If it's not a promise, just continue
          logger.info('✅ stopCall executed (non-promise)');
        }
      } catch (error) {
        logger.error('❌ Error stopping call:', error);
        // Continue with cleanup even if stopCall fails
      }
      
      // Additional cleanup: remove all event listeners
      try {
        if (retellClientRef.current) {
          // Remove all event listeners to ensure clean disconnection
          retellClientRef.current.removeAllListeners?.();
          logger.info('🧹 Event listeners removed');
        }
      } catch (e) {
        logger.warn('Could not remove event listeners:', e);
      }
    }
    
    // Always cleanup at the end
    cleanup();
    logger.info('📞 Call ended and cleaned up');
  };

  const cleanup = () => {
    logger.info('🧹 Running cleanup...');
    
    // Clear the client reference
    retellClientRef.current = null;
    
    // Reset all state
    setIsConnected(false);
    setIsConnecting(false);
    setTranscript('');
    setResponse('');
    setIsAgentTalking(false);
    setIsUserTalking(false);
    setAudioLevel(0);
    
    // Reset the call in progress flag
    isStartingCall.current = false;
    
    logger.info('✅ Cleanup complete');
  };

  const toggleMute = () => {
    if (retellClientRef.current) {
      if (isMuted) {
        retellClientRef.current.unmute();
        setIsMuted(false);
        toast.success('Microphone unmuted');
      } else {
        retellClientRef.current.mute();
        setIsMuted(true);
        toast.success('Microphone muted');
      }
    }
  };

  const handleEndCall = async () => {
    logger.info('🔴 End call button clicked');
    setIsConnecting(true); // Show loading state while ending call
    await endCall();
    onClose();
  };

  if (!isActive) return null;

  return (
    <>
      {isActive && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
        >
          {/* Glassmorphic Card */}
          <div
            className="relative w-full max-w-md"
          >
            {/* Liquid glass effect - animated gradient */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes liquidGlass {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}} />
            <div
              className="absolute inset-0 rounded-3xl opacity-50"
            />

            {/* Content */}
            <div className="relative p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Close window"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"

                >
                  {isConnecting ? (
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  ) : (
                    <Phone className={`w-10 h-10 text-white ${isConnected ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t[language].aiAssistant}
                </h3>
                <p className="text-white/70 text-sm">
                  {isConnecting ? t[language].initiating : 
                   isConnected ? (isAgentTalking ? t[language].agentSpeaking : 
                                 isUserTalking ? t[language].userSpeaking : 
                                 t[language].speaking) : 
                   t[language].callInProgress}
                </p>
              </div>

              {/* Sound Wave Visualization */}
              <div className="mb-6 h-24 flex items-center justify-center gap-1 px-4">
                {animatedBars.map((height, index) => (
                  <div
                    key={index}
                    className="w-1 bg-gradient-to-t from-gold-400 to-gold-600 rounded-full transition-all duration-150"
                    style={{
                      height: `${height}%`,
                      opacity: isConnected ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Transcript Display */}
              {isConnected && (transcript || response) && (
                <div className="mb-4 p-4 rounded-lg bg-black/20 backdrop-blur-sm">
                  {transcript && (
                    <div className="text-white/80 text-sm mb-2">
                      <span className="text-gold-400">You:</span> {transcript}
                    </div>
                  )}
                  {response && (
                    <div className="text-white/80 text-sm">
                      <span className="text-blue-400">Assistant:</span> {response}
                    </div>
                  )}
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex justify-center gap-4">
                {isConnected && (
                  <>
                    <button
                      onClick={toggleMute}
                      className={`p-4 rounded-full transition-all ${
                        isMuted 
                          ? 'bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50' 
                          : 'bg-white/10 hover:bg-white/20 border-2 border-white/30'
                      }`}
                      title={isMuted ? t[language].unmute : t[language].mute}
                    >
                      {isMuted ? (
                        <MicOff className="w-6 h-6 text-red-400" />
                      ) : (
                        <Mic className="w-6 h-6 text-white" />
                      )}
                    </button>

                    <button onClick={handleEndCall}
      className="px-6 py-4 rounded-full bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50 transition-all flex items-center gap-2"
                    >
                      <PhoneOff className="w-6 h-6 text-red-400" />
                      <span className="text-red-400 font-medium">{t[language].endCall}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};