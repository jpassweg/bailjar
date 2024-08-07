import React from "react";
import './App.css';
import './Containers.css'
import { ProfileSection } from "./ProfileSection";
import { DarkModeToggle } from "./DarkMode";
import { AboutMeSection } from "./AboutMe";
import { ProjectList } from "./ProjectList";
import Header from "./Header";

const App = () => {
  return (
    <body>
      <Header />
      <div class="main-container">
        <DarkModeToggle />
        <ProfileSection />
        <AboutMeSection />
        <ProjectList />
      </div>
    </body>
  );
};

export default App;