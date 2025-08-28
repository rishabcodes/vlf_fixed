/**
 * Lead Router - Intelligent lead assignment based on expertise and availability
 */

import { ScoredLead } from './intake-processor';
import { apiLogger } from '@/lib/safe-logger';

export interface RoutingDecision {
  assignedTeam: string;
  assignedUserId?: string;
  priority: 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW';
  reason: string;
  estimatedResponseTime: string;
  alternativeTeams: string[];
}

interface TeamMember {
  id: string;
  name: string;
  specialties: string[];
  languages: string[];
  currentLoad: number;
  maxLoad: number;
  availability: 'available' | 'busy' | 'offline';
}

export class LeadRouter {
  // Mock team data - in production, this would come from database
  private teams: Record<string, TeamMember[]> = {
    'Personal Injury': [
      {
        id: 'pi-attorney-1',
        name: 'Sarah Johnson',
        specialties: ['Personal Injury', 'Medical Malpractice', 'Wrongful Death'],
        languages: ['en', 'es'],
        currentLoad: 12,
        maxLoad: 20,
        availability: 'available'
      },
      {
        id: 'pi-attorney-2',
        name: 'Michael Chen',
        specialties: ['Personal Injury', 'Product Liability'],
        languages: ['en'],
        currentLoad: 18,
        maxLoad: 20,
        availability: 'available'
      }
    ],
    'Criminal Defense': [
      {
        id: 'cd-attorney-1',
        name: 'Robert Martinez',
        specialties: ['Criminal Defense', 'DUI Defense', 'Traffic Violations'],
        languages: ['en', 'es'],
        currentLoad: 8,
        maxLoad: 15,
        availability: 'available'
      }
    ],
    'Family Law': [
      {
        id: 'fl-attorney-1',
        name: 'Jennifer Adams',
        specialties: ['Family Law', 'Immigration Law'],
        languages: ['en'],
        currentLoad: 10,
        maxLoad: 15,
        availability: 'available'
      }
    ],
    'Business Law': [
      {
        id: 'bl-attorney-1',
        name: 'David Thompson',
        specialties: ['Business Law', 'Real Estate Law', 'Estate Planning'],
        languages: ['en'],
        currentLoad: 5,
        maxLoad: 12,
        availability: 'available'
      }
    ]
  };

  /**
   * Route a lead to the appropriate team and member
   */
  async routeLead(lead: ScoredLead): Promise<RoutingDecision> {
    // Determine primary team based on case type
    const primaryTeam = this.getTeamForCaseType(lead.caseType);
    
    // Find best available team member
    const teamMember = this.findBestTeamMember(
      primaryTeam,
      lead.caseType,
      lead.language || 'en',
      lead.qualification
    );

    // Determine priority
    const priority = this.determinePriority(lead);
    
    // Get alternative teams
    const alternativeTeams = this.getAlternativeTeams(lead.caseType);
    
    // Build routing decision
    const decision: RoutingDecision = {
      assignedTeam: primaryTeam,
      assignedUserId: teamMember?.id,
      priority,
      reason: this.getRoutingReason(lead, primaryTeam, teamMember),
      estimatedResponseTime: this.getEstimatedResponseTime(lead.qualification, priority),
      alternativeTeams
    };

    apiLogger.info('Lead routed', {
      email: lead.email,
      team: decision.assignedTeam,
      member: teamMember?.name,
      priority: decision.priority,
      caseType: lead.caseType
    });

    return decision;
  }

  /**
   * Map case type to team
   */
  private getTeamForCaseType(caseType: string): string {
    const caseTeamMap: Record<string, string> = {
      'Personal Injury': 'Personal Injury',
      'Medical Malpractice': 'Personal Injury',
      'Product Liability': 'Personal Injury',
      'Wrongful Death': 'Personal Injury',
      'Criminal Defense': 'Criminal Defense',
      'DUI Defense': 'Criminal Defense',
      'Traffic Violations': 'Criminal Defense',
      'Family Law': 'Family Law',
      'Immigration Law': 'Family Law',
      'Employment Law': 'Business Law',
      'Estate Planning': 'Business Law',
      'Real Estate Law': 'Business Law',
      'Business Law': 'Business Law',
      'General Inquiry': 'Personal Injury' // Default to PI team
    };

    return caseTeamMap[caseType] || 'Personal Injury';
  }

  /**
   * Find the best available team member
   */
  private findBestTeamMember(
    teamName: string,
    caseType: string,
    language: string,
    qualification: 'HOT' | 'WARM' | 'COLD'
  ): TeamMember | undefined {
    const team = this.teams[teamName] || [];
    
    if (team.length === 0) {
      return undefined;
    }

    // Filter available members
    let availableMembers = team.filter(m => 
      m.availability === 'available' && 
      m.currentLoad < m.maxLoad
    );

    // If HOT lead and no one available, include busy members
    if (qualification === 'HOT' && availableMembers.length === 0) {
      availableMembers = team.filter(m => 
        m.availability !== 'offline' && 
        m.currentLoad < m.maxLoad
      );
    }

    if (availableMembers.length === 0) {
      // Return least loaded member even if at capacity
      return team.reduce((prev, curr) => 
        (curr.currentLoad / curr.maxLoad) < (prev.currentLoad / prev.maxLoad) ? curr : prev
      );
    }

    // Score each member
    const scoredMembers = availableMembers.map(member => {
      let score = 0;
      
      // Specialty match (40 points)
      if (member.specialties.includes(caseType)) {
        score += 40;
      }
      
      // Language match (30 points)
      if (member.languages.includes(language)) {
        score += 30;
      }
      
      // Load balance (30 points - inverse of load percentage)
      const loadPercentage = member.currentLoad / member.maxLoad;
      score += (1 - loadPercentage) * 30;
      
      return { member, score };
    });

    // Sort by score and return best match
    scoredMembers.sort((a, b) => b.score - a.score);
    return scoredMembers[0]?.member;
  }

  /**
   * Determine priority based on lead score and qualification
   */
  private determinePriority(lead: ScoredLead): 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW' {
    // Urgent cases
    if (lead.factors.urgency >= 90 || lead.qualification === 'HOT') {
      return 'URGENT';
    }
    
    // High priority
    if (lead.score >= 70 || lead.factors.caseValue >= 85) {
      return 'HIGH';
    }
    
    // Low priority
    if (lead.score < 40 || lead.qualification === 'COLD') {
      return 'LOW';
    }
    
    // Normal priority
    return 'NORMAL';
  }

  /**
   * Get alternative teams that could handle the case
   */
  private getAlternativeTeams(caseType: string): string[] {
    const alternatives: Record<string, string[]> = {
      'Personal Injury': ['Criminal Defense'],
      'Criminal Defense': ['Personal Injury'],
      'Family Law': ['Business Law'],
      'Business Law': ['Family Law'],
      'Immigration Law': ['Family Law', 'Business Law'],
      'Employment Law': ['Business Law', 'Personal Injury']
    };

    return alternatives[caseType] || ['Personal Injury'];
  }

  /**
   * Generate routing reason
   */
  private getRoutingReason(
    lead: ScoredLead,
    team: string,
    member?: TeamMember
  ): string {
    const reasons = [];
    
    if (lead.qualification === 'HOT') {
      reasons.push('High-priority lead requiring immediate attention');
    }
    
    if (member) {
      if (member.specialties.includes(lead.caseType)) {
        reasons.push(`Specialist in ${lead.caseType}`);
      }
      
      if (lead.language && member.languages.includes(lead.language)) {
        reasons.push(`${lead.language === 'es' ? 'Spanish' : 'English'} speaker available`);
      }
      
      reasons.push(`Current capacity: ${Math.round((member.currentLoad / member.maxLoad) * 100)}%`);
    } else {
      reasons.push('No specific team member available - queued for team');
    }
    
    if (lead.factors.urgency >= 80) {
      reasons.push('Urgent case detected');
    }
    
    if (lead.factors.caseValue >= 80) {
      reasons.push('High-value case');
    }
    
    return reasons.join('. ');
  }

  /**
   * Get estimated response time based on qualification and priority
   */
  private getEstimatedResponseTime(
    qualification: 'HOT' | 'WARM' | 'COLD',
    priority: 'URGENT' | 'HIGH' | 'NORMAL' | 'LOW'
  ): string {
    if (priority === 'URGENT' || qualification === 'HOT') {
      return '15 minutes';
    }
    
    if (priority === 'HIGH') {
      return '30 minutes';
    }
    
    if (qualification === 'WARM') {
      return '1 hour';
    }
    
    if (priority === 'LOW' || qualification === 'COLD') {
      return '24 hours';
    }
    
    return '2 hours';
  }

  /**
   * Update team member load (would be called after assignment)
   */
  async updateMemberLoad(memberId: string, change: number): Promise<void> {
    // In production, this would update the database
    for (const team of Object.values(this.teams)) {
      const member = team.find(m => m.id === memberId);
      if (member) {
        member.currentLoad += change;
        apiLogger.info('Member load updated', {
          memberId,
          newLoad: member.currentLoad,
          maxLoad: member.maxLoad
        });
        break;
      }
    }
  }
}
