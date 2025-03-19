import { Router } from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import {
  login,
  register,
  forgotPassword,
  logout,
  changePassword,
  getCurrentUser,
} from '../../controllers/v1/authController.js';

const router = Router();

// Public routes
router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);

// Protected routes
router.use(protect); // All routes below this will require authentication

router.post('/logout', logout);
router.post('/change-password', changePassword);
router.get('/me', getCurrentUser);

export default router;
