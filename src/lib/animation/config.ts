import { AnimationType, RevealAnimation } from './types';

export const revealAnimations: Record<AnimationType, RevealAnimation> = {
  'stagger-inview': {
    id: 'stagger-inview',
    name: 'Stagger In View',
    description: 'Smooth stagger',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        y: 60,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        y: -40,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        scaleX: 0.5,
      },
      visible: {
        opacity: 1,
        scaleX: 1,
        transition: {
          duration: 0.6,
          delay: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          delay: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  },

  'scale-rotate': {
    id: 'scale-rotate',
    name: 'Scale & Rotate Pop',
    description: 'Pop effect',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    },
    itemVariants: {
      hidden: {
        scale: 0.85,
        rotate: -6,
        opacity: 0,
      },
      visible: {
        scale: [0.85, 1.06, 1],
        rotate: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    headerImageVariants: {
      hidden: {
        scale: 0.7,
        rotate: -12,
        opacity: 0,
      },
      visible: {
        scale: [0.7, 1.1, 1],
        rotate: [-12, 3, 0],
        opacity: 1,
        transition: {
          duration: 0.7,
          delay: 0.05,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    timerVariants: {
      hidden: {
        scale: 0.5,
        rotate: 8,
        opacity: 0,
      },
      visible: {
        scale: [0.5, 1.15, 1],
        rotate: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        scale: 0.85,
        opacity: 0,
      },
      visible: {
        scale: [0.85, 1.05, 1],
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        scale: 0.7,
        rotate: -8,
        opacity: 0,
      },
      visible: {
        scale: [0.7, 1.1, 1],
        rotate: 0,
        opacity: 1,
        transition: {
          duration: 0.7,
          delay: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        scaleX: 0.3,
        opacity: 0,
      },
      visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        scale: 0.9,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
          delay: 1.1,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
  },

  'flip-reveal': {
    id: 'flip-reveal',
    name: 'Flip Reveal',
    description: '3D flip',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.15,
        },
      },
    },
    itemVariants: {
      hidden: {
        scale: 0,
        opacity: 0,
        rotateY: -180,
      },
      visible: {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        rotateX: -90,
        transformPerspective: 1000,
      },
      visible: {
        opacity: 1,
        rotateX: 0,
        transformPerspective: 1000,
        transition: {
          duration: 0.8,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        rotateY: 180,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        rotateY: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
        rotateX: 80,
      },
      visible: {
        opacity: 1,
        rotateX: 0,
        transition: {
          duration: 0.7,
          delay: 0.55,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        rotateY: -90,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        rotateY: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          delay: 0.45,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        rotateX: -45,
        scaleX: 0.5,
      },
      visible: {
        opacity: 1,
        rotateX: 0,
        scaleX: 1,
        transition: {
          duration: 0.7,
          delay: 0.65,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        rotateX: -30,
      },
      visible: {
        opacity: 1,
        rotateX: 0,
        transition: {
          duration: 0.5,
          delay: 1.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  },

  'spring-physics': {
    id: 'spring-physics',
    name: 'Spring Physics',
    description: 'Bounce bounce',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    },
    itemVariants: {
      hidden: {
        scale: 0,
        y: -100,
        opacity: 0,
      },
      visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
          mass: 1.2,
        },
      },
    },
    headerImageVariants: {
      hidden: {
        scale: 0.5,
        y: -150,
        opacity: 0,
      },
      visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 180,
          damping: 12,
          mass: 1.5,
          delay: 0.05,
        },
      },
    },
    timerVariants: {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 250,
          damping: 18,
          mass: 0.8,
          delay: 0.3,
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        y: 60,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 180,
          damping: 18,
          mass: 1.1,
          delay: 0.45,
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        scale: 0.5,
        y: -80,
        opacity: 0,
      },
      visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 14,
          mass: 1.3,
          delay: 0.4,
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        scaleX: 0,
        opacity: 0,
      },
      visible: {
        scaleX: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 150,
          damping: 16,
          mass: 0.9,
          delay: 0.6,
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        y: 40,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 140,
          damping: 14,
          mass: 0.8,
          delay: 1.0,
        },
      },
    },
  },

  'fade-slide': {
    id: 'fade-slide',
    name: 'Fade & Slide',
    description: 'Simple fade with slide',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.15,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        x: -50,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        x: -60,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        x: 60,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: 0.45,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        x: -50,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          delay: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        scaleX: 0.6,
      },
      visible: {
        opacity: 1,
        scaleX: 1,
        transition: {
          duration: 0.6,
          delay: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          delay: 1.0,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },
  },

  'elastic-bounce': {
    id: 'elastic-bounce',
    name: 'Jello Wobble',
    description: 'Extreme jello-like wobble',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        scale: 0,
        rotate: 0,
      },
      visible: {
        opacity: 1,
        scale: [0, 1.5, 0.75, 1.2, 0.9, 1],
        rotate: [0, 25, -15, 10, -5, 0],
        transition: {
          duration: 0.6,
          ease: 'easeOut',
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        scale: 0,
      },
      visible: {
        opacity: 1,
        scale: [0, 1.6, 0.8, 1.25, 0.95, 1],
        scaleY: [1, 0.75, 1.25, 0.9, 1.05, 1],
        rotate: [0, -20, 12, -6, 0],
        transition: {
          duration: 0.7,
          delay: 0,
          ease: 'easeOut',
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        scale: 0,
      },
      visible: {
        opacity: 1,
        scale: [0, 1.7, 0.7, 1.3, 0.9, 1],
        rotate: [0, 20, -12, 6, 0],
        transition: {
          duration: 0.65,
          delay: 0.08,
          ease: 'easeOut',
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
        scaleX: 0,
      },
      visible: {
        opacity: 1,
        scaleX: [0, 1.5, 0.8, 1.2, 0.95, 1],
        scaleY: [1, 0.7, 1.3, 0.9, 1],
        transition: {
          duration: 0.65,
          delay: 0.12,
          ease: 'easeOut',
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        scale: 0,
      },
      visible: {
        opacity: 1,
        scale: [0, 1.6, 0.75, 1.25, 0.9, 1],
        rotate: [0, -18, 10, -5, 0],
        transition: {
          duration: 0.7,
          delay: 0.1,
          ease: 'easeOut',
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        scaleX: 0,
        scaleY: 1,
      },
      visible: {
        opacity: 1,
        scaleX: [0, 1.4, 0.8, 1.15, 0.95, 1],
        scaleY: [1, 1.5, 0.7, 1.25, 0.95, 1],
        transition: {
          duration: 0.65,
          delay: 0.2,
          ease: 'easeOut',
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        scale: 0,
      },
      visible: {
        opacity: 1,
        scale: [0, 1.45, 0.8, 1.18, 0.94, 1],
        rotate: [0, 18, -10, 5, 0],
        transition: {
          duration: 0.65,
          delay: 0.4,
          ease: 'easeOut',
        },
      },
    },
  },

  'orbital-reveal': {
    id: 'orbital-reveal',
    name: 'Orbital Reveal',
    description: 'Elements orbit into position',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.1,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        x: 100,
        y: -100,
        scale: 0.5,
        rotate: -180,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.9,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        y: -200,
        x: -50,
        scale: 0.4,
        rotate: -90,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 1.0,
          delay: 0.1,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        x: 150,
        y: 50,
        scale: 0.3,
        rotate: 180,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.9,
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
        x: -100,
        y: 50,
        rotate: -60,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: {
          duration: 0.8,
          delay: 0.45,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        x: 120,
        y: -80,
        scale: 0.4,
        rotate: -150,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.9,
          delay: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        x: -100,
        scaleX: 0.2,
        rotate: -10,
      },
      visible: {
        opacity: 1,
        x: 0,
        scaleX: 1,
        rotate: 0,
        transition: {
          duration: 0.8,
          delay: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        y: 70,
        x: 50,
        rotate: 30,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        transition: {
          duration: 0.7,
          delay: 1.0,
          ease: [0.34, 1.56, 0.64, 1],
        },
      },
    },
  },

  'glitch-snap': {
    id: 'glitch-snap',
    name: 'Glitch Snap',
    description: 'Sharp digital glitch effect',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.04,
          delayChildren: 0.05,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        x: 0,
        y: 0,
      },
      visible: {
        opacity: [0, 1, 0.3, 1, 0.5, 1],
        x: [0, 20, -15, 8, -5, 0],
        y: [0, -12, 15, -8, 5, 0],
        transition: {
          duration: 0.25,
          times: [0, 0.15, 0.3, 0.5, 0.7, 1],
          ease: 'linear',
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: [0, 1, 0.3, 1, 0.5, 1],
        x: [0, -25, 35, -15, 10, 0],
        y: [0, 20, -25, 12, -8, 0],
        scale: [0.85, 1.15, 0.9, 1.08, 0.96, 1],
        transition: {
          duration: 0.32,
          delay: 0.05,
          times: [0, 0.15, 0.3, 0.5, 0.75, 1],
          ease: 'linear',
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        scale: 0.75,
      },
      visible: {
        opacity: [0, 1, 0.4, 1, 0.5, 1],
        x: [0, 35, -25, 18, -10, 0],
        scale: [0.75, 1.25, 0.85, 1.12, 0.94, 1],
        transition: {
          duration: 0.3,
          delay: 0.12,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: 'linear',
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: [0, 1, 0.5, 1, 0.6, 1],
        x: [0, -20, 25, -12, 8, 0],
        y: [0, 15, -18, 10, -5, 0],
        transition: {
          duration: 0.28,
          delay: 0.22,
          times: [0, 0.18, 0.36, 0.6, 0.8, 1],
          ease: 'linear',
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: [0, 1, 0.4, 1, 0.5, 1],
        x: [0, 22, -28, 15, -8, 0],
        y: [0, -15, 20, -10, 6, 0],
        scale: [0.9, 1.1, 0.92, 1.06, 0.97, 1],
        transition: {
          duration: 0.3,
          delay: 0.18,
          times: [0, 0.17, 0.34, 0.55, 0.75, 1],
          ease: 'linear',
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        scaleX: 0.5,
      },
      visible: {
        opacity: [0, 1, 0.5, 1, 0.7, 1],
        x: [0, -15, 20, -10, 5, 0],
        scaleX: [0.5, 1.2, 0.8, 1.1, 0.95, 1],
        transition: {
          duration: 0.28,
          delay: 0.35,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: 'linear',
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: [0, 1, 0.4, 1, 0.6, 1],
        x: [0, 18, -15, 10, -5, 0],
        y: [0, -12, 15, -8, 4, 0],
        transition: {
          duration: 0.26,
          delay: 0.65,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: 'linear',
        },
      },
    },
  },

  'silk-unfold': {
    id: 'silk-unfold',
    name: 'Silk Unfold',
    description: 'Flowing silk-like wave motion',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.15,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        scaleY: 0.3,
        scaleX: 0.95,
      },
      visible: {
        opacity: 1,
        scaleY: 1,
        scaleX: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 18,
          mass: 0.8,
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        scaleY: 0.2,
        scaleX: 0.9,
      },
      visible: {
        opacity: 1,
        scaleY: 1,
        scaleX: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 110,
          damping: 17,
          mass: 0.9,
          delay: 0.1,
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        scaleY: 0.4,
        scaleX: 0.92,
      },
      visible: {
        opacity: 1,
        scaleY: 1,
        scaleX: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 125,
          damping: 19,
          mass: 0.75,
          delay: 0.4,
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
        scaleY: 0.45,
        scaleX: 0.94,
      },
      visible: {
        opacity: 1,
        scaleY: 1,
        scaleX: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 117,
          damping: 18,
          mass: 0.83,
          delay: 0.55,
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        scaleY: 0.25,
        scaleX: 0.91,
      },
      visible: {
        opacity: 1,
        scaleY: 1,
        scaleX: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 113,
          damping: 17,
          mass: 0.88,
          delay: 0.5,
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        scaleX: 0.25,
        scaleY: 0.7,
      },
      visible: {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 18,
          mass: 0.8,
          delay: 0.7,
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        scaleY: 0.55,
        scaleX: 0.96,
      },
      visible: {
        opacity: 1,
        scaleY: 1,
        scaleX: 1,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 116,
          damping: 18,
          mass: 0.84,
          delay: 1.2,
        },
      },
    },
  },

  'crystal-shimmer': {
    id: 'crystal-shimmer',
    name: 'Crystal Shimmer',
    description: 'Sharp refractive light catching effect',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        scale: 0.4,
      },
      visible: {
        opacity: [0, 0.3, 1, 0.4, 0.8, 1, 0.6, 1],
        scale: [0.4, 0.7, 0.95, 1.08, 0.92, 1.02, 0.98, 1],
        x: [0, 8, -5, 3, -2, 1, -0.5, 0],
        y: [0, -6, 4, -3, 2, -1, 0.5, 0],
        transition: {
          duration: 0.9,
          times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
          ease: 'linear',
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        scale: 0.3,
      },
      visible: {
        opacity: [0, 0.2, 1, 0.35, 0.75, 1, 0.55, 1],
        scale: [0.3, 0.6, 0.9, 1.12, 0.88, 1.04, 0.97, 1],
        x: [0, 10, -7, 4, -2.5, 1.5, -0.7, 0],
        y: [0, -8, 5, -4, 2.5, -1.5, 0.7, 0],
        transition: {
          duration: 1.0,
          delay: 0.1,
          times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
          ease: 'linear',
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        scale: 0.35,
      },
      visible: {
        opacity: [0, 0.25, 1, 0.38, 0.82, 1, 0.58, 1],
        scale: [0.35, 0.65, 0.92, 1.1, 0.9, 1.03, 0.98, 1],
        x: [0, 9, -6, 3.5, -2, 1.2, -0.6, 0],
        y: [0, -7, 4.5, -3.5, 2, -1.2, 0.6, 0],
        transition: {
          duration: 0.95,
          delay: 0.4,
          times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
          ease: 'linear',
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
        scale: 0.45,
      },
      visible: {
        opacity: [0, 0.32, 1, 0.42, 0.85, 1, 0.62, 1],
        scale: [0.45, 0.72, 0.94, 1.06, 0.93, 1.02, 0.99, 1],
        x: [0, 7, -4.5, 2.5, -1.5, 0.8, -0.4, 0],
        y: [0, -5, 3.5, -2.5, 1.5, -0.8, 0.4, 0],
        transition: {
          duration: 0.85,
          delay: 0.6,
          times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
          ease: 'linear',
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        scale: 0.36,
      },
      visible: {
        opacity: [0, 0.26, 1, 0.38, 0.8, 1, 0.58, 1],
        scale: [0.36, 0.66, 0.92, 1.09, 0.90, 1.03, 0.98, 1],
        x: [0, 8.5, -5.8, 3.3, -1.9, 1.1, -0.55, 0],
        y: [0, -6.5, 4.8, -3.3, 1.9, -1.1, 0.55, 0],
        transition: {
          duration: 0.96,
          delay: 0.5,
          times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
          ease: 'linear',
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        scaleX: 0.28,
        scaleY: 0.85,
      },
      visible: {
        opacity: [0, 0.36, 1, 0.46, 0.88, 1, 0.66, 1],
        scaleX: [0.28, 0.64, 0.93, 1.08, 0.92, 1.025, 0.985, 1],
        scaleY: [0.85, 1.12, 0.94, 1.04, 0.96, 1.015, 0.995, 1],
        transition: {
          duration: 0.92,
          delay: 0.7,
          times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
          ease: 'linear',
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        scale: 0.42,
      },
      visible: {
        opacity: [0, 0.28, 1, 0.4, 0.78, 1, 0.6, 1],
        scale: [0.42, 0.68, 0.93, 1.07, 0.91, 1.015, 0.985, 1],
        x: [0, 6, -4, 2.2, -1.3, 0.7, -0.35, 0],
        y: [0, -4, 3, -2, 1.3, -0.7, 0.35, 0],
        transition: {
          duration: 0.8,
          delay: 1.2,
          times: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
          ease: 'linear',
        },
      },
    },
  },

  'velvet-cascade': {
    id: 'velvet-cascade',
    name: 'Velvet Cascade',
    description: 'Smooth cascading with perspective',
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.25,
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        y: -80,
        scale: 0.85,
        rotateX: -15,
        transformPerspective: 1000,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transformPerspective: 1000,
        transition: {
          duration: 1.1,
          ease: [0.16, 1.0, 0.3, 1.0],
        },
      },
    },
    headerImageVariants: {
      hidden: {
        opacity: 0,
        y: -120,
        scale: 0.75,
        rotateX: -25,
        transformPerspective: 1200,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transformPerspective: 1200,
        transition: {
          duration: 1.3,
          delay: 0.1,
          ease: [0.16, 1.0, 0.3, 1.0],
        },
      },
    },
    timerVariants: {
      hidden: {
        opacity: 0,
        y: -60,
        scale: 0.7,
        rotateX: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          duration: 1.2,
          delay: 0.35,
          ease: [0.16, 1.0, 0.3, 1.0],
        },
      },
    },
    questlineDescriptionVariants: {
      hidden: {
        opacity: 0,
        y: -50,
        rotateX: -12,
      },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 1.0,
          delay: 0.6,
          ease: [0.16, 1.0, 0.3, 1.0],
        },
      },
    },
    questlineBonusRewardsVariants: {
      hidden: {
        opacity: 0,
        y: -90,
        scale: 0.8,
        rotateX: -18,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          duration: 1.15,
          delay: 0.5,
          ease: [0.16, 1.0, 0.3, 1.0],
        },
      },
    },
    questlineProgressBarVariants: {
      hidden: {
        opacity: 0,
        y: -40,
        scaleX: 0.5,
        rotateX: -10,
      },
      visible: {
        opacity: 1,
        y: 0,
        scaleX: 1,
        rotateX: 0,
        transition: {
          duration: 1.1,
          delay: 0.7,
          ease: [0.16, 1.0, 0.3, 1.0],
        },
      },
    },
    questlineFooterVariants: {
      hidden: {
        opacity: 0,
        y: 45,
        scale: 0.88,
        rotateX: 18,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
          duration: 0.95,
          delay: 1.2,
          ease: [0.16, 1.0, 0.3, 1.0],
        },
      },
    },
  },

  none: {
    id: 'none',
    name: 'No Animation',
    description: 'No animation',
    containerVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    },
    itemVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    },
    headerImageVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    },
    timerVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    },
    questlineDescriptionVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    },
    questlineBonusRewardsVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    },
    questlineProgressBarVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    },
    questlineFooterVariants: {
      hidden: { opacity: 1 },
      visible: { opacity: 1, transition: { duration: 0 } },
    },
  },
};

/**
 * Get animation configuration by type
 */
export function getRevealAnimation(type: AnimationType): RevealAnimation {
  return revealAnimations[type];
}

/**
 * Get all available animation types for selection
 */
export function getAnimationOptions(): Array<{ value: AnimationType; label: string; description: string }> {
  return Object.values(revealAnimations).map((anim) => ({
    value: anim.id,
    label: anim.name,
    description: anim.description,
  }));
}