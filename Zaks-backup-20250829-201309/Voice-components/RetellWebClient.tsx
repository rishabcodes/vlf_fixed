'use client';

import React, { useEffect, useRef, useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { RetellWebClient } from 'retell-client-js-sdk';
import { toast } from 'react-hot-toast';

interface RetellWebClientProps {
  isActive: boolean;
  onClose: () => void;
  language?: 'en' | 'es';
}

export const RetellVoiceClient: React.FC<RetellWebClientProps> = ({
  isActive,
  onClose,
  language = 'en'
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const retellClientRef = useRef<RetellWebClient | null>(null);

  useEffect(() => {
    if (isActive && !isConnected && !isConnecting) {
      startCall();
    } else if (!isActive && isConnected) {
      endCall();
    }
  }, [isActive]);

  const startCall = async () => {
    logger.info('🎤 Starting Retell call...');
    setIsConnecting(true);

    try {
      // First, get the call credentials from your backend
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
        throw new Error('Failed to create call');
      }

      const { access_token, call_id } = await response.json();
      logger.info('✅ Got call credentials:', { call_id });

      // Initialize Retell Web Client
      const retellClient = new RetellWebClient();
      retellClientRef.current = retellClient;

      // Set up event listeners
      retellClient.on('connect', () => {
        logger.info('✅ Connected to Retell');
        setIsConnected(true);
        setIsConnecting(false);
        toast.success('Voice assistant connected!');
      });

      retellClient.on('disconnect', () => {
        logger.info('❌ Disconnected from Retell');
        setIsConnected(false);
        setIsConnecting(false);
      });

      retellClient.on('update', (update) => {
        logger.info('📝 Update:', update);
        
        // Handle transcript updates
        if (update.transcript) {
          setTranscript(update.transcript);
        }

        // Handle response updates
        if (update.response) {
          setResponse(update.response);
        }
      });

      retellClient.on('error', (error) => {
        logger.error('❌ Retell error:', error);
        toast.error('Voice assistant error: ' + error.message);
        setIsConnecting(false);
        setIsConnected(false);
      });

      retellClient.on('audio', (audio: Uint8Array) => {
        logger.info('🔊 Received audio data:', audio.length, 'bytes');
        // Audio is automatically played by the SDK
      });

      // Start the call
      await retellClient.startCall({
        accessToken: access_token,
        callId: call_id,
        sampleRate: 24000,
        enableUpdate: true,
        emitRawAudioSamples: false // Set to true if you want to visualize audio
      });

      logger.info('✅ Call started successfully');

    } catch (error: any) {
      logger.error('❌ Failed to start call:', error);
      toast.error('Failed to connect voice assistant');
      setIsConnecting(false);
      setIsConnected(false);
      onClose();
        }
};

  const endCall = () => {
    if (retellClientRef.current) {
      logger.info('📞 Ending call...');
      retellClientRef.current.stopCall();
      retellClientRef.current = null;
      setIsConnected(false);
      setTranscript('');
      setResponse('');
        }
};

  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      width: '350px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      zIndex: 9999
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0 }}>Voice Assistant</h3>
        <button 
          onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ 
          padding: '10px',
          background: '#f0f0f0',
          borderRadius: '8px',
          marginBottom: '10px'
        }}>
          <strong>Status:</strong> {
            isConnecting ? '🔄 Connecting...' :
            isConnected ? '🟢 Connected' :
            '🔴 Disconnected'
          }
        </div>

        {transcript && (
          <div style={{ 
            padding: '10px',
            background: '#e3f2fd',
            borderRadius: '8px',
            marginBottom: '10px'
          }}>
            <strong>You:</strong> {transcript}
          </div>
        )}

        {response && (
          <div style={{ 
            padding: '10px',
            background: '#f3e5f5',
            borderRadius: '8px'
          }}>
            <strong>Assistant:</strong> {response}
          </div>
        )}
      </div>

      {isConnected && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            🎤
          </div>
          <p style={{ marginTop: '10px', color: '#666' }}>Listening...</p>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(102, 126, 234, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
          }
        }
      `}</style>
    </div>
  );
};