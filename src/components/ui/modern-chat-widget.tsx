'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';

import { MessageCircle, X, Send, Bot, Mic, MicOff, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ModernChatWidgetProps {
  language?: 'en' | 'es';
  embedded?: boolean;
  initialMessage?: string;
}

export function ModernChatWidget({
  language: _language = 'en',
  embedded: _embedded = false,
  initialMessage: _initialMessage,
}: ModernChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage if they exist
    const stored = localStorage.getItem('chatMessages');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
      } catch {
        // Fall back to default message if parse fails
      }
    }
    
    // Default initial message - neutral bilingual greeting
    return [
      {
        id: '1',
        text: "Hi! I'm your legal assistant. I can help you with legal questions, document analysis, and scheduling appointments. How may I assist you today?\n\n¡Hola! Soy tu asistente legal. Puedo ayudarte con preguntas legales, análisis de documentos y programación de citas. ¿Cómo puedo asistirte hoy?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sessionStartTime] = useState(new Date());
  const [ghlContactId, setGhlContactId] = useState<string | null>(() => 
    localStorage.getItem('ghlContactId')
  );
  const [contactName, setContactName] = useState<string | null>(() => 
    localStorage.getItem('contactName')
  );
  const [detectedLanguage, setDetectedLanguage] = useState<'en' | 'es'>('en');
  const [ghlNoteId, setGhlNoteId] = useState<string | null>(() => {
    // Check if this is a new session (more than 30 minutes since last activity)
    const lastActivity = localStorage.getItem('lastChatActivity');
    if (lastActivity) {
      const timeDiff = Date.now() - parseInt(lastActivity);
      // If more than 30 minutes have passed, start a new session (new note)
      if (timeDiff > 30 * 60 * 1000) {
        localStorage.removeItem('ghlNoteId');
        localStorage.removeItem('chatSessionId');
        return null;
      }
    }
    return localStorage.getItem('ghlNoteId');
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to save conversation to GHL
  const saveConversation = useCallback(async () => {
    if (messages.length <= 1) return; // Don't save if no real conversation
    
    const sessionId = localStorage.getItem('chatSessionId') || `session-${Date.now()}`;
    const userPhone = localStorage.getItem('userPhone');
    const storedContactName = localStorage.getItem('contactName');
    
    try {
      const response = await fetch('/api/chat/end-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          messages: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
            timestamp: m.timestamp,
          })),
          startTime: sessionStartTime.toISOString(),
          contactId: ghlContactId,
          noteId: ghlNoteId,
          contactName: storedContactName || contactName || null,
          contactPhone: userPhone || null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ghlContactId) {
          setGhlContactId(data.ghlContactId);
          localStorage.setItem('ghlContactId', data.ghlContactId);
        }
        if (data.noteId) {
          setGhlNoteId(data.noteId);
          localStorage.setItem('ghlNoteId', data.noteId);
        }
        console.log('Conversation auto-saved to GHL', { contactId: data.ghlContactId, noteId: data.noteId });
      }
    } catch (error) {
      console.error('Failed to auto-save conversation:', error);
    }
  }, [messages, sessionStartTime, ghlContactId, ghlNoteId, contactName]);

  // Auto-save every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length > 1) {
        // Update last activity timestamp
        localStorage.setItem('lastChatActivity', Date.now().toString());
        console.log('Auto-saving conversation to GHL...');
        saveConversation();
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [messages, saveConversation]);

  // Save on tab/window close
  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      if (messages.length > 1) {
        const sessionId = localStorage.getItem('chatSessionId') || `session-${Date.now()}`;
        
        // Use sendBeacon for reliability during page unload
        const payload = {
          sessionId,
          messages: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
            timestamp: m.timestamp,
          })),
          startTime: sessionStartTime.toISOString(),
          contactId: ghlContactId,
          noteId: ghlNoteId,
        };
        
        navigator.sendBeacon('/api/chat/end-session', JSON.stringify(payload));
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [messages, sessionStartTime, ghlContactId, ghlNoteId]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update messages and store in localStorage
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Store conversation and update last activity time
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    localStorage.setItem('lastChatActivity', Date.now().toString());
    
    const messageText = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Extract phone number from message if provided
    const phoneRegex = /(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
    const phoneMatch = messageText.match(phoneRegex);
    let detectedPhone = null;
    
    if (phoneMatch) {
      // Format as simple number string
      detectedPhone = phoneMatch[2] + phoneMatch[3] + phoneMatch[4];
      if (phoneMatch[1]) {
        detectedPhone = '1' + detectedPhone;
      }
      localStorage.setItem('userPhone', detectedPhone);
    }

    try {
      // Get conversation history from localStorage for context
      const conversationHistory = JSON.parse(localStorage.getItem('chatMessages') || '[]');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          // Don't send language - let the backend auto-detect it
          // language parameter is now optional and backend will detect
          sessionId: localStorage.getItem('chatSessionId') || undefined,
          conversationHistory: conversationHistory.slice(-40), // Last 20 exchanges
          phoneNumber: detectedPhone || localStorage.getItem('userPhone') || undefined,
          ghlContactId: ghlContactId || undefined,
          ghlNoteIds: ghlNoteId ? [ghlNoteId] : [],
          contactName: contactName || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Store session ID and GHL IDs for conversation continuity
      if (data.sessionId) {
        localStorage.setItem('chatSessionId', data.sessionId);
      }
      if (data.ghlContactId) {
        setGhlContactId(data.ghlContactId);
        localStorage.setItem('ghlContactId', data.ghlContactId);
      }
      if (data.contactName) {
        setContactName(data.contactName);
        localStorage.setItem('contactName', data.contactName);
      }
      if (data.language) {
        setDetectedLanguage(data.language);
        localStorage.setItem('detectedLanguage', data.language);
      }
      if (data.ghlNoteIds && data.ghlNoteIds.length > 0) {
        setGhlNoteId(data.ghlNoteIds[0]);
        localStorage.setItem('ghlNoteId', data.ghlNoteIds[0]);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.response ||
          (language === 'es'
            ? 'Lo siento, no pude procesar tu mensaje. Por favor, intenta de nuevo.'
            : "Sorry, I couldn't process your message. Please try again."),
        sender: 'bot',
        timestamp: new Date(),
      };

      // Update messages and store in localStorage
      setMessages(prev => {
        const updated = [...prev, botResponse];
        localStorage.setItem('chatMessages', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      logger.error('Chat API error:', error);

      // Fallback response
      const isSpanish =
        window.location.pathname.startsWith('/es') || /[ñáéíóúü]/i.test(messageText);

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: isSpanish
          ? 'Disculpa, tuve un problema al procesar tu mensaje. Por favor, intenta de nuevo o llámanos al 1-844-967-3536.'
          : 'I apologize, I had trouble processing your message. Please try again or call us at 1-844-967-3536.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue]);

  return (
    <>
      {/* Floating Button */}
      <>
        {!isOpen && (
          <button
onClick={() => setIsOpen(true)}

                className="floating-button group"
          >
            <MessageCircle className="w-7 h-7 text-white" />

            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] animate-ping opacity-20" />

            {/* Sparkle Effect */}
            <div
className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-[#C9974D]" />
            </div>
          </button>
        )}
      </>

      {/* Chat Window */}
      <>
        {isOpen && (
          <div
className="fixed bottom-8 right-8 w-96 h-[600px] z-50"
          >
            <div className="glass-card rounded-3xl shadow-2xl h-full flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22C55E] rounded-full border-2 border-[#6B1F2E]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Alex - Asistente Legal VLF</h3>
                    <p className="text-white/80 text-xs">Siempre disponible para ti</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}

                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}

                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-[#C9974D] to-[#D4A574] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                <>
                  {isTyping && (
                    <div
className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <div
                              key={i}

                className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['Consulta Gratis', 'Inmigración', 'Accidente', 'Horarios'].map(action => (
                    <button
                      key={action}

                onClick={() => setInputValue(action)}

                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 whitespace-nowrap transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsListening(!isListening)}

                className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <input
                    type="text"
                    value={inputValue} onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Escribe tu mensaje..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9974D] modern-input"
                  />

                  <button onClick={handleSendMessage} disabled={!inputValue.trim()} className="p-2 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635] text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Respuestas instantáneas con IA • Disponible 24/7
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
