# Architecture Guide for LLM Coding Agents

**Purpose**: This document helps you make architectural decisions and locate/place code correctly.

**Tech Stack**: React 19, Vite 7, TypeScript 5, Standard CSS (with Custom Properties).

---

## Core Architectural Principles

### 1. Coordinator-Renderer Pattern
**Mental Model**: The `QuestlineViewer` is the "Coordinator" that handles layout, scaling, and state orchestration. It delegates specific drawing logic to "Renderers" (e.g., `QuestRenderer`, `ButtonRenderer`).
**Decision Rule**:
- If it involves global state or layout -> `QuestlineViewer`
- If it involves drawing a specific element -> `Renderers`

### 2. Dual-Platform Compatibility (CRITICAL)
**Mental Model**: We are building a React web library that must remain compatible with future React Native ports.
**Decision Rule**: Avoid web-specific CSS features that don't map to React Native.

**✅ ALLOWED**:
- Transforms (`translate`, `scale`, `rotate`)
- Opacity
- Flexbox layouts
- Absolute positioning

**❌ FORBIDDEN**:
- `backdrop-filter`
- Radial/Conic gradients (unless using a compatible library)
- Complex CSS selectors (`:nth-child`, `~`)
- Floats

### 3. State Management
**Mental Model**: State is managed via React Context (`QuestlineContext`) or Custom Hooks (`useQuestlineState`). Logic is separated from UI.

---

## Where to Put New Code

```
src/
├── lib/
│   ├── components/
│   │   ├── QuestlineViewer.tsx      # Main Coordinator
│   │   └── renderers/               # Individual Element Renderers
│   ├── hooks/                       # Logic & State
│   ├── theme/                       # Design tokens & styles
│   ├── utils/                       # Pure functions (math, scaling)
│   └── types.ts                     # TS Interfaces
├── demo/                            # Example App (Consumer)
└── tests/                           # Unit/Component Tests
```

**When creating new functionality**:
1. **Pure Logic/Math** → `src/lib/utils/`
2. **State Logic** → `src/lib/hooks/`
3. **New UI Element** → `src/lib/components/renderers/`
4. **Global Layout Change** → `src/lib/components/QuestlineViewer.tsx`

---

## Component Patterns

### Renderer Pattern
**Template**:
```tsx
interface Props {
  data: ComponentData;
  scale: number;
  state: ComponentState;
}

export const MyRenderer: React.FC<Props> = ({ data, scale, state }) => {
  // 1. Calculate styles based on scale
  const style = {
    transform: `scale(${scale})`,
    // ...
  };

  // 2. Render
  return <div style={style}>...</div>;
};
```

### Hook Pattern
**Template**:
```ts
export const useMyFeature = (initialData: Data) => {
  const [state, setState] = useState(initialData);

  const action = useCallback(() => {
    // Logic here
  }, []);

  return { state, action };
};
```

---

## Quick Decision Tree

**"Where do I put X?"**
1. Is it a visual component representing a part of the questline? → `src/lib/components/renderers/`
2. Is it logic for handling game state (e.g., unlocking a quest)? → `src/lib/hooks/`
3. Is it a helper for parsing or math? → `src/lib/utils/`
4. Is it a type definition? → `src/lib/types.ts`

**"How do I add a new visual element?"**
1. Define interface in `types.ts`
2. Create `MyElementRenderer.tsx`
3. Add to `QuestlineViewer` render logic
4. Update `useQuestlineState` if it needs state

---

## Common Mistakes

❌ **Don't**: Put complex state logic inside `QuestlineViewer.tsx` or Renderers.
✅ **Do**: Extract logic to `useQuestlineState` or specific hooks.

❌ **Don't**: Use pixel values for layout in CSS.
✅ **Do**: Use calculations based on the `scale` prop or percentages.

❌ **Don't**: Use `backdrop-filter` or complex CSS shadows.
✅ **Do**: Stick to simple box-shadows and opacity (RN compatible).
