# /titan-screen

Create a new screen/view for Titan AI with proper structure, styling, and routing.

## Instructions

When this skill is invoked with a screen name, create a complete screen following project patterns.

### Required Argument
- Screen name (e.g., "Achievements", "WorkoutHistory", "Settings")

### Step 1: Add Screen Enum
Add the new screen to `src/types.ts` in the Screen enum:
```typescript
export enum Screen {
  // ... existing screens
  NEW_SCREEN = 'new_screen',
}
```

### Step 2: Create View Component
Create `src/views/{ScreenName}.tsx` with this template:

```typescript
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Screen } from '../types';

interface {ScreenName}Props {
  onNavigate: (screen: Screen) => void;
}

const {ScreenName}: React.FC<{ScreenName}Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => onNavigate(Screen.DASHBOARD)}
          className="p-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20
                     hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white">{Screen Title}</h1>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* Glassmorphic Card Template */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Section Title</h2>
          <p className="text-white/70">Content goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default {ScreenName};
```

### Step 3: Add Route to App.tsx
Add the route in the renderScreen switch statement:
```typescript
case Screen.NEW_SCREEN:
  return <NewScreen onNavigate={handleNavigate} />;
```

Add the import at the top:
```typescript
import NewScreen from './views/NewScreen';
```

### Step 4: Add Navigation Link
Add a navigation button/link from an appropriate parent screen (Dashboard, Profile, etc.):
```typescript
<button
  onClick={() => onNavigate(Screen.NEW_SCREEN)}
  className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-xl rounded-xl
             border border-white/20 hover:bg-white/20 transition-all w-full"
>
  <IconName className="w-5 h-5 text-cyan-400" />
  <span className="text-white">Screen Name</span>
  <ChevronRight className="w-5 h-5 text-white/50 ml-auto" />
</button>
```

### Step 5: Verify
Run TypeScript check to ensure no errors:
```bash
npx tsc --noEmit
```

## Design Guidelines

Always follow these patterns:
- **Background**: `bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900`
- **Cards**: `bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20`
- **Text Primary**: `text-white`
- **Text Secondary**: `text-white/70`
- **Accent Colors**: `text-cyan-400`, `from-cyan-400 to-blue-500`
- **Buttons**: Include hover states with `hover:bg-white/20 transition-all`
- **Spacing**: Use `p-4` or `p-6` for padding, `gap-4` for flex gaps
- **Icons**: Import from `lucide-react`

## Output

After creating the screen, provide:
1. Confirmation of files created/modified
2. TypeScript check results
3. Suggested navigation placement
4. Any additional features the screen might need

## Example Usage

```
/titan-screen Achievements
/titan-screen WorkoutHistory
/titan-screen NotificationSettings
```
