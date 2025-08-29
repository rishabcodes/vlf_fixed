// Mock implementations for development and testing
export const mockGHLResponse = {
  contacts: [],
  opportunities: [],
  success: true,
};

export const mockRetellResponse = {
  callId: 'mock-call-id',
  status: 'active',
  duration: 0,
};

export const mockAPIResponse = {
  success: true,
  data: null,
  error: null,
};

export default {
  mockGHLResponse,
  mockRetellResponse,
  mockAPIResponse,
};
