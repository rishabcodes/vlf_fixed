import { logger } from '@/lib/safe-logger';

export interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  language?: string;
}

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export class GooglePlacesService {
  private apiKey: string;
  private baseUrl = 'https://maps.googleapis.com/maps/api/place';

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || '';
    if (!this.apiKey) {
      logger.warn('Google Places API key not found. Google reviews will not be available.');
    }
  }

  /**
   * Get place details including reviews by place ID
   */
  async getPlaceDetails(placeId: string): Promise<GooglePlaceDetails | null> {
    if (!this.apiKey) {
      logger.warn('Google Places API key not configured');
      return null;
    }

    try {
      const fields = 'place_id,name,rating,user_ratings_total,reviews';
      const url = `${this.baseUrl}/details/json?place_id=${placeId}&fields=${fields}&key=${this.apiKey}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status !== 'OK') {
        throw new Error(`Google Places API status: ${data.status}`);
      }

      return data.result;
    } catch (error) {
      logger.error('Failed to fetch Google Place details', {
        error: error instanceof Error ? error.message : 'Unknown error',
        placeId,
      });
      return null;
    }
  }

  /**
   * Find a place by name and location to get place ID
   */
  async findPlace(query: string, location?: string): Promise<{ place_id: string } | null> {
    if (!this.apiKey) {
      logger.warn('Google Places API key not configured');
      return null;
    }

    try {
      const searchQuery = location ? `${query} ${location}` : query;
      const url = `${this.baseUrl}/findplacefromtext/json?input=${encodeURIComponent(searchQuery)}&inputtype=textquery&fields=place_id&key=${this.apiKey}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status !== 'OK' || !data.candidates || data.candidates.length === 0) {
        logger.warn(`No place found for query: ${searchQuery}`);
        return null;
      }

      return data.candidates[0];
    } catch (error) {
      logger.error('Failed to find Google Place', {
        error: error instanceof Error ? error.message : 'Unknown error',
        query,
        location,
      });
      return null;
    }
  }

  /**
   * Get reviews for Vasquez Law Firm offices
   */
  async getVasquezLawFirmReviews(): Promise<{
    charlotte: GoogleReview[];
    raleigh: GoogleReview[];
    orlando: GoogleReview[];
    smithfield: GoogleReview[];
  }> {
    // Direct place IDs from Google Places
    const officesWithPlaceIds = {
      charlotte: {
        query: 'Vasquez Law Firm Charlotte NC',
        placeId: 'ChIJLSZFB-ghVIgRYmWpO-tIjrk', // 5701 Executive Center Dr # 103
      },
      raleigh: {
        query: 'Vasquez Law Firm Raleigh NC',
        placeId: 'ChIJ3R1JE6pZrIkR7We57Xn2rk8', // 4426 Louisburg Rd
      },
      orlando: {
        query: 'Vasquez Law Firm Orlando FL',
        placeId: 'ChIJTyAsWJ9_54gRFBO4KYHh1A0', // 1111 E Amelia St
      },
      smithfield: {
        query: 'Vasquez Law Firm Smithfield NC',
        placeId: 'ChIJeb6qIGJyrIkRxn9w3R8iiOI', // 612 S Brightleaf Blvd
      },
    };

    const results = {
      charlotte: [] as GoogleReview[],
      raleigh: [] as GoogleReview[],
      orlando: [] as GoogleReview[],
      smithfield: [] as GoogleReview[],
    };

    for (const [office, config] of Object.entries(officesWithPlaceIds)) {
      try {
        let placeId = config.placeId;

        // If we don't have a place ID, try to find it
        if (!placeId) {
          const place = await this.findPlace(config.query);
          if (!place) {
            logger.warn(`Could not find Google place for ${office}`);
            continue;
          }
          placeId = place.place_id;
        }

        // Get the details with reviews using the place ID
        const details = await this.getPlaceDetails(placeId);
        if (details && details.reviews) {
          results[office as keyof typeof results] = details.reviews;
          logger.info(`Fetched ${details.reviews.length} Google reviews for ${office}`);
        }

        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        logger.error(`Failed to fetch Google reviews for ${office}`, {
          error: error instanceof Error ? error.message : 'Unknown error',
          office,
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

export const googlePlacesService = new GooglePlacesService();
