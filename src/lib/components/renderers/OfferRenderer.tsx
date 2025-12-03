/**
 * OfferRenderer Component
 *
 * PURPOSE: Displays offer images from theme ZIP files
 *
 * This component renders offer images extracted from theme ZIP files.
 * Users can click to cycle through different visual states to preview
 * how the offer looks in each state.
 *
 * What this does:
 * - Displays offer image for current visual state
 * - Clicking cycles through: Locked → Unlocked → Claimed → Locked
 * - Positions using x,y coordinates from ZIP data
 * - Scales image based on provided scale factor
 */

import React from 'react';
import { Offer, OfferState } from '../../types';

interface OfferRendererProps {
  /** Offer data from ZIP file including bounds for each state */
  offer: Offer;
  /** Current visual state being displayed */
  currentState: OfferState;
  /** Scale factor for responsive sizing */
  scale: number;
  /** Offer image URL for current state */
  offerImage?: string;
  /** Whether to show offer key overlay for debugging */
  showOfferKeys?: boolean;
  /** Function called when user clicks to cycle to next state */
  onCycleState: (offerKey: string) => void;
}

export const OfferRenderer: React.FC<OfferRendererProps> = ({
  offer,
  currentState,
  scale,
  offerImage,
  showOfferKeys = false,
  onCycleState
}) => {

  // ============================================================================
  // DATA VALIDATION & SAFETY
  // ============================================================================

  /**
   * Validate offer data from ZIP file
   */
  if (!offer?.offerKey || !offer?.stateBounds) {
    console.warn('OfferRenderer: Invalid offer data', { offer, currentState });
    return null;
  }

  /**
   * Get positioning data for current state
   */
  const bounds = offer.stateBounds[currentState];

  if (!bounds) {
    console.warn(`OfferRenderer: Missing bounds for state "${currentState}"`, { offer });
    return null;
  }

  // ============================================================================
  // DIMENSION & POSITION CALCULATIONS
  // ============================================================================

  /**
   * Calculate scaled dimensions directly from bounds
   * All scaling happens here for clarity in this demo
   */
  const width = (bounds.width ?? bounds.w ?? 0) * scale;
  const height = (bounds.height ?? bounds.h ?? 0) * scale;

  /**
   * Create CSS positioning variables
   * Offers use x,y coordinates from ZIP data (center positioning)
   */
  const cssVariables: Record<string, string> = {
    // Position: x,y - use transform for centering to match other components
    '--offer-left': `${bounds.x * scale}px`,
    '--offer-top': `${bounds.y * scale}px`,
    '--offer-transform': `translate(-50%, -50%) ${bounds.rotation ? `rotate(${bounds.rotation}deg)` : ''}`,

    // Scaled dimensions
    '--offer-width': `${width}px`,
    '--offer-height': `${height}px`,
  };

  // ============================================================================
  // EVENT HANDLING
  // ============================================================================

  /**
   * Handle click to cycle to next visual state
   */
  const handleClick = () => {
    onCycleState(offer.offerKey);
  };

  /**
   * Handle keyboard interaction for accessibility
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // ============================================================================
  // RENDER COMPONENT
  // ============================================================================

  return (
    <div
      key={offer.offerKey}
      className="offer-component"
      data-offer-key={offer.offerKey}
      data-offer-state={currentState}
      role="button"
      tabIndex={0}
      aria-label={`Offer ${offer.offerKey} - ${currentState} visual state`}
      style={cssVariables}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={`${offer.offerKey} (${currentState}) - Click to cycle states`}
    >
      {/* Display offer image for current state */}
      <img
        src={offerImage}
        alt={`${offer.offerKey} in ${currentState} visual state`}
        className="offer-image"
        draggable={false}
      />

      {/* Optional offer key overlay for debugging */}
      {showOfferKeys && (
        <div className="offer-key-overlay">
          {offer.offerKey}
        </div>
      )}
    </div>
  );
};
