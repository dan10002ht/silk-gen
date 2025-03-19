/**
 * V1 Health check controller
 * Provides version-specific health check endpoints
 */

/**
 * Check the API v1 health
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const checkV1Health = (req, res) => {
  res.status(200).json({
    status: 'ok',
    version: 'v1',
    timestamp: new Date().toISOString(),
  });
};
