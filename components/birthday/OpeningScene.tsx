"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { confettiBurst, sparkleBurst } from "@/lib/fx";
import { sfx } from "@/lib/sound";
import { useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(useGSAP);

/**
 * Scene 1 — Opening. Minimal: "Hey... I made something for you."
 * A gently idling gift; tapping it triggers the first big sequence
 * (shake → lid flies off → confetti) and hands over to the balloons.
 */
export default function OpeningScene({
  onOpen,
  onFirstGesture,
}: {
  onOpen: () => void;
  onFirstGesture: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const lid = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  const reduced = useReducedMotion();

  const { contextSafe } = useGSAP(() => {}, { scope: root });

  const handleOpen = contextSafe(() => {
    if (busy) return;
    setBusy(true);
    onFirstGesture();

    const gift = btn.current;
    if (!gift) {
      onOpen();
      return;
    }
    gift.style.animation = "none";
    sfx.sparkle();

    if (reduced) {
      gsap.to(root.current, { opacity: 0, duration: 0.25, onComplete: onOpen });
      return;
    }

    const r = gift.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height * 0.35;

    const tl = gsap.timeline({ onComplete: onOpen });
    tl.to(gift, {
      keyframes: [
        { rotate: -6, scale: 1.04 },
        { rotate: 5, scale: 1.08 },
        { rotate: 0, scale: 1.12 },
      ],
      duration: 0.42,
      ease: "power2.inOut",
    })
      .add(() => {
        sfx.pop();
        sparkleBurst(cx, cy, 14);
        confettiBurst(cx, cy, 26);
      })
      .to(lid.current, { y: -150, rotate: -26, opacity: 0, duration: 0.55, ease: "back.out(1.6)" }, "<")
      .to(gift, { scale: 1, duration: 0.3, ease: "power3.out" }, "<")
      .to(root.current, { opacity: 0, duration: 0.32, ease: "power1.out" }, "+=0.3");
  });

  return (
    <section ref={root} className="scene scene-opening" aria-label="A gift for you">
      <p className="opening-hey">Hello little sister</p>
      <p className="opening-made">For Tang Yi Theng</p>
      <button
        ref={btn}
        type="button"
        className="gift"
        onClick={handleOpen}
        aria-label="Tap to open your gift"
      >
        <span className="gift-glow" aria-hidden="true" />
        <span className="gift-box" aria-hidden="true" />
        <span className="gift-ribbon" aria-hidden="true" />
        <span ref={lid} className="gift-lid" aria-hidden="true">
          <span className="gift-bow" />
        </span>
      </button>
      <p className="tap-hint" aria-hidden="true">
        TAP TO OPEN
      </p>
    </section>
  );
}
