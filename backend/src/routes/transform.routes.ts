import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as transformController from '../controllers/transform.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// POST /api/transform/analyze - Analyze body photo with Gemini Vision
router.post('/analyze', transformController.analyzePhoto);

// POST /api/transform/generate - Generate body transformation with Imagen
router.post('/generate', transformController.generateTransformation);

// GET /api/transform/history - Get transformation history
router.get('/history', transformController.getHistory);

// GET /api/transform/:id - Get specific transformation
router.get('/:id', transformController.getTransformation);

export default router;
