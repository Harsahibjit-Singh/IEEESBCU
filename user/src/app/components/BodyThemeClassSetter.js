"use client";
import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";
export default function BodyThemeClassSetter() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.remove(
      "theme-dark",
      "theme-light",
      "theme-neon",
      "theme-nature",
      "theme-retro"
    );
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return null;
}
