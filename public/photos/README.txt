DROP THE REAL PHOTOS IN THIS FOLDER
===================================

Expected filenames (referenced from lib/memories.ts):

    photo01.webp   photo02.webp   photo03.webp
    photo04.webp   photo05.webp   photo06.webp
    photo07.webp   photo08.webp   photo09.webp
    photo10.webp   photo11.webp   photo12.webp

Guidelines:
  - WebP preferred; JPEG or PNG work fine too.
  - ~1200px on the long edge is plenty (keeps the site fast on phones).
  - 4:3 landscape fits the polaroid frames best; other aspect ratios
    are cropped-to-fill automatically.

After copying files in, open lib/memories.ts and set

    src: "/photos/photo01.webp"

on each entry (and write your own caption + optional note).
Until then, cute hand-drawn placeholder illustrations show instead.

The finale photo is set separately in components/birthday/FinalScene.tsx.
