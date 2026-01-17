# Titan AI Fitness RPG
## Complete Application Specification v1.0

---

## Executive Summary

Titan AI is a gamified, AI-driven fitness Progressive Web Application (PWA) that combines elite coaching methodologies with RPG progression mechanics. The app features a distinctive glassmorphic UI design with translucent panels, neon accents, and a fitness-themed aesthetic that creates an immersive "character building" experience for fitness journeys.

**Target Platform:** Progressive Web App (iOS, Android, Desktop)
**Tech Stack:** React, TypeScript, Vite, Tailwind CSS
**Design Language:** Glassmorphic UI with backdrop blur effects
**Primary Color:** Neon Green (#00ff9d)

---

## Table of Contents

1. [Phase 1: Entry, Onboarding & Identity](#phase-1-entry-onboarding--identity)
2. [Phase 2: Core Training & Nutrition Loop](#phase-2-the-core-training--nutrition-loop)
3. [Phase 3: Data Analysis & Long-term Goals](#phase-3-data-analysis--long-term-goals)
4. [Phase 4: Gamification, Economy & Progression](#phase-4-gamification-economy--progression)
5. [Phase 5: Coaching, Social & Utility](#phase-5-coaching-social--utility)
6. [Technical Architecture](#technical-architecture)
7. [Data Models](#data-models)
8. [Implementation Status](#implementation-status)

---

## Phase 1: Entry, Onboarding & Identity

### 1.1 Login & Authentication
**Screen ID:** `LOGIN`
**Status:** ✅ Implemented

**Function:** Secure entry point via frosted glass forms with social authentication options.

**Features:**
- Email/password authentication with validation
- Social authentication (Apple, Google) - UI ready, backend pending
- "Remember me" functionality via localStorage
- Animated glassmorphic login card
- Seamless transition to onboarding for new users

**UI Elements:**
- Frosted glass panel with backdrop blur
- Neon-accented input fields
- Social auth buttons with provider icons
- Forgot password link

---

### 1.2 Onboarding - Goals
**Screen ID:** `ONBOARDING_GOALS`
**Status:** ✅ Implemented

**Function:** Initial goal setting to personalize the fitness journey and AI coaching approach.

**Goal Options:**
| Goal | Description | AI Calibration |
|------|-------------|----------------|
| Titan Strength | Build raw power and muscle mass | Strength-focused programming |
| Shredded | Lean physique with defined muscles | Caloric deficit emphasis |
| Performance | Athletic optimization | Functional training focus |

**Features:**
- Interactive glass cards with hover effects
- Goal-specific iconography
- Selection persists to user profile
- Determines initial Skill Tree branch unlock

---

### 1.3 Onboarding - Experience
**Screen ID:** `ONBOARDING_EXP`
**Status:** ✅ Implemented

**Function:** Gauges lifting history to calibrate starting weights and AI Coach communication tone.

**Experience Levels:**
| Level | Description | Starting Multiplier |
|-------|-------------|---------------------|
| Rookie | Less than 6 months training | 0.5x suggested weights |
| Intermediate | 6 months - 2 years training | 1.0x suggested weights |
| Veteran | 2+ years consistent training | 1.25x suggested weights |
| Elite | Competition-level experience | Custom programming |

**Features:**
- Animated selection cards
- Experience affects AI communication complexity
- Calibrates initial exercise suggestions

---

### 1.4 Onboarding - Commitment
**Screen ID:** `ONBOARDING_COMMIT`
**Status:** ✅ Implemented

**Function:** Sets training frequency and notification preferences (User Autonomy control).

**Settings:**
- **Training Frequency:** 2-6 days per week slider
- **Nudge Intensity:**
  - Light: Weekly check-ins only
  - Moderate: Daily motivation, gentle reminders
  - Aggressive: Multiple daily prompts, streak warnings
- **Coach Personality Preview:** Based on selected intensity

**Features:**
- Interactive slider components
- Real-time preview of notification frequency
- Commitment contract animation

---

### 1.5 Onboarding - Finalize
**Screen ID:** `ONBOARDING_FINAL`
**Status:** ✅ Implemented

**Function:** Account creation completion with cinematic transition into the main dashboard.

**Features:**
- Profile summary card
- Avatar selection/upload
- Terms acceptance
- XP welcome bonus (+50 XP)
- Cinematic "Welcome, Titan" animation
- Automatic redirect to Dashboard

---

### 1.6 Account Dashboard (Profile)
**Screen ID:** `PROFILE`
**Status:** ✅ Implemented

**Function:** The "Character Sheet" displaying user progression and identity.

**Displayed Stats:**
- Current Level with XP progress bar
- Total Lifetime XP earned
- Current streak (days)
- Total workouts completed
- Total volume lifted (kg)
- Weight change from start
- Titan Coins balance

**Features:**
- Avatar with level badge
- Quick links to Badge Gallery and Leaderboard
- Active Buffs display (from Skill Tree)
- Data export functionality (JSON backup)
- Account management (logout)

---

### 1.7 Password Reset
**Screen ID:** `PASSWORD_RESET`
**Status:** 🔲 Pending (UI Placeholder)

**Function:** Security utility for credential recovery.

**Flow:**
1. Enter registered email
2. Receive reset link (6-digit code)
3. Verify code on glassmorphic panel
4. Set new password with strength indicator
5. Confirmation with auto-login

---

## Phase 2: The Core Training & Nutrition Loop

### 2.1 Coach Dashboard (Main Dashboard)
**Screen ID:** `DASHBOARD`
**Status:** ✅ Implemented

**Function:** The daily command center featuring adaptive AI coaching suggestions.

**Sections:**
1. **Hero Section - Character Sheet**
   - User name, level, total XP
   - Avatar with XP progress indicator
   - Active buffs display

2. **AI Coach Nudge Card**
   - Personalized daily message
   - Context-aware suggestions based on:
     - Current streak status
     - Recent workout history
     - Nutrition adherence
     - Recovery indicators
   - Quick action button

3. **Quick Actions Grid (2x2)**
   - Weight tracking widget
   - Progress photo status
   - Today's training preview
   - Nutrition summary with progress bar

4. **Streak Display**
   - Current streak count with fire icon
   - 7-day heatmap preview
   - Link to full Streak Calendar

5. **Quick Links**
   - Quests, Analytics, Review, Shop
   - Recovery Plan, Gym Check-in

---

### 2.2 Training Log
**Screen ID:** `TRAINING_LOG`
**Status:** ✅ Implemented

**Function:** Active logging of sets, reps, and weight with integrated quest tracking.

**Features:**
- **Exercise Cards:**
  - Exercise name and muscle group
  - Set-by-set logging (weight, reps, completion)
  - Add/remove sets dynamically
  - AI Form Check quick access

- **Quest of the Day Integration:**
  - Progress bar for daily quest
  - Completion percentage display
  - Bonus XP indicator

- **Exercise Management:**
  - Add exercises from database
  - Link to Exercise Library
  - Custom exercise creation

- **Workout Completion:**
  - Volume calculation display
  - XP reward preview
  - Save and earn XP

**XP Rewards:**
- Base: 25 XP per workout
- Per set completed: +5 XP
- Volume bonus: +1 XP per 100kg
- Quest completion bonus: +50 XP

---

### 2.3 Nutrition & Macro Log
**Screen ID:** `NUTRITION_LOG`
**Status:** ✅ Implemented

**Function:** Quick-log interface for calories and macronutrients.

**Features:**
- **Quick Add Buttons:**
  - Preset meal options with estimated macros
  - Recent meals history

- **Manual Entry:**
  - Calories input
  - Protein (g)
  - Carbohydrates (g)
  - Fats (g)

- **Daily Summary:**
  - Circular progress indicators
  - Target vs. actual comparison
  - Macro breakdown pie chart

- **Meal History:**
  - Today's logged meals
  - Edit/delete functionality

**Data Sync:**
- Feeds into Weight Projection calculations
- Affects AI Coach recommendations

---

### 2.4 Wearable & Device Sync
**Screen ID:** `SETTINGS` (subsection)
**Status:** 🔲 Pending

**Function:** Manages connections to fitness wearables for enhanced data collection.

**Supported Integrations:**
- Apple Watch (HealthKit)
- Garmin Connect
- Fitbit
- Google Fit

**Synced Data:**
- Heart rate (workout intensity)
- Sleep duration and quality
- Step count
- Active calories

**Usage:**
- Recovery score calculation
- AI Coach sleep recommendations
- Automatic workout detection

---

### 2.5 Progress Check-in
**Screen ID:** `PROGRESS_CHECKIN`
**Status:** ✅ Implemented

**Function:** Weight tracking and progress photo management with privacy controls.

**Features:**
- **Weight Entry:**
  - Large numeric input
  - Change from previous entry
  - 7-entry mini chart

- **Body Fat % (Optional):**
  - Manual entry field

- **Progress Photos:**
  - Multi-photo upload (front, side, back)
  - Thumbnail preview strip
  - Privacy: stored locally only

- **Photo Comparison:**
  - Side-by-side previous vs. current
  - Weight overlay on photos

- **Weight Projection Link:**
  - Quick access to goal timeline

**XP Rewards:**
- Weight entry: +10 XP
- Photo upload: +15 XP bonus
- Body fat entry: +5 XP bonus

---

### 2.6 AI Form Check
**Screen ID:** `AI_FORM_CHECK`
**Status:** ✅ Implemented (UI only)

**Function:** Real-time video analysis with pose estimation for technique feedback.

**Features:**
- Camera feed with frame overlay
- Skeletal tracking visualization (neon green)
- Real-time form cues
- Rep counting
- Form score percentage

**Analysis Points:**
- Joint angles
- Bar path tracking
- Depth verification (squats)
- Back position (deadlifts)
- Elbow flare (bench press)

**Technical Requirements:**
- TensorFlow.js / MediaPipe integration
- Minimum 30 FPS processing
- On-device inference (privacy)

---

### 2.7 Exercise Library
**Screen ID:** `EXERCISE_LIBRARY`
**Status:** ✅ Implemented

**Function:** Searchable database of exercises with form guidance.

**Features:**
- **Search & Filter:**
  - Text search by name
  - Category filter (Compound, Isolation, Cardio, Mobility)
  - Muscle group filter
  - Difficulty level filter

- **Exercise Cards:**
  - Exercise name
  - Primary muscle group with icon
  - Difficulty badge (color-coded)
  - Category tag

- **Exercise Detail Modal:**
  - Full description
  - Equipment required
  - Difficulty level
  - Pro tips for form
  - Video tutorial (future)

**Exercise Database:** 14+ exercises covering:
- Chest, Back, Legs, Shoulders, Arms
- Compound and isolation movements

---

## Phase 3: Data Analysis & Long-term Goals

### 3.1 Weight Projection
**Screen ID:** `WEIGHT_PROJECTION`
**Status:** ✅ Implemented

**Function:** Predictive visualization of goal achievement timeline.

**Features:**
- **Current Status Card:**
  - Current weight
  - Target weight
  - Difference to goal

- **Projection Chart:**
  - SVG line graph
  - Current to target trajectory
  - Week markers on X-axis

- **Rate Analysis:**
  - Weekly rate calculation (kg/week)
  - Safety indicator:
    - Safe (<0.5 kg/week): Green
    - Moderate (0.5-1 kg/week): Yellow
    - Aggressive (>1 kg/week): Red
  - Recommendation message

- **Milestones:**
  - 5% lost checkpoint
  - 10% lost checkpoint
  - Halfway marker
  - Goal achieved

- **Goal Adjustment:**
  - Target weight +/- controls
  - Target date picker
  - Real-time recalculation

---

### 3.2 Comparison Engine
**Screen ID:** `COMPARISON_ENGINE`
**Status:** ✅ Implemented

**Function:** Detailed week-over-week performance analytics.

**Metrics Compared:**
| Metric | Description |
|--------|-------------|
| Total Volume | Sum of (weight × reps) for all sets |
| Workout Count | Number of sessions completed |
| Avg. Intensity | Average weight per set |
| Consistency | Days trained / days planned |

**Features:**
- **Summary Cards:**
  - This week vs. last week
  - Percentage change indicators
  - Trend arrows (up/down)

- **Bar Chart Visualization:**
  - Side-by-side weekly comparison
  - Volume breakdown

- **Personal Bests Section:**
  - Recent PRs achieved
  - Exercise, weight, date

- **AI Coach Analysis:**
  - Contextual feedback
  - Improvement suggestions
  - Pattern recognition insights

---

### 3.3 Monthly Review
**Screen ID:** `MONTHLY_REVIEW`
**Status:** ✅ Implemented

**Function:** Comprehensive monthly progress recap with AI behavioral analysis.

**Features:**
- **Month Selector:**
  - Navigate between months
  - Year display

- **Grade Card:**
  - Letter grade (A+ to D)
  - Grade label (Elite, Excellent, Good, Average, Needs Work)
  - Comparison to other users percentile

- **Month Stats Grid:**
  - Total workouts
  - Volume lifted
  - XP earned
  - Weight change

- **Personal Bests:**
  - Top 3 lifts of the month
  - Exercise, weight, reps, date

- **Achievements Unlocked:**
  - Badges earned this month
  - Horizontal scroll display

- **AI Analysis Card:**
  - "Coach's Verdict" behavioral audit
  - Personalized recommendations
  - Focus areas for next month

---

### 3.4 Weight Goal Success
**Screen ID:** `WEIGHT_SUCCESS`
**Status:** 🔲 Pending

**Function:** Cinematic celebration for achieving weight goals.

**Features:**
- Full-screen celebration animation
- Confetti/particle effects
- "Transformation Slider" (before/after)
- Achievement badge unlock
- Social share option
- XP mega-bonus (+500 XP)
- Coach congratulations message

---

### 3.5 Training Streak Calendar
**Screen ID:** `STREAK_CALENDAR`
**Status:** ✅ Implemented

**Function:** Visual consistency tracker with streak management.

**Features:**
- **Full Month Calendar:**
  - Workout days highlighted (green)
  - Rest days (neutral)
  - Missed days (red indicator)

- **Streak Milestones:**
  - Progress toward next milestone
  - Milestone rewards preview
  - Badges: 7, 14, 30, 60, 90, 180, 365 days

- **Streak at Risk Warning:**
  - Countdown to streak loss
  - Streak Freeze option
  - Quick workout suggestion

- **View Tabs:**
  - Completion view
  - Heatmap intensity view

---

## Phase 4: Gamification, Economy & Progression

### 4.1 Skill Tree
**Screen ID:** `SKILL_TREE`
**Status:** ✅ Implemented (Basic UI)

**Function:** Unlockable passive perks based on behavioral consistency.

**Branches:**

**Consistency Branch:**
| Node | Requirement | Perk |
|------|-------------|------|
| Devoted | 7-day streak | +5% XP on all activities |
| Disciplined | 30-day streak | Streak Freeze discount |
| Relentless | 90-day streak | Double daily quest XP |
| Immortal | 365-day streak | Legendary "Titan" title |

**Strength Branch:**
| Node | Requirement | Perk |
|------|-------------|------|
| Novice Lifter | 1,000 kg total volume | Unlock PR tracking |
| Iron Apprentice | 10,000 kg total volume | Advanced analytics |
| Steel Warrior | 100,000 kg total volume | Powerlifting templates |
| Titan of Iron | 1,000,000 kg total volume | Custom badge creator |

---

### 4.2 XP & Power-up Shop
**Screen ID:** `XP_SHOP`
**Status:** ✅ Implemented

**Function:** Non-monetary economy for purchasing utility items and cosmetics.

**Currency:** Titan Coins (earned through activities)

**Shop Categories:**

**Utility Items:**
| Item | Cost | Effect |
|------|------|--------|
| Streak Freeze | 100 coins | Preserve streak for 1 missed day |
| XP Booster (24h) | 150 coins | 1.5x XP for 24 hours |
| Quest Reroll | 50 coins | Replace current daily quest |

**Cosmetics:**
| Item | Cost | Effect |
|------|------|--------|
| Avatar Frames | 200-500 coins | Profile customization |
| Title Badges | 300 coins | Display titles |
| Theme Colors | 400 coins | UI accent color change |

**Earning Titan Coins:**
- Daily login: +10 coins
- Quest completion: +5-20 coins
- Weekly bounty: +50 coins
- Level up: +100 coins

---

### 4.3 Daily Quest Log
**Screen ID:** `QUEST_LOG`
**Status:** ✅ Implemented

**Function:** Daily and weekly task system driving consistent engagement.

**Quest Types:**

**Daily Quests (Reset at midnight):**
| Quest | Requirement | XP Reward |
|-------|-------------|-----------|
| Iron Will | Complete 1 workout | 25 XP |
| Fuel Up | Log 3 meals | 15 XP |
| Check In | Log weight | 10 XP |
| Hydration Hero | Log 8 glasses water | 10 XP |

**Weekly Quests:**
| Quest | Requirement | XP Reward |
|-------|-------------|-----------|
| Consistency King | Train 4+ days | 100 XP |
| Volume Crusher | Lift 5,000+ kg total | 75 XP |
| Progress Tracker | Log weight 5+ times | 50 XP |

**Features:**
- Progress bars for each quest
- Claim rewards button
- Quest history view
- Bonus multiplier display

---

### 4.4 Weekly Bounty Rewards
**Screen ID:** `QUEST_LOG` (subsection)
**Status:** ✅ Implemented

**Function:** Weekly "loot ceremony" for collecting accumulated rewards.

**Features:**
- Animated chest opening
- Reward reveal sequence
- XP bonus calculation
- Rare item chance
- Streak multiplier applied

---

### 4.5 Badge Gallery
**Screen ID:** `BADGE_GALLERY`
**Status:** ✅ Implemented

**Function:** Trophy room showcasing achievements and milestones.

**Badge Categories:**
| Category | Examples |
|----------|----------|
| Streak | 7-Day, 30-Day, 100-Day Warrior |
| Strength | First PR, 100kg Lift, Iron Legend |
| Consistency | Early Bird, Night Owl, Weekend Warrior |
| Nutrition | Macro Master, Protein Champion |
| Social | Team Player, Challenge Victor |
| Special | Beta Tester, Anniversary |

**Rarity System:**
- Common (Gray border)
- Rare (Blue border)
- Epic (Purple border)
- Legendary (Gold border, animated)

**Features:**
- Grid display of all badges
- Unlocked vs. locked states
- Progress toward locked badges
- Badge detail modal
- Filter by category
- Equip badge to profile

---

### 4.6 Level Up Milestone
**Screen ID:** `LEVEL_UP` (Modal)
**Status:** ✅ Implemented

**Function:** Celebration animation upon reaching new XP levels.

**Features:**
- Full-screen takeover animation
- Level number with glow effect
- Stats increase display (+HP, +Energy)
- Skill Points awarded notification
- Reward unlock reveal
- "Continue Journey" CTA

**Level Progression:**
| Level | XP Required | Cumulative XP |
|-------|-------------|---------------|
| 1-10 | 100 XP each | 1,000 XP |
| 11-25 | 200 XP each | 4,000 XP |
| 26-50 | 500 XP each | 16,500 XP |
| 51-100 | 1,000 XP each | 66,500 XP |

---

### 4.7 Ultimate Unlock
**Screen ID:** `ULTIMATE_UNLOCK` (Modal)
**Status:** ✅ Implemented

**Function:** Special celebration for completing major Skill Tree branches.

**Features:**
- Legendary rarity presentation
- Animated background rays
- Exclusive reward reveal
- Unique title unlock
- Profile badge grant
- Share achievement option

---

### 4.8 Personal Best View
**Screen ID:** `PERSONAL_BEST` (Modal)
**Status:** ✅ Implemented

**Function:** PR celebration triggering "Berserker Mode" XP bonus.

**Features:**
- Trophy icon with glow
- Exercise name display
- Previous vs. new weight comparison
- Improvement amount
- XP bonus (+50 XP for PR)
- Berserker Mode activation (2x XP for 1 hour)

---

## Phase 5: Coaching, Social & Utility

### 5.1 AI Coach Chat
**Screen ID:** `AI_COACH_CHAT`
**Status:** ✅ Implemented

**Function:** Conversational interface for training guidance and support.

**Features:**
- Chat bubble interface
- Coach avatar display
- Personality-based responses
- Quick action suggestions
- Context-aware advice

**Topics Handled:**
- Workout modifications
- Recovery recommendations
- Nutrition guidance
- Motivation and accountability
- Exercise form questions
- Program adjustments

**Technical:**
- Integration ready for Gemini API
- Personality prompt templates
- Conversation history storage

---

### 5.2 Coach Selection
**Screen ID:** `COACH_SELECTION`
**Status:** ✅ Implemented

**Function:** Choose AI personality to match user preferences.

**Coach Personalities:**
| Personality | Tone | Best For |
|-------------|------|----------|
| **Sage** | Calm, analytical, educational | Users wanting detailed explanations |
| **Sergeant** | Direct, no-nonsense, tough love | Users needing accountability |
| **Hype-Man** | Energetic, encouraging, celebratory | Users wanting motivation |

**Features:**
- Personality preview cards
- Sample message display
- Selection confirmation
- Can change anytime in Settings

---

### 5.3 Recovery Plan
**Screen ID:** `RECOVERY_PLAN`
**Status:** ✅ Implemented

**Function:** Guided recovery protocol based on training load and fatigue indicators.

**Features:**
- **Recovery Status Card:**
  - Recovery need level (High/Moderate/Low)
  - Based on recent workout intensity
  - Weekly volume calculation

- **Activity Checklist:**
  - Sleep (7-9 hours)
  - Active stretching (15-20 min)
  - Hydration focus (3-4L)
  - Recovery nutrition
  - Foam rolling
  - Light walking

- **Activity Detail Modal:**
  - Description
  - Duration
  - Benefits list
  - Mark complete

- **AI Recovery Tip:**
  - Context-aware advice
  - Rest day recommendations

---

### 5.4 Team Hub
**Screen ID:** `TEAM_HUB`
**Status:** ✅ Implemented (Basic UI)

**Function:** Social features for community challenges and group accountability.

**Features:**
- Team creation/joining
- Team challenges
- Group leaderboard
- Activity feed
- Team chat (future)
- Challenge invitations

---

### 5.5 Leaderboard
**Screen ID:** `LEADERBOARD`
**Status:** ✅ Implemented

**Function:** Competitive ranking system with multiple categories.

**Leaderboard Types:**
- Global (all users)
- Friends
- Local (geographic)

**Timeframes:**
- Weekly
- Monthly
- All-time

**Features:**
- Podium display (top 3)
- User's current rank highlight
- Score breakdown
- Season info display
- Berserker Mode indicators

**Ranking Metrics:**
- Total XP earned in period
- Workout consistency
- Volume lifted
- Streak length

---

### 5.6 Gym Check-in
**Screen ID:** `GYM_CHECKIN`
**Status:** ✅ Implemented

**Function:** Location-based check-in for XP bonuses.

**Features:**
- **Check-in Status:**
  - Current check-in state
  - XP earned display

- **Nearby Gyms:**
  - List with distance
  - Check-in count history
  - Favorite gym star

- **Stats Display:**
  - Global users training today
  - Personal check-in count
  - Gym rank

- **Streak Bonus:**
  - Extra XP for 7+ day streaks

- **Gym Leaderboard Preview:**
  - Top 3 at this location

**XP Rewards:**
- Base check-in: +10 XP
- Streak bonus (7+ days): +5 XP

---

### 5.7 Notification Center
**Screen ID:** `SETTINGS` (subsection)
**Status:** 🔲 Pending

**Function:** Central hub for all app notifications.

**Notification Types:**
- Coach nudges
- Quest reminders
- Streak warnings
- Team activity
- Achievement unlocks
- Weekly summaries

**Features:**
- Notification history
- Mark as read
- Quick actions
- Filter by type
- Do not disturb settings

---

### 5.8 Privacy & Data Settings
**Screen ID:** `SETTINGS` (subsection)
**Status:** ✅ Implemented (Partial)

**Function:** Data management and privacy controls.

**Features:**
- **Photo Privacy:**
  - Local storage only option
  - Encryption toggle
  - Auto-delete after X days

- **AI Data Permissions:**
  - Training data sharing
  - Anonymized analytics
  - Form video processing

- **Data Export:**
  - JSON backup download
  - CSV export option
  - Transfer to new device

- **Account Deletion:**
  - Full data purge option
  - Confirmation flow

---

### 5.9 Settings & Tech Support
**Screen ID:** `SETTINGS`
**Status:** ✅ Implemented

**Function:** App preferences and support access.

**Settings Categories:**
- **Profile:** Name, email, avatar
- **Notifications:** Frequency, types, quiet hours
- **Coach:** Personality, nudge intensity
- **Display:** Theme, units (kg/lb)
- **Privacy:** Data controls
- **About:** Version, changelog
- **Support:** Contact, FAQ, bug report

---

## Technical Architecture

### Frontend Stack
```
React 18.2.0
TypeScript 5.x
Vite 6.x (Build tool)
Tailwind CSS 3.x (Styling)
```

### State Management
```
React Context API (AppContext)
localStorage (Persistence)
Custom useLocalStorage hook
```

### PWA Features
```
manifest.json (App metadata)
Service Worker (Offline caching)
App icons (SVG)
```

### File Structure
```
/
├── App.tsx                 # Main application component
├── index.tsx              # Entry point
├── index.css              # Global styles, glassmorphic classes
├── types.ts               # TypeScript enums and interfaces
├── components/
│   ├── UI.tsx             # Reusable UI components
│   ├── DashboardWidgets.tsx
│   └── CelebrationModals.tsx
├── contexts/
│   └── AppContext.tsx     # Global state management
├── hooks/
│   └── useLocalStorage.ts # Persistence hook
├── views/
│   ├── Onboarding.tsx     # Login, Goals, Experience, etc.
│   ├── Dashboard.tsx
│   ├── Training.tsx
│   ├── Nutrition.tsx
│   ├── Progress.tsx
│   ├── Coach.tsx
│   ├── QuestLog.tsx
│   ├── BadgeGallery.tsx
│   ├── Leaderboard.tsx
│   ├── ExerciseLibrary.tsx
│   ├── MonthlyReview.tsx
│   ├── WeightProjection.tsx
│   ├── StreakCalendar.tsx
│   ├── ComparisonEngine.tsx
│   ├── RecoveryPlan.tsx
│   ├── GymCheckin.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   ├── Shop.tsx
│   └── Gamification.tsx
├── services/
│   └── geminiService.ts   # AI integration
└── public/
    ├── manifest.json
    ├── sw.js
    ├── OB.jpg             # Background image
    └── icons/
```

---

## Data Models

### User Profile
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}
```

### User Stats
```typescript
interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalXpEarned: number;
  streak: number;
  longestStreak: number;
  currency: number;
}
```

### Workout
```typescript
interface Workout {
  id: string;
  date: string;
  phase: string;
  exercises: WorkoutExercise[];
  totalVolume: number;
  duration?: number;
  xpEarned?: number;
}
```

### Weight Entry
```typescript
interface WeightEntry {
  date: string;
  weight: number;
  bodyFat?: number;
  photos?: string[];
}
```

### Nutrition Entry
```typescript
interface NutritionEntry {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: MealEntry[];
}
```

---

## Implementation Status

### Phase 1: Entry & Onboarding
| Screen | Status |
|--------|--------|
| Login | ✅ Complete |
| Onboarding - Goals | ✅ Complete |
| Onboarding - Experience | ✅ Complete |
| Onboarding - Commitment | ✅ Complete |
| Onboarding - Finalize | ✅ Complete |
| Profile (Account Dashboard) | ✅ Complete |
| Password Reset | 🔲 Pending |

### Phase 2: Core Loop
| Screen | Status |
|--------|--------|
| Dashboard | ✅ Complete |
| Training Log | ✅ Complete |
| Nutrition Log | ✅ Complete |
| Progress Check-in | ✅ Complete |
| AI Form Check | ✅ UI Only |
| Exercise Library | ✅ Complete |
| Wearable Sync | 🔲 Pending |

### Phase 3: Analytics
| Screen | Status |
|--------|--------|
| Weight Projection | ✅ Complete |
| Comparison Engine | ✅ Complete |
| Monthly Review | ✅ Complete |
| Streak Calendar | ✅ Complete |
| Weight Goal Success | 🔲 Pending |

### Phase 4: Gamification
| Screen | Status |
|--------|--------|
| Skill Tree | ✅ Basic UI |
| XP Shop | ✅ Complete |
| Quest Log | ✅ Complete |
| Badge Gallery | ✅ Complete |
| Level Up Modal | ✅ Complete |
| Ultimate Unlock Modal | ✅ Complete |
| PR Modal | ✅ Complete |

### Phase 5: Social & Utility
| Screen | Status |
|--------|--------|
| AI Coach Chat | ✅ Complete |
| Coach Selection | ✅ Complete |
| Recovery Plan | ✅ Complete |
| Team Hub | ✅ Basic UI |
| Leaderboard | ✅ Complete |
| Gym Check-in | ✅ Complete |
| Settings | ✅ Complete |
| Notification Center | 🔲 Pending |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01 | Initial MVP release |

---

## Repository

**GitHub:** https://github.com/mkelam/titan-ai-fitness

**License:** Proprietary

---

*Document generated for Titan AI Fitness RPG v1.0*
