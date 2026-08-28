"use client";

let ctx: AudioContext | null = null;
let enabled = true;

let music: HTMLAudioElement | null = null;
let musicAvailable = true;
let fadeTimer: number | null = null;
let visibilityWired = false;

const MUSIC_URL = "/birthday-song.mp3";
const MUSIC_VOLUME = 0.42;

export function initAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    try {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) ctx = new AC();
    } catch {
      ctx = null;
    }
  }
  if (ctx?.state === "suspended") void ctx.resume();
}

/** Lazily create the single music element (persists across scene changes). */
function getMusic(): HTMLAudioElement | null {
  if (!musicAvailable || typeof window === "undefined") return null;
  if (!music) {
    music = new Audio(MUSIC_URL);
    music.loop = true;
    music.preload = "auto";
    music.volume = 0;
    music.addEventListener("error", () => {
      musicAvailable = false;
      music = null;
    });
  }
  if (!visibilityWired) {
    visibilityWired = true;
    // Politeness: duck out when the tab is hidden, come back if sound is on.
    document.addEventListener("visibilitychange", () => {
      if (!music) return;
      if (document.hidden) music.pause();
      else if (enabled) void music.play().catch(() => {});
    });
  }
  return music;
}

function fadeMusicTo(target: number, ms = 1200) {
  const m = getMusic();
  if (!m) return;
  if (fadeTimer !== null) window.clearInterval(fadeTimer);
  const steps = 24;
  const start = m.volume;
  let i = 0;
  fadeTimer = window.setInterval(() => {
    i += 1;
    m.volume = Math.min(1, Math.max(0, start + (target - start) * (i / steps)));
    if (i >= steps) {
      if (fadeTimer !== null) window.clearInterval(fadeTimer);
      fadeTimer = null;
      if (target === 0) m.pause();
    }
  }, ms / steps);
}

function startMusic() {
  const m = getMusic();
  if (!m) return;
  void m
    .play()
    .then(() => fadeMusicTo(MUSIC_VOLUME))
    .catch(() => {
    });
}

function pauseMusic() {
  fadeMusicTo(0, 400);
}

export function toggleSound(): boolean {
  enabled = !enabled;
  if (enabled) {
    initAudio();
    startMusic();
  } else {
    pauseMusic();
  }
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
