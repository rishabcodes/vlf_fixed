# New SEO Agents Architecture

## 3-Hub System

This folder contains the redesigned SEO agent system, consolidating 13+ redundant agents into 3 intelligent hubs.

## Structure

- **core/** - Base classes, orchestrator, and shared context
- **content-hub/** - All content generation and optimization
- **distribution-hub/** - Social media, GMB, and review management
- **intelligence-hub/** - Competitor analysis, trends, and metrics
- **services/** - Shared services (cache, cost tracker, rate limiter)
- **api/** - REST API endpoints

## Key Features

- 80% cost reduction through intelligent caching
- Smart model selection (GPT-3.5 for simple, GPT-4 for complex)
- Shared context between all hubs
- Real-time cost tracking
- Semantic similarity caching

## Implementation Status

⏳ Awaiting approval to begin implementation