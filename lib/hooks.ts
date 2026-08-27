"use client";

import { useEffect, useState } from "react";

/** Reactive media-query hook (client-side; starts false during SSR). */
export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True when the user prefers reduced motion — swap movement for gentle fades. */
export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** True on devices with a real hover-capable pointer (desktop/laptop). */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");
