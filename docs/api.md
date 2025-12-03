# API Guide for LLM Coding Agents

**Purpose**: This document teaches you how to use the ChainOffer library in a host application (like the `demo` app).

---

## Core Concepts

### The `ChainOfferViewer`
The main entry point is the `<ChainOfferViewer />` component. It requires two main pieces of data:
1. `chainofferData`: The JSON structure describing the layout and logic (typically `positions.json`).
2. `assets`: The object containing image URLs (typically extracted from a zip).

---

## How to Integrate

### Step 1: Data Loading
The library provides `extractChainOfferZip` to handle the standard export format.

**Template**:
```tsx
import { useEffect, useState } from 'react';
import { extractChainOfferZip, ChainOfferViewer } from 'chainoffer-exporter-test';

const MyPage = () => {
  const [data, setData] = useState(null);
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    fetch('/path/to/theme.zip')
      .then(res => res.blob())
      .then(blob => extractChainOfferZip(blob))
      .then(({ chainofferData, images }) => {
        setData(chainofferData);
        setAssets(images);
      });
  }, []);

  if (!data || !assets) return <div>Loading...</div>;

  return (
    <ChainOfferViewer
      chainofferData={data}
      assets={assets}
      chainofferWidth={800}
      chainofferHeight={600}
    />
  );
};
```

### Step 2: Handling Events
The viewer exposes callbacks for interaction.

**Template**:
```tsx
<ChainOfferViewer
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
2. **Extraction**: `extractChainOfferZip` parses JSON and creates Blob URLs for images.
3. **Injection**: Data passed to `ChainOfferViewer`.
4. **State**: Internal state (locked/unlocked) is managed inside the Viewer (for now), or passed via props (future).

---

## Common Mistakes

❌ **Don't**: Hardcode image paths in the React component.
✅ **Do**: Load everything dynamically from the `assets` object.

❌ **Don't**: modify the `chainofferData` object directly for state changes.
✅ **Do**: Rely on the internal state management or future props for external state control.
