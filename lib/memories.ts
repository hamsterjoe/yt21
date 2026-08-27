/**
 * ✏️  YOUR PHOTOS
 * ------------------------------------------------------------------
 * One flat gallery of 10 pictures — no categories, no captions needed.
 *
 * Drop image files into  public/photos/  (WebP preferred, ~1200px wide),
 * then set  src: "/photos/photo01.webp"  on the matching entry.
 *
 * Everything below is optional — add per entry only if you want it:
 *   caption: "that beach day"   — handwritten line under the photo
 *   note: "..."                 — extra line in the enlarged viewer
 *
 * While  src  is null, a hand-drawn pastel placeholder illustration
 * (the `art` field) is shown instead, so the site is fully working
 * before you add a single photo.
 *
 * rotation        — the polaroid's resting tilt, in degrees.
 * tapeRotation    — the washi-tape strip's tilt, in degrees.
 */

export type ArtKind =
  | "cake"
  | "balloons"
  | "icecream"
  | "beach"
  | "flowers"
  | "music"
  | "camera"
  | "plane"
  | "gift"
  | "stars"
  | "heart"
  | "home";

export interface Memory {
  id: string;
  /** Optional — add one any time: caption: "that beach day" */
  caption?: string;
  note?: string;
  src: string | null;
  art: ArtKind;
  rotation: number;
  tapeRotation?: number;
  /** Optional leftover from the old grouped layout — ignored by the flat gallery. */
  category?: string;
}

export const MEMORIES: Memory[] = [
  { id: "photo01", src: "/photos/photo01.JPG", art: "cake", rotation: -4, tapeRotation: -3 },
  { id: "photo02", src: "/photos/photo02.JPG", art: "icecream", rotation: 3, tapeRotation: 2 },
  { id: "photo03", src: "/photos/photo03.JPG", art: "home", rotation: -2, tapeRotation: -4 },
  { id: "photo04", src: "/photos/photo04.JPG", art: "flowers", rotation: 5, tapeRotation: 3 },
  { id: "photo05", src: "/photos/photo05.JPG", art: "heart", rotation: -3, tapeRotation: -2 },
  { id: "photo06", src: "/photos/photo06.jpeg", art: "music", rotation: 4, tapeRotation: 4 },
  { id: "photo07", src: "/photos/photo07.JPG", art: "stars", rotation: -5, tapeRotation: -3 },
  { id: "photo08", src: "/photos/photo08.jpeg", art: "camera", rotation: 2, tapeRotation: 2 },
  { id: "photo09", src: "/photos/photo09.jpeg", art: "beach", rotation: -4, tapeRotation: -2 },
];
