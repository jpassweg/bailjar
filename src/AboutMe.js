import React from "react";
import './Containers.css'
import brain from "./images/brain.png"

export const AboutMeSection = () => {
  return (
    <div class="small-width">
      <div class="container">
        <div class="text-container" id="about-me-div">
          <h2>About me:</h2>
          <p>
            I'm a Computer Science graduate with a Master's Degree from ETH Zürich. 
            My journey began with a fascination for the complexities of the human brain. 
            Today, I am convinced that the human brain is much more complex, and focus on understanding peoples
            needs and requirements and transform them into software solutions.
          </p>
        </div>
        <div class="image-container" id="brain-div">
            <img src={brain} id="brain-image" alt="brain depiction"/>
        </div>
      </div>
    </div>
  );
};