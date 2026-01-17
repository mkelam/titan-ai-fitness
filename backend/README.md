# Titan AI Backend

Node.js/Express API server for Titan AI Fitness RPG.

## Tech Stack

- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js 4.x
- **Database:** PostgreSQL 15 with Prisma ORM
- **Cache:** Redis 7
- **AI Services:** Google Gemini (Vision), Google Imagen (Vertex AI)
- **Authentication:** JWT with refresh tokens

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables

See `.env.example` for required configuration:

- Database and Redis URLs
- JWT secrets
- Google OAuth credentials
- Gemini and Vertex AI API keys
- File storage settings

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Express server entry
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── workout.controller.ts
│   │   ├── progress.controller.ts
│   │   ├── transform.controller.ts
│   │   ├── nutrition.controller.ts
│   │   └── gamification.controller.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   ├── routes/               # API routes
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── workout.routes.ts
│   │   ├── progress.routes.ts
│   │   ├── transform.routes.ts
│   │   ├── nutrition.routes.ts
│   │   └── gamification.routes.ts
│   └── services/             # Business logic (TODO)
├── prisma/
│   └── schema.prisma         # Database schema
├── package.json
├── tsconfig.json
└── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/apple` - Apple OAuth
- `POST /api/auth/refresh` - Refresh JWT
- `POST /api/auth/logout` - Invalidate session

### User Profile
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `PUT /api/user/avatar` - Upload avatar
- `DELETE /api/user/account` - Delete account
- `GET /api/user/export` - Export data (GDPR)

### Workouts
- `GET /api/workouts` - List workouts
- `POST /api/workouts` - Create workout
- `GET /api/workouts/:id` - Get workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Progress & Photos
- `GET /api/progress` - Get progress
- `POST /api/progress/checkin` - Weight check-in
- `GET /api/progress/photos` - List photos
- `POST /api/progress/photos` - Upload photo
- `DELETE /api/progress/photos/:id` - Delete photo

### Body Transformation
- `POST /api/transform/analyze` - Analyze photo (Gemini Vision)
- `POST /api/transform/generate` - Generate transformation (Imagen)
- `GET /api/transform/history` - List transformations
- `GET /api/transform/:id` - Get transformation

### Nutrition
- `GET /api/nutrition` - Get logs
- `POST /api/nutrition/log` - Log meal
- `GET /api/nutrition/daily/:date` - Daily summary

### Gamification
- `GET /api/gamification/stats` - User stats
- `GET /api/gamification/quests` - Active quests
- `POST /api/gamification/quests/:id/claim` - Claim reward
- `GET /api/gamification/badges` - All badges
- `GET /api/gamification/leaderboard` - Leaderboard
- `GET /api/gamification/shop` - Shop items
- `POST /api/gamification/shop/purchase` - Purchase item

## Development Status

This is a skeleton implementation. All endpoints return placeholder responses with TODO comments indicating implementation requirements.

### Next Steps

1. Implement authentication service with JWT
2. Set up Prisma database connection
3. Implement Gemini Vision integration
4. Implement Imagen/Vertex AI integration
5. Add input validation (Zod/Joi)
6. Add rate limiting
7. Set up Redis caching
8. Add comprehensive error handling
9. Write tests

## License

Proprietary - All rights reserved
