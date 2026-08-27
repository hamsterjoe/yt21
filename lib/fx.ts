"use client";

/**
 * Particle FX — confetti bursts/rain, sparkles, candle smoke.
 *
 * Rendered into the fixed #fx-layer with the Web Animations API:
 * transform/opacity only (GPU-friendly), and every node removes
 * itself when its animation finishes. Nothing here needs cleanup
 * from React.
 */

const PASTELS = ["#F8C7DB", "#F2A0C0", "#DCCBF3", "#FBD9C4", "#CDEDDA", "#CFE6F7", "#FCEFC0", "#E87DA9"];
const SPARK_COLORS = ["#FFD76A", "#F2A0C0", "#FFFFFF", "#F8C7DB"];

function layer(): HTMLElement | null {
  return document.getElementById("fx-layer");
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function prefersReduced(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Explosion of pastel confetti from a point (e.g. the opened gift). */
export function confettiBurst(x: number, y: number, n = 24) {
  const host = layer();
  if (!host) return;
  if (prefersReduced()) n = Math.min(n, 6);

  for (let i = 0; i < n; i++) {
    const d = document.createElement("div");
    d.className = "confetti";
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    d.style.background = pick(PASTELS);
    host.appendChild(d);

    const ang = Math.random() * Math.PI * 2;
    const v = 90 + Math.random() * 160;
    const dx = Math.cos(ang) * v;
    const dy = Math.sin(ang) * v - 90;
    const r1 = Math.random() * 360;
    const r2 = r1 + 360 + Math.random() * 360;

    d.animate(
      [
        { transform: "translate(0px, 0px) rotate(0deg)", opacity: 1 },
        { transform: `translate(${dx * 0.72}px, ${dy * 0.72}px) rotate(${r1}deg)`, opacity: 1, offset: 0.42 },
        { transform: `translate(${dx}px, ${dy + 280}px) rotate(${r2}deg)`, opacity: 0 },
      ],
      { duration: 950 + Math.random() * 750, easing: "cubic-bezier(0.17, 0.67, 0.35, 1)" }
    ).onfinish = () => d.remove();
  }
}

/** Full-screen celebration rain. */
export function confettiRain(n = 60) {
  const host = layer();
  if (!host) return;
  if (prefersReduced()) n = 8;

  const w = window.innerWidth;
  const h = window.innerHeight;

  for (let i = 0; i < n; i++) {
    const d = document.createElement("div");
    d.className = "confetti";
    d.style.left = `${Math.random() * w}px`;
    d.style.top = "-20px";
    d.style.background = pick(PASTELS);
    host.appendChild(d);

    const sway = 18 + Math.random() * 42;
    d.animate(
      [
        { transform: "translate(0px, -20px) rotate(0deg)", opacity: 1 },
        { transform: `translate(${sway}px, ${h * 0.45}px) rotate(240deg)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${-sway * 0.6}px, ${h + 40}px) rotate(540deg)`, opacity: 0.9 },
      ],
      { duration: 2300 + Math.random() * 1400, delay: Math.random() * 500, easing: "cubic-bezier(0.3, 0.4, 0.6, 1)" }
    ).onfinish = () => d.remove();
  }
}

/** Little smoke puffs when a candle goes out. */
export function smokePuff(x: number, y: number) {
  const host = layer();
  if (!host) return;

  for (let i = 0; i < 3; i++) {
    const d = document.createElement("div");
    d.className = "smoke";
    const s = 12 + Math.random() * 12;
    d.style.width = `${s}px`;
    d.style.height = `${s}px`;
    d.style.left = `${x - s / 2}px`;
    d.style.top = `${y - s / 2}px`;
    host.appendChild(d);

    const dx = (Math.random() - 0.5) * 22;
    d.animate(
      [
        { transform: "translate(0px, 0px) scale(0.5)", opacity: 0.75 },
        { transform: `translate(${dx}px, ${-26 - Math.random() * 16}px) scale(1.25)`, opacity: 0 },
      ],
      { duration: 520 + Math.random() * 220, delay: i * 55, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    ).onfinish = () => d.remove();
  }
}

/** Tiny sparkle burst — stars/dots flying outward from a point. */
export function sparkleBurst(x: number, y: number, n = 8) {
  const host = layer();
  if (!host) return;
  if (prefersReduced()) n = Math.min(n, 3);

  for (let i = 0; i < n; i++) {
    const d = document.createElement("div");
    d.className = "spark";
    const s = 3 + Math.random() * 4;
    d.style.width = `${s}px`;
    d.style.height = `${s}px`;
    d.style.borderRadius = "50%";
    d.style.background = pick(SPARK_COLORS);
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    host.appendChild(d);

    const ang = (i / n) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 26 + Math.random() * 46;
    d.animate(
      [
        { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
        { transform: `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px) scale(0.2)`, opacity: 0 },
      ],
      { duration: 420 + Math.random() * 260, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }
    ).onfinish = () => d.remove();
  }
}

/** Ambient sparks that follow taps/clicks once the experience has started. */
export function tapSparks(x: number, y: number) {
  sparkleBurst(x, y, 4);
}
