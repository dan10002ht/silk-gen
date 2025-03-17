import { SCHEDULES, cronManager } from '../../config/cron.js';
import { Publisher } from '../../config/redis.js';

// Cleanup job for unused topics
const cleanupUnusedTopics = async () => {
  try {
    // Get active topics and their status
    const activeTopics = Publisher.getActiveTopics();
    console.log('Active topics before cleanup:', activeTopics);

    // Topics cleanup is handled automatically by TopicsManager
    // We can force a cleanup by getting topic status which triggers the cleanup process
    activeTopics.forEach(topic => {
      Publisher.getTopicStatus(topic);
    });

    console.log('Topics cleanup completed');
  } catch (error) {
    console.error('Error cleaning up unused topics:', error);
    throw error;
  }
};

// Register the cleanup job
cronManager.addJob('cleanup-unused-topics', SCHEDULES.DAILY_3AM, cleanupUnusedTopics, {
  timezone: 'UTC',
  onError: async error => {
    console.error('Failed to cleanup unused topics:', error);
  },
});

export { cleanupUnusedTopics };
