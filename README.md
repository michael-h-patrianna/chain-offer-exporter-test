# Chain Offer Viewer

**Chain Offer Viewer** is a high-performance React library for rendering interactive "Chain Offer" components exported from design tools like Figma. This project demonstrates the reference implementation for parsing, scaling, and rendering these dynamic UI elements.

## Prerequisites

- Node.js 18+ (Verified on v20.x)
- npm 9+

## Quick Start

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chain-offer-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The demo will open at `http://localhost:5173`.

## Core Concepts

This library operates on a strict separation of concerns to ensure maintainability and performance.

### 1. The Viewer (`ChainOfferViewer`)
The central component orchestrates the rendering. It handles:
- **Responsive Scaling:** Automatically adjusts the offer chain to fit the target container while preserving aspect ratios.
- **Layer Management:** Coordinates the z-indexing of headers, timers, offers, and buttons.
- **State Delegation:** Delegates state management to specialized hooks.

### 2. State Management (`useChainOfferState`)
A dedicated hook manages the complex state machine:
- **Offers:** Locked → Unlocked → Claimed.
- **Header:** active → success → fail.
- **Buttons:** default ↔ hover ↔ active.

### 3. Data-Driven Architecture
The UI is generated entirely from a JSON specification (`ChainOfferExport`) and a set of assets (images). This allows designers to iterate on the look and feel in Figma without requiring code changes.

## Integration Guide

### Basic Usage

To use the `ChainOfferViewer` in your application:

```tsx
import { ChainOfferViewer } from './lib/components/ChainOfferViewer';
import { useChainOfferData } from './hooks/useChainOfferData'; // Your data loading hook

export const MyOfferPage = () => {
  // Load your data (implementation depends on your backend)
  const { data, assets, isLoading } = useChainOfferData();

  if (isLoading || !data || !assets) return <div>Loading...</div>;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ChainOfferViewer
        chainOfferData={data}
        assets={assets}
        width={window.innerWidth}
        height={window.innerHeight}
        onButtonClick={(offerKey) => console.log(`Clicked: ${offerKey}`)}
      />
    </div>
  );
};
```

### Props Reference

| Prop | Type | Description |
|------|------|-------------|
| `chainOfferData` | `ChainOfferExport` | The JSON structure defining the offers. |
| `assets` | `ExtractedAssets` | Map of image URLs for all states. |
| `width` | `number` | Target width for rendering. |
| `height` | `number` | Target height for rendering. |
| `onButtonClick` | `(key: string) => void` | Callback for button interactions. |
| `showOfferKeys` | `boolean` | (Optional) Debug overlay showing offer IDs. |

## Development

### Running Tests

We use **Vitest** for unit tests and **Playwright** for E2E tests.

**Unit Tests:**
```bash
npm test
```

**End-to-End Tests:**
```bash
npm run test:e2e
```
_Note: Ensure the dev server is not running on port 5173 before starting E2E tests, or configure Playwright to reuse the existing server._

### Project Structure

- `src/lib/components`: Core UI components.
- `src/lib/hooks`: State logic and custom hooks.
- `src/lib/utils`: Data transformation and scaling logic.
- `src/demo`: Example application showing the viewer in action.

## Troubleshooting

### Common Issues

**Images not loading?**
*   **Symptom:** Placeholder or broken image icons.
*   **Cause:** The `assets` object keys might not match the `chainOfferData` offer keys.
*   **Solution:** Verify that your `zipExtractor` logic correctly maps filenames to the expected keys in `src/lib/types.ts`.

**Layout looks distorted?**
*   **Symptom:** Elements are stretched or overlapping.
*   **Cause:** The `width` and `height` props passed to `ChainOfferViewer` might not match the aspect ratio of the original design.
*   **Solution:** The viewer attempts to "contain" the design. Ensure your container has a defined size.