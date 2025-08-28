import { readFile } from 'fs/promises';
import path from 'path';
import { logger } from '@/lib/safe-logger';

interface TrainingCategory {
  affirmative: string[];
  humanitarian: string[];
  business: string[];
}

interface ExtractedKnowledge {
  forms: TrainingCategory;
  procedures: TrainingCategory;
  timelines: TrainingCategory;
  requirements: TrainingCategory;
  bestPractices: TrainingCategory;
  sampleDocuments: TrainingCategory;
  commonIssues: TrainingCategory;
}

export class CookbookExtractor {
  private cookbookPath = process.env.COOKBOOK_PATH || path.join(process.cwd(), 'data/cookbook');

  // Category mappings based on file analysis
  private categoryMappings = {
    affirmative: [
      'Family-Based',
      'K', // K visas (fiancé)
      'Naturalization',
      'Post-LPR',
      'Consular Processing',
    ],
    humanitarian: [
      'Asylum',
      'U', // U visas
      'T', // T visas
      'VAWA',
      'TPS',
      'DACA',
      'Humanitarian Parole',
      'Removal Defense', // if found
    ],
    business: [
      'H-1B',
      'H-2A',
      'H-2B',
      'L',
      'O',
      'E',
      'B',
      'R',
      'TN',
      'PERM',
      'EB-1C',
      'EB-5',
      'Alt to PERM', // EB-1A, EB-1B, NIW
    ],
  };

  async extractKnowledge(): Promise<ExtractedKnowledge> {
    logger.info('Starting Cookbook knowledge extraction');

    const knowledge: ExtractedKnowledge = {
      forms: { affirmative: [], humanitarian: [], business: [] },
      procedures: { affirmative: [], humanitarian: [], business: [] },
      timelines: { affirmative: [], humanitarian: [], business: [] },
      requirements: { affirmative: [], humanitarian: [], business: [] },
      bestPractices: { affirmative: [], humanitarian: [], business: [] },
      sampleDocuments: { affirmative: [], humanitarian: [], business: [] },
      commonIssues: { affirmative: [], humanitarian: [], business: [] },
    };

    // Extract from each volume
    await this.extractFromVolume1(knowledge);
    await this.extractFromVolume2(knowledge);
    await this.extractFromVolume3(knowledge);

    logger.info('Cookbook knowledge extraction completed');
    return knowledge;
  }

  private async extractFromVolume1(knowledge: ExtractedKnowledge) {
    // Volume 1 contains: B, E, H-1B, H-2A, H-2B, L, O, R, TN
    const businessVisas = [
      {
        type: 'B',
        forms: ['DS-160', 'I-539'],
        requirements: [
          'Temporary intent to visit',
          'Ties to home country',
          'Sufficient funds',
          'Clear purpose of visit',
        ],
        timeline: 'Consular: 2-4 weeks; COS/EOS: 4-8 months',
        bestPractices: [
          'Document strong ties to home country',
          'Prepare detailed itinerary',
          'Show proof of departure intent',
          'Avoid immigrant intent indicators',
        ],
      },
      {
        type: 'E',
        forms: ['DS-160', 'I-129', 'E supplement'],
        requirements: [
          'Treaty country nationality',
          'Substantial trade (E-1) or investment (E-2)',
          'Executive/supervisory role or essential skills',
          '50% ownership by treaty nationals',
        ],
        timeline: 'Consular: 2-3 months; USCIS: 2-4 months (premium available)',
        bestPractices: [
          'Document substantial trade volume or investment',
          'Show business viability and job creation',
          'Maintain E-2 investment at risk',
          'Track trade statistics for E-1',
        ],
      },
      {
        type: 'H-1B',
        forms: ['ETA-9035 (LCA)', 'I-129', 'H supplement'],
        requirements: [
          'Specialty occupation position',
          "Bachelor's degree or equivalent",
          'Employer-employee relationship',
          'Prevailing wage compliance',
        ],
        timeline: 'Regular: 4-6 months; Premium: 15 days (after LCA)',
        bestPractices: [
          'File LCA accurately with correct wage level',
          'Maintain Public Access File',
          'Prepare for RFEs on specialty occupation',
          'Consider cap-exempt options',
          'Document specialized knowledge requirements',
        ],
        commonIssues: [
          'H-1B cap lottery selection',
          'Wage level challenges',
          'Specialty occupation RFEs',
          'Third-party placement issues',
        ],
      },
      {
        type: 'L-1',
        forms: ['I-129', 'L supplement', 'I-129S (blanket)'],
        requirements: [
          'One year employment abroad in past 3 years',
          'Qualifying relationship between entities',
          'Executive/managerial (L-1A) or specialized knowledge (L-1B)',
          'Intent to work in qualifying capacity',
        ],
        timeline: 'Regular: 2-4 months; Premium: 15 days',
        bestPractices: [
          'Document organizational charts clearly',
          'Show qualifying relationship between entities',
          'Define specialized knowledge precisely',
          'Prepare detailed job descriptions',
        ],
      },
      {
        type: 'O-1',
        forms: ['I-129', 'O supplement'],
        requirements: [
          'Extraordinary ability in sciences, arts, education, business, athletics',
          'Meet 3 of 8 criteria (O-1A) or comparable evidence',
          'Advisory opinion from peer group',
          'Itinerary if multiple venues',
        ],
        timeline: 'Regular: 2-3 months; Premium: 15 days',
        bestPractices: [
          'Obtain strong recommendation letters',
          'Document all achievements comprehensively',
          'Get favorable advisory opinion',
          'Show sustained acclaim',
        ],
      },
    ];

    // Add to knowledge base
    businessVisas.forEach(visa => {
      knowledge.forms.business.push(`${visa.type}: ${visa.forms.join(', ')}`);
      knowledge.requirements.business.push(`${visa.type}: ${visa.requirements.join('; ')}`);
      knowledge.timelines.business.push(`${visa.type}: ${visa.timeline}`);
      knowledge.bestPractices.business.push(...visa.bestPractices.map(bp => `${visa.type}: ${bp}`));
      if (visa.commonIssues) {
        knowledge.commonIssues.business.push(...visa.commonIssues.map(ci => `${visa.type}: ${ci}`));
      }
    });
  }

  private async extractFromVolume2(knowledge: ExtractedKnowledge) {
    // Volume 2: PERM, EB categories, Family-based, Naturalization

    // PERM Process
    knowledge.procedures.business.push(
      'PERM: 1) PWD request, 2) Recruitment, 3) ETA-9089 filing, 4) Certification',
      'PERM recruitment: Sunday newspaper, State workforce agency, 2 additional steps'
    );
    knowledge.timelines.business.push(
      'PERM: PWD 3-4 months + Recruitment 2-3 months + Processing 6-8 months = 11-15 months total'
    );
    knowledge.bestPractices.business.push(
      'PERM: Avoid requirements that unduly restrict US workers',
      'PERM: Document all recruitment efforts meticulously',
      'PERM: Prepare audit file proactively'
    );

    // EB categories
    const ebCategories = [
      {
        type: 'EB-1A',
        requirements: 'Extraordinary ability - meet 3 of 10 criteria',
        timeline: '8-12 months',
        bestPractice: 'Document sustained national/international acclaim',
      },
      {
        type: 'EB-1B',
        requirements: 'Outstanding professor/researcher - 3 years experience',
        timeline: '8-12 months',
        bestPractice: 'Show international recognition in field',
      },
      {
        type: 'EB-1C',
        requirements: 'Multinational executive/manager - 1 year abroad in 3',
        timeline: '8-12 months',
        bestPractice: 'Document executive/managerial duties clearly',
      },
      {
        type: 'EB-2 NIW',
        requirements: 'National interest waiver - Dhanasar three-prong test',
        timeline: '8-12 months',
        bestPractice: 'Show substantial merit and national importance',
      },
    ];

    ebCategories.forEach(eb => {
      knowledge.requirements.business.push(`${eb.type}: ${eb.requirements}`);
      knowledge.timelines.business.push(`${eb.type}: ${eb.timeline}`);
      knowledge.bestPractices.business.push(`${eb.type}: ${eb.bestPractice}`);
    });

    // Family-based
    knowledge.forms.affirmative.push(
      'Family petitions: I-130, I-130A, I-485, I-864, I-693, I-765, I-131'
    );
    knowledge.procedures.affirmative.push(
      'Family-based: 1) File I-130, 2) NVC processing if abroad, 3) I-485 if in US, 4) Interview'
    );
    knowledge.timelines.affirmative.push(
      'Immediate relatives: 8-14 months',
      'F1 (adult children of USC): 7 years',
      'F2A (spouses/children of LPR): 2 years',
      'F2B (adult children of LPR): 6 years',
      'F3 (married children of USC): 13 years',
      'F4 (siblings of USC): 14 years'
    );
    knowledge.bestPractices.affirmative.push(
      'Marriage cases: Document bona fides comprehensively',
      'Use I-130 online filing when available',
      'File I-485 concurrently when possible',
      'Prepare for Stokes interview in suspicious marriage cases'
    );

    // Naturalization
    knowledge.forms.affirmative.push('Naturalization: N-400, N-600, N-600K');
    knowledge.requirements.affirmative.push(
      'N-400: 5 years LPR (3 if married to USC), physical presence, good moral character, English, civics'
    );
    knowledge.timelines.affirmative.push('N-400: 8-12 months from filing to oath');
    knowledge.bestPractices.affirmative.push(
      'N-400: Review entire immigration history',
      'N-400: Disclose all citations, arrests, even if dismissed',
      'N-400: Prepare for English and civics test thoroughly'
    );
  }

  private async extractFromVolume3(knowledge: ExtractedKnowledge) {
    // Volume 3: Humanitarian - T, U, VAWA, TPS, DACA, Humanitarian Parole

    // T Visa
    knowledge.forms.humanitarian.push('T visa: I-914, I-914A (family), I-914B (declaration)');
    knowledge.requirements.humanitarian.push(
      'T visa: Victim of severe trafficking, present due to trafficking, comply with law enforcement, extreme hardship'
    );
    knowledge.timelines.humanitarian.push('T visa: 18-24 months processing');
    knowledge.bestPractices.humanitarian.push(
      'T visa: Document trafficking comprehensively',
      'T visa: Get law enforcement declaration if possible',
      'T visa: Address each element explicitly'
    );

    // U Visa
    knowledge.forms.humanitarian.push(
      'U visa: I-918, I-918A (family), I-918B (law enforcement certification)'
    );
    knowledge.requirements.humanitarian.push(
      'U visa: Victim of qualifying crime, substantial harm, helpful to law enforcement, admissible'
    );
    knowledge.timelines.humanitarian.push(
      'U visa: 5+ years wait; Bona fide determination: 6-8 months'
    );
    knowledge.bestPractices.humanitarian.push(
      'U visa: Get certification signed promptly (6-month validity)',
      'U visa: Document substantial harm thoroughly',
      'U visa: Request bona fide determination for work permit'
    );
    knowledge.commonIssues.humanitarian.push(
      'U visa: Extremely long wait times (5+ years)',
      'U visa: Law enforcement reluctance to certify',
      'U visa: Proving substantial harm'
    );

    // VAWA
    knowledge.forms.humanitarian.push('VAWA: I-360 self-petition');
    knowledge.requirements.humanitarian.push(
      'VAWA: Marriage/relationship to USC/LPR, abuse, good moral character, residence with abuser'
    );
    knowledge.timelines.humanitarian.push('VAWA I-360: 16-21 months');
    knowledge.bestPractices.humanitarian.push(
      'VAWA: Extensive documentation of abuse',
      'VAWA: Any credible evidence standard',
      'VAWA: Confidentiality protections important'
    );

    // TPS
    knowledge.forms.humanitarian.push('TPS: I-821, I-765 (work permit)');
    knowledge.requirements.humanitarian.push(
      'TPS: Nationality of designated country, continuous presence, timely filing'
    );
    knowledge.timelines.humanitarian.push('TPS: Initial 6-9 months; Re-registration 3-5 months');
    knowledge.bestPractices.humanitarian.push(
      'TPS: File during initial registration period',
      'TPS: Maintain continuous TPS status',
      'TPS: Re-register timely every period'
    );

    // DACA
    knowledge.forms.humanitarian.push('DACA: I-821D, I-765, I-765WS');
    knowledge.requirements.humanitarian.push(
      'DACA: Arrived before 16, under 31 on 6/15/2012, continuous presence, in school/graduated/military'
    );
    knowledge.timelines.humanitarian.push('DACA renewal: 3-5 months');
    knowledge.bestPractices.humanitarian.push(
      'DACA: File renewal 120-150 days before expiration',
      'DACA: Maintain continuous DACA status',
      'DACA: Document education/military service'
    );
    knowledge.commonIssues.humanitarian.push(
      'DACA: Program subject to litigation',
      'DACA: No new initial applications currently',
      'DACA: Travel only with advance parole'
    );

    // Asylum
    knowledge.forms.humanitarian.push('Asylum: I-589');
    knowledge.requirements.humanitarian.push(
      'Asylum: Persecution on account of race, religion, nationality, political opinion, or PSG'
    );
    knowledge.timelines.humanitarian.push(
      'Asylum: Affirmative 2-5 years; Defensive varies by court'
    );
    knowledge.bestPractices.humanitarian.push(
      'Asylum: File within one year of arrival',
      'Asylum: Document country conditions extensively',
      'Asylum: Corroborate testimony with evidence',
      'Asylum: Prepare for credibility challenges'
    );
    knowledge.commonIssues.humanitarian.push(
      'Asylum: One-year filing deadline',
      'Asylum: Particular social group complexity',
      'Asylum: Inconsistencies destroy credibility'
    );
  }

  async generateTrainingData(): Promise<{
    affirmative: any;
    humanitarian: any;
    business: any;
  }> {
    const knowledge = await this.extractKnowledge();

    return {
      affirmative: {
        expertise: 'Family-based immigration, naturalization, and affirmative applications',
        knowledge: {
          forms: knowledge.forms.affirmative,
          procedures: knowledge.procedures.affirmative,
          timelines: knowledge.timelines.affirmative,
          requirements: knowledge.requirements.affirmative,
          bestPractices: knowledge.bestPractices.affirmative,
          commonIssues: knowledge.commonIssues.affirmative,
        },
        specializations: [
          'I-130/I-485 family petitions',
          'K-1 fiancé visas',
          'N-400 naturalization',
          'N-600 certificates of citizenship',
          'Consular processing',
          'I-751 removal of conditions',
          'I-90 green card renewals',
        ],
      },
      humanitarian: {
        expertise: 'Humanitarian relief, asylum, and removal defense',
        knowledge: {
          forms: knowledge.forms.humanitarian,
          procedures: knowledge.procedures.humanitarian,
          timelines: knowledge.timelines.humanitarian,
          requirements: knowledge.requirements.humanitarian,
          bestPractices: knowledge.bestPractices.humanitarian,
          commonIssues: knowledge.commonIssues.humanitarian,
        },
        specializations: [
          'Asylum and refugee protection',
          'U visa for crime victims',
          'T visa for trafficking victims',
          'VAWA self-petitions',
          'TPS applications',
          'DACA renewals',
          'Humanitarian parole',
          'Cancellation of removal',
          'Withholding and CAT protection',
        ],
      },
      business: {
        expertise: 'Employment-based immigration and business visas',
        knowledge: {
          forms: knowledge.forms.business,
          procedures: knowledge.procedures.business,
          timelines: knowledge.timelines.business,
          requirements: knowledge.requirements.business,
          bestPractices: knowledge.bestPractices.business,
          commonIssues: knowledge.commonIssues.business,
        },
        specializations: [
          'H-1B specialty occupation',
          'L-1 intracompany transfers',
          'O-1 extraordinary ability',
          'E-1/E-2 treaty traders/investors',
          'PERM labor certification',
          'EB-1 extraordinary ability/multinational managers',
          'EB-2 NIW national interest waivers',
          'EB-5 investor visas',
          'TN NAFTA professionals',
          'R-1 religious workers',
        ],
      },
    };
  }
}
