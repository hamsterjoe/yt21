"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Memory } from "@/lib/memories";
import { Art } from "./Art";

/**
 * A single scrapbook polaroid — white frame, washi tape, handwritten
 * caption, resting tilt from the memory data. Desktop hover lifts and
 * straightens it (gated behind hover-capable pointers).
 */
export default function Polaroid({ memory, onOpen }: { memory: Memory; onOpen: () => void }) {
  return (
    <button
      type="button"
      className="polaroid"
      style={{ "--r": `${memory.rotation}deg`, "--tr": `${memory.tapeRotation ?? -3}deg` } as CSSProperties}
      onClick={onOpen}
      aria-label={`Open photo: ${memory.caption}`}
    >
      <span className="tape" aria-hidden="true" />
      <span className="ph">
        {memory.src ? (
          <Image
            src={memory.src}
            alt={memory.caption}
            width={600}
            height={450}
            sizes="(max-width: 560px) 88vw, 300px"
          />
        ) : (
          <Art kind={memory.art} />
        )}
      </span>
      <span className="cap">{memory.caption}</span>
      <span className="pid" aria-hidden="true">
        {memory.id}
      </span>
    </button>
  );
}
