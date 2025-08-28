// Google My Business API Types

export interface GMBAuthClient {
  authorize(): Promise<void>;
  credentials?: {
    access_token?: string;
    refresh_token?: string;
    expiry_date?: number;
  };
}

export interface GMBLocationPost {
  summary: string;
  languageCode: string;
  callToAction?: {
    actionType: string;
    url?: string;
  };
  media?: Array<{
    mediaFormat: string;
    sourceUrl: string;
  }>;
  topicType?: string;
  event?: {
    title: string;
    schedule: {
      startDate: string;
      startTime: string;
      endDate?: string;
      endTime?: string;
    };
  };
  offer?: {
    couponCode?: string;
    redeemOnlineUrl?: string;
    termsConditions?: string;
  };
}

export interface GMBReviewDetails {
  name: string;
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment?: string;
  createTime: string;
  updateTime?: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

export interface GMBLocationInfo {
  name: string;
  locationName: string;
  primaryCategory: {
    displayName: string;
    categoryId: string;
  };
  additionalCategories?: Array<{
    displayName: string;
    categoryId: string;
  }>;
  storefrontAddress?: {
    addressLines: string[];
    locality: string;
    administrativeArea: string;
    postalCode: string;
    regionCode: string;
  };
  phoneNumbers?: {
    primaryPhone: string;
    additionalPhones?: string[];
  };
  websiteUrl?: string;
  regularHours?: {
    periods: Array<{
      openDay: string;
      openTime: string;
      closeDay: string;
      closeTime: string;
    }>;
  };
  specialHours?: Array<{
    specialHourPeriod: {
      startDate: string;
      endDate?: string;
      isClosed?: boolean;
    };
  }>;
  serviceArea?: {
    businessType: 'CUSTOMER_LOCATION_ONLY' | 'CUSTOMER_AND_BUSINESS_LOCATION';
    radius?: {
      radiusKm: number;
    };
    places?: {
      placeInfos: Array<{
        placeName: string;
        placeId: string;
      }>;
    };
  };
  attributes?: Array<{
    attributeId: string;
    valueType: 'BOOL' | 'ENUM' | 'URL' | 'REPEATED_ENUM';
    values: unknown[];
  }>;
}

export interface GMBMediaItem {
  mediaFormat: 'PHOTO' | 'VIDEO';
  sourceUrl?: string;
  dataRef?: {
    resourceName: string;
  };
  description?: string;
  locationAssociation?: {
    category: 'INTERIOR' | 'EXTERIOR' | 'FOOD_AND_DRINK' | 'MENU' | 'PRODUCT' | 'AT_WORK' | 'TEAMS' | 'IDENTITY' | 'OTHER';
  };
}

export interface GMBInsight {
  name: string;
  locationName: string;
  metricRequests: Array<{
    metric: string;
    options?: Array<{
      aggregationInterval?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
      startTime?: {
        year: number;
        month: number;
        day: number;
      };
      endTime?: {
        year: number;
        month: number;
        day: number;
      };
    }>;
  }>;
}

export interface GMBLocationsList {
  locations: GMBLocationInfo[];
  nextPageToken?: string;
  totalSize?: number;
}

export interface GMBReviewsList {
  reviews: GMBReviewDetails[];
  nextPageToken?: string;
  averageRating?: number;
  totalReviewCount?: number;
}

export interface GMBMediaList {
  mediaItems: GMBMediaItem[];
  nextPageToken?: string;
  totalSize?: number;
}

export interface GMBMyBusinessAPI {
  accounts: {
    locations: {
      list(params: { parent: string; pageSize?: number; pageToken?: string }): Promise<GMBLocationsList>;
      get(params: { name: string }): Promise<GMBLocationInfo>;
      patch(params: { name: string; updateMask: string; resource: Partial<GMBLocationInfo> }): Promise<GMBLocationInfo>;
    };
  };
  locations: {
    reviews: {
      list(params: { parent: string; pageSize?: number; pageToken?: string }): Promise<GMBReviewsList>;
      reply(params: { parent: string; requestBody: { comment: string } }): Promise<void>;
    };
    localPosts: {
      create(params: { parent: string; requestBody: GMBLocationPost }): Promise<{ name: string }>;
      list(params: { parent: string; pageSize?: number; pageToken?: string }): Promise<{ localPosts: GMBLocationPost[] }>;
    };
    media: {
      create(params: { parent: string; requestBody: GMBMediaItem }): Promise<{ name: string }>;
      list(params: { parent: string; pageSize?: number; pageToken?: string }): Promise<GMBMediaList>;
    };
    reportInsights(params: { name: string; requestBody: GMBInsight }): Promise<unknown>;
  };
}

export interface GMBPlacesAPI {
  places: {
    findPlaceFromQuery(params: {
      input: string;
      inputtype: 'textquery' | 'phonenumber';
      fields?: string;
      locationbias?: string;
    }): Promise<{
      candidates: Array<{
        place_id: string;
        name?: string;
        formatted_address?: string;
        geometry?: {
          location: {
            lat: number;
            lng: number;
          };
        };
        rating?: number;
        user_ratings_total?: number;
      }>;
      status: string;
    }>;
    details(params: {
      place_id: string;
      fields?: string;
    }): Promise<{
      result: {
        place_id: string;
        name?: string;
        formatted_address?: string;
        formatted_phone_number?: string;
        website?: string;
        rating?: number;
        user_ratings_total?: number;
        reviews?: Array<{
          author_name: string;
          rating: number;
          text: string;
          time: number;
        }>;
        photos?: Array<{
          photo_reference: string;
          height: number;
          width: number;
        }>;
      };
      status: string;
    }>;
  };
}
