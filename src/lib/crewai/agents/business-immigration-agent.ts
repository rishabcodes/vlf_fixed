import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { APISafetyWrapper } from '@/lib/api-safety';
import { logger } from '@/lib/safe-logger';
import { errorToLogMeta } from '@/lib/safe-logger';

export class BusinessImmigrationAgent {
  private model: ChatOpenAI | null = null;
  private safetyWrapper: APISafetyWrapper;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    this.safetyWrapper = new APISafetyWrapper({
      key: apiKey,
      serviceName: 'OpenAI',
      required: false,
    });
    this.initializeModel();
  }

  private initializeModel() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey && apiKey !== 'not-configured') {
      this.model = new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: 'gpt-4',
        temperature: 0.7,
      });
    }
  }

  async analyzeVisaOptions(params: {
    companyName: string;
    candidateName?: string;
    position: string;
    education: string;
    experience: string;
    currentStatus?: string;
    salary?: string;
    companySize?: string;
  }): Promise<VisaAnalysis> {
    try {
      if (!this.model) {
        return this.getMockVisaAnalysis(params);
      }

      const systemPrompt = `You are an experienced business immigration attorney specializing in employment-based visas. 
Analyze visa options considering:
1. H-1B specialty occupations and cap considerations
2. L-1 intracompany transfers (A and B)
3. O-1 extraordinary ability
4. E-2 treaty investors
5. EB categories for permanent residence
6. PERM labor certification requirements
7. Premium processing availability
8. Prevailing wage requirements`;

      const userPrompt = `Analyze visa options for:
Company: ${params.companyName}
Position: ${params.position}
Candidate Education: ${params.education}
Experience: ${params.experience}
Current Status: ${params.currentStatus || 'Outside US'}
Proposed Salary: ${params.salary || 'TBD'}
Company Size: ${params.companySize || 'Unknown'}

Provide:
1. Recommended visa categories
2. Eligibility assessment
3. Timeline for each option
4. Key requirements and documents
5. Potential challenges`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseVisaAnalysis(response.content as string, params);
    } catch (error) {
      logger.error('Visa analysis failed', errorToLogMeta(error));
      return this.getMockVisaAnalysis(params);
    }
  }

  async preparePERMStrategy(params: {
    position: string;
    requirements: string;
    salary: string;
    location: string;
    specialRequirements?: string;
  }): Promise<PERMStrategy> {
    try {
      if (!this.model) {
        return this.getMockPERMStrategy({ companyName: 'Company', position: params.position });
      }

      const systemPrompt = `You are preparing a PERM labor certification strategy. Consider:
- Job requirements that don't unduly restrict US workers
- Prevailing wage determination
- Recruitment requirements and timing
- Special recruitment for professional positions
- Audit triggers to avoid`;

      const userPrompt = `Develop PERM strategy for:
Position: ${params.position}
Requirements: ${params.requirements}
Salary: ${params.salary}
Location: ${params.location}
Special Requirements: ${params.specialRequirements || 'None'}`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parsePERMStrategy(response.content as string);
    } catch (error) {
      logger.error('PERM strategy preparation failed', errorToLogMeta(error));
      return this.getMockPERMStrategy({ companyName: 'Company', position: params.position });
    }
  }

  async assessH1BCase(params: {
    position: string;
    degree: string;
    jobDuties: string;
    salary: string;
    capSubject: boolean;
  }): Promise<H1BAssessment> {
    try {
      if (!this.model) {
        return this.getMockH1BAssessment({ companyName: 'Company', position: params.position });
      }

      const systemPrompt = `Assess H-1B eligibility focusing on:
- Specialty occupation criteria
- Degree requirement and relatedness
- Prevailing wage compliance
- Cap-exempt possibilities
- RFE risk factors`;

      const userPrompt = `Assess H-1B case:
Position: ${params.position}
Degree: ${params.degree}
Job Duties: ${params.jobDuties}
Salary: ${params.salary}
Cap Subject: ${params.capSubject ? 'Yes' : 'No'}`;

      const response = await this.model.call([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      return this.parseH1BAssessment(response.content as string);
    } catch (error) {
      logger.error('H1B assessment failed', errorToLogMeta(error));
      return this.getMockH1BAssessment({ companyName: 'Company', position: params.position });
    }
  }

  private parseVisaAnalysis(
    content: string,
    params: {
      companyName: string;
      position: string;
      education: string;
      experience: string;
      currentStatus?: string;
      salary?: string;
      companySize?: string;
    }
  ): VisaAnalysis {
    const sections = content.split('\n\n');

    return {
      recommendedVisas: this.extractVisaOptions(sections[0] || ''),
      eligibilityScore: this.calculateEligibilityScore(params),
      timeline: this.extractTimeline(sections[2] || ''),
      requirements: this.extractListItems(sections[3] || ''),
      challenges: this.extractListItems(sections[4] || ''),
      costEstimate: this.estimateCosts(params),
      successProbability: this.assessSuccessProbability(params),
    };
  }

  private parsePERMStrategy(content: string): PERMStrategy {
    const sections = content.split('\n\n');

    return {
      jobRequirements: this.extractListItems(sections[0] || ''),
      recruitmentPlan: this.extractListItems(sections[1] || ''),
      timeline: sections[2] || '8-12 months total',
      pwdStrategy: sections[3] || 'Request PWD with standard requirements',
      auditRisks: this.extractListItems(sections[4] || ''),
      mitigationSteps: this.extractListItems(sections[5] || ''),
    };
  }

  private parseH1BAssessment(content: string): H1BAssessment {
    const sections = content.split('\n\n');

    return {
      specialtyOccupation: sections[0]?.includes('qualifies') || false,
      degreeRelated: sections[1]?.includes('related') || false,
      wageCompliant: sections[2]?.includes('compliant') || false,
      rfeRisk: this.assessRFERisk(content),
      strengtheningSuggestions: this.extractListItems(sections[3] || ''),
      alternativeOptions: this.extractListItems(sections[4] || ''),
    };
  }

  private extractVisaOptions(text: string): VisaOption[] {
    const options: VisaOption[] = [];
    const visaTypes = ['H-1B', 'L-1A', 'L-1B', 'O-1', 'E-2', 'EB-1', 'EB-2', 'EB-3'];

    visaTypes.forEach(visa => {
      if (text.includes(visa)) {
        options.push({
          type: visa,
          priority: text.indexOf(visa) < 100 ? 'primary' : 'alternative',
          timeline: this.getVisaTimeline(visa),
        });
      }
    });

    return options.length > 0
      ? options
      : [{ type: 'H-1B', priority: 'primary', timeline: '4-6 months' }];
  }

  private getVisaTimeline(visaType: string): string {
    const timelines: Record<string, string> = {
      'H-1B': '4-6 months (premium: 15 days)',
      'L-1A': '2-4 months (premium: 15 days)',
      'L-1B': '2-4 months (premium: 15 days)',
      'O-1': '2-3 months (premium: 15 days)',
      'E-2': '2-3 months',
      'EB-1': '8-12 months',
      'EB-2': '2-3 years (with PERM)',
      'EB-3': '3-4 years (with PERM)',
    };
    return timelines[visaType] || '3-6 months';
  }

  private calculateEligibilityScore(params: {
    education: string;
    experience: string;
    position?: string;
    salary?: string;
    currentStatus?: string;
    companySize?: string;
  }): number {
    let score = 70; // Base score

    if (params.education.includes('Master') || params.education.includes('PhD')) score += 10;
    if (params.experience.includes('5+') || params.experience.includes('10+')) score += 10;
    if (params.currentStatus?.includes('H-1B')) score += 5;
    if (params.companySize?.includes('large') || params.companySize?.includes('500+')) score += 5;

    return Math.min(score, 95);
  }

  private extractTimeline(text: string): string {
    return text || 'Processing time varies by visa type: 2-6 months typically';
  }

  private estimateCosts(params: {
    position: string;
    salary?: string;
    companySize?: string;
  }): string {
    const baseCosts = {
      'H-1B': '$6,000-$10,000',
      'L-1': '$5,000-$8,000',
      'O-1': '$6,000-$9,000',
      'PERM + EB': '$10,000-$15,000',
    };
    return 'Estimated total costs: $5,000-$15,000 depending on visa type and premium processing';
  }

  private assessSuccessProbability(params: {
    education: string;
    experience: string;
    currentStatus?: string;
  }): 'high' | 'medium' | 'low' {
    const score = this.calculateEligibilityScore(params);
    if (score >= 85) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
  }

  private assessRFERisk(content: string): 'low' | 'medium' | 'high' {
    if (content.includes('strong case') || content.includes('clear qualification')) return 'low';
    if (content.includes('some concerns') || content.includes('additional evidence'))
      return 'medium';
    return 'high';
  }

  private extractListItems(text: string): string[] {
    return text
      .split('\n')
      .filter(
        line =>
          line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().match(/^\d+\./)
      )
      .map(line => line.replace(/^[-•\d.]\s*/, '').trim())
      .filter(item => item.length > 0);
  }

  private getMockVisaAnalysis(params: { companyName: string; position: string }): VisaAnalysis {
    return {
      recommendedVisas: [
        { type: 'H-1B', priority: 'primary', timeline: '4-6 months' },
        { type: 'L-1A', priority: 'alternative', timeline: '2-4 months' },
      ],
      eligibilityScore: 85,
      timeline:
        'H-1B: 4-6 months (cap lottery in March); L-1: 2-4 months (if qualifying relationship exists)',
      requirements: [
        "Bachelor's degree or equivalent in related field",
        'Specialty occupation position',
        'Labor Condition Application (LCA) approval',
        'Prevailing wage compliance',
        'Employer-employee relationship evidence',
      ],
      challenges: [
        'H-1B cap lottery (if not cap-exempt)',
        'Prevailing wage requirements may exceed offered salary',
        'RFE risk for generic job titles',
        'Degree relatedness to position',
      ],
      costEstimate:
        'Total: $6,000-$10,000 (including government fees, attorney fees, premium processing)',
      successProbability: 'high',
    };
  }

  private getMockPERMStrategy(params: { companyName: string; position: string }): PERMStrategy {
    return {
      jobRequirements: [
        "Bachelor's degree in Computer Science or related field",
        '2 years of experience in the position offered',
        'Experience with specific technologies used by employer',
        'Avoid requirements that mirror current employee too closely',
      ],
      recruitmentPlan: [
        'Sunday newspaper ads in area of intended employment',
        'State workforce agency job order (30 days)',
        'Two additional recruitment steps from regulatory list',
        'Internal posting and website posting',
        'Document all recruitment efforts meticulously',
      ],
      timeline: 'PWD: 3-4 months; Recruitment: 2-3 months; Filing to approval: 6-8 months',
      pwdStrategy: 'File PWD with standard SOC code and avoid special skills unless essential',
      auditRisks: [
        'Requirements tailored too specifically to foreign worker',
        'Wage offered below prevailing wage',
        'Inconsistent recruitment documentation',
        'Business necessity not established for requirements',
      ],
      mitigationSteps: [
        'Use standard industry requirements',
        'Ensure wage meets or exceeds PWD',
        'Maintain recruitment folder with all documents',
        'Draft business necessity justifications in advance',
      ],
    };
  }

  private getMockH1BAssessment(params: { companyName: string; position: string }): H1BAssessment {
    return {
      specialtyOccupation: true,
      degreeRelated: true,
      wageCompliant: true,
      rfeRisk: 'medium',
      strengtheningSuggestions: [
        'Provide detailed job duties showing complexity',
        'Include industry articles about degree requirements',
        'Obtain expert opinion letter if degree not directly related',
        'Show organizational chart demonstrating position level',
        'Document any specialized knowledge requirements',
      ],
      alternativeOptions: [
        'Consider O-1 if candidate has publications or awards',
        'Explore L-1 if employed abroad by related entity',
        'Investigate cap-exempt employers (universities, non-profits)',
        'Consider concurrent H-1B filings if applicable',
      ],
    };
  }
}

interface VisaAnalysis {
  recommendedVisas: VisaOption[];
  eligibilityScore: number;
  timeline: string;
  requirements: string[];
  challenges: string[];
  costEstimate: string;
  successProbability: 'high' | 'medium' | 'low';
}

interface VisaOption {
  type: string;
  priority: 'primary' | 'alternative';
  timeline: string;
}

interface PERMStrategy {
  jobRequirements: string[];
  recruitmentPlan: string[];
  timeline: string;
  pwdStrategy: string;
  auditRisks: string[];
  mitigationSteps: string[];
}

interface H1BAssessment {
  specialtyOccupation: boolean;
  degreeRelated: boolean;
  wageCompliant: boolean;
  rfeRisk: 'low' | 'medium' | 'high';
  strengtheningSuggestions: string[];
  alternativeOptions: string[];
}
