
export interface AIHealthResponse {
  status: string;
  timestamp: string;
  uptime?: number;
  summary: any;
  services?: any;
  diagnostics?: any;
}
export interface AITestRequest {
  message: string;
  language?: string;
  testType?: string;
}
export interface AITestResult {
  timestamp: string;
  testMessage: string;
  language: string;
  testType: string;
  results: any;
  overallSuccess: boolean;
  successRate: number;
}
