import React from "react";
import './Containers.css'

export const ProjectList = () => {
  return (
    <div class="scrolling-wrapper-flexbox ">
      <div class="card">
        <h3>Wheather or Not</h3>
        <p><a href="https://www.wheatherornot.co/" target="_blank" rel="noreferrer">Wheather or Not</a> simplifies 
        your life by eliminating the need for complex weather apps. 
        Whether you're a child eager to fly a kite or a farmer planning to sow crops, 
        WeatherOrNot seamlessly integrates various weather APIs and advanced language models to comprehend your activities. 
        It provides personalized, optimal timing suggestions, ensuring you always have the perfect weather conditions for your plans.
        Made at <a href="https://hackkosice.com/2024/" target="_blank" rel="noreferrer">Hack Kosice 2024</a>.</p>
      </div>
      <div class="card">
        <h3>...</h3>
        <p>More projects to come.</p>
      </div>
    </div>
  )
}