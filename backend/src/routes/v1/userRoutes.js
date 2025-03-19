import { Router } from 'express';
import { authorize } from '../../middleware/authMiddleware.js';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/v1/userController.js';

const router = Router();

// Routes accessible by all authenticated users
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Routes accessible by managers and admins
router.use(authorize('manager', 'admin'));

router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Routes accessible only by admins
router.use(authorize('admin'));

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
