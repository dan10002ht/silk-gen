import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../config/redis.js';

// Create rate limiter with Redis store
const createRateLimiter = (options = {}) => {
  return rateLimit({
    store: new RedisStore({
      client: redisClient,
      prefix: 'rate-limit:',
    }),
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes by default
    max: options.max || 100, // Limit each IP to 100 requests per windowMs
    message: options.message || 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Different rate limiters for different routes
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again after 15 minutes',
});

export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests
});

export { createRateLimiter }; 