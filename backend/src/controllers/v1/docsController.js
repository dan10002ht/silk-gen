/**
 * V1 API Documentation controller
 * Handles endpoints related to V1 API documentation
 */

/**
 * Redirect to the API documentation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const redirectToApiDocs = (req, res) => {
  res.redirect('/api-docs');
}; 