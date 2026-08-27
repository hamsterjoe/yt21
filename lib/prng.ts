/**
 * Deterministic pseudo-random number generator.
 *
 * Balloon layouts are generated with a fixed seed so the server and
 * client render identical markup (no React hydration mismatch), while
 * still looking organically random.
 */
export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
