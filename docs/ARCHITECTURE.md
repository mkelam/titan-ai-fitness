# Titan AI - System Architecture

## Overview

This document describes the complete system architecture for Titan AI, including the frontend PWA, backend API server, database, file storage, and AI integrations.

---

## Infrastructure Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (PWA)                               │
│                     React + TypeScript                            │
│                    Hosted on Hostinger                            │
└───────────────────────────┬──────────────────────────────────────┘
                            │ HTTPS
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                    HOSTINGER VPS                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                      Nginx                                   │ │
│  │              (Reverse Proxy + SSL)                           │ │
│  └─────────────────────────┬───────────────────────────────────┘ │
│                            │                                      │
│  ┌─────────────────────────┴───────────────────────────────────┐ │
│  │                 Node.js API Server                           │ │
│  │                   (Express.js)                               │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │ │
│  │  │   Auth   │ │  Image   │ │ Storage  │ │ Workout  │       │ │
│  │  │ Service  │ │ Service  │ │ Service  │ │ Service  │       │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                            │                                      │
│       ┌────────────────────┼────────────────────┐                │
│       ▼                    ▼                    ▼                │
│  ┌──────────┐       ┌──────────┐       ┌──────────────┐         │
│  │PostgreSQL│       │  Redis   │       │  /uploads/   │         │
│  │ Database │       │  Cache   │       │ File Storage │         │
│  └──────────┘       └──────────┘       └──────────────┘         │
└───────────────────────────┬──────────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌───────────────────────┐       ┌───────────────────────┐
│   Google Gemini API   │       │   Google Imagen API   │
│   (Vision + Chat)     │       │   (Image Generation)  │
└───────────────────────┘       └───────────────────────┘
```

---

## Technology Stack

### Frontend (PWA)
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 6.x | Build Tool |
| Tailwind CSS | 3.x | Styling |
| Service Worker | - | Offline Support |

### Backend (API Server)
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20 LTS | Runtime |
| Express.js | 4.x | Web Framework |
| TypeScript | 5.x | Type Safety |
| Prisma | 5.x | ORM |
| JWT | - | Authentication |
| Multer | - | File Uploads |

### Database & Cache
| Technology | Purpose |
|------------|---------|
| PostgreSQL 15 | Primary Database |
| Redis 7 | Session Cache, Rate Limiting |

### AI Services
| Service | Provider | Purpose |
|---------|----------|---------|
| Gemini Pro | Google | Chat, Vision Analysis |
| Imagen 2 | Google (Vertex AI) | Body Transformation |

### Hosting
| Service | Provider | Purpose |
|---------|----------|---------|
| VPS | Hostinger | Backend + Database |
| Static Files | Hostinger | PWA + CDN |
| SSL | Let's Encrypt | HTTPS |

---

## Body Transformation Feature

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERACTION FLOW                         │
└─────────────────────────────────────────────────────────────────┘

1. CAPTURE
   User → [Camera/Upload] → Original Photo
                               │
                               ▼
2. UPLOAD                 ┌─────────────┐
   Original Photo ───────►│ API Server  │
                          │ /transform  │
                          │  /analyze   │
                          └──────┬──────┘
                                 │
3. ANALYZE                       ▼
                          ┌─────────────┐
                          │   Gemini    │
                          │   Vision    │
                          └──────┬──────┘
                                 │
                          Analysis Results:
                          • Body type
                          • Est. body fat %
                          • Pose landmarks
                          • Build classification
                                 │
4. TARGET SELECTION              ▼
   User selects target:   ┌─────────────┐
   Current: 100kg         │  UI Slider  │
   Target:  80kg          │  Component  │
                          └──────┬──────┘
                                 │
5. GENERATE                      ▼
                          ┌─────────────┐
   Prompt + Image ───────►│   Imagen    │
                          │    API      │
                          └──────┬──────┘
                                 │
                          Generated Image:
                          • Same pose
                          • Same face
                          • Transformed body
                                 │
6. DISPLAY                       ▼
                          ┌─────────────────────┐
                          │  Before │  After    │
                          │  100kg  │  80kg     │
                          │ [orig]  │ [AI gen]  │
                          └─────────────────────┘
```

### API Integration

#### Gemini Vision (Analysis)
```typescript
// POST /api/transform/analyze
{
  "image": "base64_encoded_image",
  "currentWeight": 100
}

// Response
{
  "analysis": {
    "bodyType": "mesomorph",
    "estimatedBodyFat": 25,
    "gender": "male",
    "pose": "front_facing",
    "landmarks": {...}
  }
}
```

#### Imagen (Generation)
```typescript
// POST /api/transform/generate
{
  "sourcePhotoId": "uuid",
  "currentWeight": 100,
  "targetWeight": 80,
  "analysis": {...}
}

// Response
{
  "transformationId": "uuid",
  "generatedImageUrl": "https://...",
  "creditsUsed": 1
}
```

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────────┐
│    users     │       │    user_stats    │
├──────────────┤       ├──────────────────┤
│ id (PK)      │───────│ user_id (PK, FK) │
│ email        │       │ level            │
│ password     │       │ xp               │
│ name         │       │ total_xp         │
│ avatar_url   │       │ streak           │
│ google_id    │       │ currency         │
│ created_at   │       └──────────────────┘
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────────┐       ┌──────────────────┐
│ progress_photos  │       │ transformations  │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │◄──────│ source_photo_id  │
│ user_id (FK)     │       │ id (PK)          │
│ original_url     │       │ user_id (FK)     │
│ weight           │       │ current_weight   │
│ body_fat         │       │ target_weight    │
│ captured_at      │       │ generated_url    │
└──────────────────┘       │ gemini_analysis  │
                           └──────────────────┘
       │
       │ 1:N
       ▼
┌──────────────────┐       ┌──────────────────┐
│    workouts      │       │workout_exercises │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │───────│ workout_id (FK)  │
│ user_id (FK)     │       │ id (PK)          │
│ date             │       │ exercise_name    │
│ phase            │       │ muscle_group     │
│ total_volume     │       │ sets (JSONB)     │
│ xp_earned        │       └──────────────────┘
└──────────────────┘
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Email/password login |
| POST | `/api/auth/google` | Google OAuth login |
| POST | `/api/auth/apple` | Apple OAuth login |
| POST | `/api/auth/refresh` | Refresh JWT token |
| POST | `/api/auth/logout` | Invalidate session |
| POST | `/api/auth/forgot-password` | Request reset |
| POST | `/api/auth/reset-password` | Set new password |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get current user |
| PUT | `/api/user/profile` | Update profile |
| PUT | `/api/user/avatar` | Upload avatar |
| DELETE | `/api/user/account` | Delete account |
| GET | `/api/user/export` | Export all data |

### Workouts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workouts` | List workouts |
| POST | `/api/workouts` | Create workout |
| GET | `/api/workouts/:id` | Get workout |
| PUT | `/api/workouts/:id` | Update workout |
| DELETE | `/api/workouts/:id` | Delete workout |

### Progress & Photos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/progress` | Get progress history |
| POST | `/api/progress/checkin` | Log weight/photos |
| GET | `/api/progress/photos` | List photos |
| DELETE | `/api/progress/photos/:id` | Delete photo |

### Body Transformation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transform/analyze` | Analyze body photo |
| POST | `/api/transform/generate` | Generate transformation |
| GET | `/api/transform/history` | List transformations |
| GET | `/api/transform/:id` | Get transformation |

### Nutrition
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/nutrition` | Get nutrition log |
| POST | `/api/nutrition/log` | Log meal |
| GET | `/api/nutrition/daily/:date` | Get daily summary |

### Gamification
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Get user stats |
| GET | `/api/quests` | Get active quests |
| POST | `/api/quests/:id/claim` | Claim quest reward |
| GET | `/api/badges` | Get all badges |
| GET | `/api/leaderboard` | Get leaderboard |
| GET | `/api/shop` | Get shop items |
| POST | `/api/shop/purchase` | Buy item |

---

## Security

### Authentication Flow

```
┌────────┐                  ┌────────┐                  ┌────────┐
│ Client │                  │  API   │                  │   DB   │
└───┬────┘                  └───┬────┘                  └───┬────┘
    │                           │                           │
    │  POST /auth/login         │                           │
    │  {email, password}        │                           │
    │─────────────────────────► │                           │
    │                           │  Query user               │
    │                           │─────────────────────────► │
    │                           │                           │
    │                           │  User record              │
    │                           │ ◄─────────────────────────│
    │                           │                           │
    │                           │  Verify password          │
    │                           │  Generate JWT             │
    │                           │                           │
    │  {accessToken,            │                           │
    │   refreshToken}           │                           │
    │ ◄─────────────────────────│                           │
    │                           │                           │
    │  Store tokens             │                           │
    │  (httpOnly cookie +       │                           │
    │   localStorage)           │                           │
```

### JWT Structure
```typescript
// Access Token (15 min expiry)
{
  "sub": "user_uuid",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234568790
}

// Refresh Token (7 day expiry)
{
  "sub": "user_uuid",
  "type": "refresh",
  "iat": 1234567890,
  "exp": 1235172690
}
```

### Data Encryption

| Data Type | Encryption | Storage |
|-----------|------------|---------|
| Passwords | bcrypt (12 rounds) | PostgreSQL |
| Progress Photos | AES-256-GCM | File System |
| JWT Tokens | RS256 | Memory/Cookie |
| API Keys | Environment Variables | .env |

---

## File Storage Structure

```
/uploads/
├── avatars/
│   └── {user_id}/
│       └── avatar.jpg
├── progress/
│   └── {user_id}/
│       ├── originals/
│       │   └── {photo_id}.jpg.enc  (encrypted)
│       └── thumbnails/
│           └── {photo_id}_thumb.jpg
└── transformations/
    └── {user_id}/
        └── {transformation_id}.jpg
```

---

## Environment Variables

```bash
# Server
NODE_ENV=production
PORT=3001
API_URL=https://api.titan-ai.app

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/titan_ai
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
APPLE_CLIENT_ID=xxx

# Google AI
GEMINI_API_KEY=xxx
GOOGLE_CLOUD_PROJECT=xxx
VERTEX_AI_LOCATION=us-central1

# Storage
UPLOAD_PATH=/var/www/uploads
MAX_FILE_SIZE=10485760  # 10MB
ENCRYPTION_KEY=xxx

# Rate Limiting
RATE_LIMIT_WINDOW=60000  # 1 minute
RATE_LIMIT_MAX=100       # requests per window
```

---

## Deployment

### Hostinger VPS Setup

```bash
# 1. SSH into VPS
ssh root@your-vps-ip

# 2. Install dependencies
apt update && apt upgrade -y
apt install -y nginx postgresql redis-server nodejs npm

# 3. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# 4. Setup PostgreSQL
sudo -u postgres createuser titan_user
sudo -u postgres createdb titan_ai
sudo -u postgres psql -c "ALTER USER titan_user PASSWORD 'secure_password';"

# 5. Setup application
mkdir -p /var/www/titan-ai
cd /var/www/titan-ai
git clone https://github.com/mkelam/titan-ai-fitness.git .

# 6. Install dependencies & build
cd backend
npm install
npm run build

# 7. Setup PM2 for process management
npm install -g pm2
pm2 start dist/index.js --name titan-api
pm2 save
pm2 startup

# 8. Configure Nginx
# See nginx.conf in deployment folder
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.titan-ai.app;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.titan-ai.app;

    ssl_certificate /etc/letsencrypt/live/api.titan-ai.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.titan-ai.app/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        alias /var/www/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Cost Estimation

### Monthly Costs (Low Volume: <1000 users)

| Service | Usage | Cost |
|---------|-------|------|
| Hostinger VPS (KVM 2) | 2 vCPU, 8GB RAM | $12.99 |
| Gemini API | 5,000 requests | ~$5 |
| Imagen API | 500 generations | ~$15 |
| Domain + SSL | Annual / 12 | ~$2 |
| **Total** | | **~$35/month** |

### Scaling Considerations

| Users | VPS Tier | Est. AI Costs | Total |
|-------|----------|---------------|-------|
| <1,000 | KVM 2 | $20 | ~$35 |
| 1,000-5,000 | KVM 4 | $100 | ~$150 |
| 5,000-20,000 | KVM 8 + CDN | $500 | ~$600 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial architecture |

---

*Document maintained by the Titan AI development team*
