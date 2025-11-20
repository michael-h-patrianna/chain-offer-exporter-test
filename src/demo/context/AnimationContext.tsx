import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnimationParameters, AnimationType, defaultAnimationParameters } from '../../lib/animation/types';

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

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationParametersProvider({ children }: { children: ReactNode }) {
  // Initialize with a deep clone of the default parameters to avoid mutation
  const [parameters, setParameters] = useState<Record<AnimationType, AnimationParameters>>(() => 
    JSON.parse(JSON.stringify(defaultAnimationParameters))
  );

  const getParameters = (type: AnimationType) => {
    return parameters[type] || defaultAnimationParameters[type];
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
          ...(prev[type].spring || { stiffness: 200, damping: 15, mass: 1.0 }),
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
          ...(prev[type].wobble || { wobbleIntensity: 1.0 }),
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
          ...(prev[type].orbital || { orbitDistance: 100 }),
          [key]: value,
        },
      },
    }));
  };

  const resetToDefaults = (type: AnimationType) => {
    setParameters((prev) => ({
      ...prev,
      [type]: JSON.parse(JSON.stringify(defaultAnimationParameters[type])),
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
