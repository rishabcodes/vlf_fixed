#!/usr/bin/env ts-node

/**
 * Demo script for AI Overview Optimization
 *
 * This script demonstrates how to use the new AI Overview optimization features
 * to create content that performs well in Google's AI Overview.
 */

import { SEOBlogGenerationAgent } from '../src/lib/crewai/agents/seo-blog-generation-agent';
import { AIOverviewOptimizationAgent } from '../src/lib/crewai/agents/ai-overview-optimization-agent';
import { logger } from '../src/lib/logger';

async function demonstrateAIOverviewOptimization() {
  logger.info('🤖 Starting AI Overview Optimization Demo');

  const seoAgent = new SEOBlogGenerationAgent();
  const aiOverviewAgent = new AIOverviewOptimizationAgent();

  // Example 1: Generate blog content with AI Overview optimization
  logger.info('📝 Generating blog content with AI Overview optimization...');

  const blogRequest = {
    practiceArea: 'Immigration Law',
    targetKeywords: [
      'family based immigration',
      'green card through marriage',
      'spouse visa process',
      'I-130 petition',
    ],
    contentType: 'legal_guide' as const,
    targetAudience: 'potential_clients' as const,
    tone: 'educational' as const,
    wordCount: 2000,
    language: 'en' as const,
    location: 'North Carolina',
    urgency: 'medium' as const,
    includeCallToAction: true,
    competitorAnalysis: true,
    aiOverviewOptimization: true, // Enable AI Overview optimization
    voiceSearchFocus: true, // Enable voice search optimization
    trendingTopics: [
      'marriage green card timeline 2024',
      'immigration processing delays',
      'conditional green card removal',
    ],
  };

  try {
    const blogResult = await seoAgent.generateSEOBlog(blogRequest);

    logger.info('✅ Blog content generated successfully!', {
      title: blogResult.title,
      wordCount: blogResult.wordCount,
      seoScore: blogResult.seoScore,
      aiOverviewScore: blogResult.aiOverviewScore,
      readabilityScore: blogResult.readabilityScore,
    });

    // Display AI Overview optimization results
    if (blogResult.aiOverviewOptimization) {
      logger.info('🎯 AI Overview Optimization Results:', {
        readinessScore: blogResult.aiOverviewOptimization.aiOverviewMetrics.readinessScore,
        answerQuality: blogResult.aiOverviewOptimization.aiOverviewMetrics.answerQuality,
        structureScore: blogResult.aiOverviewOptimization.aiOverviewMetrics.structureScore,
        authoritySignals: blogResult.aiOverviewOptimization.aiOverviewMetrics.authoritySignals,
        faqQuestions: blogResult.aiOverviewOptimization.faqSection.questions.length,
        voiceSearchOptimizations:
          blogResult.aiOverviewOptimization.voiceSearchOptimizations.naturalLanguageQueries.length,
      });

      // Show some example FAQ questions
      logger.info('❓ Generated FAQ Questions (AI Overview Ready):');
      blogResult.aiOverviewOptimization.faqSection.questions.slice(0, 3).forEach((faq, index) => {
        logger.info(`${index + 1}. ${faq.question}`);
        logger.info(`   Answer (${faq.answerLength} words): ${faq.answer.substring(0, 100)}...`);
      });

      // Show voice search optimizations
      logger.info('🗣️ Voice Search Optimizations:');
      blogResult.aiOverviewOptimization.voiceSearchOptimizations.naturalLanguageQueries
        .slice(0, 3)
        .forEach((query, index) => {
          logger.info(`${index + 1}. "${query}"`);
        });
    }
  } catch (error) {
    logger.error('❌ Failed to generate blog content:', error);
  }

  // Example 2: Optimize existing content for AI Overview
  logger.info('\n🔧 Optimizing existing content for AI Overview...');

  const existingContent = `
# Family-Based Immigration in North Carolina

Family-based immigration allows U.S. citizens and permanent residents to petition for certain family members to come to or remain in the United States. This process involves filing specific forms with USCIS and following established procedures.

## Eligibility Requirements

To petition for a family member, you must be either a U.S. citizen or a lawful permanent resident. The relationship to the beneficiary determines the category and priority of the petition.

## Required Documentation

The petitioner must provide evidence of the qualifying relationship, such as marriage certificates, birth certificates, or adoption papers. Additional documentation may be required depending on the specific case.

## Processing Times

Processing times vary depending on the type of petition and the beneficiary's country of origin. Current processing times can be found on the USCIS website.
  `;

  const optimizationRequest = {
    content: existingContent,
    practiceArea: 'Immigration Law',
    targetKeywords: ['family based immigration', 'I-130 petition', 'green card family'],
    contentType: 'legal_guide' as const,
    targetAudience: 'potential_clients' as const,
    location: 'North Carolina',
    voiceSearchFocus: true,
    competitorAnalysis: false,
  };

  try {
    const optimization = await aiOverviewAgent.optimizeForAIOverview(optimizationRequest);

    logger.info('✅ Content optimization completed!', {
      readinessScore: optimization.aiOverviewMetrics.readinessScore,
      answerQuality: optimization.aiOverviewMetrics.answerQuality,
      structureScore: optimization.aiOverviewMetrics.structureScore,
      authoritySignals: optimization.aiOverviewMetrics.authoritySignals,
    });

    logger.info('📊 Optimization Results:');
    logger.info(`- FAQ Questions Generated: ${optimization.faqSection.questions.length}`);
    logger.info(
      `- Voice Search Queries: ${optimization.voiceSearchOptimizations.naturalLanguageQueries.length}`
    );
    logger.info(
      `- Schema Markup Types: ${Object.keys(optimization.schemaMarkup).filter(key => optimization.schemaMarkup[key as keyof typeof optimization.schemaMarkup]).length}`
    );

    // Show example optimized FAQ
    if (optimization.faqSection.questions.length > 0) {
      const exampleFAQ = optimization.faqSection.questions[0];
      logger.info('\n📋 Example AI Overview-Ready FAQ:');
      logger.info(`Q: ${exampleFAQ.question}`);
      logger.info(`A: ${exampleFAQ.answer}`);
      logger.info(`Voice Search Optimized: ${exampleFAQ.voiceSearchOptimized ? '✅' : '❌'}`);
      logger.info(`Answer Length: ${exampleFAQ.answerLength} words (optimal: 40-60)`);
    }

    // Show schema markup example
    logger.info('\n🏗️ Generated Schema Markup:');
    logger.info(
      'FAQ Schema:',
      JSON.stringify(optimization.faqSection.schema, null, 2).substring(0, 200) + '...'
    );
  } catch (error) {
    logger.error('❌ Failed to optimize content:', error);
  }

  // Example 3: Practice area specific optimization examples
  logger.info('\n🏛️ Practice Area Specific Examples:');

  const practiceAreaExamples = [
    {
      practiceArea: 'Personal Injury',
      keywords: ['car accident lawyer', 'personal injury claim', 'accident compensation'],
      sampleQuery: 'What should I do immediately after a car accident in North Carolina?',
    },
    {
      practiceArea: 'Criminal Defense',
      keywords: ['DUI defense', 'criminal charges', 'arrest rights'],
      sampleQuery: 'What are my rights when arrested for DUI in North Carolina?',
    },
    {
      practiceArea: 'Family Law',
      keywords: ['divorce process', 'child custody', 'alimony'],
      sampleQuery: 'How long does the divorce process take in North Carolina?',
    },
  ];

  for (const example of practiceAreaExamples) {
    logger.info(`\n📚 ${example.practiceArea} Example:`);
    logger.info(`Target Keywords: ${example.keywords.join(', ')}`);
    logger.info(`Sample Voice Query: "${example.sampleQuery}"`);

    // Generate quick optimization for this practice area
    const quickContent = `
# ${example.practiceArea} Guide

This guide covers the essential information about ${example.practiceArea.toLowerCase()} in North Carolina.

## Overview
${example.practiceArea} cases require specific legal procedures and documentation.

## Process
The legal process involves several steps that must be followed carefully.
    `;

    try {
      const quickOptimization = await aiOverviewAgent.optimizeForAIOverview({
        content: quickContent,
        practiceArea: example.practiceArea,
        targetKeywords: example.keywords,
        contentType: 'legal_guide',
        targetAudience: 'potential_clients',
        location: 'North Carolina',
        voiceSearchFocus: true,
        competitorAnalysis: false,
      });

      logger.info(`AI Overview Score: ${quickOptimization.aiOverviewMetrics.readinessScore}/100`);
      logger.info(`Generated FAQs: ${quickOptimization.faqSection.questions.length}`);

      if (quickOptimization.faqSection.questions.length > 0) {
        logger.info(`Sample FAQ: "${quickOptimization.faqSection.questions[0].question}"`);
      }
    } catch (error) {
      logger.warn(`⚠️ Quick optimization failed for ${example.practiceArea}:`, error);
    }
  }

  logger.info('\n🎉 AI Overview Optimization Demo completed!');
  logger.info('\n💡 Key Takeaways:');
  logger.info('1. AI Overview optimization focuses on direct, authoritative answers');
  logger.info('2. FAQ sections with 40-60 word answers perform best');
  logger.info('3. Voice search optimization requires conversational language');
  logger.info('4. Schema markup is essential for AI understanding');
  logger.info('5. Local optimization improves "near me" query performance');
  logger.info('6. Authority signals (citations, forms) boost credibility');
}

// Example usage functions
async function demonstrateVoiceSearchOptimization() {
  logger.info('\n🗣️ Voice Search Optimization Examples:');

  const voiceSearchQueries = [
    'What do I do if I get in a car accident in Charlotte?',
    'How much does it cost to get a divorce in North Carolina?',
    'Can I get a green card if I marry a US citizen?',
    'What happens if I get arrested for DUI in Raleigh?',
    'How long does it take to become a US citizen?',
  ];

  voiceSearchQueries.forEach((query, index) => {
    logger.info(`${index + 1}. "${query}"`);

    // Analyze query characteristics
    const isQuestionBased = query.includes('?');
    const isConversational = query.includes('I') || query.includes('me');
    const isLocal =
      query.includes('Charlotte') || query.includes('Raleigh') || query.includes('North Carolina');

    logger.info(`   - Question-based: ${isQuestionBased ? '✅' : '❌'}`);
    logger.info(`   - Conversational: ${isConversational ? '✅' : '❌'}`);
    logger.info(`   - Local intent: ${isLocal ? '✅' : '❌'}`);
  });
}

async function demonstrateSchemaMarkupGeneration() {
  logger.info('\n🏗️ Schema Markup Generation Examples:');

  const schemaExamples = [
    {
      type: 'FAQ Schema',
      description: 'Optimizes FAQ content for AI Overview selection',
      benefit: 'Increases chances of appearing in AI-generated answers',
    },
    {
      type: 'How-To Schema',
      description: 'Structures step-by-step legal processes',
      benefit: 'Perfect for voice search "how to" queries',
    },
    {
      type: 'LegalService Schema',
      description: 'Identifies the firm as a legal service provider',
      benefit: 'Improves local search and authority signals',
    },
    {
      type: 'Local Business Schema',
      description: 'Provides location and contact information',
      benefit: 'Essential for "near me" searches',
    },
  ];

  schemaExamples.forEach((schema, index) => {
    logger.info(`${index + 1}. ${schema.type}`);
    logger.info(`   Description: ${schema.description}`);
    logger.info(`   Benefit: ${schema.benefit}`);
  });
}

// Run the demonstration
if (require.main === module) {
  Promise.all([
    demonstrateAIOverviewOptimization(),
    demonstrateVoiceSearchOptimization(),
    demonstrateSchemaMarkupGeneration(),
  ]).catch(error => {
    logger.error('Demo failed:', error);
    process.exit(1);
  });
}

export {
  demonstrateAIOverviewOptimization,
  demonstrateVoiceSearchOptimization,
  demonstrateSchemaMarkupGeneration,
};
