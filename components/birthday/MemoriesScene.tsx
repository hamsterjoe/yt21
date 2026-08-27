"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MEMORIES, type Memory } from "@/lib/memories";
import Polaroid from "./Polaroid";
import PhotoViewer from "./PhotoViewer";
import { Sticker } from "./Doodle";
import { useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Scene 4 — the gallery. One flat collage of taped polaroids (no
 * sub-sections): every photo enters with a soft rise as you scroll,
 * and tapping one opens it big.
 */
export default function MemoriesScene() {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Memory | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".reveal");
      if (reduced) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            delay: Number(el.dataset.d ?? 0),
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section ref={root} id="memories" className="section" aria-label="Photo gallery">
      <div className="wrap">
        <header className="mem-hero">
          <h2>Memories since young</h2>
          <p>Little YT and Little JY</p>
        </header>

        <ul className="collage">
          {MEMORIES.map((m, i) => (
            <li key={m.id} className="reveal" data-d={(i % 3) * 0.07}>
              <Polaroid memory={m} onOpen={() => setSelected(m)} />
            </li>
          ))}
        </ul>

        {/* scattered scrapbook doodles */}
        <Sticker kind="star" color="#F2C14E" size={26} top="6%" right="7%" rotate={12} float delay={0.4} />
        <Sticker kind="heart" color="#F2A0C0" size={22} top="28%" left="5%" rotate={-10} float delay={1} />
        <Sticker kind="sparkle" color="#F8C7DB" size={24} top="62%" right="4%" rotate={0} float delay={0.7} />
        <Sticker kind="squiggle" color="#DCCBF3" size={34} top="82%" left="6%" rotate={8} />
      </div>

      {selected && <PhotoViewer memory={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
