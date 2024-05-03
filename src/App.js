import React from "react";
import './App.css';
import './Containers.css'
import { ProfileSection } from "./ProfileSection";
import { DarkModeToggle } from "./DarkMode";
import { AboutMeSection } from "./AboutMe";

const App = () => {
  return (
    <body>
      <div class="main-container">
        <DarkModeToggle />
        <ProfileSection />
        <AboutMeSection />
      </div>
    </body>
  );
};

export default App;