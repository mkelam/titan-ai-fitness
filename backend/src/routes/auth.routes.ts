import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/register - Create new account
router.post('/register', authController.register);

// POST /api/auth/login - Email/password login
router.post('/login', authController.login);

// POST /api/auth/google - Google OAuth login
router.post('/google', authController.googleLogin);

// POST /api/auth/apple - Apple OAuth login
router.post('/apple', authController.appleLogin);

// POST /api/auth/refresh - Refresh JWT token
router.post('/refresh', authController.refreshToken);

// POST /api/auth/logout - Invalidate session
router.post('/logout', authController.logout);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/reset-password - Set new password
router.post('/reset-password', authController.resetPassword);

export default router;
