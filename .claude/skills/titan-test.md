# /titan-test

Test the Titan AI codebase for quality, consistency, and functionality.

## Instructions

When this skill is invoked, perform a comprehensive test of the codebase:

### 1. TypeScript Checks
Run TypeScript compiler to check for type errors:
```bash
cd "c:\Users\Mac\OneDrive\Desktop\Projects\Titan AI"
npx tsc --noEmit
```

If there are errors, list them clearly and offer to fix them.

### 2. Backend TypeScript (if backend exists)
```bash
cd "c:\Users\Mac\OneDrive\Desktop\Projects\Titan AI\backend"
npx tsc --noEmit
```

### 3. Component Export Verification
Check that all components in `src/components/` and `src/views/` are properly exported:
- Verify each `.tsx` file has a default or named export
- Check that imports in `App.tsx` resolve correctly

### 4. Route Verification
Scan `App.tsx` for all routes and verify:
- Each route points to an existing view component
- No duplicate routes exist
- All Screen enum values have corresponding routes

### 5. Glassmorphic Styling Consistency
Spot-check 3-5 random view files for design system compliance:
- Background: `bg-white/10` or `bg-white/5` with `backdrop-blur-xl`
- Text colors: `text-white` primary, `text-white/70` secondary
- Borders: `border border-white/20`
- Gradients use project colors (cyan-400, blue-500, etc.)

### 6. Navigation Testing
Verify navigation links exist:
- Dashboard has links to main features
- Back buttons use proper navigation
- No dead-end screens (screens with no way to navigate away)

### 7. Dev Server Check (Optional)
If requested, start the dev server and verify it runs:
```bash
npm run dev
```

## Output Format

Provide a summary report:

```
## Titan AI Test Report

### TypeScript
- Frontend: ✅ No errors / ❌ X errors found
- Backend: ✅ No errors / ❌ X errors found

### Components
- Total components: X
- Export issues: None / List issues

### Routes
- Total routes: X
- Issues: None / List issues

### Design Consistency
- Checked: [list files]
- Issues: None / List issues

### Navigation
- Issues: None / List issues

### Overall Status: ✅ PASS / ⚠️ WARNINGS / ❌ FAIL
```

## Arguments

- No arguments: Run full test suite
- `--quick`: Only run TypeScript checks
- `--style`: Only check design system consistency
- `--fix`: Attempt to fix issues found
