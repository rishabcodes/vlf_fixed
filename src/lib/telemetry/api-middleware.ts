import { NextRequest, NextResponse } from 'next/server';
import { trace, context, SpanStatusCode, SpanKind } from '@opentelemetry/api';
import { apiLogger } from '@/lib/safe-logger';

export type RouteHandler = (
  request: NextRequest,
  params?: { params: Record<string, string> }
) => Promise<NextResponse> | NextResponse;

interface TracingOptions {
  spanName?: string;
  attributes?: Record<string, string | number | boolean>;
}

export function withTracing(handler: RouteHandler, options: TracingOptions = {}): RouteHandler {
  return async (request: NextRequest, params?: { params: Record<string, string> }) => {
    const tracer = trace.getTracer('vasquez-law-api');
    const spanName = options.spanName || `${request.method} ${request.nextUrl.pathname}`;

    const span = tracer.startSpan(spanName, {
      kind: SpanKind.SERVER,
      attributes: {
        'http.method': request.method,
        'http.url': request.url,
        'http.target': request.nextUrl.pathname,
        'http.host': request.headers.get('host') || '',
        'http.scheme': request.nextUrl.protocol.replace(':', ''),
        'http.user_agent': request.headers.get('user-agent') || '',
        ...options.attributes,
      },
    });

    return context.with(trace.setSpan(context.active(), span), async () => {
      const startTime = Date.now();

      try {
        const response = await handler(request, params);
        const duration = Date.now() - startTime;

        span.setAttributes({
          'http.status_code': response.status,
          'http.response_content_length': response.headers.get('content-length') || 0,
          'http.duration': duration,
        });

        if (response.status >= 400) {
          span.setStatus({ code: SpanStatusCode.ERROR });
        }

        apiLogger.info(
          'API request completed',
          {
            method: request.method,
            path: request.nextUrl.pathname,
            status: response.status,
            duration,
            traceId: span.spanContext().traceId,
            spanId: span.spanContext().spanId,
          }
        );

        return response;
      } catch (error) {
        span.recordException(error as Error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error instanceof Error ? error.message : 'Unknown error',
        });

        apiLogger.error(
          'API request failed',
          {
            method: request.method,
            path: request.nextUrl.pathname,
            error: error instanceof Error ? error.message : error,
            traceId: span.spanContext().traceId,
            spanId: span.spanContext().spanId,
          }
        );

        throw error;
      } finally {
        span.end();
      }
    });
  };
}

export function withLeadCaptureTracing(handler: RouteHandler): RouteHandler {
  return withTracing(handler, {
    spanName: 'lead.capture',
    attributes: {
      'vlf.operation': 'lead_capture',
    },
  });
}

export function withPaymentTracing(handler: RouteHandler): RouteHandler {
  return withTracing(handler, {
    spanName: 'payment.process',
    attributes: {
      'vlf.operation': 'payment',
    },
  });
}

export function withAIAgentTracing(handler: RouteHandler): RouteHandler {
  return withTracing(handler, {
    spanName: 'ai.agent',
    attributes: {
      'vlf.operation': 'ai_agent',
    },
  });
}

export function withDatabaseTracing(handler: RouteHandler): RouteHandler {
  return withTracing(handler, {
    spanName: 'database.query',
    attributes: {
      'vlf.operation': 'database',
    },
  });
}
