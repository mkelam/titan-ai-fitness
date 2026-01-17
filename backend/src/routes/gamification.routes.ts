import { Router } from 'express';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';
import * as gamificationController from '../controllers/gamification.controller';

const router = Router();

// GET /api/gamification/leaderboard - Public leaderboard
router.get('/leaderboard', optionalAuth, gamificationController.getLeaderboard);

// All other routes require authentication
router.use(authenticate);

// GET /api/gamification/stats - Get user stats
router.get('/stats', gamificationController.getStats);

// GET /api/gamification/quests - Get active quests
router.get('/quests', gamificationController.getQuests);

// POST /api/gamification/quests/:id/claim - Claim quest reward
router.post('/quests/:id/claim', gamificationController.claimQuest);

// GET /api/gamification/badges - Get all badges
router.get('/badges', gamificationController.getBadges);

// GET /api/gamification/shop - Get shop items
router.get('/shop', gamificationController.getShopItems);

// POST /api/gamification/shop/purchase - Purchase item
router.post('/shop/purchase', gamificationController.purchaseItem);

export default router;
