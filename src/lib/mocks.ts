/**
 * Mock data and utilities for development and testing
 * Used by API routes when MOCK_MODE is enabled
 */

export const MOCK_MODE = process.env.MOCK_MODE === 'true' || process.env.NODE_ENV === 'test';

// Mock GHL (GoHighLevel) responses
export const mockGHLResponses = {
  contacts: {
    success: true,
    data: [],
    message: 'Mock GHL contacts response'
  },
  opportunities: {
    success: true,
    data: [],
    message: 'Mock GHL opportunities response'
  },
  default: {
    success: true,
    data: {},
    message: 'Mock GHL response'
  }
};

// Mock Retell AI responses
export const mockRetellResponses = {
  call: {
    success: true,
    call_id: 'mock-call-id',
    status: 'completed',
    message: 'Mock Retell call response'
  },
  transcript: {
    success: true,
    transcript: 'Mock transcript content',
    message: 'Mock Retell transcript response'
  },
  default: {
    success: true,
    data: {},
    message: 'Mock Retell response'
  }
};

// Mock delay to simulate API latency
export const mockDelay = (ms: number = 100) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Check if we're in mock environment
export const isMockEnvironment = () => 
  process.env.MOCK_MODE === 'true' || 
  process.env.NODE_ENV === 'test' ||
  process.env.MOCK_EMAIL === 'true' ||
  process.env.MOCK_SMS === 'true';

// Handle mock GHL requests
export async function handleGHLMockRequest(path: string, method: string, body?: any) {
  await mockDelay(200);
  
  if (path.includes('contacts')) {
    return mockGHLResponses.contacts;
  }
  if (path.includes('opportunities')) {
    return mockGHLResponses.opportunities;
  }
  
  return mockGHLResponses.default;
}

// Handle mock Retell requests
export async function handleRetellMockRequest(path: string, method: string, body?: any) {
  await mockDelay(200);
  
  if (path.includes('call')) {
    return mockRetellResponses.call;
  }
  if (path.includes('transcript')) {
    return mockRetellResponses.transcript;
  }
  
  return mockRetellResponses.default;
}

// Mock error responses
export const mockErrorResponse = (message: string = 'Mock error', statusCode: number = 500) => ({
  success: false,
  error: message,
  statusCode
});

// Mock success response wrapper
export const mockSuccessResponse = <T>(data: T, message: string = 'Success') => ({
  success: true,
  data,
  message
});

// Export default mock handler
export default {
  MOCK_MODE,
  mockGHLResponses,
  mockRetellResponses,
  mockDelay,
  mockErrorResponse,
  mockSuccessResponse
};