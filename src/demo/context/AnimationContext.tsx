import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnimationParameters, AnimationType } from '../../lib/animation/types';

interface AnimationContextType {
  parameters: Record<AnimationType, AnimationParameters>;
  getParameters: (type: AnimationType) => AnimationParameters;
  updateParameter: (type: AnimationType, key: keyof AnimationParameters, value: number) => void;
  updateSpringParameter: (type: AnimationType, key: string, value: number) => void;
  updateWobbleParameter: (type: AnimationType, key: string, value: number) => void;
  updateOrbitalParameter: (type: AnimationType, key: string, value: number) => void;
  resetToDefaults: (type: AnimationType) => void;
  getAllParameters: () => Record<AnimationType, AnimationParameters>;
  setAllParameters: (params: Record<AnimationType, AnimationParameters>) => void;
}

const defaultParameters: AnimationParameters = {
  durationScale: 1.0,
  delayOffset: 0,
  staggerChildren: 0.08,
  delayChildren: 0.2,
  spring: {
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
  wobble: {
    wobbleIntensity: 5,
  },
  orbital: {
    orbitDistance: 50,
  },
};

const defaultState: Record<AnimationType, AnimationParameters> = {
  'stagger-inview': { ...defaultParameters },
  'scale-rotate': { ...defaultParameters },
  'flip-reveal': { ...defaultParameters },
  'spring-physics': { ...defaultParameters },
  'fade-slide': { ...defaultParameters },
  'glitch-snap': { ...defaultParameters },
  'silk-unfold': { ...defaultParameters },
  'elastic-bounce': { ...defaultParameters },
  'orbital-reveal': { ...defaultParameters },
  'crystal-shimmer': { ...defaultParameters },
  'velvet-cascade': { ...defaultParameters },
  'none': { ...defaultParameters },
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationParametersProvider({ children }: { children: ReactNode }) {
  const [parameters, setParameters] = useState<Record<AnimationType, AnimationParameters>>(defaultState);

  const getParameters = (type: AnimationType) => {
    return parameters[type] || defaultParameters;
  };

  const updateParameter = (type: AnimationType, key: keyof AnimationParameters, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  const updateSpringParameter = (type: AnimationType, key: string, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        spring: {
          ...prev[type].spring!,
          [key]: value,
        },
      },
    }));
  };

  const updateWobbleParameter = (type: AnimationType, key: string, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        wobble: {
          ...prev[type].wobble!,
          [key]: value,
        },
      },
    }));
  };

  const updateOrbitalParameter = (type: AnimationType, key: string, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        orbital: {
          ...prev[type].orbital!,
          [key]: value,
        },
      },
    }));
  };

  const resetToDefaults = (type: AnimationType) => {
    setParameters((prev) => ({
      ...prev,
      [type]: { ...defaultParameters },
    }));
  };

  const getAllParameters = () => parameters;
  const setAllParameters = (params: Record<AnimationType, AnimationParameters>) => setParameters(params);

  return (
    <AnimationContext.Provider
      value={{
        parameters,
        getParameters,
        updateParameter,
        updateSpringParameter,
        updateWobbleParameter,
        updateOrbitalParameter,
        resetToDefaults,
        getAllParameters,
        setAllParameters,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationParameters() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimationParameters must be used within an AnimationParametersProvider');
  }
  return context;
}