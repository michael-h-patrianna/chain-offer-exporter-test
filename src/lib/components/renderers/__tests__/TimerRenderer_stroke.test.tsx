import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { TimerComponent } from '../../../types';
import { TimerRenderer } from '../TimerRenderer';

const mockTimerWithStroke: TimerComponent = {
  position: { x: 100, y: 100 },
  dimensions: { width: 100, height: 40 },
  borderRadius: 20,
  backgroundFill: { type: 'solid', color: '#ffffff' },
  isAutolayout: false,
  padding: { vertical: 10, horizontal: 20 },
  dropShadows: [],
  textStyle: { fontSize: 16, color: '#000000' },
  stroke: { width: 2, color: '#ff0000' }
};

describe('TimerRenderer', () => {
  it('renders with stroke style when provided', () => {
    render(
      <TimerRenderer
        timer={mockTimerWithStroke}
        scale={1}
      />
    );

    const timer = screen.getByRole('timer');
    expect(timer).toBeInTheDocument();
    
    // Check if the border style is applied (this will fail until we fix the implementation)
    expect(timer).toHaveStyle({
      border: '2px solid #ff0000'
    });
  });
});
