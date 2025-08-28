// Common axios error type definition
export interface AxiosError extends Error {
  response?: {
    status?: number;
    data?: unknown;
    headers?: Record<string, string>;
  };
  config?: {
    url?: string;
    method?: string;
  };
  code?: string;
}
