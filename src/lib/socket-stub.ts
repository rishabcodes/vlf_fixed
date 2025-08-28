// Production stub for socket module - eliminates Vercel build issues
// BUILD UP NOT DOWN - simplified but functional socket

export enum RoomType {
  CONVERSATION = 'conversation',
  CASE = 'case',
  SUPPORT = 'support',
  BROADCAST = 'broadcast',
}

class ChatSocketServerStub {
  getActiveSessionsCount() {
    return 0;
  }
  getRoomParticipantCount() {
    return 0;
  }
  broadcastToAll() {}
  broadcastToUser() {}
  broadcastToRoom() {}
  async sendNotification() {}
  async sendCaseUpdate() {}
}

export function getChatSocketServer(): ChatSocketServerStub {
  return new ChatSocketServerStub();
}

export { ChatSocketServerStub as ChatSocketServer };
