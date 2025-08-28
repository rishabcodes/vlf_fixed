'use client';

import { useState, useEffect } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectOption } from '@/components/ui/select';
import {
  Share2,
  // Calendar,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
} from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  enabled: boolean;
  type: string;
  autoPublish: boolean;
  hasCredentials: boolean;
  contentTypes: string[];
  postCount?: number;
  lastSync?: string;
}

interface Strategy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  platforms: string[];
  sourceType: string;
  targetPlatforms: string[];
  ruleCount: number;
  schedule: {
    requiresApproval: boolean;
    delay?: number;
  };
}

interface SchedulerJob {
  name: string;
  schedule: string;
  lastRun?: string;
  nextRun?: string;
  running: boolean;
}

interface SchedulerStatus {
  running: boolean;
  lastRun?: string;
  nextRun?: string;
  queueLength: number;
  jobs?: SchedulerJob[];
}

interface Analytics {
  totalPosts: number;
  successRate: number;
  totalSyndications: number;
  successfulSyndications: number;
  failedSyndications: number;
  platformBreakdown: Record<string, number>;
  recentPosts: Array<{
    id: string;
    title: string;
    platform: string;
    status: string;
    timestamp: string;
  }>;
}

export default function SyndicationManagementPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedContent, setSelectedContent] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [platformsRes, strategiesRes, schedulerRes] = await Promise.all([
        fetch('/api/syndication/platforms'),
        fetch('/api/syndication/strategies'),
        fetch('/api/syndication/scheduler'),
      ]);

      const [platformsData, strategiesData, schedulerData] = await Promise.all([
        platformsRes.json(),
        strategiesRes.json(),
        schedulerRes.json(),
      ]);

      setPlatforms(platformsData.platforms || []);
      setStrategies(strategiesData.strategies || []);
      setSchedulerStatus(schedulerData.status);

      // Fetch analytics for last 7 days
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const analyticsRes = await fetch(
        `/api/syndication?startDate=${startDate.toISOString()}&endDate=${new Date().toISOString()}`
      );
      const analyticsData = await analyticsRes.json();
      setAnalytics(analyticsData.analytics);
    } catch (error) {
      logger.error('Failed to fetch syndication data:', error);
    } finally {
      setIsLoading(false);
        }
};

  const handleSchedulerControl = async (action: string) => {
    try {
      const response = await fetch('/api/syndication/scheduler/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const data = await response.json();
        setSchedulerStatus(data.status);
      }
    } catch (error) {
      logger.error('Failed to control scheduler:', error);
        }
};

  const handleManualSyndication = async () => {
    if (!selectedContent || selectedPlatforms.length === 0) {
      alert('Please select content and at least one platform');
      return;
    }

    try {
      const response = await fetch('/api/syndication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: selectedContent,
          contentType: 'blog', // Would be dynamic in production
          platforms: selectedPlatforms,
        }),
      });

      if (response.ok) {
        alert('Content syndicated successfully!');
        setSelectedContent('');
        setSelectedPlatforms([]);
      }
    } catch (error) {
      logger.error('Failed to syndicate content:', error);
        }
};

  const handlePlatformToggle = async (platformId: string, enabled: boolean) => {
    try {
      await fetch('/api/syndication/platforms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platformId,
          config: { enabled },
        }),
      });

      setPlatforms(platforms.map(p => (p.id === platformId ? { ...p, enabled } : p)));
    } catch (error) {
      logger.error('Failed to update platform:', error);
        }
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
        <h1 className="text-3xl font-bold">Content Syndication</h1>
        <div className="flex items-center space-x-4">
          <Badge variant={schedulerStatus?.running ? 'success' : 'secondary'}>
            {schedulerStatus?.running ? 'Scheduler Active' : 'Scheduler Stopped'}
          </Badge>
          <Button
            onClick={() => handleSchedulerControl(schedulerStatus?.running ? 'stop' : 'start')}
            variant={schedulerStatus?.running ? 'destructive' : 'primary'}
            size="sm"
          >
            {schedulerStatus?.running ? 'Stop' : 'Start'} Scheduler
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Syndications</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalSyndications}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.totalSyndications > 0
                  ? Math.round(
                      (analytics.successfulSyndications / analytics.totalSyndications) * 100
                    )
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics.successfulSyndications} successful
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.failedSyndications}</div>
              <Button
                variant="link"
                className="p-0 h-auto text-xs"
                onClick={() => handleSchedulerControl('retry')}
              >
                Retry failed →
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platforms.filter(p => p.enabled).length}</div>
              <p className="text-xs text-muted-foreground">of {platforms.length} platforms</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="manual">Manual Syndication</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Syndication Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map(platform => (
                  <div
                    key={platform.id}

                className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={platform.enabled}
                onCheckedChange={checked => handlePlatformToggle(platform.id, checked)}
                      />
                      <div>
                        <h3 className="font-medium">{platform.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{platform.type}</Badge>
                          {platform.autoPublish && <Badge>Auto-publish</Badge>}
                          {!platform.hasCredentials && (
                            <Badge variant="destructive">No credentials</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Supports: {platform.contentTypes.join(', ')}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Posting Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategies.map(strategy => (
                  <div key={strategy.id}

                className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                className="font-medium">{strategy.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {strategy.sourceType} → {strategy.targetPlatforms.join(', ')}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {strategy.ruleCount} rules configured
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {strategy.schedule.requiresApproval && (
                          <Badge variant="outline">Requires approval</Badge>
                        )}
                        {strategy.schedule.delay && (
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            {strategy.schedule.delay}m delay
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Content Syndication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Content</label>
                <Select
                  value={selectedContent} onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedContent(e.target.value)
                  }
                >
                  <SelectOption value="">Choose content to syndicate</SelectOption>
                  <SelectOption value="blog-1">Latest Immigration Guide</SelectOption>
                  <SelectOption value="blog-2">Criminal Defense Tips</SelectOption>
                  <SelectOption value="news-1">Legal Update: New Immigration Policy</SelectOption>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Platforms</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {platforms
                    .filter(p => p.enabled)
                    .map(platform => (
                      <label key={platform.id}
                        className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedPlatforms.includes(platform.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedPlatforms([...selectedPlatforms, platform.id]);
                            } else {
                              setSelectedPlatforms(
                                selectedPlatforms.filter(p => p !== platform.id)
                              );
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{platform.name}</span>
                      </label>
                    ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedContent('');
                    setSelectedPlatforms([]);
                  }}
                >
                  Clear
                </Button>
                <Button onClick={handleManualSyndication}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Syndicate Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduler Status</CardTitle>
            </CardHeader>
            <CardContent>
              {schedulerStatus && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Scheduler Service</h3>
                      <p className="text-sm text-gray-600">
                        {schedulerStatus.running ? 'Running' : 'Stopped'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSchedulerControl('restart')}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Restart
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Active Jobs</h3>
                    <div className="space-y-2">
                      {schedulerStatus.jobs?.map(job => (
                        <div
                          key={job.name}

                className="flex items-center justify-between p-3 border rounded"
                        >
                          <div>
                            <p
                className="font-medium text-sm">{job.name}</p>
                            {job.nextRun && (
                              <p className="text-xs text-gray-600">
                                Next run: {new Date(job.nextRun).toLocaleString()}
                              </p>
                            )}
                          </div>
                          <Badge variant={job.running ? 'success' : 'secondary'}>
                            {job.running ? 'Active' : 'Idle'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
