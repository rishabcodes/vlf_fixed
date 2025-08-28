'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { useSession } from 'next-auth/react';
import { formatDate } from '@/lib/utils/date';

interface Message {
  id: string;
  content: string;
  sentAt: string;
  sender: {
    id: string;
    name: string;
    role: 'client' | 'attorney' | 'staff';
    avatar?: string;
  };
  attachments?: Array<{
    name: string;
    url: string;
  }>;
  readAt?: string;
}

interface CaseMessagesProps {
  caseId: string;
}

export default function CaseMessages({ caseId }: CaseMessagesProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`/api/portal/cases/${caseId}/messages`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      logger.error('Failed to fetch messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || isSending) return;

      setIsSending(true);
      try {
        const response = await fetch(`/api/portal/cases/${caseId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newMessage }),
        });

        if (response.ok) {
          setNewMessage('');
          await fetchMessages();
        }
      } catch (error) {
        logger.error('Failed to send message:', error);
      } finally {
        setIsSending(false);
      }
    },
    [newMessage, caseId, fetchMessages, isSending]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map(message => {
            const isOwnMessage = message.sender.id === session?.user?.id;

            return (
              <div
                key={message.id}

                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        message.sender.role === 'attorney'
                          ? 'bg-blue-600'
                          : message.sender.role === 'staff'
                            ? 'bg-purple-600'
                            : 'bg-gray-600'
                      }`}
                    >
                      {message.sender.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className={`${isOwnMessage ? 'mr-3' : 'ml-3'}`}>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        isOwnMessage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>

                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment, index) => (
                            <a
                              key={index}

                href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs underline ${
                                isOwnMessage ? 'text-blue-100' : 'text-blue-600'
                              }`}
                            >
                              📎 {attachment.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div
                      className={`mt-1 text-xs text-gray-500 ${
                        isOwnMessage ? 'text-right' : 'text-left'
                      }`}
                    >
                      <span>{message.sender.name}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(message.sentAt, 'short')}</span>
                      {message.readAt && (
                        <>
                          <span className="mx-1">•</span>
                          <span>Read</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="border-t p-4">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
      onChange={e => setNewMessage(e.target.value)} placeholder="Type your message..."      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending} className={`px-4 py-2 rounded-lg font-medium ${
              !newMessage.trim() || isSending
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSending ? (
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              'Send'
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Messages are secure and encrypted. Your attorney will respond within 24 hours.
        </p>
      </form>
    </div>
  );
}
