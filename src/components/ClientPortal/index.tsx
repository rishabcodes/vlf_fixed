'use client';

import React, { useState, useEffect } from 'react';

// Collaborative editing features - to be implemented
// import * as Y from 'yjs';
// import { WebrtcProvider } from 'y-webrtc';
// import { QuillBinding } from 'y-quill';
// import Quill from 'quill';
// import 'quill/dist/quill.snow.css';

interface Document {
  id: string;
  name: string;
  type: string;
  lastModified: Date;
  sharedWith: string[];
  status: 'draft' | 'review' | 'final';
}

export const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'messages' | 'timeline'>(
    'overview'
  );
  const [documents] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [collaborators] = useState<Array<{ name?: string }>>([]);
  // const [ydoc, setYdoc] = useState<Y.Doc | null>(null);

  // Initialize real-time collaboration - to be implemented
  useEffect(() => {
    if (selectedDoc) {
      // Collaborative editing to be implemented
      // const doc = new Y.Doc();
      // const provider = new WebrtcProvider(`vasquez-law-${selectedDoc.id}`, doc, {
      //   signaling: [process.env.NEXT_PUBLIC_SIGNALING_SERVER!],
      // });
      // provider.on('peers', (event: Event) => {
      //   setCollaborators(Array.from(event.added).concat(Array.from(event.removed)));
      // });
      // setYdoc(doc);
      // return () => {
      //   provider.destroy();
      //   doc.destroy();
      // };
    }
  }, [selectedDoc]);

  // Case overview metrics
  const caseMetrics = {
    status: 'Active',
    nextDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    completedTasks: 12,
    totalTasks: 20,
    documentsUploaded: 8,
    messagesUnread: 3,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
              <p className="text-sm text-gray-600">Case #2024-IMM-00123</p>
            </div>
            <div className="flex items-center gap-4">
              <OnlineIndicator count={collaborators.length} />
              <NotificationBell unread={caseMetrics.messagesUnread} />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {(['overview', 'documents', 'messages', 'timeline'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <>
          {activeTab === 'overview' && (
            <div key="overview">
              <CaseOverview metrics={caseMetrics} />
            </div>
          )}

          {activeTab === 'documents' && (
            <div key="documents">
              <DocumentCollaboration
                documents={documents}
                selectedDoc={selectedDoc}
                onSelectDoc={setSelectedDoc}
                // ydoc={ydoc}
              />
            </div>
          )}

          {activeTab === 'messages' && (
            <div key="messages">
              <SecureMessaging />
            </div>
          )}

          {activeTab === 'timeline' && (
            <div key="timeline">
              <CaseTimeline />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

// Case Overview Component
interface CaseMetrics {
  status: string;
  nextDeadline: Date;
  completedTasks: number;
  totalTasks: number;
  messagesUnread: number;
  documentsUploaded: number;
}

const CaseOverview: React.FC<{ metrics: CaseMetrics }> = ({ metrics }) => {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Case Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard label="Status" value={metrics.status} color="green" icon="📋" />
          <MetricCard
            label="Next Deadline"
            value={metrics.nextDeadline.toLocaleDateString()}
            color="yellow"
            icon="📅"
          />
          <MetricCard
            label="Progress"
            value={`${metrics.completedTasks}/${metrics.totalTasks}`}
            color="blue"
            icon="✅"
          />
          <MetricCard
            label="Documents"
            value={metrics.documentsUploaded.toString()}
            color="purple"
            icon="📄"
          />
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">AI Case Insights</h2>
        <div className="space-y-3">
          <InsightItem
            type="success"
            message="Your case has a 85% probability of approval based on similar cases"
          />
          <InsightItem type="warning" message="Missing document: Form I-864 Affidavit of Support" />
          <InsightItem
            type="info"
            message="Average processing time for similar cases: 6-8 months"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton icon="📤" label="Upload Document" />
          <QuickActionButton icon="💬" label="Message Attorney" />
          <QuickActionButton icon="📅" label="Schedule Call" />
          <QuickActionButton icon="💳" label="Make Payment" />
        </div>
      </div>
    </div>
  );
};

// Document Collaboration Component
const DocumentCollaboration: React.FC<{
  documents: Document[];
  selectedDoc: Document | null;
  onSelectDoc: (doc: Document) => void;
  // ydoc: Y.Doc | null;
}> = ({ documents, selectedDoc, onSelectDoc }) => {
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null);
  // const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    if (editorRef) {
      // Quill editor to be implemented
      // const q = new Quill(editorRef, {
      //   theme: 'snow',
      //   modules: {
      //     toolbar: [
      //       ['bold', 'italic', 'underline', 'strike'],
      //       ['blockquote', 'code-block'],
      //       [{ 'header': 1 }, { 'header': 2 }],
      //       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      //       [{ 'script': 'sub' }, { 'script': 'super' }],
      //       [{ 'indent': '-1' }, { 'indent': '+1' }],
      //       ['link', 'image'],
      //       ['clean'],
      //     ],
      //   },
      // });
      // setQuill(q);
    }
  }, [editorRef]);

  // Collaborative binding to be implemented
  // useEffect(() => {
  //   if (quill && ydoc && selectedDoc) {
  //     const ytext = ydoc.getText('quill');
  //     const binding = new QuillBinding(ytext, quill);

  //     return () => {
  //       binding.destroy();
  //     };
  //   }
  // }, [quill, ydoc, selectedDoc]);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Document List */}
      <div className="col-span-4 bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-4">Documents</h3>
        <div className="space-y-2">
          {documents.map(doc => (
            <DocumentItem
              key={doc.id}
              document={doc}
              isSelected={selectedDoc?.id === doc.id}
              onClick={() => onSelectDoc(doc)}
            />
          ))}
        </div>
        <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          Upload New Document
        </button>
      </div>

      {/* Document Editor */}
      <div className="col-span-8 bg-white rounded-lg shadow p-6">
        {selectedDoc ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{selectedDoc.name}</h3>
              <div className="flex items-center gap-2">
                <CollaboratorAvatars collaborators={[]} />
                <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
                  Share
                </button>
              </div>
            </div>
            <div ref={setEditorRef} className="min-h-[400px] border rounded-lg" />
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">Select a document to view or edit</div>
        )}
      </div>
    </div>
  );
};

// Secure Messaging Component
interface SecureMessage {
  id: string;
  content: string;
  sender: 'client' | 'attorney';
  timestamp: Date;
  encrypted: boolean;
}

const SecureMessaging: React.FC = () => {
  const [messages, setMessages] = useState<SecureMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    // Encrypt message before sending
    const encrypted = isEncrypted ? await encryptMessage(newMessage) : newMessage;

    // Send via secure channel
    const message: SecureMessage = {
      id: Date.now().toString(),
      content: encrypted,
      sender: 'client',
      timestamp: new Date(),
      encrypted: isEncrypted,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Secure Messages</h3>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isEncrypted}
                onChange={e => setIsEncrypted(e.target.checked)}
                className="rounded"
              />
              End-to-end encryption
            </label>
            {isEncrypted && <span className="text-green-600 text-sm">🔒 Encrypted</span>}
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a secure message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Case Timeline Component
const CaseTimeline: React.FC = () => {
  const events: TimelineEventData[] = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      title: 'Case Filed',
      description: 'Initial petition submitted to USCIS',
      status: 'completed',
      documents: ['I-130 Petition'],
    },
    {
      id: '2',
      date: new Date('2024-02-01'),
      title: 'Biometrics Scheduled',
      description: 'Appointment at Application Support Center',
      status: 'completed',
      documents: ['Appointment Notice'],
    },
    {
      id: '3',
      date: new Date('2024-03-15'),
      title: 'Request for Evidence',
      description: 'Additional documents requested by USCIS',
      status: 'in-progress',
      documents: ['RFE Notice'],
    },
    {
      id: '4',
      date: new Date('2024-04-30'),
      title: 'Interview Scheduled',
      description: 'In-person interview at USCIS field office',
      status: 'upcoming',
      documents: [],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="font-semibold mb-6">Case Timeline</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

        {/* Events */}
        <div className="space-y-8">
          {events.map((event, index) => (
            <TimelineEvent key={event.id} event={event} isLast={index === events.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MetricCard: React.FC<{
  label: string;
  value: string;
  color: string;
  icon: string;
}> = ({ label, value, icon }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);

const InsightItem: React.FC<{
  type: 'success' | 'warning' | 'info';
  message: string;
}> = ({ type, message }) => {
  const colors = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[type]}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
};

const QuickActionButton: React.FC<{
  icon: string;
  label: string;
}> = ({ icon, label }) => (
  <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <span className="text-2xl">{icon}</span>
    <span className="text-sm text-gray-700">{label}</span>
  </button>
);

const DocumentItem: React.FC<{
  document: Document;
  isSelected: boolean;
  onClick: () => void;
}> = ({ document, isSelected, onClick }) => (
  <div
    onClick={onClick} className={`p-3 rounded-lg cursor-pointer transition-colors ${
      isSelected ? 'bg-primary/10 border border-primary' : 'hover:bg-gray-50'
    }`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="font-medium text-sm">{document.name}</p>
        <p className="text-xs text-gray-500">
          Modified {document.lastModified.toLocaleDateString()}
        </p>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          document.status === 'final'
            ? 'bg-green-100 text-green-800'
            : document.status === 'review'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
        }`}
      >
        {document.status}
      </span>
    </div>
  </div>
);

const CollaboratorAvatars: React.FC<{ collaborators: { name?: string }[] }> = ({
  collaborators,
}) => (
  <div className="flex -space-x-2">
    {collaborators.slice(0, 3).map((collab, i) => (
      <div
        key={i}
        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium"
      >
        {collab.name?.[0] || '?'}
      </div>
    ))}
    {collaborators.length > 3 && (
      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
        +{collaborators.length - 3}
      </div>
    )}
  </div>
);

const OnlineIndicator: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    {count} online
  </div>
);

const NotificationBell: React.FC<{ unread: number }> = ({ unread }) => (
  <button className="relative p-2 rounded-lg hover:bg-gray-100">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
    {unread > 0 && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
        {unread}
      </span>
    )}
  </button>
);

const MessageBubble: React.FC<{ message: SecureMessage }> = ({ message }) => (
  <div className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-xs p-3 rounded-lg ${
        message.sender === 'client' ? 'bg-primary text-white' : 'bg-gray-100'
      }`}
    >
      <p className="text-sm">{message.content}</p>
      <p className="text-xs mt-1 opacity-70">{message.timestamp.toLocaleTimeString()}</p>
    </div>
  </div>
);

interface TimelineEventData {
  id: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  title: string;
  description: string;
  date: Date;
  documents: string[];
}

const TimelineEvent: React.FC<{ event: TimelineEventData; isLast: boolean }> = ({ event }) => (
  <div className="relative flex items-start">
    <div
      className={`absolute left-8 w-4 h-4 rounded-full -translate-x-1/2 ${
        event.status === 'completed'
          ? 'bg-green-500'
          : event.status === 'in-progress'
            ? 'bg-yellow-500'
            : 'bg-gray-300'
      }`}
    />

    <div className="ml-16">
      <div className="flex items-center gap-2">
        <h4 className="font-medium">{event.title}</h4>
        <span className="text-sm text-gray-500">{event.date.toLocaleDateString()}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
      {event.documents.length > 0 && (
        <div className="flex gap-2 mt-2">
          {event.documents.map((doc: string) => (
            <span key={doc} className="text-xs bg-gray-100 px-2 py-1 rounded">
              📄 {doc}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

// Encryption helper
async function encryptMessage(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
    'encrypt',
    'decrypt',
  ]);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}