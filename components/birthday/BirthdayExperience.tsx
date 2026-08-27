"use client";

import { useCallback, useEffect, useState } from "react";
import OpeningScene from "./OpeningScene";
import BalloonReveal from "./BalloonReveal";
import CandleGame from "./CandleGame";
import MemoriesScene from "./MemoriesScene";
import LetterScene from "./LetterScene";
import FinalScene from "./FinalScene";
import ScrapbookNav from "./ScrapbookNav";
import Cursor from "./Cursor";
import SoundToggle from "./SoundToggle";
import { initAudio } from "@/lib/sound";
import { tapSparks } from "@/lib/fx";

/**
 * BirthdayExperience — the scene state machine.
 *
 *   opening → balloons → cake → main (memories + letter + finale)
 *
 * The candle game is the gatekeeper: `main` only renders once all
 * 21 candles are blown out. Unlock state persists in sessionStorage,
 * so revisiting within the same session skips straight to the scrapbook.
 * The 🎂 Replay nav button re-opens the cake as an overlay without
 * re-locking anything.
 */

type Phase = "opening" | "balloons" | "cake" | "main";

const STORAGE_KEY = "bday21-unlocked";

export default function BirthdayExperience() {
  const [phase, setPhase] = useState<Phase>("opening");
  const [replay, setReplay] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  // Returning within the same session? Skip straight to the scrapbook.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setPhase("main");
        setToast("Happy Birthday ✨");
      }
    } catch {
      /* private browsing — play through normally */
    }
  }, []);

  // Lock page scroll while a full-screen scene (or replay overlay) is up.
  useEffect(() => {
    const locked = phase !== "main" || replay;
    document.documentElement.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase, replay]);

  // Toasts dismiss themselves.
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Tiny sparkles follow taps/clicks once the experience has begun.
  useEffect(() => {
    if (!started) return;
    let last = 0;
    const onTap = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 140) return;
      last = now;
      tapSparks(e.clientX, e.clientY);
    };
    window.addEventListener("pointerdown", onTap, { passive: true });
    return () => window.removeEventListener("pointerdown", onTap);
  }, [started]);

  const handleFirstGesture = useCallback(() => {
    initAudio(); // creating/resuming the AudioContext needs a user gesture
    setStarted(true);
  }, []);

  const handleUnlocked = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("main");
    setToast("🔓 Surprise unlocked");
  }, []);

  return (
    <>
      <div id="fx-layer" className="fx-layer" aria-hidden="true" />
      <Cursor />

      {phase === "opening" && (
        <OpeningScene onOpen={() => setPhase("balloons")} onFirstGesture={handleFirstGesture} />
      )}

      {phase === "balloons" && <BalloonReveal onContinue={() => setPhase("cake")} />}

      {phase === "cake" && <CandleGame onUnlock={handleUnlocked} />}

      {phase === "main" && (
        <>
          <main className="main-wrap">
            <MemoriesScene />
            <LetterScene />
            <FinalScene />
          </main>
          <ScrapbookNav onReplay={() => setReplay(true)} />
        </>
      )}

      {replay && <CandleGame replay onClose={() => setReplay(false)} />}

      {started && <SoundToggle />}
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
      <noscript>
        <p style={{ padding: 24, textAlign: "center" }}>
          This birthday surprise needs JavaScript 💌
        </p>
      </noscript>
    </>
  );
}
