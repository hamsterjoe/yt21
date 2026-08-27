"use client";

import { useState } from "react";
import { toggleSound } from "@/lib/sound";

/**
 * Sound toggle — appears after the gift is opened. Off by default;
 * sound is never required to understand anything.
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false);

  return (
    <button
      type="button"
      className="sound-btn"
      onClick={() => setOn(toggleSound())}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      aria-pressed={on}
    >
      <span aria-hidden="true">{on ? "🔊" : "🔇"}</span>
    </button>
  );
}
