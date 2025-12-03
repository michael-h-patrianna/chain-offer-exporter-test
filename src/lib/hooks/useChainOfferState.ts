/**
 * Chain Offer State Management Hook
 *
 * Centralizes all chain offer component state management logic.
 * This hook handles the state cycling for all interactive components:
 * - Individual offer states (Locked -> Unlocked -> Claimed)
 * - Global header states (active -> success -> fail)
 * - Per-offer button interaction states (default <-> hover <-> active <-> disabled)
 *
 * Purpose: Developers can study this file to understand how chain offer state
 * management works without needing to dig through rendering logic.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ButtonState, ChainOfferExport, HeaderState, OfferState } from '../types';

interface ChainOfferComponentState {
  offerStates: Record<string, OfferState>;
  headerState: HeaderState;
  buttonStates: Record<string, ButtonState>;
}

interface UseChainOfferStateReturn {
  // State getters
  offerStates: Record<string, OfferState>;
  headerState: HeaderState;
  buttonStates: Record<string, ButtonState>;

  // Offer state management
  getOfferState: (offerKey: string) => OfferState;
  setOfferState: (offerKey: string, state: OfferState) => void;
  cycleOfferState: (offerKey: string) => void;

  // Component state management
  setHeaderState: (state: HeaderState) => void;
  cycleHeaderState: () => void;

  // Button state management (used for hover/click interactions)
  getButtonState: (offerKey: string) => ButtonState;
  setButtonState: (offerKey: string, state: ButtonState) => void;
  handleButtonMouseEnter: (offerKey: string) => void;
  handleButtonMouseLeave: (offerKey: string) => void;
  handleButtonClick: (offerKey: string, onButtonClick?: () => void) => void;

  // Utility functions
  resetAllStates: () => void;
}

/**
 * State Cycling Orders - These define how components cycle through their states
 */
const OFFER_STATE_ORDER: OfferState[] = ['Locked', 'Unlocked', 'Claimed'];
const HEADER_STATE_ORDER: HeaderState[] = ['active', 'success', 'fail'];

/**
 * Initialize offer states from chain offer data
 * All offers start in 'Locked' state by default
 */
function initializeOfferStates(chainOfferData: ChainOfferExport): Record<string, OfferState> {
  const validOffers = Array.isArray(chainOfferData?.offers) ? chainOfferData.offers : [];

  return validOffers.reduce((acc, offer) => {
    if (offer?.offerKey) {
      acc[offer.offerKey] = 'Locked';
    }
    return acc;
  }, {} as Record<string, OfferState>);
}

/**
 * Initialize button states from chain offer data
 * All buttons start in 'default' state
 */
function initializeButtonStates(chainOfferData: ChainOfferExport): Record<string, ButtonState> {
  const validButtons = Array.isArray(chainOfferData?.buttons) ? chainOfferData.buttons : [];

  return validButtons.reduce((acc, button) => {
    if (button?.offerKey) {
      acc[button.offerKey] = 'default';
    }
    return acc;
  }, {} as Record<string, ButtonState>);
}

/**
 * Chain Offer State Management Hook
 *
 * This hook encapsulates all state management logic for chain offer components.
 * It provides a clean API for managing offer progression, component states,
 * and user interactions.
 *
 * @param chainOfferData - The chain offer export data containing offer definitions
 * @returns Object with state values and state management functions
 */
export function useChainOfferState(chainOfferData: ChainOfferExport): UseChainOfferStateReturn {
  const isMounted = useRef(true);

  // Track mounted state
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Initialize component state with safe defaults
  const [componentState, setComponentState] = useState<ChainOfferComponentState>(() => ({
    offerStates: initializeOfferStates(chainOfferData),
    headerState: 'active',
    buttonStates: initializeButtonStates(chainOfferData)
  }));

  // Offer State Management Functions

  /**
   * Get the current state of a specific offer
   */
  const getOfferState = useCallback((offerKey: string): OfferState => {
    return componentState.offerStates[offerKey] || 'Locked';
  }, [componentState.offerStates]);

  /**
   * Set a specific offer to a specific state
   */
  const setOfferState = useCallback((offerKey: string, state: OfferState) => {
    setComponentState(prev => ({
      ...prev,
      offerStates: {
        ...prev.offerStates,
        [offerKey]: state
      }
    }));
  }, []);

  /**
   * Cycle an offer through its state progression
   * Locked -> Unlocked -> Claimed -> Locked (loops)
   */
  const cycleOfferState = useCallback((offerKey: string) => {
    const currentState = getOfferState(offerKey);
    const currentIndex = OFFER_STATE_ORDER.indexOf(currentState);
    const nextState = OFFER_STATE_ORDER[(currentIndex + 1) % OFFER_STATE_ORDER.length];

    setOfferState(offerKey, nextState);
  }, [getOfferState, setOfferState]);

  // Header State Management Functions

  /**
   * Set the header component to a specific state
   */
  const setHeaderState = useCallback((state: HeaderState) => {
    setComponentState(prev => ({ ...prev, headerState: state }));
  }, []);

  /**
   * Cycle header through its state progression
   * active -> success -> fail -> active (loops)
   */
  const cycleHeaderState = useCallback(() => {
    const currentIndex = HEADER_STATE_ORDER.indexOf(componentState.headerState);
    const nextState = HEADER_STATE_ORDER[(currentIndex + 1) % HEADER_STATE_ORDER.length];
    setHeaderState(nextState);
  }, [componentState.headerState, setHeaderState]);

  // Button State Management Functions

  /**
   * Get the current state of a specific button
   */
  const getButtonState = useCallback((offerKey: string): ButtonState => {
    return componentState.buttonStates[offerKey] || 'default';
  }, [componentState.buttonStates]);

  /**
   * Set a specific button to a specific state
   */
  const setButtonState = useCallback((offerKey: string, state: ButtonState) => {
    setComponentState(prev => ({
      ...prev,
      buttonStates: {
        ...prev.buttonStates,
        [offerKey]: state
      }
    }));
  }, []);

  /**
   * Handle mouse enter on button (default -> hover)
   */
  const handleButtonMouseEnter = useCallback((offerKey: string) => {
    if (getButtonState(offerKey) === 'default') {
      setButtonState(offerKey, 'hover');
    }
  }, [getButtonState, setButtonState]);

  /**
   * Handle mouse leave on button (hover -> default)
   */
  const handleButtonMouseLeave = useCallback((offerKey: string) => {
    if (getButtonState(offerKey) === 'hover') {
      setButtonState(offerKey, 'default');
    }
  }, [getButtonState, setButtonState]);

  /**
   * Handle button click with visual feedback
   * Shows 'active' state briefly, then returns to default
   */
  const handleButtonClick = useCallback((offerKey: string, onButtonClick?: () => void) => {
    setButtonState(offerKey, 'active');

    // Visual feedback: return to default state after brief delay
    setTimeout(() => {
      if (isMounted.current) {
        setButtonState(offerKey, 'default');
      }
    }, 150);

    // Execute external click handler if provided
    onButtonClick?.();
  }, [setButtonState]);

  // Utility Functions

  /**
   * Reset all component states to their initial values
   * Useful for testing or resetting chain offer progress
   */
  const resetAllStates = useCallback(() => {
    setComponentState({
      offerStates: initializeOfferStates(chainOfferData),
      headerState: 'active',
      buttonStates: initializeButtonStates(chainOfferData)
    });
  }, [chainOfferData]);

  return {
    // Current state values
    offerStates: componentState.offerStates,
    headerState: componentState.headerState,
    buttonStates: componentState.buttonStates,

    // Offer state management
    getOfferState,
    setOfferState,
    cycleOfferState,

    // Component state management
    setHeaderState,
    cycleHeaderState,

    // Button state management
    getButtonState,
    setButtonState,
    handleButtonMouseEnter,
    handleButtonMouseLeave,
    handleButtonClick,

    // Utilities
    resetAllStates
  };
}
