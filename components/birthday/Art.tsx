import type { ReactNode } from "react";
import type { ArtKind } from "@/lib/memories";

/**
 * Placeholder illustrations — cute hand-drawn-style SVG scenes shown
 * until real photos land in public/photos/. Consistent picture-book
 * language: soft pastel fills, rounded rose-brown outlines.
 *
 * Replace any of these by simply setting a memory's `src` — the
 * components swap in next/image automatically (see Polaroid.tsx).
 */

const STROKE = "#8E5B71";

function Svg({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <svg className="art" viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="240" height="180" fill={bg} />
      {children}
    </svg>
  );
}

const SPARKLE =
  "M0 -12 C1.6 -4.5 4.5 -1.6 12 0 C4.5 1.6 1.6 4.5 0 12 C-1.6 4.5 -4.5 1.6 -12 0 C-4.5 -1.6 -1.6 -4.5 0 -12 Z";
const HEART =
  "M12 21 C5 16 2 12.6 2 9 A5 5 0 0 1 12 6.4 A5 5 0 0 1 22 9 C22 12.6 19 16 12 21 Z";

export function Art({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "cake":
      return (
        <Svg bg="#FDEAF2">
          <ellipse cx="120" cy="152" rx="80" ry="10" fill="#FFFFFF" />
          <rect x="66" y="96" width="108" height="46" rx="10" fill="#F2A0C0" stroke={STROKE} strokeWidth="4" />
          <path
            d="M70 106 q9 12 18 0 q9 12 18 0 q9 12 18 0 q9 12 18 0 q9 12 18 0"
            fill="none"
            stroke="#FFF3F8"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <rect x="86" y="66" width="68" height="34" rx="9" fill="#F8C7DB" stroke={STROKE} strokeWidth="4" />
          <line x1="100" y1="66" x2="100" y2="52" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <line x1="120" y1="66" x2="120" y2="50" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <line x1="140" y1="66" x2="140" y2="52" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="47" r="5" fill="#FFD76A" />
          <circle cx="120" cy="45" r="5" fill="#FFD76A" />
          <circle cx="140" cy="47" r="5" fill="#FFD76A" />
          <circle cx="84" cy="126" r="4" fill="#FFF3F8" />
          <circle cx="156" cy="126" r="4" fill="#FFF3F8" />
        </Svg>
      );

    case "balloons":
      return (
        <Svg bg="#EAF4FD">
          <path d="M72 94 q5 24 -4 46" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M128 80 q-6 26 2 48" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M182 100 q4 20 -2 40" fill="none" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="72" cy="62" rx="24" ry="30" fill="#F2A0C0" stroke={STROKE} strokeWidth="4" />
          <ellipse cx="128" cy="44" rx="28" ry="34" fill="#DCCBF3" stroke={STROKE} strokeWidth="4" />
          <ellipse cx="182" cy="70" rx="22" ry="28" fill="#FCEFC0" stroke={STROKE} strokeWidth="4" />
          <ellipse cx="64" cy="52" rx="6" ry="9" fill="#FFFFFF" opacity="0.7" />
          <ellipse cx="119" cy="33" rx="7" ry="10" fill="#FFFFFF" opacity="0.7" />
          <ellipse cx="175" cy="61" rx="5" ry="8" fill="#FFFFFF" opacity="0.7" />
        </Svg>
      );

    case "icecream":
      return (
        <Svg bg="#FDF1E7">
          <polygon points="96,98 120,152 144,98" fill="#EBC79A" stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
          <line x1="106" y1="112" x2="130" y2="124" stroke="#D9A86C" strokeWidth="3" strokeLinecap="round" />
          <line x1="134" y1="112" x2="112" y2="124" stroke="#D9A86C" strokeWidth="3" strokeLinecap="round" />
          <circle cx="120" cy="84" r="24" fill="#F2A0C0" stroke={STROKE} strokeWidth="4" />
          <circle cx="120" cy="58" r="19" fill="#CDEDDA" stroke={STROKE} strokeWidth="4" />
          <circle cx="120" cy="36" r="5" fill="#D55E8F" stroke={STROKE} strokeWidth="3" />
        </Svg>
      );

    case "beach":
      return (
        <Svg bg="#E7F3FD">
          <circle cx="192" cy="36" r="16" fill="#FCEFC0" stroke={STROKE} strokeWidth="4" />
          <path d="M0 142 q60 -12 120 0 t120 0 V180 H0 Z" fill="#FDEBB4" />
          <path d="M62 100 a26 26 0 0 1 52 0 Z" fill="#F2A0C0" stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
          <line x1="88" y1="100" x2="88" y2="140" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <path d="M20 160 q10 -8 20 0 t20 0" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M160 160 q10 -8 20 0 t20 0" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );

    case "flowers":
      return (
        <Svg bg="#EDF8F0">
          <line x1="88" y1="112" x2="88" y2="152" stroke="#7FBF92" strokeWidth="4" strokeLinecap="round" />
          <line x1="152" y1="124" x2="152" y2="154" stroke="#7FBF92" strokeWidth="4" strokeLinecap="round" />
          <path d="M88 136 q-14 -2 -18 -14" fill="none" stroke="#7FBF92" strokeWidth="4" strokeLinecap="round" />
          {[0, 72, 144, 216, 288].map((deg) => (
            <circle
              key={deg}
              cx={88 + Math.cos((deg * Math.PI) / 180) * 15}
              cy={96 + Math.sin((deg * Math.PI) / 180) * 15}
              r="9"
              fill="#F2A0C0"
              stroke={STROKE}
              strokeWidth="3.5"
            />
          ))}
          <circle cx="88" cy="96" r="7" fill="#FCEFC0" stroke={STROKE} strokeWidth="3.5" />
          {[45, 135, 225, 315].map((deg) => (
            <circle
              key={deg}
              cx={152 + Math.cos((deg * Math.PI) / 180) * 12}
              cy={110 + Math.sin((deg * Math.PI) / 180) * 12}
              r="7.5"
              fill="#DCCBF3"
              stroke={STROKE}
              strokeWidth="3.5"
            />
          ))}
          <circle cx="152" cy="110" r="6" fill="#FCEFC0" stroke={STROKE} strokeWidth="3.5" />
        </Svg>
      );

    case "music":
      return (
        <Svg bg="#F3EEFB">
          <ellipse cx="86" cy="126" rx="10" ry="8" transform="rotate(-15 86 126)" fill="#E87DA9" stroke={STROKE} strokeWidth="3.5" />
          <line x1="95" y1="124" x2="95" y2="82" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <path d="M95 82 q16 4 13 20" fill="none" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="152" cy="134" rx="10" ry="8" transform="rotate(-15 152 134)" fill="#DCCBF3" stroke={STROKE} strokeWidth="3.5" />
          <line x1="161" y1="132" x2="161" y2="92" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <path d="M161 92 q15 4 12 18" fill="none" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
          <g transform="translate(52 66) scale(0.7)">
            <path d={SPARKLE} fill="#F2C14E" />
          </g>
          <g transform="translate(196 116) scale(0.55)">
            <path d={SPARKLE} fill="#F2A0C0" />
          </g>
        </Svg>
      );

    case "camera":
      return (
        <Svg bg="#FDEDF3">
          <rect x="84" y="58" width="30" height="16" rx="6" fill="#FFFFFF" stroke={STROKE} strokeWidth="4" />
          <rect x="64" y="70" width="112" height="70" rx="14" fill="#FFFFFF" stroke={STROKE} strokeWidth="4" />
          <circle cx="120" cy="105" r="22" fill="#F2A0C0" stroke={STROKE} strokeWidth="4" />
          <circle cx="120" cy="105" r="10" fill="#FFFFFF" stroke={STROKE} strokeWidth="3" />
          <circle cx="162" cy="86" r="4" fill="#D55E8F" />
        </Svg>
      );

    case "plane":
      return (
        <Svg bg="#EDF4FC">
          <circle cx="44" cy="122" r="3.5" fill="#CFE6F7" />
          <circle cx="30" cy="134" r="3.5" fill="#CFE6F7" />
          <circle cx="18" cy="148" r="3.5" fill="#CFE6F7" />
          <polygon points="56,100 188,54 128,130 104,106" fill="#FFFFFF" stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
          <line x1="104" y1="106" x2="188" y2="54" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
        </Svg>
      );

    case "gift":
      return (
        <Svg bg="#FBEAF1">
          <rect x="78" y="84" width="84" height="58" rx="10" fill="#F2A0C0" stroke={STROKE} strokeWidth="4" />
          <rect x="114" y="84" width="12" height="58" fill="#FCEFC0" />
          <rect x="70" y="64" width="100" height="22" rx="8" fill="#E87DA9" stroke={STROKE} strokeWidth="4" />
          <ellipse cx="108" cy="56" rx="12" ry="8" transform="rotate(-24 108 56)" fill="#FCEFC0" stroke={STROKE} strokeWidth="3.5" />
          <ellipse cx="132" cy="56" rx="12" ry="8" transform="rotate(24 132 56)" fill="#FCEFC0" stroke={STROKE} strokeWidth="3.5" />
          <circle cx="120" cy="60" r="4" fill="#FCEFC0" stroke={STROKE} strokeWidth="3" />
        </Svg>
      );

    case "stars":
      return (
        <Svg bg="#FBF6E7">
          <g transform="translate(84 78) scale(1.4)">
            <path d={SPARKLE} fill="#F6D98C" stroke={STROKE} strokeWidth="2.5" />
          </g>
          <g transform="translate(152 58)">
            <path d={SPARKLE} fill="#F2A0C0" stroke={STROKE} strokeWidth="2.5" />
          </g>
          <g transform="translate(132 118) scale(0.8)">
            <path d={SPARKLE} fill="#DCCBF3" stroke={STROKE} strokeWidth="2.5" />
          </g>
        </Svg>
      );

    case "heart":
      return (
        <Svg bg="#FDEAF0">
          <g transform="translate(72 54) scale(4)">
            <path d={HEART} fill="#F2A0C0" stroke={STROKE} strokeWidth="1.2" />
          </g>
          <g transform="translate(50 50) scale(1.6)">
            <path d={HEART} fill="#DCCBF3" stroke={STROKE} strokeWidth="2" />
          </g>
          <g transform="translate(174 56) scale(1.3)">
            <path d={HEART} fill="#FCEFC0" stroke={STROKE} strokeWidth="2" />
          </g>
        </Svg>
      );

    case "home":
      return (
        <Svg bg="#F5F0EA">
          <rect x="84" y="92" width="72" height="50" rx="8" fill="#FFFFFF" stroke={STROKE} strokeWidth="4" />
          <polygon points="74,96 120,56 166,96" fill="#F2A0C0" stroke={STROKE} strokeWidth="4" strokeLinejoin="round" />
          <rect x="112" y="116" width="16" height="26" rx="4" fill="#F8C7DB" stroke={STROKE} strokeWidth="3" />
          <g transform="translate(108 96) scale(1.1)">
            <path d={HEART} fill="#D55E8F" />
          </g>
        </Svg>
      );
  }
}
