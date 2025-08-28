import { logger } from '@/lib/safe-logger';

export interface YelpReview {
  id: string;
  rating: number;
  user: {
    id: string;
    profile_url: string;
    image_url: string;
    name: string;
  };
  text: string;
  time_created: string;
  url: string;
}

export interface YelpBusiness {
  id: string;
  name: string;
  image_url: string;
  url: string;
  rating: number;
  review_count: number;
  phone: string;
  display_phone: string;
  location: {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    display_address: string[];
  };
  reviews?: YelpReview[];
}

export class YelpService {
  private apiKey: string;
  private baseUrl = 'https://api.yelp.com/v3';

  constructor() {
    this.apiKey = process.env.YELP_API_KEY || '';
    if (!this.apiKey) {
      logger.warn('Yelp API key not found. Yelp reviews will not be available.');
    }
  }

  /**
   * Search for businesses by name and location
   */
  async searchBusinesses(
    term: string,
    location: string,
    limit: number = 1
  ): Promise<YelpBusiness[]> {
    if (!this.apiKey) {
      logger.warn('Yelp API key not configured');
      return [];
    }

    try {
      const params = new URLSearchParams({
        term,
        location,
        limit: limit.toString(),
      });

      const url = `${this.baseUrl}/businesses/search?${params}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.businesses || [];
    } catch (error) {
      logger.error('Failed to search Yelp businesses', {
        error: error instanceof Error ? error.message : 'Unknown error',
        term,
        location,
      });
      return [];
    }
  }

  /**
   * Get business details by ID
   */
  async getBusinessDetails(businessId: string): Promise<YelpBusiness | null> {
    if (!this.apiKey) {
      logger.warn('Yelp API key not configured');
      return null;
    }

    try {
      const url = `${this.baseUrl}/businesses/${businessId}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      logger.error('Failed to fetch Yelp business details', {
        error: error instanceof Error ? error.message : 'Unknown error',
        businessId,
      });
      return null;
    }
  }

  /**
   * Get reviews for a specific business
   */
  async getBusinessReviews(businessId: string): Promise<YelpReview[]> {
    if (!this.apiKey) {
      logger.warn('Yelp API key not configured');
      return [];
    }

    try {
      const url = `${this.baseUrl}/businesses/${businessId}/reviews`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.reviews || [];
    } catch (error) {
      logger.error('Failed to fetch Yelp business reviews', {
        error: error instanceof Error ? error.message : 'Unknown error',
        businessId,
      });
      return [];
    }
  }

  /**
   * Get reviews for Vasquez Law Firm offices
   */
  async getVasquezLawFirmReviews(): Promise<{
    charlotte: YelpReview[];
    raleigh: YelpReview[];
    orlando: YelpReview[];
    smithfield: YelpReview[];
  }> {
    const offices = [
      { key: 'charlotte', term: 'Vasquez Law Firm', location: 'Charlotte, NC' },
      { key: 'raleigh', term: 'Vasquez Law Firm', location: 'Raleigh, NC' },
      { key: 'orlando', term: 'Vasquez Law Firm', location: 'Orlando, FL' },
      { key: 'smithfield', term: 'Vasquez Law Firm', location: 'Smithfield, NC' },
    ];

    const results = {
      charlotte: [] as YelpReview[],
      raleigh: [] as YelpReview[],
      orlando: [] as YelpReview[],
      smithfield: [] as YelpReview[],
    };

    for (const office of offices) {
      try {
        // First search for the business
        const businesses = await this.searchBusinesses(office.term, office.location, 1);

        if (businesses.length === 0) {
          logger.warn(`Could not find Yelp business for ${office.key}`);
          continue;
        }

        const business = businesses[0];
        if (!business) {
          logger.warn(`No business found for ${office.key}`);
          continue;
        }

        // Then get the reviews
        const reviews = await this.getBusinessReviews(business.id);
        results[office.key as keyof typeof results] = reviews;

        logger.info(`Fetched ${reviews.length} Yelp reviews for ${office.key}`);

        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        logger.error(`Failed to fetch Yelp reviews for ${office.key}`, {
          error: error instanceof Error ? error.message : 'Unknown error',
          office: office.key,
        });
      }
    }

    return results;
  }

  /**
   * Check if the service is available
   */
  isAvailable(): boolean {
    return !!this.apiKey;
  }
}

export const yelpService = new YelpService();
