import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory rate limiter (resets on cold start, sufficient for serverless)
const requests = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_GENERATE = 5; // max 5 PTS generations per minute
const MAX_REQUESTS_SYNTHESIZE = 15; // max 15 synthesis calls per minute

function getClientKey(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || 'unknown';
  const auth = req.headers.authorization?.slice(0, 20) || 'anon';
  return `${ip}:${auth}`;
}

export function rateLimit(req: VercelRequest, res: VercelResponse, maxRequests: number): boolean {
  const key = getClientKey(req);
  const now = Date.now();

  const entry = requests.get(key);

  if (!entry || now > entry.resetAt) {
    requests.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.setHeader('Retry-After', retryAfter.toString());
    res.status(429).json({
      error: 'Muitas requisições. Aguarde antes de tentar novamente.',
      retryAfter,
    });
    return false;
  }

  entry.count++;
  return true;
}

export function rateLimitGenerate(req: VercelRequest, res: VercelResponse): boolean {
  return rateLimit(req, res, MAX_REQUESTS_GENERATE);
}

export function rateLimitSynthesize(req: VercelRequest, res: VercelResponse): boolean {
  return rateLimit(req, res, MAX_REQUESTS_SYNTHESIZE);
}

// Cleanup stale entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of requests) {
    if (now > entry.resetAt) {
      requests.delete(key);
    }
  }
}, 60 * 1000);
