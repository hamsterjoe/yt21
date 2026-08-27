"use client";

/**
 * Scrapbook-style floating nav — appears after the surprise is unlocked.
 * No conventional navbar: just a washi-tape pill with the three stops
 * plus a 🎂 replay of the candle game (which never re-locks anything).
 */

const LINKS = [
  { id: "memories", emoji: "📸", label: "Memories" },
  { id: "letter", emoji: "💌", label: "Letter" },
  { id: "finale", emoji: "❤️", label: "Finale" },
] as const;

export default function ScrapbookNav({ onReplay }: { onReplay: () => void }) {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="tabnav" aria-label="Birthday sections">
      {LINKS.map((l) => (
        <button key={l.id} type="button" onClick={() => go(l.id)}>
          <span aria-hidden="true">{l.emoji}</span> {l.label}
        </button>
      ))}
      <button type="button" onClick={onReplay} aria-label="Replay the candle game">
        <span aria-hidden="true">🎂</span> Replay
      </button>
    </nav>
  );
}
