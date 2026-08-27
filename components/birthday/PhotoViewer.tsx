"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Memory } from "@/lib/memories";
import { Art } from "./Art";
import { useReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(useGSAP);

/**
 * Tap-to-open photo viewer. The polaroid straightens out and scales up
 * over a dimmed, blurred backdrop. Close with the ✕, the backdrop, or
 * Escape; focus moves into the dialog and back out again.
 * Caption and note are both optional.
 */
export default function PhotoViewer({ memory, onClose }: { memory: Memory; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const label = memory.caption ?? "a favourite memory";

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(".viewer-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power1.out" });
      gsap.fromTo(
        ".viewer-figure",
        { opacity: 0, scale: 0.86, rotate: memory.rotation },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.38, ease: "back.out(1.5)" }
      );
    },
    { scope: root, dependencies: [reduced, memory] }
  );

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div ref={root} className="viewer">
      <div className="viewer-backdrop" onClick={onClose} aria-hidden="true" />
      <figure className="viewer-figure" role="dialog" aria-modal="true" aria-label={`Photo: ${label}`}>
        <button ref={closeRef} type="button" className="viewer-close" onClick={onClose} aria-label="Close photo">
          ✕
        </button>
        <div className="polaroid">
          <span className="ph">
            {memory.src ? (
              <Image src={memory.src} alt={label} width={900} height={675} />
            ) : (
              <Art kind={memory.art} />
            )}
          </span>
          {memory.caption && <figcaption className="cap">{memory.caption}</figcaption>}
          <p className="viewer-note">{memory.note ?? "one of my favourites ♡"}</p>
        </div>
      </figure>
    </div>
  );
}
