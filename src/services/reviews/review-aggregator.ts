import { logger } from '@/lib/safe-logger';
import { cache } from '@/lib/cache';
import { googlePlacesService, GoogleReview } from './google-places-service';

export interface ExternalReview {
  id: string;
  author: string;
  authorImage?: string;
  authorUrl?: string;
  rating: number;
  text: string;
  date: string;
  source: 'google';
  sourceUrl?: string;
  location?: string;
}

export interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  sourceBreakdown: {
    google: number;
  };
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface AggregatedReviews {
  reviews: ExternalReview[];
  summary: ReviewSummary;
  lastUpdated: string;
}

export class ReviewAggregatorService {
  private cacheKey = 'vasquez-law-external-reviews';
  private cacheTTL = 3600; // 1 hour in seconds

  /**
   * Transform Google review to standardized format
   */
  private transformGoogleReview(review: GoogleReview, location?: string): ExternalReview {
    return {
      id: `google-${review.time}-${review.author_name.replace(/\s+/g, '-')}`,
      author: review.author_name,
      authorImage: review.profile_photo_url,
      authorUrl: review.author_url,
      rating: review.rating,
      text: review.text,
      date: new Date(review.time * 1000).toISOString(),
      source: 'google',
      location,
    };
  }

  /**
   * Calculate review summary statistics
   */
  private calculateSummary(reviews: ExternalReview[]): ReviewSummary {
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;

    const sourceBreakdown = reviews.reduce(
      (acc, review) => {
        acc[review.source]++;
        return acc;
      },
      { google: 0 }
    );

    const ratingDistribution = reviews.reduce(
      (acc, review) => {
        const rating = Math.round(review.rating) as 1 | 2 | 3 | 4 | 5;
        acc[rating]++;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      sourceBreakdown,
      ratingDistribution,
    };
  }

  /**
   * Fetch all external reviews from Google and Yelp
   */
  async fetchAllReviews(useCache: boolean = true): Promise<AggregatedReviews> {
    // Try to get from cache first
    if (useCache) {
      try {
        const cached = (await cache.get(this.cacheKey)) as AggregatedReviews | null;
        if (cached) {
          logger.info('Returning cached external reviews');
          return cached;
        }
      } catch (error) {
        logger.warn('Failed to get cached reviews', { error });
      }
    }

    logger.info('Fetching fresh external reviews from APIs');

    const allReviews: ExternalReview[] = [];

    // Fetch Google reviews if available
    if (googlePlacesService.isAvailable()) {
      try {
        const googleReviews = await googlePlacesService.getVasquezLawFirmReviews();

        // Transform and add Google reviews
        Object.entries(googleReviews).forEach(([location, reviews]) => {
          reviews.forEach(review => {
            allReviews.push(this.transformGoogleReview(review, location));
          });
        });

        logger.info(`Fetched ${allReviews.length} Google reviews across all locations`);
      } catch (error) {
        logger.error('Failed to fetch Google reviews', { error });
      }
    } else {
      logger.warn('Google Places API not available');
    }

    // Sort reviews by date (newest first)
    allReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Calculate summary
    const summary = this.calculateSummary(allReviews);

    const result: AggregatedReviews = {
      reviews: allReviews,
      summary,
      lastUpdated: new Date().toISOString(),
    };

    // Cache the result
    try {
      await cache.set(this.cacheKey, result, this.cacheTTL);
      logger.info('Cached external reviews for 1 hour');
    } catch (error) {
      logger.warn('Failed to cache reviews', { error });
    }

    return result;
  }

  /**
   * Get reviews with pagination
   */
  async getReviews(
    page: number = 1,
    limit: number = 10,
    source?: 'google'
  ): Promise<{
    reviews: ExternalReview[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    summary: ReviewSummary;
  }> {
    const aggregated = await this.fetchAllReviews();

    // Filter by source if specified
    const filteredReviews = source
      ? aggregated.reviews.filter(review => review.source === source)
      : aggregated.reviews;

    // Calculate pagination
    const total = filteredReviews.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Get page of reviews
    const reviews = filteredReviews.slice(startIndex, endIndex);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
      summary: aggregated.summary,
    };
  }

  /**
   * Get recent reviews (last 30 days)
   */
  async getRecentReviews(days: number = 30): Promise<ExternalReview[]> {
    const aggregated = await this.fetchAllReviews();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return aggregated.reviews.filter(review => new Date(review.date) >= cutoffDate);
  }

  /**
   * Force refresh reviews (bypass cache)
   */
  async refreshReviews(): Promise<AggregatedReviews> {
    // Clear cache first
    try {
      await cache.delete(this.cacheKey);
    } catch (error) {
      logger.warn('Failed to clear review cache', { error });
    }

    return this.fetchAllReviews(false);
  }

  /**
   * Get service availability status
   */
  getServiceStatus(): {
    google: boolean;
    anyAvailable: boolean;
  } {
    const google = googlePlacesService.isAvailable();

    return {
      google,
      anyAvailable: google,
    };
  }
}

export const reviewAggregator = new ReviewAggregatorService();
