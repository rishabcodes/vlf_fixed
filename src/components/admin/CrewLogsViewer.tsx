'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';
import { useCrewLogs } from '@/hooks/useCrewLogs';
import { CrewLog } from '@/types/crews';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const CrewLogsViewer: React.FC = () => {
  const {
    logs,
    analytics,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    deleteLogs,
    exportLogs,
    cleanupOldLogs,
    fetchLogs,
    nextPage,
    previousPage,
    setPageSize,
    autoRefresh,
    setAutoRefresh,
    refreshInterval,
    setRefreshInterval,
  } = useCrewLogs();

  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [showLogDetail, setShowLogDetail] = useState<CrewLog | null>(null);

  const handleSelectLog = (logId: string) => {
    const newSelection = new Set(selectedLogs);
    if (newSelection.has(logId)) {
      newSelection.delete(logId);
    } else {
      newSelection.add(logId);
    }
    setSelectedLogs(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedLogs.size === logs.length) {
      setSelectedLogs(new Set());
    } else {
      setSelectedLogs(new Set(logs.map(log => log.id)));
        }
};

  const handleDeleteSelected = async () => {
    if (selectedLogs.size > 0) {
      await deleteLogs(Array.from(selectedLogs));
      setSelectedLogs(new Set());
        }
};

  const handleExportSelected = async () => {
    if (selectedLogs.size > 0) {
      await exportLogs(Array.from(selectedLogs));
    } else {
      await exportLogs(); // Export all if none selected
        }
};

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    if (ms < 3600000) return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
    return `${Math.floor(ms / 3600000)}h ${Math.floor((ms % 3600000) / 60000)}m`;
  };

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.successRate.toFixed(1)}%</div>
              <Progress value={analytics.successRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageDuration}</div>
              <p className="text-xs text-muted-foreground mt-1">Per execution</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.agentActivity.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Unique agents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pagination.totalItems}</div>
              <p className="text-xs text-muted-foreground mt-1">In selected range</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Crew Execution Logs
            </CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="auto-refresh" className="text-sm">
                Auto-refresh
              </Label>
              <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              {autoRefresh && (
                <Select
                  value={refreshInterval.toString()}
                onValueChange={(value: string) => setRefreshInterval(parseInt(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000">5s</SelectItem>
                    <SelectItem value="10000">10s</SelectItem>
                    <SelectItem value="30000">30s</SelectItem>
                    <SelectItem value="60000">1m</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select
                value={filters.agent || 'all'}
                onValueChange={(value: string) =>
                  updateFilters({ agent: value === 'all' ? undefined : value })
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All agents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All agents</SelectItem>
                  {analytics?.agentActivity.map(agent => (
                    <SelectItem key={agent.agent}

                value={agent.agent}>
                      {agent.agent} ({agent.totalExecutions})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.timeRange || '24h'}
                onValueChange={(value: string) => updateFilters({ timeRange: value as '1h' | '6h' | '24h' | '7d' | '30d' })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="6h">Last 6 hours</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.status || 'all'}
                onValueChange={(value: string) =>
                  updateFilters({ status: value === 'all' ? undefined : (value as 'success' | 'failure') })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={fetchLogs} disabled={loading}>
                <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
              </Button>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedLogs.size === logs.length ? 'Deselect All' : 'Select All'}
              </Button>

              {selectedLogs.size > 0 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteSelected}
      className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete ({selectedLogs.size})
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportSelected}>
                    <Download className="h-4 w-4 mr-1" />
                    Export ({selectedLogs.size})
                  </Button>
                </>
              )}

              {selectedLogs.size === 0 && (
                <Button variant="outline" size="sm" onClick={() => exportLogs()}>
                  <Download className="h-4 w-4 mr-1" />
                  Export All
                </Button>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Cleanup
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cleanup Old Logs</DialogTitle>
                    <DialogDescription>
                      This will permanently delete all logs older than 30 days. This action cannot
                      be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive" onClick={cleanupOldLogs}>
                      Cleanup Logs
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {loading && logs.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
              Loading logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No logs found for the selected filters
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left text-sm text-muted-foreground">
                    <th className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedLogs.size === logs.length} onChange={handleSelectAll} className="rounded"
                      />
                    </th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Agent</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedLogs.has(log.id)}
                          onChange={() => handleSelectLog(log.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={log.status === 'success' ? 'default' : 'destructive'} className="gap-1"
                        >
                          {log.status === 'success' ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {log.status}
                        </Badge>
                      </td>
                      <td className="p-4 font-medium">{log.agentName}</td>
                      <td className="p-4">
                        <Badge variant="outline">{log.executionType}</Badge>
                      </td>
                      <td className="p-4 text-sm">{formatDuration(log.duration)}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {format(new Date(log.timestamp), 'MMM d, HH:mm:ss')}
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" onClick={() => setShowLogDetail(log)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {logs.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
                {Math.min(pagination.page * pagination.pageSize, pagination.totalItems)} of{' '}
                {pagination.totalItems} logs
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={pagination.pageSize.toString()}
                onValueChange={(value: string) => setPageSize(parseInt(value))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={previousPage} disabled={!pagination.hasPreviousPage}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage} disabled={!pagination.hasNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Log Detail Dialog */}
      {showLogDetail && (
        <Dialog open={!!showLogDetail} onOpenChange={() => setShowLogDetail(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Log Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Agent</Label>
                  <p className="font-medium">{showLogDetail.agentName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Execution Type</Label>
                  <p className="font-medium">{showLogDetail.executionType}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <Badge variant={showLogDetail.status === 'success' ? 'default' : 'destructive'}>
                    {showLogDetail.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Duration</Label>
                  <p className="font-medium">{formatDuration(showLogDetail.duration)}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm text-muted-foreground">Timestamp</Label>
                  <p className="font-medium">{format(new Date(showLogDetail.timestamp), 'PPpp')}</p>
                </div>
              </div>

              {showLogDetail.input !== null && showLogDetail.input !== undefined && (
                <div>
                  <Label className="text-sm text-muted-foreground">Input</Label>
                  <pre className="mt-1 p-3 bg-muted rounded text-sm overflow-x-auto">
                    {String(
                      typeof showLogDetail.input === 'string'
                        ? showLogDetail.input
                        : JSON.stringify(showLogDetail.input, null, 2) || ''
                    )}
                  </pre>
                </div>
              )}

              {showLogDetail.output !== null && showLogDetail.output !== undefined && (
                <div>
                  <Label className="text-sm text-muted-foreground">Output</Label>
                  <pre className="mt-1 p-3 bg-muted rounded text-sm overflow-x-auto">
                    {String(
                      typeof showLogDetail.output === 'string'
                        ? showLogDetail.output
                        : JSON.stringify(showLogDetail.output, null, 2) || ''
                    )}
                  </pre>
                </div>
              )}

              {showLogDetail.error && (
                <div>
                  <Label className="text-sm text-muted-foreground text-destructive">Error</Label>
                  <pre className="mt-1 p-3 bg-destructive/10 text-destructive rounded text-sm overflow-x-auto">
                    {showLogDetail.error}
                  </pre>
                </div>
              )}

              {showLogDetail.metadata && (
                <div>
                  <Label className="text-sm text-muted-foreground">Metadata</Label>
                  <pre className="mt-1 p-3 bg-muted rounded text-sm overflow-x-auto">
                    {JSON.stringify(showLogDetail.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
