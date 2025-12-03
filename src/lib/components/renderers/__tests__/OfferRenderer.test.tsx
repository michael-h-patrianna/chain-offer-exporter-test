import { render, screen } from '@testing-library/react';
import React from 'react';
import { ChainOfferProvider } from '../../../hooks/ChainOfferContext';
import type { ChainOfferExport, Offer, OfferState } from '../../../types';
import { OfferRenderer } from '../OfferRenderer';

describe('OfferRenderer - Core Positioning Demo', () => {
  const mockOffer: Offer = {
    offerKey: 'test-offer',
    stateBounds: {
      Locked: { x: 174.5, y: 172.5, w: 271, h: 187 },
      Unlocked: { x: 67.5, y: 52.5, w: 105, h: 55 },
      Claimed: { x: 75, y: 60, w: 110, h: 60 },
    },
    lockedImg: 'test-offer_locked.png',
    unlockedImg: 'test-offer_unlocked.png',
    claimedImg: 'test-offer_claimed.png',
  };

  const mockOfferImages = {
    Locked: 'blob:locked-image-url',
    Unlocked: 'blob:unlocked-image-url',
    Claimed: 'blob:claimed-image-url',
  };

  const mockChainOfferData: ChainOfferExport = {
    chainOfferId: 'test',
    frameSize: { width: 800, height: 600 },
    background: { exportUrl: 'bg.png' },
    offers: [mockOffer],
    buttons: [],
    exportedAt: '',
    metadata: { version: '1.0.0' }
  };

  const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ChainOfferProvider chainOfferData={mockChainOfferData}>
      {children}
    </ChainOfferProvider>
  );

  describe('Core Positioning System', () => {
    it('should render with x/y positioning converted to CSS variables', () => {
      render(
        <TestWrapper>
          <OfferRenderer
            offer={mockOffer}
            currentState={"Locked"}
            offerImage={mockOfferImages.Locked}
            scale={2.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      // Verify the component exists with correct attributes
      const offerElement = document.querySelector('[data-offer-key="test-offer"]');
      expect(offerElement).toBeInTheDocument();
      expect(offerElement).toHaveAttribute('data-offer-key', 'test-offer');
      expect(offerElement).toHaveAttribute('data-offer-state', 'Locked');
      expect(offerElement).toHaveClass('offer-component');

      // Verify CSS variables
      // x=174.5, y=172.5, w=271, h=187, scale=2.0
      // Left/Top should match x/y directly (scaled)
      // Width/Height should match w/h directly (scaled)
      // Transform should handle centering
      
      expect(offerElement).toHaveStyle({
        '--offer-left': '349px', // 174.5 * 2
        '--offer-top': '345px',  // 172.5 * 2
        '--offer-width': '542px', // 271 * 2
        '--offer-height': '374px', // 187 * 2
        '--offer-transform': 'translate(-50%, -50%)' // centered
      });
    });

    it('should handle rotation in CSS variables', () => {
      const offerWithRotation: Offer = {
        ...mockOffer,
        stateBounds: {
          ...mockOffer.stateBounds,
          Locked: { ...mockOffer.stateBounds.Locked, rotation: 45 }
        }
      };

      render(
        <TestWrapper>
          <OfferRenderer
            offer={offerWithRotation}
            currentState={"Locked"}
            offerImage={mockOfferImages.Locked}
            scale={1.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      const offerElement = document.querySelector('[data-offer-key="test-offer"]');
      expect(offerElement).toHaveStyle({
        '--offer-transform': 'translate(-50%, -50%) rotate(45deg)'
      });
    });

    it('should update positioning when state changes', () => {
      let currentState: OfferState = 'Locked';
      const { rerender } = render(
        <TestWrapper>
          <OfferRenderer
            offer={mockOffer}
            currentState={currentState}
            offerImage={mockOfferImages.Locked}
            scale={1.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      const offerElement = document.querySelector('[data-offer-key="test-offer"]');

      // Initial position: Locked bounds
      expect(offerElement).toHaveStyle({
        '--offer-left': '174.5px',
        '--offer-top': '172.5px',
        '--offer-width': '271px',
        '--offer-height': '187px'
      });

      // Re-render with Unlocked state
      currentState = 'Unlocked';
      rerender(
        <TestWrapper>
          <OfferRenderer
            offer={mockOffer}
            currentState={currentState}
            offerImage={mockOfferImages.Unlocked}
            scale={1.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      expect(offerElement).toHaveStyle({
        '--offer-left': '67.5px',
        '--offer-top': '52.5px',
        '--offer-width': '105px',
        '--offer-height': '55px'
      });
    });
  });

  describe('Image Handling', () => {
    it('should render image with correct attributes', () => {
      render(
        <TestWrapper>
          <OfferRenderer
            offer={mockOffer}
            currentState={"Locked"}
            offerImage={mockOfferImages.Locked}
            scale={1.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      const image = screen.getByAltText('test-offer in Locked visual state');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'blob:locked-image-url');
      expect(image).toHaveClass('offer-image');
      expect(image).toHaveAttribute('draggable', 'false');
    });

    it('should render empty image when no image provided', () => {
      render(
        <TestWrapper>
          <OfferRenderer
            offer={mockOffer}
            currentState={"Locked"}
            offerImage={undefined}
            scale={1.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      const image = screen.getByAltText('test-offer in Locked visual state');
      expect(image).toBeInTheDocument();
      expect(image).not.toHaveAttribute('src');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <TestWrapper>
          <OfferRenderer
            offer={mockOffer}
            currentState={"Locked"}
            offerImage={mockOfferImages.Locked}
            scale={1.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      const offerElement = document.querySelector('[data-offer-key="test-offer"]');
      expect(offerElement).toHaveAttribute('role', 'button');
      expect(offerElement).toHaveAttribute('tabIndex', '0');
      expect(offerElement).toHaveAttribute('aria-label', 'Offer test-offer - Locked visual state');
      expect(offerElement).toHaveAttribute('title', 'test-offer (Locked) - Click to cycle states');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero scale gracefully', () => {
      render(
        <TestWrapper>
          <OfferRenderer
            offer={mockOffer}
            currentState={"Locked"}
            offerImage={mockOfferImages.Locked}
            scale={0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      const offerElement = document.querySelector('[data-offer-key="test-offer"]');
      expect(offerElement).toBeInTheDocument();
      expect(offerElement).toHaveStyle({
        '--offer-width': '0px',
        '--offer-height': '0px'
      });
    });

    it('should handle missing bounds gracefully', () => {
      const offerWithMissingBounds: Offer = {
        ...mockOffer,
        stateBounds: {
          Locked: { x: 0, y: 0, w: 0, h: 0 },
          Unlocked: { x: 0, y: 0, w: 0, h: 0 },
          Claimed: { x: 0, y: 0, w: 0, h: 0 }
        }
      };

      render(
        <TestWrapper>
          <OfferRenderer
            offer={offerWithMissingBounds}
            currentState={"Locked"}
            offerImage={mockOfferImages.Locked}
            scale={1.0}
            onCycleState={() => {}}
          />
        </TestWrapper>
      );

      const offerElement = document.querySelector('[data-offer-key="test-offer"]');
      expect(offerElement).toBeInTheDocument();
      expect(offerElement).toHaveStyle({
        '--offer-width': '0px',
        '--offer-height': '0px'
      });
    });
  });
});