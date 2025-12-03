import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ButtonComponent } from '../../../types';
import { ButtonRenderer } from '../ButtonRenderer';

const mockButtonData: ButtonComponent = {
  offerKey: 'offer1',
  position: { x: 196, y: 248 },
  stateStyles: {
    default: {
      frame: {
        borderRadius: 50,
        backgroundFill: { type: 'solid', color: '#000000' },
        isAutolayout: false,
        padding: { vertical: 0, horizontal: 0 },
        dropShadows: []
      },
      text: { fontSize: 16, color: '#ffffff' }
    },
    disabled: {
       frame: {
        borderRadius: 50,
        backgroundFill: { type: 'solid', color: '#000000' },
        isAutolayout: false,
        padding: { vertical: 0, horizontal: 0 },
        dropShadows: []
      },
      text: { fontSize: 16, color: '#ffffff' }
    },
    hover: {
       frame: {
        borderRadius: 50,
        backgroundFill: { type: 'solid', color: '#000000' },
        isAutolayout: false,
        padding: { vertical: 0, horizontal: 0 },
        dropShadows: []
      },
      text: { fontSize: 16, color: '#ffffff' }
    },
    active: {
       frame: {
        borderRadius: 50,
        backgroundFill: { type: 'solid', color: '#000000' },
        isAutolayout: false,
        padding: { vertical: 0, horizontal: 0 },
        dropShadows: []
      },
      text: { fontSize: 16, color: '#ffffff' }
    },
    claimed: {
      frame: {
        dimensions: { width: 154, height: 58 },
        borderRadius: 50,
        backgroundFill: {
          type: 'gradient',
          gradient: {
            type: 'linear',
            rotation: 178,
            stops: [
              { color: '#8eb9c3', position: 0 },
              { color: '#53668c', position: 0.93 }
            ]
          }
        },
        isAutolayout: true,
        layoutSizing: { horizontal: 'FIXED', vertical: 'FIXED' },
        padding: { vertical: 20, horizontal: 40 },
        dropShadows: [],
        stroke: { width: 2, color: '#4d4c5880' }
      },
      text: {
        fontSize: 18,
        color: '#ffffff66'
      }
    }
  }
};

describe('ButtonRenderer', () => {
  it('renders in claimed state correctly', () => {
    render(
      <ButtonRenderer
        button={mockButtonData}
        currentState="claimed"
        scale={1}
        onMouseEnter={vi.fn()}
        onMouseLeave={vi.fn()}
        onMouseDown={vi.fn()}
        onMouseUp={vi.fn()}
        onClick={vi.fn()}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('CLAIMED');
    
    // Verify styling that indicates it's visible
    const style = window.getComputedStyle(button);
    // Note: CSS variables aren't easily computed in jsdom without a full style engine,
    // but we can check if the element exists and has the class.
    expect(button).toHaveClass('button-component');
    expect(button).toHaveAttribute('data-button-state', 'claimed');
  });

  it('returns null if claimed state style is missing', () => {
    const incompleteData = {
        ...mockButtonData,
        stateStyles: {
            ...mockButtonData.stateStyles,
            claimed: undefined as any // Force missing state
        }
    };

    const { container } = render(
      <ButtonRenderer
        button={incompleteData}
        currentState="claimed"
        scale={1}
        onMouseEnter={vi.fn()}
        onMouseLeave={vi.fn()}
        onMouseDown={vi.fn()}
        onMouseUp={vi.fn()}
        onClick={vi.fn()}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
