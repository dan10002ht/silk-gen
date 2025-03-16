# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Production stage
FROM node:18-alpine

# Install dependencies required for production
RUN apk add --no-cache tzdata

# Set working directory
WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src ./src

# Set environment variables
ENV NODE_ENV=production
ENV TZ=UTC

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Default command (will be overridden by docker-compose)
CMD ["node", "src/index.js"] 