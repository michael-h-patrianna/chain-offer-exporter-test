# Testing Guide for LLM Coding Agents

**Purpose**: This document teaches you how to write and run tests.

**Tech Stack**: Vitest (Unit/Component), Playwright (E2E).

---

## Testing Principles

### 1. Memory Management (CRITICAL)
**Rule**: Tests must be memory efficient.
- **Max Workers**: 4 (configured in `vitest.config.ts`)
- **Cleanup**: Always clean up listeners/timers.
- **Batching**: Don't generate massive datasets in one test.
- **Reference**: See `CLAUDE.md` for detailed rules.

### 2. Component Testing
We use `@testing-library/react` with Vitest.

**Template**:
```tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent prop="value" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 3. E2E Testing
We use Playwright for visual and integration testing.
**Location**: `scripts/playwright/`

**Template**:
```ts
import { test, expect } from '@playwright/test';

test('chainoffer flows', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.chainoffer-viewer')).toBeVisible();
  // Interaction
  await page.click('[data-testid="quest-1"]');
});
```

---

## Running Tests

### Unit & Component Tests
```bash
npm test              # Run all Vitest tests
npm run test:coverage # Run with coverage
```

### E2E Tests
```bash
npm run test:e2e        # Run Playwright (headless)
npm run test:e2e:headed # Run Playwright (visible)
```

---

## Common Patterns

### Testing Renderers
Since renderers depend on `scale` and `state`:
1. Mock the props with standard design-space coordinates.
2. Render with `scale={1}` for simplicity.
3. Verify styles/positions match the input.

### Testing Hooks
Use `renderHook` from `@testing-library/react`.

```tsx
import { renderHook, act } from '@testing-library/react';
import { useChainOfferState } from './useChainOfferState';

test('should toggle state', () => {
  const { result } = renderHook(() => useChainOfferState(mockData));
  act(() => {
    result.current.cycleQuestState('quest1');
  });
  expect(result.current.questStates['quest1']).toBe('active');
});
```

---

## Common Mistakes

❌ **Don't**: Use `vitest` in watch mode for automation.
✅ **Do**: Use `npm test` (single run).

❌ **Don't**: Spawn excessive workers or heavy JSDOM for pure logic tests.
✅ **Do**: Use `.test.ts` (not `.tsx`) for pure logic to avoid JSDOM overhead.
