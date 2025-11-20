import { RevealAnimation } from './types';
import { AnimationParameters } from './types';

/**
 * Deep clone and apply parameters to animation variants
 */
export function applyAnimationParameters(
  baseAnimation: RevealAnimation,
  parameters: AnimationParameters
): RevealAnimation {
  // Deep clone to avoid mutating the original
  const cloned = JSON.parse(JSON.stringify(baseAnimation)) as RevealAnimation;

  // Recursively apply parameters to all variant objects
  return {
    ...cloned,
    containerVariants: applyToVariant(cloned.containerVariants, parameters, true),
    itemVariants: applyToVariant(cloned.itemVariants, parameters, false),
    headerImageVariants: applyToVariant(cloned.headerImageVariants, parameters, false),
    timerVariants: applyToVariant(cloned.timerVariants, parameters, false),
    titleVariants: applyToVariant(cloned.titleVariants, parameters, false),
    footerVariants: applyToVariant(cloned.footerVariants, parameters, false),
    questlineHeaderImageVariants: applyToVariant(cloned.questlineHeaderImageVariants, parameters, false),
    questlineTimerVariants: applyToVariant(cloned.questlineTimerVariants, parameters, false),
    questlineDescriptionVariants: applyToVariant(cloned.questlineDescriptionVariants, parameters, false),
    questlineBonusRewardsVariants: applyToVariant(cloned.questlineBonusRewardsVariants, parameters, false),
    questlineProgressBarVariants: applyToVariant(cloned.questlineProgressBarVariants, parameters, false),
    questlineFooterVariants: applyToVariant(cloned.questlineFooterVariants, parameters, false),
  };
}

/**
 * Apply parameters to a variant object (recursive for all states)
 */
function applyToVariant(variant: any, parameters: AnimationParameters, isContainer: boolean): any {
  if (!variant || typeof variant !== 'object') {
    return variant;
  }

  const result: any = {};

  // Process each state in the variant (hidden, visible, etc.)
  for (const [key, value] of Object.entries(variant)) {
    if (value && typeof value === 'object') {
      result[key] = applyToState(value, parameters, isContainer);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Apply parameters to a single state object
 */
function applyToState(state: any, parameters: AnimationParameters, isContainer: boolean): any {
  if (!state || typeof state !== 'object') {
    return state;
  }

  const result: any = { ...state };

  // Apply wobble intensity to scale and rotate arrays
  if (parameters.wobble) {
    const intensity = parameters.wobble.wobbleIntensity;

    // Scale arrays: multiply deviations from 1.0 by intensity
    if (Array.isArray(result.scale)) {
      result.scale = result.scale.map((val: number) => {
        if (val === 0) return 0; // Keep start at 0
        const deviation = val - 1.0;
        return 1.0 + deviation * intensity;
      });
    }
    if (Array.isArray(result.scaleX)) {
      result.scaleX = result.scaleX.map((val: number) => {
        if (val === 0) return 0;
        const deviation = val - 1.0;
        return 1.0 + deviation * intensity;
      });
    }
    if (Array.isArray(result.scaleY)) {
      result.scaleY = result.scaleY.map((val: number) => {
        if (val === 0 || val === 1) return val; // Keep start/end values
        const deviation = val - 1.0;
        return 1.0 + deviation * intensity;
      });
    }

    // Rotate arrays: multiply by intensity
    if (Array.isArray(result.rotate)) {
      result.rotate = result.rotate.map((val: number) => val * intensity);
    }
  }

  // Apply orbital distance to x/y position values
  if (parameters.orbital) {
    const distanceScale = parameters.orbital.orbitDistance / 100; // Normalize to default of 100

    if (typeof result.x === 'number' && result.x !== 0) {
      result.x = result.x * distanceScale;
    }
    if (typeof result.y === 'number' && result.y !== 0) {
      result.y = result.y * distanceScale;
    }
  }

  // If this state has a transition, apply parameters to it
  if (result.transition && typeof result.transition === 'object') {
    result.transition = applyToTransition(result.transition, parameters, isContainer);
  }

  return result;
}

/**
 * Apply parameters to a transition object
 */
function applyToTransition(transition: any, parameters: AnimationParameters, isContainer: boolean): any {
  if (!transition || typeof transition !== 'object') {
    return transition;
  }

  const result: any = { ...transition };

  // Container-specific properties
  if (isContainer) {
    if (typeof result.staggerChildren === 'number') {
      result.staggerChildren = parameters.staggerChildren;
    }
    if (typeof result.delayChildren === 'number') {
      // delayChildren is relative to the container's start time.
      // We do not add delayOffset here because delayOffset delays the container's start time itself (via result.delay).
      result.delayChildren = parameters.delayChildren;
    }
  }

  // Apply duration scale
  if (typeof result.duration === 'number') {
    result.duration = result.duration * parameters.durationScale;
  }

  // Apply delay offset
  if (typeof result.delay === 'number') {
    result.delay = Math.max(0, result.delay + parameters.delayOffset);
  }

  // Apply spring physics parameters
  if (result.type === 'spring' && parameters.spring) {
    if (typeof result.stiffness === 'number') {
      result.stiffness = parameters.spring.stiffness;
    }
    if (typeof result.damping === 'number') {
      result.damping = parameters.spring.damping;
    }
    if (typeof result.mass === 'number') {
      result.mass = parameters.spring.mass;
    }
  }

  return result;
}
