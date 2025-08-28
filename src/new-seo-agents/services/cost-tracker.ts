/**
 * Cost Tracker Service
 * Real-time API cost monitoring with budget alerts
 */

import { logger } from '@/lib/safe-logger';

interface CostEntry {
  agent: string;
  task: string;
  cost: number;
  model?: string;
  tokens?: number;
  timestamp: Date;
}

interface DailyCost {
  date: string;
  total: number;
  byAgent: Record<string, number>;
  byModel: Record<string, number>;
  entries: number;
}

export class CostTracker {
  private static instance: CostTracker;
  private costs: CostEntry[] = [];
  private dailyCosts: Map<string, DailyCost> = new Map();
  private monthlyBudget: number = 500; // Default $500/month
  private dailyBudget: number = 17; // ~$500/30 days
  private alertThreshold: number = 0.8; // Alert at 80% of budget

  private modelCosts: Record<string, number> = {
    'gpt-3.5-turbo': 0.001,          // per 1K tokens
    'gpt-3.5-turbo-16k': 0.002,      // per 1K tokens
    'gpt-4-turbo-preview': 0.01,     // per 1K tokens
    'gpt-4': 0.03,                   // per 1K tokens
    'gpt-4-32k': 0.06,               // per 1K tokens
    'text-embedding-ada-002': 0.0001,// per 1K tokens
    'claude-3-opus': 0.015,          // per 1K tokens
    'claude-3-sonnet': 0.003,        // per 1K tokens
    'claude-3-haiku': 0.00025        // per 1K tokens
  };

  private constructor() {
    // Load budget from environment if available
    if (process.env.SEO_MONTHLY_BUDGET) {
      this.monthlyBudget = parseFloat(process.env.SEO_MONTHLY_BUDGET);
      this.dailyBudget = this.monthlyBudget / 30;
    }
  }

  static getInstance(): CostTracker {
    if (!CostTracker.instance) {
      CostTracker.instance = new CostTracker();
    }
    return CostTracker.instance;
  }

  /**
   * Track a cost entry
   */
  async track(entry: CostEntry): Promise<void> {
    this.costs.push(entry);
    
    // Update daily costs
    const dateKey = this.getDateKey(entry.timestamp);
    const dailyCost = this.dailyCosts.get(dateKey) || this.createDailyCost(dateKey);
    
    dailyCost.total += entry.cost;
    dailyCost.byAgent[entry.agent] = (dailyCost.byAgent[entry.agent] || 0) + entry.cost;
    if (entry.model) {
      dailyCost.byModel[entry.model] = (dailyCost.byModel[entry.model] || 0) + entry.cost;
    }
    dailyCost.entries++;
    
    this.dailyCosts.set(dateKey, dailyCost);
    
    // Check budget alerts
    await this.checkBudgetAlerts(dailyCost);
    
    // Keep only last 30 days of detailed costs
    this.pruneOldCosts();
  }

  /**
   * Calculate cost for a model and token count
   */
  calculateCost(model: string, tokens: number): number {
    const costPer1K = this.modelCosts[model] || 0.01; // Default to GPT-4 cost if unknown
    return (tokens / 1000) * costPer1K;
  }

  /**
   * Get cost for a specific agent
   */
  getAgentCost(agentName: string, days: number = 30): number {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    return this.costs
      .filter(c => c.agent === agentName && c.timestamp > since)
      .reduce((sum, c) => sum + c.cost, 0);
  }

  /**
   * Get today's cost
   */
  getTodayCost(): number {
    const today = this.getDateKey(new Date());
    const dailyCost = this.dailyCosts.get(today);
    return dailyCost ? dailyCost.total : 0;
  }

  /**
   * Get this month's cost
   */
  getMonthCost(): number {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    let total = 0;
    for (const [dateKey, cost] of this.dailyCosts.entries()) {
      const date = new Date(dateKey);
      if (date >= monthStart) {
        total += cost.total;
      }
    }
    
    return total;
  }

  /**
   * Get cost breakdown by model
   */
  getCostByModel(days: number = 7): Record<string, number> {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const breakdown: Record<string, number> = {};
    
    for (const [dateKey, dailyCost] of this.dailyCosts.entries()) {
      const date = new Date(dateKey);
      if (date >= since) {
        for (const [model, cost] of Object.entries(dailyCost.byModel)) {
          breakdown[model] = (breakdown[model] || 0) + cost;
        }
      }
    }
    
    return breakdown;
  }

  /**
   * Get cost breakdown by agent
   */
  getCostByAgent(days: number = 7): Record<string, number> {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const breakdown: Record<string, number> = {};
    
    for (const [dateKey, dailyCost] of this.dailyCosts.entries()) {
      const date = new Date(dateKey);
      if (date >= since) {
        for (const [agent, cost] of Object.entries(dailyCost.byAgent)) {
          breakdown[agent] = (breakdown[agent] || 0) + cost;
        }
      }
    }
    
    return breakdown;
  }

  /**
   * Check budget alerts
   */
  private async checkBudgetAlerts(dailyCost: DailyCost): Promise<void> {
    // Daily budget alert
    if (dailyCost.total > this.dailyBudget * this.alertThreshold) {
      const percentage = ((dailyCost.total / this.dailyBudget) * 100).toFixed(1);
      logger.warn(`[CostTracker] Daily budget alert! Used ${percentage}% of daily budget ($${dailyCost.total.toFixed(2)}/$${this.dailyBudget})`);
      
      if (dailyCost.total > this.dailyBudget) {
        logger.error(`[CostTracker] DAILY BUDGET EXCEEDED! $${dailyCost.total.toFixed(2)} > $${this.dailyBudget}`);
        // Could trigger automatic throttling here
      }
    }
    
    // Monthly budget alert
    const monthCost = this.getMonthCost();
    if (monthCost > this.monthlyBudget * this.alertThreshold) {
      const percentage = ((monthCost / this.monthlyBudget) * 100).toFixed(1);
      logger.warn(`[CostTracker] Monthly budget alert! Used ${percentage}% of monthly budget ($${monthCost.toFixed(2)}/$${this.monthlyBudget})`);
      
      if (monthCost > this.monthlyBudget) {
        logger.error(`[CostTracker] MONTHLY BUDGET EXCEEDED! $${monthCost.toFixed(2)} > $${this.monthlyBudget}`);
      }
    }
  }

  /**
   * Get budget status
   */
  getBudgetStatus(): Record<string, any> {
    const todayCost = this.getTodayCost();
    const monthCost = this.getMonthCost();
    
    return {
      daily: {
        used: todayCost,
        budget: this.dailyBudget,
        remaining: Math.max(0, this.dailyBudget - todayCost),
        percentage: ((todayCost / this.dailyBudget) * 100).toFixed(1)
      },
      monthly: {
        used: monthCost,
        budget: this.monthlyBudget,
        remaining: Math.max(0, this.monthlyBudget - monthCost),
        percentage: ((monthCost / this.monthlyBudget) * 100).toFixed(1)
      },
      alerts: {
        dailyAlert: todayCost > this.dailyBudget * this.alertThreshold,
        dailyExceeded: todayCost > this.dailyBudget,
        monthlyAlert: monthCost > this.monthlyBudget * this.alertThreshold,
        monthlyExceeded: monthCost > this.monthlyBudget
        }
};
  }

  /**
   * Should throttle based on budget
   */
  shouldThrottle(): boolean {
    const status = this.getBudgetStatus();
    return status.alerts.dailyExceeded || status.alerts.monthlyExceeded;
  }

  /**
   * Get cost optimization recommendations
   */
  getRecommendations(): string[] {
    const recommendations: string[] = [];
    const modelCosts = this.getCostByModel(7);
    const agentCosts = this.getCostByAgent(7);
    
    // Check if using expensive models too much
    const gpt4Cost = (modelCosts['gpt-4'] || 0) + (modelCosts['gpt-4-32k'] || 0);
    const totalModelCost = Object.values(modelCosts).reduce((sum, c) => sum + c, 0);
    
    if (gpt4Cost > totalModelCost * 0.5) {
      recommendations.push(`Consider using GPT-3.5 more: GPT-4 is ${((gpt4Cost / totalModelCost) * 100).toFixed(1)}% of costs`);
    }
    
    // Find most expensive agent
    const topAgent = Object.entries(agentCosts).sort((a, b) => b[1] - a[1])[0];
    if (topAgent && topAgent[1] > totalModelCost * 0.4) {
      recommendations.push(`${topAgent[0]} is using ${((topAgent[1] / totalModelCost) * 100).toFixed(1)}% of budget - consider optimizing`);
    }
    
    // Cache recommendation
    const todayEntries = this.dailyCosts.get(this.getDateKey(new Date()))?.entries || 0;
    if (todayEntries > 100) {
      recommendations.push(`High API usage today (${todayEntries} calls) - ensure caching is working`);
    }
    
    return recommendations;
  }

  /**
   * Create daily cost entry
   */
  private createDailyCost(dateKey: string): DailyCost {
    return {
      date: dateKey,
      total: 0,
      byAgent: {},
      byModel: {},
      entries: 0
    };
  }

  /**
   * Get date key for grouping
   */
  private getDateKey(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Prune old detailed costs
   */
  private pruneOldCosts(): void {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    this.costs = this.costs.filter(c => c.timestamp > thirtyDaysAgo);
  }

  /**
   * Get detailed report
   */
  getReport(days: number = 7): Record<string, any> {
    return {
      summary: this.getBudgetStatus(),
      byModel: this.getCostByModel(days),
      byAgent: this.getCostByAgent(days),
      topExpenses: this.costs
        .filter(c => c.timestamp > new Date(Date.now() - days * 24 * 60 * 60 * 1000))
        .sort((a, b) => b.cost - a.cost)
        .slice(0, 10)
        .map(c => ({
          agent: c.agent,
          task: c.task,
          cost: c.cost.toFixed(4),
          model: c.model,
          timestamp: c.timestamp
        })),
      recommendations: this.getRecommendations()
    };
  }
}
