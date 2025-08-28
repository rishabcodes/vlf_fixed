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