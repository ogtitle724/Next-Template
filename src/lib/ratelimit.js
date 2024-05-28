import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const rateLimiter = new Ratelimit({
  limiter: Ratelimit.slidingWindow(
    process.env.UPSTASH_LIMIT_TOKEN,
    process.env.UPSTASH_LIMIT_INTERVAL
  ),
  redis: Redis.fromEnv(),
  analytics: true,
  ephemeralCache: undefined,
  prefix: "@upstash/ratelimit",
  timeout: undefined,
});

export default async function rateLimit(identifier) {
  try {
    const result = await rateLimiter.limit(identifier);
    return result;
  } catch (err) {
    console.error(err.message);
  }
}
