import React from "react";
import './Containers.css'
import profile from './images/profile.jpg'

export const ProfileSection = () => {
  return (
    <div class="container">
      <div class="image-container">
        <img src={profile} id="profile-image" alt="Jonas Passweg"/>
      </div>
      <div class="text-container" id="profile-section-div">
        <h1>Hello, I'm Jonas</h1>
        <p><bf>Welcome to my website!</bf> I'm a Computer Science graduate with a Master's Degree from ETH Zürich. Here you can find information about my projects, skills, and experiences.</p>
      </div>
    </div>
  );
};