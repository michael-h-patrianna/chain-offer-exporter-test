/**
 * Consolidated Utility Functions
 *
 * This module contains all the utility functions actually used by the chainoffer components.
 * Consolidates functionality from utils.simple.ts and chainofferDataTransform.ts.
 */

import { ChainOfferExport, DropShadow, Fill, HeaderState, OfferState } from '../types';

// ============================================================================
// STYLE CONVERSION FUNCTIONS
// ============================================================================

/**
 * Convert Fill object to CSS background
 * Supports solid colors, linear gradients, radial gradients, and conic gradients
 */
export function convertFillToCSS(fill: Fill): string {
  if (!fill) return 'transparent';

  if (fill.type === 'solid') {
    return fill.color || 'transparent';
  }

  if (fill.type === 'gradient' && fill.gradient) {
    const { gradient } = fill;
    const stops = gradient.stops
      .map((stop: any) => `${stop.color} ${(stop.position * 100).toFixed(1)}%`)
      .join(', ');

    switch (gradient.type) {
      case 'linear':
        const angle = gradient.rotation || 0;
        return `linear-gradient(${angle}deg, ${stops})`;

      default:
        return 'transparent';
    }
  }

  return 'transparent';
}

/**
 * Convert drop shadows to CSS box-shadow
 * Supports multiple shadows and scaling
 */
export function convertShadowsToCSS(shadows: DropShadow[], scale: number = 1): string {
  if (!shadows || shadows.length === 0) return 'none';

  return shadows
    .map(
      (shadow: any) =>
        `${shadow.x * scale}px ${shadow.y * scale}px ${shadow.blur * scale}px ${shadow.spread * scale}px ${shadow.color}`
    )
    .join(', ');
}

// ============================================================================
// SCALING CALCULATIONS
// ============================================================================

/**
 * Scale calculation result for responsive chainoffer display
 */
interface ScaleCalculation {
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
}

/**
 * Calculate the scale factor for responsive chainoffer display
 * Maintains aspect ratio while fitting within target dimensions
 */
export function calculateChainOfferScale(
  originalSize: { width: number; height: number },
  targetSize: { width: number; height: number }
): ScaleCalculation {
  const scaleX = targetSize.width / originalSize.width;
  const scaleY = targetSize.height / originalSize.height;
  const scale = Math.min(scaleX, scaleY);

  const scaledWidth = originalSize.width * scale;
  const scaledHeight = originalSize.height * scale;

  return { scale, scaledWidth, scaledHeight };
}

/**
 * Calculate simple content bounds for chainoffer
 * Uses frame size as the base bounds since components handle their own positioning
 */
export function calculateChainOfferContentBounds(
  chainOfferData: ChainOfferExport,
  offerStates: Record<string, OfferState>,
  headerState: HeaderState,
  scale: number
) {
  if (!chainOfferData || !chainOfferData.frameSize) {
    console.warn('calculateChainOfferContentBounds: Invalid chain offer data');
    return {
      minX: 0,
      minY: 0,
      maxX: 800 * scale,
      maxY: 600 * scale,
      width: 800 * scale,
      height: 600 * scale,
    };
  }

  const width = chainOfferData.frameSize.width * scale;
  const height = chainOfferData.frameSize.height * scale;

  return {
    minX: 0,
    minY: 0,
    maxX: width,
    maxY: height,
    width,
    height,
  };
}
