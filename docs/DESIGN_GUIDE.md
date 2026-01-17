# Titan AI - Glassmorphic Design Guide

## 🎨 Visual Design Philosophy

**Titan AI** uses a **highly translucent glassmorphic theme** with a cinematic fitness model background, creating an immersive, premium feel that evokes elite performance and cutting-edge technology.

---

## 🖼️ Background System

### Primary Background
```css
Background Image: Unsplash fitness model (grayscale/dark)
Gradient Overlay:
  - Top: rgba(0, 0, 0, 0.85)
  - Middle: rgba(0, 0, 0, 0.75)
  - Bottom: rgba(0, 0, 0, 0.85)
Attachment: Fixed (parallax effect on desktop)
```

**Effect:** The fitness model background is visible through all glass panels, creating depth and motivation.

---

## 💎 Glassmorphism Effects

### Glass Panel (Default)
Used for: Cards, widgets, containers

```css
.glass-panel {
  background: rgba(15, 15, 15, 0.4);         /* Very translucent */
  backdrop-filter: blur(24px) saturate(180%); /* Strong blur + color boost */
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.5),        /* Depth */
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1); /* Inner highlight */
}
```

**Translucency Level:** 60% transparent (40% opaque)

### Glass Modal (Enhanced)
Used for: Modals, important overlays

```css
.glass-modal {
  background: rgba(10, 10, 10, 0.7);         /* Slightly less translucent */
  backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 20px 60px 0 rgba(0, 0, 0, 0.7),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
}
```

**Translucency Level:** 30% transparent (70% opaque)

### Glass Input (Lightest)
Used for: Text inputs, form fields

```css
.glass-input {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #00ff9d;
  box-shadow: 0 0 0 3px rgba(0, 255, 157, 0.1);
}
```

**Translucency Level:** 94% transparent (6% opaque)

---

## ✨ Neon Accent System

### Primary Neon: #00ff9d (Cyan/Green)

**Usage:**
- Primary CTA buttons
- Active states
- XP progress bars
- Success indicators
- Coach nudges

**Effects:**
```css
.text-neon {
  color: #00ff9d;
  text-shadow:
    0 0 10px rgba(0, 255, 157, 0.5),
    0 0 20px rgba(0, 255, 157, 0.3),
    0 0 30px rgba(0, 255, 157, 0.2);
}

.bg-neon {
  background-color: #00ff9d;
  box-shadow:
    0 0 20px rgba(0, 255, 157, 0.4),
    0 0 40px rgba(0, 255, 157, 0.2);
}
```

**Visual Result:** Glowing, futuristic accent that stands out against dark glass

### Secondary Accents

| Color | Hex | Usage |
|-------|-----|-------|
| **Orange/Fire** | #f97316 | Streak indicators, warnings |
| **Blue** | #3b82f6 | Protein tracking, water |
| **Yellow/Gold** | #fbbf24 | Achievements, level-ups |
| **Red** | #ef4444 | Alerts, errors |

---

## 🎭 Component Styles

### Dashboard Widgets
```tsx
<DashboardWidget />
```

**Visual Characteristics:**
- Glass panel background (60% transparent)
- Icon at top (3xl size)
- Label in uppercase (10px, gray-500)
- Value in bold (2xl)
- Optional progress bar at bottom
- Hover: Lifts 1px + brighter background

### Modals
```tsx
<div className="modal-backdrop">  {/* Dark blur overlay */}
  <GlassCard className="glass-modal"> {/* Enhanced glass */}
    ...
  </GlassCard>
</div>
```

**Backdrop:**
- `background: rgba(0, 0, 0, 0.85)`
- `backdrop-filter: blur(10px)`

**Card:**
- Enhanced glass (70% opaque)
- Stronger blur (40px)
- Higher contrast border

### Buttons

**Primary (Neon):**
```css
bg-neon text-black
box-shadow: 0 0 20px rgba(0, 255, 157, 0.4)
```

**Secondary (Glass):**
```css
bg-white/10 text-white border-white/10
hover:bg-white/20
```

**Danger:**
```css
bg-red-500/80 text-white
box-shadow: 0 0 15px rgba(239, 68, 68, 0.4)
```

---

## 🌊 Blur Strength Guide

| Element | Blur Amount | When to Use |
|---------|-------------|-------------|
| **8px** | Light glass | Tooltips, popovers |
| **16px** | Default glass | Mobile optimization |
| **24px** | Standard panels | Dashboard cards, widgets |
| **40px** | Modals | Overlays, important dialogs |
| **10px** | Backdrops | Modal backgrounds |

---

## 🎬 Animations

### Shimmer Effect
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.shimmer {
  animation: shimmer 3s infinite;
  background: linear-gradient(90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.1) 50%,
    rgba(255,255,255,0) 100%
  );
}
```

**Usage:** Loading states, skeleton screens

### Pulse Neon
```css
@keyframes pulse-neon {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 20px rgba(0, 255, 157, 0.4);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 30px rgba(0, 255, 157, 0.6);
  }
}

.pulse-neon {
  animation: pulse-neon 2s infinite;
}
```

**Usage:** Notification badges, active quest indicators

### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

**Usage:** Floating elements, achievement unlocks

---

## 🔢 Spacing Scale

All spacing uses Tailwind's default scale:

| Class | Pixels | Usage |
|-------|--------|-------|
| `gap-1` | 4px | Tight icon + text |
| `gap-2` | 8px | Buff pills |
| `gap-3` | 12px | Card content |
| `gap-4` | 16px | Widget grid |
| `gap-6` | 24px | Section spacing |
| `p-3` | 12px | Small cards |
| `p-4` | 16px | Standard cards |
| `p-6` | 24px | Large cards, sections |

---

## 📱 Mobile Optimizations

### Performance
```css
@media (max-width: 768px) {
  body {
    background-attachment: scroll; /* Fixed is heavy on mobile */
  }

  .glass-panel {
    backdrop-filter: blur(16px) saturate(160%); /* Reduced blur */
  }
}
```

### Touch Targets
- Minimum: 44px × 44px (iOS guideline)
- Buttons: 48px height
- Icons: 24px default, 36px for primary actions

---

## 🎨 Color Palette

### Grayscale (on dark)
```css
Black: #000000
Dark Gray: #0f0f0f (glass background)
Medium Gray: #333333
Light Gray: #666666
Text Gray: #9ca3af (gray-400)
Border Gray: rgba(255, 255, 255, 0.12)
White: #ffffff
```

### Brand Colors
```css
Neon Primary: #00ff9d
Neon Dark: #00d17a
Neon Glow: rgba(0, 255, 157, 0.4)

Success: #22c55e
Warning: #fbbf24
Error: #ef4444
Info: #3b82f6
```

---

## 🖋️ Typography

### Font Family
```css
font-family: 'Space Grotesk', sans-serif;
```

**Characteristics:**
- Modern, tech-forward
- High legibility
- Supports 300-700 weights

### Text Styles

| Element | Size | Weight | Color | Usage |
|---------|------|--------|-------|-------|
| **H1** | 48px | 700 | White | Page titles |
| **H2** | 32px | 700 | White | Section headers |
| **H3** | 24px | 700 | White | Card titles |
| **Body** | 16px | 400 | White | Body text |
| **Caption** | 12px | 600 | Gray-400 | Labels, metadata |
| **Tiny** | 10px | 700 | Gray-500 | Widget labels |

### Text Effects
```css
.text-neon {
  text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
}

.text-glow-white {
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
}
```

---

## 🎯 Design Principles

### 1. Depth through Translucency
- Every element shows the background through it
- Creates visual hierarchy without heavy borders
- Background always visible = constant motivation

### 2. Minimal but Impactful
- Use glass, not solid colors
- White space important even on dark
- One primary action per screen

### 3. Performance First
- Reduced blur on mobile
- Scroll-based backgrounds on mobile
- Lazy load heavy images

### 4. Accessibility
- All text at least 4.5:1 contrast
- Focus states with neon outline
- Large touch targets (48px min)

---

## 📐 Layout Grid

### Dashboard Grid
```tsx
<div className="grid grid-cols-2 gap-4">
  {/* 2 columns on mobile */}
</div>
```

### Modal Max Width
```tsx
<div className="w-full max-w-md">
  {/* 28rem = 448px */}
</div>
```

### Safe Areas
```css
padding-bottom: 96px; /* 24rem for bottom nav */
padding-top: 48px;    /* 12rem for status bar */
```

---

## 🎨 Example Components

### Neon Card
```tsx
<GlassCard className="card-neon">
  {/* Green left border + neon background tint */}
</GlassCard>
```

### Buff Pill
```tsx
<div className="buff-pill">
  <span className="material-symbols-rounded text-yellow-400">bolt</span>
  <span>+10% STR</span>
</div>
```

### Progress Bar (Neon)
```tsx
<div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
  <div
    className="bg-neon h-full transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## 🔍 Customization Variables

If you want to adjust the theme, modify these in [index.css](index.css):

```css
/* Translucency levels */
--glass-panel-opacity: 0.4;    /* 40% opaque */
--glass-modal-opacity: 0.7;     /* 70% opaque */
--glass-input-opacity: 0.06;    /* 6% opaque */

/* Blur amounts */
--blur-panel: 24px;
--blur-modal: 40px;
--blur-input: 12px;

/* Neon color */
--neon-primary: #00ff9d;
```

---

## 🚀 Quick Start

### Adding a New Glass Component
```tsx
import { GlassCard } from './components/UI';

<GlassCard className="p-6">
  {/* Content automatically gets glass effect */}
</GlassCard>
```

### Using Neon Accents
```tsx
<button className="bg-neon text-black px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Creating a Modal
```tsx
<div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-6">
  <GlassCard className="glass-modal w-full max-w-md">
    {/* Modal content */}
  </GlassCard>
</div>
```

---

## 📚 Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Space Grotesk Font**: https://fonts.google.com/specimen/Space+Grotesk
- **Material Symbols**: https://fonts.google.com/icons
- **Unsplash (backgrounds)**: https://unsplash.com/s/photos/fitness

---

**Built with precision. Designed for champions.** 💪
