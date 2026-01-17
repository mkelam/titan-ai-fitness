# Titan AI Fitness RPG

A gamified, AI-driven fitness Progressive Web App (PWA) combining elite coaching with RPG progression mechanics.

![Titan AI](https://img.shields.io/badge/Version-1.0.0-green) ![React](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![PWA](https://img.shields.io/badge/PWA-Ready-purple)

## Overview

Titan AI transforms fitness tracking into an immersive RPG experience with:
- **Glassmorphic UI** - Stunning translucent design with neon accents
- **AI Coach** - Personalized guidance with selectable personalities
- **XP & Leveling** - Earn experience points for every activity
- **Quests & Achievements** - Daily challenges and badge collection
- **Progress Analytics** - Detailed tracking and projections

## Quick Start

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:3000`

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Glassmorphic Design
- **State:** React Context + localStorage
- **PWA:** Service Worker, Web App Manifest

## Features

### Core Training
- Workout logging with set/rep tracking
- Nutrition & macro logging
- Progress photos & weight tracking
- AI Form Check (pose estimation)

### Gamification
- XP system with level progression
- Daily & weekly quests
- Badge gallery with rarity tiers
- Skill tree unlocks
- Leaderboards

### AI Coaching
- Personalized daily nudges
- Chat interface for questions
- 3 coach personalities (Sage, Sergeant, Hype-Man)
- Recovery recommendations

## Documentation

All documentation is in the [`/docs`](docs/) folder:

| Document | Description |
|----------|-------------|
| [SPECIFICATION.md](docs/SPECIFICATION.md) | Complete app specification |
| [DESIGN_GUIDE.md](docs/DESIGN_GUIDE.md) | UI/UX design system |
| [SETUP.md](docs/SETUP.md) | Development setup guide |
| [TEST_CHECKLIST.md](docs/TEST_CHECKLIST.md) | QA testing checklist |

## Project Structure

```
├── App.tsx              # Main app component
├── index.tsx            # Entry point
├── types.ts             # TypeScript definitions
├── components/          # Reusable UI components
├── contexts/            # State management
├── hooks/               # Custom React hooks
├── views/               # Screen components
├── services/            # API integrations
├── public/              # Static assets & PWA files
├── docs/                # Documentation
└── Screens/             # Design references
```

## Screens Implemented

- Login & Onboarding (5 screens)
- Dashboard & Training Log
- Nutrition Log & Progress Check-in
- AI Coach Chat & Selection
- Quest Log & Badge Gallery
- Leaderboard & Exercise Library
- Monthly Review & Comparison Engine
- Streak Calendar & Weight Projection
- Recovery Plan & Gym Check-in
- XP Shop, Profile & Settings

**Total: 25+ screens**

## Contributing

This is a private project. For access or contributions, contact the repository owner.

## License

Proprietary - All rights reserved

---

Built with React + TypeScript + Vite
