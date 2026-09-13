"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  THEME_STORAGE_KEY,
  applyResolvedTheme,
  resolveTheme,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

type ThemeContextValue = {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* private mode */
  }
  return "system";
}

function subscribeTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener("tsh-theme-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("tsh-theme-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getResolvedSnapshot(): ResolvedTheme {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
  return resolveTheme(readPreference());
}

function getPreferenceSnapshot(): ThemePreference {
  return readPreference();
}

function getServerSnapshot(): ResolvedTheme {
  return "light";
}

function getServerPreference(): ThemePreference {
  return "system";
}

function persistPreference(next: ThemePreference) {
  try {
    if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
  applyResolvedTheme(resolveTheme(next));
  window.dispatchEvent(new Event("tsh-theme-change"));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const resolved = useSyncExternalStore(
    subscribeTheme,
    getResolvedSnapshot,
    getServerSnapshot,
  );
  const preference = useSyncExternalStore(
    subscribeTheme,
    getPreferenceSnapshot,
    getServerPreference,
  );

  const setPreference = useCallback((next: ThemePreference) => {
    persistPreference(next);
  }, []);

  const toggle = useCallback(() => {
    persistPreference(resolved === "dark" ? "light" : "dark");
  }, [resolved]);

  const value = useMemo(
    () => ({ preference, resolved, setPreference, toggle }),
    [preference, resolved, setPreference, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
