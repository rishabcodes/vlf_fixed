'use client';

import React, { useEffect, useRef, useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { RetellWebClient } from 'retell-client-js-sdk';
import { toast } from 'react-hot-toast';

import { Phone, PhoneOff, Mic, MicOff, Loader2 } from 'lucide-react';

interface RetellWebSDKClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
  onAudioLevelChange?: (level: number) => void;
}

export const RetellWebSDKClient: React.FC<RetellWebSDKClientProps> = ({
  isActive,
  onClose,
  language = 'en',
  onTranscript,
  onResponse,
  onAudioLevelChange
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isAgentTalking, setIsAgentTalking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [microphoneLevel, setMicrophoneLevel] = useState(0);
  const [aiAudioLevel, setAiAudioLevel] = useState(0);
  
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isActive && !isConnected && !isConnecting) {
      startCall();
    } else if (!isActive && isConnected) {
      endCall();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  // Combine microphone and AI audio levels for waveform visualization
  useEffect(() => {
    // Use the higher of the two audio levels for visualization
    const combinedLevel = Math.max(microphoneLevel, aiAudioLevel);
    onAudioLevelChange?.(combinedLevel);
  }, [microphoneLevel, aiAudioLevel, onAudioLevelChange]);

  const setupMicrophoneMonitoring = async () => {
    try {
      console.log('🎤 Setting up microphone audio level monitoring...');
      
      // Get user microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      
      micStreamRef.current = stream;
      
      // Set up audio analysis
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      // Start monitoring microphone levels
      const monitorMicrophoneLevel = () => {
        if (!analyserRef.current) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteTimeDomainData(dataArray);
        
        // Calculate RMS (Root Mean Square) for better voice detection
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const normalized = (dataArray![i] - 128) / 128; // Normalize to -1 to 1
          sum += normalized * normalized;
        }
        const rms = Math.sqrt(sum / dataArray.length);
        
        // Scale and clamp the value (multiply by 4 for more sensitivity)
        const level = Math.min(1, rms * 4);
        setMicrophoneLevel(level);
        
        // Update user talking status based on microphone level
        if (level > 0.05) {
          setIsUserTalking(true);
        } else {
          // Only stop user talking if level drops below threshold for a bit
          setTimeout(() => {
            if (microphoneLevel < 0.05) {
              setIsUserTalking(false);
            }
          }, 200);
        }
        
        animationFrameRef.current = requestAnimationFrame(monitorMicrophoneLevel);
      };
      
      // Start monitoring
      monitorMicrophoneLevel();
      console.log('✅ Microphone monitoring started');
      
    } catch (error) {
      console.warn('Could not set up microphone monitoring:', error);
    }
  };

  const startCall = async () => {
    logger.info('🎤 Starting Retell Web SDK call...');
    setIsConnecting(true);
    const callStartTime = Date.now();

    try {
      // Step 1: Get call credentials from your backend
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

      // Step 2: IMMEDIATELY Initialize and Connect (critical for 30-second window)
      logger.info('🚀 Connecting immediately to avoid timeout...');
      const retellClient = new RetellWebClient();
      retellClientRef.current = retellClient;

      // Step 3: Set up minimal event listeners (don't delay connection)
      let isCallStarted = false;
      
      // Quick event setup - minimal to not delay connection
      retellClient.on('call_started', () => {
        logger.info('✅ Call started successfully at', Date.now() - callStartTime, 'ms');
        isCallStarted = true;
        setIsConnected(true);
        setIsConnecting(false);
        toast.success('Connected!');
        
        // Set up microphone audio level monitoring after successful connection
        setupMicrophoneMonitoring();
      });

      retellClient.on('call_ended', () => {
        logger.info('📞 Call ended');
        setIsConnected(false);
        cleanup();
      });

      retellClient.on('error', (error: any) => {
        logger.error('❌ Retell error:', error);
        logger.error('Error occurred at', Date.now() - callStartTime, 'ms after start');
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
        
        // Handle different update types
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

      // Raw audio events for visualization (AI audio from Retell)
      retellClient.on('audio', (audio: Float32Array) => {
        // Calculate AI audio level for visualization
        if (audio && audio.length > 0) {
          const sum = audio.reduce((acc, val) => acc + Math.abs(val), 0);
          const average = sum / audio.length;
          const level = Math.min(1, average * 5); // Scale to 0-1
          setAiAudioLevel(level);
        }
      });

      // Step 4: START CALL IMMEDIATELY - This is critical!
      // Must join within 30 seconds of token creation
      logger.info('⏱️ Starting call at', Date.now() - callStartTime, 'ms after request');
      
      try {
        // Minimal config for fastest connection
        await retellClient.startCall({
          accessToken: access_token,
          sampleRate: 24000,
        });
        
        logger.info('✅ startCall() completed at', Date.now() - callStartTime, 'ms');
        
        // Try to start audio playback after connection
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
      setIsConnecting(false);
      setIsConnected(false);
      cleanup();
      onClose();
    }
  };

  const endCall = () => {
    logger.info('📞 Ending call...');
    if (retellClientRef.current) {
      try {
        retellClientRef.current.stopCall();
      } catch (error) {
        logger.error('Error stopping call:', error);
      }
    }
    cleanup();
  };

  const cleanup = () => {
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Stop microphone stream
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    
    // Reset refs
    retellClientRef.current = null;
    analyserRef.current = null;
    
    // Reset state
    setIsConnected(false);
    setIsConnecting(false);
    setTranscript('');
    setResponse('');
    setIsAgentTalking(false);
    setIsUserTalking(false);
    setMicrophoneLevel(0);
    setAiAudioLevel(0);
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
  // Determine who is talking for visualization
  const isSomeoneTalking = isAgentTalking || isUserTalking;

  if (!isActive) return null;

  return (
    <div>
      {/* Header */}
      <div>
        <h3>
          {isConnecting ? '🔄 Connecting...' :
           isConnected ? '🟢 Voice Assistant' :
           '🔴 Disconnected'}
        </h3>
        <button 
          onClick={onClose}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          ✕
        </button>
      </div>

      {/* Status Messages */}
      <div>
        {isConnecting && (
          <div>
            <Loader2 className="animate-spin" />
            <p>Initiating call. Please wait...</p>
          </div>
        )}

        {isConnected && (
          <>
            {/* Voice Activity Indicator */}
            <div>
              <div>
                {isAgentTalking ? '🤖 Assistant is speaking...' :
                 isUserTalking ? '🎤 You are speaking...' :
                 '🎧 Listening...'}
              </div>
            </div>

            {/* Transcript */}
            {transcript && (
              <div>
                <strong>You:</strong> {transcript}
              </div>
            )}

            {/* Response */}
            {response && (
              <div>
                <strong>Assistant:</strong> {response}
              </div>
            )}
          </>
        )}
      </div>

      {/* Sound Wave Visualization */}
      {isConnected && (
        <div>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: isSomeoneTalking ? 
                  `${Math.random() * 30 + 10}px` : 
                  '10px'
              }}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      {isConnected && (
        <div>
          <button 
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button 
            onClick={endCall}
          >
            <PhoneOff size={20} />
            End Call
          </button>
        </div>
      )}
    </div>
  );
};