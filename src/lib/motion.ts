import type { Transition, Variants } from "framer-motion";

/** Evita re-disparar animaciones al volver a entrar en viewport. */
export const viewportOnce = { once: true, amount: 0.25 as const };

export const easeOut: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};
