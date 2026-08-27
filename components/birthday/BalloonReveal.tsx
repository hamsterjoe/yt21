"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { mulberry32 } from "@/lib/prng";
import { confettiRain, sparkleBurst } from "@/lib/fx";
import { sfx } from "@/lib/sound";
import { CONFIG } from "@/lib/config";
import { useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(useGSAP);

const COLORS = [
  "#F8C7DB",
  "#F2A0C0",
  "#FFD6E8",
  "#F5C9E0",
  "#DCCBF3",
  "#E8DEF7",
  "#FBD9C4",
  "#CDEDDA",
  "#D7F0E4",
  "#CFE6F7",
  "#B9D9F2",
  "#FCEFC0",
];

interface BalloonCfg {
  left: number; // %
  size: number; // px
  color: string;
  front: boolean; // renders above the text layer
  rise: number; // vh travelled upward
  dur: number; // s
  delay: number; // s
  partX: number; // vw drifted sideways when the centre opens
  wobble: number; // degrees of idle sway
}

/** Word split into per-letter spans for staggered pop-in. */
function SplitWord({ text, className }: { text: string; className: string }) {
  return (
    <span className={`word ${className}`} role="text" aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className="rl" aria-hidden="true">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/**
 * Scene 2 — Balloon reveal. A whole sky of balloons rises from the
 * bottom (varied size/depth/speed/wobble), parts toward the edges,
 * then HAPPY / 21 / BIRTHDAY! pops in with confetti.
 *
 * No button: tapping anywhere continues. A tap mid-animation
 * fast-forwards the reveal instead of skipping the moment.
 */
export default function BalloonReveal({ onContinue }: { onContinue: () => void }) {
  const root = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  // Fixed seed → identical markup on server + client (no hydration mismatch).
  const balloons = useMemo<BalloonCfg[]>(() => {
    const rand = mulberry32(21);
    return Array.from({ length: 44 }, (_, i) => {
      const left = 1 + rand() * 94;
      return {
        left,
        size: 46 + rand() * 56,
        color: COLORS[i % COLORS.length],
        front: rand() < 0.4,
        rise: 30 + rand() * 62,
        dur: 2.8 + rand() * 2.0,
        delay: rand() * 1.1,
        partX: (left < 50 ? -1 : 1) * (30 + rand() * 16),
        wobble: 2 + rand() * 2.5,
      };
    });
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".balloon");

      if (reduced) {
        const tl = gsap.timeline();
        tlRef.current = tl;
        tl.set(els, { y: "-30vh", opacity: 0.45 })
          .fromTo(".rl-happy .rl", { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.04 })
          .fromTo(".w-21", { opacity: 0 }, { opacity: 1, duration: 0.25 })
          .fromTo(".rl-bday .rl", { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: 0.03 })
          .fromTo(".w-name", { opacity: 0 }, { opacity: 1, duration: 0.25 })
          .add(() => setReady(true));
        return;
      }

      // Idle sway — gentle rotation only (transform-based, cheap).
      els.forEach((el, i) => {
        gsap.to(el, {
          rotate: balloons[i].wobble,
          duration: 1.6 + (i % 5) * 0.35,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: balloons[i].delay,
        });
      });

      const tl = gsap.timeline({ delay: 0.15 });
      tlRef.current = tl;
      tl.to(els, {
        y: (i: number) => `-${balloons[i].rise}vh`,
        duration: (i: number) => balloons[i].dur,
        delay: (i: number) => balloons[i].delay,
        ease: "power1.out",
      })
        .addLabel("part", "+=0.35")
        .to(
          els,
          {
            x: (i: number) => `${balloons[i].partX}vw`,
            duration: 1.15,
            ease: "power2.inOut",
            stagger: { each: 0.014, from: "center" },
          },
          "part"
        )
        .fromTo(
          ".rl-happy .rl",
          { opacity: 0, scale: 0.4, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.42, ease: "back.out(1.7)", stagger: 0.055 },
          "part+=0.55"
        )
        .fromTo(".w-21", { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(2)" }, ">-0.05")
        .add(() => {
          const el = document.querySelector(".w-21");
          if (el) {
            const r = el.getBoundingClientRect();
            sparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 12);
          }
          sfx.sparkle();
        }, "<")
        .fromTo(
          ".rl-bday .rl",
          { opacity: 0, scale: 0.4, rotate: 8 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.42, ease: "back.out(1.7)", stagger: 0.045 },
          "+=0.08"
        )
        .add(() => {
          confettiRain(70);
          sfx.fanfare();
        }, "<")
        .fromTo(".w-name", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "+=0.15")
        .add(() => setReady(true), "+=0.1");
    },
    { scope: root, dependencies: [reduced] }
  );

  const continueNow = contextSafe(() => {
    sfx.pop();
    gsap.to(root.current, { opacity: 0, duration: 0.35, ease: "power1.out", onComplete: onContinue });
  });

  /** Tap anywhere: finish the reveal if it's mid-flight, otherwise continue. */
  const handleTap = () => {
    if (!ready) {
      tlRef.current?.progress(1);
      return;
    }
    continueNow();
  };

  return (
    <section
      ref={root}
      className="scene scene-balloons"
      aria-label="Happy 21st birthday — tap to continue"
      role="button"
      tabIndex={0}
      onPointerDown={handleTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleTap();
        }
      }}
      style={{ cursor: ready ? "pointer" : "default" }}
    >
      <div className="balloon-field" aria-hidden="true">
        {balloons.map((b, i) => (
          <div
            key={i}
            className="balloon"
            style={
              {
                "--x": `${b.left}%`,
                "--s": `${b.size}px`,
                "--c": b.color,
                zIndex: b.front ? 7 : 1,
              } as CSSProperties
            }
          >
            <div className="bbody" />
          </div>
        ))}
      </div>

      <div className="reveal-wrap">
        <SplitWord text="HAPPY" className="rl-happy w-happy" />
        <span className="word w-21">
          21<span className="w-21-sup">ST</span>
        </span>
        <SplitWord text="BIRTHDAY!" className="rl-bday w-bday" />
        <span className="w-name">dear {CONFIG.herName} ♡</span>
      </div>
    </section>
  );
}
