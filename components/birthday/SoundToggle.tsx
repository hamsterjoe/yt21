"use client";

import { useState } from "react";
import { soundEnabled, toggleSound } from "@/lib/sound";

/**
 * Sound toggle — appears after the first tap. The soundtrack starts
 * automatically on that tap, so this simply mutes/unmutes everything
 * (music + effects) from then on.
 */
export default function SoundToggle() {
  const [on, setOn] = useState(() => soundEnabled());

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
