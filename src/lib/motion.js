export const MOTION_EASE = [0.22, 1, 0.36, 1];

export const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: MOTION_EASE,
    },
  }),
};

export const revealScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      delay,
      ease: MOTION_EASE,
    },
  }),
};

export const hoverLift = {
  y: -6,
  scale: 1.015,
  transition: {
    duration: 0.25,
    ease: MOTION_EASE,
  },
};
