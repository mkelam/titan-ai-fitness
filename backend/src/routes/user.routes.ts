import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as userController from '../controllers/user.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/user/profile - Get current user profile
router.get('/profile', userController.getProfile);

// PUT /api/user/profile - Update profile
router.put('/profile', userController.updateProfile);

// PUT /api/user/avatar - Upload avatar
router.put('/avatar', userController.updateAvatar);

// DELETE /api/user/account - Delete account
router.delete('/account', userController.deleteAccount);

// GET /api/user/export - Export all user data
router.get('/export', userController.exportData);

export default router;
