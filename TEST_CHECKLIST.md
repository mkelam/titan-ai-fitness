# 🧪 Titan AI - Testing Checklist

## ✅ Build Status

**Server:** ✅ Running at http://localhost:3000
**Vite Build:** ✅ Ready in 742ms
**HMR:** ✅ Hot Module Replacement active
**Errors:** ✅ None (all components compiling successfully)

---

## 🎯 Manual Testing Guide

### **Test 1: PWA Infrastructure** ⚙️

#### Service Worker Registration
1. Open http://localhost:3000
2. Open DevTools (F12) → Console
3. Look for: `"SW registered: ServiceWorkerRegistration"`
   - ✅ **Expected:** Service worker registered successfully
   - ❌ **If failed:** Check [public/sw.js](public/sw.js) exists

#### Manifest Loading
1. DevTools → Application → Manifest
2. Verify manifest.json loaded
   - ✅ **Expected:** Name: "Titan AI - Elite Fitness Tracker"
   - ✅ **Expected:** Theme color: #00ff9d
   - ⚠️ **Warning:** Icons won't load yet (placeholders only)

#### Install Prompt (Desktop Chrome)
1. Look for install icon in address bar (⊕)
2. Click "Install Titan AI"
   - ✅ **Expected:** App opens as standalone window
   - ⚠️ **Note:** Requires HTTPS in production (localhost works for testing)

---

### **Test 2: Glassmorphic Design** 🎨

#### Background Image
1. Open http://localhost:3000
2. Check if fitness model background is visible
   - ✅ **Expected:** Dark, athletic background image through glass panels
   - ❌ **If failed:** Check [index.css](index.css) line 9 - Unsplash URL

#### Glass Panel Translucency
1. Hover over dashboard widgets
2. Observe background visibility through panels
   - ✅ **Expected:** See background image through glass (60% transparent)
   - ✅ **Expected:** Hover effect: Panel lifts 1px, gets brighter

#### Modal Glass Effect
1. Click any widget (Weight, Photo, or Calorie)
2. Modal appears with enhanced glass
   - ✅ **Expected:** Strong blur (40px)
   - ✅ **Expected:** Dark backdrop with blur behind modal
   - ✅ **Expected:** Close button works

#### Neon Glow Effects
1. Look at primary buttons ("ENTER THE ARENA", "Save Weight")
2. Check for neon glow (#00ff9d)
   - ✅ **Expected:** Green glow shadow around buttons
   - ✅ **Expected:** Active state: Glow intensifies

---

### **Test 3: Data Persistence** 💾

#### Weight Logging
1. Click **Weight widget** on dashboard
2. Enter weight: `185`
3. Click "Save Weight"
4. Verify widget shows "185 lbs"
   - ✅ **Expected:** Widget updates immediately
5. **Refresh the page (F5)**
6. Check weight widget again
   - ✅ **Expected:** Still shows "185 lbs"
7. Open DevTools → Application → Local Storage → localhost:3000
8. Look for `titan-weight` key
   - ✅ **Expected:** JSON array with your weight entry

#### Calorie Logging
1. Click **Calories widget**
2. Enter calories: `1200`, protein: `120`
3. Click "Save Nutrition"
4. Verify progress bars fill up
   - ✅ **Expected:** Calorie bar: 48% (1200/2500)
   - ✅ **Expected:** Protein bar: 66% (120/180)
5. **Refresh the page**
6. Click Calories widget again
   - ✅ **Expected:** Values still there (1200, 120)
7. Check localStorage → `titan-nutrition`
   - ✅ **Expected:** Today's nutrition log saved

#### Photo Upload
1. Click **Photos widget**
2. Click camera icon
3. Select/capture a photo
   - ✅ **Expected:** Photo preview appears
4. Click "Save Photo"
5. Check Photos widget status
   - ✅ **Expected:** Changes from "Weekly Due" to "Up to date"
6. Check localStorage → `titan-weight` (photos stored here)
   - ✅ **Expected:** Base64 image data in photos array

---

### **Test 4: XP & Leveling System** ⚡

#### Initial State
1. Fresh install (or clear localStorage)
2. Check dashboard hero section
   - ✅ **Expected:** Level 1, XP: 0/100

#### Earning XP
1. Log weight → **+10 XP**
2. Check XP counter: Should show `⚡ 10/100`
3. Log nutrition → **+10 XP**
4. Check XP counter: Should show `⚡ 20/100`
5. Upload photo → **+20 XP**
6. Check XP counter: Should show `⚡ 40/100`
   - ✅ **Expected:** XP increases with each action

#### Level Up Test
1. Open DevTools → Console
2. Run this code to add 100 XP:
   ```javascript
   // Get stats from localStorage
   let stats = JSON.parse(localStorage.getItem('titan-stats'));
   stats.xp = 95; // Set to 95 XP (5 away from level 2)
   localStorage.setItem('titan-stats', JSON.stringify(stats));
   location.reload();
   ```
3. After reload, log any action (+10 XP)
4. Check level display
   - ✅ **Expected:** Level increases to 2
   - ✅ **Expected:** XP resets with overflow (5/150)

---

### **Test 5: Streak Tracking** 🔥

#### Initial Streak
1. Fresh install
2. Check dashboard streak card
   - ✅ **Expected:** "0 Day Streak"

#### Coach Nudge (Dynamic)
1. With 0 streak, check coach nudge message
   - ✅ **Expected:** "Let's get started! Log your first workout..."
2. Increase streak (modify localStorage):
   ```javascript
   let stats = JSON.parse(localStorage.getItem('titan-stats'));
   stats.streak = 7;
   localStorage.setItem('titan-stats', JSON.stringify(stats));
   location.reload();
   ```
3. Check coach nudge again
   - ✅ **Expected:** "Great momentum! You're on a 7-day streak..."

#### Buff Pill Display
1. Set streak to 8+ days (see code above)
2. Reload page
3. Check buffs row under avatar
   - ✅ **Expected:** "On Fire (8 days)" pill appears
   - ✅ **Expected:** Orange fire icon

---

### **Test 6: Real-Time UI Updates** 🔄

#### Context Integration
1. Open Weight modal, log weight
2. Watch widget update **without page refresh**
   - ✅ **Expected:** Instant update (React context working)

3. Open Calorie modal, log nutrition
4. Watch progress bars fill **without page refresh**
   - ✅ **Expected:** Smooth animation (500ms transition)

5. Check level/XP counter after each action
   - ✅ **Expected:** Updates in real-time

---

### **Test 7: Mobile Responsiveness** 📱

#### Viewport Sizes
1. Open DevTools → Toggle Device Toolbar (Ctrl+Shift+M)
2. Test these sizes:
   - **iPhone SE (375×667)**
   - **iPhone 12 Pro (390×844)**
   - **iPad (768×1024)**

#### Check:
- ✅ Dashboard widgets in 2-column grid
- ✅ Modals fit screen (max-width: 448px)
- ✅ Text readable (no overflow)
- ✅ Touch targets minimum 48px
- ✅ Bottom nav doesn't overlap content (pb-24 spacing)

#### Mobile Blur Optimization
1. Inspect glass panels on mobile
2. Check computed styles
   - ✅ **Expected:** `backdrop-filter: blur(16px)` (reduced from 24px)

---

### **Test 8: Navigation Flow** 🧭

#### Bottom Navigation
1. Click each nav icon:
   - **Home** → Dashboard ✅
   - **Train** → Training Log ✅
   - **AI Coach** (center +) → Work in Progress screen ✅
   - **Stats** → Work in Progress screen ✅
   - **Profile** → Work in Progress screen ✅

2. Check active states
   - ✅ **Expected:** Active icon is neon green
   - ✅ **Expected:** Inactive icons are gray

#### View Transitions
1. Dashboard → Training Log → Back button
   - ✅ **Expected:** Returns to Dashboard
2. Dashboard → Skill Tree → Back button
   - ✅ **Expected:** Returns to Dashboard

---

### **Test 9: Input Field UX** ⌨️

#### Glass Input Focus States
1. Open Weight modal
2. Click weight input field
   - ✅ **Expected:** Neon green border glow appears
   - ✅ **Expected:** Background slightly brighter (8% opacity)
3. Type a number
   - ✅ **Expected:** Text is white, readable
4. Tab to Body Fat field
   - ✅ **Expected:** First field loses focus, second gets neon glow

#### Placeholder Visibility
1. Empty inputs should show placeholders:
   - Weight: "185.0"
   - Calories: "1200"
   - Protein: "120"
   - ✅ **Expected:** Gray, readable text

---

### **Test 10: Error Handling** ⚠️

#### Missing Data
1. Click "Save Weight" without entering value
   - ✅ **Expected:** Nothing happens (validation working)

#### localStorage Quota
1. Check available storage:
   ```javascript
   navigator.storage.estimate().then(est => {
     console.log(`Used: ${est.usage}, Quota: ${est.quota}`);
   });
   ```
   - ✅ **Expected:** Console shows storage info

---

### **Test 11: Performance** ⚡

#### Page Load Speed
1. Hard refresh (Ctrl+Shift+R)
2. Open DevTools → Network tab
3. Check load time
   - ✅ **Target:** < 2 seconds (localhost)
   - ✅ **Expected:** Most assets < 100ms

#### Lighthouse Score
1. DevTools → Lighthouse
2. Run audit (Desktop)
3. Check scores:
   - **Performance:** Target 90+
   - **Accessibility:** Target 90+
   - **Best Practices:** Target 90+
   - **PWA:** Target 90+ (⚠️ Icons missing, so 70+ OK for now)

---

### **Test 12: Browser Compatibility** 🌐

Test on these browsers (if available):

- ✅ **Chrome 90+** (primary target)
- ✅ **Edge 90+** (Chromium-based)
- ✅ **Safari 14+** (iOS/macOS)
- ✅ **Firefox 90+**

#### Key Features to Verify:
- Backdrop blur works (Safari may have issues)
- Service worker registers
- localStorage works
- Glassmorphism renders correctly

---

## 🐛 Known Issues / Limitations

### **PWA Icons** ⚠️
- **Issue:** Icon paths in manifest.json point to placeholders
- **Impact:** Install prompt may not show properly
- **Fix:** Generate icons (see [icons generation](#icon-generation))

### **Background Image** ⚠️
- **Issue:** Unsplash URL requires internet connection
- **Impact:** Background won't load offline on first visit
- **Fix:** Download image to `/public/` and update [index.css](index.css)

### **Camera Access** ⚠️
- **Issue:** Requires HTTPS in production
- **Impact:** Photo upload won't work on deployed HTTP site
- **Fix:** Deploy to HTTPS (Vercel, Netlify, etc.)

---

## 🔧 Debugging Tips

### **Service Worker Not Registering**
```javascript
// Check in console
if ('serviceWorker' in navigator) {
  console.log('Service Worker supported');
} else {
  console.log('Service Worker NOT supported');
}
```

### **localStorage Not Saving**
```javascript
// Check quota
console.log(localStorage.length, 'items in storage');

// View all keys
Object.keys(localStorage).filter(k => k.startsWith('titan-'));

// Clear all data
Object.keys(localStorage)
  .filter(k => k.startsWith('titan-'))
  .forEach(k => localStorage.removeItem(k));
```

### **Glass Effects Not Showing**
1. Check browser support:
   ```javascript
   CSS.supports('backdrop-filter', 'blur(24px)');
   // Should return true
   ```
2. Check [index.css](index.css) is loaded:
   - View Page Source → Look for `<link rel="stylesheet" href="/index.css">`

---

## ✅ Final Checklist

Before marking as complete:

- [ ] Server running without errors
- [ ] Dashboard loads with background image
- [ ] All 4 widgets functional (Weight, Photo, Calorie, Training)
- [ ] Weight modal saves data
- [ ] Calorie modal saves data
- [ ] Photo modal accepts uploads
- [ ] Data persists on page refresh
- [ ] XP increases on actions
- [ ] Glass effects visible (translucent panels)
- [ ] Neon glow on buttons/focus states
- [ ] Mobile responsive (2-column grid)
- [ ] Bottom nav works (all 5 icons)
- [ ] Service worker registered
- [ ] localStorage has data (check DevTools)

---

## 🚀 Next Steps After Testing

Once all tests pass:

1. **Generate PWA Icons** - Use https://realfavicongenerator.net/
2. **Download Background Image** - Save to `/public/bg-fitness.jpg`
3. **Build Nutrition Log View** - Next major feature
4. **Connect Training Log** - Save workouts to context
5. **Add Firebase Auth** - Google/Apple sign-in

---

## 📞 Get Help

If something doesn't work:

1. Check browser console for errors (F12)
2. Check Network tab for failed requests
3. Verify [index.css](index.css) loads (view source)
4. Clear localStorage and try again
5. Hard refresh (Ctrl+Shift+R)

---

**App URL:** http://localhost:3000
**Status:** ✅ All systems ready for testing!

**Go test it now and let me know what you find!** 🧪
