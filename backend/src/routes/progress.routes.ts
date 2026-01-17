import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as progressController from '../controllers/progress.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/progress - Get progress history
router.get('/', progressController.getProgress);

// POST /api/progress/checkin - Log weight and/or photos
router.post('/checkin', progressController.createCheckin);

// GET /api/progress/photos - List all progress photos
router.get('/photos', progressController.getPhotos);

// DELETE /api/progress/photos/:id - Delete a progress photo
router.delete('/photos/:id', progressController.deletePhoto);

export default router;
