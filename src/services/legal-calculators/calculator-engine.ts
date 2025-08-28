import { logger } from '@/lib/safe-logger';
import { z } from 'zod';

// Calculator result schemas
const CalculatorResultSchema = z.object({
  calculatorType: z.string(),
  inputs: z.record(z.unknown()),
  results: z.record(z.unknown()),
  recommendations: z.array(z.string()),
  disclaimer: z.string(),
  timestamp: z.date(),
  estimatedAccuracy: z.number().min(0).max(100),
  followUpActions: z.array(
    z.object({
      action: z.string(),
      description: z.string(),
      priority: z.enum(['high', 'medium', 'low']),
      timeframe: z.string().optional(),
    })
  ),
});

// Personal Injury Calculator
const PersonalInjuryInputSchema = z.object({
  medicalExpenses: z.number().min(0),
  lostWages: z.number().min(0),
  painAndSuffering: z.enum(['minimal', 'moderate', 'severe', 'extreme']),
  injuryType: z.enum(['soft_tissue', 'fracture', 'head_injury', 'spinal_injury', 'burns', 'other']),
  accidentType: z.enum([
    'car_accident',
    'slip_and_fall',
    'workplace',
    'medical_malpractice',
    'other',
  ]),
  duration: z.number().min(0), // Duration of treatment in weeks
  permanentDisability: z.boolean(),
  futureExpenses: z.number().min(0),
  propertyDamage: z.number().min(0),
  faultPercentage: z.number().min(0).max(100), // For comparative negligence
});

// Immigration Calculator
const ImmigrationInputSchema = z.object({
  visaType: z.enum(['family', 'employment', 'asylum', 'student', 'visitor', 'green_card']),
  priorityDate: z.date().optional(),
  countryOfBirth: z.string(),
  relationshipToSponsor: z.enum(['spouse', 'child', 'parent', 'sibling', 'other', 'none']),
  sponsorCitizenship: z.enum(['us_citizen', 'permanent_resident', 'none']),
  currentStatus: z.enum([
    'tourist',
    'student',
    'work_visa',
    'asylum_seeker',
    'undocumented',
    'other',
  ]),
  criminalHistory: z.boolean(),
  previousDenials: z.boolean(),
  englishProficiency: z.enum(['fluent', 'intermediate', 'basic', 'none']),
  education: z.enum(['phd', 'masters', 'bachelors', 'high_school', 'less_than_high_school']),
});

// Workers Compensation Calculator
const WorkersCompInputSchema = z.object({
  injuryType: z.enum([
    'temporary_partial',
    'temporary_total',
    'permanent_partial',
    'permanent_total',
    'death',
  ]),
  weeklyWage: z.number().min(0),
  weeksDisabled: z.number().min(0),
  medicalExpenses: z.number().min(0),
  disabilityRating: z.number().min(0).max(100), // Percentage disability
  dependents: z.number().min(0),
  stateOfInjury: z.string(),
  ageAtInjury: z.number().min(16).max(100),
  returnToWorkStatus: z.enum(['full_duty', 'light_duty', 'cannot_return', 'unknown']),
});

// Criminal Defense Calculator
const CriminalDefenseInputSchema = z.object({
  chargeType: z.enum(['misdemeanor', 'felony']),
  chargeClass: z.string(), // A, B, C, etc.
  priorConvictions: z.number().min(0),
  circumstances: z.enum(['aggravating', 'neutral', 'mitigating']),
  pleaType: z.enum(['guilty', 'not_guilty', 'no_contest']),
  cooperationLevel: z.enum(['full', 'partial', 'none']),
  evidenceStrength: z.enum(['strong', 'moderate', 'weak']),
  publicDefender: z.boolean(),
});

// Family Law Calculator
const FamilyLawInputSchema = z.object({
  calculationType: z.enum(['child_support', 'spousal_support', 'property_division']),
  grossIncome1: z.number().min(0),
  grossIncome2: z.number().min(0),
  childrenCount: z.number().min(0),
  custodyArrangement: z.enum(['sole', 'joint', 'primary', 'supervised']),
  marriageDuration: z.number().min(0), // Years
  separationDate: z.date().optional(),
  propertyValue: z.number().min(0),
  debt: z.number().min(0),
  stateOfResidence: z.string(),
});

export class LegalCalculatorEngine {
  async calculatePersonalInjury(
    inputs: z.infer<typeof PersonalInjuryInputSchema>
  ): Promise<z.infer<typeof CalculatorResultSchema>> {
    const validatedInputs = PersonalInjuryInputSchema.parse(inputs);

    // Base calculation factors
    const painMultipliers = {
      minimal: 1.5,
      moderate: 3,
      severe: 5,
      extreme: 8,
    };

    const injuryTypeMultipliers = {
      soft_tissue: 1,
      fracture: 1.5,
      head_injury: 3,
      spinal_injury: 4,
      burns: 2,
      other: 1.2,
    };

    // Calculate pain and suffering
    const medicalBase = validatedInputs.medicalExpenses + validatedInputs.futureExpenses;
    const painMultiplier = painMultipliers[validatedInputs.painAndSuffering];
    const injuryMultiplier = injuryTypeMultipliers[validatedInputs.injuryType];

    let painAndSufferingAmount = medicalBase * painMultiplier * injuryMultiplier;

    // Adjust for permanent disability
    if (validatedInputs.permanentDisability) {
      painAndSufferingAmount *= 1.5;
    }

    // Calculate total damages
    const economicDamages =
      validatedInputs.medicalExpenses +
      validatedInputs.lostWages +
      validatedInputs.futureExpenses +
      validatedInputs.propertyDamage;

    const totalDamages = economicDamages + painAndSufferingAmount;

    // Apply comparative negligence if applicable
    const adjustedTotal = (totalDamages * (100 - validatedInputs.faultPercentage)) / 100;

    // Generate settlement ranges
    const lowEstimate = adjustedTotal * 0.7;
    const highEstimate = adjustedTotal * 1.3;

    const recommendations = this.generatePersonalInjuryRecommendations(
      validatedInputs,
      adjustedTotal
    );

    return {
      calculatorType: 'personal_injury',
      inputs: validatedInputs,
      results: {
        economicDamages,
        painAndSufferingAmount,
        totalDamagesBeforeNegligence: totalDamages,
        adjustedTotal,
        settlementRange: {
          low: lowEstimate,
          high: highEstimate,
        },
        estimatedNettoClient: adjustedTotal * 0.67, // After 33% attorney fee
      },
      recommendations,
      disclaimer:
        'This is an estimate only. Actual settlement amounts vary significantly based on specific case facts, jurisdiction, and many other factors.',
      timestamp: new Date(),
      estimatedAccuracy: 75,
      followUpActions: [
        {
          action: 'consultation',
          description: 'Schedule a free consultation to discuss your specific case',
          priority: 'high',
          timeframe: 'within 24 hours',
        },
        {
          action: 'documentation',
          description: 'Gather all medical records and bills related to your injury',
          priority: 'high',
        },
        {
          action: 'evidence',
          description: 'Preserve photos, witness information, and accident reports',
          priority: 'medium',
        },
      ],
    };
  }

  async calculateImmigration(
    inputs: z.infer<typeof ImmigrationInputSchema>
  ): Promise<z.infer<typeof CalculatorResultSchema>> {
    const validatedInputs = ImmigrationInputSchema.parse(inputs);

    // Processing time estimates (in months)
    const processingTimes = {
      family: { spouse: 12, child: 18, parent: 24, sibling: 120 },
      employment: 24,
      asylum: 36,
      student: 6,
      visitor: 3,
      green_card: 18,
    };

    // Success probability factors
    let successProbability = 85; // Base probability

    // Adjust based on various factors
    if (validatedInputs.criminalHistory) successProbability -= 20;
    if (validatedInputs.previousDenials) successProbability -= 15;
    if (validatedInputs.englishProficiency === 'fluent') successProbability += 5;
    if (validatedInputs.education === 'phd' || validatedInputs.education === 'masters')
      successProbability += 10;

    // Estimate costs
    const costEstimates = {
      family: { attorney: 2500, filing: 1200, total: 3700 },
      employment: { attorney: 5000, filing: 2500, total: 7500 },
      asylum: { attorney: 4000, filing: 500, total: 4500 },
      student: { attorney: 1500, filing: 350, total: 1850 },
      visitor: { attorney: 800, filing: 160, total: 960 },
      green_card: { attorney: 3500, filing: 1500, total: 5000 },
    };

    const estimatedCost = costEstimates[validatedInputs.visaType];
    let estimatedTimeframe = processingTimes[validatedInputs.visaType];

    if (typeof estimatedTimeframe === 'object') {
      estimatedTimeframe =
        estimatedTimeframe[
          validatedInputs.relationshipToSponsor as keyof typeof estimatedTimeframe
        ] || 24;
    }

    const recommendations = this.generateImmigrationRecommendations(
      validatedInputs,
      successProbability
    );

    return {
      calculatorType: 'immigration',
      inputs: validatedInputs,
      results: {
        successProbability: Math.max(10, Math.min(95, successProbability)),
        estimatedTimeframe,
        estimatedCost,
        priorityCategory: this.getImmigrationPriority(validatedInputs),
        nextSteps: this.getImmigrationNextSteps(validatedInputs),
      },
      recommendations,
      disclaimer:
        'Immigration law is complex and constantly changing. This estimate is based on current processing times and typical cases. Individual results may vary significantly.',
      timestamp: new Date(),
      estimatedAccuracy: 70,
      followUpActions: [
        {
          action: 'consultation',
          description: 'Schedule an immigration assessment consultation',
          priority: 'high',
          timeframe: 'within 48 hours',
        },
        {
          action: 'documentation',
          description: 'Gather required documents for your case type',
          priority: 'high',
        },
        {
          action: 'status_check',
          description: 'Verify your current immigration status',
          priority: 'medium',
        },
      ],
    };
  }

  async calculateWorkersComp(
    inputs: z.infer<typeof WorkersCompInputSchema>
  ): Promise<z.infer<typeof CalculatorResultSchema>> {
    const validatedInputs = WorkersCompInputSchema.parse(inputs);

    // NC Workers' Compensation rates (2024)
    const compensationRates: Record<string, number> = {
      temporary_total: 0.6667, // 2/3 of wages
      temporary_partial: 0.6667,
      permanent_partial: 0.6667,
      permanent_total: 0.6667,
      death: 0.6667, // Death benefits
    };

    const maxWeeklyBenefit = 1100; // NC maximum weekly benefit
    const avgWeeklyWage = validatedInputs.weeklyWage;

    const weeklyBenefit = Math.min(
      avgWeeklyWage * (compensationRates[validatedInputs.injuryType] || 0.6667),
      maxWeeklyBenefit
    );

    // Calculate total compensation
    let totalCompensation = 0;
    const duration = validatedInputs.weeksDisabled;

    switch (validatedInputs.injuryType) {
      case 'temporary_total':
      case 'temporary_partial':
        totalCompensation = weeklyBenefit * duration;
        break;
      case 'permanent_partial':
        // Calculate based on disability rating
        const bodyAsWholeWeeks = Math.round((validatedInputs.disabilityRating / 100) * 300); // Max 300 weeks
        totalCompensation = weeklyBenefit * bodyAsWholeWeeks;
        break;
      case 'permanent_total':
        // Lifetime benefits - estimate 20 years
        totalCompensation = weeklyBenefit * 52 * 20;
        break;
      case 'death':
        // Death benefits - typically 400 weeks
        totalCompensation = weeklyBenefit * 400;
        break;
    }

    const medicalBenefits = validatedInputs.medicalExpenses;
    const totalBenefits = totalCompensation + medicalBenefits;

    const recommendations = this.generateWorkersCompRecommendations(validatedInputs, totalBenefits);

    return {
      calculatorType: 'workers_compensation',
      inputs: validatedInputs,
      results: {
        weeklyBenefit,
        totalCompensation,
        medicalBenefits,
        totalBenefits,
        duration,
        maxMedicalBenefit: 'Unlimited for authorized treatment',
        vocationalRehab: validatedInputs.injuryType.includes('permanent')
          ? 'Available'
          : 'Not applicable',
      },
      recommendations,
      disclaimer:
        "Workers' compensation benefits are governed by state law and individual case circumstances. This calculator provides estimates based on North Carolina law.",
      timestamp: new Date(),
      estimatedAccuracy: 85,
      followUpActions: [
        {
          action: 'claim_filing',
          description: "File workers' compensation claim immediately if not done",
          priority: 'high',
          timeframe: 'within 30 days of injury',
        },
        {
          action: 'medical_treatment',
          description: 'Seek authorized medical treatment',
          priority: 'high',
        },
        {
          action: 'legal_consultation',
          description: "Consult with workers' compensation attorney",
          priority: 'medium',
        },
      ],
    };
  }

  async calculateCriminalDefense(
    inputs: z.infer<typeof CriminalDefenseInputSchema>
  ): Promise<z.infer<typeof CalculatorResultSchema>> {
    const validatedInputs = CriminalDefenseInputSchema.parse(inputs);

    // Sentence estimation based on NC guidelines
    let baseSentence = 0; // Months
    let probationLikelihood = 50; // Percentage

    // Base sentences by charge type and class
    if (validatedInputs.chargeType === 'felony') {
      const felonyBaseSentences = {
        A: 240, // 20+ years
        B1: 180, // 15+ years
        B2: 120, // 10+ years
        C: 84, // 7+ years
        D: 51, // 4+ years
        E: 24, // 2+ years
        F: 12, // 1+ year
        G: 8, // 8+ months
        H: 6, // 6+ months
        I: 4, // 4+ months
      };
      baseSentence =
        felonyBaseSentences[validatedInputs.chargeClass as keyof typeof felonyBaseSentences] || 12;
      probationLikelihood =
        validatedInputs.chargeClass === 'H' || validatedInputs.chargeClass === 'I' ? 70 : 30;
    } else {
      const misdemeanorBaseSentences = {
        A1: 5, // Up to 150 days
        '1': 4, // Up to 120 days
        '2': 2, // Up to 60 days
        '3': 1, // Up to 20 days
      };
      baseSentence =
        misdemeanorBaseSentences[
          validatedInputs.chargeClass as keyof typeof misdemeanorBaseSentences
        ] || 2;
      probationLikelihood = 80;
    }

    // Adjust for prior record
    const priorLevelMultipliers = [1, 1.2, 1.4, 1.6, 1.8, 2.0];
    const priorLevel = Math.min(validatedInputs.priorConvictions, 5);
    baseSentence *= priorLevelMultipliers[priorLevel] || 1;

    // Adjust for circumstances
    if (validatedInputs.circumstances === 'aggravating') {
      baseSentence *= 1.3;
      probationLikelihood -= 20;
    } else if (validatedInputs.circumstances === 'mitigating') {
      baseSentence *= 0.7;
      probationLikelihood += 20;
    }

    // Adjust for cooperation
    if (validatedInputs.cooperationLevel === 'full') {
      baseSentence *= 0.6;
      probationLikelihood += 25;
    } else if (validatedInputs.cooperationLevel === 'partial') {
      baseSentence *= 0.8;
      probationLikelihood += 10;
    }

    // Calculate cost estimates
    const costEstimates = validatedInputs.publicDefender
      ? {
          attorney: 0,
          court: 500,
          total: 500,
        }
      : {
          attorney: validatedInputs.chargeType === 'felony' ? 8000 : 3000,
          court: 500,
          total: validatedInputs.chargeType === 'felony' ? 8500 : 3500,
        };

    const recommendations = this.generateCriminalDefenseRecommendations(
      validatedInputs,
      baseSentence
    );

    return {
      calculatorType: 'criminal_defense',
      inputs: validatedInputs,
      results: {
        estimatedSentenceMonths: Math.round(baseSentence),
        probationLikelihood,
        estimatedCosts: costEstimates,
        possibleOutcomes: [
          'Dismissal',
          'Deferred Prosecution',
          'Plea to Lesser Charge',
          'Probation',
          'Active Sentence',
        ],
        trialLikelihood: validatedInputs.evidenceStrength === 'weak' ? 70 : 20,
      },
      recommendations,
      disclaimer:
        'Criminal sentencing involves many variables and judicial discretion. This estimate is based on general guidelines and may not reflect actual outcomes.',
      timestamp: new Date(),
      estimatedAccuracy: 65,
      followUpActions: [
        {
          action: 'attorney_consultation',
          description: 'Meet with criminal defense attorney immediately',
          priority: 'high',
          timeframe: 'before next court date',
        },
        {
          action: 'evidence_preservation',
          description: 'Preserve evidence and witness information',
          priority: 'high',
        },
        {
          action: 'character_references',
          description: 'Gather character references and employment records',
          priority: 'medium',
        },
      ],
    };
  }

  async calculateFamilyLaw(
    inputs: z.infer<typeof FamilyLawInputSchema>
  ): Promise<z.infer<typeof CalculatorResultSchema>> {
    const validatedInputs = FamilyLawInputSchema.parse(inputs);

    let results = {};

    if (validatedInputs.calculationType === 'child_support') {
      results = this.calculateChildSupport(validatedInputs);
    } else if (validatedInputs.calculationType === 'spousal_support') {
      results = this.calculateSpousalSupport(validatedInputs);
    } else if (validatedInputs.calculationType === 'property_division') {
      results = this.calculatePropertyDivision(validatedInputs);
    }

    const recommendations = this.generateFamilyLawRecommendations(validatedInputs);

    return {
      calculatorType: 'family_law',
      inputs: validatedInputs,
      results,
      recommendations,
      disclaimer:
        'Family law calculations vary by jurisdiction and individual circumstances. These estimates are based on general guidelines.',
      timestamp: new Date(),
      estimatedAccuracy: 80,
      followUpActions: [
        {
          action: 'consultation',
          description: 'Schedule consultation with family law attorney',
          priority: 'high',
        },
        {
          action: 'financial_documentation',
          description: 'Gather complete financial records and tax returns',
          priority: 'high',
        },
        {
          action: 'mediation',
          description: 'Consider mediation for cost-effective resolution',
          priority: 'medium',
        },
      ],
    };
  }

  private calculateChildSupport(inputs: z.infer<typeof FamilyLawInputSchema>) {
    // NC Child Support Guidelines
    const combinedIncome = inputs.grossIncome1 + inputs.grossIncome2;
    const childrenCount = inputs.childrenCount;

    // Basic support obligation (simplified calculation)
    const supportPercentages = {
      1: 0.17,
      2: 0.25,
      3: 0.29,
      4: 0.31,
      5: 0.33,
    };

    const supportPercentage =
      supportPercentages[Math.min(childrenCount, 5) as keyof typeof supportPercentages] || 0.35;
    const basicSupport = combinedIncome * supportPercentage;

    // Allocate based on income shares
    const payorShare = inputs.grossIncome1 / combinedIncome;
    const monthlySupport = (basicSupport * payorShare) / 12;

    return {
      combinedIncome,
      basicSupportObligation: basicSupport,
      monthlyChildSupport: monthlySupport,
      annualSupport: monthlySupport * 12,
      payorIncomeShare: payorShare * 100,
    };
  }

  private calculateSpousalSupport(inputs: z.infer<typeof FamilyLawInputSchema>) {
    const incomeDifference = Math.abs(inputs.grossIncome1 - inputs.grossIncome2);
    const higherIncome = Math.max(inputs.grossIncome1, inputs.grossIncome2);
    const lowerIncome = Math.min(inputs.grossIncome1, inputs.grossIncome2);

    // Duration factors
    let durationMultiplier = 1;
    if (inputs.marriageDuration < 5) durationMultiplier = 0.5;
    else if (inputs.marriageDuration > 20) durationMultiplier = 1.5;

    // Estimated spousal support (30-40% of income difference)
    const monthlySpousalSupport = (incomeDifference * 0.35 * durationMultiplier) / 12;
    const supportDuration = Math.min(inputs.marriageDuration * 0.5, 10); // Max 10 years

    return {
      incomeDifference,
      recommendedMonthlySupport: monthlySpousalSupport,
      estimatedDurationYears: supportDuration,
      totalSupportAmount: monthlySpousalSupport * 12 * supportDuration,
      rehabilitativeSupport: inputs.marriageDuration < 10 ? 'Likely' : 'Possible',
    };
  }

  private calculatePropertyDivision(inputs: z.infer<typeof FamilyLawInputSchema>) {
    const netWorth = inputs.propertyValue - inputs.debt;
    const equitableShare = netWorth * 0.5; // 50/50 starting point

    return {
      totalProperty: inputs.propertyValue,
      totalDebt: inputs.debt,
      netMaritalEstate: netWorth,
      estimatedShare: equitableShare,
      distributionMethod: 'Equitable Distribution',
      factors: [
        'Length of marriage',
        'Income and earning capacity',
        'Age and health of parties',
        'Contributions to marriage',
      ],
    };
  }

  // Recommendation generators
  private generatePersonalInjuryRecommendations(inputs: any, totalDamages: number): string[] {
    const recommendations: string[] = [];

    if (totalDamages > 100000) {
      recommendations.push(
        'Your case may warrant significant compensation. Consider hiring an experienced personal injury attorney.'
      );
    }

    if (inputs.permanentDisability) {
      recommendations.push(
        'Permanent disabilities often require expert medical testimony and life care planning.'
      );
    }

    if (inputs.faultPercentage > 25) {
      recommendations.push(
        'Comparative negligence may reduce your recovery. Legal representation is crucial.'
      );
    }

    recommendations.push(
      "Document all medical treatment and follow your doctor's orders completely."
    );

    return recommendations;
  }

  private generateImmigrationRecommendations(inputs: any, successProbability: number): string[] {
    const recommendations: string[] = [];

    if (successProbability < 60) {
      recommendations.push('Your case has complications that require expert legal guidance.');
    }

    if (inputs.criminalHistory) {
      recommendations.push(
        'Criminal history can significantly impact immigration cases. Consult an attorney immediately.'
      );
    }

    if (inputs.previousDenials) {
      recommendations.push(
        'Previous denials require careful analysis and strategic reapplication.'
      );
    }

    recommendations.push('Start gathering required documentation as early as possible.');

    return recommendations;
  }

  private generateWorkersCompRecommendations(inputs: any, totalBenefits: number): string[] {
    const recommendations: string[] = [];

    if (inputs.injuryType.includes('permanent')) {
      recommendations.push(
        'Permanent injuries require thorough medical evaluation and legal representation.'
      );
    }

    if (inputs.returnToWorkStatus === 'cannot_return') {
      recommendations.push('Consider vocational rehabilitation benefits and retraining programs.');
    }

    recommendations.push('Keep detailed records of all medical appointments and treatments.');

    return recommendations;
  }

  private generateCriminalDefenseRecommendations(inputs: any, baseSentence: number): string[] {
    const recommendations: string[] = [];

    if (inputs.chargeType === 'felony') {
      recommendations.push(
        'Felony charges carry serious consequences. Immediate legal representation is essential.'
      );
    }

    if (inputs.priorConvictions > 0) {
      recommendations.push(
        'Prior convictions will enhance your sentence. Expert defense is crucial.'
      );
    }

    if (inputs.evidenceStrength === 'strong') {
      recommendations.push('Consider plea negotiation to reduce charges and sentences.');
    }

    recommendations.push(
      'Exercise your right to remain silent until you have legal representation.'
    );

    return recommendations;
  }

  private generateFamilyLawRecommendations(inputs: any): string[] {
    const recommendations: string[] = [];

    if (inputs.childrenCount > 0) {
      recommendations.push('Focus on the best interests of the children in all decisions.');
    }

    if (inputs.marriageDuration > 10) {
      recommendations.push(
        'Long-term marriages often involve complex asset division and support issues.'
      );
    }

    recommendations.push('Consider mediation as a cost-effective alternative to litigation.');
    recommendations.push('Maintain detailed financial records throughout the process.');

    return recommendations;
  }

  private getImmigrationPriority(inputs: any): string {
    if (inputs.visaType === 'family' && inputs.relationshipToSponsor === 'spouse') {
      return 'Immediate Relative';
    }
    if (inputs.visaType === 'asylum') {
      return 'Protection Based';
    }
    return 'Preference Category';
  }

  private getImmigrationNextSteps(inputs: any): string[] {
    const steps: string[] = [];

    switch (inputs.visaType) {
      case 'family':
        steps.push('File Form I-130 Petition');
        steps.push('Wait for approval');
        steps.push('Complete National Visa Center process');
        break;
      case 'employment':
        steps.push('Obtain labor certification');
        steps.push('File Form I-140 Petition');
        steps.push('Apply for adjustment of status');
        break;
      case 'asylum':
        steps.push('File Form I-589 within one year');
        steps.push('Attend asylum interview');
        steps.push('Appear at immigration court if necessary');
        break;
    }

    return steps;
  }

  // Store calculation results for analytics
  async storeCalculationResult(result: z.infer<typeof CalculatorResultSchema>): Promise<void> {
    try {
      // Store in database for analytics and lead tracking
      logger.info('Calculator result generated', {
        type: result.calculatorType,
        timestamp: result.timestamp.toISOString(),
        accuracy: result.estimatedAccuracy,
      });
    } catch (error) {
      logger.error('Failed to store calculation result', { error: String(error) });
    }
  }
}

export const legalCalculatorEngine = new LegalCalculatorEngine();
