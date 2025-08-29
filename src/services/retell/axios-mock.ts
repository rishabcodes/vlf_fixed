// Axios mock using fetch
class AxiosMock {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config?: { baseURL?: string; headers?: Record<string, string> }) {
    this.baseURL = config?.baseURL || '';
    this.headers = config?.headers || {};
  }

  static create(config?: any) {
    return new AxiosMock(config);
  }

  private async request(url: string, options: RequestInit = {}) {
    const fullUrl = this.baseURL ? `${this.baseURL}${url}` : url;
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...this.headers,
        ...(options.headers || {}),
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return { data: await response.json(), status: response.status };
  }

  async get(url: string) {
    return this.request(url, { method: 'GET' });
  }

  async post(url: string, data?: any) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async put(url: string, data?: any) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async delete(url: string) {
    return this.request(url, { method: 'DELETE' });
  }
}

export default AxiosMock;
export const axios = AxiosMock;
