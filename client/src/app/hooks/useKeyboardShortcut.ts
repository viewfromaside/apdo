"use client";

import { useEffect, useCallback } from "react";

interface UseKeyboardShortcutProps {
  key: string;
  onKeyPress: () => void;
  enabled?: boolean;
  preventDefault?: boolean;
  deps?: any[];
}

export const useKeyboardShortcut = ({
  key,
  onKeyPress,
  enabled = true,
  preventDefault = true,
  deps = [],
}: UseKeyboardShortcutProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        if (preventDefault) {
          event.preventDefault();
        }
        onKeyPress();
      }
    },
    [key, onKeyPress, preventDefault]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleKeyDown, ...deps]);
};
