import React, { ReactNode } from 'react';
import './AnimationControls.css';

interface ParameterGroupProps {
  title: string;
  children: ReactNode;
}

export function ParameterGroup({ title, children }: ParameterGroupProps) {
  return (
    <div className="parameter-group">
      <h3 className="parameter-group__title">{title}</h3>
      <div className="parameter-group__content">{children}</div>
    </div>
  );
}
