/**
 * User controller
 * Handles user management operations
 */
import UserService from '../../services/userService.js';

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const profile = await UserService.getUserById(userId);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userData = req.body;
    const updatedUser = await UserService.updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, filter } = req.query;
    const users = await UserService.getAllUsers({ page, limit, sort, filter });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await UserService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await UserService.updateUser(id, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
