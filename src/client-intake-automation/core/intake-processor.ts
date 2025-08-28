/**
 * Intake Processor - Lead Scoring & Qualification
 * Scores leads from 0-100 based on multiple factors
 */

import { apiLogger } from '@/lib/safe-logger';

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  caseType: string;
  message: string;
  preferredContact?: string;
  location?: string;
  language?: string;
}

export interface ScoredLead extends LeadData {
  score: number;
  qualification: 'HOT' | 'WARM' | 'COLD';
  factors: {
    urgency: number;
    caseValue: number;
    completeness: number;
    engagement: number;
    timing: number;
  };
  estimatedValue: number;
  responseTime: string;
}

export class IntakeProcessor {
  /**
   * Process and score a lead based on multiple factors
   */
  async processLead(data: LeadData): Promise<ScoredLead> {
    const factors = {
      urgency: this.scoreUrgency(data.message, data.caseType),
      caseValue: this.scoreCaseValue(data.caseType),
      completeness: this.scoreCompleteness(data),
      engagement: this.scoreEngagement(data.message),
      timing: this.scoreTiming()
    };

    // Calculate weighted score
    const score = Math.round(
      (factors.urgency * 0.25) +
      (factors.caseValue * 0.30) +
      (factors.completeness * 0.15) +
      (factors.engagement * 0.20) +
      (factors.timing * 0.10)
    );

    // Determine qualification level
    const qualification = this.getQualification(score, factors);
    
    // Estimate case value
    const estimatedValue = this.estimateCaseValue(data.caseType, factors);
    
    // Determine response time
    const responseTime = this.getResponseTime(qualification);

    const scoredLead: ScoredLead = {
      ...data,
      score,
      qualification,
      factors,
      estimatedValue,
      responseTime
    };

    apiLogger.info('Lead scored', {
      email: data.email,
      score,
      qualification,
      caseType: data.caseType
    });

    return scoredLead;
  }

  /**
   * Score urgency based on keywords in message
   */
  private scoreUrgency(message: string, caseType: string): number {
    const urgentKeywords = [
      'urgent', 'emergency', 'immediately', 'asap', 'today',
      'arrested', 'jail', 'accident', 'injured', 'hospital',
      'court date', 'deadline', 'eviction', 'foreclosure'
    ];

    const veryUrgentKeywords = [
      'dui arrest', 'criminal charges', 'serious injury',
      'wrongful death', 'medical emergency', 'detained'
    ];

    const messageLower = message.toLowerCase();
    
    // Check for very urgent keywords
    for (const keyword of veryUrgentKeywords) {
      if (messageLower.includes(keyword)) {
        return 100;
      }
    }

    // Check for urgent keywords
    let urgencyScore = 50; // Base score
    for (const keyword of urgentKeywords) {
      if (messageLower.includes(keyword)) {
        urgencyScore = Math.min(urgencyScore + 15, 95);
      }
    }

    // Case type urgency modifiers
    const urgentCaseTypes = ['DUI Defense', 'Criminal Defense', 'Personal Injury'];
    if (urgentCaseTypes.includes(caseType)) {
      urgencyScore = Math.min(urgencyScore + 20, 100);
    }

    return urgencyScore;
  }

  /**
   * Score based on case type value
   */
  private scoreCaseValue(caseType: string): number {
    const caseValues: Record<string, number> = {
      'Personal Injury': 90,
      'Medical Malpractice': 95,
      'Product Liability': 85,
      'Wrongful Death': 100,
      'Criminal Defense': 80,
      'DUI Defense': 75,
      'Family Law': 70,
      'Immigration Law': 65,
      'Employment Law': 75,
      'Estate Planning': 60,
      'Real Estate Law': 65,
      'Business Law': 70,
      'Traffic Violations': 40,
      'General Inquiry': 30
    };

    return caseValues[caseType] || 50;
  }

  /**
   * Score based on form completeness
   */
  private scoreCompleteness(data: LeadData): number {
    let score = 40; // Base score for required fields
    
    if (data.phone) score += 20;
    if (data.preferredContact) score += 10;
    if (data.location) score += 10;
    if (data.message.length > 100) score += 10;
    if (data.message.length > 300) score += 10;
    
    return Math.min(score, 100);
  }

  /**
   * Score engagement based on message quality
   */
  private scoreEngagement(message: string): number {
    let score = 30; // Base score
    
    // Message length
    if (message.length > 50) score += 10;
    if (message.length > 150) score += 15;
    if (message.length > 300) score += 15;
    
    // Specific details mentioned
    const detailKeywords = [
      'when', 'where', 'how', 'insurance', 'police',
      'doctor', 'hospital', 'witness', 'evidence'
    ];
    
    const messageLower = message.toLowerCase();
    for (const keyword of detailKeywords) {
      if (messageLower.includes(keyword)) {
        score = Math.min(score + 5, 90);
      }
    }
    
    // Question marks indicate engagement
    const questionCount = (message.match(/\?/g) || []).length;
    if (questionCount > 0) score += Math.min(questionCount * 5, 10);
    
    return Math.min(score, 100);
  }

  /**
   * Score based on time of submission
   */
  private scoreTiming(): number {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    // Business hours (9 AM - 6 PM)
    if (hour >= 9 && hour < 18) {
      // Weekday business hours
      if (day >= 1 && day <= 5) {
        return 100;
      }
      // Weekend business hours
      return 70;
    }
    
    // After hours but reasonable (6 PM - 10 PM)
    if (hour >= 18 && hour < 22) {
      return 80;
    }
    
    // Late night (10 PM - 2 AM) - might be urgent
    if (hour >= 22 || hour < 2) {
      return 85;
    }
    
    // Early morning (2 AM - 9 AM)
    return 60;
  }

  /**
   * Determine qualification based on score and factors
   */
  private getQualification(
    score: number, 
    factors: typeof ScoredLead.prototype.factors
  ): 'HOT' | 'WARM' | 'COLD' {
    // Override for very urgent cases
    if (factors.urgency >= 90 && score >= 60) {
      return 'HOT';
    }
    
    // High value cases with good scores
    if (factors.caseValue >= 85 && score >= 70) {
      return 'HOT';
    }
    
    // Standard scoring thresholds
    if (score >= 75) return 'HOT';
    if (score >= 50) return 'WARM';
    return 'COLD';
  }

  /**
   * Estimate potential case value
   */
  private estimateCaseValue(caseType: string, factors: any): number {
    const baseValues: Record<string, number> = {
      'Personal Injury': 50000,
      'Medical Malpractice': 100000,
      'Product Liability': 75000,
      'Wrongful Death': 250000,
      'Criminal Defense': 15000,
      'DUI Defense': 5000,
      'Family Law': 10000,
      'Immigration Law': 5000,
      'Employment Law': 25000,
      'Estate Planning': 3000,
      'Real Estate Law': 10000,
      'Business Law': 15000,
      'Traffic Violations': 1000,
      'General Inquiry': 0
    };

    const baseValue = baseValues[caseType] || 5000;
    
    // Adjust based on urgency and engagement
    let multiplier = 1;
    if (factors.urgency >= 80) multiplier *= 1.2;
    if (factors.engagement >= 70) multiplier *= 1.1;
    
    return Math.round(baseValue * multiplier);
  }

  /**
   * Determine response time based on qualification
   */
  private getResponseTime(qualification: 'HOT' | 'WARM' | 'COLD'): string {
    switch (qualification) {
      case 'HOT':
        return '15 minutes';
      case 'WARM':
        return '1 hour';
      case 'COLD':
        return '24 hours';
    }
  }
}
