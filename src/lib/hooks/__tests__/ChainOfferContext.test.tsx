import { act, render, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { ButtonState, ChainOfferExport, HeaderState, OfferState } from '../../types';
import { ChainOfferProvider, useChainOfferContext } from '../ChainOfferContext';

type ChainOfferContextValue = ReturnType<typeof useChainOfferContext>;

describe('ChainOfferContext', () => {
  const mockChainOfferData: ChainOfferExport = {
    chainOfferId: 'test',
    frameSize: { width: 800, height: 600 },
    background: { exportUrl: 'bg.png' },
    offers: [
      {
        offerKey: 'offer1',
        stateBounds: { Locked: {} as any, Unlocked: {} as any, Claimed: {} as any }
      },
      {
        offerKey: 'offer2',
        stateBounds: { Locked: {} as any, Unlocked: {} as any, Claimed: {} as any }
      }
    ],
    buttons: [
      { offerKey: 'offer1', position: { x: 0, y: 0 }, stateStyles: {} as any },
      { offerKey: 'offer2', position: { x: 0, y: 0 }, stateStyles: {} as any }
    ],
    exportedAt: '',
    metadata: { version: '1.0.0' }
  };

  describe('ChainOfferProvider', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useChainOfferContext(), {
        wrapper: ({ children }) => (
          <ChainOfferProvider chainOfferData={mockChainOfferData}>{children}</ChainOfferProvider>
        )
      });

      expect(result.current.state).toEqual({
        offerStates: { offer1: 'Locked', offer2: 'Locked' },
        headerState: 'active',
        buttonStates: { offer1: 'default', offer2: 'default' },
        isAnimating: false
      });
    });

    it('should handle empty offers and buttons', () => {
      const emptyData = { ...mockChainOfferData, offers: [], buttons: [] };
      const { result } = renderHook(() => useChainOfferContext(), {
        wrapper: ({ children }) => (
          <ChainOfferProvider chainOfferData={emptyData}>
            {children}
          </ChainOfferProvider>
        )
      });

      expect(result.current.state.offerStates).toEqual({});
      expect(result.current.state.buttonStates).toEqual({});
    });
  });

  describe('useChainOfferContext hook', () => {
    it('should throw error when used outside provider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useChainOfferContext());
      }).toThrow('useChainOfferContext must be used within a ChainOfferProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('Offer State Management', () => {
    let renderResult: { result: { current: ChainOfferContextValue } };

    beforeEach(() => {
      renderResult = renderHook(() => useChainOfferContext(), {
        wrapper: ({ children }) => (
          <ChainOfferProvider chainOfferData={mockChainOfferData}>
            {children}
          </ChainOfferProvider>
        )
      });
    });

    describe('setOfferState', () => {
      it('should set offer state for existing offer', () => {
        act(() => {
          renderResult.result.current.setOfferState('offer1', 'Unlocked');
        });

        expect(renderResult.result.current.state.offerStates.offer1).toBe('Unlocked');
        expect(renderResult.result.current.state.offerStates.offer2).toBe('Locked');
      });

      it('should handle all valid offer states', () => {
        const offerStates: OfferState[] = ['Locked', 'Unlocked', 'Claimed'];

        offerStates.forEach((state) => {
          act(() => {
            renderResult.result.current.setOfferState('offer1', state);
          });

          expect(renderResult.result.current.state.offerStates.offer1).toBe(state);
        });
      });
    });

    describe('cycleOfferState', () => {
      it('should cycle through offer states in correct order', () => {
        const expectedCycle: OfferState[] = ['Locked', 'Unlocked', 'Claimed'];

        expect(renderResult.result.current.state.offerStates.offer1).toBe('Locked');

        for (let i = 1; i < expectedCycle.length; i++) {
          act(() => {
            renderResult.result.current.cycleOfferState('offer1');
          });
          expect(renderResult.result.current.state.offerStates.offer1).toBe(expectedCycle[i]);
        }

        act(() => {
          renderResult.result.current.cycleOfferState('offer1');
        });
        expect(renderResult.result.current.state.offerStates.offer1).toBe('Locked');
      });

      it('should sync button state when cycling offer', () => {
        // Initial: Locked -> disabled (implied default logic from implementation)
        // But actually in initializeButtonStates they start as 'default'.
        // The cycleOfferState logic overrides this on first cycle.
        
        // 1. Locked -> Unlocked => Button should become 'default'
        act(() => {
          renderResult.result.current.cycleOfferState('offer1');
        });
        expect(renderResult.result.current.state.offerStates.offer1).toBe('Unlocked');
        expect(renderResult.result.current.state.buttonStates.offer1).toBe('default');

        // 2. Unlocked -> Claimed => Button should become 'claimed'
        act(() => {
          renderResult.result.current.cycleOfferState('offer1');
        });
        expect(renderResult.result.current.state.offerStates.offer1).toBe('Claimed');
        expect(renderResult.result.current.state.buttonStates.offer1).toBe('claimed');

        // 3. Claimed -> Locked => Button should become 'disabled'
        act(() => {
          renderResult.result.current.cycleOfferState('offer1');
        });
        expect(renderResult.result.current.state.offerStates.offer1).toBe('Locked');
        expect(renderResult.result.current.state.buttonStates.offer1).toBe('disabled');
      });
    });
  });

  describe('Button State Management', () => {
    let renderResult: { result: { current: ChainOfferContextValue } };

    beforeEach(() => {
      renderResult = renderHook(() => useChainOfferContext(), {
        wrapper: ({ children }) => (
          <ChainOfferProvider chainOfferData={mockChainOfferData}>
            {children}
          </ChainOfferProvider>
        )
      });
    });

    describe('setButtonState', () => {
      it('should set button state for specific offer', () => {
        act(() => {
          renderResult.result.current.setButtonState('offer1', 'hover');
        });

        expect(renderResult.result.current.state.buttonStates.offer1).toBe('hover');
        expect(renderResult.result.current.state.buttonStates.offer2).toBe('default');
      });

      it('should handle claimed button state', () => {
        act(() => {
          renderResult.result.current.setButtonState('offer1', 'claimed');
        });

        expect(renderResult.result.current.state.buttonStates.offer1).toBe('claimed');
      });
    });

    describe('Mouse Interactions', () => {
      it('should handle mouse down (default -> active)', () => {
        // Ensure default first
        act(() => { renderResult.result.current.setButtonState('offer1', 'default'); });
        
        act(() => {
          renderResult.result.current.handleButtonMouseDown('offer1');
        });
        expect(renderResult.result.current.state.buttonStates.offer1).toBe('active');
      });

      it('should not handle mouse down if disabled', () => {
        act(() => { renderResult.result.current.setButtonState('offer1', 'disabled'); });
        
        act(() => {
          renderResult.result.current.handleButtonMouseDown('offer1');
        });
        expect(renderResult.result.current.state.buttonStates.offer1).toBe('disabled');
      });

      it('should handle mouse up (active -> hover)', () => {
        act(() => { renderResult.result.current.setButtonState('offer1', 'active'); });
        
        act(() => {
          renderResult.result.current.handleButtonMouseUp('offer1');
        });
        expect(renderResult.result.current.state.buttonStates.offer1).toBe('hover');
      });
    });
  });

  describe('Reset Functionality', () => {
    let renderResult: { result: { current: ChainOfferContextValue } };

    beforeEach(() => {
      renderResult = renderHook(() => useChainOfferContext(), {
        wrapper: ({ children }) => (
          <ChainOfferProvider chainOfferData={mockChainOfferData}>
            {children}
          </ChainOfferProvider>
        )
      });
    });

    it('should reset all states to defaults', () => {
      act(() => {
        renderResult.result.current.setOfferState('offer1', 'Claimed');
        renderResult.result.current.setButtonState('offer1', 'active');
        renderResult.result.current.setHeaderState('fail');
        renderResult.result.current.setIsAnimating(true);
      });

      expect(renderResult.result.current.state.offerStates.offer1).toBe('Claimed');
      expect(renderResult.result.current.state.isAnimating).toBe(true);

      act(() => {
        renderResult.result.current.resetAllStates();
      });

      expect(renderResult.result.current.state.offerStates.offer1).toBe('Locked');
      expect(renderResult.result.current.state.buttonStates.offer1).toBe('default');
      expect(renderResult.result.current.state.headerState).toBe('active');
      expect(renderResult.result.current.state.isAnimating).toBe(false);
    });
  });
});
