import { NextRequest, NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/rate-limiter';

// Rate limiter instances
const apiLimiter = new RateLimiter(100, 60 * 1000); // 100 requests per minute

const webhookLimiter = new RateLimiter(500, 60 * 1000); // 500 requests per minute for webhooks

export async function securityMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Apply rate limiting
  if (path.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const limiter = path.includes('webhook') ? webhookLimiter : apiLimiter;

    const { allowed, retryAfter } = await limiter.checkLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Reset': retryAfter ? retryAfter.toString() : '60',
          },
        }
      );
    }
  }

  // Validate webhook signatures
  if (path.includes('webhook')) {
    const signature = request.headers.get('x-webhook-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // Implement proper signature validation based on provider
    // This is a more secure implementation
    const body = await request.text();
    const provider = path.includes('retell') ? 'retell' : 'nextiva';
    const secret = process.env[`${provider.toUpperCase()}_WEBHOOK_SECRET`];

    // Use Web Crypto API for edge runtime compatibility
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret || ''),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body));

    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const signatureValid = signature === expectedSignature;

    if (!signatureValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
