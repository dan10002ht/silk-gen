import Redis from 'ioredis';
import environment from './environment';

// Redis client configuration
const redisClient = new Redis(environment.REDIS_URL, {
  retryStrategy: times => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Core topics for the application
export const TOPICS = {
  NOTIFICATION: 'notification',
  INVENTORY: 'inventory',
  ORDER: 'order',
  SYSTEM: 'system',
};

// Topics manager for handling dynamic topics
class TopicsManager {
  constructor() {
    this.topics = new Set(Object.values(TOPICS));
    this.lastUsed = new Map();
  }

  async addTopic(topic) {
    if (!this.topics.has(topic)) {
      this.topics.add(topic);
      this.lastUsed.set(topic, new Date());
    }
  }

  async updateLastUsed(topic) {
    this.lastUsed.set(topic, new Date());
  }

  async cleanupUnusedTopics() {
    const now = new Date();
    const cleanupInterval = environment.TOPIC_CLEANUP_INTERVAL * 60 * 60 * 1000; // Convert hours to milliseconds

    for (const [topic, lastUsed] of this.lastUsed.entries()) {
      if (!Object.values(TOPICS).includes(topic)) {
        const timeSinceLastUse = now - lastUsed;
        if (timeSinceLastUse > cleanupInterval) {
          // Check if topic has any subscribers
          const subscriberCount = await redisClient.pubsub('numsub', topic);
          if (subscriberCount[topic] === 0) {
            this.topics.delete(topic);
            this.lastUsed.delete(topic);
            console.log(`Cleaned up unused topic: ${topic}`);
          }
        }
      }
    }
  }

  getActiveTopics() {
    return {
      core: Object.values(TOPICS),
      dynamic: Array.from(this.topics).filter(topic => !Object.values(TOPICS).includes(topic)),
    };
  }

  getTopicStatus(topic) {
    return {
      exists: this.topics.has(topic),
      isCore: Object.values(TOPICS).includes(topic),
      lastUsed: this.lastUsed.get(topic),
    };
  }
}

// Create a single instance of TopicsManager
const topicsManager = new TopicsManager();

// Publisher class for handling message publishing
export class Publisher {
  static async publish(topic, message) {
    try {
      // Add topic to manager if it's not a core topic
      if (!Object.values(TOPICS).includes(topic)) {
        await topicsManager.addTopic(topic);
      }

      // Update last used timestamp
      await topicsManager.updateLastUsed(topic);

      // Publish message
      await redisClient.publish(topic, JSON.stringify(message));
      console.log(`Published message to topic: ${topic}`);
    } catch (error) {
      console.error(`Error publishing message to topic ${topic}:`, error);
      throw error;
    }
  }

  static getActiveTopics() {
    return topicsManager.getActiveTopics();
  }

  static getTopicStatus(topic) {
    return topicsManager.getTopicStatus(topic);
  }

  static async cleanupUnusedTopics() {
    await topicsManager.cleanupUnusedTopics();
  }
}

// Subscriber class for handling message subscriptions
export class Subscriber {
  constructor() {
    this.subscriptions = new Map();
  }

  async subscribe(topic, callback) {
    try {
      if (!this.subscriptions.has(topic)) {
        await redisClient.subscribe(topic);
        this.subscriptions.set(topic, new Set());
      }
      this.subscriptions.get(topic).add(callback);
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error(`Error subscribing to topic ${topic}:`, error);
      throw error;
    }
  }

  async unsubscribe(topic, callback) {
    try {
      const callbacks = this.subscriptions.get(topic);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          await redisClient.unsubscribe(topic);
          this.subscriptions.delete(topic);
        }
      }
      console.log(`Unsubscribed from topic: ${topic}`);
    } catch (error) {
      console.error(`Error unsubscribing from topic ${topic}:`, error);
      throw error;
    }
  }
}

// Set up message handling
redisClient.on('message', (topic, message) => {
  try {
    const parsedMessage = JSON.parse(message);
    console.log(`Received message from topic ${topic}:`, parsedMessage);
    // Handle message processing here
  } catch (error) {
    console.error(`Error processing message from topic ${topic}:`, error);
  }
});

// Error handling
redisClient.on('error', error => {
  console.error('Redis connection error:', error);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

export { redisClient };
