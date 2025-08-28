'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/safe-logger';
import { Star, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReviewWidget {
  variant?: 'compact' | 'full';
  showSource?: boolean;
  maxReviews?: number;
}

interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  sourceBreakdown: {
    google: number;
  };
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}

                className={`${sizeClasses[size]} ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewWidget({
  variant = 'compact',
  showSource = true,
  maxReviews = 3,
}: ReviewWidget) {
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setError(null);
        const response = await fetch(`/api/reviews?limit=${maxReviews}`);

        if (!response.ok) {
          throw new Error('Failed to fetch review summary');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setSummary(data.summary);
      } catch (err) {
        logger.error('Failed to fetch review summary:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
      } finally {
        setLoading(false);
          }
};

    fetchSummary();
  }, [maxReviews]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-5 h-5 animate-spin text-brand-skyblue" />
        <span className="ml-2 text-sm text-gray-600">Loading reviews...</span>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-sm text-gray-600">Reviews unavailable</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center space-x-2 bg-white rounded-lg border px-4 py-2 shadow-sm">
        <StarRating rating={Math.round(summary.averageRating)} size="sm" />
        <span className="font-semibold text-gray-900">{summary.averageRating.toFixed(1)}</span>
        <span className="text-sm text-gray-500">({summary.totalReviews} reviews)</span>
        {showSource && (
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <span>Google Reviews</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <StarRating rating={Math.round(summary.averageRating)} size="lg" />
        </div>

        <div className="mb-2">
          <span className="text-3xl font-bold text-brand-charcoal">
            {summary.averageRating.toFixed(1)}
          </span>
          <span className="text-lg text-gray-600 ml-2">out of 5</span>
        </div>

        <p className="text-gray-600 mb-4">Based on {summary.totalReviews} external reviews</p>

        {showSource && (
          <div className="flex justify-center space-x-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-blue-600">{summary.sourceBreakdown.google}</div>
              <div className="text-gray-500">Google Reviews</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
