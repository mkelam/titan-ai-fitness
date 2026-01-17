# /titan-review

Perform a comprehensive code review of recent changes or specified files against Titan AI project standards.

## Instructions

When this skill is invoked, review code for quality, security, performance, and consistency.

### Arguments
- No arguments: Review uncommitted changes (git diff)
- File path: Review specific file
- `--staged`: Review staged changes only
- `--last-commit`: Review last commit

### Step 1: Identify Changes
```bash
# Uncommitted changes
git diff

# Staged changes
git diff --staged

# Last commit
git show --stat HEAD
```

### Step 2: Code Quality Checks

#### TypeScript Best Practices
- [ ] Proper typing (no `any` unless justified)
- [ ] Interfaces for complex objects
- [ ] Enums for fixed sets of values
- [ ] Optional chaining (`?.`) where appropriate
- [ ] Nullish coalescing (`??`) over `||` for defaults

#### React Patterns
- [ ] Functional components with hooks
- [ ] Proper dependency arrays in useEffect/useCallback/useMemo
- [ ] No unnecessary re-renders (check memo usage)
- [ ] Event handlers properly typed
- [ ] Keys on list items
- [ ] Cleanup in useEffect where needed

#### State Management
- [ ] Local state for component-only data
- [ ] Context for shared state
- [ ] No prop drilling (use context if >2 levels)
- [ ] Immutable state updates

### Step 3: Design System Compliance

#### Glassmorphic Styling
```typescript
// Required patterns
✅ bg-white/10 backdrop-blur-xl
✅ border border-white/20
✅ rounded-xl or rounded-2xl
✅ text-white (primary) / text-white/70 (secondary)

// Avoid
❌ bg-gray-800 (use bg-white/10)
❌ border-gray-700 (use border-white/20)
❌ opacity-70 (use text-white/70)
```

#### Color Palette
```typescript
// Project colors
✅ from-cyan-400 to-blue-500 (primary gradient)
✅ from-yellow-400 to-amber-500 (XP/gold)
✅ from-green-400 to-emerald-500 (success)
✅ from-red-400 to-orange-500 (warning/error)

// Rarity tiers
✅ gray (common)
✅ blue-400/600 (rare)
✅ purple-400/600 (epic)
✅ yellow-400/amber-500 (legendary)
```

### Step 4: Security Review

#### Frontend
- [ ] No sensitive data in localStorage (tokens OK, passwords NEVER)
- [ ] User input sanitized before display
- [ ] No dangerouslySetInnerHTML without sanitization
- [ ] API keys not hardcoded

#### Backend
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma parameterized)
- [ ] XSS prevention (output encoding)
- [ ] Authentication required where needed
- [ ] Authorization checks (user owns resource)
- [ ] Rate limiting on sensitive endpoints
- [ ] No secrets in code or logs

### Step 5: Performance Review

#### Frontend
- [ ] Large lists use virtualization or pagination
- [ ] Images optimized (WebP, lazy loading)
- [ ] No unnecessary API calls
- [ ] Expensive calculations memoized
- [ ] Bundle size reasonable (check imports)

#### Backend
- [ ] Database queries optimized (includes, selects)
- [ ] N+1 queries avoided
- [ ] Caching used where appropriate
- [ ] Async operations don't block

### Step 6: Error Handling

#### Frontend
- [ ] Try/catch around async operations
- [ ] User-friendly error messages
- [ ] Loading states shown
- [ ] Empty states handled

#### Backend
- [ ] All errors go through error middleware
- [ ] Appropriate HTTP status codes
- [ ] Error messages don't expose internals
- [ ] Errors logged for debugging

### Step 7: Documentation

- [ ] Complex functions have comments
- [ ] Public APIs documented
- [ ] Types self-documenting
- [ ] README updated if needed

## Output Format

```markdown
## Titan AI Code Review

### Files Reviewed
- file1.tsx
- file2.ts

### Summary
- Overall: ✅ APPROVED / ⚠️ NEEDS CHANGES / ❌ REJECTED
- Issues: X critical, Y warnings, Z suggestions

### Critical Issues (Must Fix)
1. **[Security]** File:line - Description
   - Current: `code`
   - Suggested: `code`

### Warnings (Should Fix)
1. **[Performance]** File:line - Description

### Suggestions (Nice to Have)
1. **[Style]** File:line - Description

### Positive Notes
- Good use of X in file.tsx
- Clean implementation of Y

### Checklist
- [ ] TypeScript: Pass
- [ ] Design System: Pass
- [ ] Security: Pass
- [ ] Performance: Pass
- [ ] Error Handling: Pass
```

## Review Standards

### Severity Levels
- **Critical**: Security vulnerabilities, data loss risk, crashes
- **Warning**: Performance issues, code smells, maintainability
- **Suggestion**: Style improvements, optional optimizations

### Auto-Approve Criteria
Code can be auto-approved if:
- No critical issues
- No more than 2 warnings
- TypeScript passes
- Design system followed

## Example Usage

```
/titan-review                    # Review uncommitted changes
/titan-review src/views/Dashboard.tsx   # Review specific file
/titan-review --staged           # Review staged changes
/titan-review --last-commit      # Review last commit
```
