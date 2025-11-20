# API Guide for LLM Coding Agents

**Purpose**: This document teaches you how to use the Questline library in a host application (like the `demo` app).

---

## Core Concepts

### The `QuestlineViewer`
The main entry point is the `<QuestlineViewer />` component. It requires two main pieces of data:
1. `questlineData`: The JSON structure describing the layout and logic (typically `positions.json`).
2. `assets`: The object containing image URLs (typically extracted from a zip).

---

## How to Integrate

### Step 1: Data Loading
The library provides `extractQuestlineZip` to handle the standard export format.

**Template**:
```tsx
import { useEffect, useState } from 'react';
import { extractQuestlineZip, QuestlineViewer } from 'questline-exporter-test';

const MyPage = () => {
  const [data, setData] = useState(null);
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    fetch('/path/to/theme.zip')
      .then(res => res.blob())
      .then(blob => extractQuestlineZip(blob))
      .then(({ questlineData, images }) => {
        setData(questlineData);
        setAssets(images);
      });
  }, []);

  if (!data || !assets) return <div>Loading...</div>;

  return (
    <QuestlineViewer
      questlineData={data}
      assets={assets}
      questlineWidth={800}
      questlineHeight={600}
    />
  );
};
```

### Step 2: Handling Events
The viewer exposes callbacks for interaction.

**Template**:
```tsx
<QuestlineViewer
  // ... props
  onButtonClick={() => console.log('Main button clicked')}
  componentVisibility={{
    timer: false, // Hide specific elements
  }}
/>
```

---

## Data Flow Pattern

1. **Source**: Zip file (contains `positions.json` + images).
2. **Extraction**: `extractQuestlineZip` parses JSON and creates Blob URLs for images.
3. **Injection**: Data passed to `QuestlineViewer`.
4. **State**: Internal state (locked/unlocked) is managed inside the Viewer (for now), or passed via props (future).

---

## Common Mistakes

❌ **Don't**: Hardcode image paths in the React component.
✅ **Do**: Load everything dynamically from the `assets` object.

❌ **Don't**: modify the `questlineData` object directly for state changes.
✅ **Do**: Rely on the internal state management or future props for external state control.
