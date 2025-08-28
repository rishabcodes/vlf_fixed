// Legal AI research temporarily disabled for launch
export class LegalAIResearch {
  static async searchCaseLaw(query: string) {
    return {
      cases: [],
      relevance: 0,
    };
  }

  static async analyzeLegalDocument(document: unknown) {
    return {
      summary: 'Document analysis not implemented',
      keyPoints: [],
    };
  }
}
