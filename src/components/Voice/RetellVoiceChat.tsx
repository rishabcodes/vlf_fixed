'use client';

import React, { useEffect, useRef, useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

import { Mic, MicOff, Phone, PhoneOff, Loader2, HelpCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { MicrophoneTroubleshootingGuide } from './MicrophoneTroubleshootingGuide';
import { VoiceCallModal } from './VoiceCallModal';

interface RetellVoiceChatProps {
  language: 'en' | 'es';
  onTranscript?: (transcript: string) => void;
  onResponse?: (response: string) => void;
}

export const RetellVoiceChat: React.FC<RetellVoiceChatProps> = ({
  language,
  onTranscript,
  onResponse,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [permissionStatus, setPermissionStatus] = useState<'unknown' | 'granted' | 'denied' | 'prompt'>('unknown');
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const callIdRef = useRef<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startVoiceCall = async () => {
    logger.info('🚀 Starting voice call process...');
    setIsConnecting(true);
    setShowVoiceModal(true); // Show modal immediately with loading state

    try {
      // Simple microphone request without any checks
      logger.info('🎤 Requesting microphone access...');
      let stream: MediaStream;
      
      // Reset any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      try {
        // Request fresh permission each time
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          }
        });
        logger.info('✅ Microphone access granted');
      } catch (micError: any) {
        logger.error('Microphone error:', micError);
        
        // Try simpler constraints as fallback
        try {
          logger.info('Trying simpler audio constraints...');
          stream = await navigator.mediaDevices.getUserMedia({ audio: {} });
          logger.info('✅ Microphone access granted with simple constraints');
        } catch (fallbackError: any) {
          logger.error('Fallback also failed:', fallbackError);
          // This is specifically a microphone error
          if (fallbackError.name === 'NotAllowedError' || fallbackError.name === 'PermissionDeniedError') {
            throw new Error('MICROPHONE_DENIED');
          } else if (fallbackError.name === 'NotFoundError') {
            throw new Error('MICROPHONE_NOT_FOUND');
          } else {
            throw new Error(`MICROPHONE_ERROR: ${fallbackError.message}`);
          }
        }
      }
      
      logger.info('Audio tracks:', stream.getAudioTracks().map(track => ({
        label: track.label,
        enabled: track.enabled,
        muted: track.muted,
        readyState: track.readyState
      })));
      
      streamRef.current = stream;

      // Set up audio level monitoring for sound wave animation
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyzerRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyzerRef.current);
        analyzerRef.current.fftSize = 256;
        
        // Start monitoring audio levels
        const monitorAudioLevel = () => {
          if (!analyzerRef.current) return;
          
          const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
          // Use time domain data for better speech detection
          analyzerRef.current.getByteTimeDomainData(dataArray);
          
          // Calculate RMS (Root Mean Square) for better voice detection
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const normalized = (dataArray[i] - 128) / 128; // Normalize to -1 to 1
            sum += normalized * normalized;
          }
          const rms = Math.sqrt(sum / dataArray.length);
          
          // Scale and clamp the value (multiply by 4 for more sensitivity)
          const level = Math.min(1, rms * 4);
          setAudioLevel(level);
          
          // Debug logging (remove after testing)
          if (level > 0.05) {
            logger.info('Audio level detected:', level);
          }
          
          animationFrameRef.current = requestAnimationFrame(monitorAudioLevel);
        };
        
        // Start monitoring after we set up the analyzer
        setTimeout(() => monitorAudioLevel(), 100);
      } catch (audioError) {
        logger.warn('Could not set up audio monitoring:', audioError);
      }

      // Create web call via API
      logger.info('📞 Creating web call via API...');
      const response = await fetch('/api/retell/create-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        logger.error('❌ API Error:', { status: response.status, errorText });
        throw new Error(`Failed to create call: ${response.status}`);
      }

      const data = await response.json();
      logger.info('✅ Call created successfully:', data);
      callIdRef.current = data.callId;

      // Set up media recorder for audio capture
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        mediaRecorderRef.current = new MediaRecorder(stream, { 
          mimeType: 'audio/webm' 
        });
      } else {
        mediaRecorderRef.current = new MediaRecorder(stream);
      }

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        logger.info('🎵 Processing audio data...');
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        audioChunksRef.current = [];
        
        // Send audio to speech recognition service
        await processAudio(audioBlob);
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsConnected(true);
      setIsConnecting(false);
      setShowVoiceModal(true); // Show the glassmorphic modal
      
      logger.info('✅ Voice call session started');
      // Remove toast since we have the modal now
    } catch (error: any) {
      logger.error('❌ Failed to start voice call:', error);
      logger.error('Error details:', { name: error.name, message: error.message });
      setIsConnecting(false);
      setShowVoiceModal(false); // Hide modal on error
      
      // Handle different types of errors with specific user guidance
      let errorMessage = '';
      let instructions = '';
      
      // Check if it's a microphone-specific error
      if (error.message?.includes('MICROPHONE_DENIED')) {
        errorMessage = language === 'es' ? 'Permiso de micrófono denegado' : 'Microphone permission denied';
        instructions = language === 'es' 
          ? 'Actualiza la página y permite el micrófono'
          : 'Refresh the page and allow microphone';
      } else if (error.message?.includes('MICROPHONE_NOT_FOUND')) {
        errorMessage = language === 'es' ? 'Micrófono no encontrado' : 'No microphone found';
        instructions = language === 'es'
          ? 'Por favor conecta un micrófono'
          : 'Please connect a microphone';
      } else if (error.message?.includes('MICROPHONE_ERROR')) {
        errorMessage = language === 'es' ? 'Error de micrófono' : 'Microphone error';
        instructions = error.message.replace('MICROPHONE_ERROR: ', '');
      } else if (error.message?.includes('Failed to create call')) {
        // API error - not microphone related
        errorMessage = language === 'es' ? 'Error de conexión' : 'Connection error';
        instructions = language === 'es' 
          ? 'No se pudo conectar con el servicio. Intenta de nuevo.'
          : 'Could not connect to service. Please try again.';
      } else {
        // Other errors - show actual error
        errorMessage = language === 'es' ? 'Error' : 'Error';
        instructions = error.message || (language === 'es' ? 'Por favor intenta de nuevo' : 'Please try again');
      }
      
      toast.error(`${errorMessage}. ${instructions}`, { duration: 6000 });
      
      // Show detailed instructions in console for debugging
      logger.info('🔧 Troubleshooting steps:');
      logger.info('1. Check if microphone is connected and working');
      logger.info('2. Allow microphone permission when prompted');
      logger.info('3. Make sure no other apps are using the microphone');
      logger.info('4. Try refreshing the page');
      logger.info('5. Check browser settings for microphone permissions');
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.webm');
      formData.append('language', language);
      if (callIdRef.current) {
        formData.append('callId', callIdRef.current);
      }

      const response = await fetch('/api/voice/process-audio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.transcript) {
          setTranscript(result.transcript);
          onTranscript?.(result.transcript);
        }
        if (result.response) {
          onResponse?.(result.response);
        }
      }
    } catch (error) {
      logger.error('Error processing audio:', error);
    }
  };

  const endVoiceCall = () => {
    logger.info('🛑 Ending voice call...');
    
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Clean up audio monitoring
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsConnected(false);
    setShowVoiceModal(false); // Hide the modal
    setAudioLevel(0);
    callIdRef.current = null;
    
    toast.success(language === 'es' ? 'Sesión de voz finalizada' : 'Voice session ended');
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
        }
};

  const toggleRecording = () => {
    if (mediaRecorderRef.current) {
      if (isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      } else {
        mediaRecorderRef.current.start();
        setIsRecording(true);
      }
    }
  };

  // Check microphone permission status on mount
  useEffect(() => {
    const checkPermissionStatus = async () => {
      // Skip permission check on mount - let user click button to trigger permission
      // This prevents the button from being disabled before user has a chance to grant permission
      if (navigator.permissions && false) { // Disabled automatic check
        try {
          const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          setPermissionStatus(permission.state as any);
          
          // Listen for permission changes
          permission.onchange = () => {
            setPermissionStatus(permission.state as any);
          };
        } catch (error) {
          logger.warn('Could not check microphone permission:', error);
        }
      }
    };
    
    checkPermissionStatus();
  }, []);

  // Test microphone access function
  const testMicrophoneAccess = async () => {
    try {
      logger.info('🧪 Testing microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      logger.info('✅ Microphone test successful');
      setPermissionStatus('granted');
      
      // Clean up test stream
      stream.getTracks().forEach(track => track.stop());
      
      toast.success(language === 'es' ? 'Micrófono funcionando correctamente' : 'Microphone working correctly');
    } catch (error: any) {
      logger.error('❌ Microphone test failed:', error);
      setPermissionStatus('denied');
      toast.error(language === 'es' ? 'Problema con micrófono' : 'Microphone issue');
        }
};

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
          }
};
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Permission Status Indicator */}
      {permissionStatus !== 'unknown' && (
        <div className={`w-2 h-2 rounded-full ${
          permissionStatus === 'granted' ? 'bg-green-500' : 
          permissionStatus === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
        }`} title={`Microphone: ${permissionStatus}`} />
      )}
      
      <>
        {!isConnected ? (
          <div className="flex items-center gap-1">
            {/* Help/Troubleshooting Button */}
            {(permissionStatus === 'denied' || permissionStatus === 'unknown') && (
              <button
                key="help"
onClick={() => setShowTroubleshooting(true)}

                className="p-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-all"
                title={language === 'es' ? 'Ayuda con micrófono' : 'Microphone help'}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            )}
            
            {/* Test Microphone Button (only show if permission issues) */}
            {permissionStatus === 'denied' && (
              <button
                key="test"
onClick={testMicrophoneAccess} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                title={language === 'es' ? 'Probar micrófono' : 'Test microphone'}
              >
                <Mic className="w-4 h-4" />
              </button>
            )}
            
            <button
              key="start"
onClick={startVoiceCall} disabled={isConnecting} className={`p-3 rounded-full hover:shadow-lg transition-all disabled:opacity-50 ${
                isConnecting 
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-gold-500 to-gold-600 text-black'
              }`}
              title={language === 'es' ? 'Iniciar sesión de voz' : 'Start voice session'}
            >
              {isConnecting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Phone className="w-5 h-5" />
              )}
            </button>
          </div>
        ) : (
          <>
            <button
              key="mute"
onClick={toggleMute} className={`p-3 rounded-full transition-all ${
                isMuted ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={language === 'es' ? 'Silenciar/Activar' : 'Mute/Unmute'}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              key="record"
onClick={toggleRecording} className={`p-3 rounded-full transition-all ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={language === 'es' ? 'Iniciar/Detener grabación' : 'Start/Stop Recording'}
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              key="end"
onClick={endVoiceCall} className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
              title={language === 'es' ? 'Finalizar sesión' : 'End session'}
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </>
        )}
      </>

      {transcript && (
        <div
className="absolute bottom-full mb-2 left-0 right-0 bg-black/80 text-white p-2 rounded-lg text-sm max-w-xs"
        >
          <strong>You said:</strong> {transcript}
        </div>
      )}

      <MicrophoneTroubleshootingGuide
        language={language}
        isOpen={showTroubleshooting}
                onClose={() => setShowTroubleshooting(false)}
      />

      <VoiceCallModal
        isOpen={showVoiceModal}
                onClose={() => setShowVoiceModal(false)}
                onEndCall={endVoiceCall}
        language={language}
        isMuted={isMuted}
                onToggleMute={toggleMute}
        isConnecting={isConnecting}
        isConnected={isConnected}
        audioLevel={audioLevel}
      />
    </div>
  );
};
