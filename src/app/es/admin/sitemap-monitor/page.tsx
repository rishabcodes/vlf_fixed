'use client';

import { useState, useEffect } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Globe, Link, RefreshCw } from 'lucide-react';

interface SitemapStats {
  totalPages: number;
  indexedPages: number;
  missingPages: string[];
  parityIssues: Array<{
    path: string;
    hasEn: boolean;
    hasEs: boolean;
  }>;
  lastUpdated: string;
  coverage: number;
}

export default function SitemapMonitorPage() {
  const [stats, setStats] = useState<SitemapStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/sitemap/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      logger.error('Failed to fetch sitemap stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
        }
};

  useEffect(() => {
    fetchStats();

    // Connect to WebSocket for real-time updates
    const connectWebSocket = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const session = await response.json();

        if (session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') {
          const { io } = await import('socket.io-client');
          const socket = io({
            auth: {
              token: session.accessToken,
              admin: true,
            },
          });

          socket.on('sitemap:stats', newStats => {
            setStats(newStats);
          });

          return () => {
            socket.disconnect();
          };
        }
      } catch (error) {
        logger.error('Failed to connect WebSocket:', error);
          }
};

    const cleanup = connectWebSocket();

    // Fallback: Auto-refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      cleanup.then(fn => fn?.());
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/admin/sitemap/refresh', { method: 'POST' });
      if (response.ok) {
        await fetchStats();
      }
    } catch (error) {
      logger.error('Failed to refresh sitemap stats:', error);
    } finally {
      setRefreshing(false);
        }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Failed to load sitemap statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sitemap Monitor</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Total Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPages.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Discovered across all routes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="w-5 h-5" />
              Indexed Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.indexedPages.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Included in sitemaps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.coverage.toFixed(1)}%</div>
            <Progress value={stats.coverage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Language Parity Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.parityIssues.length === 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>Perfect EN/ES parity - all pages have translations!</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-600 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span>{stats.parityIssues.length} pages missing translations</span>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {stats.parityIssues.map((issue, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <code
                className="text-sm">{issue.path}</code>
                      <div className="flex gap-2">
                        <Badge variant={issue.hasEn ? 'success' : 'destructive'}>
                          EN {issue.hasEn ? '✓' : '✗'}
                        </Badge>
                        <Badge variant={issue.hasEs ? 'success' : 'destructive'}>
                          ES {issue.hasEs ? '✓' : '✗'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {stats.missingPages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Missing Pages ({stats.missingPages.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {stats.missingPages.map((page, index) => (
                <div key={index}

                className="p-2 bg-red-50 rounded">
                  <code
                className="text-sm text-red-800">{page}</code>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-sm text-muted-foreground text-center">
        Last updated: {new Date(stats.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
}
