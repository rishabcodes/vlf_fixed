/**
 * Legal Practice Hub - Consolidated Legal Services
 * 
 * This hub consolidates 18 individual legal agents into 5 intelligent specialists:
 * 
 * CONSOLIDATION SUMMARY:
 * =====================
 * 
 * Immigration Law Specialist (7 → 1):
 * - immigration-specialist-agent.ts
 * - business-immigration-agent.ts
 * - enhanced-business-immigration-agent.ts
 * - enhanced-affirmative-immigration-agent.ts
 * - enhanced-humanitarian-agent.ts
 * - aila-trained-removal-agent.ts
 * - removal-defense-agent.ts
 * 
 * Criminal Defense Specialist (2 → 1):
 * - criminal-defense-agent.ts
 * - criminal-defense-specialist-agent.ts
 * 
 * Civil Practice Specialist (3 → 1):
 * - personal-injury-specialist-agent.ts
 * - family-law-specialist-agent.ts
 * - workers-compensation-specialist-agent.ts
 * 
 * Client Services Specialist (3 → 1):
 * - enhanced-intake-agent.ts
 * - appointment-scheduling-agent.ts
 * - document-analysis-agent.ts
 * 
 * Legal Analysis Specialist (3 → 1):
 * - legal-consultation-agent.ts
 * - competitive-analysis-agent.ts
 * - ai-overview-optimization-agent.ts
 * 
 * TOTAL CONSOLIDATION: 18 agents → 5 specialists (72% reduction)
 */

// Import all consolidated specialists
import { 
  ImmigrationLawSpecialist, 
  immigrationLawSpecialist,
  type ImmigrationConsultationRequest,
  type ImmigrationAnalysis,
  type ImmigrationSpecialty 
} from './immigration-law-specialist';

import { 
  CriminalDefenseSpecialist, 
  criminalDefenseSpecialist,
  type CriminalDefenseConsultationRequest,
  type CriminalDefenseAnalysis 
} from './criminal-defense-specialist';

import { 
  CivilPracticeSpecialist, 
  civilPracticeSpecialist,
  type CivilPracticeConsultationRequest,
  type CivilPracticeAnalysis,
  type CivilPracticeArea 
} from './civil-practice-specialist';

import { 
  ClientServicesSpecialist, 
  clientServicesSpecialist,
  type ClientServicesRequest,
  type ClientServicesResponse,
  type ClientServiceType,
  LegalPracticeArea 
} from './client-services-specialist';

import { 
  LegalAnalysisSpecialist, 
  legalAnalysisSpecialist,
  type LegalAnalysisRequest,
  type LegalAnalysisResponse,
  type AnalysisType 
} from './legal-analysis-specialist';

// Export all specialist classes and instances
export {
  // Immigration Law
  ImmigrationLawSpecialist,
  immigrationLawSpecialist,
  type ImmigrationConsultationRequest,
  type ImmigrationAnalysis,
  type ImmigrationSpecialty,
  
  // Criminal Defense
  CriminalDefenseSpecialist,
  criminalDefenseSpecialist,
  type CriminalDefenseConsultationRequest,
  type CriminalDefenseAnalysis,
  
  // Civil Practice
  CivilPracticeSpecialist,
  civilPracticeSpecialist,
  type CivilPracticeConsultationRequest,
  type CivilPracticeAnalysis,
  type CivilPracticeArea,
  
  // Client Services
  ClientServicesSpecialist,
  clientServicesSpecialist,
  type ClientServicesRequest,
  type ClientServicesResponse,
  type ClientServiceType,
  
  // Legal Analysis
  LegalAnalysisSpecialist,
  legalAnalysisSpecialist,
  type LegalAnalysisRequest,
  type LegalAnalysisResponse,
  type AnalysisType,
  
  // Common types
  LegalPracticeArea,
};

/**
 * Legal Practice Hub Router
 * 
 * Intelligent routing system that directs requests to the appropriate specialist
 * based on the type of legal matter and client needs.
 */
export class LegalPracticeHubRouter {
  private static instance: LegalPracticeHubRouter;
  
  static getInstance(): LegalPracticeHubRouter {
    if (!LegalPracticeHubRouter.instance) {
      LegalPracticeHubRouter.instance = new LegalPracticeHubRouter();
    }
    return LegalPracticeHubRouter.instance;
  }

  /**
   * Route immigration cases to Immigration Law Specialist
   */
  async handleImmigrationCase(request: ImmigrationConsultationRequest): Promise<ImmigrationAnalysis> {
    return immigrationLawSpecialist.analyzeCase(request);
  }

  /**
   * Route criminal defense cases to Criminal Defense Specialist
   */
  async handleCriminalDefenseCase(request: CriminalDefenseConsultationRequest): Promise<CriminalDefenseAnalysis> {
    return criminalDefenseSpecialist.analyzeCase(request);
  }

  /**
   * Route civil practice cases to Civil Practice Specialist
   */
  async handleCivilPracticeCase(request: CivilPracticeConsultationRequest): Promise<CivilPracticeAnalysis> {
    return civilPracticeSpecialist.analyzeCase(request);
  }

  /**
   * Route client service requests to Client Services Specialist
   */
  async handleClientServiceRequest(request: ClientServicesRequest): Promise<ClientServicesResponse> {
    return clientServicesSpecialist.processClientService(request);
  }

  /**
   * Route analysis requests to Legal Analysis Specialist
   */
  async handleAnalysisRequest(request: LegalAnalysisRequest): Promise<LegalAnalysisResponse> {
    return legalAnalysisSpecialist.performAnalysis(request);
  }

  /**
   * Intelligent case routing based on case type and description
   */
  async routeCase(caseInfo: {
    practiceArea: string;
    caseType: string;
    description: string;
    urgency: 'low' | 'medium' | 'high';
    clientInfo?: any;
  }): Promise<{ specialist: string; recommendation: string }> {
    // Determine the appropriate specialist based on practice area
    const practiceArea = caseInfo.practiceArea.toLowerCase();
    
    if (practiceArea.includes('immigration') || 
        practiceArea.includes('deportation') ||
        practiceArea.includes('visa') ||
        practiceArea.includes('asylum') ||
        practiceArea.includes('green card') ||
        practiceArea.includes('citizenship')) {
      return {
        specialist: 'immigration-law-specialist',
        recommendation: 'Route to Immigration Law Specialist for comprehensive immigration analysis'
      };
    }
    
    if (practiceArea.includes('criminal') ||
        practiceArea.includes('dui') ||
        practiceArea.includes('arrest') ||
        practiceArea.includes('charges') ||
        practiceArea.includes('police')) {
      return {
        specialist: 'criminal-defense-specialist',
        recommendation: 'Route to Criminal Defense Specialist for criminal law analysis'
      };
    }
    
    if (practiceArea.includes('personal injury') ||
        practiceArea.includes('accident') ||
        practiceArea.includes('family law') ||
        practiceArea.includes('workers comp') ||
        practiceArea.includes('divorce') ||
        practiceArea.includes('custody')) {
      return {
        specialist: 'civil-practice-specialist',
        recommendation: 'Route to Civil Practice Specialist for civil law analysis'
      };
    }
    
    // Default routing for complex or unclear cases
    return {
      specialist: 'legal-analysis-specialist',
      recommendation: 'Route to Legal Analysis Specialist for comprehensive case evaluation'
    };
  }
}

/**
 * Export the router instance for use throughout the application
 */
export const legalPracticeHubRouter = LegalPracticeHubRouter.getInstance();

/**
 * Legal Practice Hub Statistics
 */
export const LEGAL_PRACTICE_HUB_STATS = {
  totalSpecialists: 5,
  originalAgents: 18,
  consolidationRatio: '72%',
  specialistAreas: [
    'Immigration Law (7 agents consolidated)',
    'Criminal Defense (2 agents consolidated)', 
    'Civil Practice (3 agents consolidated)',
    'Client Services (3 agents consolidated)',
    'Legal Analysis (3 agents consolidated)',
  ],
  capabilities: [
    'Intelligent case routing',
    'Multi-language support (English/Spanish)',
    'Practice area specialization',
    'AI Overview optimization',
    'Competitive analysis',
    'Client service automation',
    'Document analysis',
    'Appointment scheduling',
    'Case complexity assessment',
    'Risk factor analysis',
  ],
};