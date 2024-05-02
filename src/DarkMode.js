import React, { useEffect, useState } from "react";
import "react-toggle/style.css";
import "./DarkMode.css";
import moon from "./images/moon_blue.png"

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div class="container-small">
      <div class="right-align">
      <img src={moon} class="moon-icon" alt="moon icon" onClick={() => setIsDark(!isDark)}/>
        <button className="toggle-btn" onClick={() => setIsDark(!isDark)}>
          <div className="thumb"></div>
        </button>
      </div>
    </div>
  );
};