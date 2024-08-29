import React from "react";
import './App.css';
import './Containers.css'
import { ProfileSection } from "./ProfileSection";
import { DarkModeToggle } from "./DarkMode";
import { AboutMeSection } from "./AboutMe";
import { ProjectList2 } from "./ProjectList2";
import ScrollBuffer from './ScrollBuffer';

const App = () => {
  return (
    <body>
      <div class="main-container">
        <DarkModeToggle />
        <ProfileSection />
        <AboutMeSection />
        <ProjectList2 />
        <ScrollBuffer />
      </div>
    </body>
  );
};

export default App;