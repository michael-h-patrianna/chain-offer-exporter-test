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
  titleVariants: Variants;
  footerVariants: Variants;
  chainofferHeaderImageVariants: Variants;
  chainofferTimerVariants: Variants;
  chainofferDescriptionVariants: Variants;
  chainofferBonusRewardsVariants: Variants;
  chainofferProgressBarVariants: Variants;
  chainofferFooterVariants: Variants;
}

export interface AnimationParameterConfig {
  id: string; // Changed from 'key' to 'id' to match current project
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

export const defaultAnimationParameters: Record<AnimationType, AnimationParameters> = {
  'stagger-inview': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },
  'scale-rotate': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.15,
    delayChildren: 0.1,
  },
  'flip-reveal': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.12,
    delayChildren: 0.15,
  },
  'spring-physics': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.08,
    delayChildren: 0.1,
    spring: {
      stiffness: 200,
      damping: 15,
      mass: 1.0,
    },
  },
  'fade-slide': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.1,
    delayChildren: 0.15,
  },
  'elastic-bounce': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.08,
    delayChildren: 0,
    wobble: {
      wobbleIntensity: 1.0,
    },
  },
  'orbital-reveal': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.12,
    delayChildren: 0.1,
    spring: {
      stiffness: 120,
      damping: 12,
      mass: 1.0,
    },
    orbital: {
      orbitDistance: 100,
    },
  },
  'glitch-snap': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.06,
    delayChildren: 0.05,
  },
  'silk-unfold': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.12,
    delayChildren: 0.15,
  },
  'crystal-shimmer': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },
  'velvet-cascade': {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0.08,
    delayChildren: 0.25,
  },
  none: {
    durationScale: 1.0,
    delayOffset: 0,
    staggerChildren: 0,
    delayChildren: 0,
  },
};

// Synchronized with chain-offer-mock/src/types/animationParameters.ts values
export const baseParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'durationScale',
    label: 'Duration',
    description: 'Speed multiplier for all animations',
    min: 0.5,
    max: 3.0,
    step: 0.1,
    defaultValue: 1.0,
  },
  {
    id: 'delayOffset',
    label: 'Delay',
    description: 'Add or subtract delay from all animations',
    min: -1.0,
    max: 2.0,
    step: 0.1,
    defaultValue: 0,
  },
  {
    id: 'staggerChildren',
    label: 'Stagger',
    description: 'Time between child animations',
    min: 0,
    max: 0.5,
    step: 0.01,
    defaultValue: 0.1,
  },
  {
    id: 'delayChildren',
    label: 'Initial Delay',
    description: 'Delay before children start animating',
    min: 0,
    max: 2.0,
    step: 0.05,
    defaultValue: 0.2,
  },
];

export const springParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'stiffness',
    label: 'Stiffness',
    description: 'Spring tension (higher = faster)',
    min: 50,
    max: 500,
    step: 10,
    defaultValue: 200,
  },
  {
    id: 'damping',
    label: 'Damping',
    description: 'Spring resistance (higher = less bounce)',
    min: 5,
    max: 50,
    step: 1,
    defaultValue: 15,
  },
  {
    id: 'mass',
    label: 'Mass',
    description: 'Object weight (higher = slower)',
    min: 0.1,
    max: 3.0,
    step: 0.1,
    defaultValue: 1.0,
  },
];

export const wobbleParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'wobbleIntensity',
    label: 'Wobble Intensity',
    description: 'How extreme the wobble effect is',
    min: 0.5,
    max: 2.0,
    step: 0.1,
    defaultValue: 1.0,
  },
];

export const orbitalParameterConfigs: AnimationParameterConfig[] = [
  {
    id: 'orbitDistance',
    label: 'Orbit Distance',
    description: 'Size of the circular motion path',
    min: 50,
    max: 200,
    step: 10,
    defaultValue: 100,
  },
];
