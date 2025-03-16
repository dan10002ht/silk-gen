# Thuyen Silk - Inventory Management System

A robust Redis-based publish/subscribe system for handling real-time events and background processing in the Thuyen Silk inventory management system.

## Features

- **Dynamic Topic Management**

  - Core (predefined) topics
  - Dynamic topic creation
  - Automatic cleanup of unused topics
  - Topic usage tracking

- **Background Processing**

  - Asynchronous message handling
  - Error handling and retries
  - Non-blocking operations

- **Flexible Message Types**
  - Structured message format
  - Type-safe message publishing
  - Custom event handling

## Prerequisites

- Node.js (v16 or higher)
- Redis Server (v6 or higher)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd thuyen-silk
   ```

2. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Set up Redis**

   Windows (WSL):

   ```bash
   wsl sudo apt-get install redis-server
   wsl sudo service redis-server start
   ```

   Mac:

   ```bash
   brew install redis
   brew services start redis
   ```

   Linux:

   ```bash
   sudo apt-get install redis-server
   sudo systemctl start redis
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your Redis configuration:
   ```env
   REDIS_URL=redis://localhost:6379
   TOPIC_CLEANUP_INTERVAL=24
   ```

## Usage

### Running the Example

```bash
npm run example:pubsub
```

### Core Topics

```javascript
import { Publisher, TOPICS } from './config/redis';

// Publish to notification topic
await Publisher.publish(TOPICS.NOTIFICATION, {
  type: 'email',
  data: {
    to: 'user@example.com',
    subject: 'Welcome',
    content: 'Welcome to our platform!',
  },
});

// Publish inventory update
await Publisher.publish(TOPICS.INVENTORY, {
  type: 'stock_update',
  data: {
    productId: 'PROD123',
    quantity: 50,
    warehouse: 'WH001',
  },
});
```

### Dynamic Topics

```javascript
// Create and publish to a custom topic
await Publisher.publish('custom_alerts', {
  type: 'system_warning',
  data: {
    level: 'warning',
    message: 'High CPU usage detected',
  },
});

// Check topic status
const status = Publisher.getTopicStatus('custom_alerts');
console.log(status);
// {
//   exists: true,
//   isCore: false,
//   lastUsed: "2024-03-16T10:30:00.000Z"
// }
```

### Topic Management

```javascript
// Get all active topics
const topics = Publisher.getActiveTopics();
console.log(topics);
// {
//   core: ['notification', 'inventory', 'order', 'system'],
//   dynamic: ['custom_alerts', 'other_topic']
// }
```

## Available Topics

### Core Topics

- `NOTIFICATION`: User notifications (email, SMS, push)
- `INVENTORY`: Stock updates and alerts
- `ORDER`: Order processing events
- `SYSTEM`: System-level events

### Dynamic Topics

- Created automatically when needed
- Cleaned up if unused for 24 hours (configurable)
- No predefinition required

## Message Structure

```javascript
{
  type: 'event_type',
  data: {
    // Event-specific data
  }
}
```

## Monitoring

### Redis CLI

```bash
redis-cli
> MONITOR
```

### Topic Status

```javascript
const status = Publisher.getTopicStatus('topic_name');
// Returns:
// {
//   exists: boolean,
//   isCore: boolean,
//   lastUsed: Date
// }
```

## Error Handling

The system includes comprehensive error handling:

- Connection errors
- Publishing errors
- Subscription errors
- Message processing errors

## Best Practices

1. **Topic Naming**

   - Use lowercase for topic names
   - Use underscores for multi-word topics
   - Keep names descriptive but concise

2. **Message Structure**

   - Always include `type` and `data`
   - Keep data structure consistent per type
   - Validate data before publishing

3. **Error Handling**
   - Always wrap pub/sub operations in try-catch
   - Implement proper error logging
   - Handle reconnection scenarios

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Running the Application

### Prerequisites

- Node.js (v16 or higher)
- Redis Server (v6 or higher)
- PostgreSQL (v14 or higher)
- Yarn or npm

### Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=thuyen_silk
DB_USER=your_username
DB_PASSWORD=your_password

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Cron Configuration
CRON_STANDALONE=false
TOPIC_CLEANUP_INTERVAL=24
```

### Installation

```bash
# Install dependencies
yarn install

# Set up the database
yarn db:setup
```

### Running the Application

#### Development Mode (Integrated Cron Jobs)

In this mode, the application and cron jobs run in the same process:

```bash
# Start the application with integrated cron jobs
yarn dev
# or
npm run dev
```

#### Production Mode (Separate Processes)

For production, you can run the application and cron jobs in separate processes:

1. Terminal 1 - Main Application:

```bash
# Set CRON_STANDALONE=false in .env
yarn start
# or
npm start
```

2. Terminal 2 - Standalone Cron Server:

```bash
# Set CRON_STANDALONE=true in .env
yarn cron
# or
npm run cron
```

### Available Scripts

```bash
# Development
yarn dev           # Start development server with integrated cron
yarn dev:app      # Start only the application server
yarn dev:cron     # Start only the cron server

# Production
yarn start        # Start production server
yarn cron         # Start cron server separately

# Database
yarn db:migrate   # Run database migrations
yarn db:seed      # Seed the database
yarn db:reset     # Reset and reseed the database

# Testing
yarn test         # Run all tests
yarn test:watch   # Run tests in watch mode

# Linting
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint errors
```

### Monitoring Cron Jobs

You can monitor the status of cron jobs through the application logs. Each cron job will log:

- When it starts running
- When it completes successfully
- Any errors that occur during execution

Example log output:

```
🚀 Starting cron server...
✅ Cron server is running
📅 Registered cron job: cleanup-unused-topics with schedule: 0 3 * * *
🕒 Starting cron job: cleanup-unused-topics
✅ Completed cron job: cleanup-unused-topics
```

### Available Cron Jobs

1. **Topic Cleanup** (`cleanup-unused-topics`)
   - Schedule: Daily at 3 AM UTC
   - Purpose: Cleans up unused Redis topics
   - Configuration: Adjust `TOPIC_CLEANUP_INTERVAL` in `.env`

### Troubleshooting

1. **Redis Connection Issues**

   - Ensure Redis server is running
   - Verify REDIS_URL in .env
   - Check Redis logs for errors

2. **Cron Jobs Not Running**

   - Check if the correct process is running
   - Verify environment variables
   - Check system time and timezone settings

3. **Process Shutdown Issues**
   - Use `ps aux | grep node` to check running processes
   - Kill processes manually if needed: `kill -9 <PID>`

### Adding New Cron Jobs

To add a new cron job:

1. Create a new file in `backend/src/cron/jobs/`
2. Import and register the job in `cron/index.js`
3. Use the predefined schedules from `config/cron.js`

Example:

```javascript
// backend/src/cron/jobs/myNewJob.js
import { SCHEDULES, cronManager } from '../../config/cron.js';

const myNewJob = async () => {
  // Job logic here
};

cronManager.addJob('my-new-job', SCHEDULES.HOURLY, myNewJob, {
  timezone: 'UTC',
  onError: error => {
    console.error('Job failed:', error);
  },
});
```

## Docker Setup

### Project Structure

```
backend/
├── Dockerfile          # Production Dockerfile
├── Dockerfile.dev      # Development Dockerfile
├── docker-compose.yml  # Production compose file
├── docker-compose.dev.yml # Development compose file
├── .dockerignore      # Files to exclude from Docker build
└── src/               # Application source code
```

### Development Environment Setup

1. **Clone the repository and navigate to backend**:

```bash
git clone <repository-url>
cd thuyen-silk/backend
```

2. **Create development environment file**:

```bash
cp .env.example .env.development

# Edit .env.development with development values:
NODE_ENV=development
PORT=3000
REDIS_URL=redis://redis:6379
DB_HOST=postgres
DB_PORT=5432
DB_NAME=thuyen_silk
DB_USER=postgres
DB_PASSWORD=postgres
CRON_STANDALONE=false
```

3. **Start development environment**:

```bash
# Build and start all services
docker-compose -f docker-compose.dev.yml up --build

# Or start in detached mode
docker-compose -f docker-compose.dev.yml up --build -d
```

4. **Development Features**:

- Hot-reloading enabled (code changes reflect immediately)
- Source code mounted as volume
- Development dependencies included
- All ports exposed for debugging
- PostgreSQL and Redis data persisted in named volumes

5. **Common Development Commands**:

```bash
# View logs in real-time
docker-compose -f docker-compose.dev.yml logs -f

# View logs of specific service
docker-compose -f docker-compose.dev.yml logs -f app
docker-compose -f docker-compose.dev.yml logs -f cron

# Restart a service
docker-compose -f docker-compose.dev.yml restart app

# Run database migrations
docker-compose -f docker-compose.dev.yml exec app yarn migrate

# Access PostgreSQL
docker-compose -f docker-compose.dev.yml exec postgres psql -U postgres -d thuyen_silk

# Access Redis CLI
docker-compose -f docker-compose.dev.yml exec redis redis-cli

# Stop all services
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes
docker-compose -f docker-compose.dev.yml down -v
```

### Production Environment Setup

1. **Prepare Production Environment**:

```bash
# Create production env file
cp .env.example .env.production

# Edit .env.production with secure production values:
NODE_ENV=production
PORT=3000
REDIS_URL=redis://redis:6379
DB_HOST=postgres
DB_PORT=5432
DB_NAME=thuyen_silk
DB_USER=your_secure_username
DB_PASSWORD=your_secure_password
CRON_STANDALONE=false
```

2. **Build and Deploy Production**:

```bash
# Build and start all services
docker-compose up --build -d

# Verify services are running
docker-compose ps
```

3. **Production Features**:

- Multi-stage builds for smaller images
- Only production dependencies included
- Optimized for performance
- Health checks enabled
- Automatic container restart
- Secure environment variable handling

4. **Common Production Commands**:

```bash
# View logs in real-time
docker-compose logs -f

# Check service health
docker-compose ps

# Scale services (if needed)
docker-compose up -d --scale app=2

# Update single service
docker-compose up -d --no-deps --build app

# Backup database
docker-compose exec postgres pg_dump -U postgres thuyen_silk > backup.sql

# Monitor resource usage
docker stats

# Graceful shutdown
docker-compose down
```

### Database Management

1. **Development Database**:

```bash
# Create a new migration
docker-compose -f docker-compose.dev.yml exec app yarn migrate:create

# Run migrations
docker-compose -f docker-compose.dev.yml exec app yarn migrate

# Seed database
docker-compose -f docker-compose.dev.yml exec app yarn seed

# Reset database
docker-compose -f docker-compose.dev.yml exec app yarn db:reset
```

2. **Production Database**:

```bash
# Backup before migrations
docker-compose exec postgres pg_dump -U $DB_USER $DB_NAME > backup.sql

# Run migrations
docker-compose exec app yarn migrate

# Verify database status
docker-compose exec app yarn db:status
```

### Monitoring & Debugging

1. **Container Logs**:

```bash
# All containers
docker-compose logs -f

# Specific service with timestamp
docker-compose logs -f --timestamps app
```

2. **Resource Usage**:

```bash
# Monitor all containers
docker stats

# Specific container
docker stats thuyen-silk-app
```

3. **Health Checks**:

```bash
# View health status
docker inspect --format='{{.State.Health.Status}}' thuyen-silk-app

# View health check logs
docker inspect --format='{{json .State.Health}}' thuyen-silk-app | jq
```

### Troubleshooting Guide

1. **Container Won't Start**:

```bash
# Check container logs
docker-compose logs app

# Verify environment variables
docker-compose config

# Check for port conflicts
netstat -tulpn | grep LISTEN
```

2. **Database Connection Issues**:

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Test database connection
docker-compose exec app node -e "
const { Pool } = require('pg');
const pool = new Pool();
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});"
```

3. **Redis Connection Issues**:

```bash
# Verify Redis is running
docker-compose exec redis redis-cli ping

# Monitor Redis
docker-compose exec redis redis-cli monitor
```

4. **Performance Issues**:

```bash
# Check container resources
docker stats

# View container processes
docker top thuyen-silk-app

# Check application logs for bottlenecks
docker-compose logs -f app
```

### Best Practices

1. **Security**:

- Never commit `.env` files
- Use secrets management in production
- Regularly update base images
- Scan images for vulnerabilities

2. **Performance**:

- Use multi-stage builds
- Minimize image layers
- Optimize Dockerfile caching
- Use production Node.js flags

3. **Maintenance**:

- Regularly backup volumes
- Monitor container health
- Set up container logging
- Implement proper shutdown handling
