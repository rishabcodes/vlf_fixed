'use client';

import React, { useEffect, useRef, useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { RetellWebClient } from 'retell-client-js-sdk';
import { toast } from 'react-hot-toast';
import { Phone, PhoneOff, Mic, MicOff, X, Volume2, VolumeX, Loader2 } from 'lucide-react';

interface MinimalRetellClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

export const MinimalRetellClient: React.FC<MinimalRetellClientProps> = ({
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
  const [volume, setVolume] = useState(70);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [soundBars, setSoundBars] = useState(Array(15).fill(8));
  
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const isCallInProgressRef = useRef(false); // Prevent multiple calls from same user
  const isConnectedRef = useRef(false); // Track connection state in ref to avoid stale closures
  const lastTranscriptRef = useRef(''); // Track last transcript to avoid duplicates
  const lastResponseRef = useRef(''); // Track last response to avoid duplicates
  const userSpeakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const volumeMonitorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Translations
  const t = {
    en: {
      connecting: 'Connecting...',
      connected: 'Connected',
      endCall: 'End Call',
      mute: 'Mute',
      unmute: 'Unmute',
      aiAssistant: 'AI Legal Assistant',
      volume: 'Volume',
    },
    es: {
      connecting: 'Conectando...',
      connected: 'Conectado',
      endCall: 'Finalizar',
      mute: 'Silenciar',
      unmute: 'Activar',
      aiAssistant: 'Asistente Legal IA',
      volume: 'Volumen',
    },
  };

  const cleanup = () => {
    logger.info('Cleaning up Retell client...');
    
    if (retellClientRef.current) {
      try {
        // Use removeAllListeners which should exist on EventEmitter
        if (typeof retellClientRef.current.removeAllListeners === 'function') {
          retellClientRef.current.removeAllListeners();
        }
        
        // Stop the call
        retellClientRef.current.stopCall();
      } catch (e) {
        logger.warn('Cleanup error:', e);
      }
      
      retellClientRef.current = null;
    }
    
    // Reset all states
    setIsConnected(false);
    setIsConnecting(false);
    setTranscript('');
    setResponse('');
    setShowVolumeSlider(false);
    setIsAgentTalking(false);
    setIsUserTalking(false);
    
    // Clear user speaking timeout
    if (userSpeakingTimeoutRef.current) {
      clearTimeout(userSpeakingTimeoutRef.current);
      userSpeakingTimeoutRef.current = null;
    }
    
    // Clear volume monitoring interval
    if (volumeMonitorIntervalRef.current) {
      clearInterval(volumeMonitorIntervalRef.current);
      volumeMonitorIntervalRef.current = null;
    }
    
    // IMPORTANT: Release the locks and reset refs
    isCallInProgressRef.current = false;
    isConnectedRef.current = false;
    lastTranscriptRef.current = ''; // Reset transcript tracking
    lastResponseRef.current = ''; // Reset response tracking
  };

  const startCall = async () => {
    // Check if this component is already making a call
    if (isCallInProgressRef.current) {
      logger.info('Call already in progress for this user');
      return;
    }
    
    // Also check state flags
    if (isConnecting || isConnected) {
      logger.info('Already connecting or connected');
      return;
    }
    
    // Lock this component from making another call
    isCallInProgressRef.current = true;
    setIsConnecting(true);
    logger.info('Starting Retell call...');

    try {
      // Get access token from API
      const response = await fetch('/api/retell/create-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language })
      });

      if (!response.ok) {
        throw new Error('Failed to create call');
      }

      const data = await response.json();
      
      if (!data.access_token) {
        throw new Error('No access token received');
      }

      // Create Retell client
      const client = new RetellWebClient();
      retellClientRef.current = client;

      // Set up basic event listeners
      client.on('call_started', () => {
        logger.info('Call started');
        setIsConnected(true);
        isConnectedRef.current = true; // Update ref too
        setIsConnecting(false);
        toast.success('Connected!');
        
        // Start monitoring volume for user speaking detection
        volumeMonitorIntervalRef.current = setInterval(() => {
          try {
            // Access the analyzer component's volume calculation
            const volume = (client as any).analyzerComponent?.calculateVolume?.();
            
            if (volume !== undefined) {
              // Threshold for detecting speech (adjust as needed)
              const SPEAKING_THRESHOLD = 0.01;
              const isSpeaking = volume > SPEAKING_THRESHOLD;
              
              // Only update if state changes and agent is not talking
              if (isSpeaking && !isAgentTalking) {
                setIsUserTalking(true);
                // Clear any existing timeout
                if (userSpeakingTimeoutRef.current) {
                  clearTimeout(userSpeakingTimeoutRef.current);
                  userSpeakingTimeoutRef.current = null;
                }
              } else if (!isSpeaking && isUserTalking && !isAgentTalking) {
                // Add a small delay before stopping animation to smooth transitions
                if (!userSpeakingTimeoutRef.current) {
                  userSpeakingTimeoutRef.current = setTimeout(() => {
                    setIsUserTalking(false);
                    userSpeakingTimeoutRef.current = null;
                  }, 300);
                }
              }
            }
          } catch (err) {
            // Silently handle errors to avoid console spam
          }
        }, 100); // Check every 100ms
      });

      client.on('call_ended', () => {
        logger.info('Call ended');
        setIsConnected(false);
        setIsConnecting(false);
        
        // Clean up and then auto-close the popup after a short delay
        setTimeout(() => {
          cleanup();
          onClose();
        }, 1500); // Give user 1.5 seconds to see the call ended
      });

      client.on('agent_start_talking', () => {
        logger.info('Agent started talking');
        setIsAgentTalking(true);
        setIsUserTalking(false);
      });

      client.on('agent_stop_talking', () => {
        logger.info('Agent stopped talking');
        setIsAgentTalking(false);
      });

      client.on('error', (error: any) => {
        logger.error('Retell error:', error);
        toast.error('Connection failed');
        setIsConnected(false);
        setIsConnecting(false);
        
        // Clean up and then auto-close the popup after showing the error
        setTimeout(() => {
          cleanup();
          onClose();
        }, 2000); // Give user 2 seconds to see the error
      });

      client.on('update', (update: any) => {
        // Log the structure to understand what Retell is sending
        logger.info('Retell update received:', JSON.stringify(update, null, 2));
        
        // Handle transcript - could be string or object
        if (update.transcript) {
          const transcriptText = typeof update.transcript === 'string' 
            ? update.transcript 
            : (update.transcript.content || update.transcript.text || '');
          
          // Only process non-empty transcripts that are different from the last one
          if (transcriptText && transcriptText.trim() && transcriptText !== lastTranscriptRef.current) {
            logger.info('New transcript text:', transcriptText);
            lastTranscriptRef.current = transcriptText;
            setTranscript(transcriptText);
            onTranscript?.(transcriptText);
            // Note: User speaking is now detected via volume monitoring, not transcript
          }
        }
        
        // Handle response - could be string or object
        if (update.response) {
          const responseText = typeof update.response === 'string'
            ? update.response
            : (update.response.content || update.response.text || '');
          
          // Only process non-empty responses that are different from the last one
          if (responseText && responseText.trim() && responseText !== lastResponseRef.current) {
            logger.info('New response text:', responseText);
            lastResponseRef.current = responseText;
            setResponse(responseText);
            onResponse?.(responseText);
          }
        }
        
        // Also check if update has different structure (e.g., update.text with update.type)
        if (update.type === 'transcript' && update.text) {
          const text = update.text.trim();
          if (text && text !== lastTranscriptRef.current) {
            logger.info('Alternative transcript format:', text);
            lastTranscriptRef.current = text;
            setTranscript(text);
            onTranscript?.(text);
            // Note: User speaking is now detected via volume monitoring, not transcript
          }
        }
        
        if (update.type === 'response' && update.text) {
          const text = update.text.trim();
          if (text && text !== lastResponseRef.current) {
            logger.info('Alternative response format:', text);
            lastResponseRef.current = text;
            setResponse(text);
            onResponse?.(text);
          }
        }
      });

      // Start the call
      await client.startCall({
        accessToken: data.access_token,
        sampleRate: 24000,
      });
      
      logger.info('Call started, now starting audio playback...');
      
      // IMPORTANT: Start audio playback to actually join the WebRTC session
      setTimeout(async () => {
        try {
          if (retellClientRef.current) {
            await retellClientRef.current.startAudioPlayback();
            logger.info('✅ Audio playback started - user joined the call');
          }
        } catch (audioError) {
          logger.warn('Audio playback error (non-fatal):', audioError);
        }
      }, 500);

    } catch (error: any) {
      logger.error('Failed to start call:', error);
      toast.error('Failed to connect');
      // Release lock on error
      isCallInProgressRef.current = false;
      setIsConnecting(false);
    }
  };

  const handleMute = () => {
    if (retellClientRef.current) {
      if (isMuted) {
        retellClientRef.current.unmute();
        setIsMuted(false);
      } else {
        retellClientRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleEndCall = () => {
    cleanup();
    onClose();
  };

  // Animate sound bars when someone is talking
  useEffect(() => {
    if (!isConnected || (!isAgentTalking && !isUserTalking)) {
      setSoundBars(Array(15).fill(8));
      return;
    }

    const interval = setInterval(() => {
      setSoundBars(Array(15).fill(0).map((_, index) => {
        // Create wave pattern
        const baseHeight = 8;
        const maxVariation = isAgentTalking ? 24 : 20;
        const randomVariation = Math.random() * maxVariation;
        return baseHeight + randomVariation;
      }));
    }, 150);

    return () => clearInterval(interval);
  }, [isConnected, isAgentTalking, isUserTalking]);

  // Start call when component becomes active
  useEffect(() => {
    // Only use refs in condition, not state (to avoid React hooks violation)
    if (isActive && !isCallInProgressRef.current && !isConnectedRef.current) {
      startCall();
    }
    
    // Cleanup on unmount or when modal closes
    return () => {
      // Only use refs in cleanup, not state (to avoid stale closures)
      if (isCallInProgressRef.current || isConnectedRef.current) {
        cleanup();
      }
    };
  }, [isActive]); // ONLY depend on isActive - no other deps to avoid re-renders

  if (!isActive) return null;

  // Simple glassmorphic styling without animations
  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100000,
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    margin: '0 20px',
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '24px',
  };

  const iconContainerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(255, 215, 0, 0.2)',
    border: '2px solid rgba(255, 215, 0, 0.4)',
    marginBottom: '16px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 8px 0',
  };

  const statusStyle: React.CSSProperties = {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
  };

  const transcriptStyle: React.CSSProperties = {
    padding: '16px',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    marginBottom: '24px',
    maxHeight: '120px',
    overflowY: 'auto',
  };

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  const endButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    padding: '12px 24px',
    borderRadius: '24px',
    background: 'rgba(255, 0, 0, 0.2)',
    border: '2px solid rgba(255, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <div style={modalStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            {isConnecting ? (
              <Loader2 className="animate-spin" size={40} color="white" />
            ) : (
              <Phone size={40} color="white" />
            )}
          </div>
          <h3 style={titleStyle}>{t[language].aiAssistant}</h3>
          <p style={statusStyle}>
            {isConnecting ? t[language].connecting : 
             isConnected ? t[language].connected : ''}
          </p>
        </div>

        {/* Sound Wave Visualization */}
        {isConnected && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '40px',
            gap: '3px',
            marginBottom: '20px',
            padding: '0 20px'
          }}>
            {soundBars.map((height, index) => (
              <div
                key={index}

                style={{
                  width: '3px',
                  backgroundColor: isAgentTalking 
                    ? 'rgba(135, 206, 235, 0.8)' // Sky blue for agent
                    : isUserTalking 
                    ? 'rgba(255, 215, 0, 0.8)' // Gold for user
                    : 'rgba(255, 255, 255, 0.3)', // White when idle
                  borderRadius: '2px',
                  transition: 'height 0.15s ease, background-color 0.3s ease',
                  height: `${height}px`,
                  boxShadow: (isAgentTalking || isUserTalking)
                    ? '0 0 8px rgba(255, 215, 0, 0.4)' 
                    : 'none'
                }}
              />
            ))}
          </div>
        )}

        {isConnected && (transcript || response) && (
          <div style={transcriptStyle}>
            {transcript && (
              <div style={{ color: '#FFD700', fontSize: '14px', marginBottom: '8px' }}>
                You: {transcript}
              </div>
            )}
            {response && (
              <div style={{ color: '#87CEEB', fontSize: '14px' }}>
                Assistant: {response}
              </div>
            )}
          </div>
        )}

        {isConnected && (
          <div style={controlsStyle}>
            <button 
              onClick={handleMute}

              style={{
                ...buttonStyle,
                background: isMuted ? 'rgba(255, 0, 0, 0.3)' : buttonStyle.background,
                borderColor: isMuted ? 'rgba(255, 0, 0, 0.5)' : buttonStyle.border,
              }}
              title={isMuted ? t[language].unmute : t[language].mute}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}

                style={buttonStyle}
                title={t[language].volume}
              >
                {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              {showVolumeSlider && (
                <div style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '12px',
                  borderRadius: '8px',
                  minWidth: '120px',
                }}>
                  <div style={{ color: 'white', fontSize: '12px', marginBottom: '8px', textAlign: 'center' }}>
                    {volume}%
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}

                    onChange={(e) => setVolume(parseInt(e.target.value))}

                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </div>

            <button onClick={handleEndCall}
 style={endButtonStyle}>
              <PhoneOff size={20} />
              <span>{t[language].endCall}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
