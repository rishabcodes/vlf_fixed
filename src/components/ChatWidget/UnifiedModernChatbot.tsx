'use client';

import React, { useState, useRef, useEffect } from 'react';
// Removed framer-motion for performance
import {
  MessageCircle,
  X,
  Send,
  ArrowUp,
  Mic,
  MicOff,
  Paperclip,
  Calendar,
  Bot,
  User,
  Loader2,
  FileText,
  Phone,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { sendChatMessage } from '@/services/chat-service';
// Lazy load voice component for better performance
import dynamic from 'next/dynamic';
const MinimalRetellClient = dynamic(
  () => import('@/components/Voice/MinimalRetellClient').then(mod => mod.MinimalRetellClient),
  { 
    loading: () => <div className="flex items-center justify-center p-4"><Loader2 className="animate-spin" /></div>,
    ssr: false 
  }
);

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'document' | 'voice' | 'appointment';
  metadata?: any;
}

interface ChatbotProps {
  language?: 'en' | 'es';
  initiallyOpen?: boolean;
}

export const UnifiedModernChatbot: React.FC<ChatbotProps> = ({ language: initialLang = 'en', initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(initialLang);
  const [isRecording, setIsRecording] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [contactInfo, setContactInfo] = useState<{ name?: string; email?: string; phone?: string }>(
    {}
  );
  const [ghlContactId, setGhlContactId] = useState<string | null>(null);
  const [ghlNoteIds, setGhlNoteIds] = useState<string[]>([]);
  const [servicesReady, setServicesReady] = useState(false);
  const [conversationStartTime] = useState(new Date());
  const [sessionId] = useState(`session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initialize socket lazily after UI is shown
  const { socket } = useSocket();

  // Translations
  const t = {
    en: {
      title: 'How can we help you today?',
      placeholder: 'Type your message...',
      upload: 'Upload document',
      appointment: 'Schedule appointment',
      listening: 'Listening...',
      processing: 'Processing...',
      welcome:
        "Hi! I'm your legal assistant. I can help you with legal questions, document analysis, and scheduling appointments. How may I assist you today?",
      error: 'Something went wrong. Please try again.',
      documentUploaded: 'Document uploaded successfully',
      appointmentScheduled: 'Appointment scheduled successfully',
    },
    es: {
      title: '¿Cómo podemos ayudarte hoy?',
      placeholder: 'Escribe tu mensaje...',
      upload: 'Subir documento',
      appointment: 'Agendar cita',
      listening: 'Escuchando...',
      processing: 'Procesando...',
      welcome:
        '¡Hola! Soy tu asistente legal. Puedo ayudarte con preguntas legales, análisis de documentos y agendar citas. ¿En qué puedo asistirte hoy?',
      error: 'Algo salió mal. Por favor intenta de nuevo.',
      documentUploaded: 'Documento subido exitosamente',
      appointmentScheduled: 'Cita agendada exitosamente',
    },
  };

  // Initialize welcome message immediately
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: '1',
          content: t[language].welcome,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        },
      ]);
      
      // Mark services as ready after a short delay
      setTimeout(() => setServicesReady(true), 500);
    }
  }, [isOpen]); // Remove dependencies to run only once when opened

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: any) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: data.content,
        sender: 'bot',
        timestamp: new Date(),
        type: data.type || 'text',
        metadata: data.metadata,
      };
      setMessages(prev => [...prev, newMessage]);
      setIsLoading(false);
      
      // Refocus input after AI response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      // Note: Messages are saved to GHL at session end
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [socket, ghlContactId]);

  // Auto-save conversation every 60 seconds
  useEffect(() => {
    if (!ghlContactId || messages.length === 0) return;

    const autoSaveInterval = setInterval(async () => {
      try {
        const conversationHistory = messages.map(msg => ({
          sender: msg.sender,
          text: msg.content,
          timestamp: msg.timestamp
        }));

        const response = await fetch('/api/chat/save-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            conversationHistory,
            ghlContactId,
            ghlNoteId: ghlNoteIds[0], // Use most recent note
            phoneNumber: contactInfo.phone,
            contactName: contactInfo.name
          })
        });

        if (response.ok) {
          const data = await response.json();
          setLastAutoSave(new Date());
          
          // Update note ID if a new one was created
          if (data.noteId && !ghlNoteIds.includes(data.noteId)) {
            setGhlNoteIds(prev => [data.noteId, ...prev.slice(0, 9)]);
          }
          
          console.log('[Auto-save] Conversation saved', data);
        }
      } catch (error) {
        console.error('[Auto-save] Failed:', error);
      }
    }, 60000); // Every 60 seconds

    return () => clearInterval(autoSaveInterval);
  }, [ghlContactId, messages, sessionId, contactInfo, ghlNoteIds]);

  // Save conversation on tab/browser close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (messages.length > 0 && ghlContactId) {
        // Save conversation synchronously using sendBeacon
        const conversationHistory = messages.map(msg => ({
          sender: msg.sender,
          text: msg.content,
          timestamp: msg.timestamp
        }));

        const payload = JSON.stringify({
          sessionId,
          conversationHistory,
          ghlContactId,
          ghlNoteId: ghlNoteIds[0],
          phoneNumber: contactInfo.phone,
          contactName: contactInfo.name,
          isAbandoned: true // Mark as abandoned since user closed abruptly
        });

        // sendBeacon ensures the request completes even if page closes
        navigator.sendBeacon('/api/chat/save-conversation', payload);
        
        // Also try to end the session
        const endPayload = JSON.stringify({
          sessionId,
          messages: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content,
            timestamp: m.timestamp,
            agent: m.metadata?.agent
          })),
          startTime: conversationStartTime,
          contactId: ghlContactId,
          noteId: ghlNoteIds[0],
          contactName: contactInfo.name,
          contactPhone: contactInfo.phone,
          abandoned: true
        });
        
        navigator.sendBeacon('/api/chat/end-session', endPayload);
      }
    };

    // Add event listeners for various close events
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
    };
  }, [messages, ghlContactId, ghlNoteIds, sessionId, contactInfo, conversationStartTime]);

  // Lazy load GHL services
  const ghlServicesRef = useRef<{
    createGHLContact?: any;
    addGHLNote?: any;
    scheduleGHLAppointment?: any;
    uploadToGHL?: any;
  }>({});

  // Load GHL services when needed
  const loadGHLServices = async () => {
    if (!ghlServicesRef.current.createGHLContact) {
      const [contacts, appointments, documents] = await Promise.all([
        import('@/services/gohighlevel/contacts'),
        import('@/services/gohighlevel/appointments'),
        import('@/services/gohighlevel/documents'),
      ]);
      ghlServicesRef.current = {
        createGHLContact: contacts.createGHLContact,
        addGHLNote: contacts.addGHLNote,
        scheduleGHLAppointment: appointments.scheduleGHLAppointment,
        uploadToGHL: documents.uploadToGHL,
      };
    }
    return ghlServicesRef.current;
  };

  // Create or update GHL contact
  const ensureGHLContact = async () => {
    if (!ghlContactId && (contactInfo.email || contactInfo.phone)) {
      try {
        const services = await loadGHLServices();
        const contact = await services.createGHLContact({
          firstName: contactInfo.name?.split(' ')[0] || 'Website',
          lastName: contactInfo.name?.split(' ').slice(1).join(' ') || 'Visitor',
          email: contactInfo.email,
          phone: contactInfo.phone,
          source: 'Website Chat',
          tags: ['chat-lead', language],
        });
        setGhlContactId(contact.id);
        return contact.id;
      } catch (error) {
        console.error('Failed to create GHL contact:', error);
      }
    }
    return ghlContactId;
  };

  // Send message
  const handleSendMessage = async (content: string | any, type: 'text' | 'voice' = 'text') => {
    // Handle both string and object inputs from voice assistant
    const messageText = typeof content === 'string' 
      ? content 
      : (content?.content || content?.text || '');
    
    // Safety check - ensure we have a string
    if (!messageText || typeof messageText !== 'string' || !messageText.trim()) {
      console.warn('Invalid message content:', content);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText, // Use the extracted text, not the original content
      sender: 'user',
      timestamp: new Date(),
      type,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Keep input focused after sending message
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    // Extract contact info from message
    const emailMatch = messageText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    const phoneMatch = messageText.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/);

    if (emailMatch) setContactInfo(prev => ({ ...prev, email: emailMatch[0] }));
    if (phoneMatch) setContactInfo(prev => ({ ...prev, phone: phoneMatch[0] }));

    try {
      // Ensure GHL contact exists
      const contactId = await ensureGHLContact();

      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        sender: msg.sender,
        text: msg.content,
        timestamp: msg.timestamp
      }));

      // Send to chat service with our session ID and full context
      // Always pass all contact info to maintain continuity across language switches
      const response = await sendChatMessage({
        message: messageText,
        language,
        sessionId: sessionId, // Use our consistent session ID
        contactId,
        contactName: contactInfo.name || undefined, // Always pass the name if we have it
        phoneNumber: contactInfo.phone || undefined, // Always pass the phone if we have it
        ghlContactId: ghlContactId || undefined, // Pass GHL ID to maintain contact continuity
        ghlNoteIds: ghlNoteIds,
        conversationHistory // Full history preserves context
      });

      // Note: Individual messages are saved at session end for better performance
      
      // Update contact info if extracted
      if (response.extractedInfo?.name) {
        setContactInfo(prev => ({ ...prev, name: response.extractedInfo.name }));
      }
      if (response.extractedInfo?.email) {
        setContactInfo(prev => ({ ...prev, email: response.extractedInfo.email }));
      }
      if (response.extractedInfo?.phone) {
        setContactInfo(prev => ({ ...prev, phone: response.extractedInfo.phone }));
      }
      if (response.ghlContactId) {
        setGhlContactId(response.ghlContactId);
      }
      if (response.ghlNoteIds) {
        setGhlNoteIds(response.ghlNoteIds);
      }

      // If socket is not connected, show response directly
      if (!socket?.connected) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.response || response.message,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        
        // Refocus input after bot response
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
      
      // Refocus input even on error
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t[language].error,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    try {
      // Upload to GHL if contact exists
      const contactId = await ensureGHLContact();
      if (contactId) {
        const services = await loadGHLServices();
        if (services.uploadToGHL) {
          await services.uploadToGHL(contactId, file);
        }
      }

      // Process document
      const response = await fetch('/api/chat/document', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      const documentMessage: Message = {
        id: Date.now().toString(),
        content: `📄 ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'document',
        metadata: { fileName: file.name, fileSize: file.size },
      };

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.analysis || t[language].documentUploaded,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };

      setMessages(prev => [...prev, documentMessage, responseMessage]);
    } catch (error) {
      console.error('Failed to upload document:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t[language].error,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      
      // Refocus input after document upload
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      // Check if we're on the client and mediaDevices is available
      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Voice recording not supported');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = event => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const processAudioBlob = async (blob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', blob);
    formData.append('language', language);

    try {
      const response = await fetch('/api/chat/voice', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.transcript) {
        handleSendMessage(data.transcript, 'voice');
      }
    } catch (error) {
      console.error('Failed to process audio:', error);
      setIsLoading(false);
      
      // Refocus input on audio error
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // End conversation and save to GHL
  const endConversation = async () => {
    if (messages.length > 1 && (contactInfo.phone || ghlContactId)) {
      try {
        const response = await fetch('/api/chat/end-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            messages: messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.content,
              timestamp: m.timestamp,
              agent: m.metadata?.agent
            })),
            startTime: conversationStartTime,
            contactId: ghlContactId,
            noteId: ghlNoteIds[0], // Pass most recent note ID
            contactName: contactInfo.name,
            contactPhone: contactInfo.phone
          })
        });
        
        const result = await response.json();
        console.log('Conversation saved:', result);
      } catch (error) {
        console.error('Failed to save conversation:', error);
      }
    }
  };

  // Schedule appointment
  const handleScheduleAppointment = async () => {
    setIsLoading(true);
    try {
      const contactId = await ensureGHLContact();
      if (!contactId) {
        throw new Error('Contact information required');
      }

      const services = await loadGHLServices();
      const appointment = await services.scheduleGHLAppointment({
        contactId,
        title: 'Legal Consultation',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 30,
        appointmentStatus: 'pending',
      });

      const appointmentMessage: Message = {
        id: Date.now().toString(),
        content: t[language].appointmentScheduled,
        sender: 'bot',
        timestamp: new Date(),
        type: 'appointment',
        metadata: appointment,
      };

      setMessages(prev => [...prev, appointmentMessage]);
    } catch (error) {
      console.error('Failed to schedule appointment:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: t[language].error,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      
      // Refocus input after document upload
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <>
      {/* Invisible backdrop to detect clicks outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Chat Button - Always visible for toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log('Chat button clicked, toggling chat...');
          
          // Toggle immediately for responsive UI
          setIsOpen(!isOpen);
          
          // Save conversation in background if closing
          if (isOpen && messages.length > 1) {
            endConversation().catch(err => 
              console.error('Failed to save conversation:', err)
            );
          }
        }}
        className="fixed bottom-6 right-6 z-[10000] bg-[#C9974D] text-white p-4 rounded-full shadow-2xl hover:bg-[#E5B568] transition-all duration-300 cursor-pointer animate-fadeInScale"
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window - Reduced size by 20% (from 400x600 to 320x480) */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[9999] w-[320px] h-[480px] bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="bg-[#C9974D] text-black p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold text-sm">{t[language].title}</h3>
                  <p className="text-xs opacity-80">
                    Vasquez Law Firm
                    {!servicesReady && (
                      <span className="ml-2 text-xs opacity-60">• Connecting...</span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  // Switch language but preserve all contact info and conversation context
                  const newLang = language === 'en' ? 'es' : 'en';
                  setLanguage(newLang);
                  
                  // If we have messages, send a language switch notification to maintain context
                  if (messages.length > 0 && (contactInfo.name || ghlContactId)) {
                    // The next message sent will include all the preserved contact info
                    // No need to send a special message, just switch the language
                    console.log('Language switched, preserving context:', { 
                      contactInfo, 
                      ghlContactId, 
                      sessionId,
                      newLang 
                    });
                  }
                }}
                className="text-xs px-2 py-1 bg-black/20 rounded-full hover:bg-black/30 transition-colors"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}

                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user' ? 'bg-[#C9974D] text-black' : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.type === 'document' && (
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Document</span>
                      </div>
                    )}
                    {message.type === 'voice' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Mic className="w-4 h-4" />
                        <span className="text-sm font-medium">Voice Message</span>
                      </div>
                    )}
                    {message.type === 'appointment' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Appointment</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-white p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Scaled down for smaller widget */}
            <div className="border-t border-gray-800 p-3">
              <div className="flex items-center gap-1 mb-2">
                <button
                  onClick={() => fileInputRef.current?.click()}

                className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowVoiceAssistant(true)}

                className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading}
                  title={language === 'es' ? 'Asistente de voz' : 'Voice assistant'}
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={handleScheduleAppointment}

                className="p-1.5 text-gray-400 hover:text-white transition-colors"
                  disabled={isLoading || !contactInfo.email}
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}

                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}

                onChange={e => setInputValue(e.target.value)}

                placeholder={t[language].placeholder}

                className="flex-1 bg-gray-800 text-white px-3 py-1.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading || isRecording}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-primary text-black p-1.5 rounded-full hover:bg-primary-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </form>
              <input
                ref={fileInputRef}

                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                className="hidden"
              />
            </div>
          </div>
        )}
      
      {/* Voice Assistant Modal - Minimal stable version */}
      <MinimalRetellClient
        isActive={showVoiceAssistant}
                onClose={() => setShowVoiceAssistant(false)}
        language={language}
                onTranscript={(transcript) => {
          // Don't add the message here - handleSendMessage will add it with type 'voice'
          // Just send to chat service
          handleSendMessage(transcript, 'voice');
        }}
                onResponse={(response) => {
          // Add AI response as a message (this one we DO want to add since it's from Retell)
          const aiMessage: Message = {
            id: Date.now().toString(),
            content: response,
            sender: 'bot',
            timestamp: new Date(),
            type: 'voice',
          };
          setMessages(prev => [...prev, aiMessage]);
        }}
      />
    </>
  );
};
