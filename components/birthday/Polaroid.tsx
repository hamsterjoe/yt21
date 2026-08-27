"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Memory } from "@/lib/memories";
import { Art } from "./Art";

/**
 * A single scrapbook polaroid — white frame, washi tape, resting tilt
 * from the memory data. Captions are optional: with none, the polaroid
 * is just the photo. Desktop hover lifts and straightens it (gated
 * behind hover-capable pointers).
 */
export default function Polaroid({ memory, onOpen }: { memory: Memory; onOpen: () => void }) {
  const label = memory.caption ?? "a favourite memory";

  return (
    <button
      type="button"
      className="polaroid"
      style={{ "--r": `${memory.rotation}deg`, "--tr": `${memory.tapeRotation ?? -3}deg` } as CSSProperties}
      onClick={onOpen}
      aria-label={`Open photo: ${label}`}
    >
      <span className="tape" aria-hidden="true" />
      <span className="ph">
        {memory.src ? (
          <Image
            src={memory.src}
            alt={label}
            width={600}
            height={450}
            sizes="(max-width: 560px) 88vw, 300px"
          />
        ) : (
          <Art kind={memory.art} />
        )}
      </span>
      {memory.caption && <span className="cap">{memory.caption}</span>}
      <span className="pid" aria-hidden="true">
        {memory.id}
      </span>
    </button>
  );
}
