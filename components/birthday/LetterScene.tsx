"use client";

import { useRef, useState } from "react";
import { CONFIG } from "@/lib/config";
import { sfx } from "@/lib/sound";
import { useReducedMotion } from "@/lib/hooks";
import { Sticker } from "./Doodle";

/**
 * Scene 5 — the personal letter. Tapping the envelope opens it (flap
 * rotates, letter slides out, paragraphs fade in one by one); tapping
 * it again folds everything away. Fully reversible, like a real card.
 */
export default function LetterScene() {
  const [open, setOpen] = useState(false);       // drives .open / .on classes
  const [mounted, setMounted] = useState(false); // keeps the paper in the DOM during fade-out
  const envRef = useRef<HTMLButtonElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const openLetter = () => {
    sfx.sparkle();
    setMounted(true);
    // Apply .on one frame after mount so the entrance transitions actually run.
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    window.setTimeout(
      () => {
        paperRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      },
      reduced ? 150 : 850
    );
  };

  const closeLetter = () => {
    sfx.pop();
    setOpen(false);
    envRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    // Unmount the paper only after the fade-out finishes.
    window.setTimeout(() => setMounted(false), reduced ? 0 : 320);
  };

  const handleToggle = () => {
    if (open) closeLetter();
    else openLetter();
  };

  return (
    <section id="letter" className="section" aria-label="A letter for you">
      <div className="wrap">
        <p className="letter-leadin">one more thing...</p>

        <button
          ref={envRef}
          type="button"
          className={`envelope${open ? " open" : ""}`}
          onClick={handleToggle}
          aria-label={open ? "Fold the letter away" : "Open the letter"}
          aria-expanded={open}
        >
          <span className="env-back" aria-hidden="true" />
          <span className="env-letter-mini" aria-hidden="true">
            <span>for you ♡</span>
          </span>
          <span className="env-front" aria-hidden="true" />
          <span className="env-flap" aria-hidden="true" />
          <span className="env-seal" aria-hidden="true">
            ♡
          </span>
        </button>
        <p className="env-hint" aria-hidden="true">
          {open ? "\u00A0" : "TAP TO OPEN"}
        </p>

        <div ref={paperRef} className="letter-paper" hidden={!mounted}>
          <Sticker kind="heart" color="#F8C7DB" size={20} top="14px" right="18px" rotate={10} />
          {CONFIG.letter.map((paragraph, i) => (
            <p
              key={i}
              className={`lp-p${open ? " on" : ""}`}
              style={{ transitionDelay: open && !reduced ? `${i * 130}ms` : "0ms" }}
            >
              {paragraph}
            </p>
          ))}
          <p
            className={`lp-p lp-sign${open ? " on" : ""}`}
            style={{ transitionDelay: open && !reduced ? `${CONFIG.letter.length * 130}ms` : "0ms" }}
          >
            {CONFIG.letterSignoff}
          </p>
        </div>
      </div>
    </section>
  );
}
