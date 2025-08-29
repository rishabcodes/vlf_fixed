'use client';

import React, { useEffect, useRef, useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

interface MicrophoneWaveformProps {
  isActive: boolean;
  barCount?: number;
}

export const MicrophoneWaveform: React.FC<MicrophoneWaveformProps> = ({ 
  isActive, 
  barCount = 20 
}) => {
  const [bars, setBars] = useState<number[]>(Array(barCount).fill(5));
  const [micLevel, setMicLevel] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Start microphone monitoring
  const startMicrophoneMonitoring = async () => {
    try {
      logger.info('🎤 [MicrophoneWaveform] Starting microphone monitoring...');
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 48000
        }
      });
      
      micStreamRef.current = stream;
      setHasPermission(true);
      
      // Create audio context and analyser
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.3;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      setIsMonitoring(true);
      
      // Start monitoring loop
      const monitorAudio = () => {
        if (!analyserRef.current) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalizedLevel = Math.min(100, (average / 255) * 200); // Scale to 0-100
        
        setMicLevel(normalizedLevel);
        
        // Update bars based on mic level
        if (normalizedLevel > 1) {
          const newBars = Array(barCount).fill(0).map((_, index) => {
            const centerIndex = barCount / 2;
            const distance = Math.abs(index - centerIndex);
            const maxDistance = barCount / 2;
            const falloff = 1 - (distance / maxDistance);
            
            const baseHeight = normalizedLevel * falloff;
            const wave = Math.sin((index / barCount) * Math.PI * 2 + Date.now() / 100) * 10;
            const randomVariation = Math.random() * 10;
            
            return Math.min(100, Math.max(5, baseHeight + wave + randomVariation));
          });
          setBars(newBars);
        } else {
          setBars(Array(barCount).fill(5));
        }
        
        animationFrameRef.current = requestAnimationFrame(monitorAudio);
      };
      
      monitorAudio();
      logger.info('✅ [MicrophoneWaveform] Monitoring started successfully');
      
    } catch (error) {
      logger.error('❌ [MicrophoneWaveform] Failed to start monitoring:', error);
      setHasPermission(false);
      setIsMonitoring(false);
        }
};

  // Stop microphone monitoring
  const stopMicrophoneMonitoring = () => {
    logger.info('🛑 [MicrophoneWaveform] Stopping microphone monitoring...');
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    
    analyserRef.current = null;
    setIsMonitoring(false);
    setBars(Array(barCount).fill(5));
    setMicLevel(0);
  };

  // Effect to start/stop monitoring based on isActive prop
  useEffect(() => {
    if (isActive && !isMonitoring) {
      startMicrophoneMonitoring();
    } else if (!isActive && isMonitoring) {
      stopMicrophoneMonitoring();
    }

    return () => {
      if (isMonitoring) {
        stopMicrophoneMonitoring();
          }
};
  }, [isActive]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label */}
      <div className="text-xs font-medium text-white/70">
        Your Voice
      </div>
      
      {/* Waveform bars */}
      <div className="flex items-center justify-center gap-1 h-16">
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-1.5 bg-gradient-to-t from-blue-500 to-blue-300 rounded-full transition-all duration-75"
            style={{
              height: `${height}%`,
              opacity: height > 10 ? 1 : 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`} />
        <span className="text-xs text-white/50">
          {isMonitoring ? `Level: ${Math.round(micLevel)}%` : 'Inactive'}
        </span>
      </div>
      
      {/* Permission status */}
      {!hasPermission && isActive && (
        <div className="text-xs text-yellow-400">
          Please allow microphone access
        </div>
      )}
    </div>
  );
};