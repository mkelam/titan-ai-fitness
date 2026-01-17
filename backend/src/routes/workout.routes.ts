import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as workoutController from '../controllers/workout.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/workouts - List all workouts
router.get('/', workoutController.getWorkouts);

// POST /api/workouts - Create new workout
router.post('/', workoutController.createWorkout);

// GET /api/workouts/:id - Get single workout
router.get('/:id', workoutController.getWorkout);

// PUT /api/workouts/:id - Update workout
router.put('/:id', workoutController.updateWorkout);

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', workoutController.deleteWorkout);

export default router;
