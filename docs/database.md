# Database & Data Model Guide for LLM Coding Agents

**Purpose**: This document explains the data structures used by the Questline library, specifically the `QuestlineExport` format.

---

## Core Data Types

### QuestlineExport (The Root)
This matches the structure of `positions.json` inside the exported zip.

```typescript
interface QuestlineExport {
  questlineId: string;
  frameSize: { width: number; height: number }; // Original design size
  quests: Quest[];
  // Optional components
  timer?: TimerComponent;
  header?: HeaderComponent;
  rewards?: RewardsComponent;
  button?: ButtonComponent;
}
```

### Quest Component
Represents a single node in the quest path.

```typescript
interface Quest {
  questKey: string; // Unique ID
  stateBounds: {
    locked: ImageBounds;
    active: ImageBounds;
    unclaimed: ImageBounds;
    completed: ImageBounds;
  };
  // Optional overrides for specific images
  lockedImg?: string;
  // ...
}
```

### ImageBounds
Defines where an element is drawn relative to the `frameSize`.

```typescript
interface ImageBounds {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}
```

---

## Asset Structure

When a theme is exported, it follows this structure in the Zip:

```
theme.zip
├── positions.json          # The QuestlineExport data
├── background.webp
├── header_active.webp
├── header_fail.webp
├── quest1_locked.webp
├── quest1_active.webp
└── ...
```

### Helper: `ExtractedAssets`
The `extractQuestlineZip` utility converts the flat zip into this structured object:

```typescript
interface ExtractedAssets {
  questlineData: QuestlineExport;
  backgroundImage?: string; // Blob URL
  questImages: {
    [questKey: string]: {
      locked?: string; // Blob URL
      active?: string;
      // ...
    };
  };
  // ...
}
```

---

## Common Patterns

### 1. State-Based Bounds
Each component (Quest, Header, Rewards) has `stateBounds`. This means the **position and size** can change depending on the state (e.g., a "locked" quest might be smaller than an "active" one).

### 2. Scale Independence
All coordinates in `QuestlineExport` are in "design space" (e.g., 800x600). The `QuestlineViewer` handles scaling this to the actual screen size using the `scale` prop.

---

## Common Mistakes

❌ **Don't**: Assume a quest has fixed coordinates.
✅ **Do**: Always look up coordinates in `stateBounds[currentState]`.

❌ **Don't**: Parse `positions.json` manually.
✅ **Do**: Use the types defined in `src/lib/types.ts`.
