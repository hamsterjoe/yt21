DROP YOUR TWO FONT FILES IN THIS FOLDER
=======================================

Expected filenames (referenced by the @font-face rules at the top of
app/globals.css):

    main.woff2            → the MAIN typeface (body text + big headings)
    complementary.woff2   → the COMPLEMENTARY typeface (handwritten
                            captions, the letter, her name)

Formats:
  - .woff2 is best (smallest). .woff and .ttf also work out of the box —
    the @font-face rules already list fallback URLs for them, so just
    drop e.g. main.ttf in and it will be picked up.
  - .otf works too, but rename it to .ttf first (same container, browsers
    sniff it correctly) or add a src line in globals.css.

If your files have different names:
  open app/globals.css and update the two  src: url(...)  lines.

To swap which font plays which role:
  edit  --font-sans / --font-display / --font-hand  in the :root block
  of app/globals.css.

Until you add the files, the site falls back to rounded system fonts,
so nothing breaks while you're still sourcing them.
