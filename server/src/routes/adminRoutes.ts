import { Router } from 'express';
import { authenticate, isAdmin } from '../middleware/auth';
import {
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  getStats
} from '../controllers/adminController';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate, isAdmin);

router.get('/users', getAllUsers);
router.put('/users/:userId/status', toggleUserStatus);
router.delete('/users/:userId', deleteUser);
router.get('/stats', getStats);

export default router;
