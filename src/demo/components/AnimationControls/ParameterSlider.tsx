import React from 'react';
import './AnimationControls.css';

interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  description: string;
  onChange: (value: number) => void;
}

export function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  description,
  onChange,
}: ParameterSliderProps) {
  return (
    <div className="parameter-slider">
      <div className="parameter-slider__header">
        <label className="parameter-slider__label" title={description}>
          {label}
        </label>
        <span className="parameter-slider__value">{value.toFixed(step < 0.1 ? 2 : 1)}</span>
      </div>
      <input
        type="range"
        className="parameter-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
