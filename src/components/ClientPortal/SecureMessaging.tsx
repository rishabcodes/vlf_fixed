'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { logger } from '@/lib/safe-logger';

import {
  MessageSquare,
  Send,
  Paperclip,
  Search,
  Shield,
  Check,
  CheckCheck,
  Star,
  MoreVertical,
  Download,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    role: 'client' | 'attorney' | 'paralegal';
    avatar?: string;
  };
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>;
}

interface Conversation {
  id: string;
  participants: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }>;
  lastMessage: {
    content: string;
    timestamp: string;
    senderName: string;
  };
  unreadCount: number;
  caseNumber?: string;
  subject: string;
  priority: 'normal' | 'high' | 'urgent';
  archived: boolean;
  starred: boolean;
}

export default function SecureMessaging() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchConversations = useCallback(async () => {
    try {
      const response = await fetch('/api/client/messages/conversations');
      const data = await response.json();
      setConversations(data.conversations || []);
      if (data.conversations.length > 0 && !selectedConversation) {
        setSelectedConversation(data.conversations[0]);
      }
    } catch (error) {
      logger.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedConversation]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      markAsRead(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/client/messages/conversations/${conversationId}`);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      logger.error('Error fetching messages:', error);
        }
};

  const markAsRead = async (conversationId: string) => {
    try {
      await fetch(`/api/client/messages/conversations/${conversationId}/read`, {
        method: 'POST',
      });

      // Update local state
      setConversations(prev =>
        prev.map(conv => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv))
      );
    } catch (error) {
      logger.error('Error marking as read:', error);
        }
};

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sending) return;

    setSending(true);
    try {
      const response = await fetch(
        `/api/client/messages/conversations/${selectedConversation.id}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newMessage }),
        }
      );

      if (response.ok) {
        const sentMessage = await response.json();
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage('');

        // Update conversation's last message
        setConversations(prev =>
          prev.map(conv =>
            conv.id === selectedConversation.id
              ? {
                  ...conv,
                  lastMessage: {
                    content: newMessage,
                    timestamp: new Date().toISOString(),
                    senderName: 'You',
                  },
                }
              : conv
          )
        );
      }
    } catch (error) {
      logger.error('Error sending message:', error);
    } finally {
      setSending(false);
        }
};

  const handleFileUpload = async (_files: FileList) => {
    // Implement file upload logic
    // TODO: Integrate with file upload service
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
        }
};

  const filteredConversations = conversations.filter(conv => {
    if (!showArchived && conv.archived) return false;
    if (searchTerm) {
      return (
        conv.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B1F2E]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
            />
          </div>
          <div className="flex items-center justify-between mt-3">
            <button
             } onClick={() => setShowArchived(!showArchived)}

                className="text-sm text-gray-600 hover:text-gray-900"
            >
              {showArchived ? 'Hide' : 'Show'} Archived
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <div
              key={conversation.id}

                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
              }`}
      onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 flex-1 truncate">
                  {conversation.subject}
                </h4>
                <div className="flex items-center gap-2 ml-2">
                  {conversation.starred && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                  {conversation.unreadCount > 0 && (
                    <span className="bg-[#6B1F2E] text-white text-xs px-2 py-1 rounded-full">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                {conversation.participants.map((p, i) => (
                  <span key={p.id}>
                    {p.name} {i < conversation.participants.length - 1 && '•'}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 truncate">
                {conversation.lastMessage.senderName}: {conversation.lastMessage.content}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), {
                    addSuffix: true,
                  })}
                </span>
                {conversation.priority !== 'normal' && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(conversation.priority)}`}
                  >
                    {conversation.priority}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Conversation Header */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{selectedConversation.subject}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>End-to-end encrypted</span>
                  </div>
                  {selectedConversation.caseNumber && (
                    <span className="text-sm text-gray-600">
                      Case: {selectedConversation.caseNumber}
                    </span>
                  )}
                </div>
              </div>
              <button className="p-2 hover:bg-gray-200 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => {
              const isClient = message.sender.role === 'client';
              return (
                <div
                  key={message.id}

                className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${isClient ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-end gap-2 mb-1">
                      {!isClient && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                          {message.sender.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            isClient ? 'bg-[#6B1F2E] text-white' : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>

                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map(attachment => (
                              <div
                                key={attachment.id}

                className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg"
                              >
                                <Paperclip className="w-4 h-4 text-gray-600" />
                                <span
                className="text-sm text-gray-700 flex-1 truncate">
                                  {attachment.name}
                                </span>
                                <button className="p-1 hover:bg-gray-200 rounded">
                                  <Download className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {format(new Date(message.timestamp), 'h:mm a')}
                          </span>
                          {isClient &&
                            (message.read ? (
                              <CheckCheck className="w-4 h-4 text-blue-500" />
                            ) : (
                              <Check className="w-4 h-4 text-gray-400" />
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-end gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}

                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}

                type="file"
                multiple
                onChange={e => {
                  if (e.target.files) {
                    handleFileUpload(e.target.files); className="hidden"
              />
              <div className="flex-1">
                <textarea
                 } value={newMessage}

                onChange={e => setNewMessage(e.target.value)}
                onKeyPress={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();} placeholder="Type your message..."
                  className="w-full px-4 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                  rows={1}
                />
              </div>
              <button onClick={sendMessage disabled={!newMessage.trim() || sending className="p-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Messages are encrypted and protected by attorney-client privilege
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3} className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
            <p}
              className="text-gray-600">Choose a conversation from the list to view messages</p>
          </div>
        </div>
      )}
    </div>
  );
}
}
}
}
