import userService from '../services/userService.js';
import { validateCreateUser, validateUpdateUser } from '../validators/userValidator.js';

class UserController {
  async createUser(req, res, next) {
    try {
      // HTTP: Validate request body
      const validatedData = await validateCreateUser(req.body);

      // Delegate to service
      const user = await userService.createUser(validatedData);

      // HTTP: Format response
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      // HTTP: Get params and validate body
      const { id } = req.params;
      const validatedData = await validateUpdateUser(req.body);

      // Delegate to service
      const updated = await userService.updateUser(id, validatedData);

      // HTTP: Format response
      res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      // HTTP: Get user ID from auth middleware and validate body
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;

      // Delegate to service
      await userService.changePassword(userId, oldPassword, newPassword);

      // HTTP: Format response
      res.json({
        success: true,
        message: 'Password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserProfile(req, res, next) {
    try {
      // HTTP: Get user ID from auth middleware
      const userId = req.user.id;

      // Delegate to service
      const profile = await userService.getUserProfile(userId);

      // HTTP: Format response
      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
