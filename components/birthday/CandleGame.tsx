"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import UnlockOverlay from "./UnlockOverlay";
import { confettiRain, smokePuff, sparkleBurst } from "@/lib/fx";
import { sfx } from "@/lib/sound";
import { useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(useGSAP);

const TOTAL = 21;
const TIERS = [7, 7, 7]; // candles per tier, top → bottom

export default function CandleGame({
  replay = false,
  onUnlock,
  onClose,
}: {
  replay?: boolean;
  onUnlock?: () => void;
  onClose?: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const candleRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [blown, setBlown] = useState<boolean[]>(() => Array(TOTAL).fill(false));
  const [stage, setStage] = useState<"play" | "celebrate" | "unlock">("play");
  const reduced = useReducedMotion();

  const count = blown.filter(Boolean).length;

  const { contextSafe } = useGSAP(
    () => {
      if (!reduced) {
        gsap.fromTo(
          cakeRef.current,
          { y: 46, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" }
        );
      }
    },
    { scope: root, dependencies: [reduced] }
  );

  const exit = contextSafe((cb?: () => void) => {
    gsap.to(root.current, { opacity: 0, duration: 0.3, ease: "power1.out", onComplete: cb });
  });

  const blow = (i: number) => {
    if (stage !== "play" || blown[i]) return;
    const next = [...blown];
    next[i] = true;
    setBlown(next);
    sfx.pop();

    const flame = candleRefs.current[i]?.querySelector(".flame");
    if (flame) {
      const r = flame.getBoundingClientRect();
      smokePuff(r.left + r.width / 2, r.top + 4);
      sparkleBurst(r.left + r.width / 2, r.top + 6, 5);
    }

    if (next.every(Boolean)) celebrate();
  };

  const celebrate = contextSafe(() => {
    setStage("celebrate");
    sfx.fanfare();

    if (!reduced) {
      gsap
        .timeline()
        .to(cakeRef.current, { scale: 1.06, y: -10, duration: 0.26, ease: "power2.out" })
        .to(cakeRef.current, { scale: 1, y: 0, duration: 0.4, ease: "back.out(2.2)" });
      confettiRain(70);
    }

    window.setTimeout(
      () => {
        if (replay) exit(onClose);
        else setStage("unlock");
      },
      reduced ? 500 : 1500
    );
  });

  return (
    <section ref={root} className="scene scene-cake" aria-label="Make a wish — blow out the 21 candles">
      <h2 className="cake-title">
        {stage === "play" ? (replay ? "One more wish? ✨" : "make a wish") : "WISH MADE ✨"}
      </h2>
      <p className="cake-sub">
        {stage === "play"
          ? replay
            ? "Blow the candles again!"
            : "Blow out your 21 candles"
          : replay
            ? "still magical, every time ♡"
            : "Open Sesame!"}
      </p>

      <div ref={cakeRef} className="cake" role="group" aria-label="Birthday cake with 21 candles">
        {TIERS.map((n, t) => (
          <div key={t} className={`tier t${3 - t}`}>
            <div className="candle-row">
              {Array.from({ length: n }, (_, k) => {
                const i = t * 7 + k;
                return (
                  <button
                    key={i}
                    ref={(el) => {
                      candleRefs.current[i] = el;
                    }}
                    type="button"
                    className={`candle${blown[i] ? " out" : ""}`}
                    onClick={() => blow(i)}
                    aria-label={blown[i] ? `Candle ${i + 1} of 21, out` : `Blow out candle ${i + 1} of 21`}
                  >
                    <span className="flame" aria-hidden="true" />
                    <span className="wick" aria-hidden="true" />
                    <span className="stick" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <div className="tier-body" aria-hidden="true" />
          </div>
        ))}
        <div className="plate" aria-hidden="true" />
      </div>

      <div className="pips" aria-hidden="true">
        {blown.map((b, i) => (
          <svg key={i} viewBox="0 0 24 24" className={`pip${b ? " on" : ""}`}>
            <path
              d="M12 21 C5 16 2 12.6 2 9 A5 5 0 0 1 12 6.4 A5 5 0 0 1 22 9 C22 12.6 19 16 12 21 Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>
      <p className="counter" aria-live="polite">
        {count} / {TOTAL}
        {count === TOTAL ? " 🎉" : ""}
      </p>

      {stage === "unlock" && <UnlockOverlay onFinished={() => exit(onUnlock)} />}
    </section>
  );
}
