// Content Factory Service - Placeholder to fix build errors
export interface ContentRequest {
  type: string;
  prompt: string;
  metadata?: any;
}

export interface ContentResponse {
  content: string;
  metadata?: any;
}

export class ContentFactory {
  async generateContent(request: ContentRequest): Promise<ContentResponse> {
    // Placeholder implementation
    return {
      content: "Generated content placeholder",
      metadata: request.metadata,
    };
  }
}

export const contentFactory = new ContentFactory();
