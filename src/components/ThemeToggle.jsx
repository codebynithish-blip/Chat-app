import React from "react";
import useTheme from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "1px solid var(--border)",
        background: "var(--sidebar-bg)",
        color: "var(--sidebar-text)"
      }}
    >
        <ThemeToggle />

      {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
    
  );
};

export default ThemeToggle;
