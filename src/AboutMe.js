import React from "react";
import './Containers.css'
import brain from "./images/brain.png"

export const AboutMeSection = () => {
  return (
    <div class="small-width">
      <div class="container" id="about-me-container">
        <div class="text-container" id="about-me-div">
          <h2>About me</h2>
          <p>
          My journey began with a fascination for the consciousness produced by the human brain 
          and its parallels with machines. Over time, I realized that fully comprehending the brain’s 
          complexity might be beyond reach. Instead, I’ve shifted my focus to understanding people’s 
          needs and translating them into effective software solutions.
          </p>
        </div>
        <div class="image-container" id="brain-div">
            <img src={brain} id="brain-image" alt="brain depiction"/>
        </div>
      </div>
    </div>
  );
};