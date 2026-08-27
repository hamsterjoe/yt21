import type { CSSProperties } from "react";

/**
 * Hand-drawn-style SVG doodles + positioned stickers.
 * Pure SVG — no image assets needed for decoration.
 */

export type DoodleKind = "heart" | "star" | "sparkle" | "squiggle" | "arrow" | "bow";

export function Doodle({
  kind,
  color = "#F2A0C0",
  size = 28,
}: {
  kind: DoodleKind;
  color?: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (kind) {
    case "heart":
      return (
        <svg {...common}>
          <path
            d="M12 21 C5 16 2 12.6 2 9 A5 5 0 0 1 12 6.4 A5 5 0 0 1 22 9 C22 12.6 19 16 12 21 Z"
            fill={color}
          />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path
            d="M12 2.5 L14.7 9 L21.5 9.6 L16.3 14 L18 20.5 L12 16.8 L6 20.5 L7.7 14 L2.5 9.6 L9.3 9 Z"
            fill={color}
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path
            d="M12 2 C13.4 8.2 15.8 10.6 22 12 C15.8 13.4 13.4 15.8 12 22 C10.6 15.8 8.2 13.4 2 12 C8.2 10.6 10.6 8.2 12 2 Z"
            fill={color}
          />
        </svg>
      );
    case "squiggle":
      return (
        <svg {...common}>
          <path
            d="M2 12 C 5 5, 8 5, 11 12 S 17 19, 22 12"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path
            d="M3 21 C 8 16, 14 12, 20 8 M 15 6 L 21 7 L 20 13"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bow":
      return (
        <svg {...common}>
          <path d="M12 12 L4 6 V18 Z M12 12 L20 6 V18 Z" fill={color} />
          <circle cx="12" cy="12" r="2.6" fill={color} />
        </svg>
      );
  }
}

/** Absolutely-positioned decorative doodle with optional gentle floating. */
export function Sticker({
  kind,
  color,
  size = 28,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  float = false,
  delay = 0,
}: {
  kind: DoodleKind;
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  float?: boolean;
  delay?: number;
}) {
  const style = {
    top,
    left,
    right,
    bottom,
    transform: `rotate(${rotate}deg)`,
    "--sr": `${rotate}deg`,
    "--fdel": `${delay}s`,
  } as CSSProperties;

  return (
    <span className={`sticker${float ? " floaty" : ""}`} style={style} aria-hidden="true">
      <Doodle kind={kind} color={color} size={size} />
    </span>
  );
}
