"use client";

/**
 * Sound design — tiny WebAudio-synthesised effects, no audio files needed.
 *
 * - Nothing plays until the user explicitly enables sound via the toggle.
 * - The AudioContext is created/resumed inside the gift-tap gesture
 *   (`initAudio`), which satisfies browser autoplay policies.
 * - If you later prefer real audio files, drop them in public/sounds/
 *   and re-implement `sfx` with <audio> elements — the call sites stay.
 */

let ctx: AudioContext | null = null;
let enabled = false;

/** Create/resume the AudioContext. Call from a user gesture. */
export function initAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) ctx = new AC();
    } catch {
      ctx = null;
    }
  }
  if (ctx?.state === "suspended") void ctx.resume();
}

/** Toggle sound on/off. Returns the new state. */
export function toggleSound(): boolean {
  enabled = !enabled;
  if (enabled) initAudio();
  return enabled;
}

export function soundEnabled(): boolean {
  return enabled;
}

function tone(
  from: number,
  to: number,
  delay: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.16
) {
  if (!enabled || !ctx) return;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t0);
  osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t0 + duration);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export const sfx = {
  /** Short pop — candle blow-outs, small taps. */
  pop() {
    tone(520, 140, 0, 0.09, "sine", 0.22);
  },
  /** Two-note shimmer — sparkles, envelope opening. */
  sparkle() {
    tone(880, 1320, 0, 0.08, "sine", 0.14);
    tone(1320, 1760, 0.07, 0.1, "sine", 0.1);
  },
  /** Little rising chime — lock opening. */
  unlock() {
    tone(392, 523.25, 0, 0.12, "sine", 0.16);
    tone(523.25, 783.99, 0.1, 0.2, "sine", 0.14);
  },
  /** Four-note fanfare — 21/21 and the big reveal. */
  fanfare() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, f, i * 0.09, 0.18, "triangle", 0.14));
  },
};
