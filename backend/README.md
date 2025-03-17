# Backend Documentation

## Overview

The backend is a Node.js/Express application that provides the API and business logic for the Thuyen Silk inventory management system.

## Features

- RESTful API endpoints
- PostgreSQL database with Sequelize ORM
- Redis pub/sub system for real-time events
- Background job processing
- Cron jobs for maintenance tasks
- JWT authentication
- Input validation
- Error handling
- Logging system

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utilities
│   └── cron/           # Cron jobs
├── tests/              # Test files
└── scripts/            # Maintenance scripts
```

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Configure your `.env` file:

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

4. Set up the database:

```bash
yarn db:setup
```

## Development

### Running the Server

```bash
# Development mode with integrated cron jobs
yarn dev

# Development mode without cron jobs
yarn dev:app

# Development mode with only cron jobs
yarn dev:cron
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

## API Documentation

### Authentication

All API endpoints except `/auth/login` and `/auth/register` require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Available Endpoints

#### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh JWT token

#### Products

- `GET /products` - List all products
- `GET /products/:id` - Get product details
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

#### Inventory

- `GET /inventory` - List inventory items
- `GET /inventory/:id` - Get inventory item details
- `POST /inventory` - Add inventory item
- `PUT /inventory/:id` - Update inventory item
- `DELETE /inventory/:id` - Delete inventory item

## Background Processing

### Redis Pub/Sub System

The application uses Redis for real-time event processing:

```javascript
import { Publisher, TOPICS } from './config/redis';

// Publish a message
await Publisher.publish(TOPICS.INVENTORY, {
  type: 'stock_update',
  data: {
    productId: 'PROD123',
    quantity: 50,
    warehouse: 'WH001',
  },
});
```

### Cron Jobs

The application includes several maintenance cron jobs:

1. **Topic Cleanup** (`cleanup-unused-topics`)
   - Schedule: Daily at 3 AM UTC
   - Purpose: Cleans up unused Redis topics
   - Configuration: Adjust `TOPIC_CLEANUP_INTERVAL` in `.env`

## Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Test Structure

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── e2e/           # End-to-end tests
```

## Error Handling

The application uses a centralized error handling system:

```javascript
// Example error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      code: err.code,
    },
  });
});
```

## Logging

The application uses Winston for logging:

```javascript
import { logger } from './utils/logger';

logger.info('Application started');
logger.error('Error occurred', { error });
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

This project is licensed under the MIT License.
