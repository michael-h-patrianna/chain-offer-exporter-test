import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { AppState, ButtonState, ChainOfferExport, HeaderState, OfferState } from '../types';

interface ChainOfferContextValue {
  // State
  state: AppState;

  // Offer state management
  setOfferState: (offerKey: string, state: OfferState) => void;
  cycleOfferState: (offerKey: string) => void;

  // Header state management
  setHeaderState: (state: HeaderState) => void;
  cycleHeaderState: () => void;

  // Button state management
  setButtonState: (offerKey: string, state: ButtonState) => void;

  // Animation management
  setIsAnimating: (isAnimating: boolean) => void;
  finishAnimation: () => void;

  // Reset functionality
  resetAllStates: () => void;
}

const ChainOfferContext = createContext<ChainOfferContextValue | null>(null);

export function useChainOfferContext(): ChainOfferContextValue {
  const context = useContext(ChainOfferContext);
  if (!context) {
    throw new Error('useChainOfferContext must be used within a ChainOfferProvider');
  }
  return context;
}

interface ChainOfferProviderProps {
  children: ReactNode;
  chainOfferData: ChainOfferExport;
}

export function ChainOfferProvider({ children, chainOfferData }: ChainOfferProviderProps) {
  // Initialize states
  const initialOfferStates = (chainOfferData.offers || []).reduce((acc, offer) => {
    acc[offer.offerKey] = 'Locked';
    return acc;
  }, {} as Record<string, OfferState>);

  const initialButtonStates = (chainOfferData.buttons || []).reduce((acc, button) => {
    acc[button.offerKey] = 'default';
    return acc;
  }, {} as Record<string, ButtonState>);

  const [state, setState] = useState<AppState>({
    offerStates: initialOfferStates,
    headerState: 'active',
    buttonStates: initialButtonStates,
    isAnimating: false
  });

  // Offer state management
  const setOfferState = useCallback((offerKey: string, newState: OfferState) => {
    setState(prev => ({
      ...prev,
      offerStates: {
        ...prev.offerStates,
        [offerKey]: newState
      }
    }));
  }, []);

  const cycleOfferState = useCallback((offerKey: string) => {
    const offerStates: OfferState[] = ['Locked', 'Unlocked', 'Claimed'];
    setState(prev => {
      const currentState = prev.offerStates[offerKey] || 'Locked';
      const currentIndex = offerStates.indexOf(currentState);
      const nextIndex = (currentIndex + 1) % offerStates.length;
      const nextState = offerStates[nextIndex];

      return {
        ...prev,
        offerStates: {
          ...prev.offerStates,
          [offerKey]: nextState
        }
      };
    });
  }, []);

  // Header state management
  const setHeaderState = useCallback((newState: HeaderState) => {
    setState(prev => ({
      ...prev,
      headerState: newState
    }));
  }, []);

  const cycleHeaderState = useCallback(() => {
    const headerStates: HeaderState[] = ['active', 'success', 'fail'];
    setState(prev => {
      const currentIndex = headerStates.indexOf(prev.headerState);
      const nextIndex = (currentIndex + 1) % headerStates.length;
      return {
        ...prev,
        headerState: headerStates[nextIndex]
      };
    });
  }, []);

  // Button state management
  const setButtonState = useCallback((offerKey: string, newState: ButtonState) => {
    setState(prev => ({
      ...prev,
      buttonStates: {
        ...prev.buttonStates,
        [offerKey]: newState
      }
    }));
  }, []);

  // Animation management
  const setIsAnimating = useCallback((isAnimating: boolean) => {
    setState(prev => ({
      ...prev,
      isAnimating
    }));
  }, []);

  const finishAnimation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isAnimating: false
    }));
  }, []);

  // Reset functionality
  const resetAllStates = useCallback(() => {
    setState(prev => ({
      ...prev,
      offerStates: Object.keys(prev.offerStates).reduce((acc, key) => {
        acc[key] = 'Locked';
        return acc;
      }, {} as Record<string, OfferState>),
      headerState: 'active',
      buttonStates: Object.keys(prev.buttonStates).reduce((acc, key) => {
        acc[key] = 'default';
        return acc;
      }, {} as Record<string, ButtonState>),
      isAnimating: false
    }));
  }, []);

  const contextValue: ChainOfferContextValue = {
    state,
    setOfferState,
    cycleOfferState,
    setHeaderState,
    cycleHeaderState,
    setButtonState,
    setIsAnimating,
    finishAnimation,
    resetAllStates
  };

  return (
    <ChainOfferContext.Provider value={contextValue}>
      {children}
    </ChainOfferContext.Provider>
  );
}
