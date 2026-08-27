"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { confettiBurst } from "@/lib/fx";
import { sfx } from "@/lib/sound";
import { useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(useGSAP);

/**
 * The unlock moment: the lock shakes, the shackle pops open, a glow
 * blooms, "SURPRISE UNLOCKED" lands letter by letter — then we hand
 * back to the experience so it can reveal the scrapbook.
 */
export default function UnlockOverlay({ onFinished }: { onFinished: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete: onFinished });

      if (reduced) {
        tl.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
          .fromTo(".unlock-title .rl", { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.02 })
          .to({}, { duration: 0.6 });
        return;
      }

      tl.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .to(
          ".lock",
          {
            keyframes: [{ rotate: -8 }, { rotate: 8 }, { rotate: -6 }, { rotate: 6 }, { rotate: 0 }],
            duration: 0.55,
            ease: "power1.inOut",
          },
          "+=0.15"
        )
        .add(() => sfx.unlock())
        .to(".lock-shackle", { rotate: -40, y: -6, duration: 0.5, ease: "back.out(1.8)" })
        .to(".lock-glow", { opacity: 1, scale: 1.15, duration: 0.6, ease: "power2.out" }, "<")
        .add(() => {
          const el = root.current?.querySelector(".lock");
          if (el) {
            const r = el.getBoundingClientRect();
            confettiBurst(r.left + r.width / 2, r.top + r.height / 2, 22);
          }
        }, "<")
        .fromTo(
          ".unlock-title .rl",
          { opacity: 0, y: 18, scale: 0.6 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)", stagger: 0.03 },
          "-=0.2"
        )
        .fromTo(".unlock-sub", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.1")
        .to({}, { duration: 1.15 }); // let the moment breathe before the reveal
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <div ref={root} className="unlock-overlay" role="status" aria-label="Surprise unlocked">
      <div className="lock" aria-hidden="true">
        <span className="lock-glow" />
        <span className="lock-shackle" />
        <span className="lock-body" />
      </div>
      <p className="unlock-title" aria-hidden="true">
        {[..."SURPRISE UNLOCKED"].map((ch, i) => (
          <span key={i} className="rl">
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </p>
      <p className="unlock-sub">TADA</p>
    </div>
  );
}
