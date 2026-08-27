# Asset Inventory

Per the brief: this project is built so that **almost nothing needs to be
sourced** — every decorative element is drawn in code (SVG/CSS/GSAP).
The only truly required assets are the personal photos.

## 1. Required — the real photos

| Asset | Format | Purpose | Notes |
| --- | --- | --- | --- |
| `public/photos/photo01.webp` … `photo12.webp` | WebP (JPEG/PNG fine) | Scrapbook polaroids + finale frame | ~1200px long edge is plenty; 4:3 landscape fits best (others crop to fill). Wire up in `lib/memories.ts` via `src`. |

> These are the authentic personal element of the site — everything else can
> stay code-drawn and the experience is complete.

## 2. Optional upgrades — only if you want richer art

All of these already exist as built-in SVG/CSS implementations. Replace only
if you want a more illustrated look. Keep one consistent style across all of
them, e.g.:

> *"Cute hand-drawn birthday scrapbook illustration, soft pastel pink palette,
> simple ink outline, playful children's picture-book aesthetic, transparent
> background"*

| Asset | Format | Purpose | Currently | Suggested search / AI prompt |
| --- | --- | --- | --- | --- |
| Gift box | SVG/PNG | Opening scene | CSS (`OpeningScene`) | "cute hand drawn gift box pink ribbon transparent PNG" / the style prompt above + "gift box with bow, isolated object" |
| Balloons | — | Balloon reveal | CSS + GSAP (`BalloonReveal`) | Code-generated is strongly recommended here (needs 26 varied instances + per-balloon animation) |
| Birthday cake | SVG/PNG | Candle game | CSS tiers (`CandleGame`) | "cute hand drawn birthday cake 3 tiers pastel pink transparent PNG" — note: flames/wicks must stay code-drawn so they can animate out per candle |
| Envelope | SVG/PNG | Letter scene | CSS (`LetterScene`) | "hand drawn envelope pastel pink heart seal transparent PNG" |
| Scrapbook decorations (tape, hearts, stars, arrows, bows, sparkles) | SVG | Everywhere | SVG (`Doodle.tsx`) | "washi tape strip transparent PNG", "hand drawn doodle stars hearts arrows SVG" |
| Paper/grain texture | PNG (tile) | Background depth | CSS gradients | "subtle paper texture seamless tile" — apply as a low-opacity `background-image` on `body` |
| Cursor sparkle | — | Desktop cursor | Text glyphs ♡ / ✨ (`Cursor.tsx`) | Keep as-is |

## 3. Sounds — optional (synthesised by default)

`lib/sound.ts` synthesises pop / sparkle / unlock / fanfare with WebAudio, so
**no audio files are needed**. If you prefer real recordings, drop them into
`public/sounds/` and swap the `sfx` implementations for `<audio>` playback —
the call sites don't change. Suggested files:

```text
public/sounds/
  balloon-pop.mp3
  button-click.mp3
  sparkle.mp3
  paper-open.mp3
  candle-blow.mp3
  confetti.mp3
  unlock.mp3
```

Free sources: pixabay.com/sound-effects, mixkit.co, freesound.org.
Search terms: "short pop", "magic sparkle", "paper slide", "party blower",
"soft chime unlock". Keep each under ~0.5s and ~50KB.

## 4. Fonts — you supply these

Drop your two font files into `public/fonts/`:

- `main.woff2` — the main typeface (body text + big headings)
- `complementary.woff2` — the accent typeface (handwritten captions, letter)

`.woff` / `.ttf` also work — the `@font-face` rules at the top of
`app/globals.css` list fallback URLs for those formats. If your filenames
differ, update the `src` URLs there. To swap which font plays which role,
edit `--font-sans` / `--font-display` / `--font-hand` in `:root`.
