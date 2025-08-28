// Custom OpenTelemetry spans for enhanced observability

export interface SpanOptions {
  name: string;
  attributes?: Record<string, string | number | boolean>;
  operation?: string;
}

export function createCustomSpan(options: SpanOptions) {
  // Mock implementation - in production would use actual OpenTelemetry
  return {
    setAttributes: (attrs: Record<string, unknown>) => {
      // Mock span attributes
    },
    setStatus: (status: { code: number; message?: string }) => {
      // Mock span status
    },
    end: () => {
      // Mock span end
    },
  };
}

export function withSpan<T>(
  spanName: string,
  fn: () => T,
  attributes?: Record<string, string | number | boolean>
): T {
  const span = createCustomSpan({ name: spanName, attributes });
  try {
    const result = fn();
    span.setStatus({ code: 0 }); // OK
    return result;
  } catch (error) {
    span.setStatus({ code: 2, message: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  } finally {
    span.end();
  }
}
