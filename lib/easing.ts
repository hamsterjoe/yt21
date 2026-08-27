/**
 * Motion tokens — shared easings + durations.
 *
 * The house style (see globals.css + every scene):
 *  - `ease-out` for anything entering/exiting — never ease-in on UI.
 *  - `pop` (slight overshoot) for celebratory scale-ins.
 *  - UI animations stay under ~300ms; big reveal moments may run longer.
 */
export const GSAP_EASE = {
  out: "power3.out",
  pop: "back.out(1.7)",
  popSoft: "back.out(1.3)",
  inOut: "power2.inOut",
  drawer: "power4.out",
} as const;

export const CSS_EASE = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  pop: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
} as const;

export const DUR = {
  press: 0.14,
  ui: 0.2,
  scene: 0.45,
} as const;
