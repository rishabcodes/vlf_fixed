'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { securityLogger } from '@/lib/safe-logger';
import { Star, MapPin, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { formatDate, formatDateTime } from '@/lib/utils/date-utils';
import { useHydrationSafe } from '@/hooks/useHydrationSafe';

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

interface ExternalReviewsProps {
  maxReviews?: number;
  showSummary?: boolean;
  showRefresh?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // in minutes
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}

                className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
}

function SourceBadge({ source }: { source: 'google' }) {
  const config = {
    google: {
      name: 'Google',
      className: 'bg-blue-100 text-blue-800',
      icon: '🔍',
    },
  };

  const { name, className, icon } = config[source];

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}
    >
      <span className="mr-1">{icon}</span>
      {name}
    </span>
  );
}

export default function ExternalReviews({
  maxReviews = 6,
  showSummary = true,
  showRefresh = false,
  autoRefresh = false,
  refreshInterval = 60, // 1 hour
}: ExternalReviewsProps) {
  const [reviews, setReviews] = useState<ExternalReview[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const isHydrated = useHydrationSafe();

  const fetchReviews = useCallback(
    async (forceRefresh = false) => {
      try {
        setError(null);
        if (forceRefresh) {
          setRefreshing(true);
        }

        const params = new URLSearchParams({
          limit: maxReviews.toString(),
          ...(forceRefresh && { refresh: 'true' }),
        });

        const response = await fetch(`/api/reviews?${params}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setReviews(data.reviews || []);
        setSummary(data.summary || null);
        setLastUpdated(data.requestedAt || (isHydrated ? new Date().toISOString() : null));
      } catch (err) {
        securityLogger.error('Failed to fetch external reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [maxReviews, isHydrated]
  );

  const handleRefresh = useCallback(() => {
    fetchReviews(true);
  }, [fetchReviews]);

  // Initial load
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(
      () => {
        fetchReviews();
      },
      refreshInterval * 60 * 1000
    ); // Convert minutes to milliseconds

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchReviews]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin text-brand-skyblue" />
          <span className="ml-2 text-gray-600">Loading external reviews...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">External Reviews Unavailable</h3>
            <p className="text-sm text-yellow-700 mt-1">{error}</p>
            {showRefresh && (
              <button
                onClick={handleRefresh} className="mt-2 text-sm text-yellow-800 hover:text-yellow-900 underline"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No external reviews available at this time.</p>
        {showRefresh && (
          <button
            onClick={handleRefresh} className="mt-2 text-brand-skyblue hover:text-brand-skyblue/80 underline"
          >
            Refresh
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      {showSummary && summary && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-charcoal">
                External Reviews Summary
              </h3>
              {showRefresh && (
                <button
                  onClick={handleRefresh} disabled={refreshing} className="flex items-center text-sm text-brand-skyblue hover:text-brand-skyblue/80 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Average Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <StarRating rating={Math.round(summary.averageRating)} />
                  <span className="ml-2 text-2xl font-bold text-brand-charcoal">
                    {summary.averageRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{summary.totalReviews} total reviews</p>
              </div>

              {/* Source Breakdown */}
              <div className="text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-1">Google:</span>
                      <span className="font-medium">{summary.sourceBreakdown.google}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="text-center">
                <div className="space-y-1">
                  {Object.entries(summary.ratingDistribution)
                    .reverse()
                    .filter(([_, count]) => count > 0)
                    .slice(0, 3)
                    .map(([rating, count]) => (
                      <div key={rating}

                className="flex items-center justify-center text-sm">
                        <span
                className="mr-1">{rating}★</span>
                        <span className="text-gray-600">({count})</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {lastUpdated && isHydrated && (
              <p className="text-xs text-gray-500 mt-4 text-center">
                Last updated: {formatDateTime(lastUpdated)}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map(review => (
          <Card key={review.id}

                className="h-full">
            <CardContent
                className="p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {review.authorImage ? (
                    <Image
                      src={review.authorImage}

                alt={`${review.author} profile`}
                      width={40}
                      height={40}

                className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {review.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-brand-charcoal">
                      {review.authorUrl ? (
                        <a
                          href={review.authorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-skyblue transition-colors"
                        >
                          {review.author}
                        </a>
                      ) : (
                        review.author
                      )}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-gray-500">
                        {isHydrated ? formatDate(review.date) : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <SourceBadge source={review.source} />
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>

              {/* Review Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                {review.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="capitalize">{review.location}</span>
                  </div>
                )}
                {review.sourceUrl && (
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-brand-skyblue transition-colors"
                  >
                    <span>View original</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
