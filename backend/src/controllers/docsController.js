/**
 * API Documentation controller
 * Handles endpoints related to API documentation
 */

/**
 * Redirect to the API documentation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const redirectToApiDocs = (req, res) => {
  res.redirect('/api/v1/docs');
};
