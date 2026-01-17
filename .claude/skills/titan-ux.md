# /titan-ux

Audit and enhance UI/UX for glassmorphic design consistency, visual hierarchy, and world-class user experience.

## Instructions

When this skill is invoked, perform a comprehensive UX review following Titan AI's glassmorphic design system.

### Arguments
- No arguments: Full UX audit of recent changes or specified screen
- `--screen ScreenName`: Audit specific screen
- `--component ComponentName`: Audit specific component
- `--fix`: Apply fixes for issues found
- `--mobile`: Focus on mobile-specific issues

---

## Part 1: Glassmorphic Design System Audit

### 1.1 Glass Panel Verification

**Correct Implementation:**
```tsx
// Standard Glass Panel (60% transparent)
className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"

// Alternative with stronger effect
className="bg-[rgba(15,15,15,0.4)] backdrop-blur-[24px] backdrop-saturate-[180%]
           border border-white/[0.12] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
```

**Common Errors to Flag:**
```tsx
// ❌ WRONG: Solid backgrounds break glassmorphism
className="bg-gray-800"
className="bg-slate-900"
className="bg-black"

// ❌ WRONG: Missing backdrop blur
className="bg-white/10 rounded-xl"  // No blur!

// ❌ WRONG: Wrong opacity levels
className="bg-white/50"  // Too opaque
className="bg-white/5"   // Too transparent for main panels

// ✅ CORRECT: Proper glass effect
className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
```

### 1.2 Glass Hierarchy Check

| Element Type | Background | Blur | Border | Use Case |
|--------------|------------|------|--------|----------|
| **Card/Panel** | `bg-white/10` | `backdrop-blur-xl` | `border-white/20` | Dashboard widgets, content cards |
| **Modal** | `bg-black/70` or `bg-white/15` | `backdrop-blur-[40px]` | `border-white/15` | Overlays, dialogs |
| **Input** | `bg-white/5` or `bg-white/[0.06]` | `backdrop-blur-sm` | `border-white/10` | Form fields |
| **Button Secondary** | `bg-white/10` | none | `border-white/20` | Secondary actions |
| **Hover State** | `bg-white/20` | inherit | inherit | Interactive feedback |

---

## Part 2: Color System Audit

### 2.1 Primary Neon (#00ff9d)

**Correct Usage:**
```tsx
// Text with glow
className="text-[#00ff9d] drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]"

// Neon button
className="bg-[#00ff9d] text-black shadow-[0_0_20px_rgba(0,255,157,0.4)]"

// Progress bars
className="bg-gradient-to-r from-[#00ff9d] to-emerald-400"
```

**When to Use Neon:**
- ✅ Primary CTA buttons
- ✅ Active/selected states
- ✅ XP progress bars
- ✅ Success indicators
- ✅ Level-up highlights

**When NOT to Use:**
- ❌ Body text (too bright)
- ❌ Large background areas
- ❌ Secondary actions

### 2.2 Gradient System

**Primary Gradients:**
```tsx
// Cyan-Blue (Primary actions)
className="bg-gradient-to-r from-cyan-400 to-blue-500"

// Gold/XP (Rewards, achievements)
className="bg-gradient-to-r from-yellow-400 to-amber-500"

// Success (Completed, positive)
className="bg-gradient-to-r from-green-400 to-emerald-500"

// Warning/Streak
className="bg-gradient-to-r from-orange-400 to-red-500"

// Epic rarity
className="bg-gradient-to-r from-purple-400 to-purple-600"
```

### 2.3 Rarity Tier Colors

| Tier | Gradient | Text | Border | Glow |
|------|----------|------|--------|------|
| **Common** | `from-gray-400 to-gray-500` | `text-gray-300` | `border-gray-500/30` | None |
| **Rare** | `from-blue-400 to-blue-600` | `text-blue-400` | `border-blue-500/30` | `shadow-blue-500/20` |
| **Epic** | `from-purple-400 to-purple-600` | `text-purple-400` | `border-purple-500/30` | `shadow-purple-500/20` |
| **Legendary** | `from-yellow-400 to-amber-500` | `text-yellow-400` | `border-yellow-500/30` | `shadow-yellow-500/30` |

---

## Part 3: Typography Audit

### 3.1 Text Color Hierarchy

```tsx
// Primary text (headings, important)
className="text-white"

// Secondary text (descriptions, captions)
className="text-white/70"

// Tertiary text (metadata, timestamps)
className="text-white/50"

// Muted text (disabled, placeholders)
className="text-white/30"
```

**Common Errors:**
```tsx
// ❌ WRONG: Using gray scale instead of opacity
className="text-gray-400"  // Inconsistent
className="text-gray-600"  // Too dark

// ✅ CORRECT: White with opacity
className="text-white/70"
```

### 3.2 Font Sizes (Mobile-First)

| Element | Size | Weight | Example |
|---------|------|--------|---------|
| Page Title | `text-2xl` or `text-3xl` | `font-bold` | "Dashboard" |
| Section Header | `text-xl` | `font-bold` | "Today's Quests" |
| Card Title | `text-lg` | `font-semibold` | "Bench Press" |
| Body | `text-base` | `font-normal` | Descriptions |
| Caption | `text-sm` | `font-medium` | Labels, metadata |
| Tiny | `text-xs` | `font-semibold` | Badges, pills |

---

## Part 4: Spacing & Layout Audit

### 4.1 Consistent Spacing

```tsx
// Screen padding
className="p-4"  // Standard mobile padding

// Card internal padding
className="p-4"  // Compact cards
className="p-6"  // Spacious cards

// Gap between elements
className="gap-2"  // Tight (icon + text)
className="gap-3"  // Default
className="gap-4"  // Between cards
className="gap-6"  // Between sections
```

### 4.2 Border Radius Scale

```tsx
// Small elements (pills, badges)
className="rounded-lg"    // 8px

// Cards, buttons
className="rounded-xl"    // 12px

// Large panels
className="rounded-2xl"   // 16px

// Full round (avatars, icons)
className="rounded-full"
```

### 4.3 Safe Areas

```tsx
// Bottom nav clearance (critical!)
className="pb-24"  // 96px for bottom nav

// Header clearance
className="pt-4"   // Standard
className="pt-safe"  // iOS notch (if using safe-area-inset)
```

---

## Part 5: Interactive States

### 5.1 Button States

```tsx
// Primary Button
<button className="
  bg-gradient-to-r from-cyan-400 to-blue-500
  text-white font-semibold
  px-6 py-3 rounded-xl
  hover:opacity-90
  active:scale-95
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
">

// Secondary Button
<button className="
  bg-white/10 backdrop-blur-xl
  border border-white/20
  text-white
  px-4 py-2 rounded-xl
  hover:bg-white/20
  active:bg-white/30
  transition-all
">

// Icon Button
<button className="
  p-2
  bg-white/10 backdrop-blur-xl
  rounded-xl border border-white/20
  hover:bg-white/20
  transition-all
">
```

### 5.2 Card Interactions

```tsx
// Clickable Card
<div className="
  bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20
  hover:bg-white/15 hover:border-white/30
  active:scale-[0.98]
  transition-all duration-200 cursor-pointer
">
```

### 5.3 Focus States (Accessibility)

```tsx
// Focus ring (keyboard navigation)
className="focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
```

---

## Part 6: Animation Standards

### 6.1 Transitions

```tsx
// Standard transition
className="transition-all duration-200"

// Smooth transition
className="transition-all duration-300 ease-out"

// Spring-like
className="transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
```

### 6.2 Micro-interactions

```tsx
// Scale on tap
className="active:scale-95"

// Lift on hover
className="hover:-translate-y-0.5 hover:shadow-lg"

// Pulse for attention
className="animate-pulse"
```

### 6.3 Loading States

```tsx
// Skeleton shimmer
<div className="animate-pulse bg-white/10 rounded-xl h-20" />

// Spinner
<div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-cyan-400 rounded-full" />
```

---

## Part 7: Mobile-First Checklist

### 7.1 Touch Targets
- [ ] All buttons minimum 44×44px (iOS) or 48×48px (Material)
- [ ] Adequate spacing between touch targets (8px minimum)
- [ ] No tiny text-only links

### 7.2 Performance
- [ ] `backdrop-blur-xl` reduced to `backdrop-blur-md` on heavy screens
- [ ] Background attachment: scroll (not fixed) on mobile
- [ ] Images lazy loaded

### 7.3 Gestures
- [ ] Swipe-to-dismiss for modals
- [ ] Pull-to-refresh where appropriate
- [ ] No hover-dependent functionality

### 7.4 Safe Areas
- [ ] Bottom nav clearance (pb-24)
- [ ] Notch/status bar clearance
- [ ] Keyboard avoidance for forms

---

## Part 8: Visual Hierarchy Checklist

### 8.1 Screen Structure
```
┌─────────────────────────────┐
│  Header (Back + Title)      │  ← Fixed or scrollable
├─────────────────────────────┤
│                             │
│  Primary Content            │  ← Main focus area
│  (Hero card, main action)   │
│                             │
├─────────────────────────────┤
│  Secondary Content          │  ← Supporting info
│  (Stats, lists, etc.)       │
│                             │
├─────────────────────────────┤
│  CTA / Actions              │  ← Clear next step
└─────────────────────────────┘
│  Bottom Nav                 │  ← Fixed
└─────────────────────────────┘
```

### 8.2 Information Density
- [ ] One primary action per screen
- [ ] Maximum 3-5 items visible without scroll
- [ ] Clear visual grouping
- [ ] Adequate white space

---

## Output Format

```markdown
## Titan AI UX Audit Report

### Screen: [ScreenName]

### Summary
- Overall Score: ⭐⭐⭐⭐☆ (4/5)
- Issues: X critical, Y warnings, Z suggestions

### Glassmorphism
- [ ] ✅ Glass panels correct
- [ ] ⚠️ Missing blur on line 45
- [ ] ❌ Solid background on line 72

### Colors
- [ ] ✅ Neon accent used correctly
- [ ] ⚠️ Gradient inconsistency on line 89

### Typography
- [ ] ✅ Text hierarchy correct
- [ ] ⚠️ Using text-gray-400 instead of text-white/70

### Spacing
- [ ] ✅ Consistent padding
- [ ] ❌ Missing bottom nav clearance

### Interactions
- [ ] ✅ Hover states present
- [ ] ⚠️ Missing focus states for accessibility

### Mobile
- [ ] ✅ Touch targets adequate
- [ ] ⚠️ Heavy blur may impact performance

### Fixes Applied (if --fix)
1. Line 45: Added `backdrop-blur-xl`
2. Line 72: Changed `bg-gray-800` to `bg-white/10`
...

### Recommendations
1. Add loading skeleton for async content
2. Consider reducing blur intensity for performance
3. Add haptic feedback for button presses
```

---

## Example Usage

```
/titan-ux                           # Audit recent changes
/titan-ux --screen Dashboard        # Audit Dashboard screen
/titan-ux --component CelebrationModals  # Audit specific component
/titan-ux --fix                     # Audit and fix issues
/titan-ux --mobile                  # Mobile-focused audit
```

---

## Quick Reference Card

### Must-Have Classes
```tsx
// Glass card
"bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"

// Primary button
"bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl"

// Secondary button
"bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20"

// Text hierarchy
"text-white"        // Primary
"text-white/70"     // Secondary
"text-white/50"     // Tertiary

// Screen background
"min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
```

### Never Use
```tsx
// ❌ Solid backgrounds
"bg-gray-800", "bg-slate-900", "bg-black"

// ❌ Gray text colors
"text-gray-400", "text-gray-500"

// ❌ Sharp corners on cards
"rounded-md", "rounded-sm"

// ❌ Missing blur on glass
"bg-white/10" // without backdrop-blur
```
