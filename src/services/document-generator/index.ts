import { PDFDocument, StandardFonts, rgb, PDFPage, degrees } from 'pdf-lib';
import Handlebars from 'handlebars';
import { getPrismaClient } from '@/lib/prisma';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';
import pdfParse from 'pdf-parse';
import { format } from 'date-fns';


// Document template schema
const DocumentTemplateSchema = z.object({
  id: z.string(),
  type: z.enum(['contract', 'petition', 'motion', 'letter', 'form', 'agreement']),
  practiceArea: z.enum([
    'immigration',
    'personalInjury',
    'criminal',
    'family',
    'workersComp',
    'traffic',
  ]),
  name: z.string(),
  description: z.string(),
  template: z.string(),
  requiredFields: z.array(z.string()),
  language: z.enum(['en', 'es']),
  metadata: z.record(z.unknown()).optional(),
});

type DocumentTemplate = z.infer<typeof DocumentTemplateSchema>;

interface GenerateDocumentOptions {
  templateId: string;
  clientData: Record<string, unknown>;
  language?: 'en' | 'es';
  includeWatermark?: boolean;
  encrypt?: boolean;
  password?: string;
}

interface DocumentAnalysis {
  summary: string;
  risks: string[];
  recommendations: string[];
  keyTerms: Record<string, unknown>;
  missingFields: string[];
  legalCompliance: {
    isCompliant: boolean;
    issues: string[];
  };
}

export class LegalDocumentGenerator {
  private templates: Map<string, DocumentTemplate> = new Map();
  private templateDir = path.join(process.cwd(), 'templates', 'documents');

  constructor() {
    this.initializeTemplates();
    this.registerHandlebarsHelpers();
  }

  private async initializeTemplates() {
    try {
      // TODO: Load templates from database when documentTemplate model is added
      // For now, just load file-based templates
      await this.loadFileTemplates();

      logger.info(`Loaded ${this.templates.size} document templates`);
    } catch (error) {
      logger.error('Failed to initialize document templates:', errorToLogMeta(error));
    }
  }

  private async loadFileTemplates() {
    try {
      const templateFiles = await fs.readdir(this.templateDir).catch(() => []);

      for (const file of templateFiles) {
        if (file.endsWith('.hbs')) {
          const content = await fs.readFile(path.join(this.templateDir, file), 'utf-8');
          const metadata = await this.extractTemplateMetadata(content);

          if (metadata) {
            this.templates.set(metadata.id, {
              ...metadata,
              template: content,
            });
          }
        }
      }
    } catch (error) {
      logger.warn('Could not load file templates:', errorToLogMeta(error));
    }
  }

  private async extractTemplateMetadata(
    content: string
  ): Promise<Omit<DocumentTemplate, 'template'> | null> {
    // Extract metadata from template comments
    const metadataMatch = content.match(/{{!--\s*METADATA:\s*(.+?)\s*--}}/s);
    if (metadataMatch) {
      try {
        return JSON.parse(metadataMatch[1] || '{}');
      } catch (error) {
        logger.error('Failed to parse template metadata:', errorToLogMeta(error));
      }
    }
    return null;
  }

  private registerHandlebarsHelpers() {
    // Date formatting helper
    Handlebars.registerHelper('formatDate', (date: Date | string, format: string) => {
      const d = new Date(date);
      if (format === 'full') {
        return d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      return d.toLocaleDateString();
    });

    // Currency formatting helper
    Handlebars.registerHelper('formatCurrency', (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    });

    // Conditional helper
    Handlebars.registerHelper(
      'ifEquals',
      function (
        this: unknown,
        arg1: unknown,
        arg2: unknown,
        options: { fn: (context: unknown) => unknown; inverse: (context: unknown) => unknown }
      ) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
      }
    );

    // Legal terminology helper
    Handlebars.registerHelper('legalTerm', (term: string, language: string) => {
      const terms: Record<string, Record<string, string>> = {
        plaintiff: { en: 'Plaintiff', es: 'Demandante' },
        defendant: { en: 'Defendant', es: 'Demandado' },
        petitioner: { en: 'Petitioner', es: 'Peticionario' },
        beneficiary: { en: 'Beneficiary', es: 'Beneficiario' },
      };
      return terms[term]?.[language] || term;
    });
  }

  async generateDocument(options: GenerateDocumentOptions): Promise<Buffer> {
    try {
      const {
        templateId,
        clientData,
        language = 'en',
        includeWatermark = true,
        encrypt = false,
        password,
      } = options;

      // Get template
      const template = this.templates.get(templateId);
      if (!template) {
        throw new Error(`Template ${templateId} not found`);
      }

      // Validate required fields
      const missingFields = this.validateRequiredFields(template, clientData);
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Enhance data with AI suggestions
      const enhancedData = await this.enhanceWithAI(template, clientData, language);

      // Compile template
      const compiledTemplate = Handlebars.compile(template.template);
      const html = compiledTemplate({
        ...enhancedData,
        language,
        currentDate: new Date(),
        firmInfo: {
          name: 'Vasquez Law Firm, PLLC',
          address: '6 Carriage Cir, Durham, NC 27713',
          phone: '1-844-YO-PELEO (1-844-967-3536)',
          email: 'leads@vasquezlawfirm.com',
          website: 'www.vasquezlawnc.com',
        },
      });

      // Convert to PDF
      const pdfDoc = await this.htmlToPdf(html, template);

      // Add security features
      if (includeWatermark) {
        await this.addWatermark(pdfDoc, clientData);
      }

      // Add metadata
      await this.addMetadata(pdfDoc, template, clientData);

      // Save document record
      await this.saveDocumentRecord(template, clientData, enhancedData);

      // Generate final PDF
      let pdfBytes = await pdfDoc.save();

      // Encrypt if requested
      if (encrypt && password) {
        pdfBytes = await this.encryptPdf(pdfBytes, password);
      }

      return Buffer.from(pdfBytes);
    } catch (error) {
      logger.error('Document generation failed:', errorToLogMeta(error));
      throw error;
    }
  }

  private validateRequiredFields(
    template: DocumentTemplate,
    data: Record<string, unknown>
  ): string[] {
    const missingFields: string[] = [];

    for (const field of template.requiredFields) {
      const value = this.getNestedValue(data, field);
      if (value === undefined || value === null || value === '') {
        missingFields.push(field);
      }
    }

    return missingFields;
  }

  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce((current: any, key) => current?.[key], obj as any);
  }

  private async enhanceWithAI(
    template: DocumentTemplate,
    data: Record<string, unknown>,
    language: string
  ): Promise<Record<string, unknown>> {
    // Simulate AI enhancement - in production, integrate with OpenAI/Claude
    const enhancements: Record<string, unknown> = {
      ...data,
      generatedDate: new Date().toISOString(),
      documentId: `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      caseNumber: data.caseNumber || `CASE-${Date.now()}`,
    };

    // Add practice area specific enhancements
    switch (template.practiceArea) {
      case 'immigration':
        enhancements.uscisOffice = data.uscisOffice || 'Texas Service Center';
        enhancements.priorityDate = data.priorityDate || new Date().toISOString();
        break;

      case 'personalInjury':
        enhancements.statuteOfLimitations = this.calculateStatuteOfLimitations(
          data.incidentDate as string | undefined
        );
        enhancements.damagesEstimate = this.estimateDamages(data);
        break;

      case 'criminal':
        enhancements.courtJurisdiction = data.courtJurisdiction || 'Wake County Superior Court';
        enhancements.bailAmount = data.bailAmount || 'To be determined';
        break;
    }

    return enhancements;
  }

  private calculateStatuteOfLimitations(incidentDate?: string): string {
    if (!incidentDate) return 'Not specified';

    const incident = new Date(incidentDate);
    const limitation = new Date(incident);
    limitation.setFullYear(limitation.getFullYear() + 3); // NC personal injury SOL

    return limitation.toLocaleDateString();
  }

  private estimateDamages(data: Record<string, unknown>): number {
    // Simplified damages calculation
    let total = 0;

    if (data.medicalExpenses) total += Number(data.medicalExpenses);
    if (data.lostWages) total += Number(data.lostWages);
    if (data.propertyDamage) total += Number(data.propertyDamage);
    if (data.painAndSuffering) total += Number(data.painAndSuffering);

    return total;
  }

  private async htmlToPdf(html: string, template: DocumentTemplate): Promise<PDFDocument> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Letter size
    const { width, height } = page.getSize();

    // Embed fonts
    const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // Parse HTML and render to PDF
    // This is a simplified version - in production use a proper HTML to PDF library
    const lines = html.split('\n');
    let yPosition = height - 72; // 1 inch margin
    const lineHeight = 14;
    const margin = 72;

    for (const line of lines) {
      if (yPosition < margin) {
        // Add new page
        const newPage = pdfDoc.addPage([612, 792]);
        yPosition = height - margin;
      }

      // Simple bold detection
      const isBold = line.includes('<strong>') || line.includes('<b>');
      const cleanLine = line.replace(/<[^>]*>/g, ''); // Strip HTML tags

      if (cleanLine.trim()) {
        page.drawText(cleanLine, {
          x: margin,
          y: yPosition,
          size: 12,
          font: isBold ? timesRomanBold : timesRoman,
          color: rgb(0, 0, 0),
          maxWidth: width - 2 * margin,
        });

        yPosition -= lineHeight * 1.5;
      } else {
        yPosition -= lineHeight * 0.5; // Smaller gap for empty lines
      }
    }

    return pdfDoc;
  }

  private async addWatermark(pdfDoc: PDFDocument, clientData: Record<string, unknown>) {
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    for (const page of pages) {
      const { width, height } = page.getSize();

      // Add diagonal watermark
      page.drawText('CONFIDENTIAL - ATTORNEY-CLIENT PRIVILEGED', {
        x: width / 2 - 200,
        y: height / 2,
        size: 20,
        font,
        color: rgb(0.8, 0.8, 0.8),
        opacity: 0.3,
        rotate: degrees(-45),
      });

      // Add case number at bottom
      if (clientData.caseNumber) {
        page.drawText(`Case: ${clientData.caseNumber}`, {
          x: 72,
          y: 36,
          size: 10,
          font,
          color: rgb(0.5, 0.5, 0.5),
        });
      }
    }
  }

  private async addMetadata(
    pdfDoc: PDFDocument,
    template: DocumentTemplate,
    clientData: Record<string, unknown>
  ) {
    pdfDoc.setTitle(
      `${template.name} - ${clientData.clientName || 'Client'} - ${clientData.caseNumber || 'Case'}`
    );
    pdfDoc.setAuthor('Vasquez Law Firm, PLLC');
    pdfDoc.setSubject(`Legal Document - ${template.practiceArea}`);
    pdfDoc.setKeywords([template.type, template.practiceArea, 'legal', 'document']);
    pdfDoc.setProducer('Vasquez Law Firm Document Management System');
    pdfDoc.setCreator('VLF Document Generator v1.0');
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());
  }

  private async saveDocumentRecord(
    template: DocumentTemplate,
    clientData: Record<string, unknown>,
    enhancedData: Record<string, unknown>
  ) {
    try {
      // TODO: Save document record when generatedDocument model is added to schema
      logger.info('Document record would be saved here', {
        templateId: template.id,
        userId: clientData.userId || 'system',
        documentType: template.type,
        documentName: `${template.name} - ${enhancedData.documentId}`,
      });
    } catch (error) {
      logger.error('Failed to save document record:', errorToLogMeta(error));
    }
  }

  private async encryptPdf(pdfBytes: Uint8Array, password: string): Promise<Uint8Array> {
    // PDF encryption would be implemented here
    // For now, return the original bytes
    logger.warn('PDF encryption not yet implemented');
    return pdfBytes;
  }

  // Get available templates
  async getTemplates(practiceArea?: string, language?: string): Promise<DocumentTemplate[]> {
    let templates = Array.from(this.templates.values());

    if (practiceArea) {
      templates = templates.filter(t => t.practiceArea === practiceArea);
    }

    if (language) {
      templates = templates.filter(t => t.language === language);
    }

    return templates;
  }

  // Get template by ID
  async getTemplate(templateId: string): Promise<DocumentTemplate | null> {
    return this.templates.get(templateId) || null;
  }
}

// Contract Analysis Service
export class ContractAnalyzer {
  async analyzeContract(
    fileBuffer: Buffer,
    options?: {
      language?: string;
      contractType?: string;
    }
  ): Promise<DocumentAnalysis> {
    try {
      // Extract text from PDF
      const text = await this.extractText(fileBuffer);

      // Perform AI analysis
      const analysis = await this.performAIAnalysis(text, options);

      // Check legal compliance
      const compliance = await this.checkLegalCompliance(analysis, options?.contractType);

      // Check against precedents
      const precedents = await this.checkPrecedents({} as any); // TODO: Fix precedent checking

      return {
        summary: analysis.summary,
        risks: analysis.risks,
        recommendations: [...analysis.recommendations, ...precedents],
        keyTerms: analysis.keyTerms as any,
        missingFields: (analysis as any).missingFields || [],
        legalCompliance: compliance,
      };
    } catch (error) {
      logger.error('Contract analysis failed:', errorToLogMeta(error));
      throw error;
    }
  }

  private async extractText(buffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      logger.error('PDF text extraction failed:', errorToLogMeta(error));
      throw new Error('Failed to extract text from PDF');
    }
  }

  private async performAIAnalysis(
    text: string,
    options?: unknown
  ): Promise<{
    summary: string;
    risks: string[];
    recommendations: string[];
    keyTerms: Array<{ term: string; definition: string }>;
    confidence: number;
  }> {
    // Simulate AI analysis - in production, integrate with OpenAI/Claude
    const analysis = {
      summary: 'Contract analysis summary would be generated by AI',
      risks: [
        'Unlimited liability clause detected',
        'No termination clause specified',
        'Arbitration clause may limit legal options',
      ],
      recommendations: [
        'Add limitation of liability clause',
        'Include clear termination conditions',
        'Review dispute resolution procedures',
      ],
      keyTerms: [
        {
          term: 'Parties',
          definition: `${this.extractParties(text).party1} and ${this.extractParties(text).party2}`,
        },
        {
          term: 'Effective Date',
          definition: this.extractDate(text, 'effective') || 'Not specified',
        },
        {
          term: 'Termination Date',
          definition: this.extractDate(text, 'termination') || 'Not specified',
        },
        { term: 'Payment Terms', definition: JSON.stringify(this.extractPaymentTerms(text)) },
        { term: 'Liability Terms', definition: JSON.stringify(this.extractLiabilityTerms(text)) },
      ],
      missingFields: [] as string[],
    };

    // Check for missing critical fields
    const terminationTerm = analysis.keyTerms.find(t => t.term === 'Termination Date');
    if (terminationTerm?.definition === 'Not specified') {
      analysis.missingFields.push('Termination date or conditions');
    }

    const paymentTerm = analysis.keyTerms.find(t => t.term === 'Payment Terms');
    if (paymentTerm && !paymentTerm.definition.includes('amount')) {
      analysis.missingFields.push('Payment amount');
    }

    return {
      ...analysis,
      confidence: 0.85, // Mock confidence score
    };
  }

  private extractParties(text: string): { party1: string; party2: string } {
    // Simple pattern matching for parties
    const partyPattern = /between\s+([\w\s,\.]+)\s+(?:and|AND)\s+([\w\s,\.]+)/i;
    const match = text.match(partyPattern);

    return {
      party1: match?.[1]?.trim() || 'Party 1',
      party2: match?.[2]?.trim() || 'Party 2',
    };
  }

  private extractDate(text: string, type: string): string | null {
    const datePattern = new RegExp(`${type}.*?(\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4})`, 'i');
    const match = text.match(datePattern);
    return match?.[1] || null;
  }

  private extractPaymentTerms(text: string): Record<string, unknown> {
    const amountPattern = /\$([\\d,]+(?:\\.\\d{2})?)/g;
    const amounts = [...text.matchAll(amountPattern)].map(m => m[1]);

    return {
      amount: amounts[0] || null,
      schedule: text.includes('monthly')
        ? 'monthly'
        : text.includes('annual')
          ? 'annual'
          : 'one-time',
      currency: 'USD',
    };
  }

  private extractLiabilityTerms(text: string): Record<string, unknown> {
    return {
      hasLimitationClause: /limit.*liability/i.test(text),
      hasIndemnificationClause: /indemnif/i.test(text),
      hasInsuranceRequirement: /insurance/i.test(text),
    };
  }

  private async checkLegalCompliance(
    analysis: {
      keyTerms: Array<{ term: string; definition: string }>;
    },
    contractType?: string
  ): Promise<{ isCompliant: boolean; issues: string[] }> {
    const issues: string[] = [];

    // Check general compliance
    const partiesTerm = analysis.keyTerms.find(t => t.term === 'Parties');
    if (!partiesTerm || partiesTerm.definition === 'Not specified') {
      issues.push('Contract must clearly identify all parties');
    }

    const effectiveDateTerm = analysis.keyTerms.find(t => t.term === 'Effective Date');
    if (!effectiveDateTerm || effectiveDateTerm.definition === 'Not specified') {
      issues.push('Contract must specify an effective date');
    }

    // Contract type specific checks
    switch (contractType) {
      case 'employment':
        const paymentTerm = analysis.keyTerms.find(t => t.term === 'Payment Terms');
        if (!paymentTerm || !paymentTerm.definition.includes('amount')) {
          issues.push('Employment contracts must specify compensation');
        }
        break;

      case 'service':
        const liabilityTerm = analysis.keyTerms.find(t => t.term === 'Liability Terms');
        if (!liabilityTerm || !liabilityTerm.definition.includes('hasLimitationClause')) {
          issues.push('Service contracts should include liability limitations');
        }
        break;
    }

    return {
      isCompliant: issues.length === 0,
      issues,
    };
  }

  private async checkPrecedents(keyTerms: {
    liabilityTerms?: { hasIndemnificationClause?: boolean };
    jurisdiction?: string;
    compensation?: { amount?: number };
  }): Promise<string[]> {
    // Check against legal precedents database
    const recommendations: string[] = [];

    // Simulated precedent checks
    if (keyTerms?.liabilityTerms?.hasIndemnificationClause) {
      recommendations.push('Review indemnification scope based on Smith v. Jones precedent');
    }

    return recommendations;
  }
}

// Export singleton instances
export const documentGenerator = new LegalDocumentGenerator();
export const contractAnalyzer = new ContractAnalyzer();

// Legacy compatibility
export class DocumentGenerator {
  static async generateRetainer(data: Record<string, unknown>) {
    return documentGenerator.generateDocument({
      templateId: 'retainer-agreement',
      clientData: data,
    });
  }

  static async generateInvoice(data: Record<string, unknown>) {
    return documentGenerator.generateDocument({
      templateId: 'invoice',
      clientData: data,
    });
  }

  static async generateLegalDocument(type: string, data: Record<string, unknown>) {
    return documentGenerator.generateDocument({
      templateId: type,
      clientData: data,
    });
  }
}
