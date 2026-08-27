import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/**
 * Fonts: your two custom fonts are loaded via @font-face at the top of
 * app/globals.css from /public/fonts/ (main + complementary — see
 * public/fonts/README.txt). No next/font setup needed.
 */

export const metadata: Metadata = {
  title: "Happy 21st Birthday 🎂",
  description: "A little interactive birthday surprise — made with love.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFF5F8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
