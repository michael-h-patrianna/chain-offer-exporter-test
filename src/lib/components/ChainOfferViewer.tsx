/**
 * ChainOfferViewer - Main Chain Offer Display Component
 *
 * This component serves as the primary coordinator for displaying chain offer content.
 * It handles the overall layout, scaling, and orchestrates the rendering of all
 * chain offer components (offers, timer, header, buttons).
 *
 * Key Responsibilities:
 * - Calculate responsive scaling for chain offer display
 * - Coordinate component rendering using specialized renderer components
 * - Provide container structure and background rendering
 * - Handle component bounds calculation for overflow management
 *
 * Architecture Pattern:
 * This component follows a "coordinator pattern" where it manages layout and
 * delegates specific rendering responsibilities to specialized renderer components.
 * State management is handled by the useChainOfferState hook to maintain separation
 * of concerns.
 *
 * Usage:
 * The ChainOfferViewer is designed to be a standalone, reusable component that can
 * be integrated into any React application. It handles all internal logic while
 * providing callback props for external integration.
 */

import { LazyMotion, domAnimation, m } from 'framer-motion';
import React, { useMemo } from 'react';
import { RevealAnimation } from '../animation/types';
import { useChainOfferState } from '../hooks/useChainOfferState';
import { ChainOfferExport, ExtractedAssets } from '../types';
import {
  calculateChainOfferScale // Same here.
} from '../utils/utils';
import './ChainOfferViewer.css'; // Keeping CSS file name for now, or we can rename it.

// Import specialized renderer components
import { ButtonRenderer } from './renderers/ButtonRenderer';
import { HeaderRenderer } from './renderers/HeaderRenderer';
import { OfferRenderer } from './renderers/OfferRenderer';
import { TimerRenderer } from './renderers/TimerRenderer';

/**
 * Component visibility configuration
 */
type ComponentVisibilityType = {
  background: boolean;
  header: boolean;
  offers: boolean;
  timer: boolean;
  buttons: boolean;
};

/**
 * ChainOfferViewer Props Interface
 */
interface ChainOfferViewerProps {
  /** Chain offer export data from Figma plugin */
  chainOfferData: ChainOfferExport;

  /** Extracted assets including images and background */
  assets: ExtractedAssets;

  /** Target display width */
  width: number;

  /** Target display height */
  height: number;

  /** Whether to show offer key overlays for debugging/development */
  showOfferKeys?: boolean;

  /** Component visibility toggles (optional, defaults to all visible) */
  componentVisibility?: Partial<ComponentVisibilityType>;

  /** Configuration for reveal animation */
  animationConfig?: RevealAnimation;

  /** Callback function executed when a button is clicked */
  onButtonClick?: (offerKey: string) => void;
}

/**
 * ChainOfferViewer - Main Chain Offer Display Component
 */
export const ChainOfferViewer: React.FC<ChainOfferViewerProps> = ({
  chainOfferData,
  assets,
  width,
  height,
  showOfferKeys = false,
  componentVisibility = {},
  animationConfig,
  onButtonClick
}) => {

  // Merge with default visibility (all visible)
  const visibility = useMemo(() => ({
    background: true,
    header: true,
    offers: true,
    timer: true,
    buttons: true,
    ...componentVisibility
  }), [componentVisibility]);

  // ============================================================================
  // STATE MANAGEMENT (Delegated to Hook)
  // ============================================================================

  const {
    offerStates,
    headerState,
    buttonStates, // This is a Record<offerKey, ButtonState>
    cycleOfferState,
    cycleHeaderState,
    handleButtonMouseEnter,
    handleButtonMouseLeave,
    handleButtonClick
  } = useChainOfferState(chainOfferData);

  // ============================================================================
  // LAYOUT & SCALING CALCULATIONS
  // ============================================================================

  const originalSize = useMemo(() => ({
    width: chainOfferData.frameSize?.width || 375,
    height: chainOfferData.frameSize?.height || 812
  }), [chainOfferData.frameSize]);

  const targetSize = useMemo(() => ({
    width: width,
    height: height
  }), [width, height]);

  // Reusing existing scale utility (assuming it's generic enough)
  const { scale, scaledWidth, scaledHeight } = useMemo(
    () => calculateChainOfferScale(originalSize, targetSize),
    [originalSize, targetSize]
  );

  // We might skip contentBounds calculation for now or update it later if needed.
  // For now, let's assume standard frame scaling.
  const contentBounds = { minX: 0, minY: 0, width: scaledWidth, height: scaledHeight };

  // ============================================================================
  // COMPONENT RENDERING (Memoized)
  // ============================================================================

  /**
   * Render Offer Components
   */
  const offersContent = useMemo(() => {
    if (!visibility.offers || !Array.isArray(chainOfferData?.offers)) return null;

    return chainOfferData.offers.map((offer) => {
      if (!offer?.offerKey || !offer?.stateBounds) return null;

      const currentState = offerStates[offer.offerKey] || 'Locked';
      const offerImage = assets?.offerImages?.[offer.offerKey]?.[currentState];

      return (
        <m.div
          key={offer.offerKey}
          variants={animationConfig?.itemVariants}
          style={{ position: 'relative', zIndex: 10, width: 0, height: 0 }}
        >
          <OfferRenderer
            offer={offer}
            currentState={currentState}
            scale={scale}
            offerImage={offerImage}
            showOfferKeys={showOfferKeys}
            onCycleState={cycleOfferState}
          />
        </m.div>
      );
    });
  }, [visibility.offers, chainOfferData.offers, offerStates, assets?.offerImages, scale, showOfferKeys, cycleOfferState, animationConfig]);

  /**
   * Render Timer Component
   */
  const timerContent = useMemo(() => {
    if (!visibility.timer || !chainOfferData.timer) return null;

    return (
      <m.div
        variants={animationConfig?.chainofferTimerVariants}
        style={{ position: 'relative', zIndex: 25, width: 0, height: 0 }}
      >
        <TimerRenderer
          timer={chainOfferData.timer}
          scale={scale}
        />
      </m.div>
    );
  }, [visibility.timer, chainOfferData.timer, scale, animationConfig]);

  /**
   * Render Header Component
   */
  const headerContent = useMemo(() => {
    if (!visibility.header || !chainOfferData.header) return null;

    const headerImage = assets?.headerImages?.[headerState];

    return (
      <m.div
        variants={animationConfig?.chainofferHeaderImageVariants}
        style={{ position: 'relative', zIndex: 20, width: 0, height: 0 }}
      >
        <HeaderRenderer
          header={chainOfferData.header}
          currentState={headerState}
          scale={scale}
          headerImage={headerImage}
          onCycleState={cycleHeaderState}
        />
      </m.div>
    );
  }, [visibility.header, chainOfferData.header, headerState, assets?.headerImages, scale, animationConfig, cycleHeaderState]);

  /**
   * Render Button Components (One per Offer)
   */
  const buttonsContent = useMemo(() => {
    if (!visibility.buttons || !Array.isArray(chainOfferData?.buttons)) return null;

    return chainOfferData.buttons.map((button, index) => {
      if (!button?.offerKey) return null;

      const currentState = buttonStates[button.offerKey] || 'default';
      const icons = assets.buttonIcons?.[button.offerKey];
      const iconUrl = icons?.[currentState];
      const iconBounds = button.icons?.[currentState]?.bounds;

      return (
        <m.div
          key={`btn-${button.offerKey}-${index}`}
          variants={animationConfig?.chainofferFooterVariants}
          style={{ position: 'relative', zIndex: 30, width: 0, height: 0 }}
        >
          <ButtonRenderer
            button={button}
            currentState={currentState}
            scale={scale}
            icon={iconUrl}
            iconBounds={iconBounds}
            onMouseEnter={() => handleButtonMouseEnter(button.offerKey)}
            onMouseLeave={() => handleButtonMouseLeave(button.offerKey)}
            onClick={() => handleButtonClick(button.offerKey, () => onButtonClick?.(button.offerKey))}
          />
        </m.div>
      );
    });
  }, [visibility.buttons, chainOfferData.buttons, buttonStates, assets.buttonIcons, scale, animationConfig, handleButtonMouseEnter, handleButtonMouseLeave, handleButtonClick, onButtonClick]);

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="chainoffer-container-wrapper"
        role="region"
        aria-label="Chain Offer interface"
      >
        <m.div
          className="chainoffer-viewer chainoffer-canvas" // Keeping class names for now to reuse CSS
          role="img"
          aria-label="Interactive chain offer"
          style={{
            '--chainoffer-width': `${scaledWidth}px`,
            '--chainoffer-height': `${scaledHeight}px`,
            '--content-bounds-left': `${contentBounds.minX}px`,
            '--content-bounds-top': `${contentBounds.minY}px`,
            '--content-bounds-width': `${contentBounds.width}px`,
            '--content-bounds-height': `${contentBounds.height}px`
          } as React.CSSProperties}
          initial="hidden"
          animate="visible"
          variants={animationConfig?.containerVariants}
        >

          {/* Content bounds indicator for debugging/development */}
          {showOfferKeys && <div className="content-bounds-indicator" />}

          {/* Background image rendering */}
          {visibility.background && assets.backgroundImage && (
            <div className="chainoffer-background">
              <img
                src={assets.backgroundImage}
                alt="Chain Offer background"
                className="chainoffer-background-image"
                draggable={false}
              />
            </div>
          )}

          {/* Render all components in layered order */}
          {timerContent}
          {headerContent}
          {offersContent}
          {buttonsContent}

        </m.div>
      </div>
    </LazyMotion>
  );
};

