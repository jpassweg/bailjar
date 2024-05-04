import React from "react";
import './Containers.css'
import brain from "./images/brain.png"

export const AboutMeSection = () => {
  return (
    <div class="small-width">
      <div class="container" id="about-me-container">
        <div class="text-container" id="about-me-div">
          <h2>About me:</h2>
          <p>
          I'm a Computer Science graduate with a Master's Degree from ETH Zürich. 
          My journey began with a fascination for the consciousness created by the human brain and finding similarities to machines. 
          Today, I am convinced that the human brain is too complex for me to fully understand. 
          Instead, I focus on understanding people's needs and requirements and transforming those into software solutions.
          </p>
        </div>
        <div class="image-container" id="brain-div">
            <img src={brain} id="brain-image" alt="brain depiction"/>
        </div>
      </div>
    </div>
  );
};