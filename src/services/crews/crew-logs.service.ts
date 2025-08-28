import { CrewLogFilters, CrewLogsResponse, CrewLogAction } from '@/types/crews';

class CrewLogsService {
  private baseUrl = '/api/crews/logs';

  async getLogs(filters?: CrewLogFilters): Promise<CrewLogsResponse> {
    const params = new URLSearchParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch crew logs');
    }

    return response.json();
  }

  async performAction(
    action: CrewLogAction
  ): Promise<{ success: boolean; message: string; data: unknown }> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to perform action');
    }

    return response.json();
  }

  async deleteLogs(logIds: string[]): Promise<{ success: boolean; message: string }> {
    return this.performAction({ action: 'delete', logIds });
  }

  async exportLogs(logIds?: string[]): Promise<{ success: boolean; message: string; data: unknown }> {
    return this.performAction({ action: 'export', logIds });
  }

  async cleanupOldLogs(): Promise<{ success: boolean; message: string; deletedCount: number }> {
    const result = await this.performAction({ action: 'cleanup' });
    return {
      success: result.success,
      message: result.message,
      deletedCount: typeof result.data === 'object' && result.data !== null && 'deletedCount' in result.data 
        ? (result.data as { deletedCount: number }).deletedCount 
        : 0
    };
  }

  // Helper method to download exported logs
  downloadExport(data: unknown, filename: string = 'crew-logs-export.json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const crewLogsService = new CrewLogsService();
