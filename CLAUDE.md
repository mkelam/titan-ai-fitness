# CLAUDE.md

This file provides guidance to Claude Code when working with the Titan AI Fitness RPG codebase.

## Project Overview

Titan AI is a gamified, AI-driven fitness Progressive Web App (PWA) that combines elite coaching with RPG progression mechanics. The project consists of a React frontend and Node.js/Express backend.

## Tech Stack

### Frontend (PWA)
- **Framework:** React 18.2 with TypeScript 5.x
- **Build Tool:** Vite 6.x
- **Styling:** Tailwind CSS 3.x with Glassmorphic design
- **State:** React Context + localStorage
- **PWA:** Service Worker, Web App Manifest

### Backend (API Server)
- **Runtime:** Node.js 20 LTS
- **Framework:** Express.js 4.x
- **Database:** PostgreSQL 15 with Prisma ORM
- **Cache:** Redis 7
- **Auth:** JWT with refresh tokens

### AI Services
- **Google Gemini:** Vision analysis for body photos
- **Google Imagen (Vertex AI):** Body transformation image generation

## Project Structure

```
titan-ai/
├── src/                    # Frontend source
│   ├── components/         # Reusable UI components
│   ├── views/              # Screen components (25+ screens)
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API client services
│   └── types.ts            # TypeScript definitions
├── backend/                # Backend source
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API route definitions
│   │   └── services/       # Business logic (TODO)
│   └── prisma/             # Database schema
├── docs/                   # Documentation
│   ├── ARCHITECTURE.md     # System architecture
│   ├── SPECIFICATION.md    # App specification
│   ├── DESIGN_GUIDE.md     # UI/UX design system
│   └── SETUP.md            # Development setup
└── public/                 # Static assets & PWA files
```

## Development Commands

### Frontend

```bash
# Navigate to project root
cd "c:\Users\Mac\OneDrive\Desktop\Projects\Titan AI"

# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Preview production build
npm run preview
```

### Backend

```bash
# Navigate to backend
cd "c:\Users\Mac\OneDrive\Desktop\Projects\Titan AI\backend"

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Run development server (port 3001)
npm run dev

# Build for production
npm run build
```

## Key Files

### Frontend
- `src/App.tsx` - Main app component with routing
- `src/types.ts` - All TypeScript type definitions
- `src/contexts/UserContext.tsx` - User state management
- `src/views/` - All screen components

### Backend
- `backend/src/index.ts` - Express server entry point
- `backend/prisma/schema.prisma` - Database schema
- `backend/src/controllers/transform.controller.ts` - Body transformation AI logic
- `backend/.env.example` - Required environment variables

## Design System

### Glassmorphic UI
- Background: `bg-white/10` or `bg-white/5`
- Backdrop blur: `backdrop-blur-xl`
- Borders: `border border-white/20`
- Text: `text-white` primary, `text-white/70` secondary

### Color Palette
- Primary gradient: `from-cyan-400 to-blue-500`
- Accent: `#00D4FF` (cyan)
- XP/Gold: `from-yellow-400 to-amber-500`
- Success: `from-green-400 to-emerald-500`
- Warning: `from-orange-400 to-red-500`

### Rarity Tiers (Badges/Items)
- Common: Gray
- Rare: Blue (`from-blue-400 to-blue-600`)
- Epic: Purple (`from-purple-400 to-purple-600`)
- Legendary: Gold (`from-yellow-400 to-amber-500`)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/refresh` - Refresh JWT

### Core Features
- `GET/POST /api/workouts` - Workout CRUD
- `GET/POST /api/progress` - Progress tracking
- `POST /api/transform/analyze` - Gemini Vision analysis
- `POST /api/transform/generate` - Imagen transformation
- `GET /api/gamification/stats` - User XP/level stats

## Testing Guidelines

1. Always run TypeScript checks after changes: `npx tsc --noEmit`
2. Test navigation between screens
3. Verify glassmorphic styling consistency
4. Check responsive design (mobile-first)
5. Test PWA offline functionality

## Git Workflow

- Main branch: `master`
- Repository: https://github.com/mkelam/titan-ai-fitness
- Commit style: Descriptive messages with context

## Important Notes

1. **Path Handling:** Always use absolute paths with proper quoting for Windows paths
2. **Environment Variables:** Never commit `.env` files - use `.env.example` as template
3. **Progress Photos:** Must be encrypted (AES-256-GCM) before storage
4. **AI API Keys:** Store in environment variables, never in code
5. **Mobile-First:** Design for mobile screens primarily (PWA target)

## Current Status

- Frontend: 25+ screens implemented (all phases complete)
- Backend: Skeleton with stubs (needs implementation)
- AI Integration: Architecture designed, implementation pending

## Next Steps

1. Implement backend authentication service
2. Set up Prisma database connection
3. Integrate Gemini Vision API
4. Integrate Imagen/Vertex AI
5. Connect frontend to backend API
