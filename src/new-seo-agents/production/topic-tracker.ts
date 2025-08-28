/**
 * Topic Tracker - Prevents repetition and ensures variety
 * Tracks used topics and rotates through the bank
 */

import { getPrismaClient } from '@/lib/prisma';
import { TOPIC_BANK, LOCATIONS, formatTopic, getRandomLocation, TopicTemplate } from './topic-bank';
import { logger } from '@/lib/safe-logger';

export class TopicTracker {
  private prisma = getPrismaClient();
  
  /**
   * Get the next unique topic for blog generation
   * Checks last 30 posts to avoid repetition
   */
  async getNextUniqueTopic(): Promise<{
    topic: string;
    keywords: string[];
    practiceArea: string;
    contentType: string;
    location: string;
  }> {
    try {
      // Get last 30 blog posts to check for duplicates
      const recentPosts = await this.prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' },
        take: 30,
        select: {
          title: true,
          practiceArea: true
        }
      });
      
      const usedTitles = new Set(recentPosts.map(p => 
        p.title.toLowerCase().replace(/[^a-z0-9]/g, '')
      ));
      
      // Track which practice areas have been used recently
      const recentPracticeAreas = recentPosts.slice(0, 5).map(p => p.practiceArea);
      
      // Select practice area (avoid repeating the last 2)
      const practiceAreas = Object.keys(TOPIC_BANK);
      let selectedPracticeArea = this.selectPracticeArea(practiceAreas, recentPracticeAreas);
      
      // Get topics for this practice area
      const topicTemplates = TOPIC_BANK[selectedPracticeArea];
      
      // Shuffle topics to add randomness
      const shuffled = [...topicTemplates].sort(() => Math.random() - 0.5);
      
      // Find a topic that hasn't been used
      for (const template of shuffled) {
        const location = getRandomLocation();
        const formattedTopic = formatTopic(template.template, location);
        const normalized = formattedTopic.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Check if this topic (or similar) has been used
        let isDuplicate = false;
        for (const usedTitle of usedTitles) {
          // Check for similarity (if more than 50% of words match, consider duplicate)
          const similarity = this.calculateSimilarity(normalized, usedTitle);
          if (similarity > 0.5) {
            isDuplicate = true;
            break;
          }
        }
        
        if (!isDuplicate) {
          logger.info(`[TopicTracker] Selected unique topic: ${formattedTopic}`);
          return {
            topic: formattedTopic,
            keywords: template.keywords,
            practiceArea: selectedPracticeArea,
            contentType: template.contentType,
            location
          };
        }
      }
      
      // Fallback: If all topics seem used (unlikely with 125+ topics), 
      // pick random and add timestamp for uniqueness
      const fallbackTemplate = shuffled[0];
      const location = getRandomLocation();
      const fallbackTopic = formatTopic(fallbackTemplate.template, location) + 
                          ` - ${new Date().toLocaleDateString()} Update`;
      
      logger.warn('[TopicTracker] Using fallback topic with date suffix');
      return {
        topic: fallbackTopic,
        keywords: fallbackTemplate.keywords,
        practiceArea: selectedPracticeArea,
        contentType: fallbackTemplate.contentType,
        location
      };
      
    } catch (error) {
      logger.error('[TopicTracker] Error getting unique topic:', error);
      
      // Emergency fallback
      const practiceArea = 'immigration';
      const location = 'Charlotte';
      return {
        topic: `Legal Updates for ${location} - ${new Date().toLocaleDateString()}`,
        keywords: ['legal update', 'law firm', location.toLowerCase()],
        practiceArea,
        contentType: 'news-reaction',
        location
      };
    }
  }
  
  /**
   * Select practice area with variety
   */
  private selectPracticeArea(available: string[], recent: string[]): string {
    // Filter out practice areas used in last 2 posts
    const recentSet = new Set(recent.slice(0, 2));
    const preferred = available.filter(pa => !recentSet.has(pa));
    
    // If all have been used recently, pick randomly from all
    const pool = preferred.length > 0 ? preferred : available;
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  /**
   * Calculate similarity between two strings (simple word overlap)
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.split(/\s+/);
    const words2 = str2.split(/\s+/);
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    let overlap = 0;
    for (const word of set1) {
      if (set2.has(word) && word.length > 3) { // Ignore small words
        overlap++;
      }
    }
    
    return overlap / Math.max(set1.size, set2.size);
  }
  
  /**
   * Get content generation prompt based on content type
   */
  getContentPrompt(contentType: string): string {
    const prompts = {
      'guide': 'Write a comprehensive guide that covers all aspects of the topic. Include step-by-step instructions where applicable.',
      'news-reaction': 'Write a news analysis article reacting to recent developments. Include context and implications for readers.',
      'how-to': 'Write a practical how-to article with clear, actionable steps. Include tips and common mistakes to avoid.',
      'faq': 'Write an FAQ-style article answering the most common questions about this topic. Use Q&A format.',
      'case-study': 'Write a case study article describing a real-world scenario (anonymized) and lessons learned.',
      'comparison': 'Write a comparison article analyzing different options, approaches, or choices. Include pros and cons.',
      'checklist': 'Write a checklist-style article with actionable items readers can follow. Make it practical and downloadable.'
    };
    
    return prompts[contentType] || prompts['guide'];
  }
}

// Export singleton instance
export const topicTracker = new TopicTracker();