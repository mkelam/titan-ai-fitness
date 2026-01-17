import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as nutritionController from '../controllers/nutrition.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/nutrition - Get nutrition log
router.get('/', nutritionController.getNutrition);

// POST /api/nutrition/log - Log a meal
router.post('/log', nutritionController.logMeal);

// GET /api/nutrition/daily/:date - Get daily nutrition summary
router.get('/daily/:date', nutritionController.getDailySummary);

// DELETE /api/nutrition/:id - Delete meal entry
router.delete('/:id', nutritionController.deleteMeal);

export default router;
