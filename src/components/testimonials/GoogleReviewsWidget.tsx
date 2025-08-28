'use client';

import React, { useEffect, useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  author_url?: string;
  profile_photo_url?: string;
}

interface GoogleReviewsWidgetProps {
  placeId?: string;
  apiKey?: string;
}

export default function GoogleReviewsWidget({ placeId, apiKey }: GoogleReviewsWidgetProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  // Error state for potential future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, using static data. In production, you would fetch from Google Places API
    // Note: Google Places API requires server-side implementation due to CORS restrictions
    const mockReviews: GoogleReview[] = [
      {
        author_name: 'Michael Rodriguez',
        rating: 5,
        text: 'Vasquez Law Firm helped me with my green card application. They were professional, thorough, and kept me informed throughout the entire process. Highly recommended!',
        time: Date.now() - 30 * 24 * 60 * 60 * 1000,
        relative_time_description: 'a month ago',
      },
      {
        author_name: 'Sarah Johnson',
        rating: 5,
        text: 'After my car accident, VLF handled everything. They negotiated with insurance companies and got me a fair settlement. The team truly cares about their clients.',
        time: Date.now() - 45 * 24 * 60 * 60 * 1000,
        relative_time_description: '2 months ago',
      },
      {
        author_name: 'David Chen',
        rating: 5,
        text: 'Excellent immigration lawyers! They helped my entire family with our citizenship applications. Very knowledgeable about immigration law and always available to answer questions.',
        time: Date.now() - 60 * 24 * 60 * 60 * 1000,
        relative_time_description: '2 months ago',
      },
    ];

    setReviews(mockReviews);
    setLoading(false);
  }, [placeId, apiKey]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      </div>
    );
  }

  if (_error) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-600">Unable to load Google reviews at this time.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-brand-charcoal">Google Reviews</h3>
        <a
          href="https://www.google.com/search?q=Vasquez+Law+Firm+PLLC"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-brand-skyblue hover:text-brand-skyblue/80 transition-colors"
        >
          <span className="mr-2">View on Google</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid gap-4">
        {reviews.map((review, index) => (
          <Card key={index}

                className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4
                className="font-semibold text-brand-charcoal">{review.author_name}</h4>
                  <p className="text-sm text-gray-500">{review.relative_time_description}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}

                className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <Image
            src="/images/google-logo.png"
            alt="Google"
            width={24}
            height={24}

                className="h-6 w-auto mr-3"
          />
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i}

                className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="ml-2 font-semibold">5.0</span>
        </div>
        <p className="text-gray-600">Based on 150+ Google Reviews</p>
      </div>
    </div>
  );
}
