import React from 'react';
import { ButtonComponent, ButtonState, ImageBounds } from '../../types';
import { convertFillToCSS, convertShadowsToCSS } from '../../utils/utils';

/**
 * ButtonRenderer Component
 *
 * PURPOSE: Renders interactive button elements using imported theme styling data
 *
 * This component creates a fully functional button that responds to user interactions
 * (hover, active, disabled) using visual styles defined in the imported theme.
 * Each state (default, hover, active, disabled) has its own styling configuration
 * that gets applied dynamically based on user interaction.
 *
 * KEY CONCEPTS:
 * - Interactive Button States: Responds to user hover, click, and disabled states
 * - Theme-Based Styling: Uses imported theme data for all visual properties
 * - Center-Based Positioning: Positions from center point for natural UI placement
 * - Auto-Layout Support: Handles HUG, FILL, and FIXED layout modes from theme
 * - Icon Overlay: Supports optional icon overlays with independent positioning
 *
 * Integration for Real Apps:
 * - Replace getButtonText() with actual button labels from your data
 * - Connect onClick to actual functionality (API calls, navigation, etc.)
 * - Add proper accessibility features and keyboard navigation
 * - Extend with additional states as needed (loading, success, etc.)
 */

interface ButtonRendererProps {
  /** Button configuration from chain offer data including position, styling, and layout */
  button: ButtonComponent;
  /** Current visual state of the button (affects styling and behavior) */
  currentState: ButtonState;
  /** Scaling factor for responsive display across different screen sizes */
  scale: number;
  /** Optional icon image URL for the current state */
  icon?: string;
  /** Optional bounds for the icon image */
  iconBounds?: ImageBounds;
  /** Handler for mouse enter events (triggers hover state in parent) */
  onMouseEnter: () => void;
  /** Handler for mouse leave events (returns to default state in parent) */
  onMouseLeave: () => void;
  /** Handler for mouse down events (triggers active state in parent) */
  onMouseDown: () => void;
  /** Handler for mouse up events (returns to default/hover state in parent) */
  onMouseUp: () => void;
  /** Handler for button clicks (triggers actions in parent component) */
  onClick: () => void;
}

export const ButtonRenderer: React.FC<ButtonRendererProps> = ({
  button,
  currentState,
  scale,
  icon,
  iconBounds,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onClick
}) => {
  // ============================================================================
  // EARLY RETURNS & VALIDATION
  // ============================================================================

  if (!button) return null;

  const stateStyle = button.stateStyles[currentState];
  if (!stateStyle) return null;

  // ============================================================================
  // LAYOUT MODE DETECTION
  // ============================================================================

  const isAutolayout = stateStyle.frame.isAutolayout;
  const layoutSizing = stateStyle.frame.layoutSizing;

  // ============================================================================
  // CSS VARIABLES GENERATION
  // ============================================================================

  /**
   * POSITIONING STRATEGY: Center-Based Coordinates
   */
  const cssVariables: Record<string, string> = {
    // Position: Center-based coordinates with transform centering
    '--button-left': `${button.position.x * scale}px`,
    '--button-top': `${button.position.y * scale}px`,
    '--button-transform': 'translate(-50%, -50%)',

    // Visual styling from state configuration
    '--button-bg': convertFillToCSS(stateStyle.frame.backgroundFill),
    '--button-border-radius': `${stateStyle.frame.borderRadius * scale}px`,
    '--button-box-shadow': convertShadowsToCSS(stateStyle.frame.dropShadows, scale),
    '--button-border': stateStyle.frame.stroke
      ? `${stateStyle.frame.stroke.width * scale}px solid ${stateStyle.frame.stroke.color}`
      : 'none',

    // Typography styling
    '--button-font-size': `${stateStyle.text.fontSize * scale}px`,
    '--button-color': stateStyle.text.color,

    // Padding (varies by layout mode)
    '--button-padding': isAutolayout
      ? `${stateStyle.frame.padding.vertical * scale}px ${stateStyle.frame.padding.horizontal * scale}px`
      : '0'
  };

  // ============================================================================
  // DIMENSION HANDLING (Layout Mode Specific)
  // ============================================================================

  if (isAutolayout) {
    // Auto-layout mode: Dynamic sizing based on content and constraints
    if (layoutSizing) {
      // Horizontal sizing strategy
      if (layoutSizing.horizontal === "HUG") {
        // HUG: Width determined by content + padding
      } else if (layoutSizing.horizontal === "FILL") {
        // FILL: Button expands to fill available container width
        cssVariables['--button-width'] = '100%';
      } else {
        // FIXED: Use explicit width from design specifications
        const width = stateStyle.frame.dimensions?.width ?? 160;
        cssVariables['--button-width'] = `${width * scale}px`;
      }

      // Vertical sizing strategy
      if (layoutSizing.vertical === "HUG") {
        // HUG: Height determined by content + padding
      } else if (layoutSizing.vertical === "FILL") {
        // FILL: Button expands to fill available container height
        cssVariables['--button-height'] = '100%';
      } else {
        // FIXED: Use explicit height from design specifications
        const height = stateStyle.frame.dimensions?.height ?? 60;
        cssVariables['--button-height'] = `${height * scale}px`;
      }
    }
  } else {
    // Fixed layout mode: Use explicit dimensions from design
    const width = stateStyle.frame.dimensions?.width ?? 160;
    const height = stateStyle.frame.dimensions?.height ?? 60;
    cssVariables['--button-width'] = `${width * scale}px`;
    cssVariables['--button-height'] = `${height * scale}px`;
  }

  // ============================================================================
  // ICON RENDERING
  // ============================================================================

  const renderIcon = () => {
    if (!icon || !iconBounds) return null;

    const width = iconBounds.width ?? iconBounds.w ?? 0;
    const height = iconBounds.height ?? iconBounds.h ?? 0;

    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      left: `${(iconBounds.x - width / 2) * scale}px`,
      top: `${(iconBounds.y - height / 2) * scale}px`,
      width: `${width * scale}px`,
      height: `${height * scale}px`,
      pointerEvents: 'none', // Let clicks pass through to button
      zIndex: 1,
    };

    return (
      <img
        src={icon}
        alt=""
        style={iconStyle}
        className="button-icon"
      />
    );
  };

  // ============================================================================
  // BUTTON TEXT GENERATION
  // ============================================================================

  const getButtonText = (state: ButtonState): string => {
    const textMap: Record<ButtonState, string> = {
      'default': 'CLAIM',
      'hover': 'CLAIM',
      'active': 'CLAIMING',
      'disabled': 'LOCKED',
      'claimed': 'CLAIMED'
    };
    return textMap[state] || 'BUTTON';
  };

  // ============================================================================
  // RENDER COMPONENT
  // ============================================================================

  return (
    <button
      className="button-component"
      data-button-state={currentState}
      data-offer-key={button.offerKey}
      style={cssVariables}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
      disabled={currentState === 'disabled'}
      title={`Button for ${button.offerKey} (${currentState.toUpperCase()})`}
      aria-label={`${getButtonText(currentState)} for ${button.offerKey}`}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>{getButtonText(currentState)}</span>
      {renderIcon()}
    </button>
  );
};
