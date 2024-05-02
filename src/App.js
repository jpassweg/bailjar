import React from "react";
import './App.css';
import './Containers.css'
import { ProfileSection } from "./ProfileSection";
import { DarkModeToggle } from "./DarkMode";

const App = () => {
  return (
    <body>
      <div class="main-container">
        <DarkModeToggle />
        <ProfileSection />
      </div>
    </body>
  );
};

export default App;