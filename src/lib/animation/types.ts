import { Variants } from 'framer-motion';

export type AnimationType = 
  | 'stagger-inview'
  | 'scale-rotate'
  | 'flip-reveal'
  | 'spring-physics'
  | 'fade-slide'
  | 'elastic-bounce'
  | 'orbital-reveal'
  | 'glitch-snap'
  | 'silk-unfold'
  | 'crystal-shimmer'
  | 'velvet-cascade'
  | 'none';

export interface RevealAnimation {
  id: AnimationType;
  name: string;
  description: string;
  containerVariants: Variants;
  itemVariants: Variants;
  headerImageVariants: Variants;
  timerVariants: Variants;
  questlineDescriptionVariants: Variants;
  questlineBonusRewardsVariants: Variants;
  questlineProgressBarVariants: Variants;
  questlineFooterVariants: Variants;
}

export interface AnimationParameterConfig {
  id: string;
  label: string;
  description: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface WobbleConfig {
  wobbleIntensity: number;
}

export interface OrbitalConfig {
  orbitDistance: number;
}

export interface AnimationParameters {
  durationScale: number;
  delayOffset: number;
  staggerChildren: number;
  delayChildren: number;
  spring?: SpringConfig;
  wobble?: WobbleConfig;
  orbital?: OrbitalConfig;
}

export const baseParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'durationScale',
    label: 'Duration Scale',
    description: 'Global speed multiplier (lower is faster)',
    min: 0.1,
    max: 3.0,
    step: 0.1,
    defaultValue: 1.0,
  },
  {
    id: 'delayOffset',
    label: 'Start Delay',
    description: 'Initial delay before animation starts',
    min: 0,
    max: 2.0,
    step: 0.1,
    defaultValue: 0,
  },
  {
    id: 'staggerChildren',
    label: 'Stagger',
    description: 'Time between each item appearing',
    min: 0,
    max: 0.5,
    step: 0.01,
    defaultValue: 0.08,
  },
  {
    id: 'delayChildren',
    label: 'Child Delay',
    description: 'Delay before children start animating',
    min: 0,
    max: 1.0,
    step: 0.05,
    defaultValue: 0.2,
  },
]

export const springParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'stiffness',
    label: 'Stiffness',
    description: 'Spring stiffness/tension',
    min: 10,
    max: 500,
    step: 10,
    defaultValue: 100,
  },
  {
    id: 'damping',
    label: 'Damping',
    description: 'Opposition to motion (bounce reduction)',
    min: 5,
    max: 100,
    step: 5,
    defaultValue: 10,
  },
  {
    id: 'mass',
    label: 'Mass',
    description: 'Weight of the object',
    min: 0.1,
    max: 5,
    step: 0.1,
    defaultValue: 1,
  },
]

export const wobbleParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'wobbleIntensity',
    label: 'Intensity',
    description: 'Strength of the wobble effect',
    min: 0,
    max: 20,
    step: 1,
    defaultValue: 5,
  },
]

export const orbitalParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'orbitDistance',
    label: 'Orbit Distance',
    description: 'Radius of the orbital path',
    min: 0,
    max: 200,
    step: 10,
    defaultValue: 50,
  },
]
