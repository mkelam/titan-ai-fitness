# /titan-endpoint

Implement a backend API endpoint with proper validation, error handling, and documentation.

## Instructions

When this skill is invoked, implement a fully functional API endpoint following project patterns.

### Required Arguments
- Endpoint path (e.g., "/api/workouts", "/api/user/profile")
- HTTP method (GET, POST, PUT, DELETE)
- Brief description of functionality

### Step 1: Identify Controller
Determine which controller file handles this endpoint:
- `/api/auth/*` → `auth.controller.ts`
- `/api/user/*` → `user.controller.ts`
- `/api/workouts/*` → `workout.controller.ts`
- `/api/progress/*` → `progress.controller.ts`
- `/api/transform/*` → `transform.controller.ts`
- `/api/nutrition/*` → `nutrition.controller.ts`
- `/api/gamification/*` → `gamification.controller.ts`

### Step 2: Implement Controller Function
Replace the stub implementation with working code:

```typescript
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middleware/error.middleware';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: string;
}

export const endpointName = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extract and validate input
    const { param1, param2 } = req.body;

    if (!param1) {
      throw new AppError('param1 is required', 400);
    }

    // 2. Perform database operation
    const result = await prisma.model.findMany({
      where: { userId: req.userId },
      include: { relatedModel: true }
    });

    // 3. Return response
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
```

### Step 3: Input Validation
Add proper validation for request body/params:

```typescript
// Validation helper (consider using Zod in production)
const validateInput = (data: any) => {
  const errors: string[] = [];

  if (!data.requiredField) {
    errors.push('requiredField is required');
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (errors.length > 0) {
    throw new AppError(errors.join(', '), 400);
  }
};
```

### Step 4: Error Handling
Use appropriate HTTP status codes:
- `200` - Success (GET, PUT)
- `201` - Created (POST)
- `204` - No Content (DELETE)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (not allowed)
- `404` - Not Found
- `500` - Server Error

### Step 5: Update Route (if needed)
Verify the route exists in the appropriate routes file:

```typescript
// routes/example.routes.ts
import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as controller from '../controllers/example.controller';

const router = Router();

router.use(authenticate); // Require auth for all routes

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.deleteOne);

export default router;
```

### Step 6: Add TypeScript Types
Define proper types for request/response:

```typescript
// Types for this endpoint
interface CreateWorkoutRequest {
  date: string;
  exercises: {
    name: string;
    muscleGroup: string;
    sets: { reps: number; weight: number }[];
  }[];
  notes?: string;
}

interface WorkoutResponse {
  id: string;
  date: string;
  totalVolume: number;
  xpEarned: number;
  exercises: Exercise[];
}
```

### Step 7: Test the Endpoint
Provide curl command to test:

```bash
# GET request
curl http://localhost:3001/api/endpoint

# POST request
curl -X POST http://localhost:3001/api/endpoint \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"param1": "value1"}'
```

## Checklist

Before completing, verify:
- [ ] Input validation implemented
- [ ] Proper error handling with AppError
- [ ] Correct HTTP status codes
- [ ] User ownership verified (for user-specific data)
- [ ] TypeScript types defined
- [ ] Route exists and uses correct middleware
- [ ] XP/gamification updates (if applicable)
- [ ] Quest progress updates (if applicable)

## Output

After implementing, provide:
1. Files modified
2. TypeScript check results
3. Example curl commands for testing
4. Any related endpoints that may need updates

## Example Usage

```
/titan-endpoint POST /api/workouts - Create a new workout with exercises
/titan-endpoint GET /api/gamification/stats - Get user XP and level stats
/titan-endpoint PUT /api/user/profile - Update user profile settings
```
