'use client';

import { useState, useEffect, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectOption } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Star,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Clock,
  Send,
  // Calendar,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Platform {
  id: string;
  name: string;
}

interface Response {
  responseText: string;
  sentAt: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  publishedAt: string;
  platform?: Platform;
  platformId: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  responded: boolean;
  keywords?: string[];
  url: string;
  response?: Response;
}

interface PlatformPerformance {
  platformId: string;
  platformName: string;
  totalReviews: number;
  averageRating: number;
  responseRate: number;
}

interface Alert {
  id: string;
  type: string;
  severity: 'urgent' | 'high' | 'medium' | 'low';
  message: string;
  createdAt: string;
}

interface Statistics {
  statistics: {
    averageRating: number;
    total: number;
  };
  report: {
    metrics: {
      responseRate: number;
      respondedReviews: number;
    };
    platformPerformance: PlatformPerformance[];
    recommendations: string[];
    recentAlerts: Alert[];
  };
}

export default function ReputationManagementPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (platformFilter !== 'all') params.append('platformId', platformFilter);
      if (sentimentFilter !== 'all') params.append('sentiment', sentimentFilter);

      const [reviewsRes, statsRes] = await Promise.all([
        fetch(`/api/reputation/reviews?${params}`),
        fetch('/api/reputation/statistics'),
      ]);

      const [reviewsData, statsData] = await Promise.all([reviewsRes.json(), statsRes.json()]);

      setReviews(reviewsData.reviews || []);
      setStatistics(statsData);
    } catch (error) {
      logger.error('Failed to fetch reputation data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [platformFilter, sentimentFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleGenerateResponse = useCallback(async (review: Review) => {
    setIsGenerating(true);
    setSelectedReview(review);

    try {
      const response = await fetch('/api/reputation/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId: review.id,
          action: 'generate',
          useAI: true,
        }),
      });

      const data = await response.json();
      if (data.success && data.result.response) {
        setResponseText(data.result.response);
      }
    } catch (error) {
      logger.error('Failed to generate response:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleSendResponse = useCallback(async () => {
    if (!selectedReview || !responseText) return;

    try {
      const response = await fetch('/api/reputation/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId: selectedReview.id,
          action: 'send',
          responseText,
        }),
      });

      if (response.ok) {
        alert('Response sent successfully!');
        setSelectedReview(null);
        setResponseText('');
        fetchData(); // Refresh data
      }
    } catch (error) {
      logger.error('Failed to send response:', error);
    }
  }, [selectedReview, responseText, fetchData]);

  const handleHarvestReviews = useCallback(
    async (platformId?: string) => {
      try {
        const response = await fetch('/api/reputation/reviews/harvest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platformId }),
        });

        if (response.ok) {
          alert('Review harvest started!');
          setTimeout(fetchData, 3000); // Refresh after 3 seconds
        }
      } catch (error) {
        logger.error('Failed to harvest reviews:', error);
      }
    },
    [fetchData]
  );

  const getRatingStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getSentimentBadge = (sentiment: string) => {
    const variants: Record<
      string,
      { variant: 'success' | 'secondary' | 'destructive'; color: string }
    > = {
      positive: { variant: 'success', color: 'text-green-600' },
      neutral: { variant: 'secondary', color: 'text-gray-600' },
      negative: { variant: 'destructive', color: 'text-red-600' },
    };

    return variants[sentiment] || variants['neutral'];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reputation Management</h1>
        <Button onClick={() => handleHarvestReviews()}>Harvest All Reviews</Button>
      </div>

      {/* Statistics Overview */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics.statistics.averageRating.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                {getRatingStars(Math.round(statistics.statistics.averageRating))}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.statistics.total}</div>
              <p className="text-xs text-muted-foreground">
                {statistics.report.metrics.responseRate
                  ? `${(statistics.report.metrics.responseRate * 100).toFixed(0)}% responded`
                  : 'Calculating...'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Needs Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statistics.statistics.total - statistics.report.metrics.respondedReviews}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.report.recentAlerts.length}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <Select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)}>
              <SelectOption value="all">All Platforms</SelectOption>
              <SelectOption value="google">Google</SelectOption>
              <SelectOption value="avvo">Avvo</SelectOption>
              <SelectOption value="facebook">Facebook</SelectOption>
              <SelectOption value="yelp">Yelp</SelectOption>
            </Select>

            <Select value={sentimentFilter} onChange={e => setSentimentFilter(e.target.value)}>
              <SelectOption value="all">All Sentiments</SelectOption>
              <SelectOption value="positive">Positive</SelectOption>
              <SelectOption value="neutral">Neutral</SelectOption>
              <SelectOption value="negative">Negative</SelectOption>
            </Select>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-lg font-medium">{review.author}</span>
                        <Badge variant="outline">
                          {review.platform?.name || review.platformId}
                        </Badge>
                        <Badge {...getSentimentBadge(review.sentiment)}>{review.sentiment}</Badge>
                        {review.responded && <Badge variant="success">Responded</Badge>}
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-yellow-500">{getRatingStars(review.rating)}</span>
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(review.publishedAt), { addSuffix: true })}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">{review.content}</p>

                      {review.keywords && review.keywords.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {review.keywords.slice(0, 5).map((keyword: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {!review.responded && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGenerateResponse(review)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Respond to Review</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">{review.author}</p>
                                <p className="text-yellow-500">{getRatingStars(review.rating)}</p>
                                <p className="text-sm text-gray-600 mt-2">{review.content}</p>
                              </div>

                              <div>
                                <label className="block text-sm font-medium mb-2">Response</label>
                                <Textarea
                                  value={responseText} onChange={e => setResponseText(e.target.value)} placeholder={
                                    isGenerating
                                      ? 'Generating response...'
                                      : 'Type your response...'
                                  }
                                  rows={6}

                disabled={isGenerating}
                                />
                              </div>

                              <div className="flex justify-between">
                                <Button
                                  variant="outline"
                                  onClick={() => handleGenerateResponse(review)}

                disabled={isGenerating}
                                >
                                  {isGenerating ? 'Generating...' : 'Generate AI Response'}
                                </Button>
                                <div className="space-x-2">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedReview(null);
                                      setResponseText('');
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleSendResponse} disabled={!responseText}>
                                    <Send className="h-4 w-4 mr-1" />
                                    Send Response
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(review.url, '_blank')}
                      >
                        View on Platform
                      </Button>
                    </div>
                  </div>

                  {review.response && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Our Response:</p>
                      <p className="text-sm text-blue-800">{review.response.responseText}</p>
                      <p className="text-xs text-blue-600 mt-2">
                        Responded{' '}
                        {formatDistanceToNow(new Date(review.response.sentAt), { addSuffix: true })}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {statistics && statistics.report && (
            <div className="space-y-6">
              {/* Platform Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {statistics.report.platformPerformance.map(platform => (
                      <div
                        key={platform.platformId}

                className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4
                className="font-medium">{platform.platformName}</h4>
                          <p className="text-sm text-gray-600">
                            {platform.totalReviews} reviews • {platform.averageRating.toFixed(1)}{' '}
                            avg rating
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            {(platform.responseRate * 100).toFixed(0)}%
                          </p>
                          <p className="text-sm text-gray-600">Response Rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statistics.report.recommendations.map((rec: string, index: number) => (
                      <div key={index}

                className="flex items-start">
                        <TrendingUp className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                        <p
                className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Solicitation Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['post-case-success', 'post-consultation', 'case-milestone'].map(campaignId => (
                  <div key={campaignId}

                className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4
                className="font-medium capitalize">{campaignId.replace(/-/g, ' ')}</h4>
                        <p className="text-sm text-gray-600">Active campaign</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Performance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {statistics && statistics.report.recentAlerts.length > 0 ? (
            statistics.report.recentAlerts.map(alert => (
              <Card
                key={alert.id}

                className={
                  alert.severity === 'urgent'
                    ? 'border-red-500'
                    : alert.severity === 'high'
                      ? 'border-orange-500'
                      : 'border-gray-200'
                }
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            alert.severity === 'urgent'
                              ? 'text-red-500'
                              : alert.severity === 'high'
                                ? 'text-orange-500'
                                : 'text-yellow-500'
                          }`}
                        />
                        <h3 className="font-medium">
                          {alert.type
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </h3>
                        <Badge
                          variant={
                            alert.severity === 'urgent'
                              ? 'destructive'
                              : alert.severity === 'high'
                                ? 'warning'
                                : 'secondary'
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Resolve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No active alerts</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
