'use client';

import { useState, useEffect, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectOption } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { stripHtml } from '@/lib/utils/stripHtml';
// Dialog components removed - add back when needed
import {
  MapPin,
  MessageSquare,
  Star,
  Clock,
  Eye,
  Phone,
  Globe,
  Navigation,
  TrendingUp,
  Users,
  Search,
  Edit3,
  Play,
  Pause,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface GMBLocation {
  id: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  status: string;
  services?: string[];
  category?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  hours?: Record<
    string,
    {
      open?: string;
      close?: string;
      closed?: boolean;
    }
  >;
}

interface GMBPost {
  id: string;
  type: string;
  title: string;
  content: string;
  publishedAt: string;
  metrics?: {
    views: number;
    clicks: number;
    calls: number;
  };
  callToAction?: {
    type: string;
    url?: string;
  };
}

interface GMBAnalytics {
  searches: {
    direct: number;
    discovery: number;
    branded: number;
  };
  views: {
    maps: number;
    search: number;
    total?: number;
  };
  actions: {
    website: number;
    directions: number;
    phone: number;
  };
}

interface GMBAnalyticsResponse {
  success: boolean;
  analytics?: {
    metrics: GMBAnalytics & {
      views: {
        maps: number;
        search: number;
        total: number;
      };
      reviews: {
        averageRating: number;
        totalReviews: number;
      };
      queries: Array<{
        query: string;
        impressions: number;
        clicks: number;
      }>;
    };
  };
  insights?: string[];
  recommendations?: string[];
}

interface AutomationStatus {
  enabled: boolean;
  frequency: string;
  lastRun?: string;
  nextRun?: string;
  status?: 'active' | 'inactive';
}

export default function GMBPage() {
  const [locations, setUbicaciones] = useState<GMBLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [analytics, setAnalytics] = useState<GMBAnalyticsResponse | null>(null);
  const [posts, setPosts] = useState<GMBPost[]>([]);
  const [automationStatus, setAutomationStatus] = useState<AutomationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    type: 'update',
    title: '',
    content: '',
    callToAction: { type: 'learn_more', url: '' },
  });

  const fetchData = useCallback(async () => {
    try {
      const [locationsRes, automationRes] = await Promise.all([
        fetch('/api/gmb/locations'),
        fetch('/api/gmb/automation'),
      ]);

      const [locationsData, automationData] = await Promise.all([
        locationsRes.json(),
        automationRes.json(),
      ]);

      if (locationsData.success) {
        setUbicaciones(locationsData.locations);
        if (locationsData.locations.length > 0 && !selectedLocation) {
          setSelectedLocation(locationsData.locations[0].id);
        }
      }

      if (automationData.success) {
        setAutomationStatus(automationData);
      }
    } catch (error) {
      logger.error('Failed to fetch GMB data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedLocation]);

  const fetchLocationData = useCallback(async (locationId: string) => {
    try {
      const [analyticsRes, postsRes] = await Promise.all([
        fetch(`/api/gmb/analytics?locationId=${locationId}`),
        fetch(`/api/gmb/posts?locationId=${locationId}&limit=10`),
      ]);

      const [analyticsData, postsData] = await Promise.all([analyticsRes.json(), postsRes.json()]);

      if (analyticsData.success) {
        setAnalytics(analyticsData);
      }

      if (postsData.success) {
        setPosts(postsData.posts);
      }
    } catch (error) {
      logger.error('Failed to fetch location data:', error);
    }
  }, []);

  const handleAutomationControl = useCallback(
    async (action: string) => {
      try {
        const response = await fetch('/api/gmb/automation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        });

        if (response.ok) {
          alert(`Automation ${action}ed successfully`);
          fetchData();
        }
      } catch (error) {
        logger.error('Failed to control automation:', error);
      }
    },
    [fetchData]
  );

  const handleCreatePost = useCallback(async () => {
    if (!selectedLocation || !newPost.title || !newPost.content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/gmb/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: selectedLocation,
          ...newPost,
        }),
      });

      if (response.ok) {
        alert('Post created successfully');
        setNewPost({
          type: 'update',
          title: '',
          content: '',
          callToAction: { type: 'learn_more', url: '' },
        });
        fetchLocationData(selectedLocation);
      }
    } catch (error) {
      logger.error('Failed to create post:', error);
    }
  }, [selectedLocation, newPost, fetchLocationData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (selectedLocation) {
      fetchLocationData(selectedLocation);
    }
  }, [selectedLocation, fetchLocationData]);

  const selectedLocationData = locations.find(l => l.id === selectedLocation);

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
        <h1 className="text-3xl font-bold">Google My Business Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleAutomationControl('restart')}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Restart Automation
          </Button>
        </div>
      </div>

      {/* Location Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
            <SelectOption value="">Select a location</SelectOption>
            {locations.map(location => (
              <SelectOption key={location.id}

                value={location.id}>
                {location.name} - {location.address}
              </SelectOption>
            ))}
          </Select>
        </CardContent>
      </Card>

      {/* Automation Status */}
      {automationStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Automation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    automationStatus.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className="font-medium">
                  Status: {automationStatus.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Last Run:</span>
                <p className="font-medium">
                  {automationStatus.lastRun
                    ? formatDistanceToNow(new Date(automationStatus.lastRun), { addSuffix: true })
                    : 'Never'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Next Run:</span>
                <p className="font-medium">
                  {automationStatus.nextRun
                    ? formatDistanceToNow(new Date(automationStatus.nextRun), { addSuffix: true })
                    : 'Not scheduled'}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => handleAutomationControl('start')}>
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleAutomationControl('stop')}>
                <Pause className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedLocationData && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="business-info">Business Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Location Overview */}
            <Card>
              <CardHeader>
                <CardTitle>{selectedLocationData.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span>{selectedLocationData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span>{selectedLocationData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-600" />
                      <a
                        href={selectedLocationData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedLocationData.website}
                      </a>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocationData.services?.map((service: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Views</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {analytics?.analytics?.metrics?.views?.total || 0}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Phone Calls</p>
                        <p className="text-2xl font-bold text-green-600">
                          {analytics?.analytics?.metrics?.actions?.phone || 0}
                        </p>
                      </div>
                      <Phone className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Directions</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {analytics?.analytics?.metrics?.actions?.directions || 0}
                        </p>
                      </div>
                      <Navigation className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Average Rating</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          {analytics?.analytics?.metrics?.reviews?.averageRating || 0}
                        </p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Insights & Recommendations */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analytics?.insights?.map((insight: string, index: number) => (
                        <li key={index}

                className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <span
                className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analytics?.recommendations?.map((rec: string, index: number) => (
                        <li key={index}

                className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <span
                className="text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {analytics && (
              <>
                {/* Views Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Views Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {analytics?.analytics?.metrics.views.search}
                        </p>
                        <p className="text-sm text-gray-600">Search Views</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {analytics?.analytics?.metrics.views.maps}
                        </p>
                        <p className="text-sm text-gray-600">Maps Views</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">
                          {analytics?.analytics?.metrics.views.total}
                        </p>
                        <p className="text-sm text-gray-600">Total Views</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Search Queries */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Top Search Queries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics?.analytics?.metrics.queries?.map(
                        (
                          query: { query: string; impressions: number; clicks: number },
                          index: number
                        ) => (
                          <div
                            key={index}

                className="flex justify-between items-center p-3 border rounded-lg"
                          >
                            <span
                className="font-medium">{query.query}</span>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                {query.impressions} impressions
                              </p>
                              <p className="text-sm font-medium">{query.clicks} clicks</p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">
                          {analytics?.analytics?.metrics.actions.website}
                        </p>
                        <p className="text-sm text-gray-600">Website Visits</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">
                          {analytics?.analytics?.metrics.actions.phone}
                        </p>
                        <p className="text-sm text-gray-600">Phone Calls</p>
                      </div>
                      <div className="text-center p-4 bg-indigo-50 rounded-lg">
                        <p className="text-2xl font-bold text-indigo-600">
                          {analytics?.analytics?.metrics.actions.directions}
                        </p>
                        <p className="text-sm text-gray-600">Direction Requests</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            {/* Create New Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="post-type">Post Type</Label>
                    <Select
                      value={newPost.type} onChange={e => setNewPost({ ...newPost, type: e.target.value })}
                    >
                      <SelectOption value="update">Update</SelectOption>
                      <SelectOption value="event">Event</SelectOption>
                      <SelectOption value="offer">Offer</SelectOption>
                      <SelectOption value="product">Product</SelectOption>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="post-title">Title</Label>
                    <Input
                      id="post-title"
                      value={newPost.title}
                      onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="Enter post title..."
                      maxLength={300}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="post-content">Content</Label>
                  <Textarea
                    id="post-content"
                    value={newPost.content}
                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Enter post content..."
                    rows={4}
                    maxLength={1500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {newPost.content.length}/1500 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cta-type">Call to Action</Label>
                    <Select
                      value={newPost.callToAction.type} onChange={e =>
                        setNewPost({
                          ...newPost,
                          callToAction: { ...newPost.callToAction, type: e.target.value },
                        })
                      }
                    >
                      <SelectOption value="book">Book</SelectOption>
                      <SelectOption value="learn_more">Learn More</SelectOption>
                      <SelectOption value="call">Call</SelectOption>
                      <SelectOption value="sign_up">Sign Up</SelectOption>
                    </Select>
                  </div>

                  {newPost.callToAction.type !== 'call' && (
                    <div>
                      <Label htmlFor="cta-url">CTA URL</Label>
                      <Input
                        id="cta-url"
                        value={newPost.callToAction.url}
                        onChange={e =>
                          setNewPost({
                            ...newPost,
                            callToAction: { ...newPost.callToAction, url: e.target.value },
                          })
                        }
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>

                <Button onClick={handleCreatePost} className="w-full">
                  Create Post
                </Button>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Recent Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id}

                className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4
                className="font-medium">{post.title}</h4>
                        <Badge variant="outline">{post.type}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{stripHtml(post.content)}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          Published{' '}
                          {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                        </span>
                        {post.callToAction?.type && (
                          <Badge variant="secondary" className="text-xs">
                            CTA: {post.callToAction.type}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business-info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Business Name</Label>
                      <Input value={selectedLocationData.name} readOnly />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input value={selectedLocationData.phone} readOnly />
                    </div>
                    <div>
                      <Label>Website</Label>
                      <Input value={selectedLocationData.website} readOnly />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Input value={selectedLocationData.category || ''} readOnly />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Address</Label>
                      <Textarea value={selectedLocationData.address} readOnly rows={2} />
                    </div>
                    <div>
                      <Label>Coordinates</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={selectedLocationData.coordinates?.lat || ''}
                          readOnly
                          placeholder="Latitude"
                        />
                        <Input
                          value={selectedLocationData.coordinates?.lng || ''}
                          readOnly
                          placeholder="Longitude"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Label>Services Offered</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedLocationData.services?.map((service: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Label>Business Hours</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {selectedLocationData.hours &&
                      Object.entries(selectedLocationData.hours).map(([day, hours]) => (
                        <div key={day}

                className="flex justify-between p-2 border rounded">
                          <span
                className="capitalize font-medium">{day}</span>
                          <span className="text-gray-600">
                            {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
