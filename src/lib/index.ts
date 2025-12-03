/**
 * Chain Offer Component Library
 *
 * Production-ready components for rendering themed chain offer games.
 * These components are designed to work with themes exported from the
 * Figma Chain Offer Plugin.
 *
 * @packageDocumentation
 */

// Main Components
export { ChainOfferViewer } from './components/ChainOfferViewer';

// Renderer Components (for advanced customization)
export { ButtonRenderer } from './components/renderers/ButtonRenderer';
export { HeaderRenderer } from './components/renderers/HeaderRenderer';
export { OfferRenderer } from './components/renderers/OfferRenderer';
export { TimerRenderer } from './components/renderers/TimerRenderer';

// Hooks
export { ChainOfferProvider, useChainOfferContext } from './hooks/ChainOfferContext';
export { useChainOfferState } from './hooks/useChainOfferState';

// Utility Functions
export { calculateChainOfferContentBounds, calculateChainOfferScale } from './utils/utils';
export { extractChainOfferZip } from './utils/zipExtractor';

// Type Definitions
export type {
  ButtonComponent,
  ButtonState,
  ChainOfferExport,
  ExtractedAssets,
  HeaderComponent,
  HeaderState,
  Offer,
  OfferState,
  TimerComponent,
} from './types';
