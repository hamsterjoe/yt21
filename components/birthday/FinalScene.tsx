"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONFIG } from "@/lib/config";
import { Art } from "./Art";
import { Sticker } from "./Doodle";
import { useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Scene 6 — the finale. Everything simplifies to the 3D figurine and
 * one message: warm and sincere rather than flashy.
 *
 * ✏️  THE FIGURINE: drop your generated model at  public/yt-fig.png
 *     (transparent PNG, roughly square or portrait works best).
 *     It floats gently like a little collectible, with a soft pedestal
 *     shadow that breathes in counter-phase. Reduced-motion users get
 *     it static. Until the file exists, a placeholder polaroid shows.
 */
export default function FinalScene() {
  const root = useRef<HTMLElement>(null);
  const [figOk, setFigOk] = useState(true);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".fin-el");
      if (reduced) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        els,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section ref={root} id="finale" className="section" aria-label="Happy birthday">
      {/* Figurine animation lives here so this file stays a drop-in
          replacement — move it into globals.css if you prefer. */}
      <style>{`
        .fin-fig-wrap {
          position: relative;
          width: fit-content;
          margin: 0 auto;
        }
        .fin-fig {
          display: block;
          width: min(58vw, 260px);
          height: auto;
          transform-origin: 50% 100%;
          filter: drop-shadow(0 18px 24px rgba(176, 58, 102, 0.22));
          animation: figFloat 4.2s ease-in-out infinite alternate;
        }
        .fin-fig-shadow {
          width: 62%;
          height: 16px;
          margin: 4px auto 0;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(176, 58, 102, 0.22), transparent 70%);
          animation: figShadow 4.2s ease-in-out infinite alternate;
        }
        @keyframes figFloat {
          from { transform: translateY(0) rotate(-1.6deg); }
          to { transform: translateY(-12px) rotate(1.6deg); }
        }
        @keyframes figShadow {
          from { transform: scaleX(1); opacity: 0.9; }
          to { transform: scaleX(0.82); opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fin-fig, .fin-fig-shadow { animation: none; }
        }
      `}</style>

      <div className="wrap">
        <div className="finale">
          <Sticker kind="heart" color="#F2A0C0" size={24} top="12%" left="10%" float />
          <Sticker kind="star" color="#F2C14E" size={22} top="18%" right="12%" rotate={14} float delay={0.6} />
          <Sticker kind="sparkle" color="#DCCBF3" size={26} bottom="18%" left="14%" float delay={1.1} />
          <Sticker kind="heart" color="#F8C7DB" size={18} bottom="26%" right="16%" rotate={-8} float delay={0.3} />

          <div className="fin-el">
            {figOk ? (
              <div className="fin-fig-wrap">
                {/* plain <img>: transparent PNG of unknown aspect — no next/image box needed */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/yt-fig.png"
                  alt={`3D cartoon figurine of ${CONFIG.herName}`}
                  className="fin-fig"
                  onError={() => setFigOk(false)}
                />
                <div className="fin-fig-shadow" aria-hidden="true" />
              </div>
            ) : (
              /* shown only until public/yt-fig.png exists */
              <div className="polaroid fin-frame">
                <span className="ph">
                  <Art kind="heart" />
                </span>
                <span className="cap">my favourite person ♡</span>
              </div>
            )}
          </div>

          <h2 className="fin-el fin-title">HAPPY 21ST BIRTHDAY,</h2>
          <p className="fin-el fin-name">{CONFIG.herName} ❤️</p>
          <p className="fin-el fin-line">{CONFIG.finaleLine}</p>
        </div>
      </div>
    </section>
  );
}
