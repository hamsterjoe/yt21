# 🎂 Happy 21st — Interactive Birthday Experience

A small, heavily animated, mobile-first birthday website:

```text
🎁 opening gift → 🎈 balloon reveal → 🕯️ 21-candle wish game
      → 🔓 unlock → 📸 photo scrapbook → 💌 letter → ❤️ finale
```

Built with **Next.js (App Router) · React · TypeScript · Tailwind CSS · GSAP**.
No backend, no database — a purely client-side experience, deployable to Vercel as-is.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

Push this folder to a Git repo, then **Vercel → Add New → Project → Import** → Deploy.
No extra configuration needed.

## ✏️ Personalise it — the only 3 places you need to touch

| What                                   | Where                                    |
| -------------------------------------- | ---------------------------------------- |
| Her name, the letter, the closing line | `lib/config.ts`                          |
| Your 2 fonts (main + complementary)    | `public/fonts/` (see its README)         |
| Photo list, captions, tilt, grouping   | `lib/memories.ts`                        |
| The actual photos                      | `public/photos/`                         |

While a memory's `src` is `null`, a hand-drawn pastel placeholder shows, so the
site works end-to-end before you add a single photo. When you're ready, drop
files into `public/photos/` and set e.g. `src: "/photos/photo01.webp"`.
See **ASSETS.md** for the full asset inventory (and what to regenerate if you
want richer illustrations than the built-in SVG/CSS ones).

## Project structure

```text
app/
  layout.tsx      metadata + theme color (fonts load from /public/fonts)
  page.tsx        renders <BirthdayExperience />
  globals.css     the whole visual system (design tokens + every scene)
  icon.svg        favicon

components/birthday/
  BirthdayExperience.tsx   scene state machine + unlock persistence
  OpeningScene.tsx         "Hey..." + gift
  BalloonReveal.tsx        balloon storm → HAPPY 21ST BIRTHDAY!
  CandleGame.tsx           the 21-candle tap game (also reusable as replay)
  UnlockOverlay.tsx        lock → SURPRISE UNLOCKED
  MemoriesScene.tsx        scrapbook groups + scroll entrances
  Polaroid.tsx             one taped polaroid
  PhotoViewer.tsx          tap-to-expand dialog
  LetterScene.tsx          envelope + letter
  FinalScene.tsx           closing birthday card moment
  ScrapbookNav.tsx         floating pill nav (post-unlock)
  Cursor.tsx               desktop ♡ / ✨ cursor follower
  SoundToggle.tsx          sound on/off (off by default)
  Doodle.tsx               SVG doodles + floating stickers
  Art.tsx                  placeholder illustrations (replaceable by photos)

lib/
  config.ts        ✏️ name, letter, finale line
  memories.ts      ✏️ photos + captions data
  easing.ts        shared motion tokens
  sound.ts         WebAudio-synthesised sfx (no audio files needed)
  fx.ts            confetti / sparkles / smoke particles (self-cleaning)
  hooks.ts         reduced-motion + fine-pointer hooks
  prng.ts          seeded PRNG (hydration-safe "randomness")
```

## Accessibility & performance notes

- Real `<button>`s everywhere, visible focus rings, aria labels, `aria-live`
  progress counter, Escape closes the photo viewer, focus is restored on close.
- `prefers-reduced-motion` is honoured in CSS **and** in every GSAP timeline
  (movement swaps to gentle fades; the experience stays fully usable).
- Sound is synthesised, **off by default**, and never required to understand anything.
- Animations are transform/opacity only; particles remove themselves; idle
  animations are few and cheap.
- Unlock state persists in `sessionStorage` — she won't have to re-win the
  game when she comes back mid-session.
