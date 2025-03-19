/**
 * Health check controller
 * Provides endpoints for monitoring system health
 */

/**
 * Check the API health
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const checkHealth = (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
}; 