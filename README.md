# Thuyen Silk - Redis Pub/Sub System

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
