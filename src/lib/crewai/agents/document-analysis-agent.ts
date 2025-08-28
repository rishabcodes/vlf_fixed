import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import fs from 'fs';

export interface DocumentAnalysisRequest {
  documentPath: string;
  documentType:
    | 'contract'
    | 'court-filing'
    | 'immigration-form'
    | 'medical-record'
    | 'insurance-claim'
    | 'other';
  analysisType:
    | 'summary'
    | 'risk-assessment'
    | 'compliance-check'
    | 'key-extraction'
    | 'full-analysis';
  language: 'en' | 'es';
  urgency: 'low' | 'medium' | 'high';
  clientId: string;
}

export interface DocumentAnalysisResult {
  summary: string;
  keyFindings: string[];
  riskFactors: string[];
  recommendedActions: string[];
  missingDocuments?: string[];
  complianceIssues?: string[];
  deadlines?: { date: string; description: string }[];
  confidenceScore: number;
  requiresAttorneyReview: boolean;
}

export class DocumentAnalysisAgent {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.1,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeDocument(request: DocumentAnalysisRequest): Promise<DocumentAnalysisResult> {
    try {
      // Extract text from document
      const documentText = await this.extractDocumentText(request.documentPath);

      // Build analysis prompt
      const systemPrompt = this.buildSystemPrompt(request);
      const userPrompt = this.buildAnalysisPrompt(request, documentText);

      // Get AI analysis
      const response = await this.model.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseAnalysisResult(response.content.toString(), request);
    } catch (error) {
      logger.error('Document analysis agent error:', errorToLogMeta(error));
      throw new Error('Failed to analyze document');
    }
  }

  async batchAnalyzeDocuments(
    requests: DocumentAnalysisRequest[]
  ): Promise<DocumentAnalysisResult[]> {
    const results = await Promise.allSettled(
      requests.map(request => this.analyzeDocument(request))
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        logger.error(`Failed to analyze document ${index}:`, result.reason);
        return this.createErrorResult();
      }
    });
  }

  private async extractDocumentText(documentPath: string): Promise<string> {
    try {
      if (documentPath.toLowerCase().endsWith('.pdf')) {
        // For now, return a placeholder for PDF analysis
        // In production, you would integrate with a PDF processing service
        return `[PDF Document Analysis]
        
This is a placeholder for PDF text extraction. In a production environment, 
this would be replaced with:
- Server-side PDF processing using libraries like pdf-parse
- Cloud-based document processing APIs (AWS Textract, Google Document AI)
- Third-party PDF processing services

File: ${documentPath}
Type: PDF Document
Status: Queued for analysis`;
      } else if (documentPath.toLowerCase().endsWith('.txt')) {
        return await fs.promises.readFile(documentPath, 'utf-8');
      } else {
        throw new Error('Unsupported document format');
      }
    } catch (error) {
      logger.error('Document text extraction error:', errorToLogMeta(error));
      throw new Error('Failed to extract document text');
    }
  }

  private buildSystemPrompt(request: DocumentAnalysisRequest): string {
    const basePrompt = `You are a legal document analysis AI for Vasquez Law Firm. Your expertise includes:
- Immigration law documents (forms, petitions, appeals)
- Personal injury claims and medical records
- Workers' compensation documents
- Criminal defense case files
- Family law documents (divorce, custody, etc.)

Your role is to provide accurate, thorough analysis while identifying potential legal issues.`;

    const languageSpecific = {
      en: `Analyze in English. Pay attention to:
- Legal terminology and compliance requirements
- Missing signatures, dates, or required fields
- Deadlines and time-sensitive information
- Potential liability or risk factors`,

      es: `Analiza en español. Presta atención a:
- Terminología legal y requisitos de cumplimiento
- Firmas, fechas o campos requeridos faltantes
- Fechas límite e información urgente
- Factores potenciales de responsabilidad o riesgo`,
    };

    return `${basePrompt}\n\n${languageSpecific[request.language]}`;
  }

  private buildAnalysisPrompt(request: DocumentAnalysisRequest, documentText: string): string {
    const analysisInstructions = {
      summary: "Provide a concise summary of the document's main content and purpose",
      'risk-assessment': 'Focus on identifying potential legal risks and liability issues',
      'compliance-check': 'Verify compliance with relevant legal requirements and regulations',
      'key-extraction': 'Extract key information like dates, names, amounts, and critical details',
      'full-analysis': 'Provide comprehensive analysis including all above aspects',
    };

    return `
Document Type: ${request.documentType}
Analysis Type: ${request.analysisType}
Client ID: ${request.clientId}

Instructions: ${analysisInstructions[request.analysisType]}

Document Content:
${documentText.substring(0, 8000)} ${documentText.length > 8000 ? '...[truncated]' : ''}

Please provide:
1. Summary of the document
2. Key findings and important information
3. Risk factors or concerns
4. Recommended actions
5. Missing documents or information (if applicable)
6. Compliance issues (if any)
7. Important deadlines (if any)
8. Whether attorney review is required

Format your response clearly with sections for each element.
`;
  }

  private parseAnalysisResult(
    content: string,
    request: DocumentAnalysisRequest
  ): DocumentAnalysisResult {
    const sections = this.splitIntoSections(content);

    return {
      summary: this.extractSection(sections, 'summary') || 'Document analysis completed',
      keyFindings: this.extractListItems(sections, 'key findings') || [],
      riskFactors: this.extractListItems(sections, 'risk') || [],
      recommendedActions: this.extractListItems(sections, 'recommended') || [],
      missingDocuments: this.extractListItems(sections, 'missing'),
      complianceIssues: this.extractListItems(sections, 'compliance'),
      deadlines: this.extractDeadlines(content),
      confidenceScore: this.calculateConfidenceScore(content, request),
      requiresAttorneyReview: this.determineAttorneyReviewRequired(content, request),
    };
  }

  private splitIntoSections(content: string): string[] {
    return content.split(/\n\s*\n/).filter(section => section.trim().length > 0);
  }

  private extractSection(sections: string[], keyword: string): string | undefined {
    const section = sections.find(s => s.toLowerCase().includes(keyword.toLowerCase()));

    if (!section) return undefined;

    return section
      .split('\n')
      .slice(1) // Skip the header line
      .join(' ')
      .trim();
  }

  private extractListItems(sections: string[], keyword: string): string[] | undefined {
    const section = sections.find(s => s.toLowerCase().includes(keyword.toLowerCase()));

    if (!section) return undefined;

    return section
      .split('\n')
      .filter(line => line.trim().match(/^[-•*]\s+/))
      .map(line => line.replace(/^[-•*]\s+/, '').trim())
      .filter(item => item.length > 0);
  }

  private extractDeadlines(content: string): { date: string; description: string }[] | undefined {
    const deadlinePattern = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}|[A-Za-z]+ \d{1,2}, \d{4})/g;
    const matches = content.match(deadlinePattern);

    if (!matches) return undefined;

    return matches.map(date => ({
      date,
      description: 'Deadline identified in document',
    }));
  }

  private calculateConfidenceScore(content: string, request: DocumentAnalysisRequest): number {
    let score = 0.7; // Base confidence

    // Increase confidence based on document completeness
    if (content.length > 1000) score += 0.1;
    if (content.includes('signature') || content.includes('signed')) score += 0.05;
    if (content.includes('date')) score += 0.05;

    // Adjust based on document type familiarity
    const commonTypes = ['contract', 'court-filing', 'immigration-form'];
    if (commonTypes.includes(request.documentType)) score += 0.1;

    return Math.min(0.95, score);
  }

  private determineAttorneyReviewRequired(
    content: string,
    request: DocumentAnalysisRequest
  ): boolean {
    const highRiskIndicators = [
      'court date',
      'deadline',
      'lawsuit',
      'criminal',
      'deportation',
      'felony',
      'liability',
      'damages',
    ];

    const hasHighRiskContent = highRiskIndicators.some(indicator =>
      content.toLowerCase().includes(indicator)
    );

    return (
      hasHighRiskContent ||
      request.urgency === 'high' ||
      ['court-filing', 'immigration-form'].includes(request.documentType)
    );
  }

  private createErrorResult(): DocumentAnalysisResult {
    return {
      summary: 'Failed to analyze document',
      keyFindings: [],
      riskFactors: ['Analysis failed - manual review required'],
      recommendedActions: ['Please have an attorney review this document manually'],
      confidenceScore: 0,
      requiresAttorneyReview: true,
    };
  }
}
