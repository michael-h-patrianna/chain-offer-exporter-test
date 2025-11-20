# Local Development Guide for LLM Coding Agents

**Purpose**: This document teaches you how to run the application locally and execute key commands.

**Tech Stack**: Vite, NPM.

---

## Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Dev Server
```bash
npm run dev
```
This starts the `demo` app at `http://localhost:5173`.

---

## Build Commands

### Build Library & Demo
```bash
npm run build
```
This runs `tsc` (TypeCheck) and `vite build`.

### Type Check Only
```bash
npm run typecheck
```

### Linting & Formatting
```bash
npm run lint      # Check for lint errors
npm run lint:fix  # Fix lint errors
npm run format    # Format code with Prettier
```

---

## Key Scripts

| Task | Command | Description |
|------|---------|-------------|
| **Start Dev** | `npm run dev` | Starts Vite dev server |
| **Test** | `npm test` | Runs Vitest unit tests |
| **E2E** | `npm run test:e2e` | Runs Playwright tests |
| **Build** | `npm run build` | Production build |
| **Format** | `npm run format` | Prettifies code |

---

## Troubleshooting

### Memory Issues during Test
**Issue**: Tests crash or freeze.
**Solution**: Check `CLAUDE.md` memory rules. Ensure no infinite loops or massive data generation. Run `node scripts/cleanup-vitest.mjs`.

### Theme Issues
**Issue**: Demo looks broken or missing images.
**Solution**: Ensure `public/theme.zip` or `public/assets/` exists. The demo relies on these static assets.
